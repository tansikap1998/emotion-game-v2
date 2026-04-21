"use client";

import { Scenario } from "@/lib/data";
import { useRef } from "react";

interface Props {
  scenario: Scenario;
  used: boolean;
  onDragStart: (id: number) => void;
  onDragEnd: () => void;
  onTouchDrop: (scenarioId: number, targetEmotion: string) => void;
}

export default function ScenarioCard({
  scenario,
  used,
  onDragStart,
  onDragEnd,
  onTouchDrop,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const offsetRef = useRef({ x: 0, y: 0 });

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", String(scenario.id));
    onDragStart(scenario.id);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (used) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = cardRef.current!.getBoundingClientRect();
    offsetRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top };

    const ghost = cardRef.current!.cloneNode(true) as HTMLDivElement;
    ghost.style.cssText = `
      position: fixed;
      width: ${rect.width}px;
      top: ${rect.top}px;
      left: ${rect.left}px;
      opacity: 0.88;
      z-index: 9999;
      pointer-events: none;
      border-radius: 12px;
      box-shadow: 0 12px 32px rgba(0,0,0,0.2);
      transform: scale(1.05);
      transition: none;
    `;
    document.body.appendChild(ghost);
    ghostRef.current = ghost;
    onDragStart(scenario.id);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    if (!ghostRef.current) return;
    const touch = e.touches[0];
    ghostRef.current.style.top = touch.clientY - offsetRef.current.y + "px";
    ghostRef.current.style.left = touch.clientX - offsetRef.current.x + "px";
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    if (ghostRef.current) {
      ghostRef.current.remove();
      ghostRef.current = null;
    }
    onDragEnd();
    const touch = e.changedTouches[0];
    const el = document.elementFromPoint(touch.clientX, touch.clientY);
    const zone = el?.closest("[data-emotion]") as HTMLElement | null;
    if (zone?.dataset.emotion) {
      onTouchDrop(scenario.id, zone.dataset.emotion);
    }
  };

  return (
    <div
      ref={cardRef}
      draggable={!used}
      onDragStart={handleDragStart}
      onDragEnd={onDragEnd}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className={`
        relative bg-white rounded-xl border-2 border-amber-100 p-3 text-center
        select-none transition-all duration-200 cursor-grab active:cursor-grabbing
        ${used
          ? "opacity-30 grayscale pointer-events-none"
          : "hover:-translate-y-1 hover:shadow-lg hover:border-amber-300 shadow-sm"
        }
      `}
    >
      <span className="absolute top-1.5 left-2 text-[10px] text-gray-300 font-kanit font-bold">
        #{scenario.id}
      </span>
      <div className="text-3xl mb-1.5 mt-1">{scenario.icon}</div>
      <div className="text-[13px] font-medium leading-snug text-gray-700">
        {scenario.text}
      </div>
    </div>
  );
}
