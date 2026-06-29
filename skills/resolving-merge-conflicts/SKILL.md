---
name: แก้ Merge Conflict (Resolving Merge Conflicts)
type: Unique Skill
source: mattpocock/skills — resolving-merge-conflicts
---

# แก้ Merge Conflict

5 ขั้นตอน — ห้าม `--abort`

1. ดู state ปัจจุบัน (git history + ไฟล์ที่ conflict)
2. หา source ของแต่ละ conflict — อ่าน commit message, PR, issue เพื่อเข้าใจ intent
3. แก้แต่ละ hunk: รักษา intent ทั้งสองฝั่งถ้าทำได้; ถ้าขัดกัน เลือกฝั่งที่ตรงเป้าหมาย merge + note trade-off
4. รัน automated checks: typecheck → tests → format
5. Stage ทั้งหมดแล้ว commit; ถ้า rebase ให้ continue จนเสร็จ
