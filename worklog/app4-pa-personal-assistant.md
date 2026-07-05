# app4-pa-personal-assistant — worklog

## ส่วนการทำงาน (modules)
- ระบบเก็บข้อมูล (storage)
- Mind Map view
- KPI export

## 2026-07-05 · ย้ายที่เก็บ worklog ไป ego-avatar
- module: ระบบเก็บข้อมูล (storage)
- status: done
- files: worklog.ts, api/capture/route.ts
- problem: worklog กระจายในแต่ละ repo เสี่ยงหลุดถ้า repo เป็น public
- solution: ย้ายมาไฟล์กลางใน ego-avatar/worklog (private + sync)
- result: dashboard อ่านจากที่เดียว
- priority: P1
- days: 1

## 2026-07-05 · เพิ่ม Mind Map + KPI export
- module: Mind Map view
- status: wip
- files: MindMap.tsx, Kpi.tsx, Dashboard.tsx
- problem: ยังไม่มีมุมมองโครงสร้าง + ส่งออก KPI
- solution: เพิ่ม view พับ/กางกิ่ง + ปุ่ม export .md
- result: กำลังทดสอบ
- priority: P1
- days: 1
