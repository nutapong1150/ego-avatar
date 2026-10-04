# Remake · มีม · หน้าคน AI (ส่วนขยายของ motion-design-craft)

ทั้ง 3 อย่างนี้**ท่านอนุญาตให้ใช้แล้ว (2026-10-04)** แต่ความเสี่ยงด้านลิขสิทธิ์และภาพลักษณ์เป็นของท่าน · ข้าต้องบอกความเสี่ยงของแต่ละงานก่อนลงมือทุกครั้ง · ต้องใช้ `yt-dlp` (`pip install yt-dlp` ครั้งแรก ถามท่านก่อนลง) · ทดสอบคำสั่งทั้งหมดบน Windows แล้ว 2026-10-04

```
 REF (คลิปต้นแบบ) ─► Phase 0 แยกเฟรม/คัท/ชีต ─► SPEC.md ตารางช็อต ─► รอ OK
        ▼
 Phase 1 หน้า render(t) เดียว (t = F/fps ของ REF) ─► Phase 2 สร้างทีละกลุ่มช็อต + เทียบ ref|ours
        ▼
 Phase 3 เรนเดอร์ fps เดียวกับ REF ─► split-screen "original | remake" + stacked เช็ค sync
```

## 1. Remake mode: ทำคลิปเปิดตัวของคนอื่นใหม่แบบเฟรมต่อเฟรมให้แบรนด์เรา

**ความเสี่ยง:** โครงเรื่อง/ท่าทางเป็นงานของเขา · ปลอดภัยสุดคือโพสต์แบบ "original | remake" พร้อมแท็กเครดิตแบรนด์ต้นฉบับ (รูปแบบที่ใช้กันบน X) · **ห้ามเด็ดขาด:** ใช้เพลง/เสียงพากย์/ภาพคน/โลโก้ของต้นฉบับ · ทำโลโก้คู่แบบ "แบรนด์เขา × เรา" ที่ทำให้ดูเหมือนเป็นพาร์ตเนอร์กัน · อ้างว่า "ทำใน 15 นาที" ถ้าไม่จริง

**Phase 0 วิเคราะห์ (ยังไม่สร้าง):**
```bash
python -m yt_dlp -f "bv*[height<=1080]+ba/b" --merge-output-format mp4 -o ref/reference.mp4 "<URL>"   # ไม่ใช้ cookies เบราว์เซอร์
ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate,nb_frames -of csv=p=0 ref/reference.mp4
ffmpeg -i ref/reference.mp4 -start_number 0 -q:v 3 ref/full/f%04d.jpg     # ทุกเฟรม เลขเริ่ม 0
ffmpeg -i ref/reference.mp4 -vn -ac 2 -ar 48000 ref/audio.wav             # เอาไว้วัดจังหวะ ไม่เอามาใช้
node <skill>/motion-qa.mjs ref/reference.mp4 <fps>                        # pops = คัทแข็งของต้นฉบับ
ffmpeg -i ref/reference.mp4 -vf "drawtext=fontfile='C\:/Windows/Fonts/tahomabd.ttf':text='f%{frame_num}':x=10:y=10:fontsize=48:fontcolor=red:box=1:boxcolor=white,select='not(mod(n\,6))',scale=256:-1,tile=10x8" -fps_mode vfr ref/sheet_%02d.jpg
```
อ่านชีตทุกหน้าแล้วเขียน `SPEC.md`: ตาราง `shot | f0–f1 | ต้นฉบับมีอะไร | เปลี่ยนเป็นอะไรของเรา` + กฎสลับ (สี/โลโก้/คำ) · คลิปเปิดตัวสมัยนี้ส่วนใหญ่เป็นกล้อง/การแปลงร่างต่อเนื่อง คัทแข็งมักมีแค่ 10–15 จุด และขอบช็อตใน SPEC มักคลาด ±4 เฟรม

**Phase 1 เครื่องยนต์:** หน้า `render(t)` เดียว ตั้ง `window.CUTS` จากคัทของต้นฉบับ (วินาที = F/fps) · ใช้ `motion.js` · ธีมแบรนด์เราจาก `_base.css`
**Phase 2 สร้าง:** แบ่งช็อตเป็นกลุ่มต่อเนื่อง ทีละกลุ่ม (งานใหญ่ให้ sub-agent กลุ่มละตัว เขียนแค่ไฟล์ของกลุ่มตัวเอง) · วัดจากเฟรมจริงด้วยตา (ขนาด ตำแหน่ง จังหวะพิมพ์ เส้นทางเคอร์เซอร์) · เทียบด้วย:
```bash
SUB=1 node <creative-coding-video>/render-video.mjs page.html out/ours.mp4 <วินาที> <fps ของ REF> <กว้าง> <สูง>
ffmpeg -i ref/reference.mp4 -i out/ours.mp4 -filter_complex "[0:v]scale=-2:540[a];[1:v]scale=-2:540[b];[a][b]hstack,select='eq(n\,120)+eq(n\,240)+eq(n\,360)',tile=3x1" -frames:v 1 out/compare.jpg
```
เกณฑ์ผ่าน: ตำแหน่ง/ขนาดคลาด ≤ 1–2% ของเฟรม · คัทตรงเฟรม · ห้ามบอกว่า "ตรงแล้ว" โดยไม่ได้เปิด compare ดู
**เสียง:** เพลงฟรีเชิงพาณิชย์ (ไม่ใช่ของต้นฉบับ) ปรับความเร็วไม่เกิน 8% (`atempo`) ตัดตามห้องให้ drop ตรงเวลาต้นฉบับ · SFX วางบนจุดกระแทกของต้นฉบับ (ดูจาก `showwavespic`) · −14 LUFS

**Phase 3 ส่งงาน:**
```bash
node <creative-coding-video>/render-video.mjs page.html out/ours.mp4 <วินาที> <fps ของ REF> <กว้าง> <สูง>
# split-screen สำหรับโพสต์ (setsar=1 ไม่งั้น X บิดภาพ)
ffmpeg -i ref/reference.mp4 -i out/ours.mp4 -filter_complex "[0:v]scale=-2:900,pad=iw+40:ih+120:0:100:white,drawtext=fontfile='C\:/Windows/Fonts/tahomabd.ttf':text='original':x=10:y=40:fontsize=40:fontcolor=white:box=1:boxcolor=black:boxborderw=12[a];[1:v]scale=-2:900,pad=iw:ih+120:0:100:white,drawtext=fontfile='C\:/Windows/Fonts/tahomabd.ttf':text='remake':x=10:y=40:fontsize=40:fontcolor=white:box=1:boxcolor=black:boxborderw=12[b];[a][b]hstack=inputs=2:shortest=1,setsar=1[v]" -map "[v]" -map 1:a? -c:v libx264 -crf 18 -pix_fmt yuv420p -c:a aac -movflags +faststart out/split_screen.mp4
# stacked ไว้เช็ค sync เอง
ffmpeg -i ref/reference.mp4 -i out/ours.mp4 -filter_complex "[0:v]scale=960:-2[a];[1:v]scale=960:-2[b];[a][b]vstack=inputs=2:shortest=1" -c:v libx264 -crf 20 out/sync_check.mp4
```
เช็คสีแบรนด์เก่าหลงเหลือ: ดู contact sheet ของ `ours.mp4` ทุก 1 วิ

## 2. มีม: คลังคลิปมีมจาก YouTube

**ความเสี่ยง:** คลิปมีมมีเจ้าของลิขสิทธิ์ · ช่องที่สร้างรายได้/ช่อง affiliate อาจโดน Content ID claim หรือ strike · ใช้สั้นๆ เพื่อเล่าเรื่อง ไม่ใช้ทั้งคลิป
```bash
python -m yt_dlp "ytsearch6:<ชื่อมีม> meme template" --print "%(id)s  %(duration)ss  %(title)s"
python -m yt_dlp -f "bv*[height<=720]+ba/b" --merge-output-format mp4 -o "memes/raw/%(id)s.%(ext)s" <id>
#   ถ้าเจอ "page needs to be reloaded": เติม --extractor-args "youtube:player_client=tv,web_safari,android,ios"
ffmpeg -i memes/raw/<id>.mp4 -vf "fps=1,scale=320:-1,tile=6x3" -frames:v 1 memes/sheets/<id>.png          # ดูก่อนเลือก
ffmpeg -ss <a> -to <b> -i memes/raw/<id>.mp4 -vf "scale=1280:-2,setsar=1" -c:v libx264 -crf 18 -c:a aac memes/clips/<ชื่อ>.mp4
```
- เลือกคลิปที่**ไม่มี**ซับฝังและลายน้ำตั้งแต่ต้นทาง (ห้ามลบลายน้ำของคนอื่น) · ตัดช่วง "Subscribe / link in description" ท้ายคลิปทิ้ง
- คลังเก็บใน workspace `assets/memes/{raw,clips,sheets}` · คำบรรยายมีมไว้ในโพสต์ ไม่ฝังลงภาพ
- ใช้ใน `render(t)` ให้ผลเหมือนเดิมทุกครั้ง: แตกเฟรม `ffmpeg -i clip.mp4 frames/%04d.jpg` แล้วสลับ `img.src` ตาม `Math.floor(t*fps)` (โหลดล่วงหน้าตอน ready) · อย่าพึ่ง `<video>` + `seeked` ตอนเรนเดอร์ เพราะเฟรมหลุด

## 3. หน้าคนที่ AI สร้าง (คนไม่มีตัวตนจริง) สำหรับ UI สมมติ

**ความเสี่ยง:** ถ้าทำให้คนดูเข้าใจว่าเป็นลูกค้าจริง = รีวิวปลอม (ผิดกฎแพลตฟอร์ม/กฎหมายโฆษณา) · ใช้ได้เฉพาะ**UI สมมติ** (บับเบิลแชต รายชื่อทีม อวาตาร์ในแอปตัวอย่าง) ที่มีป้าย "ตัวอย่าง"
```bash
curl -sL -A "Mozilla/5.0" https://thispersondoesnotexist.com/random-person.jpeg -o faces/raw/p01.jpg   # 1024², ~0.5 MB
ffmpeg -i faces/raw/p01.jpg -vf "crop=iw*0.76:ih*0.76,scale=512:512" faces/p01.jpg
```
- โหลดทีละใบ เว้นจังหวะ ไม่วนลูปรัว · ทำ contact sheet แล้วเลือกด้วยตา (ตัดใบที่หน้าเพี้ยน/ฟันแปลก/พื้นหลังมีเศษ)
- ตั้งชื่อให้เข้ากับหน้า · **1 ชื่อ = 1 หน้า ตลอดทั้งคลิป** · ห้ามใช้หน้าคนจริงหรือดาราเด็ดขาด
- ห้ามคู่กับคำรีวิว/ดาว/ตัวเลขผลลัพธ์ที่ทำให้ดูเหมือนลูกค้าจริง
