import { Metadata } from "next";
import { Reveal, Eyebrow, StatCell, SectionHeader, CtaButton, GhostButton } from "@/components/ui/Primitives";
import { CTABannerSection, FAQSection } from "@/components/sections/TestimonialsInsightsCTA";
import { Database, Cloud, TrendingUp, Zap, Users, Shield } from "lucide-react";
import { getSiteImage } from "@/lib/site-images";
import BorderGlow from "@/components/ui/BorderGlow";

export const metadata: Metadata = {
  title: "About AK Prime Consulting | Strategic Consulting Firm",
  description: "AK Prime Consulting (AKPrime) is a strategic consulting firm helping organisations in Kenya and the UAE navigate complexity and build systems that scale. Offices in Mombasa, Nairobi, and Dubai.",
  alternates: { canonical: "https://www.akprimeconsulting.com/about" },
};

const VALUES = [
  { title: "Clarity before complexity", body: "Most problems are misdiagnosed. We start by getting the question right." },
  { title: "Strategy with purpose", body: "Recommendations exist to be acted on. We design for execution, not the deck." },
  { title: "Consulting built on trust", body: "Senior teams, no junior shuffle. We're accountable to the work, not the hours." },
  { title: "Growth with intention", body: "We build capability inside your organisation, not dependence on us." },
];

const CAPABILITIES = [
  { title: "ERP Systems", description: "SAP, Odoo, NetSuite implementations and migrations", icon: Database },
  { title: "Technology", description: "Cloud infrastructure, API integrations, and digital transformation", icon: Cloud },
  { title: "Finance & FP&A", description: "CFO advisory, consolidation, and financial planning models", icon: TrendingUp },
  { title: "Operations", description: "Process redesign, supply chain, and operational excellence", icon: Zap },
  { title: "Organization Design", description: "Restructuring, talent strategy, and capability building", icon: Users },
  { title: "Compliance & Audit", description: "Risk frameworks, internal controls, and regulatory readiness", icon: Shield },
];

export default function AboutPage() {
  const heroBg = getSiteImage("about.hero_bg");
  const panel1 = getSiteImage("about.panel_1");
  const panel2 = getSiteImage("about.panel_2");

  return (
    <>
      {/* Hero */}
      <section className="section-dark border-b border-white/[0.06] relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "clamp(20px, 3vw, 40px)" }}>
        <div className="absolute inset-0 -z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url('${heroBg || "/images/team-collaboration.jpg"}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#082121]/80 via-[#082121]/90 to-[#082121]" />
        </div>
        <div className="relative container-x">
          <Reveal>
            <Eyebrow>About AK Prime</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance max-w-[24ch]" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}>
              We help leadership teams move with clarity and confidence.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-2xl">
              AK Prime is a strategic consulting firm working with organisations across
              Africa and the Middle East. We bring rigour, structure, and senior expertise
              to every engagement, from operational diagnostics to ERP transformations.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-5 flex flex-wrap gap-3">
              <CtaButton href="/contact">Start the conversation</CtaButton>
              <GhostButton href="/services">Explore services</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stat block */}
      <section className="section-dark py-12 lg:py-8">
        <div className="container-x grid lg:grid-cols-12 lg:gap-10 gap-12 lg:items-center">
          {/* LEFT COLUMN - TEXT AND STATS */}
          <div className="lg:col-span-6 space-y-8 lg:space-y-5">
            <Reveal>
              <Eyebrow>Why AK Prime</Eyebrow>
              <h2 className="mt-3 lg:mt-2 text-white text-balance max-w-[22ch]">Built from real enterprise experience.</h2>
              <p className="mt-4 lg:mt-3 text-[15px] text-white/65 leading-relaxed">
                Our team has led technology and finance transformations inside multinationals,
                growth-stage companies, and public-sector institutions. We bring that calibre of
                advisory to organisations that don't have it in-house.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <h3 className="text-white text-[13px] font-semibold tracking-[0.12em] uppercase mb-4 lg:mb-3">The numbers</h3>
                <div className="grid grid-cols-2 gap-6 lg:gap-5">
                  <StatCell value="20+" label="Engagements delivered" />
                  <StatCell value="23" label="Integrated service lines" />
                  <StatCell value="98%" label="Client satisfaction" />
                  <StatCell value="94%" label="Avg. user adoption" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - IMAGE TILES (desktop only, 2 images side by side) */}
          <div className="hidden lg:grid lg:col-span-6 grid-cols-2 gap-3 items-start">
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <img
                  src={panel1 || "/images/hero-workspace-bw.jpg"}
                  alt="Team collaboration"
                  className="w-full h-auto aspect-[3/4] lg:aspect-[4/5] object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10 lg:mt-8">
                <img
                  src={panel2 || "/images/business-meeting.jpg"}
                  alt="Enterprise experience"
                  className="w-full h-auto aspect-[3/4] lg:aspect-[4/5] object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-dark py-12 border-t border-white/[0.06]">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Our values" title="What we stand for" align="center" />
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80} className="h-full">
                <BorderGlow
                  className="h-full"
                  backgroundColor="#082121"
                  glowColor="180 51 70"
                  colors={["#37B4B4", "#29E0C8", "#0a4040"]}
                  borderRadius={20}
                  glowRadius={36}
                  glowIntensity={0.9}
                  edgeSensitivity={25}
                  coneSpread={22}
                  animated={i === 0}
                >
                  <div className="p-7">
                    <h3 className="text-white mb-3">{v.title}</h3>
                    <p className="text-[14px] text-white/60 leading-relaxed">{v.body}</p>
                  </div>
                </BorderGlow>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-dark py-12 border-t border-white/[0.06]">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="What we do" title="Core capabilities & expertise" align="center" />
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {CAPABILITIES.map((c, i) => {
              const Icon = c.icon;
              return (
                <Reveal key={c.title} delay={i * 60} className="h-full">
                  <BorderGlow
                    className="h-full"
                    backgroundColor="#082121"
                    glowColor="180 51 70"
                    colors={["#37B4B4", "#29E0C8", "#0a4040"]}
                    borderRadius={20}
                    glowRadius={36}
                    glowIntensity={0.9}
                    edgeSensitivity={25}
                    coneSpread={22}
                  >
                    <div className="p-6">
                      <div className="w-12 h-12 rounded-lg bg-white/8 backdrop-blur-sm border border-white/10 flex items-center justify-center mb-4">
                        <Icon size={24} className="text-[#37B4B4]" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-white font-medium text-[15px]">{c.title}</h3>
                      <p className="mt-3 text-[13px] text-white/60 leading-relaxed">{c.description}</p>
                    </div>
                  </BorderGlow>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABannerSection />
    </>
  );
}
