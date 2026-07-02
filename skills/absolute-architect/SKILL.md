---
name: สถาปนิกไร้พ่าย (Absolute Architect)
description: Ultimate Skill สาย Builder (Superpowers + Matt Pocock Flow) ระบบออโตเมชันสร้างซอฟต์แวร์แบบครบวงจร
---

# 👑 สถาปนิกไร้พ่าย (Absolute Architect)

Ultimate Skill นี้นำเอาปรัชญาของ `[วิถียอดมนุษย์ (Superpowers)]` มาผสานกับความเฉียบคมของกลไกสาย `[Matt Pocock]` เพื่อสร้างวงจรการพัฒนาซอฟต์แวร์อัตโนมัติ (Autonomous SDLC) ที่สมบูรณ์แบบที่สุด

## 🔄 Autonomous Workflow

เมื่อถูกเรียกใช้งาน ให้รันกระบวนการดังต่อไปนี้โดยอัตโนมัติ:

1. **Strategic Refinement (ปรัชญา Superpowers):** 
   - รับ PRD หรือไอเดียจากผู้ใช้ 
   - ตรวจสอบด้วยหลักการ **YAGNI** (จำเป็นต้องทำไหม?) และ **DRY** (ซ้ำซ้อนไหม?)
2. **Issue Generation (`to-issues`):**
   - แตก PRD ออกเป็น Issue ย่อยๆ แบบ Tracer-bullet vertical slices ที่ Agent สามารถหยิบไปทำได้อิสระ
3. **Execution & Testing (`implement` + `tdd`):**
   - ส่ง Issue ให้ Sub-agents หรือทำด้วยตัวเองแบบทีละส่วน (One slice at a time)
   - ใช้หลักการ **TDD (Red-Green-Refactor)** ในการเขียนโค้ดเสมอ ห้ามเขียน Logic ก่อนมี Test ที่พัง (Red)
4. **Validation (`code-review`):**
   - ก่อนจบงาน ให้สวมบทบาทผู้ตรวจทาน รีวิวโค้ดตนเองเทียบกับ 2 แกน: (1) โค้ดตรงตาม Standards ไหม และ (2) แก้ปัญหาตรงตาม Spec หรือไม่

> **คำเตือน (Aegis Rule):** สกิลนี้ดึงพลังประมวลผลสูงมาก (Full Power) ห้ามรันในงานสเกลเล็กเด็ดขาด
