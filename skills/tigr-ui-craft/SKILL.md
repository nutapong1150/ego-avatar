---
name: tigr-ui-craft
description: "วิจิตรศิลป์แห่งเสือ: ทักษะการออกแบบและพัฒนา Modern UX/UI สไตล์ TIGR (Practical, 60-30-10, Glassmorphism, Micro-interactions)"
---

# Tigr UI Craft (วิจิตรศิลป์แห่งเสือ)

สกิลนี้สกัดมาจากแนวทางการออกแบบของ "tigrtigerr" (Thai UI/UX Content Creator) ซึ่งเน้นความทันสมัย (Modern) ใช้งานได้จริง (Practical) และสวยงามระดับ Premium เมื่อไคจูเปิดใช้งานสกิลนี้ หรือถูกขอให้เขียน UI/Frontend จะต้องปฏิบัติตามกฎเหล็ก 5 ข้อนี้อย่างเคร่งครัด

## กฎเหล็ก 5 ประการแห่งวิจิตรศิลป์ (The 5 Core Principles)

### 1. กฎสี 60-30-10 (Color Harmony)
- **60% Primary Color:** สีพื้นหลังที่สบายตา (มักจะเป็นสีขาวสะอาด, Off-white หรือ Dark Mode ที่นุ่มลึก ไม่ดำสนิท)
- **30% Secondary Color:** สีรองที่ใช้เสริมองค์ประกอบ เช่น การ์ด (Cards), เส้นขอบ (Borders), หรือ Navbar
- **10% Accent Color:** สีสันสดใส (Vibrant) ที่ดึงดูดสายตา ใช้สำหรับปุ่ม (CTA), สถานะสำคัญ, หรือไอคอน ห้ามใช้สี Accent พร่ำเพรื่อเด็ดขาด

### 2. Modern Effects (มิติแห่งความล้ำสมัย)
- **Mesh Gradients:** ใช้พื้นหลังแบบไล่สี (Gradient) ที่ละมุนและมีมิติ แทนที่จะใช้สีพื้นทื่อๆ
- **Fractal Glass (Glassmorphism):** ใช้เอฟเฟกต์กระจกฝ้า (Blur/Backdrop-filter) ในส่วนของ Navbar, Modal หรือ Card ที่ลอยอยู่เหนือพื้นหลัง เพื่อสร้างความหรูหรา (Premium)
- **Soft Shadows:** ใช้เงาที่นุ่มลึกและกว้าง (Large spread, low opacity) เพื่อสร้างความรู้สึกว่า Element ลอยอยู่จริง หลีกเลี่ยงเงาที่เข้มและแข็งกระด้าง

### 3. Typography ขั้นสุด (Hierarchy & Readability)
- เลือกใช้ฟอนต์ยุคใหม่ (เช่น Inter, Roboto, Outfit หรือฟอนต์ภาษาไทยแนว Modern ไม่มีหัว หรือมีหัวที่ออกแบบมาอย่างดี)
- กำหนด Hierarchy ของตัวอักษรให้ชัดเจน:
  - `<h1>` ต้องใหญ่ ชัดเจน และมีน้ำหนัก (Bold/ExtraBold)
  - `Body` ต้องมีขนาดที่อ่านง่าย และสีไม่ดำสนิท (เช่น `#333333` หรือ `#4A5568` เพื่อลดความล้าของสายตา)
- กำหนด Line-height ให้หลวมพอดี (ประมาณ 1.5 - 1.6 สำหรับ Body)

### 4. Micro-interactions (ชีวิตแห่ง UI)
- ทุกๆ Element ที่ตอบสนองกับผู้ใช้ได้ (Button, Card, Link, Input) ต้องมี Hover State เสมอ
- ใส่ Transition ที่นุ่มนวล (เช่น `transition: all 0.3s ease;`)
- เพิ่มลูกเล่นเล็กๆ เช่น ปุ่มสว่างขึ้นเล็กน้อย, การ์ดยกตัวขึ้น, หรือไอคอนขยับเมื่อเอาเมาส์ไปชี้ เพื่อกระตุ้นความน่าใช้งาน

### 5. Usability First (ใช้งานง่าย ไม่สับสน)
- **Input Fields:** ต้องมี Label ชัดเจน มี Placeholder ที่ไม่งง และมี State เมื่อถูก Focus (เช่น ขอบสว่างขึ้น)
- **Icon Placement:** วางไอคอนในตำแหน่งที่สื่อความหมายชัดเจน และมีขนาดที่พอดีกับ Text ไม่แย่งจุดสนใจ
- **Spacing (Whitespace):** ให้พื้นที่หายใจกับ UI อย่างเต็มที่ (Generous Padding & Margin) อย่าจับทุกอย่างมายัดรวมกัน

## วิธีปฏิบัติ (Execution Trigger)
เมื่อเข้าสู่กระบวนการเขียน CSS/Tailwind หรือสร้าง Component:
1. หาก User ไม่ระบุสี ให้ใช้ **สี HSL สไตล์ Modern** (ห้ามใช้ red, blue, green แบบธรรมดา)
2. โครงสร้าง HTML ต้องมีความหมาย (Semantic) 
3. แจ้งเตือน User ด้วย `[Tigr UI Craft]` ว่ากำลังใช้หลักการ 60-30-10 และ Glassmorphism ในการออกแบบ

---
> 🔗 **ทำหน้า Landing Page?** ใช้คู่กับสกิล `landing-page-craft` เสมอ — tigr คุมความสวย (60-30-10, glass, เงานุ่ม), landing-page-craft คุม copy/โครง/conversion (มี Thai LINE-SaaS Playbook)

---
"ไม่ใช่แค่งานที่เสร็จ แต่ต้องเป็นศิลปะที่มีชีวิต" - ไคจู
