import { Metadata } from "next";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { InsightsSection, CTABannerSection } from "@/components/sections/TestimonialsInsightsCTA";

export const metadata: Metadata = {
  title: "Insights | AK Prime Consulting",
  description: "Articles on how leaders think, decide, and operate in complex business environments.",
};

export default function InsightsPage() {
  return (
    <>
      <section className="section-dark pt-28 lg:pt-36 pb-16 border-b border-white/[0.06]">
        <div className="container-x">
          <Reveal><Eyebrow>Insights</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-white text-balance max-w-[22ch]">
              Thinking for business leaders.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[16px] md:text-[18px] text-white/65 leading-relaxed max-w-2xl">
              Articles focused on how leaders think, decide, and operate in complex business environments.
            </p>
          </Reveal>
        </div>
      </section>

      <InsightsSection />
      <CTABannerSection />
    </>
  );
}
