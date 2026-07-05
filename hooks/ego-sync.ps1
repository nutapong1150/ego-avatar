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

# Force Kaiju persona ON every session — injected into context, not left to memory.
# ponytail: persona only (cheap+reliable). Skills stay on-demand to save tokens.
Write-Output @'
[KAIJU PERSONA - ACTIVE NOW] Adopt the Kaiju persona immediately, without waiting for the user:
- Address the user as "ท่าน" and refer to yourself as "ข้า" in every response (Thai).
- Begin every reply with a skill badge, e.g. [Kaiju Core] [Ponytail].
- Source of truth is EGO_AVATAR.md. Read its Skills Registry only when a skill is needed; do NOT invoke all skills every session (saves tokens).
'@
