import {
  Code2,
  Grid3X3,
  Keyboard,
  Monitor,
  RefreshCw,
  Zap,
} from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Lua Configuration",
    description:
      "Clean, functional API with full LSP support. Get autocomplete and type hints as you configure your window manager.",
  },
  {
    icon: RefreshCw,
    title: "Hot Reload",
    description:
      "Changes take effect immediately with Mod+Shift+R. No X restart or recompilation needed.",
  },
  {
    icon: Grid3X3,
    title: "Multiple Layouts",
    description:
      "Tiled, monocle, floating, and grid layouts with per-tag layout memory. Switch layouts on the fly.",
  },
  {
    icon: Keyboard,
    title: "Keychords",
    description:
      "Support for complex keybindings and chained key sequences. Create powerful shortcuts for your workflow.",
  },
  {
    icon: Monitor,
    title: "Multi-Monitor",
    description:
      "Full support for multiple displays with per-monitor tags and flexible window placement.",
  },
  {
    icon: Zap,
    title: "Lightweight",
    description:
      "Written in Zig for speed and safety. Minimal resource usage while staying feature-rich.",
  },
];

export function Highlights() {
  return (
    <section className="bg-fd-muted/30 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-balance font-bold text-3xl text-fd-foreground sm:text-4xl">
            Why Choose OXWM
          </h2>
          <p className="mx-auto max-w-2xl text-balance text-fd-muted-foreground text-lg">
            A modern X11 window manager that combines dwm&apos;s efficiency with a
            developer-friendly configuration experience.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight) => {
            const IconComponent = highlight.icon;
            return (
              <div
                key={highlight.title}
                className="rounded-lg border border-fd-border bg-fd-card p-6 transition-colors hover:border-fd-primary"
              >
                <div className="mb-3 flex items-center gap-3">
                  <IconComponent className="h-5 w-5 flex-shrink-0 text-fd-primary" />
                  <h3 className="font-bold text-fd-foreground text-lg">
                    {highlight.title}
                  </h3>
                </div>
                <p className="text-fd-muted-foreground leading-relaxed">
                  {highlight.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
