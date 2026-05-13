"use client";

import Image from "next/image";
import { useSiteImage } from "@/lib/use-site-images";

/* Per-logo sizing — tuned to visual weight, not uniform height.
   Aspect ratios: Coastal 2.44 | Explosify 4.06 | Maxfill 1.96 | MO Radio 1.27 | Seven Seas 1.30 | Step 2.55
   Goal: equal perceived area + readable at strip scale.
   mix-blend-screen + grayscale + invert → white logo backgrounds dissolve into dark hero. */
const PARTNER_META = [
  { alt: "Coastal Image Technologies",  w: 661, h: 271, imgClass: "h-9 w-auto max-w-[100px]",  fallback: "/partners/partner-1.png" },
  { alt: "Explosify",                   w: 727, h: 179, imgClass: "h-7 w-auto max-w-[100px]",  fallback: "/partners/partner-2.png" },
  { alt: "Maxfill Energy Limited",      w: 689, h: 351, imgClass: "h-11 w-auto max-w-[100px]", fallback: "/partners/partner-3.png" },
  { alt: "MO Radio",                    w: 388, h: 305, imgClass: "h-14 w-auto max-w-[72px]",  fallback: "/partners/partner-4.png" },
  { alt: "Seven Seas Connection Agency",w: 395, h: 305, imgClass: "h-14 w-auto max-w-[72px]",  fallback: "/partners/partner-5.png" },
  { alt: "Step Innovations Africa",     w: 695, h: 273, imgClass: "h-11 w-auto max-w-[110px]", fallback: "/partners/partner-6.png" },
];

export function TrustedLogosCarousel({ label }: { label?: string }) {
  const p1 = useSiteImage("partner.1");
  const p2 = useSiteImage("partner.2");
  const p3 = useSiteImage("partner.3");
  const p4 = useSiteImage("partner.4");
  const p5 = useSiteImage("partner.5");
  const p6 = useSiteImage("partner.6");

  const srcs = [p1, p2, p3, p4, p5, p6];

  return (
    <div className="py-5 px-4">
      <p className="text-center text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-5">
        {label ?? "Trusted by teams at"}
      </p>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-6 gap-y-5 items-center justify-items-center max-w-3xl mx-auto">
        {PARTNER_META.map((p, i) => {
          const src = srcs[i] || p.fallback;
          return (
            <div key={i} className="flex items-center justify-center w-full">
              <Image
                src={src}
                alt={p.alt}
                width={p.w}
                height={p.h}
                className={`${p.imgClass} object-contain grayscale invert mix-blend-screen opacity-60 hover:opacity-90 transition-opacity duration-300`}
                unoptimized
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
