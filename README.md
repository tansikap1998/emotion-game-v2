# 🐾 ชุดอารมณ์พื้นฐาน — EQ Emotion Explorer

เกมสำรวจอารมณ์พื้นฐาน 8 ชนิด พร้อมคำแนะนำ EQ สำหรับเด็ก  
สร้างด้วย **Next.js 14 + TypeScript + Tailwind CSS**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript) ![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?logo=tailwindcss)

## 🎮 ฟีเจอร์

- **ไม่มีถูกหรือผิด** — เด็กเลือกอารมณ์ตามความรู้สึกของตัวเอง
- **64 สถานการณ์** — สุ่มมาแสดง 20 ใบต่อรอบ ไม่ซ้ำกันง่ายๆ
- **คำแนะนำ EQ** — ทุกการ์ดมี coping tip เฉพาะสถานการณ์
- **8 อารมณ์** — ดีใจ เศร้า โกรธ กลัว งง ประหลาดใจ รังเกียจ ภูมิใจ
- **Drag & Drop** — รองรับ mouse และ touch (มือถือ/แท็บเล็ต)
- **Responsive** — 2 คอลัมน์บนมือถือ, 3 คอลัมน์บน tablet+
- **เอาการ์ดคืนได้** — แตะการ์ดในกล่องเพื่อเปลี่ยนใจ

## 🚀 วิธีติดตั้งและรัน

```bash
# 1. Clone repo
git clone https://github.com/YOUR_USERNAME/emotion-game.git
cd emotion-game

# 2. ติดตั้ง dependencies
npm install

# 3. รันในโหมด development
npm run dev
# เปิด http://localhost:3000
```

## 🏗️ โครงสร้างโปรเจกต์

```
emotion-game/
├── app/
│   ├── layout.tsx          # Root layout + Google Fonts
│   ├── page.tsx            # Tab navigation
│   └── globals.css         # Tailwind + global styles
├── components/
│   ├── GameBoard.tsx       # Logic หลัก (exploration mode)
│   ├── EmotionZone.tsx     # Drop zone แต่ละอารมณ์
│   ├── ScenarioCard.tsx    # การ์ดสถานการณ์ (draggable)
│   ├── CopingModal.tsx     # Popup คำแนะนำ EQ หลังวางการ์ด
│   ├── Toast.tsx           # Notification
│   ├── Confetti.tsx        # Animation
│   ├── HowToPlay.tsx       # แท็บวิธีเล่น
│   └── EmotionCards.tsx    # แท็บการ์ดอารมณ์
└── lib/
    └── data.ts             # อารมณ์ 8 + สถานการณ์ 64 ใบ + pickScenarios()
```

## 📦 Deploy บน Vercel (ฟรี)

```bash
npm i -g vercel
vercel
```

หรือ connect GitHub repo ที่ [vercel.com](https://vercel.com) — auto-deploy ทุกครั้งที่ push

## 🎨 เพิ่มสถานการณ์ใหม่

แก้ไขไฟล์ `lib/data.ts`:

```typescript
export const ALL_SCENARIOS: Scenario[] = [
  // เพิ่มตรงนี้
  {
    id: 65,
    text: "ได้รับคำชมจากครู",
    icon: "⭐",
    copingTip: "รับคำชมด้วยรอยยิ้ม แล้วบอกตัวเองว่า 'ฉันทำได้!'",
  },
];
```

## 📝 License

MIT
