"use client";

import { Emotion, Scenario } from "@/lib/data";

interface Props {
  scenario: Scenario | null;
  emotion: Emotion | null;
  onClose: () => void;
}

export default function CopingModal({ scenario, emotion, onClose }: Props) {
  if (!scenario || !emotion) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-5 animate-bounce-in"
        onClick={(e) => e.stopPropagation()}
        style={{ borderTop: `5px solid ${emotion.color}` }}
      >
        {/* Emotion header */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
            style={{ backgroundColor: emotion.lightBg }}
          >
            {emotion.icon}
          </div>
          <div>
            <div className="font-kanit font-bold text-base" style={{ color: emotion.color }}>
              {emotion.key}
            </div>
            <div className="text-xs text-gray-400">{emotion.detail}</div>
          </div>
        </div>

        {/* Scenario */}
        <div
          className="rounded-xl p-3 mb-4 flex items-center gap-3"
          style={{ backgroundColor: emotion.bgColor }}
        >
          <span className="text-2xl">{scenario.icon}</span>
          <span className="text-sm font-medium text-gray-700 leading-snug">{scenario.text}</span>
        </div>

        {/* Coping tip */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2">
            <span>💡</span>
            <span>คำแนะนำรับมือ</span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed bg-amber-50 rounded-xl p-3 border border-amber-100">
            {scenario.copingTip}
          </p>
        </div>

        {/* Coping from emotion */}
        <div className="mb-5">
          <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mb-2">
            <span>🐾</span>
            <span>เมื่อรู้สึก{emotion.key}</span>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {emotion.coping}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-90"
          style={{ backgroundColor: emotion.color }}
        >
          เข้าใจแล้ว! ✓
        </button>
      </div>
    </div>
  );
}
