"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  CARD_ACTIVE,
  CARD_BASE,
  CARD_INACTIVE,
  TOTAL_DURATION,
} from "./constants";

const SCROLL_TIMINGS = [
  { phase: 0, delay: 0 },
  { phase: 1, delay: 500 },
  { phase: 2, delay: 1500 },
  { phase: 3, delay: 2500 },
  { phase: 4, delay: 3500 },
  { phase: 5, delay: 5000 },
  { phase: 6, delay: 6500 },
  { phase: 7, delay: 7500 },
  { phase: 8, delay: 8500 },
];

export function ScrollingLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);
  const r4 = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    [r1, r2, r3, r4].forEach((ref) => {
      if (ref.current) {
        ref.current.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    });
  }, []);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      const gap = 16;

      const visibleCount = 2;
      const cardWidth = (width - gap * (visibleCount - 1)) / visibleCount;

      const set = (
        el: HTMLDivElement | null,
        x: number,
        y: number,
        w: number,
        h: number,
        visible: boolean,
        active: boolean
      ) => {
        if (!el) return;
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        el.style.opacity = visible ? "1" : "0";
        el.style.transform = visible ? "scale(1)" : "scale(0.9)";
        el.className = cn(CARD_BASE, active ? CARD_ACTIVE : CARD_INACTIVE);
      };

      let activeWindows = 0;
      if (phase >= 1) activeWindows = 1;
      if (phase >= 2) activeWindows = 2;
      if (phase >= 3) activeWindows = 3;
      if (phase >= 4) activeWindows = 4;
      if (phase === 7) activeWindows = 3;
      if (phase >= 8) activeWindows = 2;

      let focusedWindow = 1;
      if (phase === 2) focusedWindow = 2;
      if (phase === 3) focusedWindow = 3;
      if (phase >= 4 && phase <= 6) focusedWindow = 4;
      if (phase === 7) focusedWindow = 3;
      if (phase >= 8) focusedWindow = 2;

      let scrollOffset = 0;
      if (phase >= 3 && phase <= 4) scrollOffset = 1;
      if (phase >= 5 && phase <= 6) scrollOffset = 2;
      if (phase === 7) scrollOffset = 1;
      if (phase >= 8) scrollOffset = 0;

      const baseX = -scrollOffset * (cardWidth + gap);

      set(r1.current, baseX, 0, cardWidth, height, phase >= 1 && phase < 8, focusedWindow === 1);
      set(r2.current, baseX + cardWidth + gap, 0, cardWidth, height, phase >= 2, focusedWindow === 2);
      set(r3.current, baseX + 2 * (cardWidth + gap), 0, cardWidth, height, phase >= 3 && phase < 8, focusedWindow === 3);
      set(r4.current, baseX + 3 * (cardWidth + gap), 0, cardWidth, height, phase >= 4 && phase < 7, focusedWindow === 4);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, [phase]);

  useEffect(() => {
    const timeouts = SCROLL_TIMINGS.map((t) => setTimeout(() => setPhase(t.phase), t.delay));
    const loop = setTimeout(() => setLoopKey((k) => k + 1), TOTAL_DURATION);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(loop);
    };
  }, [loopKey]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden p-4">
      <div ref={r1} className="absolute opacity-0">1</div>
      <div ref={r2} className="absolute opacity-0">2</div>
      <div ref={r3} className="absolute opacity-0">3</div>
      <div ref={r4} className="absolute opacity-0">4</div>
    </div>
  );
}
