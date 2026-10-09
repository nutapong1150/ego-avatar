# ตรวจช่องโหว่ (Security Audit)

2 โหมด:
- **diff mode** — MAIN ใช้ตอน review ทุก task ไล่เฉพาะบรรทัดที่เปลี่ยน ตามรายการหัวข้อด้านล่าง
- **full mode** — ท่านสั่ง "ตรวจช่องโหว่" ทั้ง repo · อ่านอย่างเดียว ไม่แก้โค้ดจนกว่าท่านเลือกหัวข้อ

ข้อที่ท่านยอมรับแล้วไม่นับเป็นช่องโหว่: log ข้อมูลส่วนบุคคลระดับ info (ดูข้อ 6 ในโปรไฟล์)

## หัวข้อที่ต้องไล่ (ใช้ทั้ง 2 โหมด)

| # | หัวข้อ | มองหาอะไรใน JSF/JPA/Servlet |
|---|---|---|
| A1 | Access control / IDOR | ค้นข้อมูลด้วย id จาก URL/param โดยไม่ผูก NID/ผู้ใช้ใน session · หน้าใน `pages/` เข้าได้โดยไม่ผ่าน filter ตรวจ session |
| A2 | Injection | native query / JPQL ต่อ string · `Runtime.exec` · LDAP/XPath ต่อ string |
| A3 | XSS | `escape="false"`, `h:outputText` ที่แสดงค่าจากผู้ใช้แบบไม่ escape, `executeScript` ที่ต่อ string จากผู้ใช้ |
| A4 | Upload / path traversal | ชื่อไฟล์จากผู้ใช้ต่อ path · ไม่ตรวจ magic byte/ขนาด · zip slip ตอนแตก zip |
| A5 | ของลับ | รหัสผ่าน/keystore/JWT key ใน source, `*.properties` ที่ commit, เอกสารใน repo, log |
| A6 | Session / auth | session fixation หลัง login · cookie ไม่มี `HttpOnly`/`Secure` · timeout · ตรวจ RefNo/token ไม่ครบ |
| A7 | Security headers / CSP | ขาด `X-Frame-Options`/CSP หรือ CSP บล็อก inline script ที่หน้าใช้จริง |
| A8 | Error handling | stack trace/ข้อความภายในส่งถึงผู้ใช้ · catch แล้วเงียบ ทำให้ข้ามการตรวจสิทธิ์ |
| A9 | Deserialization / XXE | `ObjectInputStream` กับข้อมูลภายนอก · XML parser ไม่ปิด external entity · POI อ่าน xlsx |
| A10 | Dependency (full mode) | ไล่เวอร์ชันใน pom (PrimeFaces, JSF impl, commons-fileupload, jackson, POI, logback ฯลฯ) เทียบ CVE ที่รู้จัก — ค้นเว็บแล้วอ้างแหล่ง (NVD/GitHub advisory) ทุกข้อ |
| A11 | Config drift | ค่าใน repo ต่างจาก env จริงจนปิดการตรวจ/เปิด debug บน prod |

## full mode — ขั้นตอน

### 1. ทำบัญชีทางเข้า

ไล่ทุกจุดที่ข้อมูลจากภายนอกไหลเข้า: `*.xhtml` ที่มี `f:viewParam`/form · servlet/filter ใน `web.xml` · REST resource · upload · การเรียก API ภายนอก · ตาราง DB ที่เขียน · ไฟล์ config ที่ commit

เสร็จเมื่อ: ทุกทางเข้าใน `web.xml` และทุก `*.xhtml` ถูกนับ (เขียนจำนวนไว้ในรายงาน)

### 2. ไล่ทีละหัวข้อ A1–A11

repo ใหญ่ → แบ่งหัวข้อให้ Explore agent หลายตัวทำขนานกัน (อ่านอย่างเดียว) แล้ว MAIN ยืนยันเองทุก finding ด้วยการเปิดโค้ดจริงก่อนจด · finding ที่ยืนยันไม่ได้ จดเป็น "ต้องยืนยัน" พร้อมเหตุผล

เสร็จเมื่อ: ทุกหัวข้อมีผล "เจอ n ข้อ" หรือ "ไม่เจอ (ไล่ที่ไหนบ้าง)"

### 3. เขียนรายงาน

`0_public_eco_doc_claude/docs/YYYY-MM-DD-security-audit-<repo>.md` — บนสุดเป็นภาพรวม (ตารางนับตามระดับ) แล้วทีละ finding:

```
### S<n> — <ชื่อสั้น>   [Critical | High | Medium | Low]  หัวข้อ A<x>
- หลักฐาน: <file:line> + โค้ดย่อ
- สถานการณ์โจมตี: <ใครทำอะไร ได้อะไร>
- ทางแก้: (1) <แนะนำ> — กระทบ: <ไฟล์/งาน> (2) <ทางเลือก>
- ขนาดงาน: <เล็ก/กลาง/ใหญ่>
```

ระดับ: **Critical** ข้อมูลผู้อื่นรั่ว/ยึดระบบได้จากภายนอก · **High** ต้องมีบัญชีแต่ข้ามสิทธิ์ได้ · **Medium** ต้องมีเงื่อนไขเพิ่ม/ผลจำกัด · **Low** hardening

### 4. ถามท่านทีละหัวข้อ

ใช้รูปแบบรอบของ `ego-avatar:grilling` — 1 finding = 1 คำถาม เรียง Critical → Low พร้อมทางแก้ที่แนะนำ ให้ท่านตอบ แก้ / ไม่แก้ / เลื่อน · ผลการตัดสินเติมลงรายงาน

### 5. ส่งต่อ

finding ที่ท่านให้แก้ → เป็น task ใน plan ใหม่ของ sa-orchestra (ขั้นที่ 2 ใน SKILL.md) · เสนอชื่อ issue ตามกฎ git ของ workspace
