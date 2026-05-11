"use client";

import Image from "next/image";

/* Per-logo sizing — tuned to visual weight, not uniform height.
   Aspect ratios: Coastal 2.44 | Explosify 4.06 | Maxfill 1.96 | MO Radio 1.27 | Seven Seas 1.30 | Step 2.55
   Goal: equal perceived area + readable at strip scale.
   mix-blend-screen + grayscale + invert → white logo backgrounds dissolve into dark hero. */
const partners = [
  {
    src: "/partners/partner-1.png",
    alt: "Coastal Image Technologies",
    w: 661, h: 271,
    // 2.44:1 — icon+text side by side. h-9 gives 36px → 88px wide. Reads well.
    imgClass: "h-9 w-auto max-w-[100px]",
  },
  {
    src: "/partners/partner-2.png",
    alt: "Explosify",
    w: 727, h: 179,
    // 4.06:1 — thin wordmark, reference logo. h-7 → 28px tall × 114px wide (capped).
    imgClass: "h-7 w-auto max-w-[100px]",
  },
  {
    src: "/partners/partner-3.png",
    alt: "Maxfill Energy Limited",
    w: 689, h: 351,
    // 1.96:1 — flame icon + stacked text. h-11 → 44px tall × 86px wide. Flame readable.
    imgClass: "h-11 w-auto max-w-[100px]",
  },
  {
    src: "/partners/partner-4.png",
    alt: "MO Radio",
    w: 388, h: 305,
    // 1.27:1 — near-square stacked mark. h-14 → 56px tall × 71px wide. Headphones + text legible.
    imgClass: "h-14 w-auto max-w-[72px]",
  },
  {
    src: "/partners/partner-5.png",
    alt: "Seven Seas Connection Agency",
    w: 395, h: 305,
    // 1.30:1 — near-square globe + text. h-14 → 56px tall × 73px wide. Globe + text legible.
    imgClass: "h-14 w-auto max-w-[72px]",
  },
  {
    src: "/partners/partner-6.png",
    alt: "Step Innovations Africa",
    w: 695, h: 273,
    // 2.55:1 — geometric icon + stacked text. h-11 → 44px tall × 112px wide (capped).
    imgClass: "h-11 w-auto max-w-[110px]",
  },
];

export function TrustedLogosCarousel() {
  return (
    <div className="py-5 px-4">
      <p className="text-center text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-5">
        Trusted by teams at
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-6 gap-y-5 items-center justify-items-center max-w-3xl mx-auto">
        {partners.map((p) => (
          <div key={p.src} className="flex items-center justify-center w-full">
            <Image
              src={p.src}
              alt={p.alt}
              width={p.w}
              height={p.h}
              className={`${p.imgClass} object-contain grayscale invert mix-blend-screen opacity-60 hover:opacity-90 transition-opacity duration-300`}
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
