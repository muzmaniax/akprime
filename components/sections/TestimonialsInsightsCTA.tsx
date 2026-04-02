"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { Sparkles } from "@/components/ui-layouts/sparkles";
import { BorderTrail } from "@/components/motion-primitives/border-trail";
import { Star } from "lucide-react";

const testimonials = [
  {
    body: <>The ERP implementation was <span className="text-[#37B4B4] font-medium">seamless</span>. We finally have a single source of truth for our entire operation.</>,
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
    quote: <>Working with AK Prime was a <span className="text-[#37B4B4] font-medium">complete transformation</span> for our logistics. Their technical depth and strategic advisory are world-class.</>,
    title: "How AI is transforming finance operations in Africa & Middle East",
    excerpt: "From automated reconciliation to predictive cash forecasting.",
    href: "/insights/ai-finance-east-africa",
    featured: true,
  },
  {
    photo: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=80",
    tag: "ERP",
    readTime: "8 min read",
    date: "February 2026",
    title: "ERP implementation: The 5 mistakes most companies make",
    excerpt: "Data migration failures. Scope creep. Low adoption. Here's what to avoid.",
    href: "/insights/erp-implementation-mistakes",
    featured: false,
  },
  {
    photo: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80",
    tag: "Finance",
    readTime: "5 min read",
    date: "January 2026",
    title: "Cashflow optimisation strategies for fast-growing businesses",
    excerpt: "Three working capital levers that unlock 30–60 days of cash.",
    href: "/insights/cashflow-optimisation",
    featured: false,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-10 lg:py-14 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-8">
            <span className="section-overline mb-2 inline-block">Client outcomes</span>
            <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.05] text-white">
              What our clients say
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
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <Star key={k} size={14} className="text-[#37B4B4] fill-[#37B4B4]" />
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
                    <p className="font-semibold text-sm text-white group-hover:text-[#37B4B4] transition-colors">{t.name}</p>
                    <p className="text-[11px] font-medium text-white/40">{t.role}</p>
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
function InsightCard({ a, delay }: { a: any; delay: number }) {
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
                className="pill-b mb-3"
              >
                Featured
              </span>
            )}

            {/* Meta row */}
            {!a.featured && (
              <div className="flex items-center gap-2 mb-2">
                <span className="pill-a">
                  {a.tag}
                </span>
                <span className="pill-d">{a.readTime}</span>
              </div>
            )}

            {/* Title */}
            <h3
              className="text-white font-medium leading-tight group-hover:text-[#29E0C8] transition-colors duration-300"
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
    <section className="py-10 lg:py-14 section-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <span className="section-overline mb-2 inline-block">Insights</span>
              <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.05] mb-1" style={{ color: "#082121" }}>
                Thought leadership
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
    <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden bg-[#082121] py-12">
      <ContactBackground />

      {/* Final dark blend to keep text visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#082121] via-transparent to-[#082121] z-10 pointer-events-none" />

      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <ScrollReveal>
          <span className="section-overline mb-4 inline-block">Start the conversation</span>
          <h2 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.05] text-white mb-4">
            <Sparkles color="#29E0C8" count={10}>
              Ready to transform your operations?
            </Sparkles>
          </h2>
          <p className="text-white/55 text-lg leading-relaxed mb-8 max-w-xl mx-auto">
            Schedule a strategy consultation. No hard sell — just an honest assessment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onBooking}
              className="pill-e cta-pulse"
            >
              <div className="pill-e-group">
                Book strategy consultation
                <div className="pill-e-icon">→</div>
              </div>
            </button>
            <Link
              href="/contact"
              className="pill-f"
            >
              Send an enquiry
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
