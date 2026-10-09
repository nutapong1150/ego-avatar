// motion.js: ตัวช่วยการเคลื่อนไหวที่ผลขึ้นกับ t อย่างเดียว ใช้ใน render(t) (สกิล motion-design-craft)
// ดัดแปลงจาก howseen-ai/claude-motion-design (MIT, Raphaël Aubry) · ทุกตัวเป็นสูตรปิด ไม่มี state ข้ามเฟรม
(() => {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, e) => a + (b - a) * e;
  // easing: ปลายทาง 0/1 ต้องเป๊ะ (ค่า 1e-9 ทำให้ guard `if (e > 0)` ทำงานก่อนเวลา)
  const ez = (f) => (x) => (x <= 0 ? 0 : x >= 1 ? 1 : f(x));
  const E = {
    io: ez((x) => (x < 0.5 ? 4 * x * x * x : 1 - (-2 * x + 2) ** 3 / 2)),
    out: ez((x) => 1 - (1 - x) ** 3),
    in: ez((x) => x * x * x),
    expo: ez((x) => 1 - 2 ** (-10 * x)),
  };
  // ช่วงเวลา → 0..1 (ผ่าน easing) เช่น seg(t, 1.2, 1.8, E.out)
  const seg = (t, a, b, ease = E.io) => ease(clamp((t - a) / (b - a)));

  // สปริงแบบสูตรปิด: ระยะที่ไปถึงเป้า (0→1) หลังเริ่ม dt วินาที · k = ความแข็ง, d = หน่วง (มวล 1)
  // preset: UI ฉับไว 320/30 · กล่อง/กล้อง 170/26 · ตัวหนังสือใหญ่/โลโก้ 120/24 · มาสคอต 180/12
  function spring(dt, k = 170, d = 26) {
    if (dt <= 0) return 0;
    const w0 = Math.sqrt(k), z = d / (2 * w0);
    if (z >= 1) return 1 - Math.exp(-w0 * dt) * (1 + w0 * dt);
    const wd = w0 * Math.sqrt(1 - z * z);
    return 1 - Math.exp(-z * w0 * dt) * (Math.cos(wd * dt) + (z * w0 / wd) * Math.sin(wd * dt));
  }
  // ค่าที่เปลี่ยนเป้าหลายครั้ง = ผลรวมสปริงทีละครั้ง · keys = [[เวลา, ค่าใหม่], …] (ตัวแรก = ค่าเริ่ม)
  const springTo = (t, keys, k, d) => keys.slice(1).reduce((v, [tk, to], i) => v + (to - keys[i][1]) * spring(t - tk, k, d), keys[0][1]);

  // กล้อง: keys = [[t, zoom, x, y], …] · zoom เดินใน log space (ซูม 1→4 ดูสม่ำเสมอ ไม่พุ่งตอนท้าย)
  function camera(t, keys, ease = E.io) {
    let i = keys.findIndex((k) => k[0] > t);
    if (i === -1) return keys.at(-1).slice(1);
    if (i === 0) return keys[0].slice(1);
    const [a, b] = [keys[i - 1], keys[i]], e = ease((t - a[0]) / (b[0] - a[0]));
    return [Math.exp(lerp(Math.log(a[1]), Math.log(b[1]), e)), lerp(a[2], b[2], e), lerp(a[3], b[3], e)];
  }

  // วงกลมท่วมจอ (flood) ต้องคลุมมุมที่ไกลที่สุด ไม่งั้นเห็นขอบโค้งค้างที่มุม
  const floodRadius = (x, y, W, H) => 1.05 * Math.max(Math.hypot(x, y), Math.hypot(W - x, y), Math.hypot(x, H - y), Math.hypot(W - x, H - y));

  // สุ่มแบบมี seed: ห้ามใช้ Math.random (เรนเดอร์ซ้ำต้องได้ภาพเดิมทุกพิกเซล)
  const rng = (seed) => () => {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let r = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };

  // ตัวหนังสือโผล่จากใต้หน้ากากทีละคำ: ค่า translateY(%) ของคำที่ i (ห่อคำด้วย overflow:hidden)
  // ไทยต้องเลื่อน 160% ไม่ใช่ 105%: สระบน/วรรณยุกต์ล้นกล่องตัวอักษร เลื่อนไม่พอจะเหลือเศษลอยในหน้ากาก
  const HIDE = 160;
  const wordRise = (t, start, i, gap = 0.055, dur = 0.5) => HIDE * (1 - E.out(clamp((t - start - i * gap) / dur)));
  // ทั้งบรรทัด: <div class="line" style="overflow:hidden;padding:.2em 0"><span class="w">คำ</span>…</div>
  // คำเข้าจากล่างที่ tin แล้วออกขึ้นบนที่ tout (ทิศเดียวกับช็อตถัดไป) · tout = Infinity = ค้าง
  function words(el, t, tin, tout = Infinity) {
    [...el.children].forEach((w, i) => {
      const y = wordRise(t, tin, i) - HIDE * E.in(clamp((t - tout - i * 0.03) / 0.3));
      w.style.transform = `translateY(${y}%) rotate(${(Math.abs(y) / HIDE) * 3}deg)`;
    });
  }

  // stop motion: ค่าสั่นเปลี่ยนแค่ fps ครั้ง/วิ (12 = ดูทำมือ) ขณะการเคลื่อนหลักยังลื่น 30fps · ใส่ให้ rotate/translate เล็กๆ
  const jitter = (t, seed = 1, amp = 1, fps = 12) => (rng(seed * 9973 + Math.floor(t * fps))() * 2 - 1) * amp;

  // ขอบกระดาษฉีก: สร้างครั้งเดียวต่อ seed แล้ว cache (สุ่มใหม่ทุกเฟรม = ขอบสั่นยุบยับ)
  // คืน { path: Path2D สำหรับ canvas, clip: 'polygon(…)' สำหรับ CSS clip-path ของ DOM }
  const _torn = new Map();
  function torn(w, h, seed = 1, rough = 6, step = 18) {
    const key = [w, h, seed, rough, step].join();
    if (_torn.has(key)) return _torn.get(key);
    const r = rng(seed), pts = [];
    const edge = (x0, y0, x1, y1) => {
      const n = Math.max(2, Math.round(Math.hypot(x1 - x0, y1 - y0) / step));
      for (let i = 0; i < n; i++) pts.push([x0 + ((x1 - x0) * i) / n + (r() - 0.5) * rough, y0 + ((y1 - y0) * i) / n + (r() - 0.5) * rough]);
    };
    edge(0, 0, w, 0); edge(w, 0, w, h); edge(w, h, 0, h); edge(0, h, 0, 0);
    const path = new Path2D(); pts.forEach(([x, y], i) => (i ? path.lineTo(x, y) : path.moveTo(x, y))); path.closePath();
    const clip = `polygon(${pts.map(([x, y]) => `${((x / w) * 100).toFixed(2)}% ${((y / h) * 100).toFixed(2)}%`).join(",")})`;
    const out = { path, clip }; _torn.set(key, out); return out;
  }

  window.M = { clamp, lerp, E, seg, spring, springTo, camera, floodRadius, rng, wordRise, words, jitter, torn };
})();
