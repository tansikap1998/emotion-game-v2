"use client";

import { useState } from "react";
import GameBoard from "@/components/GameBoard";
import HowToPlay from "@/components/HowToPlay";
import EmotionCards from "@/components/EmotionCards";

type Tab = "game" | "howto" | "cards";

export default function Home() {
  const [tab, setTab] = useState<Tab>("game");

  const tabs: { id: Tab; label: string }[] = [
    { id: "game", label: "🎮 เล่นเกม" },
    { id: "howto", label: "📖 วิธีเล่น" },
    { id: "cards", label: "🃏 การ์ดอารมณ์" },
  ];

  return (
    <div className="min-h-screen">
      {/* Global header */}
      <header className="bg-white border-b-2 border-amber-100 shadow-sm sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-2.5 flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl">🐾</span>
            <h1 className="font-kanit font-bold text-base sm:text-lg text-amber-800 leading-tight">
              ชุดอารมณ์พื้นฐาน
            </h1>
          </div>
          <nav className="flex gap-1 ml-auto flex-wrap">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`
                  px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm transition-all font-medium
                  ${tab === t.id
                    ? "bg-amber-700 text-white"
                    : "border border-gray-200 text-gray-500 hover:border-amber-300 hover:text-amber-700 bg-white"
                  }
                `}
              >
                {t.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Tab content */}
      <main>
        {tab === "game" && <GameBoard />}
        {tab === "howto" && <HowToPlay />}
        {tab === "cards" && <EmotionCards />}
      </main>
    </div>
  );
}
