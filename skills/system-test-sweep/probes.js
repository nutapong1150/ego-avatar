// เครื่องมือวัดของ system-test-sweep — วางทั้งไฟล์ลงใน javascript_tool ของเบราว์เซอร์ แล้วเรียกฟังก์ชันที่ต้องใช้
// ใช้กับ React/Next ได้ (setInput ยิง event แบบที่ React รับ) · ไม่ต้องลง lib

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/** หาปุ่ม/ลิงก์จากข้อความที่ผู้ใช้เห็น — ใช้แทนพิกัด ซึ่งเพี้ยนเมื่อหน้าจอถูกย่อ */
const byText = (text, root = document) =>
  [...root.querySelectorAll("button, a, label, [role=button], [role=tab]")].find((el) =>
    el.innerText.trim().includes(text),
  );

/** ใส่ค่าลง input ให้ React รู้ตัว (el.value = x เฉยๆ React ไม่เห็น) */
function setInput(el, value) {
  const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement : HTMLInputElement;
  Object.getOwnPropertyDescriptor(proto.prototype, "value").set.call(el, value);
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

/**
 * ชั้น 6: กดเมนูทีละอันแล้วจดทุกสถานะที่โผล่ใน main
 * ถ้ามี "กำลังโหลด"/หน้าว่างคั่นระหว่างหน้าเก่ากับหน้าใหม่ = กระพริบ
 * targets: href ของลิงก์ ('/health') หรือข้อความบนปุ่มแท็บ ('รูปสรีระ')
 * traceNav(['/protocol','/health','รูปสรีระ','/me'])
 */
async function traceNav(targets, { selector = "main", ms = 1200 } = {}) {
  const out = [];
  for (const target of targets) {
    const el = target.startsWith("/") ? document.querySelector(`a[href="${target}"]`) : byText(target);
    if (!el) {
      out.push([target, "ไม่พบปุ่ม/ลิงก์"]);
      continue;
    }
    el.click();
    const seen = [];
    const t0 = performance.now();
    while (performance.now() - t0 < ms) {
      const s = (document.querySelector(selector)?.innerText || "").slice(0, 30).replace(/\n/g, " ");
      if (seen.at(-1)?.[1] !== s) seen.push([Math.round(performance.now() - t0), s]);
      await wait(10);
    }
    out.push([target, seen.map(([t, s]) => `${t}ms ${s || "(ว่าง)"}`).join(" → ")]);
  }
  return out;
}

/** ชั้น 6: กดแล้วกี่ ms หน้าจอถึงเปลี่ยน — เกิน ~100ms ผู้ใช้เริ่มรู้สึกว่ารอ */
async function timeToChange(el, watch = el.parentElement, limit = 3000) {
  const before = watch.outerHTML;
  const t0 = performance.now();
  el.click();
  while (performance.now() - t0 < limit) {
    await wait(2);
    if (watch.outerHTML !== before) return Math.round(performance.now() - t0);
  }
  return null; // ไม่เปลี่ยนเลย = ปุ่มนี้อาจกดแล้วไม่มีผล
}

/** ชั้น 6: เก็บ error ที่เกิดหลังจากนี้เท่านั้น (คอนโซลอาจมี error เก่าค้างจาก hot reload) */
function captureErrors() {
  const errs = [];
  addEventListener("error", (e) => errs.push(e.message));
  addEventListener("unhandledrejection", (e) => errs.push(String(e.reason)));
  return errs;
}

/** ชั้น 4 ข้อ (ง): รายการตัวเลือกบนหน้า ไว้ไล่กดทีละอันแล้วดูว่าแต่ละอันมีผลจริงไหม */
const inventory = (root = document.querySelector("main")) => ({
  // label รวมด้วย เพราะปุ่มอัปโหลดไฟล์มักเป็น <label> ห่อ input[type=file]
  buttons: [...root.querySelectorAll("button, label, [role=button], a")]
    .map((b) => b.innerText.trim())
    .filter(Boolean),
  inputs: [...root.querySelectorAll("input, select, textarea")].map(
    (i) => `${i.type || i.tagName}:${i.getAttribute("aria-label") || i.placeholder || i.name || ""}`,
  ),
  disabled: [...root.querySelectorAll("[disabled]")].map((b) => b.innerText.trim()),
});
