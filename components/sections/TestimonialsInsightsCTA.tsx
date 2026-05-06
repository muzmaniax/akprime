"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button-cva";
import { Reveal, Eyebrow, SectionHeader } from "@/components/ui/Primitives";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

/* ─── TESTIMONIALS ─── */
const TESTIMONIALS = [
  {
    name: "Kevin Wonderman",
    role: "Chief Executive Officer, Apex Pulse Group",
    initials: "KW",
    quote:
      "AK Prime's strategic guidance transformed our vision into actionable plans. The team's expertise and dedication were instrumental in achieving sustainable growth. Highly recommend AK Prime to any business seeking clarity and impactful results.",
  },
  {
    name: "Mark Wood",
    role: "Managing Director, Industrial Manufacturing",
    initials: "MW",
    quote:
      "The value was in their judgment, not just the recommendations. They helped us see our business clearly and act with confidence on what mattered most.",
  },
  {
    name: "Hanry Mandu",
    role: "Chief Operating Officer, Healthcare Services",
    initials: "HM",
    quote:
      "This felt like a thinking partner, not a consulting project. The frameworks they introduced are still guiding decisions a year later.",
  },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const t = TESTIMONIALS[i];

  return (
    <section className="bg-white section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* Left — label + nav */}
          <Reveal className="lg:col-span-4">
            <Eyebrow>Testimonials</Eyebrow>
            <h2 className="mt-4 text-[#082121] text-balance">Stories that inspire</h2>
            <p className="mt-4 text-[14px] text-[#3a5a5a] leading-relaxed max-w-xs">
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

          {/* Right — quote card */}
          <Reveal delay={120} className="lg:col-span-8">
            <div className="rounded-3xl bg-[#F4FAFA] border border-[#082121]/8 p-8 lg:p-10">
              {/* Avatar + name */}
              <div className="flex items-start gap-4">
                {/* Avatar placeholder — initials */}
                <div className="w-14 h-14 rounded-full bg-[#0E3E3E] flex items-center justify-center shrink-0 ring-2 ring-[#37B4B4]/20">
                  <span className="text-[#37B4B4] text-[15px] font-semibold tracking-wide">
                    {t.initials}
                  </span>
                </div>
                <div className="pt-1">
                  <div className="text-[15px] font-semibold text-[#082121] leading-tight">{t.name}</div>
                  <div className="text-[12px] text-[#3a5a5a] mt-0.5 leading-snug">{t.role}</div>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-6 text-[17px] lg:text-[20px] text-[#082121] leading-relaxed text-balance">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Dots */}
              <div className="mt-8 flex items-center gap-1.5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Go to testimonial ${idx + 1}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-8 bg-[#37B4B4]" : "w-1.5 bg-[#082121]/20 hover:bg-[#082121]/35"}`}
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

/* ─── INSIGHTS — Tailwind UI "Blog section with 3-col card grid" ─── */
const ARTICLES = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    category: "Strategy",
    title: "Why most business problems are misdiagnosed",
    author: "Mark Wood",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    category: "Operations",
    title: "The real cost of poor decision-making for business",
    author: "Hanry Mandu",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    category: "Leadership",
    title: "When founders should seek external perspective",
    author: "Andy Milan",
    date: "Jan 20, 2026",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80",
  },
];

export function InsightsSection() {
  return (
    <section className="bg-[#F4FAFA] section-py border-t border-[#082121]/8">
      <div className="container-x">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <Reveal>
            <Eyebrow>Insights</Eyebrow>
            <h2 className="mt-3 text-[#082121]">From our practice</h2>
          </Reveal>
          <Reveal delay={80}>
            <Button
              href="/insights"
              variant="link"
              size="md"
              icon={ArrowUpRight}
              iconPosition="end"
            >
              View all articles
            </Button>
          </Reveal>
        </div>

        {/* Card grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={i * 80}>
              <Link href={`/insights/${a.slug}`} className="group block">
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden rounded-xl bg-[#082121]/5">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="mt-5">
                  <span className="inline-block text-[11px] font-semibold tracking-widest uppercase text-[#37B4B4] mb-3">
                    {a.category}
                  </span>
                  <h3 className="text-[#082121] text-[16px] font-medium leading-snug group-hover:text-[#37B4B4] transition-colors">
                    {a.title}
                  </h3>
                  <div className="mt-4 text-[12px] text-[#3a5a5a]">
                    <time>{a.date}</time>
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

/* ─── FAQ — Tailwind UI "Offset with supporting text" two-column ─── */
const FAQ = [
  { q: "What type of businesses do you work with?", a: "We work with small to mid-sized businesses, growth-stage companies, and established organisations. Our clients are typically founders, executives, and leadership teams facing strategic, operational, or growth-related decisions." },
  { q: "When should a business consider hiring a consultant?", a: "When a decision carries weight you don't want to get wrong. Typical moments: scaling teams, system migrations, fundraising, restructures, or entering a new market." },
  { q: "What makes AK Prime different from other consulting firms?", a: "We bring rigour without the overhead — small senior teams, no junior shuffle, and a focus on building lasting capability inside your organisation rather than dependence on us." },
  { q: "Do you provide ready-made solutions?", a: "No. Every engagement starts with discovery. The cost of getting the diagnosis wrong is too high." },
  { q: "How does a typical engagement work?", a: "A 2-week diagnostic, then a defined scope of 4–16 weeks depending on the work. We share a clear plan, milestones, and deliverables before the engagement starts." },
  { q: "Where do you operate?", a: "We are headquartered in Nairobi with a presence in Mombasa. We serve clients across East Africa and can deliver remotely for select international engagements." },
];

export function FAQSection() {
  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

          {/* Left — sticky header */}
          <Reveal className="lg:col-span-5">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-white text-balance max-w-[18ch]">
              Common questions, clear answers.
            </h2>
            <p className="mt-5 text-[14px] text-white/60 leading-relaxed">
              Can't find what you're looking for?{" "}
              <Link href="/contact" className="text-[#37B4B4] hover:text-[#29E0C8] font-semibold transition-colors">
                Reach out directly →
              </Link>
            </p>
          </Reveal>

          {/* Right — accordion */}
          <Reveal delay={80} className="lg:col-span-7">
            <Accordion className="w-full">
              {FAQ.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-white/10">
                  <AccordionTrigger className="text-left py-5 text-[14px] md:text-[15px] font-normal text-white hover:no-underline hover:text-[#37B4B4] [&>svg]:hidden group">
                    <span className="flex-1 pr-4">{item.q}</span>
                    <span className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center text-[#37B4B4] transition-transform duration-200 group-data-[state=open]:rotate-45 shrink-0">
                      <Plus size={13} strokeWidth={2} />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-[13.5px] text-white/60 leading-relaxed pb-5 pr-10">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

        </div>
      </div>
    </section>
  );
}

/* ─── CTA BANNER — Tailwind UI "Dark panel with split layout" ─── */
export function CTABannerSection({ onBooking }: { onBooking?: () => void }) {
  return (
    <section className="section-dark section-py border-t border-white/[0.06]">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-[#0E3E3E] border border-white/10">
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-15"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&q=80')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#082121]/80 via-[#082121]/40 to-transparent" />

          <div className="relative grid lg:grid-cols-2 gap-10 items-center px-8 py-14 lg:px-14 lg:py-16">
            {/* Left — text */}
            <Reveal>
              <Eyebrow>Get In Touch</Eyebrow>
              <h2 className="mt-4 text-white text-balance max-w-[20ch]">
                Clarity starts with the right conversation.
              </h2>
              <p className="mt-5 text-[14px] text-white/65 leading-relaxed max-w-lg">
                Whether you're navigating complexity or preparing to scale, we help leadership teams gain clarity, align decisions, and move forward with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={onBooking}
                  variant="primary"
                  size="lg"
                  icon={ArrowUpRight}
                  iconPosition="end"
                >
                  Request a consultation
                </Button>
                <Button
                  href="/contact"
                  variant="secondary"
                  size="lg"
                >
                  Contact us
                </Button>
              </div>
            </Reveal>

            {/* Right — photo collage */}
            <Reveal delay={120}>
              <div className="hidden lg:grid grid-cols-3 gap-3 h-[320px]">
                <div className="col-span-2 overflow-hidden rounded-xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80"
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-rows-2 gap-3">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&q=80"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="overflow-hidden rounded-xl">
                    <img
                      src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80"
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
