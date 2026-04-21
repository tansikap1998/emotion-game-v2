export default function HowToPlay() {
  const steps = [
    { num: 1, title: "หยิบการ์ดสถานการณ์", desc: "คลิกค้างหรือแตะค้างที่การ์ดด้านล่าง แล้วลากขึ้นมา" },
    { num: 2, title: "ดูว่าเกิดอะไรขึ้น", desc: "อ่านสถานการณ์บนการ์ด แล้วนึกว่าถ้าเราอยู่ตรงนั้น จะรู้สึกอย่างไร?" },
    { num: 3, title: "เลือกอารมณ์ที่รู้สึก", desc: "วางการ์ดลงในกล่องอารมณ์ที่ตรงกับความรู้สึกของเรามากที่สุด ไม่มีถูกหรือผิด" },
    { num: 4, title: "อ่านคำแนะนำ", desc: "เมื่อวางแล้วจะมีคำแนะนำวิธีรับมือกับสถานการณ์นั้น เก็บไว้ใช้ในชีวิตจริง" },
  ];

  const concepts = [
    { icon: "😊", title: "รู้จักอารมณ์ตัวเอง", desc: "ฝึกตั้งชื่ออารมณ์ที่รู้สึก เพราะอารมณ์ที่มีชื่อ จัดการง่ายกว่าอารมณ์ที่ไม่รู้ว่าคืออะไร" },
    { icon: "👥", title: "ไม่มีอารมณ์ที่ผิด", desc: "ทุกอารมณ์มีสิทธิ์เกิดขึ้น สิ่งที่สำคัญคือเราเลือกตอบสนองต่อมันอย่างไร" },
    { icon: "💬", title: "รับมือได้", desc: "แต่ละสถานการณ์มีวิธีรับมือ การรู้ล่วงหน้าช่วยให้เราพร้อมรับมือเมื่อเจอจริง" },
    { icon: "🔄", title: "ฝึกบ่อยๆ", desc: "กด 'ใหม่' ได้ตลอด มีการ์ดสถานการณ์ 64 ใบ สุ่มใหม่ทุกครั้ง ไม่ซ้ำ" },
  ];

  return (
    <div className="p-4 sm:p-6 max-w-2xl mx-auto">
      <h2 className="font-kanit font-bold text-lg text-amber-800 mb-4">📖 วิธีเล่น</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {steps.map((s) => (
          <div key={s.num} className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-amber-700 text-white flex items-center justify-center font-kanit font-bold text-base mb-3">
              {s.num}
            </div>
            <h3 className="font-medium text-[15px] mb-1.5">{s.title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="font-kanit font-bold text-lg text-amber-800 mb-4">🧠 EQ คืออะไร?</h2>
      <div className="bg-amber-50 rounded-xl border border-amber-200 p-4 mb-6">
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong>EQ (Emotional Intelligence)</strong> คือความสามารถในการรับรู้ เข้าใจ
          และจัดการอารมณ์ของตัวเองและผู้อื่น เด็กที่มี EQ สูงจะสามารถ
          สร้างความสัมพันธ์ที่ดี รับมือกับความเครียดได้ และตัดสินใจได้ดีขึ้น
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {concepts.map((c) => (
          <div key={c.title} className="bg-white rounded-xl border border-amber-100 p-4 shadow-sm">
            <div className="text-2xl mb-2">{c.icon}</div>
            <h3 className="font-medium text-[14px] mb-1">{c.title}</h3>
            <p className="text-xs text-gray-500 leading-relaxed">{c.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-amber-100 p-4">
        <h3 className="font-medium text-amber-800 mb-2 text-sm">💡 เคล็ดลับการใช้งาน</h3>
        <ul className="text-sm text-gray-600 space-y-1.5">
          <li>🐾 <strong>มือถือ:</strong> แตะค้างที่การ์ดแล้วลากไปวาง</li>
          <li>🖱️ <strong>คอมพิวเตอร์:</strong> คลิกค้างแล้วลากไปวาง</li>
          <li>🔙 แตะที่การ์ดในกล่องเพื่อเอากลับมาเลือกใหม่ได้เสมอ</li>
          <li>💬 อ่านคำแนะนำหลังวางการ์ด แล้วพูดคุยกับเด็กว่าเข้าใจไหม</li>
          <li>🔄 กด "ใหม่" จะได้ชุดการ์ดสถานการณ์ 20 ใบใหม่ทุกครั้ง</li>
        </ul>
      </div>
    </div>
  );
}
