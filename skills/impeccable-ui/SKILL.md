---
name: impeccable-ui
description: ทักษะการใช้คำสั่ง Impeccable และกฎการออกแบบ UI/UX ที่ไร้ที่ติ หลีกเลี่ยง AI-slop
---

# วิจิตรศิลป์ไร้ที่ติ (Impeccable UI)

ทักษะนี้กลืนกินมาจาก [Impeccable](https://impeccable.style) เพื่อยกระดับงานออกแบบ Frontend ให้หลุดพ้นจาก AI-slop (รูปแบบเดิมๆ ที่ AI ชอบใช้) โดยนำเสนอ 23 คำสั่งสำหรับการทำซ้ำ (Iteration) และกฎการตรวจจับ Deterministic Detector 46 ข้อ

## กฎการออกแบบที่ต้องหลีกเลี่ยงเด็ดขาด (Anti-Patterns)
เพื่อให้งานออกแบบมีเอกลักษณ์และไม่ดูเป็น AI มากเกินไป ข้าจะหลีกเลี่ยงสิ่งเหล่านี้เสมอ:
- **ห้ามใช้ฟอนต์ที่โหลและจำเจ:** หลีกเลี่ยง Arial, Inter, System Defaults และหันมาใช้ฟอนต์ที่มีบุคลิกชัดเจน
- **ห้ามใช้ตัวหนังสือสีเทาบนพื้นหลังที่มีสี:** (No gray text on colored backgrounds)
- **ห้ามใช้สีดำหรือเทาบริสุทธิ์ (Pure black/gray):** ให้ผสมสี (Tint) เข้าไปในสีดำหรือเทาเสมอเพื่อให้กลมกลืนกับธีม
- **ห้ามจับทุกอย่างยัดลงใน Card หรือซ้อน Card ใน Card:** (No cards nested in cards)
- **ห้ามใช้ Easing แบบ Bounce/Elastic:** การแอนิเมชันเด้งดึ๋งนั้นดูเชยไปแล้ว ให้ใช้ Motion ที่มีความหมายแทน

## 23 คำสั่งแห่งความวิจิตร (Workflow Commands)
การนำไปประยุกต์ใช้ในโปรเจกต์ สามารถใช้ผ่านคำสั่ง `/impeccable` หลังจากติดตั้งผ่าน `npx impeccable install` และเริ่มด้วย `/impeccable init` เพื่อสร้าง `PRODUCT.md` และ `DESIGN.md`

### 1. วางแผนและลงมือสร้าง (Shape & Craft)
- `/impeccable shape`: คิดและวางแผน UX/UI ก่อนลงมือเขียนโค้ด
- `/impeccable craft`: ลงมือดีไซน์และสร้างตามแผนจบใน Flow เดียว

### 2. ตรวจสอบและประเมิน (Evaluate)
- `/impeccable critique`: รีวิว UX ดีไซน์ (ลำดับชั้น, ความชัดเจน, อารมณ์ความรู้สึก)
- `/impeccable audit`: ตรวจสอบคุณภาพทางเทคนิค (A11y, Performance, Responsive) (ระดับ P0 ถึง P3)

### 3. ขัดเกลาและยกระดับ (Refine & Polish)
- `/impeccable polish`: ปรับแต่งขั้นสุดท้ายให้งานเนี๊ยบระดับ Production
- `/impeccable bolder` ↔ `/impeccable quieter`: ปรับดีไซน์ให้โดดเด่นจัดจ้านขึ้น หรือลดความตะโกนลงให้เรียบหรู
- `/impeccable colorize`: เติมสีสันอย่างมีกลยุทธ์ให้กับ UI ขาวดำ
- `/impeccable typeset`: แก้ไขฟอนต์ ลำดับชั้น และขนาดตัวอักษร
- `/impeccable layout`: จัดการ Spacing และจังหวะการจัดวาง (Visual Rhythm)
- `/impeccable animate`: เพิ่ม Motion ที่มีความหมาย สื่อถึงสถานะ
- `/impeccable delight`: เพิ่มความสนุกและเสน่ห์ (Micro-interactions) ให้งานน่าจดจำ
- `/impeccable overdrive`: ทลายขีดจำกัดด้วยเอฟเฟกต์ระดับสูงสุด (Shaders, 60fps, Cinematic transitions)

### 4. เรียบง่ายและทนทาน (Simplify & Harden)
- `/impeccable distill`: สกัดและตัดสิ่งที่ไม่จำเป็นออกให้เหลือแต่แก่น
- `/impeccable clarify`: ปรับแก้ UX Copy ให้สื่อสารได้ชัดเจน
- `/impeccable adapt`: ปรับให้เข้ากับอุปกรณ์และบริบทที่ต่างกัน
- `/impeccable harden`: จัดการ Edge cases, Error states, Text overflow และ i18n
- `/impeccable onboard`: ออกแบบประสบการณ์ใช้งานครั้งแรก (First-run) และ Empty states
- `/impeccable optimize`: วิเคราะห์และแก้ปัญหา Performance (LCP ถึง Bundle size)

### 5. จัดการระบบ (System)
- `/impeccable document`: สร้าง `DESIGN.md` จากโค้ดที่มีอยู่
- `/impeccable extract`: ดึง Component และ Token กลับเข้าสู่ Design System
- `/impeccable live`: โหมดปรับแต่ง Visual ผ่านเบราว์เซอร์ 

## การประยุกต์ใช้ในฐานะไคจู (Ego Avatar Application)
หากโปรเจกต์ใดที่ไม่ได้ติดตั้ง Impeccable CLI โดยตรง ข้าจะ **สวมวิญญาณและใช้กฎของ Impeccable (Anti-Patterns)** ในการรีวิว (Critique) หรือร่างโค้ด (Craft) เสมอ เพื่อรับรองว่าผลงานของข้านั้นจะมีความประณีต ไร้ที่ติ (Impeccable) ในแบบฉบับที่เหนือกว่ามาตรฐานของ AI ทั่วไป
