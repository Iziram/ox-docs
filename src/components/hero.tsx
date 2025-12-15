import Link from "next/link";
import Image from "next/image";
import { OxwmLayouts } from "@/components/oxwm-layouts";

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--fd-border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--fd-border))_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        {/* Left Column */}
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <Image
            src="/oxwm-white.svg"
            alt="OXWM Logo"
            width={300}
            height={300}
            className="mb-8 size-64 opacity-60 sm:size-80 md:size-96"
          />

          <p className="mb-8 max-w-xl text-balance text-center text-base text-fd-muted-foreground sm:text-lg md:text-xl lg:text-left">
            OXWM is a dynamic window manager written in Rust, inspired by dwm.
            Featuring a clean Lua API with hot-reload support, LSP autocomplete,
            and instant configuration changes without restarting X.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
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

        {/* Right Column */}
        <div className="flex flex-1 flex-col items-center lg:items-start">
          <h1 className="mb-8 text-balance text-center font-bold text-4xl text-fd-foreground leading-tight sm:text-5xl md:text-6xl lg:text-left lg:text-7xl">
            Functional, <span className="text-fd-primary">Oxidized</span>
          </h1>

          <OxwmLayouts />
        </div>
      </div>
    </section>
  );
}
