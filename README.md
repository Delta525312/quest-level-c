# 💖 Anniversary Surprise Website

เว็บเซอร์ไพรส์วันครบรอบธีมเกมพิกเซล สร้างด้วย **Next.js 16 + React 19**
รองรับมือถือเต็มรูปแบบ พร้อม deploy บน Vercel ทันที

## 🚀 เริ่มใช้งาน

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

## ✏️ จุดที่ใช้ปรับแต่ง

ไฟล์หลักของเวอร์ชันปัจจุบัน:

- `src/components/AnniversaryGame.tsx` — flow หลัก เพลง และเสียงเอฟเฟกต์
- `src/components/MemoryTimeline.tsx` — หน้าความทรงจำและ SVG ตกแต่ง
- `src/data/memories.ts` — ข้อความ รูป และ asset ของความทรงจำทั้ง 26 รายการ
- `src/components/CoupleQuiz.tsx` — คำถามและตัวเลือก Quiz

## 🖼 วาง Asset

| ประเภท | วางที่ | ตัวอย่าง path ใน config |
|---|---|---|
| รูปภาพ | `public/images/` | `/images/photo-1.jpg` |
| วิดีโอ | `public/videos/` | `/videos/for-you.mp4` |

ถ้ายังไม่ใส่ไฟล์ ระบบจะแสดง placeholder สวยๆ บอกตำแหน่งให้อัตโนมัติ

## ☁️ Deploy บน Vercel

1. Push โปรเจกต์ขึ้น GitHub
2. เข้า [vercel.com](https://vercel.com) → **Add New Project** → เลือก repo
3. กด **Deploy** ได้เลย (ไม่ต้องตั้งค่าอะไรเพิ่ม)
