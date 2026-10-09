// แถบดูตัวอย่างในเบราว์เซอร์ (สกิล creative-coding-video)
// ใส่ท้ายหน้า: <script src="preview.js" data-dur="20"></script> · เปิดไฟล์ตรงๆ (ไม่มี ?t=) จะได้ Play/Pause · ↺ · แถบเวลาลากได้
// คีย์: Space เล่น/หยุด · ←/→ ทีละเฟรม (Shift = 1 วิ) · R เริ่มใหม่ · ตอนเรนเดอร์/probe มี ?t= แถบนี้จึงไม่โผล่ในวิดีโอ
// ponytail: ดูภาพอย่างเดียว ไม่เล่นเสียง (เสียงจริงฟังจาก mp4 ที่เรนเดอร์) · นาฬิกาตอนเล่นใช้ performance.now() ได้เพราะไม่ใช่ตอนเรนเดอร์
(() => {
  if (new URLSearchParams(location.search).has("t")) return;
  const DUR = Number(document.currentScript.dataset.dur || 15), FPS = 30;
  const bar = document.createElement("div");
  bar.style.cssText = "position:fixed;left:0;right:0;bottom:0;z-index:99999;display:flex;gap:10px;align-items:center;padding:10px 14px;background:rgba(0,0,0,.82);color:#fff;font:14px/1 system-ui,sans-serif";
  bar.innerHTML = '<button id="pv-play" style="font:inherit;padding:6px 12px">▶</button><button id="pv-re" style="font:inherit;padding:6px 10px">↺</button>' +
    `<input id="pv-t" type="range" min="0" max="${DUR}" step="${1 / FPS}" value="0" style="flex:1"><span id="pv-l" style="min-width:92px;text-align:right">0.00 / ${DUR}s</span>`;
  const $ = (id) => bar.querySelector("#" + id);
  let t = 0, playing = false, t0 = 0;
  const show = (x) => { t = Math.min(DUR, Math.max(0, x)); window.render(t); $("pv-t").value = t; $("pv-l").textContent = `${t.toFixed(2)} / ${DUR}s`; };
  const loop = () => { if (!playing) return; const x = (performance.now() - t0) / 1000; if (x >= DUR) { playing = false; $("pv-play").textContent = "▶"; show(DUR); return; } show(x); requestAnimationFrame(loop); };
  const toggle = () => { playing = !playing; $("pv-play").textContent = playing ? "⏸" : "▶"; if (playing) { if (t >= DUR) t = 0; t0 = performance.now() - t * 1000; loop(); } };
  $("pv-play").onclick = toggle;
  $("pv-re").onclick = () => { playing = false; $("pv-play").textContent = "▶"; show(0); };
  $("pv-t").oninput = (e) => { playing = false; $("pv-play").textContent = "▶"; show(Number(e.target.value)); };
  addEventListener("keydown", (e) => {
    if (e.code === "Space") { e.preventDefault(); toggle(); }
    else if (e.code === "KeyR") $("pv-re").onclick();
    else if (e.code === "ArrowRight" || e.code === "ArrowLeft") { playing = false; show(t + (e.code === "ArrowRight" ? 1 : -1) * (e.shiftKey ? 1 : 1 / FPS)); }
  });
  Promise.resolve(window.ready).then(() => { document.body.appendChild(bar); show(0); });
})();
