---
name: video-director
description: Single entry point for ANY video job — make, edit, cut, caption, render, promo, affiliate/product clip, YouTube Shorts/TikTok/Reels, storytelling channel, sports highlight, talking head, music video, explainer, remake, meme. Use FIRST, before hyperframes or any other video skill, whenever the user asks for a video in any words ("ทำคลิป", "ตัดต่อ", "ทำวิดีโอ", "ทำ vdo", "ไฮไลต์", "คลิปขายของ", "คลิป affiliate", "ช่องเล่าเรื่อง", "ทำ shorts"). It reads the job, picks the skill chain itself, announces it in one line, and proceeds.
---

# ผู้กำกับวิดีโอ (Video Director)

**แก่น:** ท่านสั่งงานวิดีโอแบบไหนก็ได้ ข้าอ่านงานแล้ว**เลือกสายสกิลเอง** ไม่ต้องให้ท่านระบุชื่อสกิล · สกิลนี้คือ**ทางเข้าเดียว**ของงานวิดีโอทั้งหมด (ท่านตั้ง 2026-10-04) ถ้าสกิลอื่นอ้างว่าตัวเองเป็น "mandatory entry point" (เช่น `hyperframes`) ให้ถือว่าสกิลนี้มาก่อน แล้วค่อยเรียกตัวนั้นเมื่อเส้นทางชี้ไป

```
 งานเข้า ─► ① อ่าน 4 อย่าง ─► ② เลือกเส้นทาง (ตาราง) ─► ③ ด่านตรวจ (สิทธิ์/ค่าใช้จ่าย/แพลตฟอร์ม)
                                                         │ ผ่าน            │ ติด
                                                         ▼                 ▼
                                  ④ ประกาศ 1 บรรทัดแล้วลุยเลย     ถามท่านก่อน (บอกความเสี่ยง)
                                                         ▼
                                  ⑤ ทุกเส้นทางจบด้วย QA กลาง → ส่งไฟล์ → note-me
```

## ① อ่านงาน 4 อย่าง (ถามเฉพาะที่เดาไม่ได้ ถามรวดเดียว)
| อ่าน | ตัวเลือก |
|---|---|
| **วัตถุดิบ** | ไม่มีเลย (แค่หัวข้อ/บท) · ภาพนิ่ง/รูปสินค้า · ฟุตเทจถ่ายจริง · คนพูด/พอดแคสต์ · URL สินค้า/เว็บ · เพลง · PR/changelog |
| **ปลายทาง** | Shorts/TikTok/Reels 9:16 · YouTube 16:9 · FB/IG ฟีด 4:5 หรือ 1:1 · เว็บ/landing |
| **เป้า** | ขายของ/affiliate · โตช่อง (retention) · แบรนด์/เปิดตัว · อธิบาย/สอน |
| **เสียงพูด** | ไม่มี (ตัวหนังสือเล่า) · TTS · เสียงจริงในคลิป |

**เสียงพูด ห้ามตัดสินใจเอง:** ถ้า workspace มีเสียงพากย์มาตรฐาน (เช่น Gemini TTS `Charon` ผ่าน `tools/tts-gemini.mjs`) ให้ใส่พากย์เป็นค่าเริ่ม · ห้ามเลือก "ตัวหนังสือเล่า ไม่มีพากย์" เองโดยไม่ถาม (บทเรียน 2026-10-04 คลิปทองต้องเติมพากย์ทีหลัง) · เวลาฉากเป็นข้อมูล → เติมพากย์ทีหลังได้โดยไม่เรนเดอร์ภาพใหม่: เจน VO ต่อฉาก → `atempo` ≤1.25 ให้พอดีช่อง → `adelay` → กดเพลงด้วย `sidechaincompress` → loudnorm −14 (ตัวอย่าง `videos/gold-paper/mix-vo.sh`)

### เลือกเสียงพากย์ตามงาน (ห้ามหยิบเสียงช่องอื่นมาใช้)
เสียง + **คำสั่งโทน** ต้องตรงงาน (Gemini TTS ไทยได้เฉพาะรุ่น Flash ไม่ใช่ Flash-Lite · ชื่อเสียงเช็ค docs `ai.google.dev/gemini-api/docs/speech-generation`)
| งาน | เสียง Gemini | คำสั่งโทน |
|---|---|---|
| คดี/สืบสวน/ลึกลับ (แฟ้มคดีมืด) | `Charon` | preset `hook/turn/push/reveal/sting` ใน `tools/tts-gemini.mjs` |
| อธิบายการเงิน/ข่าว/ความรู้ | **`Achird`** (ท่านเลือก 2026-10-05) · สำรอง `Sadaltager` `Puck` | "เพื่อนที่เก่งเรื่องเงินเล่าให้ฟัง สดใส เป็นกันเอง ยิ้มในเสียง" (ดู `videos/gold-paper/case-achird.mjs`) |
| ขายของ/affiliate | `Puck` `Laomedeia` (Upbeat) · `Fenrir` (Excitable) | กระตือรือร้น ชวนลอง ไม่ตะโกน |
| เล่าเรื่องอบอุ่น/ให้กำลังใจ | `Sulafat` (Warm) · `Vindemiatrix` (Gentle) | นุ่ม อบอุ่น |
- คำสั่งโทน**ต้องล็อกความเร็วทุกครั้ง** ("อ่านเร็วกระชับ…ห้ามช้าลง ห้ามลากเสียง") ถ้าสั่งแค่อารมณ์ เสียงจะช้าลงจนต้องเร่งเกิน 1.25x
- งานใหม่/ช่องใหม่ที่ยังไม่เคยเลือกเสียง → **ออดิชัน 3 เสียง × ประโยค hook** ให้ท่านฟังเลือกก่อน (≈0.3 บาท) แล้วบันทึกผลลงตารางนี้
- ElevenLabs: ไทยได้เฉพาะ `eleven_v4`/`v4_turbo` · ต้องมีแพ็ก Starter ขึ้นไป + `eleven-key.txt` (ยังไม่ได้ตั้ง ณ 2026-10-05)

## ② ตารางเส้นทาง (เลือกแถวที่ตรงที่สุด · สายอ่านซ้ายไปขวา)
| งาน | สายสกิล |
|---|---|
| **คลิปขายของ / affiliate** (รูปสินค้า + ราคา + จุดเด่น 15–30 วิ) | `marketing-skills:ad-creative` หรือ `copywriting` (คำก่อน) → รูปสินค้า (Shopee ใช้ Chrome จริง) → **`creative-coding-video` + `motion-design-craft`** (ทาง C) |
| **ช่องเล่าเรื่อง faceless** (Shorts เล่าเรื่อง/ตำนาน/ข้อเท็จจริง) | `shorts-hcbr` (บท H.C.B.R.) → ภาพ (`flow-image-lock` หรือเจนผ่าน API) → TTS → ประกอบ: ภาพนิ่ง Ken Burns + ซับ = `hyperframes` → `general-video` · ถ้าภาพเป็นตัวหนังสือ/กราฟิกล้วน = ทาง C |
| **อธิบายจากบทความ/โน้ต ไม่มีฟุตเทจ** | `faceless-explainer` · สั้นและอยากคุมทุกเฟรม = ทาง C |
| **ไฮไลต์กีฬา** | ด่านสิทธิ์ก่อน (ดู ③) → `video-transcribe` (หาเวลาคำพากย์ "ประตู/แต้ม") + `motion-qa.mjs` (หาคัท) + จุดเสียงเชียร์ดังสุด → ตัดต่อ `video-use` → สกอร์บาร์/ป้ายชื่อ `motion-graphics` → ซับ `embedded-captions` |
| **ตัดคลิปคนพูด/พอดแคสต์/สัมภาษณ์** | `video-use` (ถอดเสียง ตัด เกรดสี) → การ์ดกราฟิก `talking-head-recut` → ซับ `embedded-captions` + `captions-overlay` |
| **ซับอย่างเดียว** บนคลิปคนพูด | `embedded-captions` |
| **โปรโมต SaaS/เปิดตัวสินค้าจาก URL** | `product-launch-video` · อยากได้ลุคเฉพาะ/คุมทุกเฟรม = ทาง C + `motion-design-craft` |
| **คลิปจากโค้ด** PR/changelog | `pr-to-video` · `changelog-video` |
| **ตัดตามเพลง** lyric/สไลด์ตามบีท | `music-to-video` |
| **กราฟิกสั้น** logo sting · ตัวเลขวิ่ง · แผนที่ · lower-third | `motion-graphics` · หรือทาง C |
| **สไลด์/พรีเซนต์** | `slideshow` |
| **remake คลิปคนอื่น · คลังมีม · หน้าคน AI** | `motion-design-craft` → `remake-memes-faces.md` (ด่าน ③ เสมอ) |
| **แก้โปรเจกต์ HyperFrames ที่มีอยู่** | `hyperframes` |
| ไม่ตรงแถวไหน | ไม่มีฟุตเทจ → ทาง C · มีฟุตเทจ → `video-use` · หลายฉากยาว → `general-video` |

**สูตรรูปแบบคลิป** (ปักตะกร้า · รีวิว · UGC · ไต่ระดับราคา · VS · สปอยเป็นตอน · สารคดี · ตัดแปะ) + ระบบร่วม (ป้ายหัวค้าง · HUD · ซับคำเด่น · CTA ชี้ตะกร้า · safe zone) → `formats.md` · เลือกสูตรก่อนเขียน storyboard ทุกงานขายของ/ช่อง

**ตัวช่วยที่หยิบใช้ได้ทุกสาย:** เสียงเพลง/SFX/ภาพ/ไอคอน = `media-use` · ถอดเสียงไม่มี key ElevenLabs = `video-transcribe` · ภาพปก/ภาพโพสต์ = `creative-coding-social` · โพสต์/แคปชันขาย = `marketing-skills:social`

**ทาง C หรือ HyperFrames?** ภาพที่ **วาดด้วยโค้ด** (ตัวหนังสือ รูปทรง UI สมมติ) → ทาง C (ไม่ต้องลงอะไร คุมทุกเฟรม ตัวไทยผ่านการทดสอบแล้ว) · ภาพที่ **มาจากไฟล์** (ฟุตเทจ ภาพนิ่งหลายใบ เสียงพากย์ยาว ซับจากเสียงพูด) → HyperFrames/`video-use`

## ③ ด่านตรวจ (ติดด่านไหน หยุดถามท่านก่อน)
- **สิทธิ์ฟุตเทจ:** ไฮไลต์กีฬาลีกอาชีพ คลิปทีวี มีม remake = **เสี่ยง Content ID/strike สูง** โดยเฉพาะช่องที่ทำเงิน · ทางปลอดภัย: ฟุตเทจที่ท่านถ่ายเอง ได้รับอนุญาต ลีกท้องถิ่นที่ยินยอม หรือคลิปที่ไม่มีลิขสิทธิ์ · ถ้าไม่มี ให้บอกทางเลือก (ทำกราฟิกสรุปผลแทนภาพแข่ง)
- **ค่าใช้จ่าย API:** ทำตามกฎอนุมัติของ workspace (ถ้า memory มี) · ไม่มีกฎ = ถามก่อนยิงทุกครั้ง · จด ledger
- **แพลตฟอร์ม:** Shorts = 9:16 · ข้อจำกัดช่อง/โควตา/ลิงก์ affiliate ตาม memory ของ workspace (เช่น ห้ามลิงก์ affiliate ใน description)
- **ความจริงบนจอ:** ราคา โปรโมชัน รีวิว ตัวเลข ต้องมีที่มา · ห้ามรีวิวปลอม · ภาพประกอบติดป้าย
- **การตลาด:** งานขายของ/affiliate/ช่อง ต้องผ่าน `marketing-skills` ก่อนเขียนคำ (กฎ CLAUDE.md)

## ④ ประกาศแล้วลุย
ตอบบรรทัดแรกหลัง badge: `เส้นทาง: <สกิล> → <สกิล> → <สกิล> · ปลายทาง <format> · เพราะ <เหตุผล 1 วลี>` แล้วเริ่มทำเลย ไม่ต้องรออนุมัติ ยกเว้นติดด่าน ③ หรือสกิลในเส้นทางยังไม่ได้ลง

**สกิลไม่มีใน workspace นี้:** กลุ่ม `ego-avatar` และ `~/.claude/skills` (hyperframes, video-use, media-use, faceless-explainer, music-to-video, product-launch-video, talking-head-recut, embedded-captions) ใช้ได้ทุกที่ · กลุ่ม workflow ของ HyperFrames (`general-video` `motion-graphics` `slideshow` `pr-to-video` `changelog-video` `captions-overlay` `cut-the-curve` `seam-craft` `motion-doctrine` `oversized-cursor`) ลงแยกต่อ workspace → ถามท่านก่อนรัน `npx skills add heygen-com/hyperframes` หรือใช้ทาง C แทนถ้าเป็นงานภาพวาดด้วยโค้ด

## ⑤ QA กลาง (ทุกเส้นทาง ก่อนส่ง)
```bash
node <motion-design-craft>/motion-qa.mjs out.mp4 <fps>                                   # pop/แฟลช (คัทตั้งใจให้บอก)
ffmpeg -i out.mp4 -vf "fps=1,scale=360:-1,tile=5x4" -frames:v 1 phone.png               # อ่านออกที่จอมือถือ (เปิดดูจริง)
ffmpeg -hide_banner -i out.mp4 -af ebur128 -f null - 2>&1 | grep -A1 "Integrated" | grep " I:"   # ≈ −14 LUFS
ffprobe -v error -show_entries stream=codec_type,width,height,r_frame_rate -of csv=p=0 out.mp4  # format ตรงปลายทาง
```
ข้าฟังเสียงเองไม่ได้ → ส่งไฟล์ให้ท่านฟังทุกครั้ง · จบงานจด `note-me`

## ตัวอย่างการเลือกเส้นทาง
- "ทำคลิปขายพัดลมจาก Shopee ลิงก์นี้ ลง Shorts" → `ad-creative` → รูปจาก Chrome จริง → ทาง C · 9:16
- "ทำคลิปเล่าเรื่องผีไทย 60 วิ" → `shorts-hcbr` → ภาพเจน → TTS → `general-video` · 9:16
- "ตัดไฮไลต์บอลนัดเมื่อคืน" → หยุดที่ด่านสิทธิ์: ถามว่าฟุตเทจมาจากไหน
- "ใส่ซับคลิปที่ผมพูดนี้" → `embedded-captions`
