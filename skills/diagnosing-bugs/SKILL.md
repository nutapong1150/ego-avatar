---
name: วงจรวินิจฉัยบั๊ก (Diagnosing Bugs)
type: Unique Skill
source: mattpocock/skills — diagnosing-bugs
---

# วงจรวินิจฉัยบั๊ก

กรอบ 6 เฟสสำหรับบั๊กยากและ performance regression

## แก่น: สร้าง Feedback Loop ก่อนเสมอ
ไม่มี loop ที่ tight & red-capable → ห้ามเดาสาเหตุ

## เฟส
1. **Build feedback loop** — test/curl/script ที่ red ได้บน bug นี้โดยเฉพาะ
2. **Reproduce + minimise** — ทำให้ repro เล็กสุดโดยยัง red อยู่
3. **Hypothesise** — เสนอ 3-5 สมมติฐาน + prediction ก่อนทดสอบ
4. **Instrument** — probe ทีละตัว, tag log ด้วย `[DEBUG-xxxx]`
5. **Fix + regression test** — เขียน test ก่อน fix ถ้ามี seam ที่ถูกต้อง
6. **Cleanup + post-mortem** — ลบ debug log, บันทึก hypothesis ที่ถูกใน commit

## กฎเหล็ก
- เจอ loop ก่อน → Phase 2; ไม่มี loop → หยุดแล้วบอกผู้ใช้
- เปลี่ยนตัวแปรทีละอย่างในการทดสอบ
