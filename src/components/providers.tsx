"use client";

import { RootProvider } from "fumadocs-ui/provider/next";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <RootProvider
      theme={{ enabled: false }}
      search={{
        hotKey: [{ display: "Ctrl K", key: (e) => e.ctrlKey && e.key === "k" }],
      }}
    >
      {children}
    </RootProvider>
  );
}
