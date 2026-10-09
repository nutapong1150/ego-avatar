# โปรไฟล์: Java legacy web (Java 8 · JSF/PrimeFaces · JPA · WebLogic/Tomcat)

ใช้กับ repo ที่ pom ตั้ง Java 8 และใช้ JSF (`*.xhtml`, `@ManagedBean`) — เช่นงาน SCC-F2 ของบริษัท · Developer อ่านก่อนลงมือ · Tester และ MAIN ใช้ checklist เป็นแกน Standards

## ก่อนลงมือ

- ถ้ามี `.agents/AGENTS.md` หรือ `AGENTS.md` ใน workspace ให้อ่านด้วย (checklist ตอนสร้าง/แยกโปรเจกต์ SCC-F2: pom, `beans.xml`, `faces-config.xml`, `conf/`)
- คำสั่ง build/test อยู่ในส่วน "สภาพแวดล้อม" ของ plan — maven ของงานบริษัทมักต้องรันแบบ offline พร้อม local repo เฉพาะ
- ดูสไตล์ไฟล์ข้างเคียงก่อนเขียน: การจัด `=` ให้ตรงคอลัมน์, lombok `@Getter/@Setter(AccessLevel.PUBLIC)`, log ด้วย `@Slf4j` — เขียนให้กลืนกับของเดิม

## Checklist (แกน Standards)

1. **Java 8** — ใช้ API ไม่เกิน Java 8 (`var`, `List.of`, `String.isBlank`, text block ใช้ไม่ได้)
2. **null-safety** — ค่าจาก request/DB/API ผ่าน `StringUtils` ของโปรเจกต์ (ของ summitthai `trim(null)` คืน `""`) หรือเช็ค null ก่อนเรียก method
3. **resource** — stream / connection ใช้ try-with-resources · `EntityManager` ปิดใน `finally`
4. **transaction** — insert/update หลายตารางที่ต้องสำเร็จพร้อมกันอยู่ใน transaction เดียว และ rollback เมื่อ error
5. **scope** — bean `@ViewScoped` / `@SessionScoped` ต้อง `Serializable` และทุก field ต้อง serializable หรือเป็น `transient`
6. **log** — log ข้อมูลส่วนบุคคล (NID ชื่อ ที่อยู่) ระดับ info ได้ ท่านใช้ไล่ปัญหา prod · ของลับ (รหัสผ่าน, JWT/token, keystore password, เนื้อไฟล์/base64) ต้องไม่อยู่ใน log ทุกระดับ
7. **exception** — ทุก `catch` ต้อง log พร้อม stack (`log.error("...", e)`) หรือโยนต่อ · ผู้ใช้เห็นข้อความที่เข้าใจได้ ไม่ใช่หน้า error ว่าง
8. **config** — อ่านค่าผ่าน `SystemConfig` · key ใหม่ต้องเพิ่มใน `web.properties` ทุก env ที่ repo มี และระบุใน plan ว่า env ที่ repo ไม่มี (UAT/PRD จริง) ต้องเติมเอง · ค่าที่ขาดทำให้ได้ null → NPE / NumberFormatException
9. **ไฟล์** — รักษา CRLF/LF ของแต่ละไฟล์ตามเดิม (repo ปน 2 แบบ) และ encoding UTF-8 · `git diff` ต้องไม่มีบรรทัดที่เปลี่ยนแค่ท้ายบรรทัดหรือช่องว่าง
10. **build ล้ม** — แก้ที่ซอร์สให้ผ่าน · pom ใช้เพิ่ม dependency ที่จำเป็นได้ แต่ไม่ใช้ปิดการตรวจ (doclint, test skip, failOnError=false)
11. **ขอบระบบ** — ค่าจาก URL / `f:viewParam` / form ตรวจรูปแบบก่อนใช้ · ข้อมูลของผู้ใช้ค้นด้วยตัวตนใน session (NID) เสมอ ค่า id จาก URL ใช้เป็นเงื่อนไขเสริมเท่านั้น (กัน IDOR) · query ใช้ parameter binding
12. **upload** — ตรวจนามสกุล + magic byte + ขนาดต่อไฟล์และรวม + ชื่อไฟล์ · path ปลายทางสร้างจาก config + ชื่อที่ระบบตั้ง ไม่ใช้ชื่อจากผู้ใช้ต่อ path ตรงๆ

## การพิสูจน์ใน stack นี้

- **build** — `package` ผ่าน = compile + xhtml ถูกรวมใน war (ตรวจด้วย `unzip -l target/*.war | grep <ไฟล์>`)
- **unit test** — ใช้ได้กับ logic ที่แยกจาก JSF/DB (validator, mapper, คำนวณ) · repo ที่ยังไม่มี junit ให้เสนอเพิ่ม junit 4 scope test เป็น task/issue แยก
- **bean / หน้าจอ / DB** — พิสูจน์ด้วยการอ่านโค้ด (`file:line`) + สคริปต์ manual test ให้ท่าน · ระบุ URL พร้อม param ตัวอย่าง, ข้อมูลที่ต้องมีใน DB, ผลที่ควรเห็น และ log ที่ควรขึ้น
