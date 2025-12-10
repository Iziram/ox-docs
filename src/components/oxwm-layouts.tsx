"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TileLayout } from "@/components/layouts/tile-layout";
import { MonocleLayout } from "@/components/layouts/monocle-layout";
import { GridLayout } from "@/components/layouts/grid-layout";
import { FloatingLayout } from "@/components/layouts/floating-layout";
import { TabbedLayout } from "@/components/layouts/tabbed-layout";

type LayoutType = "tiling" | "monocle" | "grid" | "normie" | "tabbed";

export function OxwmLayouts() {
  const [activeLayout, setActiveLayout] = useState<LayoutType>("tiling");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isAutoPlaying) {
      const layouts: LayoutType[] = ["tiling", "normie", "grid", "monocle", "tabbed"];

      autoPlayTimerRef.current = setInterval(() => {
        setActiveLayout((current) => {
          const currentIndex = layouts.indexOf(current);
          const nextIndex = (currentIndex + 1) % layouts.length;
          return layouts[nextIndex];
        });
      }, 4000);
    } else {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    }

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isAutoPlaying]);

  const handleLayoutChange = (layout: LayoutType) => {
    setActiveLayout(layout);
    setIsAutoPlaying(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
      <div className="flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
        <div className="inline-flex flex-wrap justify-end gap-1 rounded-2xl border border-fd-border bg-fd-muted p-1">
          <button
            type="button"
            onClick={() => handleLayoutChange("tiling")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeLayout === "tiling"
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Tiling
          </button>
          <button
            type="button"
            onClick={() => handleLayoutChange("normie")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeLayout === "normie"
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Normie
          </button>
          <button
            type="button"
            onClick={() => handleLayoutChange("grid")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeLayout === "grid"
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Grid
          </button>
          <button
            type="button"
            onClick={() => handleLayoutChange("monocle")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeLayout === "monocle"
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Monocle
          </button>
          <button
            type="button"
            onClick={() => handleLayoutChange("tabbed")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeLayout === "tabbed"
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Tabbed
          </button>
        </div>
      </div>

      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-fd-border bg-fd-background/50 shadow-sm">
        {activeLayout === "tiling" && <TileLayout />}
        {activeLayout === "normie" && <FloatingLayout />}
        {activeLayout === "grid" && <GridLayout />}
        {activeLayout === "monocle" && <MonocleLayout />}
        {activeLayout === "tabbed" && <TabbedLayout />}
      </div>
    </div>
  );
}
