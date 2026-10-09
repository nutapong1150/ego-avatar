// ตรวจวิดีโอหาเฟรมกระตุก (pop) · แฟลช 1 เฟรม · รอยต่อลูป  (สกิล motion-design-craft)
// ใช้: node motion-qa.mjs <video.mp4> [fps=30] [loop]      · remake: pops ของคลิปต้นฉบับ = รายการคัทแข็ง
//      node motion-qa.mjs peaks sfx/a.mp3 sfx/b.mp3 …     → วินาทีที่ดังสุดของแต่ละไฟล์ (ใช้วาง SFX ตาม peak)
// ponytail: ย่อเป็นภาพเทา 180×180 ผ่าน ffmpeg แล้วเทียบค่าเฉลี่ยต่างกัน · ไม่ต้องลง Python/numpy
import { spawnSync } from "node:child_process";

if (process.argv[2] === "peaks") {
  for (const f of process.argv.slice(3)) {
    const b = spawnSync("ffmpeg", ["-v", "quiet", "-i", f, "-ac", "1", "-ar", "48000", "-f", "f32le", "-"], { maxBuffer: 1 << 28 }).stdout;
    const x = new Float32Array(new Uint8Array(b).buffer, 0, b.length >> 2);  // คัดลอกก่อน: Buffer อาจไม่ตรง alignment 4 ไบต์
    let k = 0; for (let i = 1; i < x.length; i++) if (Math.abs(x[i]) > Math.abs(x[k])) k = i;
    console.log(`"${f.split(/[\\/]/).pop().replace(/\.\w+$/, "")}": ${(k / 48000).toFixed(3)},  // ยาว ${(x.length / 48000).toFixed(2)} วิ`);
  }
  process.exit(0);
}
const [file, fps = "30", mode] = process.argv.slice(2);
if (!file) { console.error("usage: node motion-qa.mjs video.mp4 [fps] [loop]"); process.exit(2); }
const S = 180, N = S * S;
const raw = spawnSync("ffmpeg", ["-v", "quiet", "-i", file, "-vf", `scale=${S}:${S},format=gray`, "-f", "rawvideo", "-"], { maxBuffer: 1 << 30 }).stdout;
const n = Math.floor(raw.length / N), fr = (i) => raw.subarray(i * N, (i + 1) * N);
const diff = (a, b) => { let s = 0; for (let i = 0; i < N; i++) s += Math.abs(a[i] - b[i]); return s / N; };
const d = Array.from({ length: n - 1 }, (_, i) => diff(fr(i), fr(i + 1)));
const sec = (i) => (i / Number(fps)).toFixed(3);

// pop: การเปลี่ยนระหว่างเฟรมที่โดดกว่าเพื่อนบ้าน 3 เท่า (คัทตั้งใจก็โผล่ด้วย ให้บอกท่าน อย่าซ่อน)
const pops = [];
for (let i = 1; i < d.length - 1; i++) { const nb = Math.max(d[i - 1], d[i + 1], 0.3); if (d[i] > 3 * nb && d[i] > 2) pops.push(`frame ${i + 1} t=${sec(i + 1)} diff ${d[i].toFixed(2)} (ข้างๆ ${nb.toFixed(2)})`); }
console.log(`pops: ${pops.length}`); pops.forEach((p) => console.log("  " + p));

// แฟลช 1 เฟรม: เฟรม n ต่างจากทั้งสองข้าง ขณะที่ n-1 กับ n+1 หน้าตาเหมือนกัน
const flashes = [];
for (let i = 1; i < n - 1; i++) { const m = Math.min(d[i - 1], d[i]), skip = diff(fr(i - 1), fr(i + 1)); if (m > 2 && skip < 0.35 * m) flashes.push(`frame ${i} t=${sec(i)} diff ${m.toFixed(2)} (n-1 vs n+1 ${skip.toFixed(2)})`); }
console.log(`one-frame flashes: ${flashes.length}`); flashes.forEach((f) => console.log("  " + f));

// ลูป: ต้องตรงทั้งตำแหน่ง (เฟรมท้าย ≈ เฟรม 0) และความเร็ว (การเคลื่อนเข้าเฟรม 0 ≈ ออกจากเฟรม 0)
if (mode === "loop") {
  const med = [...d].sort((a, b) => a - b)[d.length >> 1] || 0.3, seam = diff(fr(n - 1), fr(0));
  const vin = d.at(-1), vout = d[0];
  console.log(`seam ${seam.toFixed(2)} (median step ${med.toFixed(2)}) → ${seam <= 2 * med ? "OK" : "JUMP: แก้ตำแหน่งที่ t=0/T"}`);
  console.log(`velocity in ${vin.toFixed(2)} / out ${vout.toFixed(2)} → ${Math.abs(vin - vout) <= Math.max(1, 0.5 * Math.max(vin, vout)) ? "OK" : "SPEED BREAK: เติมหางสปริงของรอบก่อน"}`);
}
