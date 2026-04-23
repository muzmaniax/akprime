"use client";

import React from "react";

const partnerLogos = [
  "/partners/client-1.png",
  "/partners/client-2.png",
  "/partners/client-3.png",
  "/partners/client-4.png",
];

export function TrustedLogosCarousel() {
  // Duplicate array 4 times to loop seamlessly even on ultra-wide screens with only 4 logos
  const doubledLogos = [...partnerLogos, ...partnerLogos, ...partnerLogos, ...partnerLogos];

  return (
    <section className="py-8 bg-[#ffffff] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-sm font-medium text-[#3a5a5a]">
          Trusted by leading organisations
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center h-40 group">
        {/* Left/Right Fades for smooth edge blending */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex items-center gap-12 md:gap-20 px-4">
          {doubledLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[220px] sm:w-[280px] md:w-[320px] h-32 rounded-lg flex items-center justify-center px-4"
              style={{ background: "transparent" }}
            >
              <img
                src={logo}
                alt={`Client Logo ${idx + 1}`}
                className="max-w-full max-h-[108px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
