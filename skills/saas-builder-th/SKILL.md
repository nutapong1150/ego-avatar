---
name: saas-builder-th
description: >
  วิเคราะห์และสร้างเอกสาร Plan, Architecture และ Database Schema สำหรับระบบ SaaS ที่เน้นตลาดประเทศไทยเป็นหลัก
  รวบรวม Best Practice สำหรับคนไทย (Beam Checkout, LINE Login/Notify, PDPA, B2B Tax)
  Trigger เมื่อผู้ใช้ขอ: สร้าง saas, วางโครงสร้าง saas, ออกแบบ saas, saas ในไทย
---

# SaaS Builder (Thailand Edition) - Skill

## เมื่อไรจะใช้ Skill นี้
- ผู้ใช้ต้องการเริ่มต้นสร้างระบบ SaaS ใหม่ และต้องการให้วางแผนโครงสร้างให้เหมาะสมกับตลาดประเทศไทย
- ผู้ใช้มีไอเดีย SaaS แต่ยังไม่รู้จะวาง Architecture อย่างไรให้ตอบโจทย์พฤติกรรมคนไทย

## ข้อกำหนดทางเทคนิค (Tech Stack) พื้นฐาน
- Frontend และ Backend: Next.js (App Router)
- Styling: Tailwind CSS
- Database และ ORM: Supabase + Prisma
- Hosting: Vercel
- Payment: Beam Checkout (https://beamcheckout.com/th/pricing/checkout - รองรับ QR PromptPay)
- Authentication: LINE Login เป็นหลัก
- Notification: LINE Messaging API (LINE OA)

*หมายเหตุ: หาก AI ประเมินว่ามี Tech Stack ตัวอื่นที่เหมาะสมกับ Requirement ของผู้ใช้มากกว่า Base Stack นี้ (อาจเปลี่ยนทั้งหมดหรือสลับบางตัว) ให้ AI เสนอทางเลือกพร้อมข้อดี/ข้อเสีย และสอบถามเพื่อขออนุมัติจากผู้ใช้ก่อนตกลงใช้ Tech Stack นั้นในการวางแผน*

## กฎสำคัญด้านรูปแบบ (Style Guidelines)
1. ห้ามใช้ Emoji เด็ดขาด ในการโต้ตอบกับผู้ใช้และการสร้างเอกสารทั้งหมด (เช่น ห้ามใช้เครื่องหมายถูก, หน้าคน, สัญลักษณ์ต่างๆ ที่เป็น Emoji)
2. ใช้ภาษาไทยเป็นหลัก เน้นความกระชับ เป็นมืออาชีพ และอ่านง่าย
3. ห้ามเขียนโค้ดหรือ Setup โปรเจกต์โดยพลการ หน้าที่ของ Skill นี้คือสร้างเอกสาร Plan เท่านั้น

## ขั้นตอนการทำงาน

### Phase 1: สัมภาษณ์และรวบรวมข้อมูล (Grill-me)
เริ่มต้นด้วยการแนะนำให้ผู้ใช้พิมพ์ /grill-me หรือทำการสอบถามผู้ใช้ทีละคำถาม (Interactive) เพื่อกำหนดขอบเขตให้ชัดเจนก่อนวางแผน:
1. Target Audience: ระบบนี้เน้นผู้ใช้ระดับองค์กร/ทีม (B2B) หรือ ผู้ใช้งานส่วนบุคคลทั่วไป (B2C)?
2. Monetization Model: รูปแบบการเก็บเงินผ่าน Beam Checkout เป็นแบบไหน? (เช่น จ่ายล่วงหน้าแบบต่ออายุเอง, เติมเครดิต, หรือซื้อขาด)
3. Tax & Billing (สำหรับ B2B): ลูกค้าเป้าหมายต้องการขอใบกำกับภาษีเต็มรูป (e-Tax) และมีการหัก ณ ที่จ่าย (3%) หรือไม่?
4. Notification: ต้องการให้ระบบส่งการแจ้งเตือนสถานะต่างๆ ผ่าน LINE OA ถึงผู้ใช้ด้วยหรือไม่?
5. Core Value: ฟีเจอร์หลัก 1-2 อย่างที่แก้ปัญหาให้ลูกค้าได้จริงๆ คืออะไร?
6. Tech Stack Confirmation: หลังจากได้ Requirement ทั้งหมดแล้ว ให้ AI ประเมินว่า Base Tech Stack เหมาะสมหรือไม่ หากมีตัวอื่นเหมาะสมกว่าให้เสนอแนะและตกลงกับผู้ใช้ให้จบก่อนไป Phase 2

### Phase 2: วิเคราะห์และออกแบบ Architecture สำหรับตลาดไทย
เมื่อได้ข้อมูลครบถ้วน ให้ออกแบบระบบโดยคำนึงถึง 4 จุดแข็งสำหรับตลาดไทย:
1. Payment Flow: ออกแบบ Flow การจ่ายเงินผ่าน QR PromptPay (Beam Checkout) ที่ลดความยุ่งยากของการตัดบัตรเครดิต
2. Trust & Support: วางแผนจุดเชื่อมต่อสำหรับ Customer Support (เช่น ปุ่มติดต่อแอดมินผ่าน LINE OA)
3. Legal Compliance: เพิ่มการรองรับ PDPA (Cookie Consent, Privacy Policy) โดยเฉพาะเมื่อมีการใช้ LINE Login
4. Database Schema (Prisma): ออกแบบตารางให้รองรับ Multi-tenant (ถ้าเป็น B2B), การเก็บประวัติ Transaction (Beam Checkout), และข้อมูลที่จำเป็นสำหรับการออกใบเสร็จ/ใบกำกับภาษี

### Phase 3: สร้างเอกสาร Plan และ Architecture
สร้างไฟล์เอกสาร (เช่น `saas-architecture-[ชื่อโปรเจกต์].md`) ในพื้นที่ของโปรเจกต์ โดยมีโครงสร้างดังนี้:

```markdown
# [ชื่อโปรเจกต์] - SaaS Architecture และ MVP Plan
> วันที่: [ระบุวันที่] | ตลาดเป้าหมาย: ประเทศไทย

## 1. ข้อมูลรวมของระบบ (System Overview)
- เป้าหมายของระบบ: [คำอธิบาย]
- กลุ่มเป้าหมาย: [B2B / B2C]
- รูปแบบการหารายได้: [อธิบายวิธีการเก็บเงินผ่าน Beam Checkout]
- ระบบยืนยันตัวตนและการแจ้งเตือน: [LINE Login และ LINE OA]

## 2. โครงสร้างเทคโนโลยี (Tech Stack)
- Web Framework: Next.js (App Router)
- CSS Framework: Tailwind CSS
- Database: Supabase (PostgreSQL) + Prisma ORM
- Payment Gateway: Beam Checkout (QR PromptPay)
- Deployment: Vercel

## 3. การรองรับข้อกำหนดตลาดไทย (Thai Market Compliance)
- การออกใบกำกับภาษี/หัก ณ ที่จ่าย: [วิธีการจัดการถ้ามี]
- PDPA และการจัดการข้อมูลส่วนบุคคล: [Cookie Consent, Privacy Policy]
- ช่องทางการสนับสนุนลูกค้า (Customer Support): [LINE OA / Facebook Messenger]

## 4. โครงสร้างฐานข้อมูล (Database Schema)
[เขียนโค้ด Prisma Schema ที่ครอบคลุม User, Tenant(ถ้าเป็น B2B), Payment Transaction, และ Core Data]

## 5. แผนการพัฒนา MVP (MVP Execution Plan)
[แบ่งขั้นตอนการพัฒนาเป็น Task ย่อยๆ เรียงตามลำดับความสำคัญ P0, P1]
```

### Phase 4: ส่งมอบและรอคำสั่ง
- เมื่อสร้างเอกสารเสร็จ ให้แจ้งผู้ใช้ให้ทราบ
- แนะนำผู้ใช้ว่า "หากต้องการให้เริ่มเขียนโค้ดในส่วนใด สามารถสั่ง /goal เพื่อเริ่มกระบวนการพัฒนาตาม Plan ได้เลย"
