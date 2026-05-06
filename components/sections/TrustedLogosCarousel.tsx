"use client";

import Image from "next/image";

const partners = [
  { src: "/partners/partner-1.png", alt: "Coastal Image Tech", name: "Coastal Image Tech" },
  { src: "/partners/partner-2.png", alt: "Explosify", name: "Explosify" },
  { src: "/partners/partner-3.png", alt: "Maxfill", name: "Maxfill" },
  { src: "/partners/partner-4.png", alt: "MO Radio", name: "MO Radio" },
  { src: "/partners/partner-5.png", alt: "Seven Seas Connection Agency", name: "Seven Seas Connection" },
  { src: "/partners/partner-6.png", alt: "Step", name: "Step" },
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
              className="h-6 w-auto object-contain grayscale invert brightness-[1.2] opacity-70 hover:opacity-100 transition-opacity"
              unoptimized
            />
          </div>
        ))}
      </div>
    </div>
  );
}
