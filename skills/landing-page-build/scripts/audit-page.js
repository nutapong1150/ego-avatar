/**
 * audit-page.js — ชุดตรวจหน้า landing รอบเดียวจบ
 *
 * วิธีใช้: วางทั้งไฟล์ลง javascript_tool (หรือ console ของเบราว์เซอร์) แล้วดูผล
 *   auditPage()                       // ตรวจทั้งหน้าด้วยค่าเริ่มต้น
 *   auditPage({ root: '.lp' })        // จำกัดขอบเขต
 *   auditPage({ figures: '.fig .m', text: '.desc,.warn,h2,p,li' })
 *
 * ทำไมต้องมีไฟล์นี้: การตรวจด้วยตาไม่เห็นปัญหาที่ทำให้หน้าพังจริง — ล้นขอบ 3px,
 * คำโดดบรรทัดเดียว, รูปทับตัวอักษร · และที่สำคัญคือ *กล่องของ element ไม่ใช่ตัวอักษรจริง*
 * ย่อหน้าเป็น block กว้างเต็มคอลัมน์เสมอ ต่อให้บรรทัดสุดท้ายมีคำเดียว จึงต้องวัดด้วย
 * Range.getClientRects() ซึ่งคืนกล่องของแต่ละ "บรรทัด" จริง
 */
function auditPage(opts = {}) {
  const {
    root = 'body',
    figures = 'img',
    text = 'h1,h2,h3,h4,p,li,td,th',
    orphanRatio = 0.25,   // บรรทัดสุดท้ายสั้นกว่าบรรทัดยาวสุดเท่านี้ = คำโดด
    alignTolerance = 2,   // px
  } = opts;

  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const scope = $(root) || document.body;
  const hit = (a, b) => !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);

  // กล่องของแต่ละบรรทัดจริง ไม่ใช่กล่อง element
  const lineRects = el => {
    const r = document.createRange();
    r.selectNodeContents(el);
    return [...r.getClientRects()].filter(x => x.width > 0 && x.height > 0);
  };

  const label = el => (el.id && '#' + el.id) || (typeof el.className === 'string' && el.className.trim().split(/\s+/)[0] ? '.' + el.className.trim().split(/\s+/)[0] : el.tagName.toLowerCase());

  // 1) ล้นแนวนอน — และหาตัวการให้ด้วย ไม่ใช่แค่บอกว่าล้น
  const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  const culprits = [];
  if (overflow > 0) {
    scope.querySelectorAll('*').forEach(n => {
      const b = n.getBoundingClientRect();
      if (b.width && b.right > innerWidth + 1) culprits.push({ el: label(n), right: Math.round(b.right), over: Math.round(b.right - innerWidth) });
    });
    culprits.sort((a, b) => b.over - a.over);
  }

  // 2) รูปทับตัวอักษรจริงไหม
  const textEls = [...scope.querySelectorAll(text)].filter(el => el.textContent.trim());
  const collisions = [];
  scope.querySelectorAll(figures).forEach(fig => {
    const fr = fig.getBoundingClientRect();
    if (!fr.width || !fr.height) return;
    for (const el of textEls) {
      if (fig.contains(el) || el.contains(fig)) continue;
      for (const lr of lineRects(el)) {
        if (hit(fr, lr)) {
          collisions.push({ figure: fig.getAttribute('src')?.split('/').pop() || label(fig), over: label(el), overlapPx: Math.round(Math.min(lr.right, fr.right) - Math.max(lr.left, fr.left)) });
          break;
        }
      }
    }
  });

  // 3) คำโดดบรรทัดเดียว
  const orphans = [];
  for (const el of textEls) {
    const rects = lineRects(el);
    if (rects.length < 2) continue;
    const widest = Math.max(...rects.map(x => x.width));
    const last = rects[rects.length - 1];
    if (last.width < widest * orphanRatio) {
      orphans.push({ el: label(el), lines: rects.length, lastLine: Math.round(last.width), widest: Math.round(widest), tail: el.textContent.trim().slice(-24) });
    }
  }

  // 4) รูปโหลดไม่ขึ้น
  const brokenImages = $$('img').filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src'));

  // 5) ขนาดรูปในชุดเดียวกัน — ต่างกันมากมักแปลว่าสั่งผิดมิติ
  const figSizes = scope.querySelectorAll(figures).length
    ? [...scope.querySelectorAll(figures)].map(f => { const b = f.getBoundingClientRect(); return { src: f.getAttribute('src')?.split('/').pop() || label(f), w: Math.round(b.width), h: Math.round(b.height) }; })
    : [];
  const heights = [...new Set(figSizes.map(f => f.h))];

  const pageHeight = document.documentElement.scrollHeight;

  return {
    viewport: `${innerWidth}x${innerHeight}`,
    pageHeight,
    screensToScroll: +(pageHeight / innerHeight).toFixed(1),
    pageTooLong: pageHeight / innerHeight > 10,

    horizontalOverflow: overflow,
    overflowCulprits: culprits.slice(0, 5),

    textOverlappedByFigures: collisions,
    orphanLines: orphans,
    brokenImages,

    figureSizes: figSizes,
    figureHeightsVary: heights.length > 1 ? heights : false,

    /** เรียกเองเมื่ออยากเช็คว่าของหลายชิ้นอยู่ระดับเดียวกันไหม */
    checkAligned: (sel, axis = 'top') => {
      const vals = $$(sel).map(el => Math.round(el.getBoundingClientRect()[axis]));
      const spread = Math.max(...vals) - Math.min(...vals);
      return { sel, axis, values: vals, spread, aligned: spread <= alignTolerance };
    },

    get verdict() {
      const fails = [];
      if (overflow > 0) fails.push(`ล้นแนวนอน ${overflow}px`);
      if (collisions.length) fails.push(`รูปทับตัวอักษร ${collisions.length} จุด`);
      if (orphans.length) fails.push(`คำโดดบรรทัดเดียว ${orphans.length} จุด`);
      if (brokenImages.length) fails.push(`รูปพัง ${brokenImages.length} ใบ`);
      return fails.length ? '❌ ' + fails.join(' · ') : '✅ ผ่านทุกข้อ';
    },
  };
}

auditPage();
