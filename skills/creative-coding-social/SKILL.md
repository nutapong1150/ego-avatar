---
name: creative-coding-social
description: Use when making a social/marketing image (FB/IG post, info graphic, promo card, cover) where the illustration should be drawn by code instead of image files or AI image generation — "creative coding", "generative art", "procedural graphics", "ทำภาพ info ด้วยโค้ด", "วาดภาพด้วย canvas", "ภาพโปรโมทแบบไม่ใช้รูป". Produces a deterministic PNG from one HTML file (Canvas illustration + DOM typography on brand tokens), rendered with headless Chrome.
---

# Creative Coding — ภาพโซเชียลที่วาดด้วยโค้ด

**แก่น:** AI เขียนโค้ด → โค้ดวาดภาพ ดังนั้น **แก้ได้ทุกจุด** (สี ตำแหน่ง ข้อความ) และ **ผลเดิมทุกครั้ง** ต่างจาก AI สร้างภาพ (Sora/Flux/Midjourney) ที่ได้พิกเซลมาแล้วแก้ทีละจุดไม่ได้

```
 1 HTML ไฟล์เดียว
 ┌─────────────────────────────┐
 │ DOM  : ตัวหนังสือ (brand css)  │  ← อ่านง่าย คมชัด ภาษาไทยจัดบรรทัดถูก
 │ Canvas: ภาพประกอบ (seeded)    │  ← generative / procedural ไม่มีไฟล์ภาพ
 └─────────────────────────────┘
        │ headless Chrome --screenshot
        ▼
   PNG ขนาดจริง → ดูภาพ → แก้ → เรนเดอร์ซ้ำ
```

ต่อยอดเป็นวิดีโอ (kinetic typography · Web Audio · programmatic video) → ใช้ชุดสกิล `hyperframes*` แทน สกิลนี้คุมภาพนิ่ง

## ขั้นตอน

1. **คำก่อนภาพ** — งานที่มีข้อความการตลาด ให้ผ่านสกิล `marketing-skills:copywriting` ก่อน (กฎ CLAUDE.md) · ใช้ถ้อยคำจริงของสินค้า (landing / voice doc) ไม่แต่งตัวเลขหรือคำยืนยันที่ไม่มีจริง
2. **หาธีมของแบรนด์** — ถ้าโปรเจกต์มีไฟล์ฐาน (เช่น `_base.css`) **ต้อง link แล้วใช้ตัวแปรในนั้น** ห้ามตั้งสี/ขนาดเอง · Canvas อ่านสีผ่าน `getComputedStyle(document.documentElement).getPropertyValue('--x')` ไม่ hardcode
3. **ร่างผังเป็น ASCII ให้ผู้ใช้เห็นก่อน** (โซนข้อความ · โซนภาพประกอบ · CTA) แล้วค่อยเขียน
4. **เขียน HTML** ตามโครงด้านล่าง
5. **เรนเดอร์ แล้วเปิดดูภาพจริงทุกรอบ** (Read ไฟล์ PNG) — อย่าส่งภาพที่ไม่ได้ดู
6. อัป/ส่งต่อ

## โครงไฟล์ (ของที่ห้ามขาด)

```html
<meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="_base.css">          <!-- ธีมแบรนด์ -->
<div class="slide"> <canvas id="art" width="1080" height="1350"></canvas> …DOM ข้อความ… </div>
<script>
const seed = Number(new URLSearchParams(location.search).get("seed") ?? 1);
function mulberry32(a){ return () => { a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a);
  t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
const rnd = mulberry32(seed), R = (a,b) => a+(b-a)*rnd();   // ห้ามใช้ Math.random
async function draw(){
  await document.fonts.load(`600 26px 'IBM Plex Sans Thai'`);  // ฟอนต์ใน canvas ต้องรอโหลด
  await document.fonts.ready;
  // …วาด…
}
draw();
</script>
```

## เทคนิคภาพประกอบที่ใช้ซ้ำได้

| อยากสื่อ | เทคนิค |
|---|---|
| การไหล / ข้อมูลเคลื่อน | **flow field**: ลากเส้นสั้นตามมุมจากฟังก์ชัน `sin(x*k1)+cos(y*k2)` · สีเส้นขอบ alpha 0.25–0.6 · อยู่หลังสุด |
| ของเดินทางจาก A ไป B | **bezier** 3 องศา + วางชิ้นงานที่ t=0.34, 0.68 หมุนตามทิศเส้น (อนุพันธ์) · ใกล้ถึงให้เล็กลง |
| ความมีชีวิต | ละอองรอบเส้น ~25 จุด ขนาด 2–4.5 alpha ต่ำ |
| ไอคอน (ไฟล์ โฟลเดอร์ แชท) | วาด path เอง: rounded rect + มุมพับ + แถบสีบอกชนิด · เงา `shadowBlur` นุ่ม |

## กับดักที่เจอจริง

- **ปลายสายหลายเส้นรวมจุดเดียว** → ชิ้นงานลอยทับกันรก · แยกปลายคนละช่อง
- **ลำดับการวาด = ลำดับชั้น** · ของที่ต้อง "หายเข้าไป" (สายไฟล์ลงโฟลเดอร์) ให้วาดปลายทางทีหลัง
- **ภาพประกอบอย่าไปอยู่ใต้ตัวหนังสือ** · จำกัดโซน canvas (เช่นลายพื้นเฉพาะ y 590–925)
- **ตัวไทยขนาดใหญ่ line-height ≥ 1.35** ไม่งั้นสระล่างโดนบรรทัดถัดไปทับ
- **ภาพโซเชียลต้องอ่านออกตอนย่อในฟีดมือถือ** · พาดหัว ~78px บนผืนกว้าง 1080
- **headless Chrome เขียน `--screenshot` ลงโฟลเดอร์โปรเจกต์ไม่ได้ (Access denied)** · เขียนลง scratchpad แล้ว `cp` กลับ

## เรนเดอร์ (Windows · Git Bash)

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1080,1350 --virtual-time-budget=8000 \
  --screenshot="$SCRATCH/out.png" "file:///$ABS_DIR/post.html?seed=10"
```

`--virtual-time-budget` ให้เวลาฟอนต์/สคริปต์ทำงานก่อนถ่าย · ไม่ใส่ = ได้ภาพก่อนฟอนต์โหลด

## ตัวอย่างจริง

`D:\claude code\app14-Presentia\0_public_eco_doc_claude\client-linkfiles\cover\post10-flow.html` — โพสต์โปรโมท LINK Files: แชท LINE 3 ห้อง → สายไฟล์ bezier → โฟลเดอร์ Drive บนพื้น flow field (2026-09-25)
