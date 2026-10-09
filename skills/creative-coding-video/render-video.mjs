// เรนเดอร์วิดีโอจาก HTML ที่มี window.render(t) + window.ready — จับทีละเฟรมผ่าน Chrome DevTools แล้วต่อด้วย ffmpeg
// ใช้: node render-video.mjs <ไฟล์.html[?query]> <ไฟล์ออก.mp4> [วินาที=15] [fps=30] [กว้าง=1080] [สูง=1920]
// หน้าประกาศได้: window.SFX = [[วินาที, "ไฟล์เทียบกับหน้า", ความดัง]] · window.BGM = async () => WAV base64 · window.BGM_VOL
// ต้องมี ffmpeg บน PATH · Chrome ที่อื่นตั้ง env CHROME (สกิล creative-coding-video)
// motion blur: ค่าเริ่ม SUB=6 (ดราฟต์ใส่ SUB=1 เร็วกว่า 6 เท่า) → จับ 6 ซับเฟรม/เฟรม กระจายครึ่งเฟรม (ชัตเตอร์ 180°) แล้วเฉลี่ยด้วย tmix · window.CUTS = [วินาที] กันเบลอข้ามคัท (สกิล motion-design-craft)
// ponytail: ไม่ใช้ puppeteer — node 24 มี WebSocket ในตัว · เฟรมพักใน %TEMP% แล้วลบทิ้ง
import { spawn, spawnSync } from "node:child_process";
import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const [html, outFile, sec = "15", fps = "30", W = "1080", H = "1920"] = process.argv.slice(2);
if (!html || !outFile) { console.error("usage: node render-video.mjs page.html out.mp4 [sec] [fps] [w] [h]"); process.exit(2); }
const CHROME = process.env.CHROME ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9339, frames = Math.round(Number(sec) * Number(fps));
const work = mkdtempSync(join(tmpdir(), "vidframes-"));

const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PORT}`, "--hide-scrollbars", "--disable-gpu",
  `--window-size=${W},${H}`, `--user-data-dir=${join(work, "profile")}`, "about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

try {
  let target;
  for (let i = 0; i < 50 && !target; i++) {
    await sleep(200);
    target = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json()).then((l) => l.find((t) => t.type === "page")).catch(() => null);
  }
  if (!target) throw new Error("chrome devtools ไม่ตอบ");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
  let id = 0; const wait = new Map(), events = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && wait.has(d.id)) { wait.get(d.id)(d); wait.delete(d.id); } else events.push(d.method); };
  const send = (method, params = {}) => new Promise((r) => { const i = ++id; wait.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const evalJs = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.result?.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description ?? "eval error");
    return r.result?.result?.value;
  };

  await send("Page.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: +W, height: +H, deviceScaleFactor: 1, mobile: false });
  const [file, query] = html.split("?");  // "page.html?code=NUT20" → ส่ง query ต่อให้หน้า (เรนเดอร์รายคน)
  await send("Page.navigate", { url: pathToFileURL(resolve(file)).href + "?t=0" + (query ? `&${query}` : "") });
  for (let i = 0; i < 100 && !events.includes("Page.loadEventFired"); i++) await sleep(100);
  await evalJs("window.ready");
  // หน้าที่มี window.SFX = [[วินาที, "ไฟล์ (เทียบกับหน้า)", ความดัง], …] → ผสมเสียงตอน ffmpeg · ไม่มี = วิดีโอเงียบเหมือนเดิม
  const sfx = (await evalJs("window.SFX ?? null")) ?? [];
  // window.BGM = async () => WAV base64 (เพลงพื้นที่หน้าแต่งเอง) · ความดังจาก window.BGM_VOL (ค่าเริ่ม 0.5)
  const bgm = await evalJs("window.BGM ? window.BGM() : null");
  if (bgm) { writeFileSync(join(work, "bgm.wav"), Buffer.from(bgm, "base64")); sfx.push([0, join(work, "bgm.wav"), (await evalJs("window.BGM_VOL ?? 0.5"))]); }

  const SUB = Math.max(1, Number(process.env.SUB ?? 6)), cuts = (await evalJs("window.CUTS ?? []")) ?? [];
  const t0 = Date.now();
  let k = 0;
  for (let f = 0; f < frames; f++) {
    const tc = f / Number(fps);
    for (let j = 0; j < SUB; j++) {
      let t = Math.min(Number(sec) - 1e-3, Math.max(0, tc + ((j - (SUB - 1) / 2) * 0.5) / (Number(fps) * SUB)));
      for (const c of cuts) if ((t < c) !== (tc < c)) t = tc >= c ? c : c - 1e-4;  // ซับเฟรมอยู่ฝั่งเดียวกับกลางเฟรมเสมอ
      await evalJs(`render(${t})`);
      const shot = await send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: +W, height: +H, scale: 1 } });
      writeFileSync(join(work, `f${String(k++).padStart(5, "0")}.png`), Buffer.from(shot.result.data, "base64"));
    }
    if (f % 60 === 0) console.log(`frame ${f}/${frames}`);
  }
  console.log(`จับ ${frames} เฟรมใน ${((Date.now() - t0) / 1000).toFixed(1)} วิ`);
  ws.close();

  // H.264 yuv420p + faststart = เล่นได้ทุกแพลตฟอร์ม · เสียง = SFX ของหน้า (ถ้ามี) วางตามวินาทีด้วย adelay แล้ว amix
  // ponytail: 1 เสียง = 1 input · หลักร้อยเสียงค่อยรวมเป็น asplit ต่อไฟล์
  const audioIn = sfx.flatMap(([, f]) => ["-i", resolve(dirname(resolve(file)), f)]);
  const mix = sfx.map(([t, , v = 1], i) => `[${i + 1}:a]adelay=${Math.round(t * 1000)}:all=1,volume=${v}[s${i}]`).join(";");
  const audioArgs = sfx.length
    ? ["-filter_complex", `${mix};${sfx.map((_, i) => `[s${i}]`).join("")}amix=inputs=${sfx.length}:normalize=0,alimiter=limit=0.9,apad[a]`,
       "-map", "0:v", "-map", "[a]", "-c:a", "aac", "-b:a", "192k", "-t", sec]
    : [];
  const blur = SUB > 1 ? ["-vf", `tmix=frames=${SUB},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/${fps}/TB`, "-r", fps] : [];
  const ff = spawnSync("ffmpeg", ["-y", "-loglevel", "error", "-framerate", String(Number(fps) * SUB), "-i", join(work, "f%05d.png"), ...audioIn, ...audioArgs, ...blur,
    "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-preset", "slow", "-movflags", "+faststart", resolve(outFile)], { stdio: "inherit" });
  if (ff.status !== 0) throw new Error("ffmpeg ล้ม");
  console.log("ok →", resolve(outFile));
} finally {
  chrome.kill();
  await sleep(500);
  rmSync(work, { recursive: true, force: true });
}
