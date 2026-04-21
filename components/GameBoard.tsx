"use client";

import { useCallback, useRef, useState } from "react";
import { EMOTIONS, Scenario, EmotionKey, pickScenarios } from "@/lib/data";
import ScenarioCard from "./ScenarioCard";
import EmotionZone, { PlacedCard } from "./EmotionZone";
import CopingModal from "./CopingModal";
import Toast, { ToastMsg } from "./Toast";
import { spawnConfetti } from "./Confetti";

type ZoneMap = Record<EmotionKey, PlacedCard[]>;

function emptyZones(): ZoneMap {
return Object.fromEntries(EMOTIONS.map((e) => [e.key, [] as PlacedCard[]])) as ZoneMap;
}

export default function GameBoard() {
  const [pool, setPool] = useState<Scenario[]>(() => pickScenarios(20));
  const [placedIds, setPlacedIds] = useState<Set<number>>(new Set());
  const [zones, setZones] = useState<ZoneMap>(emptyZones);
  const [overEmotion, setOverEmotion] = useState<string | null>(null);
  const [modal, setModal] = useState<{ scenario: Scenario; emotionKey: EmotionKey } | null>(null);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const toastRef = useRef(0);

  const placed = placedIds.size;
  const total = pool.length;
  const progress = total > 0 ? Math.round((placed / total) * 100) : 0;

  const addToast = (text: string) => {
    const id = ++toastRef.current;
    setToasts((p) => [...p.slice(-1), { id, text }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 2000);
  };

  const handleDrop = useCallback(
    (scenarioId: number, emotionKey: string) => {
      const s = pool.find((x) => x.id === scenarioId);
      if (!s || placedIds.has(s.id)) return;

      setPlacedIds((prev) => new Set(prev).add(s.id));
      setZones((prev) => ({
        ...prev,
        [emotionKey]: [...prev[emotionKey as EmotionKey], { scenario: s, emotion: emotionKey }],
      }));

      // Show coping modal
      setModal({ scenario: s, emotionKey: emotionKey as EmotionKey });
      spawnConfetti(12);

      // Check complete
      if (placed + 1 === total) {
        setTimeout(() => {
          spawnConfetti(36);
          addToast("🎉 สำรวจอารมณ์ครบทุกใบแล้ว!");
        }, 400);
      }
    },
    [pool, placedIds, placed, total]
  );

  // Remove card from zone back to pool
  const handleRemoveCard = useCallback((scenarioId: number) => {
    setPlacedIds((prev) => {
      const next = new Set(prev);
      next.delete(scenarioId);
      return next;
    });
    setZones((prev) => {
      const next = { ...prev } as ZoneMap;
      for (const key of Object.keys(next) as EmotionKey[]) {
        next[key] = next[key].filter((c) => c.scenario.id !== scenarioId);
      }
      return next;
    });
  }, []);

  const handleReset = () => {
    setPool(pickScenarios(20));
    setPlacedIds(new Set());
    setZones(emptyZones());
    setOverEmotion(null);
    setModal(null);
  };

  return (
    <div className="min-h-screen">
      <Toast messages={toasts} />

      {/* Coping modal */}
      <CopingModal
        scenario={modal?.scenario ?? null}
        emotion={EMOTIONS.find((e) => e.key === modal?.emotionKey) ?? null}
        onClose={() => setModal(null)}
      />

      {/* Progress bar */}
      <div className="bg-white border-b border-amber-100 px-3 sm:px-4 py-2.5 flex items-center gap-3 sticky top-0 z-40 shadow-sm">
        <div className="text-center min-w-[44px]">
          <div className="font-kanit font-bold text-lg text-amber-700 leading-none">{placed}</div>
          <div className="text-[10px] text-gray-400">/{total} ใบ</div>
        </div>
        <div className="flex-1">
          <div className="bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#fcd34d,#fb923c)",
              }}
            />
          </div>
          <div className="text-[11px] text-gray-400 mt-0.5">
            {placed === 0
              ? "ลากการ์ดไปวางในอารมณ์ที่รู้สึก — ไม่มีถูกหรือผิด"
              : placed === total
              ? "🎉 สำรวจครบแล้ว! กดเริ่มใหม่เพื่อเล่นอีกรอบ"
              : `สำรวจแล้ว ${placed}/${total} ใบ`}
          </div>
        </div>
        <button
          onClick={handleReset}
          className="flex-shrink-0 px-3 py-1.5 rounded-full bg-amber-700 text-white text-xs sm:text-sm font-medium hover:bg-amber-800 transition-colors"
        >
          🔄 ใหม่
        </button>
      </div>

      <div className="p-2.5 sm:p-4 max-w-screen-xl mx-auto">
        {/* Emotion zones — 3 per row on sm+, 2 per row on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 mb-3">
          {EMOTIONS.map((emotion) => (
            <EmotionZone
              key={emotion.key}
              emotion={emotion}
              cards={zones[emotion.key]}
              isOver={overEmotion === emotion.key}
              onDragOver={(e, em) => { e.preventDefault(); setOverEmotion(em); }}
              onDragLeave={() => setOverEmotion(null)}
              onDrop={(e, em) => {
                e.preventDefault();
                setOverEmotion(null);
                const id = parseInt(e.dataTransfer.getData("text/plain"));
                if (id) handleDrop(id, em);
              }}
              onRemoveCard={handleRemoveCard}
            />
          ))}
        </div>

        {/* Scenario pool */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-amber-100 p-2.5 sm:p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="text-sm font-medium text-gray-500">🃏 การ์ดสถานการณ์</span>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-kanit">
              {total - placed} ใบที่เหลือ
            </span>
            <span className="text-[11px] text-gray-400 hidden sm:inline">
              — แตะการ์ดในกล่องเพื่อเอาคืน
            </span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {pool.map((s) => (
              <ScenarioCard
                key={s.id}
                scenario={s}
                used={placedIds.has(s.id)}
                onDragStart={() => {}}
                onDragEnd={() => {}}
                onTouchDrop={handleDrop}
              />
            ))}
          </div>
        </div>

        {/* Completion banner */}
        {placed === total && total > 0 && (
          <div className="mt-4 text-center bg-white rounded-2xl border-2 border-amber-200 p-6 animate-bounce-in">
            <div className="text-5xl mb-3">🌟</div>
            <h2 className="font-kanit font-bold text-xl text-amber-700 mb-1">
              สำรวจอารมณ์ครบแล้ว!
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              เก่งมาก! เราได้รู้จักอารมณ์และวิธีรับมือกับสถานการณ์ต่างๆ แล้ว
            </p>

            {/* Summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 text-left">
              {EMOTIONS.filter((e) => zones[e.key].length > 0).map((e) => (
                <div
                  key={e.key}
                  className="rounded-xl p-2.5"
                  style={{ backgroundColor: e.bgColor }}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-lg">{e.icon}</span>
                    <span className="font-kanit font-bold text-xs" style={{ color: e.color }}>
                      {e.key} ({zones[e.key].length})
                    </span>
                  </div>
                  {zones[e.key].slice(0, 2).map((c) => (
                    <div key={c.scenario.id} className="text-[10px] text-gray-500 truncate">
                      {c.scenario.icon} {c.scenario.text}
                    </div>
                  ))}
                  {zones[e.key].length > 2 && (
                    <div className="text-[10px] text-gray-400">+{zones[e.key].length - 2} อื่นๆ</div>
                  )}
                </div>
              ))}
            </div>

            <button
              onClick={handleReset}
              className="px-6 py-2.5 rounded-full bg-amber-700 text-white font-medium hover:bg-amber-800 transition-colors"
            >
              🔄 สำรวจรอบใหม่ (การ์ดชุดใหม่)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
