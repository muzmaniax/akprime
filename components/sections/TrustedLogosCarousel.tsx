"use client";

import Image from "next/image";

const partners = [
  { src: "/partners/partner-1.png", alt: "Partner 1" },
  { src: "/partners/partner-2.png", alt: "Partner 2" },
  { src: "/partners/partner-3.png", alt: "Partner 3" },
  { src: "/partners/partner-4.png", alt: "Partner 4" },
  { src: "/partners/partner-5.png", alt: "Partner 5" },
  { src: "/partners/partner-6.png", alt: "Partner 6" },
];

/* Used inside the Hero as an anchored strip */
export function TrustedLogosCarousel() {
  return (
    <div className="py-5 px-4">
      <p className="text-center text-[10px] font-semibold tracking-widest uppercase text-white/35 mb-4">
        Trusted by teams at
      </p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-8 gap-y-3 items-center max-w-3xl mx-auto">
        {partners.map((p) => (
          <div key={p.src} className="flex items-center justify-center">
            <Image
              src={p.src}
              alt={p.alt}
              width={100}
              height={30}
              className="h-6 w-auto object-contain grayscale brightness-[3] opacity-40 hover:opacity-70 transition-opacity"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
