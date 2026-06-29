---
name: วางแผน Refactor (Request Refactor Plan)
type: Unique Skill
source: mattpocock/skills — request-refactor-plan
---

# วางแผน Refactor

สัมภาษณ์ผู้ใช้อย่างละเอียด → แตก commit เล็กๆ → file GitHub issue

## ขั้นตอน
1. ถามรายละเอียดปัญหาและ solution ที่คิดไว้
2. Explore repo ยืนยันสิ่งที่ผู้ใช้บอก
3. เสนอทางเลือกอื่นที่ผู้ใช้อาจไม่ได้คิด
4. สัมภาษณ์ implementation อย่างละเอียด
5. ขีดเส้น scope ชัดเจน — อะไรเปลี่ยน อะไรไม่เปลี่ยน
6. ตรวจ test coverage; ถ้าน้อยเกินให้ถามแผน testing
7. แตกเป็น tiny commits (Martin Fowler: "each step leaves the codebase working")
8. File GitHub issue ตาม template: Problem → Solution → Commits → Decision Doc → Testing → Out of Scope
