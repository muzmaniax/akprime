"use client";

import dynamic from "next/dynamic";
import { Toaster } from "sonner";

// PageLoader is pure UI — defer so it never blocks first paint or SSR
const PageLoader = dynamic(
  () => import("@/components/layout/PageLoader").then(m => ({ default: m.PageLoader })),
  { ssr: false }
);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageLoader />
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
