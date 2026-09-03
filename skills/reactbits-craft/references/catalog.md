# React Bits — Catalog (ณ 2026-09)

รายชื่อจริงจาก repo `DavidHDev/react-bits` (`src/ts-tailwind/*`) ทุกตัวมี 4 variant: `JS-CSS` `JS-TW` `TS-CSS` `TS-TW`
ติดตั้ง: `npx shadcn@latest add @react-bits/<Name>-<VARIANT>`

น้ำหนักโดยประมาณ: 🟢 CSS/JS เบา · 🟡 ใช้ GSAP/motion · 🔴 WebGL/3D (three/ogl) — 🔴 ได้ **1 ตัวต่อทั้งเว็บ** และต้องมี fallback

---

## TextAnimations (31)

`ASCIIText` `BlurText` `CircularText` `CountUp` `CurvedLoop` `DecryptedText` `DepthText` `EchoText` `FallingText` `FoldText` `FuzzyText` `GlitchText` `GradientText` `MaskedHeading` `ParticleText` `RotatingText` `ScrambledText` `ScrollFloat` `ScrollReveal` `ScrollVelocity` `ShinyText` `Shuffle` `SplitFlapText` `SplitText` `StrokeText` `TextCursor` `TextLoop` `TextPressure` `TextType` `TrueFocus` `VariableProximity` `WarpText`

**ปลอดภัยกับ headline จริง (เข้าครั้งเดียว จบ):** `SplitText` `BlurText` `ShinyText` `GradientText` `ScrollFloat` `ScrollReveal` `MaskedHeading`
**ใช้กับตัวเลข/สถิติ:** `CountUp`
**เอฟเฟกต์เยอะ ใช้กับ hero เดียวเท่านั้น อย่าใช้กับ body copy:** `TextType` `DecryptedText` `ScrambledText` `GlitchText` `FuzzyText` `RotatingText` `SplitFlapText` `TextPressure` `WarpText` `ASCIIText` 🔴 `ParticleText` 🔴 `DepthText`
**ห้ามใช้กับข้อความที่ต้องอ่านเพื่อตัดสินใจซื้อ:** `FallingText` `ScrollVelocity` `CurvedLoop` `TextLoop` `EchoText` `TrueFocus` `VariableProximity` — พวกนี้เป็น decoration ไม่ใช่ typography

> เตือน: `TextType`/`DecryptedText` บน headline = LCP ช้าและ screen reader อ่านสะดุด ถ้าจะใช้ ให้ใส่ข้อความจริงใน DOM แล้ว animate ทับ + `aria-label`

## Animations (37)

`AnimatedContent` `Antigravity` `BlobCursor` `ClickSpark` `Crosshair` `Cubes` `CursorGrid` `ElasticMesh` `ElectricBorder` `FadeContent` `GhostCursor` `GlareHover` `GlowCursor` `GradualBlur` `HalftoneReveal` `ImageTrail` `LaserFlow` `LogoLoop` `MagicRings` `Magnet` `MagnetLines` `MetaBalls` `MetallicPaint` `Noise` `OrbitImages` `PixelSwap` `PixelTrail` `PixelTransition` `Ribbons` `RippleDistortion` `ScrollExpand` `ShapeBlur` `SplashCursor` `StarBorder` `StickerPeel` `Strands` `SwarmCursor` `TargetCursor`

**wrapper ที่ควรใช้บ่อยที่สุด (เบา ใช้ซ้ำได้ทั้งหน้า):** `AnimatedContent` `FadeContent` `ScrollExpand` `GradualBlur`
**ขอบ/ปุ่มเน้น 1 จุด:** `StarBorder` `ElectricBorder` `GlareHover` `Magnet`
**โลโก้ลูกค้า / social proof:** `LogoLoop`
**cursor — desktop only, ทั้งเว็บเลือกได้ 1:** `SplashCursor` 🔴 `BlobCursor` `GhostCursor` `GlowCursor` `SwarmCursor` `TargetCursor` `CursorGrid` `Crosshair` `PixelTrail` `ImageTrail`
**หนัก คิดให้ดีก่อนใช้:** 🔴 `LaserFlow` `MetaBalls` `Ribbons` `Strands` `ElasticMesh` `MetallicPaint` `RippleDistortion` `ShapeBlur` `Antigravity` `Cubes` `OrbitImages`

## Components (43)

`AccordionGallery` `AnimatedList` `BorderGlow` `BounceCards` `BubbleMenu` `CardNav` `CardSwap` `Carousel` `ChromaGrid` `CircularGallery` `Counter` `CurvedInput` `DecayCard` `DepthCarousel` `Dock` `DomeGallery` `DriftWall` `ElasticSlider` `FlowingMenu` `FluidGlass` `FlyingPosters` `Folder` `GlassIcons` `GlassSurface` `GooeyNav` `InfiniteMenu` `InfiniteSpiral` `Lanyard` `LineSidebar` `MagicBento` `Masonry` `ModelViewer` `MorphSlider` `OptionWheel` `PillNav` `PixelCard` `ProfileCard` `ReflectiveCard` `ScrollStack` `SpecularButton` `SpotlightCard` `Stack` `StaggeredMenu` `Stepper` `TiltedCard`

**การ์ดฟีเจอร์/ราคา:** `SpotlightCard` `PixelCard` `TiltedCard` `MagicBento` `BorderGlow` `ChromaGrid` `ReflectiveCard`
**nav/menu:** `PillNav` `CardNav` `GooeyNav` `StaggeredMenu` `BubbleMenu` `FlowingMenu` `Dock` `LineSidebar`
**แกลเลอรี/ผลงาน:** `Masonry` `Carousel` `CircularGallery` `ScrollStack` `AccordionGallery` `BounceCards` `Stack` `CardSwap`
**form/interaction จริง:** `Stepper` `ElasticSlider` `Counter` `AnimatedList` `OptionWheel` — ตรวจ keyboard + label ให้ครบก่อนใช้แทน input มาตรฐาน
**เอฟเฟกต์จัด ใช้เป็นตัวเด่นตัวเดียว:** 🔴 `FluidGlass` `Lanyard` `ModelViewer` `DomeGallery` `InfiniteMenu` `InfiniteSpiral` `FlyingPosters` `DepthCarousel` `MorphSlider` `DriftWall` `DecayCard`

> `GlassSurface`/`GlassIcons`/`SpecularButton` = สาย glassmorphism เข้ากับ `tigr-ui-craft` แต่ระวังคอนทราสต์ข้อความบนกระจก

## Backgrounds (55) — เลือกได้ **1 ตัวต่อหน้า**

`AcidSquares` `AeroShards` `Aurora` `Balatro` `Ballpit` `Beams` `CRTWarp` `ColorBends` `DarkVeil` `Dither` `DotField` `DotGrid` `EvilEye` `FaultyTerminal` `Ferrofluid` `FloatingLines` `Galaxy` `GhostFibers` `GradientBlinds` `GradientWaves` `Grainient` `GridDistortion` `GridMotion` `GridScan` `Hyperspeed` `Iridescence` `LetterGlitch` `LightPillar` `LightRays` `LightTunnel` `Lightfall` `Lightning` `LineWaves` `LiquidChrome` `LiquidEther` `MoltenMetal` `Orb` `Particles` `PixelBlast` `PixelSnow` `Plasma` `PlasmaWave` `Prism` `PrismaticBurst` `Radar` `RippleGrid` `Scanner` `ShapeGrid` `SideRays` `Silk` `SlicedWaves` `SoftAurora` `Threads` `Topography` `Waves` `WebThreads`

**อ่านข้อความทับได้สบาย (เลือกกลุ่มนี้ก่อนเสมอ):** `Aurora` `SoftAurora` `Silk` `Threads` `Beams` `DotGrid` `DotField` `Grainient` `Topography` `FloatingLines` `LineWaves` `GradientWaves`
**มีคาแรกเตอร์แรง ต้องมี overlay ทับก่อนวางข้อความ:** `Galaxy` `Particles` `LightRays` `Lightning` `Plasma` `Prism` `Iridescence` `LiquidEther` `LiquidChrome` `Waves` `RippleGrid` `Orb` `DarkVeil`
**เฉพาะทาง (tech/retro/game):** `FaultyTerminal` `LetterGlitch` `CRTWarp` `Scanner` `Radar` `GridScan` `Dither` `PixelBlast` `Balatro` `Hyperspeed` `Ballpit`

Backgrounds เกือบทั้งหมดเป็น 🔴 WebGL → `ssr:false` + gate ด้วย `useHeavyFx()` + ลด `speed`/`amplitude`/particle count ลงครึ่งจาก default เสมอ

---

## เช็คก่อนแปะทุกครั้ง

1. หน้านี้มี background/accent อะไรอยู่แล้วบ้าง? เกินงบหรือยัง
2. ตัวนี้ทำให้คนเห็น "สิ่งที่ควรเห็น" ชัดขึ้น หรือแค่ทำให้หน้าดูวุ่น
3. มันลากไลบรารีใหม่เข้ามาไหม คุ้มไหม
4. บนมือถือมันกลายเป็นอะไร (ต้องตอบได้ก่อนติดตั้ง)
5. ข้อความบนมันยังคอนทราสต์ผ่าน 4.5:1 ไหม
