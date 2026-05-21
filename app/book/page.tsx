"use client";

import Link from "next/link";
import { CheckCircle2, Clock, Shield, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useEffect } from "react";

const benefits = [
  "Honest assessment. No hard sell, no wasted time.",
  "Tailored to your specific industry and business size",
  "Advice from a senior consultant with 15+ years of experience",
  "Clear recommended next steps, even if we're not the right fit",
];

export default function BookPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#082121] pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — Info */}
          <ScrollReveal>
            <span className="section-label mb-6 inline-block">Book a Consultation</span>
            <h1 className="text-5xl font-medium text-white tracking-tight mb-6">
              30-Minute Strategy<br />
              <span className="text-[#37B4B4]">Discovery Call</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Not sure if AK Prime is right for you? Book a no-obligation call. We'll hear about your situation, ask the right questions, and give you an honest recommendation, whether that means working together or pointing you in another direction.
            </p>

            <div className="space-y-4 mb-10">
              {benefits.map((b) => (
                <div key={b} className="flex gap-3 items-start">
                  <CheckCircle2 className="text-[#37B4B4] shrink-0 mt-0.5" size={18} />
                  <span className="text-white/70 text-sm">{b}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { icon: <Clock size={18} />, label: "30 Minutes", sub: "Focused & efficient" },
                { icon: <Shield size={18} />, label: "No strings", sub: "Zero obligation" },
                { icon: <Star size={18} />, label: "Senior level", sub: "Principal consultant" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-[#37B4B4] flex justify-center mb-2">{item.icon}</div>
                  <div className="text-white font-semibold text-sm">{item.label}</div>
                  <div className="text-white/40 text-xs mt-0.5">{item.sub}</div>
                </div>
              ))}
            </div>

            <p className="text-white/35 text-sm">
              Can't find a suitable time?{" "}
              <Link href="/contact" className="text-[#37B4B4] hover:text-[#29E0C8] underline">
                Send us a message instead
              </Link>
            </p>
          </ScrollReveal>

          {/* Right — Calendly embed */}
          <ScrollReveal delay={0.15}>
            <div
              className="calendly-inline-widget"
              data-url="https://calendly.com/akprime/30min?hide_gdpr_banner=1&background_color=082121&text_color=ffffff&primary_color=37B4B4"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
