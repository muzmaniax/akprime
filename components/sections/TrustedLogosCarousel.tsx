"use client";

import React from "react";

const partnerLogos = Array.from({ length: 12 }, (_, i) => `Logo ${i + 1}`);

export function TrustedLogosCarousel() {
  // Duplicate array so it can loop seamlessly
  const doubledLogos = [...partnerLogos, ...partnerLogos];

  return (
    <section className="py-8 bg-[#ffffff] border-b border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
        <p className="text-sm font-medium text-[#3a5a5a]">
          Trusted by leading organisations
        </p>
      </div>

      <div className="relative w-full overflow-hidden flex items-center h-20 group">
        {/* Left/Right Fades for smooth edge blending */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="marquee-track flex items-center gap-8 md:gap-14 px-4">
          {doubledLogos.map((logo, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-[120px] md:w-[140px] aspect-[2.5/1] rounded-lg flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              style={{ background: "#F4FAFA", border: "1px solid rgba(0,0,0,0.05)" }}
            >
              <span className="text-[#3a5a5a] font-bold tracking-wider text-sm">
                {logo}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
