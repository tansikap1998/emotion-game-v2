"use client";

import { useCallback, useState } from "react";
import { EMOTIONS, Scenario, EmotionKey, pickScenarios } from "@/lib/data";
import CopingModal from "./CopingModal";
import { spawnConfetti } from "./Confetti";

export default function GameBoard() {
  const [pool] = useState<Scenario[]>(() => pickScenarios(20));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<{ scenario: Scenario; emotionKey: EmotionKey }[]>([]);
  const [modal, setModal] = useState<{ scenario: Scenario; emotionKey: EmotionKey } | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const current = pool[currentIndex];
  const total = pool.length;
  const progress = Math.round((currentIndex / total) * 100);

  const handlePick = useCallback((emotionKey: EmotionKey) => {
    if (!current) return;
    const entry = { scenario: current, emotionKey };
    setHistory((h) => [...h, entry]);
    setModal(entry);
    spawnConfetti(10);
  }, [current]);

  const handleModalClose = () => {
    setModal(null);
    if (currentIndex + 1 >= total) setShowSummary(true);
    else setCurrentIndex((i) => i + 1);
  };

  if (showSummary) {
    const grouped: Record<string, typeof history> = {};
    history.forEach((h) => {
      if (!grouped[h.emotionKey]) grouped[h.emotionKey] = [];
      grouped[h.emotionKey].push(h);
    });
    return (
      <div className="min-h-screen p-4 max-w-lg mx-auto">
        <div className="text-center mb-6 mt-4">
          <div className="text-6xl mb-3">🌟</div>
          <h2 className="font-kanit font-bold text-2xl text-amber-700 mb-1">สำรวจครบแล้ว!</h2>
          <p className="text-gray-500 text-sm">นี่คืออารมณ์ที่เราเลือกในวันนี้</p>
        </div>
        <div className="space-y-3 mb-6">
          {EMOTIONS.filter((e) => grouped[e.key]?.length > 0).map((e) => (
            <div key={e.key} className="rounded-2xl p-3" style={{ backgroundColor: e.bgColor, border: `2px solid ${e.borderColor}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{e.icon}</span>
                <span className="font-kanit font-bold text-base" style={{ color: e.color }}>{e.key} ({grouped[e.key].length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {grouped[e.key].map((h) => (
                  <span key={h.scenario.id} className="text-xs bg-white/70 rounded-full px-2.5 py-1 border" style={{ borderColor: e.borderColor, color: e.textColor }}>
                    {h.scenario.icon} {h.scenario.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => window.location.reload()} className="w-full py-3 rounded-2xl bg-amber-700 text-white font-kanit font-bold text-lg hover:bg-amber-800 transition-colors">
          🔄 สำรวจรอบใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      <CopingModal
        scenario={modal?.scenario ?? null}
        emotion={EMOTIONS.find((e) => e.key === modal?.emotionKey) ?? null}
        onClose={handleModalClose}
      />
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-400">{currentIndex + 1} / {total}</span>
          <span className="text-xs text-gray-400">{progress}%</span>
        </div>
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#fcd34d,#fb923c)" }} />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4

cat > components/GameBoard.tsx << 'EOF'
"use client";

import { useCallback, useState } from "react";
import { EMOTIONS, Scenario, EmotionKey, pickScenarios } from "@/lib/data";
import CopingModal from "./CopingModal";
import { spawnConfetti } from "./Confetti";

export default function GameBoard() {
  const [pool] = useState<Scenario[]>(() => pickScenarios(20));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<{ scenario: Scenario; emotionKey: EmotionKey }[]>([]);
  const [modal, setModal] = useState<{ scenario: Scenario; emotionKey: EmotionKey } | null>(null);
  const [showSummary, setShowSummary] = useState(false);

  const current = pool[currentIndex];
  const total = pool.length;
  const progress = Math.round((currentIndex / total) * 100);

  const handlePick = useCallback((emotionKey: EmotionKey) => {
    if (!current) return;
    const entry = { scenario: current, emotionKey };
    setHistory((h) => [...h, entry]);
    setModal(entry);
    spawnConfetti(10);
  }, [current]);

  const handleModalClose = () => {
    setModal(null);
    if (currentIndex + 1 >= total) setShowSummary(true);
    else setCurrentIndex((i) => i + 1);
  };

  if (showSummary) {
    const grouped: Record<string, typeof history> = {};
    history.forEach((h) => {
      if (!grouped[h.emotionKey]) grouped[h.emotionKey] = [];
      grouped[h.emotionKey].push(h);
    });
    return (
      <div className="min-h-screen p-4 max-w-lg mx-auto">
        <div className="text-center mb-6 mt-4">
          <div className="text-6xl mb-3">🌟</div>
          <h2 className="font-kanit font-bold text-2xl text-amber-700 mb-1">สำรวจครบแล้ว!</h2>
          <p className="text-gray-500 text-sm">นี่คืออารมณ์ที่เราเลือกในวันนี้</p>
        </div>
        <div className="space-y-3 mb-6">
          {EMOTIONS.filter((e) => grouped[e.key]?.length > 0).map((e) => (
            <div key={e.key} className="rounded-2xl p-3" style={{ backgroundColor: e.bgColor, border: `2px solid ${e.borderColor}` }}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{e.icon}</span>
                <span className="font-kanit font-bold text-base" style={{ color: e.color }}>{e.key} ({grouped[e.key].length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {grouped[e.key].map((h) => (
                  <span key={h.scenario.id} className="text-xs bg-white/70 rounded-full px-2.5 py-1 border" style={{ borderColor: e.borderColor, color: e.textColor }}>
                    {h.scenario.icon} {h.scenario.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => window.location.reload()} className="w-full py-3 rounded-2xl bg-amber-700 text-white font-kanit font-bold text-lg hover:bg-amber-800 transition-colors">
          🔄 สำรวจรอบใหม่
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-56px)]">
      <CopingModal
        scenario={modal?.scenario ?? null}
        emotion={EMOTIONS.find((e) => e.key === modal?.emotionKey) ?? null}
        onClose={handleModalClose}
      />
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-400">{currentIndex + 1} / {total}</span>
          <span className="text-xs text-gray-400">{progress}%</span>
        </div>
        <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
          <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: "linear-gradient(90deg,#fcd34d,#fb923c)" }} />
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-2">
        <p className="text-xs text-gray-400 mb-4 text-center">ถ้าเจอแบบนี้ จะรู้สึกยังไง?</p>
        <div className="bg-white rounded-3xl shadow-xl border-2 border-amber-100 p-8 text-center w-full max-w-sm mb-6">
          <div className="text-7xl mb-4">{current?.icon}</div>
          <div className="font-kanit font-bold text-xl text-gray-800 leading-snug">{current?.text}</div>
        </div>
        <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
          {EMOTIONS.map((e) => (
            <button key={e.key} onClick={() => handlePick(e.key)} style={{ backgroundColor: e.bgColor, borderColor: e.borderColor }} className="flex flex-col items-center justify-center rounded-2xl border-2 py-3 px-1 transition-all active:scale-95 hover:scale-105">
              <span className="text-2xl sm:text-3xl">{e.icon}</span>
              <span className="text-[11px] sm:text-xs font-kanit font-bold mt-1" style={{ color: e.color }}>{e.key}</span>
            </button>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <div className="px-4 pb-3">
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {history.slice(-6).map((h) => {
              const emo = EMOTIONS.find((e) => e.key === h.emotionKey)!;
              return (
                <div key={h.scenario.id} className="flex-shrink-0 flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] border" style={{ backgroundColor: emo.bgColor, borderColor: emo.borderColor, color: emo.textColor }}>
                  <span>{h.scenario.icon}</span>
                  <span>{emo.icon}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
