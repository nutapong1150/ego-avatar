// Wireflow traceability check — ตรวจลิงก์ระหว่าง flow กับหน้าจอด้วยการวัดจริง ไม่ใช่กวาดตา
// ใช้: node check-links.mjs <โฟลเดอร์หน้าจอ> [ไฟล์ flow.html]
// exit 1 เมื่อมีลิงก์เสีย / แท็กไม่ครบ / หน้าจอไม่อยู่ใน flow
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";

const [dir, flowFile] = process.argv.slice(2);
if (!dir) { console.error("usage: node check-links.mjs <screens-dir> [flow.html]"); process.exit(2); }

const flowPath = flowFile ? resolve(flowFile) : null;
const screens = readdirSync(dir).filter((f) => f.endsWith(".html")).map((f) => resolve(dir, f)).filter((f) => f !== flowPath);
const hrefs = (file) => [...readFileSync(file, "utf8").matchAll(/href="([^"]*)"/g)].map((m) => m[1]);
const isExternal = (h) => /^(https?:|mailto:|tel:|sms:|data:)/.test(h);

let failed = false;
const inbound = new Map(screens.map((s) => [s, []]));
const mock = [];

for (const file of [...screens, ...(flowPath ? [flowPath] : [])]) {
  const name = basename(file);
  for (const h of hrefs(file)) {
    if (isExternal(h)) continue;
    if (h.startsWith("#") || h === "") { mock.push(`${name} → ${h || '""'}`); continue; }
    const target = resolve(dirname(file), h.split(/[?#]/)[0]);
    if (!existsSync(target)) { console.log(`✗ ลิงก์เสีย  ${name} → ${h}`); failed = true; continue; }
    if (inbound.has(target) && target !== file) inbound.get(target).push(file === flowPath ? "(flow)" : name);
  }
  // แท็กเปิด/ปิดต้องเท่ากัน — ไฟล์ที่ปิดไม่ครบมักเลย์เอาต์พังตอนเปิดจริง
  const html = readFileSync(file, "utf8");
  for (const tag of ["div", "a", "button", "section", "main", "form", "label", "ul", "li"]) {
    const open = (html.match(new RegExp(`<${tag}[\\s>]`, "g")) || []).length;
    const close = (html.match(new RegExp(`</${tag}>`, "g")) || []).length;
    if (open !== close) { console.log(`✗ แท็กไม่ครบ ${name} <${tag}> เปิด ${open} ปิด ${close}`); failed = true; }
  }
}

console.log(`\nหน้าจอ ${screens.length} ไฟล์`);
for (const [s, from] of inbound) {
  const screenLinks = from.filter((f) => f !== "(flow)");
  if (flowPath && !from.includes("(flow)")) { console.log(`✗ ไม่อยู่ใน flow  ${basename(s)}`); failed = true; }
  if (screenLinks.length === 0) console.log(`! ไม่มีปุ่มพาเข้า  ${basename(s)}  (ต้องเป็นหน้าที่ระบบเปิดเอง ไม่งั้นคือหน้าหลุด)`);
}
if (mock.length) console.log(`\nลิงก์จำลอง ${mock.length} อัน (จดลง check.md):\n  ${mock.join("\n  ")}`);
console.log(failed ? "\nผล: ไม่ผ่าน" : "\nผล: ผ่าน");
process.exit(failed ? 1 : 0);
