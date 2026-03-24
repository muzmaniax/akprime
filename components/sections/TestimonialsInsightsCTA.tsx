import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import Spline from "@splinetool/react-spline";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { Sparkles } from "@/components/ui-layouts/sparkles";
import { BorderTrail } from "@/components/motion-primitives/border-trail";

const testimonials = [
  {
    body: "AK Prime reduced our month-end close from 12 days to 3. The ERP implementation was smooth and the training meant our team actually adopted the system — not just learned it.",
    name: "James M.",
    role: "CFO, Manufacturing Firm — Nairobi",
    initials: "JM",
  },
  {
    body: "Their AI pilot saved us 40 hours of manual processing every week. The POC-first approach meant zero risk before full rollout. The team was professional throughout.",
    name: "Sarah N.",
    role: "COO, Telecoms Company — Kampala",
    initials: "SN",
  },
  {
    body: "The audit team uncovered three critical control gaps we didn't know existed. Fast, professional, and their remediation plan was actionable from day one.",
    name: "Amina O.",
    role: "Board Chair, Regional NGO — Dar es Salaam",
    initials: "AO",
  },
];

const insights = [
  {
    photo: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    tag: "AI",
    readTime: "6 min read",
    date: "March 2026",
    title: "How AI Is Transforming Finance Operations in East Africa",
    excerpt: "From automated reconciliation to predictive cash forecasting.",
    href: "/insights/ai-finance-east-africa",
  },
  {
    photo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&q=80",
    tag: "ERP",
    readTime: "8 min read",
    date: "February 2026",
    title: "ERP Implementation: The 5 Mistakes Most Companies Make",
    excerpt: "Data migration failures. Scope creep. Low adoption. Here's what to avoid.",
    href: "/insights/erp-implementation-mistakes",
  },
  {
    photo: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=600&q=80",
    tag: "Finance",
    readTime: "5 min read",
    date: "January 2026",
    title: "Cashflow Optimisation Strategies for Fast-Growing Businesses",
    excerpt: "Three working capital levers that unlock 30–60 days of cash.",
    href: "/insights/cashflow-optimisation",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 section-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-14">
            <span className="section-label-light mb-4 inline-block">CLIENT OUTCOMES</span>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: "#082121" }}>
              <TextEffect preset="blur" per="word" as="span">What Our Clients Say</TextEffect>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="light-card rounded-2xl p-7 h-full flex flex-col relative overflow-hidden">
                <BorderTrail
                    className="bg-gradient-to-r from-[#37B4B4]/50 via-transparent to-[#29E0C8]/50"
                    size={40}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: i * 1.2 }}
                  />
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k} className="text-[#37B4B4] text-lg">★</span>
                  ))}
                </div>

                {/* Large quote mark */}
                <div className="text-6xl font-serif leading-none mb-2" style={{ color: "#37B4B4", opacity: 0.6 }}>"</div>

                <p className="italic text-sm leading-relaxed flex-1 mb-6" style={{ color: "#3a5a5a" }}>
                  {t.body}
                </p>

                <div className="flex items-center gap-3 pt-5 border-t" style={{ borderColor: "rgba(55,180,180,.15)" }}>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 text-white"
                    style={{ background: "#37B4B4" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: "#082121" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "#3a5a5a" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InsightsSection() {
  return (
    <section className="py-24 section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="section-label-light mb-3 inline-block">INSIGHTS</span>
              <h2 className="text-4xl font-bold tracking-tight" style={{ color: "#082121" }}>
                <TextEffect preset="blur" per="word" as="span">Thought Leadership</TextEffect>
              </h2>
            </div>
            <Link
              href="/insights"
              className="text-sm font-semibold transition-colors whitespace-nowrap"
              style={{ color: "#37B4B4" }}
            >
              View All Articles →
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {insights.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.1}>
              <Link href={a.href}>
                <div className="light-card rounded-2xl overflow-hidden group cursor-pointer hover:border-[#37B4B4]/30 transition-all duration-300">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.photo}
                    alt={a.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    style={{ height: "168px" }}
                  />
                  <div className="p-5">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      <span className="section-label-light text-[10px]">{a.tag}</span>
                      <span className="section-label-light text-[10px]">{a.readTime}</span>
                      <span className="section-label-light text-[10px]">{a.date}</span>
                    </div>
                    <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-[#37B4B4] transition-colors" style={{ color: "#082121" }}>
                      {a.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#3a5a5a" }}>{a.excerpt}</p>
                    <span className="text-xs font-semibold" style={{ color: "#37B4B4" }}>Read More →</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTABannerSection({ onBooking }: { onBooking: () => void }) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[#082121]">
      {/* 3D Spline Background Layer */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode" />
      </div>

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#082121]/60 z-10 pointer-events-none" />

      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <span className="section-label mb-6 inline-block glass-badge px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md">START THE CONVERSATION</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            <Sparkles color="#29E0C8" count={10}>
              Ready to transform your operations?
            </Sparkles>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Schedule a strategy consultation. No hard sell — just an honest assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBooking}
              className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-8 py-4 rounded-xl text-base cta-pulse transition-all"
            >
              Book a Strategy Consultation →
            </button>
            <Link
              href="/contact"
              className="border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl text-base transition-colors"
            >
              Send an Enquiry
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
