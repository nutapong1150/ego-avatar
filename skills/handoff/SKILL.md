---
name: handoff
description: Writes and reads a per-workspace handoff document so a future session (even on another machine) resumes in-progress work exactly where it stopped. Use when wrapping up / ending a session ("handoff", "ส่งไม้ต่อ", "ส่งต่องาน", "จะปิด session", "wrap up", "พอแค่นี้ก่อน") or when resuming / picking up work ("resume", "กลับมาทำต่อ", "งานค้างตรงไหน", "ค้างไว้ที่ไหน"). NOT for writing a fresh implementation plan (use writing-plans / executing-plans) or saving durable project facts & preferences (use memory-management).
argument-hint: "ชื่อย่อ session (ถ้ามี)"
---

# ส่งไม้ต่อ (Handoff) — ส่งต่องานให้ "ตัวเราในอนาคต"

หลักการ: handoff ที่ดีคือ **"แท่นปล่อยจรวด" ไม่ใช่ "ไดอารี่"** — สรุปสถานะให้ future-me กระโดดทำงานต่อได้ทันที ข้าม session ข้ามเครื่องก็ได้
**ห้ามก๊อปโค้ดทั้งก้อนลงเอกสาร** (กิน token + ทำให้ AI สับสน) — สรุปเป็นข้อความ อ้างอิง file:line แทน

## ที่เก็บ (กฎ Workspace)
- ทุก workspace มีโฟลเดอร์กลาง `0_public_eco_doc/` ที่รากของ workspace — ทุกไฟล์ที่ ego_avatar สร้างให้จัดเข้าที่นี่อย่างมีระเบียบ
- เอกสาร handoff อยู่ใน `0_public_eco_doc/handoff/`
- ตั้งชื่อไฟล์: `YYYY-MM-DD-HH-MM_handoff_<ชื่อย่อ>_<wip|done>.md`
  - timestamp เรียงตามตัวอักษร = เรียงตามเวลา → **"ไฟล์ใหม่สุด = ตัวที่ต้องอ่าน"** โดยอัตโนมัติ ไม่ต้องมี pointer
  - `_wip` = session ยังค้าง · `_done` = งานจบแล้ว
  - **สร้างไฟล์ใหม่เรื่อยๆ ทุกครั้งที่ handoff (ไม่ทับของเดิม)** — 1 workspace เก็บประวัติได้หลาย session

## WRITE — เขียน handoff (ตอน wrap up หรือสั่ง /handoff)
สร้างไฟล์ใหม่ตามรูปแบบชื่อข้างบน เนื้อหา:

```markdown
---
pinned_commit: <git rev-parse --short HEAD>   # ไว้เช็คว่า handoff เก่ากว่าโค้ดจริงไหม
updated: <ISO datetime +07:00>
branch: <ชื่อ branch>
session: <ชื่อย่อ>
status: wip | done
---
# 🎯 GOAL            — กำลังทำฟีเจอร์อะไร
# ✅ DONE             — อะไรเสร็จสมบูรณ์แล้ว
# 🔨 IN-PROGRESS / BLOCKED — ค้างตรงไหน (file:line) · ติดปัญหาอะไร · NEXT = 1 action ถัดไปแบบชี้เป้า
# 🧭 DECISIONS        — เลือกอะไร เพราะอะไร (กันเถียงเรื่องเดิมซ้ำ)
# ⛔ DO-NOT-REPEAT     — ลองแล้วไม่เวิร์ก อย่าทำซ้ำ (git มองไม่เห็น = ของที่หายแล้วเจ็บสุด)
```

- อย่า duplicate สิ่งที่มีใน PRD/plan/ADR/commit/diff อยู่แล้ว — อ้างอิง path หรือ URL แทน
- Redact ความลับเสมอ (API key, password, PII)

## READ — อ่าน handoff ตอน resume (เป็น Router ไม่ใช่ Executor)
1. เปิด `0_public_eco_doc/handoff/` เลือก **ไฟล์ใหม่สุด** ของ session ที่จะทำต่อ (ถ้ามีหลาย session ปนกัน ถามท่านสั้นๆ)
2. เช็ค staleness: `git log <pinned_commit>..HEAD --oneline` — ถ้ามี commit ใหม่หลังจากนั้น แจ้งท่านว่า handoff อาจเก่า ให้ดู diff ก่อน
3. สรุปกลับให้ท่าน **3 บรรทัด**: GOAL / ค้างตรงไหน / NEXT
4. Route ต่อ: ถ้าชี้ไป plan → `executing-plans` · ถ้าเป็นข้อเท็จจริงถาวร → `memory-management` · นอกนั้นลุยต่อเอง

## เส้นแบ่งกับสกิลอื่น (กัน trigger ชน)
- **handoff** = สถานะ *ชั่วคราว กำลังคาราคาซัง* ("resume งานนี้ที่ค้างไว้")
- **writing/executing-plans** = ขั้นตอนงานที่ *รู้ล่วงหน้า* หลาย session
- **memory-management** = ข้อเท็จจริง *ถาวร* ของโปรเจกต์/ผู้ใช้
