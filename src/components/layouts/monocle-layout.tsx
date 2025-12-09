"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CARD_ACTIVE, CARD_BASE, CARD_INACTIVE } from "./constants";

const MONOCLE_TIMINGS = [
  { phase: 0, delay: 0 },
  { phase: 1, delay: 500 },
  { phase: 2, delay: 1500 },
  { phase: 7, delay: 2500 },
  { phase: 8, delay: 3500 },
];
const MONOCLE_DURATION = 6500;

export function MonocleLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const r1 = useRef<HTMLDivElement>(null);
  const r2 = useRef<HTMLDivElement>(null);

  const [phase, setPhase] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  useEffect(() => {
    [r1, r2].forEach((ref) => {
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

      const set = (el: HTMLDivElement | null, visible: boolean, active: boolean) => {
        if (!el) return;
        el.style.left = "0px";
        el.style.top = "0px";
        el.style.width = `${width}px`;
        el.style.height = `${height}px`;
        el.style.opacity = visible ? "1" : "0";
        el.style.transform = visible ? "scale(1)" : "scale(0.9)";
        el.className = cn(CARD_BASE, active ? CARD_ACTIVE : CARD_INACTIVE);
      };

      const r1Visible = phase >= 1 && phase < 8;
      const r1Active = phase === 1 || phase === 7;
      set(r1.current, r1Visible, r1Active);

      const r2Visible = phase >= 2 && phase < 7;
      const r2Active = r2Visible;
      set(r2.current, r2Visible, r2Active);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, [phase]);

  useEffect(() => {
    const timeouts = MONOCLE_TIMINGS.map((t) => setTimeout(() => setPhase(t.phase), t.delay));
    const loop = setTimeout(() => setLoopKey((k) => k + 1), MONOCLE_DURATION);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(loop);
    };
  }, [loopKey]);

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden p-4">
      <div ref={r1} className="absolute opacity-0">1</div>
      <div ref={r2} className="absolute opacity-0">2</div>
    </div>
  );
}
