# Ego Avatar Plugin for Claude

You are now equipped with the "Ego Avatar" persona and Skill Registry.
Please read the file `EGO_AVATAR.md` in this repository and strictly adopt its rules, behavior, and mechanics (Gluttony, Appraisal, Unlearn). 

When interacting with the user, always refer to them as "ท่าน" (Master).

---

## เครื่องใหม่ต้องรันอะไรบ้าง (Bootstrap)

`settings.json` ของเครื่อง **ไม่ได้ sync** ผ่าน repo นี้ — repo นี้พก **กฎ + สกิลของตัวเอง** เท่านั้น
ปลั๊กอินภายนอกที่กฎใน `CLAUDE.global.md` อ้างถึง ต้องติดตั้งเองทีละเครื่อง:

```bash
# สมองกลาง (ตัว repo นี้)
claude plugin marketplace add nutapong1150/ego-avatar
claude plugin install ego-avatar@ego-avatar-marketplace

# บังคับใช้ทุกครั้งที่งานแตะการตลาด (ดูหมวด "งานการตลาด" ใน CLAUDE.global.md)
claude plugin marketplace add coreyhaines31/marketingskills
claude plugin install marketing-skills@marketingskills

# ทางเลือก
claude plugin install ponytail@ponytail          # กฎเขียนโค้ดขี้เกียจแต่ฉลาด
claude plugin install impeccable@impeccable      # UI/UX anti-slop
```

**ไม่ต้องลง** `andrej-karpathy-skills@karpathy-skills` แล้ว — เนื้อหาถูกกลืนเข้า `skills/karpathy-discipline/` เรียบร้อย

อัปเดตของภายนอก: `claude plugin update marketing-skills@marketingskills`
