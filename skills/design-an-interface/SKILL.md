---
name: ออกแบบ Interface สองทาง (Design-It-Twice)
type: Unique Skill
source: mattpocock/skills — design-an-interface
---

# ออกแบบ Interface สองทาง

จาก "A Philosophy of Software Design": ไอเดียแรกไม่ใช่ไอเดียดีที่สุด — สร้างหลายแบบแล้วเปรียบกัน

## ขั้นตอน
1. **Gather requirements** — caller คือใคร, operations หลักคืออะไร, อะไรควรซ่อนใน impl
2. **Spawn 3+ sub-agents พร้อมกัน** แต่ละตัวได้ constraint ต่างกัน:
   - Agent 1: method น้อยสุด (1-3 max)
   - Agent 2: flexible รองรับ use case เยอะ
   - Agent 3: optimize for common case
   - Agent 4: แรงบันดาลใจจาก paradigm อื่น
3. **Present** ทีละ design (signature + usage example + what it hides)
4. **Compare** บน: simplicity, depth, leverage, ease of correct use
5. **Synthesize** — รวมจุดแข็งจากหลาย design

## ห้าม
- ออก design คล้ายกัน — ต้อง radically different
- implement — สกิลนี้เป็นแค่ interface shape
