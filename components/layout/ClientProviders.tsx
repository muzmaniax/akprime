"use client";

import { ReactLenis } from "lenis/react";
import { Toaster } from "sonner";
import { useI18n } from "@/lib/i18n/context";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const { dir } = useI18n();

  return (
    <ReactLenis root options={{ lerp: 0.075, duration: 1.1, smoothWheel: true, wheelMultiplier: 1.0, touchMultiplier: 1.8 }}>
      {children}
      <Toaster
        dir={dir}
        position={dir === "rtl" ? "bottom-left" : "bottom-right"}
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
