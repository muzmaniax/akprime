"use client";

import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#0E3E3E",
            border: "1px solid rgba(55,180,180,0.35)",
            color: "#fff",
          },
        }}
      />
    </ReactLenis>
  );
}
