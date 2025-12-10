"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { CARD_ACTIVE, CARD_BASE, CARD_INACTIVE } from "./constants";

const TABBED_TIMINGS = [
  { phase: 0, delay: 0 },
  { phase: 1, delay: 500 },   // Spawn 1
  { phase: 2, delay: 1500 },  // Spawn 2
  { phase: 3, delay: 2500 },  // Spawn 3
  { phase: 4, delay: 3500 },  // Switch to 2
  { phase: 5, delay: 4500 },  // Switch to 3
  { phase: 6, delay: 5500 },  // Switch to 1
  { phase: 7, delay: 6500 },  // Despawn 3
  { phase: 8, delay: 7500 },  // Despawn 2
];
const TABBED_DURATION = 9000;

export function TabbedLayout() {
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

      const tabBarHeight = 32;
      const contentY = tabBarHeight + 8;
      const contentHeight = height - contentY;

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

      // All windows are in the same position, stacked
      const winX = 0;
      const winY = contentY;
      const winW = width;
      const winH = contentHeight;

      let activeWindows = 0;
      if (phase >= 1) activeWindows = 1;
      if (phase >= 2) activeWindows = 2;
      if (phase >= 3 && phase <= 6) activeWindows = 3;
      if (phase === 7) activeWindows = 2;
      if (phase >= 8) activeWindows = 1;

      // Which window is on top/focused
      let focusedWindow = 1;
      if (phase === 2 || phase === 4 || phase === 7 || phase === 8) focusedWindow = 2;
      else if (phase === 3 || phase === 5) focusedWindow = 3;
      else focusedWindow = 1;

      // Only the focused window is visible in tabbed layout
      set(r1.current, winX, winY, winW, winH, phase > 0 && phase < 8 && focusedWindow === 1, focusedWindow === 1);
      set(r2.current, winX, winY, winW, winH, phase >= 2 && phase < 8 && focusedWindow === 2, focusedWindow === 2);
      set(r3.current, winX, winY, winW, winH, phase >= 3 && phase < 7 && focusedWindow === 3, focusedWindow === 3);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(containerRef.current as Element);
    return () => ro.disconnect();
  }, [phase]);

  useEffect(() => {
    const timeouts = TABBED_TIMINGS.map((t) => setTimeout(() => setPhase(t.phase), t.delay));
    const loop = setTimeout(() => setLoopKey((k) => k + 1), TABBED_DURATION);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(loop);
    };
  }, [loopKey]);

  // Render tab bar
  let activeWindows = 0;
  if (phase >= 1) activeWindows = 1;
  if (phase >= 2) activeWindows = 2;
  if (phase >= 3 && phase <= 6) activeWindows = 3;
  if (phase === 7) activeWindows = 2;
  if (phase >= 8) activeWindows = 1;

  let focusedWindow = 1;
  if (phase === 2 || phase === 4 || phase === 7 || phase === 8) focusedWindow = 2;
  else if (phase === 3 || phase === 5) focusedWindow = 3;
  else focusedWindow = 1;

  return (
    <div ref={containerRef} className="relative h-full w-full overflow-hidden p-4">
      {/* Tab bar */}
      <div className="absolute top-4 left-4 right-4 flex gap-1 h-8">
        {activeWindows >= 1 && (
          <div
            className={cn(
              "px-3 py-1 rounded-t text-sm transition-colors",
              focusedWindow === 1
                ? "bg-fd-primary text-fd-primary-foreground"
                : "bg-fd-muted text-fd-muted-foreground"
            )}
          >
            1
          </div>
        )}
        {activeWindows >= 2 && (
          <div
            className={cn(
              "px-3 py-1 rounded-t text-sm transition-colors",
              focusedWindow === 2
                ? "bg-fd-primary text-fd-primary-foreground"
                : "bg-fd-muted text-fd-muted-foreground"
            )}
          >
            2
          </div>
        )}
        {activeWindows >= 3 && (
          <div
            className={cn(
              "px-3 py-1 rounded-t text-sm transition-colors",
              focusedWindow === 3
                ? "bg-fd-primary text-fd-primary-foreground"
                : "bg-fd-muted text-fd-muted-foreground"
            )}
          >
            3
          </div>
        )}
      </div>

      {/* Windows */}
      <div ref={r1} className="absolute opacity-0">1</div>
      <div ref={r2} className="absolute opacity-0">2</div>
      <div ref={r3} className="absolute opacity-0">3</div>
    </div>
  );
}
