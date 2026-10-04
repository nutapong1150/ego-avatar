---
name: motion-design-craft
description: Use when a code-drawn video (render(t) / creative-coding-video) needs to look like real motion design instead of "AI motion" — springs, camera moves, shared-element handoffs, motion blur, beat-synced cuts, music drop on the key moment, SFX on measured peaks, -14 LUFS — or when the user says "motion design", "ทำให้ขยับสวยขึ้น", "ดูถูกๆ", "ดูเป็น AI", "ตัดตามบีท", "motion blur", "กระตุก", "ลูปสะดุด", or asks for a critique pass on a rendered clip. Also for a frame-locked "original | remake" of another launch video, a YouTube meme clip library (yt-dlp), or AI-generated faces for fictional UI ("remake คลิปนี้", "ทำมีม", "หน้าคนปลอม").
---

# ศิลป์เคลื่อนไหว (Motion Design Craft)

**แก่น:** `creative-coding-video` ทำให้คลิป **เกิด** · สกิลนี้ทำให้คลิป **ขยับสวย** · เครื่องยนต์เดิม (`render(t)` + `render-video.mjs`) ไม่เปลี่ยน เพิ่มแค่กฎการเคลื่อนไหว ตัวช่วย `motion.js` เครื่องตรวจ `motion-qa.mjs` และ motion blur (`SUB=`)

**ทางหลัก = ใช้คู่กับ `creative-coding-video` เสมอ** (ท่านเลือก 2026-10-04 หลังลองตัดเทียบ 3 แบบ: แบบ A ใช้ creative-coding-video ตัวเดียว · แบบ B ใช้สกิลนี้ตัวเดียว · แบบ C ใช้สองตัวรวมกัน แล้ว C ชนะ): ใช้ธีม ตัวไทย เพลง `music.js` และ SFX ตามแบบ creative-coding-video แล้วเอาการเคลื่อนไหว motion blur และ QA จากสกิลนี้ · ตัวอย่างจริง `app10-gen-video/videos/skill-compare/C2-combined.html`

```
 brief (สไตล์อ้างอิงมีชื่อ + states มีเวลา + layer + แผนเสียง) ─► รอ OK
   ▼
 beat map (BPM → ทุกฉากลงบีท · drop ตกจังหวะภาพเด็ด)
   ▼
 4 ภาพนิ่ง ?t= ─► Read ดูเอง ─► แก้ ──┐
   ▼                                   │ วนจนผ่าน
 draft (SUB=1) ดูจังหวะ ─► full (SUB=6) ─► motion-qa.mjs ─► critique ≥8 ทุกข้อ
   ▼
 เสียง: drop by energy · SFX ตาม peak · -14 LUFS ─► ส่งท่านฟัง
```

| ใช้สกิลนี้ | ไม่ใช่ |
|---|---|
| คลิปโค้ดที่มีอยู่แล้วดู "แข็ง/ถูก/เป็น AI" · เปิดตัวสินค้า · logo sting · ลูป LinkedIn/Reels | ยังไม่มีคลิป → เริ่มที่ `creative-coding-video` แล้วค่อยมาที่นี่ |
| ต้องตัดตามบีทเพลง / ให้ drop ตกฉากเด็ด | ฟุตเทจจริง/พากย์ยาว → `video-use` · `hyperframes` |
| remake คลิปคนอื่นแบบเฟรมต่อเฟรม · คลังมีม · หน้าคน AI ใน UI สมมติ | → อ่าน `remake-memes-faces.md` (มีความเสี่ยงที่ต้องบอกท่านก่อนทุกครั้ง) |

## 0. ห้ามละเมิด
- **ห้ามแต่งข้อมูลบนจอ:** ตัวเลขจริงต้องมีที่มา+วันที่ · ตัวอย่างต้องติดป้าย "ตัวอย่าง" · ห้ามโชว์ฟีเจอร์ที่ระบบยังไม่มี (เช็คโค้ดก่อน)
- **แคปชันต้องจริง:** ห้ามเขียน "ทำใน 10 นาที" หรือ "one shot" ถ้าไม่จริง
- **ห้าม Math.random / Date / setTimeout / CSS transition** ใน render(t) ใช้ `M.rng(seed)` · เรนเดอร์วินาทีเดิม 2 รอบต้องได้ภาพเดิมทุกพิกเซล

## 1. Brief ก่อนโค้ด (หยุดรอ OK)
ความยาว · format หลัก (9:16 Shorts / 1:1 / 4:5 LinkedIn) · หัวเรื่อง + คำสัญญา 1 ประโยค · **สไตล์อ้างอิงที่มีชื่อ** ("Linear launch", "Apple bumper", "Stripe docs" ห้ามใช้คำกว้างอย่าง "premium modern") · **states มีเวลา** (hook 0–2.5 วิ → รูปทรงกลายเป็นจอ 1 → แปลงเป็นจอ 2 → หลักฐานตัวเลขจริง → โลโก้+URL) · layer list · แผนเสียง (เงียบ / SFX โค้ด / เพลง) · มีไฟล์ `facts.md` (ตัวเลข+ที่มา) ไม่มี = ไม่มีตัวเลขบนจอ

## 2. กฎกัน "AI motion"
- **สีเน้น 1 สี** · **ทีละอย่างขยับ** · ระบบรูปทรงเดียวตั้งแต่ต้นจนจบ ใช้การแปลงร่าง ไม่ใช้การตัด
- สปริงหน่วง ≥ 0.72 เกินเป้านิดเดียว **ห้ามเด้งแบบการ์ตูน** · ห้ามเคลื่อนที่แบบเส้นตรง (linear)
- ห้าม: gradient สายรุ้ง · particle · โครเมียมเรืองแสง · emoji · lorem ipsum · หมุน 3D ไร้เหตุผล
- **ไม่มีเฟรมนิ่งสนิท** ยกเว้นตอนค้างท้าย (มี drift/settle เล็กๆ เสมอ แม้ end card) · ไม่มีอะไรนิ่ง > 1 วิ
- ช็อตถัดไปเข้ามา **ขณะกำลังเคลื่อน** ในทิศเดียวกับที่ช็อตเก่าออก · ออกแบบเร่งเรขาคณิต ×1.5
- **ตัวใหญ่สำหรับมือถือ:** 9:16 (กว้าง 1080) พาดหัว **≥ 112px** · รอง ≥ 56px · บรรทัดละไม่เกิน ~900px (ไทยยาวให้แตกบรรทัดเอง) · วางข้อความใน 1080×1080 ตรงกลาง · ตรวจที่ `phone.png` (ย่อเหลือ 360px ต้องอ่านออก)
- **กล้องพุ่งเข้าวัตถุ:** หัวข้อต้อง**ออกก่อน**กล้องเริ่มพุ่ง หรืออยู่ในกรอบหลังซูมทั้งบรรทัด · ห้ามปล่อยตัวหนังสือโดนขอบตัดครึ่ง · probe เฟรมปลายซูมทุกครั้ง
- **ทดสอบประโยคเดียว:** เปิดแบบปิดเสียงให้คนดู ถ้าสรุปได้ 1 ประโยค ("ปุ่มกลายเป็นเครื่องเล่น") = ผ่าน ถ้าลังเล = ขยับเยอะเกิน

## 3. เครื่องมือการเคลื่อนไหว (`motion.js`, ใส่ `<script src>` ก่อนสคริปต์ฉาก)
| ต้องการ | ใช้ |
|---|---|
| ช่วงเวลา → 0..1 | `M.seg(t, a, b, M.E.out)` · easing `io/out/in/expo` ปลายเป๊ะ 0/1 |
| สปริง | `M.spring(t - t0, k, d)` · preset UI 320/30 · กล่อง/กล้อง 170/26 · ตัวใหญ่/โลโก้ 120/24 · มาสคอต 180/12 |
| ค่าหลายเป้า | `M.springTo(t, [[0, x0], [1.2, x1], [2.4, x2]])` (ผลรวมสปริงทีละช่วง) |
| กล้อง | `M.camera(t, [[t, zoom, x, y], …])` transform เดียวบน container · zoom เดินใน log space · ห้ามซูมเข้าแล้วออกติดกัน · punch ตามบีท `+0.012`/บีท decay แบบ exp |
| วงท่วมจอ | รัศมี `M.floodRadius(x, y, W, H)` ใน ~0.3 วิ แล้วหดเข้าวัตถุถัดไป |
| ตัวหนังสือโผล่ | บรรทัด `<div class="line" style="overflow:hidden;padding:.2em 0">` ห่อคำด้วย `<span class="w" style="display:inline-block">` แล้ว `M.words(el, t, tin, tout)` (เข้าล่าง ออกบน ห่างคำละ 55 ms) · **ไทย: เลื่อน 160% ในตัวแล้ว** เพราะสระบน/วรรณยุกต์ล้นกล่อง ถ้าเลื่อน 105% จะเห็นเศษสระลอยค้าง · ตัวหนังสือที่ต้องหายตอนคัท ใส่ `visibility` ตามเวลา |
| shared element | ของชิ้นเดียวพาไปฉากถัดไป (bubble พาคำเข้าวงท่วม, ปุ่มพา label เข้าหน้า) · ข้อความที่สลับในรูปทรงที่กำลังแปลงต้องมีหน้ากากของตัวเอง |
| ไลบรารีอื่น | GSAP `tl.pause(); tl.totalTime(t+0.001,true); tl.totalTime(t,true)` · WAAPI `getAnimations().forEach(a=>{a.pause();a.currentTime=t*1000})` · anime.js `autoplay:false` + `seek` · Lottie `goToAndStop` · **ห้ามของที่เล่นตามนาฬิกาจริง** (Spline, framer-motion live) |

## 4. เรนเดอร์ + motion blur
- **ดราฟต์ก่อนเสมอ:** `SUB=1 node …` fps 30 ดูจังหวะ ไม่ดูความคม (20 วิ ≈ 45 วิ)
- **ตัวจริง:** `node <creative-coding-video>/render-video.mjs page.html out.mp4 15 30` (ค่าเริ่ม `SUB=6`) · 20 วิ ≈ 4–5 นาที · ซับเฟรมกระจายครึ่งเฟรม (ชัตเตอร์ 180°) · 6–8 สำหรับการเคลื่อนเร็ว (4 = เห็นเงาซ้อน) · ช้าลง ×SUB เท่า
- **ห้ามเบลอข้ามคัท:** ประกาศ `window.CUTS = [3.2, 7.5]` ในหน้า ตัวเรนเดอร์จะเก็บซับเฟรมไว้ฝั่งเดียวกับกลางเฟรม
- เบลอเฉพาะท่าพุ่ง 1–3 จุดดีกว่าเบลอทั้งคลิป · ห้ามเบลอข้อความที่ต้องอ่าน
- ตัดคัทตอนความเร็วสูงสุด · ทิศ+ความเร็วสองฝั่งคัทต้องตรงกัน · ซูมคงเครื่องหมายของ d(scale)/dt ข้ามคัท

## 5. ตรวจ
```
node <skill>/motion-qa.mjs out.mp4 30          # pops + แฟลช 1 เฟรม (คัทตั้งใจก็โผล่ บอกท่านตรงๆ)
#   pop เล็ก (diff ~2) ตรงบีทพอดีในฉากนิ่ง = beat punch ของกล้อง (ตั้งใจ) · ถ้ารู้สึกกระตุก ให้ไต่ขึ้น 2 เฟรมก่อนค่อยหน่วงลง
node <skill>/motion-qa.mjs out.mp4 30 loop     # ลูป: ตำแหน่ง + ความเร็วที่รอยต่อ
ffmpeg -i out.mp4 -vf "fps=2,scale=270:-1,tile=6x5" -frames:v 1 contact.png           # ภาพรวม
ffmpeg -ss <t-0.1> -i out.mp4 -vf "scale=320:-1,tile=12x1" -frames:v 1 strip.png        # 12 เฟรมรอบท่าเร็ว
ffmpeg -i out.mp4 -vf "fps=1,scale=360:-1,tile=5x3" -frames:v 1 phone.png              # อ่านออกที่จอมือถือ
```
**Critique loop:** เปิดภาพ (Read) ให้คะแนน 1–10: hook 2 วิแรก · อ่านออกที่ 360 px · คุณภาพการเคลื่อนไหว · ความหลากหลาย (มีของใหม่ทุก 2–4 วิ) · องค์ประกอบ · ความถูกต้องแบรนด์/ข้อมูล · เสียงตรงภาพ → เขียน 3 ปัญหาแย่สุดพร้อมเวลา → แก้เฉพาะวินาทีนั้น → ให้คะแนนใหม่ **วนจนทุกข้อ ≥ 8** · งานใหญ่ให้ sub-agent อ่านอย่างเดียวเป็นคนวิจารณ์ (คนสร้าง ≠ คนตัดสิน) ตั้งค่าเริ่มเป็น "ไม่ผ่าน"

## 6. เสียง
- **หา drop จากพลังงานจริง** (ย่านต่ำ/ทั้งหมดต่อห้อง แล้วซูมหน้าต่าง 20–50 ms) ห้ามเชื่อ beat grid อัตโนมัติ · เริ่มเพลงที่ `drop_ในเพลง - drop_ในคลิป`
- **วาง SFX ตามจุดพีค** ของไฟล์ ไม่ใช่ต้นไฟล์: `node <skill>/motion-qa.mjs peaks sfx/*.mp3` → ได้ตาราง PEAK ไปวางใน `const at = (time, name, vol) => [time - PEAK[name], …]` · เสียงคีย์บอร์ดตามจังหวะตัวอักษรที่พิมพ์บนจอ · gain 0.04–0.3
- ปิดท้าย **loudnorm 2 รอบ → −14 LUFS** (มาตรฐาน YouTube/IG):
  `ffmpeg -i mix.wav -af loudnorm=I=-14:TP=-1:LRA=11:print_format=json -f null -` แล้วป้อนค่า measured_* กลับใน `linear=true`
- BPM กับอารมณ์: 60–80 สง่า · 90–110 นุ่ม · 115–123 พรีเมียม · >125 เร้าใจ · สไตล์ "Apple/พรีเมียม" = เสียงเบาๆ ไม่กี่จุด ตัดอะไรที่ดังเกินออก
- แหล่งฟรีเชิงพาณิชย์: Mixkit (`assets.mixkit.co/music/<id>/<id>.mp3`) · SFX ใน `media-use` · หรือ `music.js` ของ `creative-coding-video` · ข้าฟังเองไม่ได้ ส่งไฟล์ให้ท่านฟังทุกครั้ง

## 7. อาการ → แก้
| อาการ | สาเหตุ → แก้ |
|---|---|
| หน้าตาเหมือนคลิป AI ทั่วไป | ไม่มี brief/สไตล์อ้างอิงมีชื่อ → กลับไปข้อ 1 |
| กระตุกตอน export | มี timer/CSS transition → render(t) ล้วน |
| ลูปสะดุด | ตำแหน่งตรงแต่ความเร็วไม่ตรง → เติมหางสปริงของ 2 รอบก่อน |
| ดูถูก เด้งดึ๋ง | bounce easing → สปริงหน่วง ≥ 0.72 |
| วัตถุโผล่ก่อนเวลา 1 จังหวะ | easing คืน 1e-9 ที่ x=0 → ใช้ `M.E` (ปลายเป๊ะ) |
| ข้อความเบลอตอนส่งต่อ | scale สำเนาที่เบลอ → crossfade แค่สี |
| ภาพ WebGL ดำ | headless → เพิ่ม flag `--use-angle=swiftshader --enable-unsafe-swiftshader` ให้ Chrome |
| เปิดโลโก้จากเส้นแล้วมีเงาเทา | อย่า crossfade เส้นวาดเข้ากับ PNG → squash โลโก้จริง scaleY 0.014→1 + ทับเส้นทึบ 12% แรก |

## Remake · มีม · หน้าคน AI
อยู่ใน `remake-memes-faces.md` ทั้งหมด (ขั้นตอน คำสั่ง ffmpeg/yt-dlp ที่ทดสอบแล้ว และความเสี่ยงที่ต้องแจ้งท่าน) · ไม่ได้รับมา: ของเฉพาะ Howseen/Mac · client 21st.dev (ต้องมี key) · เครื่องยนต์ Python/Playwright (ใช้ `render-video.mjs` แทน)

ที่มา: [howseen-ai/claude-motion-design](https://github.com/howseen-ai/claude-motion-design) @ `3d90d34` (MIT, Raphaël Aubry) · ตรวจความปลอดภัย + ดัดแปลง 2026-10-04
