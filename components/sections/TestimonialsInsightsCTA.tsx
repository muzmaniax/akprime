"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Reveal, Eyebrow, SectionHeader } from "@/components/ui/Primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* Testimonials — KAVEN-style avatar + quote carousel */
const TESTIMONIALS = [
  {
    name: "Kevin Wonderman",
    role: "Chief Executive Officer, Apex Pulse Group",
    quote:
      "AK Prime's strategic guidance transformed our vision into actionable plans. The team's expertise and dedication were instrumental in achieving sustainable growth. Highly recommend AK Prime to any business seeking clarity and impactful results.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
  },
  {
    name: "Mark Wood",
    role: "Managing Director, Industrial Manufacturing",
    quote:
      "The value was in their judgment, not just the recommendations. They helped us see our business clearly and act with confidence on what mattered most.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
  },
  {
    name: "Hanry Mandu",
    role: "Chief Operating Officer, Healthcare Services",
    quote:
      "This felt like a thinking partner, not a consulting project. The frameworks they introduced are still guiding decisions a year later.",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
  },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];

  return (
    <section className="bg-white text-[#082121] section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-4 text-[#082121] text-balance">Stories that inspire</h2>
            <p className="mt-4 text-[15px] text-[#3a5a5a] leading-relaxed max-w-md">
              Here's what clients shared about their experience working with us.
            </p>
            <div className="mt-8 flex items-center gap-2">
              <button
                type="button"
                onClick={() => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                className="w-11 h-11 rounded-full border border-[#082121]/15 hover:border-[#37B4B4] hover:text-[#37B4B4] text-[#3a5a5a] inline-flex items-center justify-center transition-colors"
                aria-label="Previous"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setI((p) => (p + 1) % TESTIMONIALS.length)}
                className="w-11 h-11 rounded-full bg-[#37B4B4] text-white hover:bg-[#29E0C8] inline-flex items-center justify-center transition-colors"
                aria-label="Next"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-8">
            <div className="rounded-3xl bg-[#F4FAFA] border border-[#082121]/8 p-8 lg:p-10">
              <div className="flex items-start gap-5">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border border-[#082121]/10 shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" sizes="64px" unoptimized />
                </div>
                <div className="flex-1">
                  <div className="text-[15px] font-medium text-[#082121]">{t.name}</div>
                  <div className="text-[12px] text-[#3a5a5a] mt-0.5">{t.role}</div>
                </div>
              </div>
              <blockquote className="mt-6 text-[18px] lg:text-[22px] text-[#082121] leading-relaxed text-balance">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setI(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-[#37B4B4]" : "w-1.5 bg-[#082121]/20"}`}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* Insights — 3-column article cards */
const ARTICLES = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    category: "Strategy",
    title: "Why most business problems are misdiagnosed",
    author: "Mark Wood",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1000&q=80",
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    category: "Operations",
    title: "The real cost of poor decision-making for business",
    author: "Hanry Mandu",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&q=80",
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    category: "Leadership",
    title: "When founders should seek external perspective",
    author: "Andy Milan",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1000&q=80",
  },
];

export function InsightsSection() {
  return (
    <section className="bg-[#F4FAFA] text-[#082121] section-py border-t border-[#082121]/8">
      <div className="container-x">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link href={`/insights/${a.slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-[#082121]/8">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${a.image})` }}
                  />
                </div>
                <div className="mt-5">
                  <div className="text-[11px] font-semibold tracking-label text-[#37B4B4] uppercase">
                    {a.category}
                  </div>
                  <h3 className="mt-2.5 text-[#082121] text-balance group-hover:text-[#37B4B4] transition-colors">
                    {a.title}
                  </h3>
                  <div className="mt-4 flex items-center gap-2 text-[12px] text-[#3a5a5a]">
                    <div className="w-6 h-6 rounded-full bg-[#082121]/10" />
                    <span>{a.author}</span>
                    <span className="text-[#082121]/30">·</span>
                    <span>{a.date}</span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* FAQ */
const FAQ = [
  { q: "What type of businesses do you work with?", a: "We work with small to mid-sized businesses, growth-stage companies, and established organisations. Our clients are typically founders, executives, and leadership teams facing strategic, operational, or growth-related decisions." },
  { q: "When should a business consider hiring a consultant?", a: "When a decision carries weight you don't want to get wrong. Typical moments: scaling teams, system migrations, fundraising, restructures, or entering a new market." },
  { q: "What makes AK Prime different from other consulting firms?", a: "We bring rigour without the overhead — small senior teams, no junior shuffle, and a focus on building lasting capability inside your organisation rather than dependence on us." },
  { q: "Do you provide ready-made solutions?", a: "No. Every engagement starts with discovery. The cost of getting the diagnosis wrong is too high." },
  { q: "How does a typical engagement work?", a: "A 2-week diagnostic, then a defined scope of 4–16 weeks depending on the work. We share a clear plan, milestones, and deliverables before the engagement starts." },
];

export function FAQSection() {
  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <Reveal>
          <SectionHeader
            eyebrow="FAQ"
            title="Common questions, clear answers"
            align="center"
          />
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-12 max-w-[760px] mx-auto">
            <Accordion className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="text-left py-5 text-[15px] md:text-[16px] font-medium text-white hover:no-underline hover:text-[#37B4B4] [&>svg]:hidden group">
                    <span className="flex-1 pr-4">{item.q}</span>
                    <span className="w-8 h-8 rounded-full bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#37B4B4] transition-transform group-data-[state=open]:rotate-45">
                      <Plus size={14} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[14px] text-white/65 leading-relaxed pb-5 pr-12">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* CTA Banner */
export function CTABannerSection({ onBooking }: { onBooking?: () => void }) {
  const photos = [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&q=80",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80",
  ];

  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x text-center">
        <Reveal>
          <Eyebrow className="justify-center">Get In Touch</Eyebrow>
          <h2 className="mt-5 text-white text-balance max-w-[18ch] mx-auto">
            Clarity starts with the right conversation.
          </h2>
          <p className="mt-5 text-[15px] text-white/60 max-w-xl mx-auto leading-relaxed">
            Whether you're navigating complexity or preparing to scale, we help leadership teams gain
            clarity, align decisions, and move forward with confidence.
          </p>
          <button type="button" onClick={onBooking} className="btn-cta mt-8">
            Request a consultation <ArrowUpRight size={16} strokeWidth={2.25} />
          </button>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-5 gap-3 lg:gap-4">
            {photos.map((p, i) => (
              <div key={i} className={`aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 ${i === 0 || i === 4 ? "translate-y-3" : ""} ${i === 2 ? "-translate-y-3" : ""}`}>
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${p})` }} />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
