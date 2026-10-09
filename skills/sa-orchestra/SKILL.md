---
name: sa-orchestra
description: วาทยกรสถาปนิก — main session เป็น SA/Architect/Reviewer วาง plan ให้ท่านอนุมัติ แล้วคุม sub-agent Developer + Tester ทำทีละ task จนพิสูจน์ผ่านด้วยหลักฐาน ใช้เมื่อ (1) งานแก้โค้ดระดับ T2 ขึ้นไป (2) ท่านสั่ง "ประกบงาน" / "sa-orchestra" (3) ท่านสั่ง "ตรวจช่องโหว่" / "security audit" ของ repo
---

# วาทยกรสถาปนิก (SA Orchestra)

```
ท่าน ─requirement─► [MAIN = SA/Architect/Reviewer]
                       │ 1 เข้าใจ  2 plan + เกณฑ์ผ่าน
                       ▼
                 ท่านอนุมัติ plan  ◄── ประตูเดียวก่อนลงมือ
                       │
         ┌─► [ego-avatar:sa-developer]  แก้โค้ด + test ที่ทำได้
         │             ▼
         │   [ego-avatar:sa-tester]     พิสูจน์อิสระ กรอกตารางหลักฐาน
         │             ▼
         │   [MAIN review]  Spec · Standards(โปรไฟล์) · Security(diff)
         └── ไม่ผ่าน (รอบที่ ≤ 3)
                       │ ผ่านครบทุก task
                       ▼
          stage + ร่าง commit message + รายงาน + สคริปต์ manual test
                       ▼
             ท่าน verify / manual test / commit เอง
```

MAIN คิด ตัดสิน และรีวิว · sub-agent ลงมือ · ท่านอนุมัติและ commit — แต่ละฝ่ายอยู่ในบทของตัวเองตลอดงาน

**โหมดตรวจช่องโหว่ทั้ง repo** ("ตรวจช่องโหว่", "security audit") → ทำตาม [AUDIT.md](AUDIT.md) แทนขั้นตอนข้างล่าง

## กฎตายตัวทุกงาน

- **git:** ทำตามกฎ git ของ workspace (CLAUDE.md / memory) · ค่าเริ่มต้นคือ sub-agent แตะแค่ working tree · MAIN `git add` เฉพาะไฟล์ของงาน + ร่าง commit message · commit / push / checkout / stash เป็นของท่าน
- **เซิร์ฟเวอร์:** การพิสูจน์บนหน้าจอจริงเป็นของท่าน → เขียนเป็นสคริปต์ manual test (URL, ขั้นตอน, ผลที่ควรเห็น)
- **โปรไฟล์ภาษา:** เลือกจาก `profiles/` ตาม stack ของ repo (Java 8 / JSF / JPA → [profiles/java-legacy-jsf.md](profiles/java-legacy-jsf.md)) ไม่มีโปรไฟล์ตรง → ใช้ karpathy-discipline + smell baseline ของ code-review แล้วเสนอท่านเขียนโปรไฟล์ใหม่
- **ข้อเท็จจริงเฉพาะเครื่อง/บริษัท** (คำสั่ง build, path repo, IP) อยู่ใน memory / AGENTS.md ของ workspace — MAIN ใส่ลง plan ส่วน "สภาพแวดล้อม" ให้ sub-agent อ่านจากที่เดียว

## ขั้นตอน

### 1. เข้าใจ requirement

อ่าน requirement + โค้ดที่เกี่ยวข้อง + เอกสารเดิม (handoff, plan, spec ใน `0_public_eco_doc_claude/`) ข้อเท็จจริงไหนหาเองได้ให้หาเอง (ใช้ Explore agent ถ้ากว้าง) ส่วนการตัดสินใจที่ยังเปิดอยู่ → `ego-avatar:grilling` กับท่าน

เสร็จเมื่อ: ไม่เหลือการตัดสินใจที่ข้าต้องเดาแทนท่าน

### 2. เขียน plan

สร้าง `0_public_eco_doc_claude/plans/YYYY-MM-DD-<หัวข้อ>.md` ตาม [PLAN-TEMPLATE.md](PLAN-TEMPLATE.md) — 1 requirement = 1 ไฟล์ ใช้ไฟล์นี้ไฟล์เดียวจนจบงาน

- แตกเป็น task แบบ tracer bullet (แต่ละ task ทำแล้ว build ผ่านและตรวจได้ด้วยตัวเอง) เรียงตามลำดับที่ต้องทำ
- ทุก task มี **เกณฑ์ผ่าน** ที่ตรวจได้ และทุกเกณฑ์ระบุ **วิธีพิสูจน์** ไว้ล่วงหน้า: build · unit test · อ้าง `file:line` · grep · สคริปต์ manual test
- task ที่แก้ไม่เกิน ~2 จุดและตรวจด้วยตาได้ ติดป้าย `[เล็ก]` → MAIN ตรวจเองแทน Tester

เสร็จเมื่อ: ทุก task มีเกณฑ์ผ่านครบ และทุกเกณฑ์มีวิธีพิสูจน์

### 3. ขออนุมัติ

แสดงภาพรวม plan (ภาพ + ตาราง task) ในแชท แล้วรอท่านตอบ "อนุมัติ" หรือสั่งแก้ · แก้แล้วแสดงใหม่จนกว่าจะอนุมัติ

### 4. วนทีละ task (เรียงตาม plan)

**a. Developer** — เรียก Agent `ego-avatar:sa-developer` แบบ foreground ส่งแค่ pointer: path ของ plan + เลข task + path โปรไฟล์ (ห้ามก๊อปเนื้อหา plan ลง prompt)

**b. Tester** — เรียก Agent `ego-avatar:sa-tester` ด้วย pointer ชุดเดียวกัน Tester พิสูจน์ทุกเกณฑ์เองแล้วกรอกตารางหลักฐานใน plan (`[เล็ก]` → MAIN ตรวจเองแล้วกรอกตาราง)

**c. MAIN review** บน `git diff` ของ task นี้ ครบ 3 แกน แยกหัวข้อ ไม่รวมคะแนน:
- **Spec** — ทำครบตามเกณฑ์ไหม · มีของเกินที่ไม่ได้ขอไหม
- **Standards** — ทุกข้อในโปรไฟล์ + smell baseline ของ `ego-avatar:code-review`
- **Security (diff)** — รายการ "diff mode" ใน [AUDIT.md](AUDIT.md)

**d. ตัดสิน**
- ผ่าน → บันทึกผลรีวิวลง plan → task ถัดไป
- ไม่ผ่าน → ส่งข้อที่ต้องแก้ (อ้าง `file:line`) กลับไปที่ Developer ตัวเดิมด้วย SendMessage แล้ววนข้อ b–c ใหม่ · นับรอบ
- ครบ 3 รอบยังไม่ผ่าน → หยุด รายงานท่านว่าติดตรงไหน + ทางเลือก 2–3 ทาง แล้วรอคำตัดสิน

เสร็จเมื่อ: ทุก task ผ่าน review และทุกแถวในตารางหลักฐานมีผลจริง (ไม่มีช่องว่าง ไม่มี "น่าจะ")

### 5. ปิดงาน

1. build เต็ม 1 รอบ + test ทั้งหมดที่มี
2. `git add` เฉพาะไฟล์ใน plan → ตรวจ `git diff --cached --stat` ว่าไม่มีไฟล์เกิน และไม่มี diff ที่เกิดจาก CRLF/LF อย่างเดียว
3. เติมส่วนท้าย plan: สรุปผล · สคริปต์ manual test · ร่าง commit message (ภาษาตาม repo)
4. รายงานท่านในแชท: ภาพก่อน→หลัง + ตาราง task/ผล/หลักฐาน + ลิงก์ plan
5. บันทึกงานตามกฎ note-me ของ workspace

เสร็จเมื่อ: ท่านมีทุกอย่างพอจะ verify และ commit ได้โดยไม่ต้องถามข้อมูลเพิ่ม
