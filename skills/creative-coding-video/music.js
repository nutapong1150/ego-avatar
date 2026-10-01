// เพลงพื้นแต่งด้วยโค้ด (Web Audio · OfflineAudioContext) — ไม่มีไฟล์ภายนอก ไม่ติดลิขสิทธิ์ ไม่ใช้ HeyGen
// หน้าวิดีโอประกาศ window.BGM = () => music.render({...}) → render-video.mjs เรียก ได้ WAV (base64) ไปผสมกับภาพ + SFX
// 96 BPM = 0.625 วิ/จังหวะ · คอร์ด Am7 → Fmaj7 → Cadd9 → G6 ละ 2 ห้อง · ผลเหมือนเดิมทุกครั้ง (noise ใช้ seed)
// ponytail: synth 4 ชิ้น (pad · เบส · กลอง · ไฮแฮต) พอสำหรับเพลงพื้นคลิป 30 วิ · อยากได้เพลงจริงค่อยเปลี่ยนเป็นไฟล์
const music = (() => {
  const BPM = 96, B = 60 / BPM, BAR = 4 * B, SR = 44100;
  const hz = (m) => 440 * 2 ** ((m - 69) / 12);
  const CHORDS = [[57, 60, 64, 67], [53, 57, 60, 64], [48, 52, 55, 62], [55, 59, 62, 64]];
  const ROOTS = [45, 41, 36, 43];
  const on = (ranges, t) => ranges.some(([a, b]) => t >= a && t < b);

  function noise(ctx) {
    const buf = ctx.createBuffer(1, SR, SR), d = buf.getChannelData(0);
    let s = 7;
    for (let i = 0; i < d.length; i++) { s = (s * 16807) % 2147483647; d[i] = (s / 2147483647) * 2 - 1; }
    return buf;
  }
  function env(g, t, peak, a, len, r) {
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(peak, t + a);
    g.gain.setValueAtTime(peak, t + len);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len + r);
  }

  /** sec = ความยาว · pad/drums/bass/hats/bright = ช่วงวินาที [[เริ่ม, จบ]] ที่ชิ้นนั้นเล่น (bright = กรองเปิด เสียงสว่าง) */
  async function render({ sec, pad = [[0, sec]], drums = [], bass = [], hats = [], bright = [] }) {
    const ctx = new OfflineAudioContext(2, Math.ceil(sec * SR), SR);
    const master = ctx.createGain();
    master.gain.setValueAtTime(0, 0);
    master.gain.linearRampToValueAtTime(1, 0.8);
    master.gain.setValueAtTime(1, sec - 2);
    master.gain.linearRampToValueAtTime(0, sec);
    master.connect(ctx.destination);
    // ห้องเสียงเล็กๆ: delay สะท้อน 3/4 จังหวะ ให้ pad ไม่แห้ง
    const dl = ctx.createDelay(1), fb = ctx.createGain(), wet = ctx.createGain();
    dl.delayTime.value = B * 0.75; fb.gain.value = 0.3; wet.gain.value = 0.22;
    dl.connect(fb).connect(dl); dl.connect(wet).connect(master);
    const nz = noise(ctx);

    for (let bar = 0; bar * BAR < sec; bar++) {
      const t0 = bar * BAR, ci = Math.floor(bar / 2) % 4;
      if (bar % 2 === 0 && on(pad, t0)) {
        const lp = ctx.createBiquadFilter();
        lp.type = "lowpass"; lp.frequency.value = on(bright, t0) ? 1500 : 520; lp.Q.value = 0.6;
        const g = ctx.createGain();
        env(g, t0, 0.07, 0.5, 2 * BAR - 0.3, 0.9);
        lp.connect(g); g.connect(master); g.connect(dl);
        for (const m of CHORDS[ci]) for (const det of [-7, 7]) {
          const o = ctx.createOscillator();
          o.type = "sawtooth"; o.frequency.value = hz(m); o.detune.value = det;
          o.connect(lp); o.start(t0); o.stop(t0 + 2 * BAR + 1);
        }
      }
      for (let beat = 0; beat < 4; beat++) {
        const tb = t0 + beat * B;
        if (tb >= sec) break;
        if (on(drums, tb) && beat % 2 === 0) {           // คิก: sine ดิ่ง 120 → 45 Hz
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.frequency.setValueAtTime(120, tb); o.frequency.exponentialRampToValueAtTime(45, tb + 0.12);
          env(g, tb, 0.5, 0.004, 0.02, 0.25); o.connect(g).connect(master); o.start(tb); o.stop(tb + 0.4);
        }
        if (on(drums, tb) && beat % 2 === 1) {           // สแนร์นุ่ม: noise ผ่าน bandpass
          const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
          s.buffer = nz; f.type = "bandpass"; f.frequency.value = 1800; f.Q.value = 0.8;
          env(g, tb, 0.12, 0.003, 0.01, 0.16); s.connect(f).connect(g); g.connect(master); g.connect(dl);
          s.start(tb, (bar * 0.13) % 0.5); s.stop(tb + 0.3);
        }
        if (on(bass, tb) && beat !== 1) {                // เบส: triangle รากคอร์ด
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = "triangle"; o.frequency.value = hz(ROOTS[ci]);
          env(g, tb, 0.22, 0.01, B * 0.6, 0.15); o.connect(g).connect(master); o.start(tb); o.stop(tb + B + 0.2);
        }
        for (const h of [0, 0.5]) {                      // ไฮแฮต 8 ส่วน · ตบหลังดังกว่า
          const th = tb + h * B;
          if (!on(hats, th)) continue;
          const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
          s.buffer = nz; f.type = "highpass"; f.frequency.value = 7000;
          env(g, th, h ? 0.045 : 0.022, 0.002, 0.005, 0.05); s.connect(f).connect(g).connect(master);
          s.start(th, (beat * 0.07 + h) % 0.8); s.stop(th + 0.1);
        }
      }
    }
    return wav(await ctx.startRendering());
  }

  /** AudioBuffer → WAV 16-bit stereo เป็น base64 (ส่งข้าม DevTools เป็นสตริง) */
  function wav(buf) {
    const n = buf.length, view = new DataView(new ArrayBuffer(44 + n * 4));
    const str = (o, s) => [...s].forEach((c, i) => view.setUint8(o + i, c.charCodeAt(0)));
    str(0, "RIFF"); view.setUint32(4, 36 + n * 4, true); str(8, "WAVEfmt ");
    view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 2, true);
    view.setUint32(24, SR, true); view.setUint32(28, SR * 4, true); view.setUint16(32, 4, true); view.setUint16(34, 16, true);
    str(36, "data"); view.setUint32(40, n * 4, true);
    const L = buf.getChannelData(0), R = buf.getChannelData(1);
    for (let i = 0; i < n; i++) {
      view.setInt16(44 + i * 4, Math.max(-1, Math.min(1, L[i])) * 0x7fff, true);
      view.setInt16(46 + i * 4, Math.max(-1, Math.min(1, R[i])) * 0x7fff, true);
    }
    const bytes = new Uint8Array(view.buffer);
    let bin = "";
    for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
    return btoa(bin);
  }

  return { render, BPM };
})();
