"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useSiteImage } from "@/lib/use-site-images";
import { MagneticWrapper } from "@/components/ui/Primitives";
import { useI18n } from "@/lib/i18n/context";
import { HeroThreeBackground } from "./HeroThreeBackground";
import { useEffect } from "react";
import anime from "animejs";

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
 * Logo set: 6 logos, widths sum = 500.18px, 5 internal gaps x 63px = 315px,
 * 1 inter-set gap = 63px -> one full set = 878px. Translate -878px for seamless loop.
 */
const LOGOS = [
  { src: "/partners/partner-step.webp",      alt: "Step Innovations Africa",      w: 95,     h: 37    },
  { src: "/partners/partner-coastal.webp",   alt: "Coastal Image Technologies",   w: 107.48, h: 34.57 },
  { src: "/partners/partner-explosify.webp", alt: "Explosify",                    w: 98.70,  h: 22.84 },
  { src: "/partners/partner-moradio.webp",   alt: "MO Radio",                     w: 51,     h: 40.91 },
  { src: "/partners/partner-maxfill.webp",   alt: "Maxfill Energy Limited",       w: 80,     h: 41    },
  { src: "/partners/partner-sevenseas.webp", alt: "Seven Seas Connection Agency", w: 68,     h: 53    },
];

export function HeroSection({ onBooking }: { onBooking?: () => void }) {
  const { locale, isRTL, t } = useI18n();
  const heroBg = useSiteImage("hero.background");
  const bgSrc = heroBg || "/images/hero-coins.webp";

  useEffect(() => {
    const tl = anime.timeline({
      easing: "spring(1, 80, 10, 0)",
      duration: 1000,
    });
    
    tl.add({
      targets: ".hero-stagger",
      translateY: [40, 0],
      opacity: [0, 1],
      delay: anime.stagger(120),
    });
  }, []);

  return (
    <section
      className="relative overflow-hidden w-full bg-[#031010]"
      /* svh = small viewport height — stable, ignores browser chrome resize */
      style={{ height: "calc(100svh - var(--navbar-h, 64px))", isolation: "isolate" }}
    >
      <HeroThreeBackground />
      
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
          .hero-bg img { object-position: 70% center !important; }
        }
      `}</style>

      {/* ── Background photo with Ken Burns slow zoom ── */}
      <div
        className="absolute inset-0 hero-bg"
        style={{
          animation: "ken-burns 22s ease-out forwards",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        <Image
          src={bgSrc}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

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

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          DESKTOP (â‰¥ 1024px)
          Content: left 79px, top 37.9% (372/981)
          Trusted By: centred, pinned bottom
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}

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
            className="hero-stagger opacity-0"
            style={{
              fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: vw(46, 24),
              lineHeight: isRTL ? 1.3 : 1.08,
              letterSpacing: isRTL ? "0em" : "-0.04em",
              color: "white",
              wordWrap: "break-word",
              textShadow:
                "0px 7px 15px rgba(0,0,0,0.08), 0px 27px 27px rgba(0,0,0,0.07), 0px 62px 37px rgba(0,0,0,0.04), 0px 110px 44px rgba(0,0,0,0.01), 0px 172px 48px rgba(0,0,0,0)",
            }}
          >
            {isRTL ? (
              <>
                مُصممة للمؤسسات التي تضع لنفسها<br />أعلى معايير الريادة والتميز.
              </>
            ) : (
              <>
                Built for organisations that hold themselves to<br />a higher standard.
              </>
            )}
          </p>

          {/* Body */}
          <p
            className="hero-stagger opacity-0"
            style={{
              fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: vw(15, 13),
              lineHeight: 1.6,
              letterSpacing: "0em",
              color: "rgba(255,255,255,0.68)",
              maxWidth: vw(460, 260),
              wordWrap: "break-word",
            }}
          >
            {isRTL ? (
              <>
                استشارات تنفيذية واستراتيجية لقيادات الأعمال الباحثة عن<br />الانضباط المالي، والوضوح التشغيلي، والأنظمة القابلة للتوسع.
              </>
            ) : (
              <>
                Senior advisory for leadership teams who need<br />financial discipline, operational clarity, and systems that scale.
              </>
            )}
          </p>
        </div>

        {/* Buttons */}
        <div className="hero-stagger opacity-0" style={{ display: "flex", alignItems: "center", gap: vw(10, 8) }}>
          <MagneticWrapper>
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
                transition: "box-shadow 220ms ease, background 200ms ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 28px rgba(55,180,180,0.45)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            >
              <span style={{ fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif", fontWeight: 500, fontSize: vw(13, 13), lineHeight: 1, letterSpacing: "-0.01em", color: "#0a3030", whiteSpace: "nowrap" }}>
                {t.hero.bookConsultation}
              </span>
            </button>
          </MagneticWrapper>
          <MagneticWrapper>
            <Link
              href={`/${locale}/contact`}
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
              <span style={{ fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif", fontWeight: 500, fontSize: vw(13, 13), lineHeight: 1, letterSpacing: "-0.01em", color: "white", whiteSpace: "nowrap" }}>
                {t.nav.contact}
              </span>
            </Link>
          </MagneticWrapper>
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
            fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif",
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
          {isRTL ? "شركاء النجاح في أفريقيا والشرق الأوسط:" : "TRUSTED BY:"}
        </p>

        {/* Marquee track — overflow hidden clips edges cleanly */}
        <div
          style={{
            width: "100%",
            height: 53,
            overflow: "hidden",
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
                loading="lazy"
                decoding="async"
                width={Math.round(logo.w)}
                height={Math.round(logo.h)}
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

      {/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
          MOBILE (< 1024px)
      â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */}
      <div className="lg:hidden absolute inset-0 z-10 flex flex-col justify-end px-5 pb-5">
        <div className="flex flex-col gap-3 mb-5">
          <p
            className="hero-stagger opacity-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "clamp(22px, 5.5vw, 32px)",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
              color: "white",
              textShadow: "0px 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            {isRTL ? (
              <>
                مُصممة للمؤسسات<br />التي تضع لنفسها<br />أعلى معايير الريادة.
              </>
            ) : (
              <>
                Built for organisations<br />that hold themselves to<br />a higher standard.
              </>
            )}
          </p>
          <p
            className="hero-stagger opacity-0"
            style={{
              fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: 13,
              lineHeight: 1.6,
              letterSpacing: "0em",
              color: "rgba(255,255,255,0.68)",
              textShadow: "0px 1px 4px rgba(0,0,0,0.6)",
              maxWidth: 320,
            }}
          >
            {isRTL ? (
              <>
                استشارات تنفيذية واستراتيجية لقيادات الأعمال الباحثة عن<br />الانضباط المالي والوضوح التشغيلي.
              </>
            ) : (
              <>
                Senior advisory for leadership teams who need<br />financial discipline, operational clarity, and systems that scale.
              </>
            )}
          </p>
          <div className="hero-stagger opacity-0" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={onBooking}
              style={{ height: 36, padding: "0 16px", background: "#37b4b4", border: "1px solid #36c0c0", borderRadius: 7, color: "#0a3030", fontSize: 13, fontWeight: 500, fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif", letterSpacing: "-0.01em", cursor: "pointer", display: "flex", alignItems: "center", whiteSpace: "nowrap" }}
            >
              {t.hero.bookConsultation}
            </button>
            <Link
              href={`/${locale}/contact`}
              style={{ height: 36, padding: "0 16px", background: "rgba(227,227,227,0.1)", border: "1px solid #767676", borderRadius: 7, color: "white", fontSize: 13, fontWeight: 500, fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif", letterSpacing: "-0.01em", boxShadow: "0px 4px 4px rgba(0,0,0,0.25)", display: "flex", alignItems: "center", whiteSpace: "nowrap", textDecoration: "none" }}
            >
              {t.nav.contact}
            </Link>
          </div>
        </div>

        {/* Trusted By — mobile marquee */}
        <div>
          <p style={{ fontFamily: isRTL ? "var(--font-arabic), 'Cairo', sans-serif" : "'Inter', sans-serif", fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,0.65)", textAlign: "center", letterSpacing: "0.1em", marginBottom: 8 }}>
            {isRTL ? "شركاء النجاح:" : "TRUSTED BY:"}
          </p>
          {/* Mobile marquee */}
          <div
            style={{
              width: "100%",
              height: 36,
              overflow: "hidden",
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
                  loading="lazy"
                  decoding="async"
                  width={Math.round(logo.w)}
                  height={Math.round(logo.h)}
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
