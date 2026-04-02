"use client";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { motion } from "framer-motion";
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { IndustryCardProps } from "@/components/ui/IndustryCard";
import { TickerCarousel } from "@/components/ui/TickerCarousel";
import { MobileCarousel } from "@/components/ui/MobileCarousel";
import { industriesData } from "@/data/industries";
import { Lightbulb, Map, Settings, GraduationCap, TrendingUp, Search, Briefcase, Users, LayoutDashboard, Globe } from "lucide-react";
import Image from "next/image";

// ── Process steps ─────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01", Icon: Lightbulb, title: "Understand",
    desc: <>We immerse ourselves in your business to uncover <span className="text-white font-medium">challenges and opportunities</span>.</>,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "02", Icon: Map, title: "Design",
    desc: <>Build the <span className="text-white font-medium">transformation roadmap</span> — requirements, architecture, vendor selection.</>,
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "03", Icon: Settings, title: "Implement",
    desc: <><span className="text-white font-medium">Configure, migrate and deploy</span> with formal change control and milestone gates.</>,
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "04", Icon: GraduationCap, title: "Train",
    desc: <>Role-based training, SOPs and <span className="text-white font-medium">knowledge transfer</span> for full team adoption.</>,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    num: "05", Icon: TrendingUp, title: "Scale",
    desc: <>30/60/90-day reviews, hypercare support and <span className="text-white font-medium">continuous optimisation</span>.</>,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
  },
];

// ── Map industries data to IndustryCardProps ──────────────────────────────────
const industryCards: IndustryCardProps[] = industriesData.map((ind) => ({
  image: ind.photo,
  title: ind.name,
  description: ind.shortDescription,
  href: `/industries/${ind.slug}`,
}));

// ── Industries Section — Animated Ticker Carousel ────────────────────────────
export function IndustriesSection() {
  return (
    <section className="py-8 lg:py-12 section-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-6">
            <span className="section-overline mb-2 inline-block">Sectors we serve</span>
            <h2
              className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.05] mb-2 text-[#082121]"
            >
              Solutions built for your industry
            </h2>
            <p className="text-sm md:text-base max-w-xl mx-auto" style={{ color: "#5a7a7a" }}>
              Deep expertise across <span className="text-[#37B4B4] font-medium">eight sectors</span> — from <span className="text-[#082121] font-medium">manufacturing</span> and <span className="text-[#082121] font-medium">finance</span> to <span className="text-[#082121] font-medium">healthcare</span> and <span className="text-[#082121] font-medium">government</span>.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* ── Full-bleed ticker (no max-w constraint so cards bleed to edges) ── */}
      {/* Mobile: swipe carousel */}
      <div className="block md:hidden">
        <MobileCarousel cards={industryCards} />
      </div>

      {/* Tablet & Desktop: auto-scrolling ticker */}
      <div className="hidden md:block">
        <TickerCarousel cards={industryCards} />
      </div>
    </section>
  );
}

function GradientBorderCard({
  step,
  className = ""
}: {
  step: { num: string; title: string; desc: React.ReactNode; Icon: any; image?: string };
  className?: string;
}) {
  return (
    <div className={`group relative w-full h-full [background:linear-gradient(45deg,#082121,#0E3E3E_50%,#082121)_padding-box,conic-gradient(from_var(--border-angle),rgba(55,180,180,0.1)_80%,#37B4B4_86%,#29E0C8_90%,#37B4B4_94%,rgba(55,180,180,0.1))_border-box] rounded-[18px] border border-transparent hover:animate-border transition-all duration-700 overflow-hidden ${className}`}>
      <div className="relative z-10 p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <div className="w-10 h-10 rounded-[10px] bg-[#37B4B4]/10 flex items-center justify-center text-[#37B4B4] group-hover:bg-[#37B4B4] group-hover:text-white transition-all duration-300">
            <step.Icon size={18} />
          </div>
          <span className="text-xl font-medium text-white/10 group-hover:text-[#37B4B4]/20 transition-colors">
            {step.num}
          </span>
        </div>

        <div className="flex-1">
          <h3 className="text-[30px] font-medium text-white mb-2 group-hover:text-[#37B4B4] transition-colors tracking-tight leading-[1.2]">
            {step.title}
          </h3>
          <p className="text-[16.5px] text-white/60 group-hover:text-white/80 transition-colors leading-relaxed">
            {step.desc}
          </p>
        </div>

        {/* Optional abstract image look */}
        <div className="mt-4 transition-all duration-700">
          <div className="h-32 sm:h-36 w-full rounded-[10px] bg-[#0E3E3E] border border-white/5 relative overflow-hidden">
            {step.image && (
              <Image
                src={step.image}
                alt={step.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
            )}
            <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-15 group-hover:opacity-10 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Process Section ──────────────────────────────────────────────────────────
export function ProcessSection() {
  return (
    <section className="py-10 lg:py-14 section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="section-overline mb-2 inline-block">How we work</span>
            <h2
              className="text-3xl sm:text-5xl lg:text-[3.25rem] font-medium tracking-tighter leading-[1.05] text-white mb-2"
            >
              A proven delivery framework
            </h2>
          </div>
        </ScrollReveal>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3 auto-rows-[minmax(220px,auto)]">
          {/* Step 1: Wide */}
          <ScrollReveal delay={0.1} className="md:col-span-3 lg:col-span-8">
            <GradientBorderCard step={steps[0]} />
          </ScrollReveal>

          {/* Step 2: Normal */}
          <ScrollReveal delay={0.2} className="md:col-span-3 lg:col-span-4">
            <GradientBorderCard step={steps[1]} />
          </ScrollReveal>

          {/* Step 3: Tall */}
          <ScrollReveal delay={0.3} className="md:col-span-3 lg:col-span-4">
            <GradientBorderCard step={steps[2]} />
          </ScrollReveal>

          {/* Step 4: Normal */}
          <ScrollReveal delay={0.4} className="md:col-span-3 lg:col-span-4">
            <GradientBorderCard step={steps[3]} />
          </ScrollReveal>

          {/* Step 5: Wide again */}
          <ScrollReveal delay={0.5} className="md:col-span-6 lg:col-span-4">
            <GradientBorderCard step={steps[4]} />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
