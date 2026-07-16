## 2026-07-16 · Add Model Effort Policy (เนตรเลือกกำลัง) as baseline behavior
- module: ego-avatar
- status: done
- files: AGENTS.md
- problem: The user added a new "Model Effort Policy" skill and wanted to enforce it as a permanent global baseline behavior in all sessions without manual triggering.
- solution: Appended the Model Effort Policy rule to AGENTS.md so that both Claude and Antigravity naturally inherit it upon initialization.
- result: The policy is successfully embedded into the Universal Agent Initialization Protocol.
- priority: P2
- days: 1

## 2026-07-06 · Fix missing dependencies (TinidUtils & RestStatusNotSuccessException) in itpc-x-de
- module: itpc-x-de
- status: done
- files: itpc-x-de\pom.xml
- problem: itpc-x-de could not resolve classes from faces-api (e.g. TinidUtils, RestStatusNotSuccessException, ServiceException) causing compilation errors.
- root cause: itpx-web-base version was bumped to 1.0.98, which changed the faces-api dependency scope to <scope>provided</scope>. This prevented faces-api from being transitively inherited by itpc-x-de, a library project with minimal dependencies.
- solution: Explicitly added faces-api (scope provided) and itpx-ws-client (scope compile) to itpc-x-de's pom.xml. This properly restores all missing classes without altering any Java business logic in ValidateBase.java.
- result: Compilation errors resolved.
- priority: P1
- days: 1

## 2026-07-05 Â· à¸ˆà¸±à¸”à¸à¸²à¸£ header workspaces à¹ƒà¸™ note-me
- module: note-me
- status: done
- files: note-me-a-*.md (7 files)
- problem: à¸•à¹‰à¸­à¸‡à¸à¸²à¸£à¹€à¸žà¸´à¹ˆà¸¡à¸šà¸£à¸£à¸—à¸±à¸” workspaces à¹ƒà¸•à¹‰à¸Šà¸·à¹ˆà¸­à¹‚à¸›à¸£à¹€à¸ˆà¸à¸•à¹Œ
- solution: à¹ƒà¸Šà¹‰ replace_file_content à¹ƒà¸ªà¹ˆ workspaces: <repo_name> à¹ƒà¸«à¹‰à¸•à¸£à¸‡à¸à¸±à¸šà¹‚à¸Ÿà¸¥à¹€à¸”à¸­à¸£à¹Œà¸—à¸³à¸‡à¸²à¸™à¸ˆà¸£à¸´à¸‡
- result: à¸­à¸±à¸›à¹€à¸”à¸•à¸„à¸£à¸šà¸–à¹‰à¸§à¸™à¸•à¸²à¸¡à¸à¸Ž
- priority: P2
- days: 1

## 2026-07-05 Â· à¸­à¸±à¸›à¹€à¸”à¸• note-me Antigravity
- module: note-me
- status: done
- files: note-me-a-app4-pa-personal-assistant.md, note-me-a-ego-avatar.md, note-me-a-temp-skills.md, note-me-a-mytax-ww.md, note-me-a-itp23.md, note-me-a-app4-CoachKit.md, note-me-a-app5-lalala.md
- problem: à¸•à¹‰à¸­à¸‡à¸à¸²à¸£à¸”à¸¶à¸‡à¸‚à¹‰à¸­à¸¡à¸¹à¸¥ git log à¸—à¸µà¹ˆà¸—à¸³à¸ˆà¸£à¸´à¸‡à¸‚à¸­à¸‡à¹€à¸”à¸·à¸­à¸™à¸™à¸µà¹‰à¸¡à¸²à¸ªà¸£à¸¸à¸›à¸¥à¸‡à¹„à¸Ÿà¸¥à¹Œ note-me
- solution: à¸£à¸±à¸™à¸„à¸³à¸ªà¸±à¹ˆà¸‡à¸”à¸¶à¸‡ git log à¹à¸¥à¸°à¸ªà¸£à¹‰à¸²à¸‡à¹„à¸Ÿà¸¥à¹Œ note-me 3 à¹‚à¸›à¸£à¹€à¸ˆà¸à¸•à¹Œà¹ƒà¸™ D:\0_notes-me\note-me-antigravity\
- result: à¸ªà¸³à¹€à¸£à¹‡à¸ˆ à¸ªà¸£à¹‰à¸²à¸‡à¹„à¸Ÿà¸¥à¹Œ note-me à¸•à¸²à¸¡à¸£à¸¹à¸›à¹à¸šà¸šà¸—à¸µà¹ˆà¸à¸³à¸«à¸™à¸”à¹€à¸£à¸µà¸¢à¸šà¸£à¹‰à¸­à¸¢à¹à¸¥à¹‰à¸§
- priority: P2
- days: 1




