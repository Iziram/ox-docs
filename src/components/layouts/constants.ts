export const TIMINGS = [
  { phase: 0, delay: 0 },
  { phase: 1, delay: 500 },   // Spawn 1
  { phase: 2, delay: 1500 },  // Spawn 2
  { phase: 3, delay: 2500 },  // Spawn 3
  { phase: 4, delay: 4000 },  // Swap
  { phase: 5, delay: 5000 },  // Return
  { phase: 6, delay: 6000 },  // Despawn 3
  { phase: 7, delay: 7000 },  // Despawn 2
  { phase: 8, delay: 8000 },  // Despawn 1
];
export const TOTAL_DURATION = 9500;

export const CARD_BASE =
  "absolute flex items-center justify-center text-4xl font-bold rounded-xl transition-colors will-change-[left,top,width,height,opacity,transform]";
export const CARD_ACTIVE =
  "border-4 border-fd-primary bg-fd-primary/10 text-fd-primary shadow-2xl z-20";
export const CARD_INACTIVE =
  "border-2 border-fd-border bg-fd-muted text-fd-muted-foreground z-10";
