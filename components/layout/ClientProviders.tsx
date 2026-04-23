"use client";

import { Toaster } from "sonner";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
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
    </>
  );
}
