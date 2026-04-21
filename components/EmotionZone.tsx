"use client";

import { Emotion, Scenario } from "@/lib/data";

export interface PlacedCard {
  scenario: Scenario;
  emotion: string;
}

interface Props {
  emotion: Emotion;
  cards: PlacedCard[];
  isOver: boolean;
  onDragOver: (e: React.DragEvent, emotion: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, emotion: string) => void;
  onRemoveCard: (scenarioId: number) => void;
}

export default function EmotionZone({
  emotion,
  cards,
  isOver,
  onDragOver,
  onDragLeave,
  onDrop,
  onRemoveCard,
}: Props) {
  return (
    <div
      data-emotion={emotion.key}
      onDragOver={(e) => onDragOver(e, emotion.key)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, emotion.key)}
      style={{
        borderColor: isOver ? emotion.color : emotion.borderColor,
        backgroundColor: emotion.bgColor,
        boxShadow: isOver ? `0 0 0 3px ${emotion.color}44` : undefined,
      }}
      className={`
        rounded-2xl border-[3px] border-dashed p-2.5 text-center
        min-h-[120px] transition-all duration-200
        ${isOver ? "scale-[1.03]" : ""}
      `}
    >
      <div className="text-3xl sm:text-[2rem] leading-none">{emotion.icon}</div>
      <div
        className="font-kanit font-bold text-sm sm:text-base mt-0.5"
        style={{ color: emotion.color }}
      >
        {emotion.key}
      </div>
      <div className="text-[10px] sm:text-[11px] text-gray-400 mb-1.5 leading-tight">
        {emotion.description}
      </div>

      {/* Placed chips */}
      <div className="flex flex-wrap gap-1 justify-center min-h-[16px]">
        {cards.map((c) => (
          <button
            key={c.scenario.id}
            onClick={() => onRemoveCard(c.scenario.id)}
            title="แตะเพื่อเอากลับ"
            style={{
              borderColor: `${emotion.color}66`,
              backgroundColor: "rgba(255,255,255,0.75)",
              color: emotion.textColor,
            }}
            className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] border font-medium hover:opacity-70 transition-opacity"
          >
            {c.scenario.icon}
            <span className="hidden xs:inline">{c.scenario.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
