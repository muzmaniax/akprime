"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useSiteImage } from "@/lib/use-site-images";

/*
 * Figma reference: node 144:166, canvas 1920px wide.
 * We target ~1280px viewport width and ~650px viewport height (browser chrome
 * typically eats ~90px from a 768px screen, plus navbar ~64px).
 * vw() clamps between a comfortable minimum and the Figma maximum.
 */
function vw(px: number, min: number) {
  return `clamp(${min}px, ${((px / 1920) * 100).toFixed(3)}vw, ${px}px)`;
}

/*
 * Logo set: 6 logos, widths sum = 500.18px, 5 internal gaps × 63px = 315px,
 * 1 inter-set gap = 63px → one full set = 878px. Translate -878px for seamless loop.
 */
const LOGOS = [
  { src: "/partners/partner-step.png",      alt: "Step Innovations Africa",      w: 95,     h: 37    },
  { src: "/partners/partner-coastal.png",   alt: "Coastal Image Technologies",   w: 107.48, h: 34.57 },
  { src: "/partners/partner-explosify.png", alt: "Explosify",                    w: 98.70,  h: 22.84 },
  { src: "/partners/partner-moradio.png",   alt: "MO Radio",                     w: 51,     h: 40.91 },
  { src: "/partners/partner-maxfill.png",   alt: "Maxfill Energy Limited",       w: 80,     h: 41    },
  { src: "/partners/partner-sevenseas.png", alt: "Seven Seas Connection Agency", w: 68,     h: 53    },
];

export function HeroSection({ onBooking }: { onBooking?: () => void }) {
  const heroBg = useSiteImage("hero.background");
  const bgSrc = heroBg || "/images/hero-coins.jpg";

  return (
    <section
      className="relative overflow-hidden w-full"
      /* dvh accounts for mobile browser bars; on desktop = vh */
      style={{ height: "calc(100dvh - var(--navbar-h, 64px))" }}
    >
      {/* ── Keyframe animations ── */}
      <style>{`
        @keyframes ken-burns {
          from { transform: scale(1);    }
          to   { transform: scale(1.08); }
        }
        @keyframes marquee-scroll {
          from { transform: translateX(0);     }
          to   { transform: translateX(-878px); }
        }
        @keyframes marquee-scroll-mobile {
          from { transform: translateX(0);     }
          to   { transform: translateX(-540px); }
        }
        @keyframes bounce-y {
          0%, 100% { transform: translateY(0);   opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 1;   }
        }
        /* Mobile: pan image right so the dramatic coins fill the frame */
        @media (max-width: 1023px) {
          .hero-bg { background-position: 70% center; }
        }
      `}</style>

      {/* ── Background photo with Ken Burns slow zoom ── */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hero-bg"
        style={{
          backgroundImage: `url('${bgSrc}')`,
          animation: "ken-burns 22s ease-out forwards",
          willChange: "transform",
        }}
      />

      {/* ── Desktop gradient ── */}
      <div
        className="absolute inset-0 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: [
            "linear-gradient(180deg, rgba(0,0,0,0.215) 64.767%, rgba(0,0,0,0.86) 94.252%)",
            "linear-gradient(89.57deg, rgba(0,0,0,0.3) 2.315%, rgba(0,0,0,0) 67.248%)",
          ].join(", "),
        }}
      />
      {/* ── Mobile gradient — stronger bottom-up fade for text legibility ── */}
      <div
        className="absolute inset-0 pointer-events-none lg:hidden"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* ══════════════════════════════════════
          DESKTOP (≥ 1024px)
          Content: left 79px, top 37.9% (372/981)
          Trusted By: centred, pinned bottom
      ══════════════════════════════════════ */}

      {/* Content block — node 144:179 */}
      <div
        className="absolute inset-x-0 z-10 hidden lg:block"
        style={{ top: "clamp(110px, 28%, 340px)" }}
      >
        <div className="container-x">
          <div className="max-w-[1060px] mx-auto">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: vw(28, 20),
            maxWidth: vw(620, 280),
          }}
        >
        {/* Text group */}
        <div style={{ display: "flex", flexDirection: "column", gap: vw(16, 12) }}>
          {/* Headline */}
          <p
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontWeight: 500,
              fontSize: vw(46, 24),
              lineHeight: 1.08,
              letterSpacing: "-0.04em",
              color: "white",
              wordWrap: "break-word",
              textShadow:
                "0px 7px 15px rgba(0,0,0,0.08), 0px 27px 27px rgba(0,0,0,0.07), 0px 62px 37px rgba(0,0,0,0.04), 0px 110px 44px rgba(0,0,0,0.01), 0px 172px 48px rgba(0,0,0,0)",
            }}
          >
            Built for organisations that hold themselves to<br />a higher standard.
          </p>

          {/* Body */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: vw(15, 13),
              lineHeight: 1.6,
              letterSpacing: "0em",
              color: "rgba(255,255,255,0.68)",
              maxWidth: vw(420, 260),
              wordWrap: "break-word",
            }}
          >
            Senior advisory for leadership teams who need<br />financial discipline, operational clarity, and systems that scale.
          </p>
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: vw(10, 8) }}>
          <button
            type="button"
            onClick={onBooking}
            style={{
              height: vw(40, 36),
              padding: `0 ${vw(18, 16)}`,
              background: "#37b4b4",
              border: "1px solid #36c0c0",
              borderRadius: 7,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: vw(13, 13), lineHeight: 1, letterSpacing: "-0.01em", color: "#0a3030", whiteSpace: "nowrap" }}>
              Book a Call
            </span>
          </button>
          <Link
            href="/contact"
            style={{
              height: vw(40, 36),
              padding: `0 ${vw(18, 16)}`,
              background: "rgba(227,227,227,0.1)",
              border: "1px solid #767676",
              borderRadius: 7,
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: vw(13, 13), lineHeight: 1, letterSpacing: "-0.01em", color: "white", whiteSpace: "nowrap" }}>
              Contact
            </span>
          </Link>
        </div>
        </div>
          </div>
        </div>
      </div>

      {/* Trusted By — desktop, animated marquee, pinned bottom */}
      <div
        className="absolute z-10 hidden lg:flex flex-col items-center"
        style={{
          left: "50%",
          transform: "translateX(-50%) scale(0.813)",
          transformOrigin: "bottom center",
          bottom: "32px",
          width: "816px",
        }}
      >
        {/* "TRUSTED BY:" label */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            fontSize: 14,
            lineHeight: 1,
            color: "white",
            textAlign: "center",
            marginBottom: 8,
            textShadow:
              "0px 1px 3px rgba(0,0,0,0.29), 0px 5px 5px rgba(0,0,0,0.26), 0px 12px 7px rgba(0,0,0,0.15), 0px 21px 8px rgba(0,0,0,0.04), 0px 33px 9px rgba(0,0,0,0.01)",
          }}
        >
          TRUSTED BY:
        </p>

        {/* Marquee track — overflow hidden + side gradient masks */}
        <div
          style={{
            width: "100%",
            height: 53,
            overflow: "hidden",
            maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          {/* Animated track — logos doubled for seamless loop */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 63,
              height: 53,
              opacity: 0.70,
              width: "max-content",
              animation: "marquee-scroll 25s linear infinite",
              willChange: "transform",
            }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <img
                key={i}
                src={logo.src}
                alt={logo.alt}
                style={{ width: logo.w, height: logo.h, objectFit: "contain", flexShrink: 0 }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — desktop only, bounces gently */}
      <div
        className="absolute z-10 hidden lg:flex flex-col items-center gap-1"
        style={{ left: "50%", transform: "translateX(-50%)", bottom: "104px" }}
      >
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          style={{
            color: "rgba(255,255,255,0.45)",
            animation: "bounce-y 2s ease-in-out infinite",
          }}
        />
      </div>

      {/* ══════════════════════════════════════
          MOBILE (< 1024px)
      ══════════════════════════════════════ */}
      <div className="lg:hidden absolute inset-0 z-10 flex flex-col justify-end px-5 pb-5">
        <div className="flex flex-col gap-3 mb-5">
          <p
            style={{
              fontFamily: "'Funnel Display', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(22px, 5.5vw, 32px)",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "white",
            }}
          >
            Built for organisations<br />that hold themselves to<br />a higher standard.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              lineHeight: 1.6,
              letterSpacing: "0em",
              color: "rgba(255,255,255,0.68)",
              maxWidth: 300,
            }}
          >
            Senior advisory for leadership teams who need<br />financial discipline, operational clarity, and systems that scale.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={onBooking}
              style={{ height: 36, padding: "0 16px", background: "#37b4b4", border: "1px solid #36c0c0", borderRadius: 7, color: "#0a3030", fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em", cursor: "pointer", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
            >
              Book a Call
            </button>
            <Link
              href="/contact"
              style={{ height: 36, padding: "0 16px", background: "rgba(227,227,227,0.1)", border: "1px solid #767676", borderRadius: 7, color: "white", fontSize: 13, fontWeight: 500, fontFamily: "'Inter', sans-serif", letterSpacing: "-0.01em", boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", whiteSpace: "nowrap", textDecoration: "none" }}
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Trusted By — mobile marquee */}
        <div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,0.65)", textAlign: "center", letterSpacing: "0.1em", marginBottom: 8 }}>
            TRUSTED BY:
          </p>
          {/* Mobile marquee — narrower logos, faster scroll */}
          <div
            style={{
              width: "100%",
              height: 36,
              overflow: "hidden",
              maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 32,
                height: 36,
                opacity: 0.7,
                width: "max-content",
                animation: "marquee-scroll-mobile 20s linear infinite",
                willChange: "transform",
              }}
            >
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <img
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  style={{ height: Math.round(logo.h * 0.6), width: "auto", objectFit: "contain", flexShrink: 0 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
