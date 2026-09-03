---
name: reactbits-craft
description: ใช้เมื่อจะเพิ่ม/ปรับ motion กับลูกเล่นภาพบน UI ของระบบหรือ landing page ด้วย React Bits (reactbits.dev) — เลือกคอมโพเนนต์ให้ตรงเจตนา คุมงบ motion ไม่ให้หน้าเว็บหนัก ปรับผ่าน props ตาม design token เดิม ทำ fallback บนมือถือ/prefers-reduced-motion แล้ววัดผลจริง. Trigger: "หน้ามันนิ่งไป", "ใส่ background animated", "hero ให้ว้าวกว่านี้", "ใส่ text effect", "ปรับ UX/UI ให้ดูแพงขึ้น", "เอา React Bits มาใช้", หรือกำลังจะแปะ animated component ลงหน้าที่มีอยู่แล้ว.
---

# React Bits Craft

React Bits = คลัง animated React component ~165 ตัว (4 หมวด: TextAnimations / Animations / Components / Backgrounds) แจกเป็น **source code copy-paste ไม่ใช่ npm library** ทุกตัวมี 4 variant: `JS-CSS` `JS-TW` `TS-CSS` `TS-TW`

สกิลนี้คุม **ชั้น motion/visual effect** เท่านั้น — layout, hierarchy, copy, conversion เป็นงานของ `landing-page-craft` / `gridgeist` / `hallmark` / `tigr-ui-craft` ทำโครงให้เสร็จก่อน แล้วค่อยมาชั้นนี้ **ห้ามใช้ effect กลบโครงที่ยังไม่ดี**

## ลำดับงาน (ห้ามข้าม)

```
[1] อ่าน stack        → variant ที่ถูกต้อง (TS-TW / JS-CSS / ...)
        ↓
[2] ตั้งงบ motion     → 1 background + ≤2 accent ต่อหน้า (ดู "Motion budget")
        ↓
[3] เลือก component   → จากเจตนา ไม่ใช่จากความสวย (ดู references/catalog.md)
        ↓
[4] ติดตั้ง 1 ตัว     → shadcn/jsrepo/copy → ผูก token แบรนด์เข้า props
        ↓
[5] วัด               → bundle / FPS / LCP / reduced-motion / keyboard
        ↓
[6] ผ่าน? → กลับ [3] ตัวถัดไป   ไม่ผ่าน? → ถอดออก อย่าเก็บไว้ "แก้ทีหลัง"
```

## [1] อ่าน stack ก่อนเสมอ

ตรวจจากไฟล์จริง อย่าเดา:

| ดู | ได้อะไร |
|---|---|
| `tsconfig.json` มีไหม | TS หรือ JS |
| `tailwind.config.*` / `@import "tailwindcss"` ใน css | TW หรือ CSS |
| `package.json` | มี `gsap` / `motion` / `three` / `ogl` อยู่แล้วหรือยัง |
| ไฟล์ token (`globals.css`, `theme.ts`, `brand.md`) | สีและ radius ที่ต้องส่งเข้า props |

ได้ variant แล้วจึงหยิบโค้ด เช่น `TS-TW` → `npx shadcn@latest add @react-bits/BlurText-TS-TW`

**ถ้าโปรเจกต์ไม่ใช่ React** (Next.js server component ล้วน, Vue, Svelte, Blade, HTML) → React Bits ใช้ไม่ได้ตรงๆ บอกท่านตรงๆ แล้วเสนอทางอื่น (CSS animation เอง / `@keyframes` / Motion One) อย่าฝืนแปะ

## [2] Motion budget — กฎแข็ง

ต่อ 1 หน้า:

- **≤ 1 background effect** และมันต้องอยู่ที่ hero เท่านั้น
- **≤ 2 accent effect** (text animation / hover / cursor / card) นอกเหนือจาก background
- **1 หน้า = 1 ตัวเด่น** ที่เหลือเป็นตัวรอง ถ้าทุกอย่างเด่น = ไม่มีอะไรเด่น
- section ใต้ fold ใช้ได้เฉพาะ **scroll-triggered แบบ run ครั้งเดียว** (`AnimatedContent`, `ScrollReveal`, `FadeContent`) ไม่ใช่ loop ตลอดเวลา
- **ห้ามใส่ effect บนเส้นทาง conversion**: ปุ่ม CTA, ฟอร์ม, ช่องกรอก, error message ต้องนิ่ง อ่านง่าย กดได้ทันที
- **ห้าม animate ข้อความ LCP แบบหน่วงการมองเห็น** — headline hero ถ้าใช้ `SplitText`/`TextType` ต้องเห็นข้อความจริงตั้งแต่เฟรมแรก (opacity เริ่ม ≠ 0 หรือ delay ≤ 100ms) ไม่งั้น LCP พัง + SEO เสีย
- **WebGL/3D (Backgrounds ส่วนใหญ่, ModelViewer, Lanyard, FluidGlass) = 1 ตัวต่อทั้งเว็บ** ห้ามซ้อนสอง canvas
- cursor effect (`SplashCursor`, `BlobCursor`, `TargetCursor`, ...) → **desktop only** และเลือกได้แค่ตัวเดียวทั้งเว็บ

เกินงบ = ตัดของเดิมออกก่อน ไม่ใช่ขอเพิ่มงบ

## [3] เลือกจากเจตนา

| ท่านอยากได้ | หยิบจาก | ตัวอย่าง |
|---|---|---|
| hero มีบรรยากาศ ไม่รบกวนข้อความ | Backgrounds (นิ่ง/ช้า) | `Aurora` `Silk` `Threads` `Beams` `DotGrid` |
| hero แนว tech/hacker | Backgrounds | `FaultyTerminal` `LetterGlitch` `Particles` `Lightning` |
| headline มีจังหวะ | TextAnimations (เข้าครั้งเดียว) | `SplitText` `BlurText` `ShinyText` `GradientText` |
| ตัวเลข/สถิติน่าเชื่อ | TextAnimations | `CountUp` |
| section เข้าเมื่อเลื่อนถึง | Animations | `AnimatedContent` `FadeContent` `ScrollReveal` |
| การ์ดฟีเจอร์/ราคา มีชีวิต | Components | `SpotlightCard` `TiltedCard` `MagicBento` `PixelCard` |
| เมนู/nav ต่างจากชาวบ้าน | Components | `PillNav` `CardNav` `GooeyNav` `StaggeredMenu` |
| โชว์ portfolio/ผลงาน | Components | `Masonry` `Carousel` `CircularGallery` `ScrollStack` |
| โลโก้ลูกค้าไหลผ่าน | Animations | `LogoLoop` |
| ปุ่ม/ขอบเรียกสายตา 1 จุด | Animations | `StarBorder` `ElectricBorder` `GlareHover` |

รายชื่อครบทุกตัว + ข้อควรระวังรายตัว → [catalog.md](references/catalog.md)

**เกณฑ์ตัดสิน:** effect นี้ตอบคำถามอะไรให้ผู้ใช้? ถ้าตอบไม่ได้นอกจาก "มันสวยดี" → ไม่ใส่

## [4] ติดตั้ง + ปรับผ่าน props

```bash
npx shadcn@latest add @react-bits/<Component>-<VARIANT>
```
เช่น `@react-bits/Aurora-TS-TW` · ทางเลือก: `jsrepo` หรือ copy จากหน้าเว็บคอมโพเนนต์นั้นตรงๆ

โค้ดที่ได้ **เป็นของโปรเจกต์แล้ว** แก้ไฟล์ได้เต็มที่ ไม่มี lock-in และไม่ต้องรอ upstream

หลังติดตั้ง:

1. **เช็ค peer dep ที่มันลากมา** (`gsap`, `motion`, `three`, `ogl`, `matter-js`) — ถ้าใช้ตัวเดียวเพื่อ effect เดียวและมันหนัก ให้ชั่งใจก่อนว่าคุ้มไหม
2. **ปรับผ่าน props ก่อนเสมอ** — ห้ามเขียน CSS override ทับจากข้างนอก ห้าม fork logic ถ้า prop ทำได้อยู่แล้ว
3. **ส่งสีจาก token แบรนด์เข้า props** อย่าใช้สี default ของ demo (สี demo ของ React Bits คือสาเหตุที่หลายเว็บดูเหมือนกันหมด)
4. **ลดค่าลง 30–50% จาก default** — speed, amplitude, particle count, blur ค่า demo ทำมาให้เด่นบนหน้าโชว์ ไม่ใช่ให้ใช้จริง
5. แก้ชื่อไฟล์/โฟลเดอร์ให้เข้ากับ convention ของ repo (`components/ui/` หรืออื่นๆ ตามที่มีอยู่)

## [5] Mobile & reduced-motion (บังคับ ไม่ใช่ nice-to-have)

WebGL background + cursor effect บนมือถือ = แบตหมด เครื่องร้อน scroll กระตุก **ต้องมี static fallback เสมอ**

```tsx
// ponytail: gate ครั้งเดียวใช้ซ้ำได้ทั้งเว็บ
const useHeavyFx = () => {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)');
    const on = () => setOk(mq.matches);
    on(); mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return ok;
};

// hero
{useHeavyFx() ? <Aurora colorStops={brand} speed={0.5} /> : <div className="hero-static-gradient" />}
```

กฎ:
- render ฝั่ง client เท่านั้น (`ssr: false` / dynamic import) — WebGL พัง SSR
- fallback ต้อง **สวยด้วยตัวเอง** (gradient/ภาพนิ่งที่ตั้งใจ) ไม่ใช่พื้นดำเปล่า
- text animation ที่ delay การอ่าน → ปิดเมื่อ reduced-motion เหลือข้อความธรรมดา
- lazy-load effect ใต้ fold ด้วย `IntersectionObserver` อย่าโหลดพร้อมหน้า

## [6] วัดจริงก่อนบอกว่าเสร็จ

- [ ] `npm run build` — bundle เพิ่มขึ้นเท่าไหร่? เกิน ~50KB gz ต่อ 1 effect = ตอบให้ได้ว่าคุ้มยังไง
- [ ] DevTools Performance บน CPU throttle 4x — FPS ตอน scroll ยัง ≥ 50 ไหม
- [ ] LCP ไม่แย่ลง / CLS = 0 (effect ต้องไม่ดัน layout)
- [ ] เปิด reduced-motion แล้วหน้ายังใช้งานครบ อ่านออก
- [ ] มือถือจริง (ไม่ใช่แค่ resize browser) — ไม่ร้อน ไม่กระตุก
- [ ] keyboard tab ผ่านได้ / คอนทราสต์ข้อความบน background ยัง ≥ 4.5:1
- [ ] ปิด JS แล้วเนื้อหายังอยู่ (สำคัญกับ landing page)

ข้อไหนไม่ผ่าน → ถอด effect นั้นออก อย่าปล่อยผ่านด้วยคำว่า "เดี๋ยวค่อยจูน"

## Anti-slop

- ห้ามซ้อน background 2 ชั้น, ห้าม glow ทุกการ์ด, ห้าม gradient text ทุกหัวข้อ
- ห้ามใช้สี default ของ demo
- ห้ามใส่ effect เพราะ "มีให้ใช้" — ใส่เพราะมันชี้สายตาไปที่สิ่งที่ควรเห็น
- ห้ามให้ effect เป็นเหตุผลที่หน้าโหลดช้ากว่าคู่แข่ง

## หมายเหตุ

- License: MIT + **Commons Clause** — ใช้ในโปรดักต์ได้ แต่ห้ามเอาตัวคลังไปขายต่อเป็นสินค้า
- Tools ฟรีบน reactbits.dev: Background Studio (จูน background แล้ว export code/วิดีโอ), Shape Magic, Texture Lab — ใช้จูนก่อนแล้วค่อยเอาค่าที่ได้มาใส่ props จะเร็วกว่านั่งเดา
- MCP server ของ React Bits ที่มีอยู่เป็น **ของบุคคลที่สาม** (`reactbits-dev-mcp-server` บน npm) ไม่ใช่ official — ไม่จำเป็นต้องใช้ สกิลนี้ + `shadcn add` ทำงานได้ครบโดยไม่ต้องต่อ MCP
