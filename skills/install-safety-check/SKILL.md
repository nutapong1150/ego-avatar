---
name: install-safety-check
description: ตรวจความปลอดภัยของแพ็กเกจ/เครื่องมือก่อนติดตั้งทุกครั้ง — npm/npx, pip/uv, MCP server (`claude mcp add`), Claude plugin, skill จากภายนอก, VS Code extension, ไบนารีจาก GitHub. Use BEFORE running any install command or when the user says "ลง", "ติดตั้ง", "install", "mcp add", "plugin install", "เช็คความปลอดภัยก่อน", "ปลอดภัยไหม", or pastes an install command.
---

# ตรวจก่อนติดตั้ง (Install Safety Check)

กฎ: **ห้ามรันคำสั่งติดตั้งก่อนตรวจครบ** ถ้าผลเป็น 🔴 ให้หยุดแล้วรายงานท่าน อย่าติดตั้ง

```
คำสั่งติดตั้ง ─► 1.ระบุของจริง ─► 2.ชื่อเสียง ─► 3.ดาวน์โหลดมาเปิดดู (ไม่รัน) ─► 4.สแกนโค้ด ─► ตัดสิน 🟢/🟡/🔴 ─► ติดตั้งแบบปักเวอร์ชัน
```

## 1. ระบุของจริง
- คำสั่งชี้ไปที่ binary อะไร มาจากแพ็กเกจไหน (เช่น `claude mcp add x -- awwwards-mcp` ต้องมี `npm i -g awwwards-mcp` ก่อน ถ้า `which` ไม่เจอ)
- ระวังชื่อเลียนแบบ (typosquat) — ชื่อแพ็กเกจต้องตรงกับ repo ที่อ้าง

## 2. ชื่อเสียง (npm ตัวอย่าง)
```bash
npm view <pkg> name version repository maintainers time.created time.modified bin scripts dependencies optionalDependencies
curl -s https://api.npmjs.org/downloads/point/last-month/<pkg>
curl -s https://api.github.com/repos/<owner>/<repo> | grep -E '"(stargazers_count|forks_count|created_at|pushed_at|spdx_id|archived)"'
```
pip: `pip download <pkg> --no-deps -d <dir>` + ดู pypi.org/project/<pkg> · GitHub binary: ดู release, checksum, ผู้ปล่อย

## 3. ดาวน์โหลดมาเปิดดู ห้ามรัน
ใส่โฟลเดอร์ใหม่ใน scratchpad เท่านั้น:
```bash
mkdir -p "$S" && cd "$S" && npm pack <pkg>@<ver> && tar xzf *.tgz && cd package
```

## 4. สแกนโค้ด (รันใน `package/`)
```bash
grep -E '"(pre|post)?install"|"prepare"' package.json                 # install hook = ธงแดงหลัก
grep -rnE "from ['\"](node:)?child_process|require\(['\"](node:)?child_process" dist lib src 2>/dev/null
grep -rnE "new Function\(|eval\(|atob\(|Buffer\.from\([^)]*base64" dist lib src 2>/dev/null
grep -rhoE "https?://[a-zA-Z0-9._-]+" . | sort | uniq -c | sort -rn | head -30   # ปลายทางเน็ต
grep -rhoE "process\.env\.[A-Z_]+" . | sort -u                          # อ่าน env อะไร
grep -rnE "\.ssh|\.aws|\.npmrc|credentials|keychain|Cookies|Login Data|wallet" . | head
```
ตามดูทุก `spawn/exec` ว่ารันอะไร (ffmpeg/chromium = ปกติ · curl|sh, powershell -enc, ดาวน์โหลดไฟล์รัน = 🔴)

## เกณฑ์ตัดสิน
| ระดับ | สัญญาณ |
|---|---|
| 🔴 ห้ามลง | install hook ที่ดึง/รันของจากเน็ต · โค้ด obfuscate/base64 eval · ส่ง env/ไฟล์ลับไปโดเมนแปลก · แตะ .ssh/.aws/browser cookies · ชื่อเลียนแบบ · repo ไม่ตรงกับแพ็กเกจ |
| 🟡 ลงได้แต่ระวัง | แพ็กเกจอายุน้อย (<6 เดือน) / maintainer คนเดียว / ออกเวอร์ชันถี่ · auto-update · อ่านเว็บภายนอก (prompt injection) |
| 🟢 ผ่าน | ไม่มี hook · dependency น้อยและรู้จัก · ปลายทางเน็ตตรงกับหน้าที่ · มี repo/license/ผู้ใช้จริง |

## ติดตั้ง
- **ปักเวอร์ชันเสมอ** (`pkg@1.2.3`) ไม่ใช้ `@latest` / `npx -y pkg` ลอยๆ — กันเวอร์ชันถัดไปโดนยึด
- ปิด auto-update ของเครื่องมือถ้ามี · อัปเดตครั้งหน้า = ตรวจซ้ำตามสกิลนี้
- MCP: `claude mcp add --scope user <name> -- <binary>` แล้ว `claude mcp list` ยืนยันว่า Connected

## รายงานท่าน
ตาราง: ของที่ตรวจ · ผลแต่ละข้อ · ระดับ 🟢/🟡/🔴 · ข้อควรระวัง · คำสั่งที่ใช้ติดตั้งจริง
