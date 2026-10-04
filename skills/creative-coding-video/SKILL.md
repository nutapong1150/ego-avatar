---
name: creative-coding-video
description: Use when making a short promo, explainer, ad or social video (Reels, TikTok, Shorts, 9:16 or 1:1) whose visuals are typography and shapes drawn by code — no footage, no AI-generated clips — or when the user says "ตัดวิดีโอแบบ js", "render(t)", "แบบโพสต์ 12", "ทำ vdo อธิบาย", "ไม่ต้องใช้ HeyGen", or asks for sound/BGM on such a video.
---

# ตัดวิดีโอด้วยโค้ด (Creative Coding Video)

**แก่น:** วิดีโอ 1 คลิป = HTML 1 ไฟล์ที่มี `render(t)` · ภาพ เสียงประกอบ และเพลงพื้น อยู่บนเส้นเวลาเดียวกันในไฟล์เดียว → แก้วินาทีไหนก็แก้ที่เดียว ผลเหมือนเดิมทุกครั้ง · **ไม่ใช้ HeyGen / HyperFrames** (ท่านเลือกทางนี้ 2026-10-01)

```
 page.html ── render(t) ภาพ · window.SFX เสียง · window.BGM เพลง (Web Audio)
     │ ?t=วินาที = ดูเฟรมเดียว   ?code=X = เรนเดอร์รายคน
     ▼
 render-video.mjs ── Chrome DevTools จับทีละเฟรม ── ffmpeg (ภาพ + adelay/amix) ──► mp4 H.264 + AAC
```

| ใช้สกิลนี้ | ไม่ใช่ |
|---|---|
| ตัวหนังสือเล่าเรื่อง · กราฟ/ไอคอน/การ์ดวาดเอง · คลิปโปรโมต 15–60 วิ | มีฟุตเทจ/คลิปถ่ายจริง/เสียงพากย์ยาว → `hyperframes` หรือ `video-use` |
| ภาพนิ่งชุดเดียวกันมีอยู่แล้ว (`creative-coding-social`) อยากให้ขยับ | ภาพนิ่งอย่างเดียว → `creative-coding-social` |

## ขั้นตอน

1. **คำก่อนภาพ** — งานการตลาดผ่าน `marketing-skills:copywriting` ก่อน · ห้ามอ้างความสามารถที่ระบบยังไม่มี/ตัวเลขผลลัพธ์ที่ไม่ได้วัด
2. **Storyboard ในแชต** — ตารางช่วงวินาที · บนจอ · ขยับยังไง · ทำไม → รออนุมัติ · ฉากสุดท้ายค้าง ≥3 วิให้อ่าน/แคปโค้ดทัน
3. **คัดลอก** `template.html` + `music.js` ไปข้างไฟล์ธีมแบรนด์ (`_base.css`) · SFX คัดจาก `media-use/audio/assets/sfx/` (Pixabay ใช้เชิงพาณิชย์ได้) มาไว้ `sfx/` พร้อม CREDITS
4. **เขียนฉาก** ด้วย `seg/out/back/rise` · เสียงตั้งเวลาจากตัวแปรเดียวกับภาพ (คำนวณ ไม่พิมพ์เลขซ้ำ)
5. **ตรวจก่อนเรนเดอร์เต็ม** — screenshot `?t=` ทุกฉาก (กลางฉาก + ก่อน/หลังรอยต่อ) ต่อเป็น contact sheet ด้วย ffmpeg `xstack` แล้ว **เปิดดูจริง**
6. **เรนเดอร์** `node <skill>/render-video.mjs "page.html?code=X" out.mp4 30` · ใช้ path แบบ `D:/...` ไม่ใช่ `$(pwd)` ของ Git Bash · ค่าเริ่มมี motion blur `SUB=6` (ดราฟต์ใส่ `SUB=1` เร็วกว่า 6 เท่า) + `window.CUTS` · **ทางหลัก: ใช้คู่กับ `motion-design-craft` เสมอ** (สปริง/กล้อง/คำโผล่ไทย/QA)
7. **วัดเสียง** — `volumedetect` แยกช่วง (เฉลี่ย −15 ถึง −22 dB · สูงสุด ≤ −3 dB) · `silencedetect` เทียบจุดเริ่มเสียงกับคิว (คลาด ≤0.1 วิ) · ส่งไฟล์ให้ท่านฟัง เพราะข้าฟังเองไม่ได้

## กับดักที่เจอจริง

| อาการ | แก้ |
|---|---|
| ข้อความไหลไปกองล่างจอ ไม่ตรงตำแหน่ง | ไฟล์ธีมภาพนิ่งมี `.slide > :not(canvas) { position: relative }` ชนะ `.layer` → เขียน `.stage > .layer` |
| ตัวไทยใน canvas เป็นฟอนต์ระบบ | `document.fonts.load('500 26px Prompt', 'กขค')` ต้องส่งตัวไทย + โหลดทุกน้ำหนักที่วาด |
| จุดบนเส้นไม่ตรงข้อความ | `offsetTop` อิงพ่อที่มี position → ใช้ `getBoundingClientRect().top` |
| คำไฮไลต์กลายเป็นตัวเอียง | `em { font-style: normal }` |
| ช่วงหนึ่งดังกระชาก | ไฟล์ SFX บางตัวดังมาก (impact-bass เฉลี่ย −5 dB) → ลดเหลือ ~0.15 แล้ววัดซ้ำ |
| คลิปเงียบ ท่านต้องถาม "เสียงละ" | ใส่ SFX + เพลงพื้นตั้งแต่รอบแรก · "ไม่มีเสียงพูด" ≠ "ไม่มีเสียง" |
| หันไปใช้ HyperFrames/HeyGen | ไม่ต้อง — สกิลนี้คือทางที่ท่านเลือก · HeyGen ต้องล็อกอินและเพลงจากคลังใช้บน Windows ไม่ได้ |
| `cat > file` ค้างรอ stdin | เขียนไฟล์ด้วย Write tool หรือ heredoc |

## เพลงพื้น (`music.js`)

96 BPM = 0.625 วิ/จังหวะ · คอร์ด Am7 → Fmaj7 → Cadd9 → G6 · เปิดปิดแต่ละชิ้นตามช่วงวินาที:
`music.render({ sec, pad, bright, drums, bass, hats })` — วางจุดเปลี่ยนฉากใหญ่ให้ตกจังหวะ (5.0 วิ = จังหวะที่ 8) · ฉากปัญหาใช้ pad ทึบไม่มีกลอง · ฉากทางออกเปิดกลอง+เบส+`bright` · ท้ายคลิปถอดกลองเหลือ pad เฟดจบ

## ตัวอย่างจริง

`app14-Presentia/0_public_eco_doc_claude/affiliate-kit/video-a-silent-page.html` (ร้านค้า: เพจเงียบ → ตามแผน → 4 ขั้น กดอนุมัติ → ฿16/วัน → โค้ด) · `video-b-affiliate.html` (ชวน affiliate) · 9:16 30 วิ (2026-10-01)
