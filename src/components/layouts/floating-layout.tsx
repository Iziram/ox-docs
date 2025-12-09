"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CARD_ACTIVE, CARD_BASE, CARD_INACTIVE } from "./constants";

const FLOATING_TIMINGS = [
  { phase: 0, delay: 0 },
  { phase: 1, delay: 500 },   // Spawn 1
  { phase: 2, delay: 1500 },  // Spawn 2
  { phase: 3, delay: 2500 },  // Spawn 3
  { phase: 4, delay: 4000 },  // Move windows
  { phase: 5, delay: 5500 },  // Return
  { phase: 6, delay: 6500 },  // Despawn 3
  { phase: 7, delay: 7500 },  // Despawn 2
  { phase: 8, delay: 8500 },  // Despawn 1
];
const FLOATING_DURATION = 10000;

export function FloatingLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);
  const r3 = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    [r1, r2, r3].forEach((ref) => {
      if (ref.current) {
        ref.current.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      }
    });
  }, []);

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

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

      // Floating windows with overlapping, random-ish positions
      const winW = width * 0.45;
      const winH = height * 0.5;

      // Position 1: top-left area
      const pos1 = { x: width * 0.05, y: height * 0.08, w: winW, h: winH };
      // Position 2: center-right, overlapping
      const pos2 = { x: width * 0.3, y: height * 0.2, w: winW, h: winH };
      // Position 3: bottom-right, overlapping both
      const pos3 = { x: width * 0.45, y: height * 0.35, w: winW, h: winH };

      // Alternative positions for phase 4 (moved)
      const pos1Alt = { x: width * 0.1, y: height * 0.3, w: winW, h: winH };
      const pos2Alt = { x: width * 0.35, y: height * 0.05, w: winW, h: winH };
      const pos3Alt = { x: width * 0.4, y: height * 0.4, w: winW, h: winH };

      const isMoved = phase === 4;

      let focusedWindow = 1;
      if (phase === 2) focusedWindow = 2;
      else if (phase >= 3 && phase <= 5) focusedWindow = 3;
      else if (phase === 6) focusedWindow = 2;
      else if (phase >= 7) focusedWindow = 1;

      const p1 = isMoved ? pos1Alt : pos1;
      const p2 = isMoved ? pos2Alt : pos2;
      const p3 = isMoved ? pos3Alt : pos3;

      set(r1.current, p1.x, p1.y, p1.w, p1.h, phase > 0 && phase < 8, focusedWindow === 1);
      set(r2.current, p2.x, p2.y, p2.w, p2.h, phase >= 2 && phase < 7, focusedWindow === 2);
      set(r3.current, p3.x, p3.y, p3.w, p3.h, phase >= 3 && phase < 6, focusedWindow === 3);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, [phase]);

  useEffect(() => {
    const timeouts = FLOATING_TIMINGS.map((t) => setTimeout(() => setPhase(t.phase), t.delay));
    const loop = setTimeout(() => setLoopKey((k) => k + 1), FLOATING_DURATION);
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
    </div>
  );
}
