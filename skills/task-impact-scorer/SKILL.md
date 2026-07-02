---
name: เนตรชั่งน้ำหนักภาระ (Task Impact Scorer)
description: สกิลพื้นฐานสำหรับประเมินความซับซ้อนและ Impact ของงานด้วยกรอบมาตรฐานสากล ใช้ก่อนเลือกโหมดหรือสกิลทุกครั้ง
source: Research-based — AI Agent Complexity Spectrum (applied-ai.com), Story Points (Atlassian/Scrum.org), Cognitive Complexity (getdx.com)
---

# เนตรชั่งน้ำหนักภาระ (Task Impact Scorer)

## หลักการ (Why)
Best Practice จาก Industry ชี้ว่า "matching solution complexity to problem complexity" คือกุญแจสำคัญในการประหยัดทรัพยากรและลดความผิดพลาด (Applied AI, 2024) การใช้เครื่องมือที่ทรงพลังเกินจำเป็นทำให้เกิด hallucination และเปลือง Token โดยไม่จำเป็น

## กรอบวัด Impact: 2 มิติ (Depth × Width)
อิงจาก ArXiv Research และ AI Agent Complexity Spectrum:

- **Depth (ความลึกของ Logic):** ต้องคิดกี่ขั้นตอนต่อเนื่องกัน?
- **Width (ความกว้างของทักษะ):** ต้องใช้ Domain, Tool, หรือ File กี่ประเภท?

## ตารางการจัดระดับ Impact (Tier System)

| Tier | ชื่อ | Depth | Width | ตัวอย่าง | Action ของข้า |
|------|------|-------|-------|----------|--------------|
| **T0** | Instant | ไม่ต้องคิด | 0 Domain | ตอบข้อเท็จจริง, แปลภาษา, แก้ Typo | ตอบทันทีด้วย Kaiju Core |
| **T1** | Simple | 1-2 ขั้น | 1 Domain, ≤1 File | เขียน Function เดียว, อธิบาย concept | Eco-Sniper, ลงมือทันที |
| **T2** | Moderate | 3-5 ขั้น | 2-3 Domain, 2-5 Files | Feature เล็ก, Debug ชัดเจน, Refactor 1 Module | Eco-Sniper + แจ้งแผนก่อน 1 บรรทัด |
| **T3** | Complex | 6+ ขั้น | 4+ Domain, >5 Files หรือกระทบ Architecture/DB/API | Feature ใหญ่, System Design, Migration | หยุด! ถามท่านก่อน: Eco หรือ Full Power? |
| **T4** | Ultimate | Multi-session | Cross-system, กระทบ Production | Codebase Refactor ทั้งระบบ, New Architecture | Full Power + Ultimate Skill เท่านั้น |

## กฎการชั่งน้ำหนักเพิ่มเติม (Risk Multipliers)
อิงจาก Cognitive Complexity (SonarSource) และ Story Points Best Practice (Atlassian):

- **+1 Tier** หากงานนั้นแตะ Legacy Code หรือโค้ดที่ไม่มี Test คลุม
- **+1 Tier** หากมี Dependency ภายนอก (API, DB Schema, Third-party)
- **+1 Tier** หากมีความคลุมเครือ (Ambiguity) ในสิ่งที่ต้องการ
- **-1 Tier** หากเราเคยทำงานลักษณะนี้สำเร็จมาแล้วในบริบทเดียวกัน

## กฎเหล็ก (Non-negotiable Rules)
1. **ห้ามใช้ Ultimate Skill กับ T0-T2** — ผลลัพธ์เหมือนกัน แต่ Token หายไป 100x
2. **T3 ขึ้นไปต้องรายงานก่อนเสมอ** — ระบุว่างานอยู่ที่ Tier ไหน และเพราะอะไร
3. **ถ้าไม่แน่ใจ ให้ยกระดับขึ้น 1 Tier ไว้ก่อน** (Conservative Bias) — ดีกว่าประเมินต่ำแล้วพลาด
4. **ทุก Session ต้องใช้ Scorer นี้เป็น Pre-flight Check** ก่อนเลือกสกิลหรือโหมด

## การแมปกับระบบของไคจู

| Tier | โหมดพลังงาน | สกิลที่เหมาะสม |
|------|------------|----------------|
| T0-T1 | Eco-Sniper | Kaiju Core, ทักษะเดี่ยวที่เฉพาะเจาะจง |
| T2 | Eco-Sniper | Unique Skills ที่ตรงประเด็น |
| T3 | Full Power (ต้องถามท่านก่อน) | Unique Skills หลายตัวร่วมกัน |
| T4 | Full Power (ต้องถามท่านก่อน) | Ultimate Skills เท่านั้น |
