import { Metadata } from "next";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact AK Prime Consulting | Book a Consultation",
  description: "Get in touch with AK Prime Consulting (AKPrime). Book a consultation for ERP implementation, finance consulting, or digital transformation in Kenya and the UAE.",
  alternates: { canonical: "https://akprime.co.ke/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="section-dark border-b border-white/[0.06]" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 40px)", paddingBottom: "40px" }}>
        <div className="container-x">
          <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-3 text-white text-balance max-w-[22ch]" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.6rem)", lineHeight: 1.1 }}>
              Clarity starts with the right conversation.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-3 text-[14px] text-white/65 leading-relaxed max-w-2xl">
              Share a few details about what you're working on. We respond within one business day with next steps.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
