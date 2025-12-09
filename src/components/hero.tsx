import Link from "next/link";
import { OxwmLayouts } from "@/components/oxwm-layouts";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--fd-border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--fd-border))_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-14 lg:flex-row lg:items-center lg:gap-20">
        {/* Left Column */}
        <div className="flex-1 text-center lg:text-left">
<h1 className="mb-6 text-balance font-bold text-4xl text-fd-foreground leading-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Functional, <span className="text-fd-primary">Oxidized</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-balance text-base text-fd-muted-foreground sm:text-lg md:text-xl lg:mx-0">
            OXWM is a dynamic window manager written in Rust, inspired by dwm.
            Featuring a clean Lua API with hot-reload support, LSP autocomplete,
            and instant configuration changes without restarting X.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/docs/installation"
              className="rounded-full bg-fd-primary px-8 py-3 font-semibold text-fd-primary-foreground shadow-lg shadow-fd-primary/20 transition-transform hover:scale-[1.04] hover:opacity-90"
            >
              Get Started
            </Link>

            <Link
              href="https://github.com/tonybanters/oxwm"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-fd-border bg-fd-background/60 px-8 py-3 font-semibold text-fd-foreground backdrop-blur-md transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground"
            >
              View on GitHub
            </Link>
          </div>
        </div>

        {/* Right Column - Layout Preview */}
        <div className="w-full flex-1 lg:max-w-[55%]">
          <OxwmLayouts />
        </div>
      </div>
    </section>
  );
}
