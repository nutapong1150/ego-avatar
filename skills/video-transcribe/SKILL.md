---
name: video-transcribe
description: Use when editing video with the external video-use skill and you want to transcribe WITHOUT ElevenLabs, or to choose/compare the speech-to-text engine — "ถอดเสียงคลิป", "ไม่มี key ElevenLabs", "ใช้ whisper แทน", "เปลี่ยนเจ้าถอดเสียง", "ถอดเสียงภาษาไทยสำหรับตัดต่อ". Runs one script that writes video-use's cached transcript format so video-use never calls ElevenLabs. Engines: local faster-whisper (default, free, on-GPU) · openai · google · elevenlabs.
---

# ถอดเสียงสลับเจ้า (Video Transcribe) — คู่หูของ video-use

**video-use** (ภายนอก · `browser-use/video-use` · ติดตั้งที่ `D:\claude code\skill_skill_skill\video-use` + junction `~/.claude/skills/video-use`) ตัดต่อคลิปด้วยการ "อ่าน" transcript ระดับคำ
เดิมบังคับใช้ ElevenLabs Scribe · สกิลนี้เสียบเจ้าอื่นแทนโดย **ไม่แก้โค้ดของเขา**

```
 คลิปดิบ ─► transcribe_any.py --engine X ─► edit/transcripts/<ชื่อ>.json (รูปแบบ Scribe)
                                                   │ video-use เห็นไฟล์ = cache → ไม่เรียก ElevenLabs
                                                   ▼
                                  pack_transcripts → ตัด → render (video-use ตามปกติ)
```

## ใช้

**ต้องรันก่อน** video-use ขั้น Inventory (มันจะเรียก `transcribe_batch.py` → เจอ cache → ข้าม)

```bash
python "<ego-avatar>/skills/video-transcribe/transcribe_any.py" <โฟลเดอร์คลิป> --language th
python ... --engine openai      # หรือตั้ง TRANSCRIBE_ENGINE=openai ครั้งเดียว
```

| engine | ค่าใช้จ่าย | ต้องมี | หมายเหตุ |
|---|---|---|---|
| `local` (ค่าเริ่ม) | ฟรี | `pip install faster-whisper nvidia-cublas-cu12 nvidia-cudnn-cu12==9.*` | GPU ถ้ามี (int8_float16 พอดี 6GB) ไม่งั้น CPU · โมเดล `$WHISPER_MODEL` ค่าเริ่ม large-v3 (~3GB โหลดครั้งแรก) |
| `openai` | ต่อนาที | `OPENAI_API_KEY` · `pip install openai` | whisper-1 · ไฟล์ ≤ 25MB |
| `google` | ต่อนาที | `GOOGLE_APPLICATION_CREDENTIALS` · `pip install google-cloud-speech` | sync ≤ 1 นาที (ยาวกว่าต้องทำ GCS) |
| `elevenlabs` | ต่อนาที | `ELEVENLABS_API_KEY` | ของเดิม · แยกผู้พูด + audio event ครบ |

**เทียบเจ้า:** ลบ `edit/transcripts/<ชื่อ>.json` แล้วรันด้วย engine อื่น · ไฟล์มีอยู่ = ข้าม (cache)

## ⚠ ค้าง (2026-09-25) — engine local กับภาษาไทย

faster-whisper แตกภาษาที่ไม่มีช่องว่าง (th/zh/ja) เป็น **ทีละอักขระ** → `takes_packed.md` อ่านเป็น "ส ว ั ส ด ี คร ั บ"
ใจความ + เวลาวลีถูกแล้ว (ทดสอบคลิป TTS ไทย: เก็บ "เอ่อ" "อ่า" ได้ · เห็น take ซ้ำ) · **NEXT:** ใน `engine_local` รวมอักขระไทยติดกันเป็นก้อนจนเจอช่องว่างเวลา (เช่น ≥ 0.15 วิ) หรือตัดคำด้วย pythainlp แล้วเทียบเวลาอักขระ

## สิ่งที่ต้องรู้ (ไม่ใช่ความผิดของสคริปต์ แต่กระทบการตัด)

- **Whisper ชอบตัดคำเติมทิ้ง** ("เอ่อ" "อ่า") — ขัดกฎข้อ 8 ของ video-use · ใส่ `initial_prompt` ชวนให้เขียนออกมาแล้ว แต่ไม่รับประกัน · คำที่หายจะกลายเป็นช่องว่าง (spacing) ซึ่ง video-use ยังใช้ตัดได้
- **ไทยไม่มีช่องว่างระหว่างคำ** — "คำ" ของแต่ละเจ้าอาจเป็นพยางค์หรือวลี · ตรวจ `takes_packed.md` ก่อนตัดเสมอ
- **ไม่แยกผู้พูด** (ยกเว้น elevenlabs) — ทุกคำเป็น `speaker_0` · คลิปหลายคนใช้ elevenlabs
- `vad_filter=False` ตั้งใจ — ต้องเก็บช่วงเงียบไว้ให้ video-use หาจุดตัด

## ไฟล์

- `transcribe_any.py` — สคริปต์ · เพิ่มเจ้าใหม่ = เขียนฟังก์ชันคืน `[{text,start,end}]` แล้วใส่ใน `ENGINES`
- `check_to_scribe.py` — ตัวเช็ก: spacing ครบ + ต่อเข้า `pack_transcripts` ของ video-use ได้จริง
- Windows: สคริปต์เพิ่ม DLL ของ cuBLAS/cuDNN จาก pip ให้เอง (`_cuda_dlls`) · ไม่งั้น ctranslate2 หา DLL ไม่เจอ

## ติดตั้ง video-use บนเครื่องใหม่

```bash
git clone https://github.com/browser-use/video-use "D:/claude code/skill_skill_skill/video-use"
# PowerShell: New-Item -ItemType Junction -Path "$env:USERPROFILE\.claude\skills\video-use" -Target "D:\claude code\skill_skill_skill\video-use"
cd "D:/claude code/skill_skill_skill/video-use" && python -m pip install --user -e .
winget install --id Gyan.FFmpeg -e      # ffmpeg + ffprobe (เปิด shell ใหม่ให้ PATH มีผล)
```

อัปเดต: `git -C "D:/claude code/skill_skill_skill/video-use" pull --ff-only` · **ห้าม vendor video-use เข้า ego-avatar** (ของภายนอก อัปเดตทุกสัปดาห์)
