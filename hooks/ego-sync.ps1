# Ego Avatar auto-sync — runs at SessionStart. Pull brain, push pending, report.
# ponytail: best-effort, never block a session. 8s net timeout, swallow all errors.
$repo = Split-Path $PSScriptRoot -Parent
$ErrorActionPreference = 'SilentlyContinue'

function git-q { & git -C $repo @args 2>&1 }

if (-not (Test-Path "$repo\.git")) { Write-Output "[Ego-Sync] no git repo, skipped"; return }

$env:GIT_HTTP_LOW_SPEED_LIMIT = 1000   # bytes/s
$env:GIT_HTTP_LOW_SPEED_TIME  = 8      # seconds -> aborts a dead network fast

$before = (git-q rev-parse HEAD)
git-q fetch origin main | Out-Null
$behind = (git-q rev-list --count "HEAD..origin/main")
git-q merge --ff-only origin/main | Out-Null
$after = (git-q rev-parse HEAD)

# Report skills pulled
if ($before -ne $after) {
  $new = git-q diff --name-only $before $after | Select-String 'skills/.*/SKILL\.md'
  Write-Output "[Ego-Sync] pulled $behind commit(s). New/changed skills:"
  $new | ForEach-Object { Write-Output "  - $_" }
} else {
  Write-Output "[Ego-Sync] brain up to date"
}

# Push pending local commits
$ahead = (git-q rev-list --count "origin/main..HEAD")
if ([int]$ahead -gt 0) {
  git-q push origin main | Out-Null
  Write-Output "[Ego-Sync] pushed $ahead local commit(s)"
}

# Auto-install external plugins the brain's rules depend on (plugins.required.json).
# ponytail: only when the key is ABSENT from enabledPlugins - an explicit false is the
# user's decision and stays. One attempt per machine per missing plugin, never blocks.
$reqFile = "$repo\plugins.required.json"
$setFile = "$env:USERPROFILE\.claude\settings.json"
if ((Test-Path $reqFile) -and (Test-Path $setFile) -and (Get-Command claude -ErrorAction SilentlyContinue)) {
  try {
    $req = (Get-Content $reqFile -Raw | ConvertFrom-Json).required
    $enabled = (Get-Content $setFile -Raw | ConvertFrom-Json).enabledPlugins
    $names = @(); if ($enabled) { $names = $enabled.PSObject.Properties.Name }
    foreach ($r in $req) {
      if ($names -contains $r.plugin) { continue }   # already installed or deliberately disabled
      Write-Output "[Ego-Sync] missing plugin $($r.plugin) - installing ($($r.why))"
      & claude plugin marketplace add $r.marketplace 2>&1 | Out-Null
      & claude plugin install $r.plugin 2>&1 | Out-Null
      $now = (Get-Content $setFile -Raw | ConvertFrom-Json).enabledPlugins.PSObject.Properties.Name
      if ($now -contains $r.plugin) {
        Write-Output "[Ego-Sync] installed $($r.plugin) - restart this session to load its skills"
      } else {
        Write-Output "[Ego-Sync] could not install $($r.plugin). Run manually: claude plugin marketplace add $($r.marketplace); claude plugin install $($r.plugin)"
      }
    }
  } catch { Write-Output "[Ego-Sync] plugin check skipped: $($_.Exception.Message)" }
}

# Mirror global rules: repo CLAUDE.global.md is source of truth -> ~/.claude/CLAUDE.md
# ponytail: one-way copy + .bak. Edit the repo copy, never the local one.
$src = "$repo\CLAUDE.global.md"
$dst = "$env:USERPROFILE\.claude\CLAUDE.md"
if ((Test-Path $src) -and (Test-Path $dst)) {
  $a = (Get-FileHash $src).Hash; $b = (Get-FileHash $dst).Hash
  if ($a -ne $b) {
    Copy-Item $dst "$dst.bak" -Force
    Copy-Item $src $dst -Force
    Write-Output "[Ego-Sync] global CLAUDE.md updated from brain (old saved as CLAUDE.md.bak)"
  }
}

# Force Kaiju persona ON every session — injected into context, not left to memory.
# ponytail: persona only (cheap+reliable). Skills stay on-demand to save tokens.
Write-Output @'
[KAIJU PERSONA - ACTIVE NOW] Adopt the Kaiju persona immediately, without waiting for the user:
- Address the user as "ท่าน" and refer to yourself as "ข้า" in every response (Thai).
- Begin every reply with a skill badge, e.g. [Kaiju Core] [Ponytail].
- Source of truth is EGO_AVATAR.md. Read its Skills Registry only when a skill is needed; do NOT invoke all skills every session (saves tokens).
'@
