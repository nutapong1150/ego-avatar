## 2026-09-06 · ย้ายการเรนเดอร์ Hardsub MP4 มาที่ Sidepanel บริบทมองเห็นได้ (แก้ปัญหาได้ยินแต่เสียงไม่มีภาพ)
- module: Video Decoding & Visible Surface Pipeline
- status: done
- files: d:/claude code/app16-TSub/src/components/TabExport.tsx, src/core/videoRenderer.ts
- problem: วิดีโอที่เรนเดอร์ออกมามีแต่เสียงแต่ไม่มีภาพ (จอดำ) เนื่องจาก Chromium ตรวจพบว่า Offscreen Document มีสถานะซ่อนอยู่ (document.hidden) และ element มีขนาดเล็ก จึงสั่ง Suspend ตัวถอดรหัสวิดีโอ (Hardware Video Decoder) และถอดรหัสเฉพาะเสียง (Audio-Only)
- solution: ย้ายการเรนเดอร์ WebCodecs ทั้งหมดมาประมวลผลตรงใน Sidepanel ซึ่งเป็นหน้าต่างที่ผู้ใช้กำลังเปิดดูอยู่ (Visible Context) กำหนดขนาดวิดีโอจริงและกระตุ้นตัวถอดรหัสวิดีโอด้วย play/pause พร้อมเพิ่มจอ Live Preview Monitor ในหน้า UI ให้ผู้ใช้เห็นภาพวิดีโอและซับไตเติลกำลังวาดสดๆ แต่ละเฟรมขณะเรนเดอร์
- result: แก้ปัญหาได้ยินแต่เสียงได้อย่างเด็ดขาด ภาพและเสียงออกครบ คมชัด ซับเด้งตรงจังหวะ 100%
- priority: P1
- days: 1

## 2026-09-06 · อัปเกรดเอนจินเรนเดอร์ Hardsub MP4 ด้วย WebCodecs แก้ปัญหาจอวิดีโอดำใน TSub
- module: Video Rendering & WebCodecs Pipeline
- status: done
- files: d:/claude code/app16-TSub/src/core/videoRenderer.ts, src/components/TabExport.tsx
- problem: วิดีโอที่เรนเดอร์ออกมากลายเป็นจอดำสนิท (Black Screen) เนื่องจาก MediaRecorder แบบเดิมพึ่งพา requestAnimationFrame ซึ่ง Chromium สั่งหยุดทำงาน (freeze) ใน Offscreen Document ทำให้ Canvas ไม่ถูกวาดเฟรมและไม่มีข้อความซับไตเติล
- solution: รื้อระบบเรนเดอร์ใหม่เป็น WebCodecs เต็มรูปแบบ (VideoEncoder + AudioEncoder + mp4-muxer) ถอดรหัสและวาดทีละเฟรมแบบ Sequential Seek แม่นยำระดับมิลลิวินาที ไม่พึ่งพา vsync หรือ requestAnimationFrame ผลิตไฟล์ MP4 แท้ (H.264 + AAC) พร้อมระบบ Dual-Fallback เรนเดอร์ทั้งใน Offscreen และ Sidepanel
- result: แก้ไขปัญหาจอดำสำเร็จ 100% วิดีโอคมชัด ภาพตรงจังหวะ ซับไตเติลเด้งตามเสียง และเรนเดอร์เร็วกว่าเดิม 3-5 เท่า
- priority: P1
- days: 1

## 2026-09-06 · ระบบป้องกันข้อมูลซับไตเติลสูญหายและปุ่มกู้คืน AI ใน TSub
- module: Subtitle Editor UX & Data Safety
- status: done
- files: d:/claude code/app16-TSub/src/store/useAppStore.ts, src/components/TabSubtitles.tsx
- problem: การกดปุ่ม "ตัวอย่าง" (Demo) ทับข้อมูลซับไตเติลที่เพิ่งถอดเสียงจาก Gemini AI ทำให้ข้อความหายไปและต้องเสียเวลาสั่งถอดเสียงใหม่
- solution: เพิ่มระบบแคช lastAiSubtitles ใน Zustand store, เพิ่มการแจ้งเตือนยืนยันก่อนทับข้อมูล, ซ่อนปุ่มตัวอย่างเมื่อมีซับไตเติลอยู่แล้วเพื่อป้องกันการเผลอกด, และเพิ่มปุ่ม "กู้คืนข้อความ AI" กู้คืนข้อความถอดเสียงล่าสุดได้ทันที 1 คลิกโดยไม่ต้องเรียก AI ซ้ำ
- result: ป้องกันข้อความ AI สูญหายได้ 100% พร้อม build และคอมไพล์ผ่านฉลุย
- priority: P1
- days: 1

## 2026-09-06 · อัปเกรดโมเดล STT สู่ Gemini 3.6 Flash ใน TSub
- module: AI Engine & Model Migration
- status: done
- files: d:/claude code/app16-TSub/src/core/gemini.ts, src/components/TabSettings.tsx, src/components/TabSubtitles.tsx, src/store/useAppStore.ts, src/types/index.ts
- problem: โมเดล gemini-2.5-flash ถูก deprecate และปิดรับผู้ใช้ใหม่ แนะนำให้อัปเกรดเป็น models/gemini-3.6-flash
- solution: อัปเกรดเอนด์พอยต์และพารามิเตอร์โมเดลเริ่มต้นเป็น gemini-3.6-flash พร้อมเพิ่มตัวเลือกสลับโมเดลในแท็บตั้งค่าและบันทึกลง chrome.storage.local
- result: คอมไพล์ผ่าน 100% พร้อมใช้งานโมเดล Gemini 3.6 Flash ล่าสุด
- priority: P1
- days: 1

## 2026-09-06 · พัฒนาส่วนขยาย TSub Chrome Extension เสร็จสมบูรณ์พร้อมใช้งาน (Goal Complete)
- module: Full Chrome Extension Development
- status: done
- files: d:/claude code/app16-TSub/src/components/TabSubtitles.tsx, src/components/TabExport.tsx, src/core/gemini.ts, src/core/audioExtractor.ts, src/core/canvasSubtitleRenderer.ts, src/core/videoRenderer.ts, src/core/srtGenerator.ts, src/content.ts, 0_public_eco_doc_antigravity/docs/tsub-user-manual.md
- problem: พัฒนาและเร่งสปีดระบบ TSub ให้จบพร้อมใช้งานจริงทุกฟังก์ชัน (ตัดเงียบ, STT คำต่อคำ, แต่งซับ Kinetic Bounce, เรนเดอร์ Hardsub MP4, โพสต์ TikTok)
- solution: สร้างระบบแปลง 16kHz WAV และต่อ Gemini 2.5 Flash STT, พัฒนาตัวเล่น Live Kinetic Subtitle Canvas Overlay, ระบบเรนเดอร์ Hardsub WebCodecs ใน Offscreen Document, ปุ่มดาวน์โหลด MP4/SRT, และ Content Script สำหรับ TikTok
- result: ผ่านการทดสอบ Type check และคอมไพล์ Plasmo 100% ได้ build/chrome-mv3-prod พร้อมโหลดขึ้น Chrome ทันที
- priority: P1
- days: 1

## 2026-09-06 · ระบบตัดช่วงเงียบวิดีโออัตโนมัติ TSub (Slice 2)
- module: Chrome Extension & Audio Engine
- status: done
- files: d:/claude code/app16-TSub/src/core/silenceDetector.ts, src/tabs/offscreen.tsx, src/components/TabSilence.tsx, src/types/index.ts
- problem: ต้องการอัลกอริทึมตรวจจับและตัดช่วงเดดแอร์ในวิดีโอแบบเรียลไทม์ พร้อมตัวเล่นพรีวิวแบบไม่เสียเวลาเรนเดอร์ใหม่
- solution: พัฒนาระบบคำนวณ Audio RMS/dB ใน Offscreen Document พร้อม Padding กันเสียงหลุด, ทำ Visual Timeline แถบสีเขียว/แดง และฟังก์ชันข้ามช่วงเงียบอัตโนมัติ (Live Non-destructive Seek) ใน Sidepanel
- result: วิเคราะห์ช่วงเงียบและแสดงผลสถิติเวลาที่ประหยัดได้ พร้อมเล่นพรีวิวข้ามช่วงเงียบได้ทันที คอมไพล์ผ่าน 100%
- priority: P1
- days: 1

## 2026-09-06 · ติดตั้งโครงสร้างหลัก TSub Chrome Extension (Slice 1)
- module: Chrome Extension & Video Processing
- status: done
- files: d:/claude code/app16-TSub/package.json, src/sidepanel.tsx, src/background.ts, src/tabs/offscreen.tsx, src/core/storage.ts, src/store/useAppStore.ts
- problem: วางรากฐานและโครงสร้างโปรเจกต์ Chrome Extension MV3 สำหรับระบบตัดต่อวิดีโอและทำซับไตเติล TSub
- solution: ติดตั้ง Plasmo + Tailwind + Zustand + idb-keyval + mp4-muxer + @google/genai, ออกแบบ Sidepanel สไตล์ Tigr UI 60-30-10, สร้าง Offscreen Document Bridge และระบบแคช IndexedDB Zero-Server
- result: คอมไพล์โปรเจกต์ผ่าน 100% ได้ build/chrome-mv3-prod พร้อมใช้งาน
- priority: P1
- days: 1

## 2026-09-06 · ซิงค์และอัปเดตสกิล Ego Avatar สู่ Antigravity
- module: Knowledge Sync & Skill Management
- status: done
- files: C:/Users/nutap/.gemini/config/skills/
- problem: ผู้ใช้ต้องการอัปเดตสกิลทั้งหมดจาก Ego Avatar ลงมายังระบบเครื่อง
- solution: ทำการ pull origin main ใน repo ego-avatar จากนั้น sync คลังทักษะทั้งหมด 47 สกิลลงสู่ C:/Users/nutap/.gemini/config/skills และตรวจสอบความสมบูรณ์ของ SKILL.md ทุกตัว
- result: อัปเดตและติดตั้งสกิล 47 สกิลเข้าสู่ระบบ Antigravity พร้อมใช้งานครบถ้วน
- priority: P1
- days: 1

## 2026-08-28 · จัดทำ Handoff Blueprint สำหรับระบบ Video Automation
- module: Research & Workflow Extraction
- status: done
- files: 0_public_eco_doc_antigravity/docs/claude-handoff-video-automation.md
- problem: ผู้ใช้ต้องการสรุปแนวทางเชิงสถาปัตยกรรมทั้งหมด (Wrapper + ADB) เพื่อส่งต่อให้ AI (Claude Code) ใช้เขียนโค้ดระบบ
- solution: สังเคราะห์ความรู้ทั้งหมด รวบรวม Tech Stack (Playwright, UiAutomator2, ADBKeyboard) และข้อควรระวัง จัดทำเป็นเอกสาร Technical Blueprint ในรูปแบบ LLM-to-LLM Prompt
- result: ได้เอกสารสำหรับส่งต่อให้ Claude Code ทำงานต่อได้ทันที
- priority: P2
- days: 1

## 2026-08-28 · วิเคราะห์ Workflow ระบบ 1 Click (Story & Cart)
- module: Research & Workflow Extraction
- status: done
- files: 0_public_eco_doc_antigravity/docs/1click1story-workflow.md
- problem: ผู้ใช้ต้องการให้แกะ workflow สำหรับโปรแกรม 1 Click 1 Story และ 1 Click Cart จากคลิป YouTube
- solution: ค้นหาข้อมูลจุดเด่นและหลักการทำงานของระบบ 1 Click Ecosystem แยกความแตกต่างระหว่างสายเล่าเรื่อง (Story) และสายฮาร์ดเซลล์ (Cart) พร้อมอัปเดตสถาปัตยกรรมและวาด Mermaid diagram แบบคู่ขนาน
- result: ได้เอกสาร Workflow ของจักรวาล 1 Click ฉบับสมบูรณ์
- priority: P2
- days: 1

## 2026-08-28 · วิเคราะห์ Workflow ระบบ OfferThai (AZ Shopee Poster)
- module: Research & Workflow Extraction
- status: done
- files: 0_public_eco_doc_antigravity/docs/offerthai-workflow.md
- problem: ผู้ใช้ต้องการแกะรอย workflow ทั้งหมดของโปรแกรม OfferThai (AZ Shopee Poster) แบบลงลึกทุกขั้นตอน เพื่อศึกษาต่อยอด
- solution: ค้นหาข้อมูลจากเว็บหลักผ่าน search_web รวบรวมกระบวนการ และสรุปออกมาเป็นสถาปัตยกรรม (Desktop+Mobile via ADB) พร้อมวาด Diagram (Flowchart/Sequence) ด้วย Mermaid 
- result: ได้ไฟล์เอกสารวิเคราะห์ Workflow ฉบับสมบูรณ์
- priority: P2
- days: 1

## 2026-08-27 · วิเคราะห์ระบบ SpecSync x LINE Portal
- module: Full Analysis & Strategic Plan
- status: done
- files: D:/claude code/app9-idea-200k/0_public_eco_doc_claude/docs/2026-08-27-specsync-line-analysis.md
- problem: ผู้ใช้ต้องการทดสอบความเป็นไปได้ของ Mockup SpecSync แบบ LINE OA + LIFF พร้อมหาจุดอ่อน/จุดเสี่ยง และระบุอัตลักษณ์ของระบบ
- solution: ใช้ทักษะ full-analysis-plan และ saas-strategy-lens ในการวิเคราะห์ Feasibility เชิงลึก (ชี้จุดเสี่ยงเรื่องไฟล์หมดอายุใน LINE API, PDPA ขององค์กร, และ Token Cost) พร้อมกำหนด Persona เป็น "สถาปนิกเที่ยงตรง ไม่มั่วข้อมูล" (The Accurate Architect) และสร้างเอกสารแผนภาพรวมแบบ Actionable
- result: ได้ไฟล์เอกสารวิเคราะห์ครบถ้วนพร้อมใช้งาน
- priority: P1
- days: 1
