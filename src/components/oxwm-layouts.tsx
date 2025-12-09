"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { TileLayout } from "@/components/layouts/tile-layout";
import { MonocleLayout } from "@/components/layouts/monocle-layout";
import { GridLayout } from "@/components/layouts/grid-layout";
import { FloatingLayout } from "@/components/layouts/floating-layout";

type LayoutType = "tiled" | "monocle" | "grid" | "floating";

export function OxwmLayouts() {
  const [activeLayout, setActiveLayout] = useState<LayoutType>("tiled");
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const supportsOrientation = activeLayout === "tiled" || activeLayout === "grid";

  useEffect(() => {
    if (isAutoPlaying) {
      const layouts: LayoutType[] = ["tiled", "monocle", "grid", "floating"];

      autoPlayTimerRef.current = setInterval(() => {
        setActiveLayout((current) => {
          const currentIndex = layouts.indexOf(current);
          const nextIndex = (currentIndex + 1) % layouts.length;
          return layouts[nextIndex];
        });
        setOrientation("horizontal");
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

  const handleOrientationChange = (newOrientation: typeof orientation) => {
    setOrientation(newOrientation);
    setIsAutoPlaying(false);
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
      <div className="flex flex-col items-end gap-2 sm:flex-row sm:justify-end">
        <div className="inline-flex flex-wrap justify-end gap-1 rounded-2xl border border-fd-border bg-fd-muted p-1">
          <button
            type="button"
            onClick={() => handleLayoutChange("tiled")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeLayout === "tiled"
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Tiled
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
            onClick={() => handleLayoutChange("floating")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              activeLayout === "floating"
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Floating
          </button>
        </div>

        <div
          className={cn(
            "inline-flex rounded-full border border-fd-border bg-fd-muted p-1 transition-opacity",
            !supportsOrientation ? "pointer-events-none opacity-50" : ""
          )}
        >
          <button
            type="button"
            onClick={() => handleOrientationChange("horizontal")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              orientation === "horizontal" && supportsOrientation
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Horizontal
          </button>
          <button
            type="button"
            onClick={() => handleOrientationChange("vertical")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-1.5 font-medium text-sm transition-all",
              orientation === "vertical" && supportsOrientation
                ? "bg-fd-background text-fd-primary shadow-sm"
                : "text-fd-muted-foreground hover:text-fd-foreground"
            )}
          >
            Vertical
          </button>
        </div>
      </div>

      <div className="relative aspect-[3/2] w-full overflow-hidden rounded-xl border border-fd-border bg-fd-background/50 shadow-sm">
        {activeLayout === "tiled" && <TileLayout orientation={orientation} />}
        {activeLayout === "monocle" && <MonocleLayout />}
        {activeLayout === "grid" && <GridLayout orientation={orientation} />}
        {activeLayout === "floating" && <FloatingLayout />}
      </div>
    </div>
  );
}
