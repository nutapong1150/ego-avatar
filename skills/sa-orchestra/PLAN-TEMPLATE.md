# แม่แบบ plan ของ sa-orchestra

คัดลอกโครงด้านล่างไปที่ `0_public_eco_doc_claude/plans/YYYY-MM-DD-<หัวข้อ>.md` แล้วเติม · ส่วน "ตารางหลักฐาน" Tester เป็นคนกรอก ส่วน "ผลรีวิว" MAIN เป็นคนกรอก

````markdown
# <หัวข้อ>

> สถานะ: ร่าง | อนุมัติแล้ว | กำลังทำ T<n> | เสร็จ รอท่าน verify
> requirement: <ที่มา — ข้อความท่าน / issue / spec>
> repo / branch: <repo> / <branch>

## ภาพรวม

```
<ภาพ ASCII หรือ mermaid: flow หรือ ก่อน→หลัง>
```

## สภาพแวดล้อม (MAIN เติมจาก memory/AGENTS.md ของ workspace)

- โปรไฟล์: `<path โปรไฟล์ใน sa-orchestra/profiles/>`
- build: `<คำสั่ง build เต็ม>`
- test: `<คำสั่งรัน test / test ไฟล์เดียว>`
- กฎ git: <เช่น ห้าม commit/checkout — ท่าน commit ผ่าน Eclipse>
- ข้อห้ามเฉพาะงาน: <ถ้ามี>

## Tasks

### T1 — <ชื่อ>  [เล็ก]?
- ทำอะไร: <สั้น>
- ไฟล์ที่คาดว่าแตะ: <list>
- เกณฑ์ผ่าน:
  - [ ] T1.1 <เกณฑ์> → พิสูจน์ด้วย: <build | unit test ชื่อ | file:line | grep | manual>
  - [ ] T1.2 ...

### T2 — ...

## ตารางหลักฐาน (Tester กรอก)

| เกณฑ์ | วิธีพิสูจน์ | ผล | หลักฐาน (คำสั่ง + output ย่อ / file:line) | รอบ |
|---|---|---|---|---|
| T1.1 | | ✅/❌ | | 1 |

## ผลรีวิว (MAIN กรอก)

### T1 รอบ 1
- Spec: <ผ่าน / ข้อที่ขาด>
- Standards: <ผ่าน / ข้อในโปรไฟล์ที่ผิด + file:line>
- Security(diff): <ผ่าน / ประเด็น>
- ตัดสิน: ผ่าน | ส่งแก้

## สรุปผล (ปิดงาน)

- build/test เต็ม: <ผล>
- ไฟล์ที่ stage: <git diff --cached --stat>
- ข้อสังเกต / สิ่งที่ไม่ได้ทำ: <...>

## สคริปต์ manual test ให้ท่าน

1. <URL / ขั้นตอน> → ควรเห็น: <...>

## ร่าง commit message

```
<ข้อความ>
```
````
