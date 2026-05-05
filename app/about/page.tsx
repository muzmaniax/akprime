import { Metadata } from "next";
import { Reveal, Eyebrow, StatCell, SectionHeader, CtaButton, GhostButton } from "@/components/ui/Primitives";
import { CTABannerSection, FAQSection } from "@/components/sections/TestimonialsInsightsCTA";

export const metadata: Metadata = {
  title: "About | AK Prime Consulting",
  description: "AK Prime is a strategic consulting firm helping organisations navigate complexity and build systems that scale.",
};

const VALUES = [
  { title: "Clarity before complexity", body: "Most problems are misdiagnosed. We start by getting the question right." },
  { title: "Strategy with purpose", body: "Recommendations exist to be acted on. We design for execution, not the deck." },
  { title: "Consulting built on trust", body: "Senior teams, no junior shuffle. We're accountable to the work, not the hours." },
  { title: "Growth with intention", body: "We build capability inside your organisation — not dependence on us." },
];

const CAPABILITIES = [
  { title: "ERP Systems", description: "SAP, Odoo, NetSuite implementations and migrations" },
  { title: "Technology", description: "Cloud infrastructure, API integrations, and digital transformation" },
  { title: "Finance & FP&A", description: "CFO advisory, consolidation, and financial planning models" },
  { title: "Operations", description: "Process redesign, supply chain, and operational excellence" },
  { title: "Organization Design", description: "Restructuring, talent strategy, and capability building" },
  { title: "Compliance & Audit", description: "Risk frameworks, internal controls, and regulatory readiness" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark border-b border-white/[0.06] relative overflow-hidden" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="absolute inset-0 -z-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=2000&q=80')" }}
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
              East Africa. We bring rigour, structure, and senior expertise to every
              engagement — from operational diagnostics to ERP transformations.
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
      <section className="section-dark py-12">
        <div className="container-x grid lg:grid-cols-12 gap-12">
          {/* LEFT COLUMN - TEXT AND STATS */}
          <div className="lg:col-span-6 space-y-10">
            <Reveal>
              <Eyebrow>Why AK Prime</Eyebrow>
              <h2 className="mt-4 text-white text-balance max-w-[22ch]">Built from real enterprise experience.</h2>
              <p className="mt-5 text-[15px] text-white/65 leading-relaxed">
                Our team has led technology and finance transformations inside multinationals,
                growth-stage companies, and public-sector institutions. We bring that calibre of
                advisory to organisations that don't have it in-house.
              </p>
            </Reveal>
            <Reveal delay={80}>
              <div>
                <h3 className="text-white text-[13px] font-semibold tracking-[0.12em] uppercase mb-6">The numbers</h3>
                <div className="grid grid-cols-2 gap-8">
                  <StatCell value="20+" label="Engagements delivered" />
                  <StatCell value="23" label="Integrated service lines" />
                  <StatCell value="98%" label="Client satisfaction" />
                  <StatCell value="94%" label="Avg. user adoption" />
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN - IMAGE TILES */}
          <div className="hidden lg:grid lg:col-span-6 grid-cols-2 gap-4 auto-rows-max h-fit">
            {/* Top Left */}
            <Reveal delay={80}>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                  alt="Team collaboration"
                  className="w-full h-auto aspect-[3/4] object-cover"
                />
              </div>
            </Reveal>

            {/* Top Right - Offset Down */}
            <Reveal delay={160}>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10 mt-6">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80"
                  alt="Enterprise experience"
                  className="w-full h-auto aspect-[3/4] object-cover"
                />
              </div>
            </Reveal>

            {/* Bottom Left - Offset Up */}
            <Reveal delay={240}>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10 -mt-6">
                <img
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80"
                  alt="Strategic planning"
                  className="w-full h-auto aspect-[3/4] object-cover"
                />
              </div>
            </Reveal>

            {/* Bottom Right */}
            <Reveal delay={320}>
              <div className="overflow-hidden rounded-xl ring-1 ring-white/10">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                  alt="Advisory team"
                  className="w-full h-auto aspect-[3/4] object-cover"
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
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full p-7 card-dark">
                  <h3 className="text-white mb-3">{v.title}</h3>
                  <p className="text-[14px] text-white/60 leading-relaxed">{v.body}</p>
                </div>
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
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 60}>
                <div className="card-dark p-6">
                  <h3 className="text-white font-medium text-[15px]">{c.title}</h3>
                  <p className="mt-3 text-[13px] text-white/60 leading-relaxed">{c.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FAQSection />
      <CTABannerSection />
    </>
  );
}
