import { Metadata } from "next";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { ContactSection } from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact | AK Prime Consulting",
  description: "Get in touch with AK Prime — strategic consulting for organisations ready to scale.",
};

export default function ContactPage() {
  return (
    <>
      <section className="section-dark pt-28 lg:pt-36 pb-16 border-b border-white/[0.06]">
        <div className="container-x">
          <Reveal><Eyebrow>Contact</Eyebrow></Reveal>
          <Reveal delay={80}>
            <h1 className="mt-6 text-white text-balance max-w-[22ch]">
              Clarity starts with the right conversation.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[16px] md:text-[18px] text-white/65 leading-relaxed max-w-2xl">
              Share a few details about what you're working on. We respond within one business day with next steps.
            </p>
          </Reveal>
        </div>
      </section>

      <ContactSection />
    </>
  );
}
