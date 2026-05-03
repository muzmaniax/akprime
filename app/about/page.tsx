import { Metadata } from "next";
import Image from "next/image";
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

const TEAM = [
  { name: "Jami Keffer", role: "Chief Innovation Officer", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" },
  { name: "Kimberly Nazshenwala", role: "Principal Strategist", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80" },
  { name: "Autumn Phillips", role: "Director of Client Success", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-dark pt-28 lg:pt-36 pb-24 border-b border-white/[0.06] relative overflow-hidden">
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
            <h1 className="mt-6 text-white text-balance max-w-[20ch]">
              We help leadership teams move with clarity and confidence.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[16px] md:text-[18px] text-white/65 leading-relaxed max-w-2xl">
              AK Prime is a strategic consulting firm working with organisations across
              East Africa. We bring rigour, structure, and senior expertise to every
              engagement — from operational diagnostics to ERP transformations.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaButton href="/contact">Start the conversation</CtaButton>
              <GhostButton href="/services">Explore services</GhostButton>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stat block */}
      <section className="section-dark section-py">
        <div className="container-x grid lg:grid-cols-12 gap-10 items-center">
          <Reveal className="lg:col-span-5">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1200&q=80')" }} />
            </div>
          </Reveal>
          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <Eyebrow>Why AK Prime</Eyebrow>
              <h2 className="mt-4 text-white text-balance max-w-[22ch]">Built from real enterprise experience.</h2>
              <p className="mt-5 text-[15px] text-white/65 leading-relaxed max-w-2xl">
                Our team has led technology and finance transformations inside multinationals,
                growth-stage companies, and public-sector institutions. We bring that calibre of
                advisory to organisations that don't have it in-house.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-6 border-t border-white/10">
                <StatCell value="120+" label="Engagements delivered" />
                <StatCell value="16" label="Integrated service lines" />
                <StatCell value="98%" label="Client satisfaction" />
                <StatCell value="94%" label="Avg. user adoption" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-dark section-py border-t border-white/[0.06]">
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

      {/* Team */}
      <section className="section-dark section-py border-t border-white/[0.06]">
        <div className="container-x">
          <Reveal>
            <SectionHeader eyebrow="Team" title="Meet the experts driving your success" align="center" />
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {TEAM.map((m, i) => (
              <Reveal key={m.name} delay={i * 80}>
                <div className="card-dark overflow-hidden">
                  <div className="aspect-[4/5] relative">
                    <Image src={m.image} alt={m.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" unoptimized />
                  </div>
                  <div className="p-6">
                    <div className="text-[15px] font-medium text-white">{m.name}</div>
                    <div className="text-[12px] text-white/55 mt-1">{m.role}</div>
                  </div>
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
