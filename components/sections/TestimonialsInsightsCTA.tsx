"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
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
    photo: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    tag: "AI",
    readTime: "6 min read",
    date: "March 2026",
    title: "How AI Is Transforming Finance Operations in Africa & Middle East",
    excerpt: "From automated reconciliation to predictive cash forecasting.",
    href: "/insights/ai-finance-east-africa",
    featured: true,
  },
  {
    photo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    tag: "ERP",
    readTime: "8 min read",
    date: "February 2026",
    title: "ERP Implementation: The 5 Mistakes Most Companies Make",
    excerpt: "Data migration failures. Scope creep. Low adoption. Here's what to avoid.",
    href: "/insights/erp-implementation-mistakes",
    featured: false,
  },
  {
    photo: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80",
    tag: "Finance",
    readTime: "5 min read",
    date: "January 2026",
    title: "Cashflow Optimisation Strategies for Fast-Growing Businesses",
    excerpt: "Three working capital levers that unlock 30–60 days of cash.",
    href: "/insights/cashflow-optimisation",
    featured: false,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-14 lg:py-20 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <span className="section-label mb-4 inline-block">CLIENT OUTCOMES</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase leading-none">
              <TextEffect preset="blur" per="word" as="span">What Our Clients Say</TextEffect>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 0.1}>
              <div className="glass-card rounded-[18px] p-6 h-full flex flex-col relative overflow-hidden group">
                <BorderTrail
                    className="bg-gradient-to-r from-[#37B4B4] via-transparent to-[#29E0C8]"
                    size={60}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: i * 1.5 }}
                  />
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k} className="text-[#37B4B4] text-sm">★</span>
                  ))}
                </div>

                {/* Large quote mark */}
                <div className="text-3xl font-serif leading-none mb-3 text-[#37B4B4]/40 group-hover:text-[#37B4B4] transition-colors">&ldquo;</div>

                <p className="italic text-sm leading-relaxed flex-1 mb-5 text-white/80">
                  {t.body}
                </p>

                <div className="flex items-center gap-3 pt-5 border-t border-white/10">
                  <div
                    className="w-9 h-9 rounded-[8px] flex items-center justify-center text-xs font-bold shrink-0 text-[#082121]"
                    style={{ background: "#37B4B4" }}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white group-hover:text-[#37B4B4] transition-colors uppercase">{t.name}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{t.role}</p>
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

// ── Figma Card/12-style Insight Card ─────────────────────────────────────────
function InsightCard({ a, delay }: { a: typeof insights[0]; delay: number }) {
  return (
    <ScrollReveal delay={delay}>
      <Link href={a.href} className="block h-full">
        <motion.div
          whileHover={{ y: -6, scale: 1.015 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="relative rounded-[22px] overflow-hidden cursor-pointer group"
          style={{ height: "300px" }}
        >
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={a.photo}
            alt={a.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
          />

          {/* Teal tint overlay at top (matches Figma mint bg) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(103,196,196,0.38) 0%, rgba(8,33,33,0.0) 35%, rgba(8,33,33,0.72) 65%, rgba(8,33,33,0.97) 100%)",
            }}
          />



          {/* Bottom content layer */}
          <div className="absolute bottom-0 left-0 right-0 z-20 p-5">
            {/* Featured badge */}
            {a.featured && (
              <span
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-3"
                style={{ background: "#2563EB", color: "#fff", letterSpacing: "0.02em" }}
              >
                Featured
              </span>
            )}

            {/* Meta row */}
            {!a.featured && (
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                  style={{ background: "rgba(55,180,180,0.22)", color: "#29E0C8", border: "1px solid rgba(41,224,200,0.3)" }}
                >
                  {a.tag}
                </span>
                <span className="text-white/50 text-[10px]">{a.readTime}</span>
              </div>
            )}

            {/* Title — large bold white (matches Figma) */}
            <h3
              className="text-white font-extrabold leading-tight group-hover:text-[#29E0C8] transition-colors duration-300"
              style={{ fontSize: a.featured ? "1.85rem" : "1.3rem", lineHeight: 1.15, letterSpacing: "-0.025em" }}
            >
              {a.title}
            </h3>

            {/* Excerpt — appears on hover */}
            <p className="text-white/0 group-hover:text-white/70 text-sm mt-2 leading-snug transition-all duration-300 line-clamp-2"
              style={{ maxHeight: 0, overflow: "hidden" }}
            >
              {a.excerpt}
            </p>

            {/* Read more arrow */}
            <div className="mt-3 flex items-center gap-1.5">
              <span
                className="text-xs font-bold tracking-wide"
                style={{ color: "#29E0C8" }}
              >
                {a.readTime} · {a.date}
              </span>
              <span className="ml-auto text-xs font-semibold text-white/0 group-hover:text-white transition-all duration-300">
                Read →
              </span>
            </div>
          </div>

          {/* Hover border glow */}
          <div
            className="absolute inset-0 rounded-[22px] border-2 border-transparent group-hover:border-[#29E0C8]/40 transition-all duration-300 pointer-events-none"
          />
        </motion.div>
      </Link>
    </ScrollReveal>
  );
}

export function InsightsSection() {
  return (
    <section className="py-16 lg:py-24 section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
            <div>
              <span className="section-label-light mb-3 inline-block">INSIGHTS</span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight" style={{ color: "#082121" }}>
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

        {/* Figma Card/12 layout: featured card taller on large screens */}
        <div className="grid md:grid-cols-3 gap-5 items-stretch">
          {insights.map((a, i) => (
            <InsightCard key={a.title} a={a} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function useMousePosition() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return mousePosition;
}

function ContactBackground() {
  const mouse = useMousePosition();
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Dynamic Mouse Glow Spotlight */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full opacity-30 select-none pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(55,180,180,0.15) 0%, transparent 60%)",
        }}
        animate={{
          x: mouse.x - 400,
          y: mouse.y - 400,
        }}
        transition={{ type: "spring", damping: 40, stiffness: 200, mass: 0.5 }}
      />

      {/* Floating Zooming Abstract Arrows */}
      <div className="absolute inset-0 z-0 opacity-[0.08]">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-[#37B4B4]"
            initial={{ 
              x: (i * 7) + "%", 
              y: "115%", 
              scale: 0.8 + Math.random() * 2.5,
              opacity: 0.1
            }}
            animate={{ 
              y: "-20%",
              opacity: [0.1, 0.4, 0.1],
              scale: [0.8 + Math.random(), 1.2 + Math.random()]
            }}
            transition={{ 
              duration: 12 + Math.random() * 25, 
              repeat: Infinity, 
              ease: "linear",
              delay: i * 1.5,
            }}
          >
            {/* Abstract Arrow shape from logo philosophy */}
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(55,180,180,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(55,180,180,0.1)_1px,transparent_1px)] bg-[size:50px_50px]" />
    </div>
  );
}

export function CTABannerSection({ onBooking }: { onBooking: () => void }) {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden bg-[#082121] py-20">
      <ContactBackground />

      {/* Final dark blend to keep text visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#082121] via-transparent to-[#082121] z-10 pointer-events-none" />

      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <span className="section-label mb-6 inline-block glass-badge px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[#37B4B4] font-bold tracking-[0.2em] text-xs">START THE CONVERSATION</span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
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
              className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-8 py-4 rounded-[12px] text-base cta-pulse transition-all"
            >
              Book a Strategy Consultation →
            </button>
            <Link
              href="/contact"
              className="border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-[12px] text-base transition-colors"
            >
              Send an Enquiry
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
