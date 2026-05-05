"use client";

import Image from "next/image";
import { Reveal } from "@/components/ui/Primitives";

const partners = [
  { src: "/partners/partner-1.png", alt: "Partner 1" },
  { src: "/partners/partner-2.png", alt: "Partner 2" },
  { src: "/partners/partner-3.png", alt: "Partner 3" },
  { src: "/partners/partner-4.png", alt: "Partner 4" },
  { src: "/partners/partner-5.png", alt: "Partner 5" },
  { src: "/partners/partner-6.png", alt: "Partner 6" },
];

export function TrustedLogosCarousel() {
  return (
    <section className="section-dark py-14 border-t border-white/[0.06]">
      <div className="container-x">
        <Reveal>
          <div className="text-center text-[12px] uppercase tracking-label text-white/45 mb-8">
            Trusted by teams at
          </div>
        </Reveal>
        <Reveal delay={80}>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-8 gap-y-6 items-center">
            {partners.map((p) => (
              <div key={p.src} className="flex items-center justify-center opacity-50 hover:opacity-90 transition-opacity">
                <Image
                  src={p.src}
                  alt={p.alt}
                  width={120}
                  height={36}
                  className="h-7 w-auto object-contain grayscale brightness-200 invert"
                />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
