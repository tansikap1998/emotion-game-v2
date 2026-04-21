"use client";

import { useEffect, useRef } from "react";

const COLORS = ["#FFD54F","#4CAF50","#2196F3","#F44336","#9C27B0","#FF9800","#E91E63","#00BCD4"];

export function spawnConfetti(count = 24) {
  const container = document.createElement("div");
  container.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;";
  for (let i = 0; i < count; i++) {
    const p = document.createElement("div");
    const size = 8 + Math.random() * 8;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;
      left:${Math.random() * 100}vw;
      top:-20px;
      background:${COLORS[Math.floor(Math.random() * COLORS.length)]};
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      animation:fall ${1 + Math.random() * 1.5}s ${Math.random() * 0.5}s linear forwards;
    `;
    container.appendChild(p);
  }
  document.body.appendChild(container);
  setTimeout(() => container.remove(), 3000);
}
