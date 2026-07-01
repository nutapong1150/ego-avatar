---
name: tax-year-master-sync
description: ทักษะการเช็ค Master Data เมื่อมีการเพิ่มปีภาษีใหม่ เพื่อป้องกันบั๊กจากการตั้งค่า DB (เช่น ITPC_PND51_TAX_RATE) หาย Trigger เมื่อผู้ใช้ขอ: เพิ่มปีภาษี, เปลี่ยนปี, new tax year
---

# เนตรผสานปีภาษี (Tax Year Master Sync)

เมื่อได้รับมอบหมายให้ "เพิ่มปีภาษีใหม่" (เช่น เปลี่ยนจาก 2568 เป็น 2569) ห้ามโฟกัสแค่การเปลี่ยนค่าปีใน `Dropdown (UI / Bean)` และ `XHTML` เพียงอย่างเดียว!

ให้ใช้ Checklist ดังนี้เสมอ:
1. **Frontend & Bean:** แก้ไขลูป Dropdown ปีภาษี
2. **XHTML Files:** คัดลอกไฟล์หน้าจอของปีเก่ามาเป็นปีใหม่
3. **Validation Rules:** เช็คว่ามีกฏเฉพาะปีใน `Validate*.java` หรือไม่
4. **[CRITICAL] Master Data in Database:** ค้นหาตารางคอนฟิกในฝั่ง Backend (เช่น `ITPC_*_TAX_RATE`, `ITPC_*_REDUCTION`) ว่าจำเป็นต้องมีข้อมูลของปีภาษีใหม่หรือไม่
   - หากเจอ ให้แนะนำผู้ใช้ทันทีว่าต้อง "เตรียม Script SQL ข้อมูลของปีใหม่ลง Database ด้วย" เพื่อป้องกัน `NullPointerException` หรือ `ArrayIndexOutOfBoundsException` ตอนประมวลผล

จงจำไว้ว่า: เปลี่ยน UI ผ่าน แต่ Validation พังเพราะ Backend โหลด Config จากฐานข้อมูลไม่เจอ คือจุดตายที่พบบ่อยที่สุด!
