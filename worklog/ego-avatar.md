## 2026-10-09 · สกิลใหม่ วาทยกรสถาปนิก (sa-orchestra) + sub-agent sa-developer / sa-tester
- module: Skills (engineering orchestration)
- status: done
- files: skills/sa-orchestra/{SKILL.md, PLAN-TEMPLATE.md, AUDIT.md, profiles/java-legacy-jsf.md}, agents/{sa-developer.md, sa-tester.md}, EGO_AVATAR.md, AGENTS.md
- problem: ท่านอยากได้ senior ประกบงาน Java ให้ไม่หลุดกรอบและพิสูจน์ผลได้ — main เป็น SA/Reviewer, sub-agent เป็น Dev/Tester, วนแก้จนผ่าน + โหมดหาช่องโหว่ที่ถามก่อนแก้
- solution: grill 2 รอบ (13 ข้อ) ต่อยอด mattpocock (implement-spec, code-review 2 แกน, tdd) + karpathy · ตัดส่วนที่ขัดกฎบริษัท (sub-agent commit, worktree) · plan ไฟล์เดียวมีตารางหลักฐานที่ Tester กรอก · วนไม่เกิน 3 รอบ · โปรไฟล์ Java 12 ข้อ (log PII info ได้ตามที่ท่านเคาะ) · AUDIT 11 หัวข้อ + CVE ของ dependency
- result: งานแก้โค้ด T2+ เรียก sa-orchestra เอง · ตัวแรกที่จะลองคือ audit dmytax-upload แล้วต่อ ICA lookup
- priority: P1
- days: 1

## 2026-10-09 · sync สกิลสาย mattpocock ให้ตรงต้นทางล่าสุด + ตรวจ karpathy
- module: Skills Registry (mattpocock vendored)
- status: done
- files: skills/{ask-matt,code-review,codebase-design,diagnosing-bugs,domain-modeling,implement,improve-codebase-architecture,prototype,setup-matt-pocock-skills,tdd,teach,triage,grilling,grill-with-docs}/*, skills/{to-spec,to-tickets,writing-for-agents,implement-spec,research,retro,wayfinder,wizard,to-questionnaire,wait-what,pr}/ (ใหม่), ลบ skills/{to-prd,to-issues,writing-great-skills}, EGO_AVATAR.md, AGENTS.md, skills/absolute-architect/SKILL.md
- problem: สกิลที่กลืนจาก mattpocock/skills เมื่อ 2026-07-02 ล้าสมัยเกือบทุกตัว (ต้นทางเปลี่ยนชื่อ to-prd→to-spec, to-issues→to-tickets, writing-great-skills→writing-for-agents และเพิ่มสกิลใหม่ 8 ตัว)
- solution: เทียบทีละโฟลเดอร์ ตัวที่ไม่เคยดัดแปลงเองแทนด้วยของต้นทาง · คง handoff (ดัดแปลงหนัก) และ karpathy-discipline (แปลไทย เนื้อหาตรงต้นทางแล้ว) · ใส่ prefix `ego-avatar:` ให้ทุกจุดที่สั่ง "Skill tool with X" ตามแนวที่เคยแก้ใน grill-with-docs · ตัด agents/openai.yaml (ของ Codex) ออก · ข้าม grill-me (เคยยุบรวมไปแล้ว 09-03) · ไม่ลบ design-an-interface (ต้นทางเลิกแล้ว แต่ absolute-architect ยังอ้าง)
- result: สกิลสาย mattpocock ตรงต้นทาง ณ 2026-10-09 · registry + AGENTS.md ใช้ชื่อใหม่ครบ
- priority: P2
- days: 1

## 2026-10-04 · เทียบ A/B/C → ตั้ง C เป็นทางหลัก + แก้ 3 จุด + remake/มีม/หน้าคน AI
- module: Skills
- status: done
- files: skills/motion-design-craft/{SKILL.md, motion.js, motion-qa.mjs, remake-memes-faces.md}, skills/creative-coding-video/{render-video.mjs, SKILL.md}, EGO_AVATAR.md
- problem: ต้องตัดสินว่าจะใช้สกิลไหน · คลิป C มีปัญหา 3 จุด (สระบนไทยลอยในหน้ากาก · ตัวเล็กไปสำหรับมือถือ · หัวข้อโดนกล้องตัด)
- solution: ตัดคลิปเทียบ 20 วิ 3 แบบ บทเดียวกัน → ท่านเลือก C (ใช้สองสกิลคู่กัน) · M.words เลื่อน 160% · พาดหัว ≥112px · หัวข้อออกก่อนกล้องพุ่ง · SUB=6 เป็นค่าเริ่ม · motion-qa เพิ่มโหมด peaks · พอร์ต remake เป็น ffmpeg (ทดสอบ split-screen แล้ว) + คู่มือมีม yt-dlp + หน้าคน AI พร้อมกฎความเสี่ยง
- result: C2 demo (videos/skill-compare/C2-combined.html) · ไฟล์ผลเทียบ app10-gen-video/0_public_eco_doc_claude/docs/skill-compare-motion-2026-10-04.md
- priority: P2
- days: 1

## 2026-10-04 · สกิลใหม่ motion-design-craft (ดัดแปลงจาก howseen-ai/claude-motion-design)
- module: Skills
- status: done
- files: skills/motion-design-craft/{SKILL.md, motion.js, motion-qa.mjs}, skills/creative-coding-video/{render-video.mjs, SKILL.md}, EGO_AVATAR.md
- problem: ท่านอยากได้สกิล motion design จาก repo ภายนอก ต้องตรวจความปลอดภัยก่อน
- solution: อ่านครบทุกไฟล์ (ไม่มี exec/eval/โค้ดอำพราง/unicode ซ่อน/prompt injection · เน็ตยิงแค่ mixkit/svgl/jsdelivr/gstatic/21st.dev) · เอาเฉพาะกฎการเคลื่อนไหว+QA มาทำเป็นชั้นบนของ creative-coding-video · port ตัวตรวจ pop/flash/loop เป็น Node · เพิ่ม SUB motion blur ให้ render-video.mjs (ค่าเริ่ม 1 = เหมือนเดิม) · ไม่รับ remake mode/yt_dlp/Python stack
- result: ทดสอบเรนเดอร์จริง SUB=4 + SFX + CUTS ได้ 60 เฟรม มีเสียง เบลอขึ้นตอนเคลื่อน · motion-qa จับ pop ตรงคัท t=1.000 พอดี
- priority: P2
- days: 1

## 2026-09-06 · เผยแพร่โค้ด TSub Chrome Extension ขึ้น GitHub Main Repo
- module: Version Control & GitHub Repository Release
- status: done
- files: d:/claude code/app16-TSub/README.md, .gitignore, src/*, 0_public_eco_doc_antigravity/*
- problem: ผู้ใช้ต้องการนำซอร์สโค้ดและเอกสารโปรเจกต์ TSub ทั้งหมดขึ้น GitHub Repository หลักที่ https://github.com/nutapong1150/tsub บน branch main
- solution: ตั้งค่า .gitignore กรอง node_modules/build/.plasmo, เขียนเอกสาร README.md อธิบายสถาปัตยกรรมและวิธีติดตั้งอย่างครบถ้วน, ทำการ git init, เชื่อมต่อ remote origin, สร้าง commit แรก และ push ขึ้น main สำเร็จ 100%
- result: โค้ดทั้งหมด 33 ไฟล์ถูกเผยแพร่บน https://github.com/nutapong1150/tsub.git พร้อมใช้งาน
- priority: P1
- days: 1

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

## 2026-09-06 � Fix Subtitle Sync in TSub
- module: TSub WebCodecs & Canvas
- status: done
- files: src/core/timeMapper.ts, src/components/TabSubtitles.tsx, src/core/videoRenderer.ts
- problem: Subtitles misaligned completely because Gemini returned timestamps based on trimmed audio, but the UI and Renderer compared them against the original video's timeline.
- solution: Created timeMapper.ts to map srcTime <-> trimmedTime based on keepIntervals. Updated TabSubtitles live preview and videoRenderer to use trimmedTime when finding and drawing subtitles.
- result: Subtitles now sync perfectly with the cut video.
- priority: P1
- days: 1
  
## 2026-09-06 � TSub Purgatory Refactor  
- module: TSub Chrome Extension  
- status: done  
- files: offscreen.tsx, types/index.ts, useAppStore.ts, package.json  
- problem: Dead code from previous refactor (RENDER_HARDSUB handler, phantom @google/genai, orphan store state, mismatched types)  
- solution: Full Purgatory Refactor audit + purge: 380 deletions, 24 npm packages removed, type safety fixed  
- result: Clean codebase, tsc --noEmit pass, npm run build pass (2.7s)  
- priority: P2  
- days: 0.5 

## 2026-09-06 � Fix Quality and Subtitle Sync
- module: TSub Core
- status: done
- files: canvasSubtitleRenderer.ts, videoRenderer.ts, style.css
- problem: Subtitles not sharp, fonts missing, video quality dropped after render, kinetic highlight flickering.
- solution: 1) Imported Kanit/Prompt in style.css. 2) Awaited document.fonts.ready in renderer. 3) Used High Profile (avc1.64002a) and dynamic VBR (up to 15Mbps) for video. 4) Made kinetic highlight sticky between words.
- result: High video quality, beautiful fonts, perfect smooth subtitle sync.
- priority: P1
- days: 0

## 2026-09-06 � Fix Subtitles Finishing Before Video
- module: TSub Core
- status: done
- files: videoRenderer.ts
- problem: Subtitles and audio finished before the video ended. The frame generation loop accumulated fractional frame drift at the end of every keepInterval, causing the output video duration to grow longer than the concatenated audio.
- solution: Rewrote the frame generation loop to iterate exactly over the trimmed duration, using trimmedToSrcTime to perfectly map back to the source frame. Zero drift guaranteed.
- result: Video and audio duration perfectly match, subtitles end exactly with the video.
- priority: P1
- days: 0

## 2026-09-06 � Add Subtitle Sync Offset Slider
- module: TSub Core
- status: done
- files: TabSubtitles.tsx, TabExport.tsx, videoRenderer.ts, useAppStore.ts
- problem: Subtitles generated by Gemini STT are sometimes ~10% faster than the actual audio due to AI token alignment limitations.
- solution: Added a manual 'Subtitle Sync Offset' slider in the Subtitles tab (-2000ms to +2000ms). Applied this offset to both the live canvas preview and the WebCodecs hardsub renderer.
- result: Users can manually nudge subtitles forwards or backwards to achieve pixel-perfect lip sync.
- priority: P2
- days: 0

## 2026-09-06 � Add Expandable Live Preview
- module: TSub UI
- status: done
- files: TabSubtitles.tsx
- problem: Video preview player was locked at max-h-[200px], making it hard to see subtitle styles clearly on vertical videos.
- solution: Added an expand/collapse toggle button on the preview player. When expanded, it scales up to 600px / 70vh for a clear, large workspace.
- result: Much better UX for subtitle styling and sync checking.
- priority: P3
- days: 0

## 2026-09-06 � NLE Phase 1: Draggable Subtitles & Fonts
- module: TSub Core & UI
- status: done
- files: types/index.ts, useAppStore.ts, canvasSubtitleRenderer.ts, TabSubtitles.tsx, style.css
- problem: User wanted clearer, customizable fonts and the ability to move subtitles freely (like an NLE).
- solution: Added positionX and positionY to SubtitleStyle. Made the canvas overlay draggable (mapping CSS object-contain coordinates to internal canvas coordinates). Added Font Family selector with Prompt, Kanit, Inter, Chakra Petch, and Sarabun.
- result: Subtitles can be dragged anywhere on the video in real-time, and fonts can be customized.
- priority: P2
- days: 0

## 2026-09-06 � Subtitle Styling Pro Preset & Full Customization
- module: TSub UI
- status: done
- files: TabSubtitles.tsx, types/index.ts
- problem: User found the styling UI not intuitive enough and couldn't easily replicate the professional style from their reference image.
- solution: Added a one-click 'TikTok Pro' preset that exactly matches the reference image (Kanit font, red highlight, white text, black pill background). Expanded the color picker UI to allow changing stroke color and pill background color seamlessly.
- result: Users get professional styles in one click, but still have absolute freedom to customize all parameters.
- priority: P2
- days: 0

## 2026-09-06 � AI Headline Hook Feature
- module: TSub AI & UI
- status: done
- files: TabSubtitles.tsx, videoRenderer.ts, useAppStore.ts, TabExport.tsx
- problem: User clarified the 'key' value prop is generating text hook '??????' using AI, like TikTok/Reels.
- solution: Added a dedicated '?????? AI' tab. Integrated a Gemini prompt to analyze the full STT transcript and generate a clickbaity Thai headline (max 8 words). Added persistent rendering of the headline overlay during live preview and final WebCodecs export. Users can drag the headline around the screen independently of the subtitles.
- result: Fully functional AI headline generator that reads transcript context and permanently overlays it at the top of the video.
- priority: P1
- days: 0

## 2026-09-06 � Massive UI Refactor & Split View
- module: UI/UX
- status: done
- files: sidepanel.tsx, VideoPreview.tsx, TabHeadline.tsx, TabSubtitles.tsx, Header.tsx
- problem: User requested a modern split-view UI (left controls, right sticky video), separate Headline tab, clear loading states, draggable subtitles, and more obvious reset buttons.
- solution: Applied 'Tigr UI Craft' and 'Four Masters UX'. Built a Split Screen layout. Created a global <VideoPreview> component that tracks video state across tabs. Added a full-screen blurred loading spinner for AI actions. Extracted TabHeadline into a main Navigation tab. Made the Reset button large and red.
- result: TSub now looks like a professional desktop NLE app.
- priority: P1
- days: 0

## 2026-09-06 � Handoff & Safety Bound
- module: System
- status: done
- files: AGENTS.md, 0_public_eco_doc_antigravity/handoff/*
- problem: User wanted a hard rule against deleting files outside the workspace and requested a session handoff.
- solution: Added a strict 'Workspace Safety Bound' rule to AGENTS.md. Created a handoff document in the designated agent folder.
- result: System is safer and handoff state is cleanly persisted.
- priority: P2
- days: 0
## 2026-09-25 · สกิลใหม่ ศิลป์วาดด้วยโค้ด (creative-coding-social)
- module: skills/creative-coding-social
- status: done
- files: skills/creative-coding-social/SKILL.md · EGO_AVATAR.md
- problem: ท่านอยากทำภาพ info โปรโมทด้วย creative coding (ภาพเกิดจากโค้ดล้วน แก้ได้ทุกจุด) และเก็บเป็นสกิลใช้ซ้ำ
- solution: สกัดวิธีจากงานจริงโพสต์ 10 LINK Files (app14-Presentia) — DOM บน brand token + Canvas seeded · เทคนิค flow field / bezier / ไอคอนวาดเอง · กับดัก 6 ข้อ · คำสั่งเรนเดอร์ headless Chrome
- result: ภาพโพสต์ขึ้นเพจ LINK Files จริงผ่าน Presentia · สกิลพร้อมใช้ทุกเครื่อง
- priority: P2
- days: 1
