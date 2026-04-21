import { EMOTIONS, ALL_SCENARIOS } from "@/lib/data";

export default function EmotionCards() {
  return (
    <div className="p-4 sm:p-6 max-w-3xl mx-auto">
      <h2 className="font-kanit font-bold text-lg text-amber-800 mb-4">🃏 การ์ดอารมณ์ทั้ง 8</h2>

      {/* 3 per row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {EMOTIONS.map((e) => (
          <div
            key={e.key}
            className="rounded-2xl border-[3px] p-4 text-center"
            style={{ borderColor: e.color, backgroundColor: e.bgColor }}
          >
            <div className="text-4xl sm:text-5xl mb-2">{e.icon}</div>
            <div
              className="font-kanit font-bold text-lg sm:text-xl mb-1"
              style={{ color: e.color }}
            >
              {e.key}
            </div>
            <div className="text-[11px] sm:text-xs text-gray-600 leading-relaxed mb-2">
              {e.detail}
            </div>
            <div
              className="text-[10px] sm:text-[11px] leading-relaxed rounded-lg p-2"
              style={{ backgroundColor: e.lightBg, color: e.textColor }}
            >
              💡 {e.coping}
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-kanit font-bold text-lg text-amber-800 mb-4">
        📋 สถานการณ์ทั้งหมด {ALL_SCENARIOS.length} ใบ
      </h2>
      <p className="text-xs text-gray-500 mb-3">
        แต่ละรอบจะสุ่มมา 20 ใบจาก {ALL_SCENARIOS.length} ใบ เพื่อไม่ให้ซ้ำ
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {ALL_SCENARIOS.map((s) => (
          <div
            key={s.id}
            className="flex items-start gap-2.5 bg-white rounded-xl border border-gray-100 px-3 py-2.5 shadow-sm"
          >
            <span className="text-xl flex-shrink-0 mt-0.5">{s.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-700 font-medium truncate">{s.text}</div>
              <div className="text-[11px] text-gray-400 leading-snug mt-0.5 line-clamp-2">
                {s.copingTip}
              </div>
            </div>
            <span className="text-[10px] text-gray-300 flex-shrink-0 font-kanit mt-0.5">
              #{s.id}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
