---
name: ออกแบบโมดูลลึก (Codebase Design)
type: Unique Skill
source: mattpocock/skills — codebase-design
---

# ออกแบบโมดูลลึก

คำศัพท์และหลักการสำหรับออกแบบ "deep module" — พฤติกรรมเยอะหลัง interface เล็ก

## คำศัพท์หลัก (ใช้ให้ตรง อย่าเปลี่ยน)
- **Module** — อะไรก็ตามที่มี interface + implementation (function, class, package, tier)
- **Interface** — ทุกอย่างที่ caller ต้องรู้ (type signature + invariants + error modes + ฯลฯ)
- **Depth** — leverage ต่อ interface; module ลึก = พฤติกรรมเยอะ / interface เล็ก
- **Seam** — จุดที่สามารถเปลี่ยน behavior ได้โดยไม่แก้ในจุดนั้น
- **Adapter** — สิ่งที่ satisfy interface ที่ seam
- **Leverage** — สิ่งที่ caller ได้จาก depth
- **Locality** — สิ่งที่ maintainer ได้จาก depth (fix ที่เดียว แก้ทุกที่)

## หลักการ
- ถาม: ลด method ได้ไหม? ลด param ได้ไหม? ซ่อน complexity เข้าไปใน impl ได้ไหม?
- Deletion test: ถ้าลบ module ทิ้ง complexity กระจายไปหา N callers = module ได้งาน
- 1 adapter = hypothetical seam; 2 adapters = real seam — อย่าสร้าง seam จนกว่าจะมีของสองชิ้นที่ vary
