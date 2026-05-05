import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, Clock, Shield, Star } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Book a Strategy Consultation | AK Prime Consulting",
  description: "Book a free 30-minute strategy consultation with AK Prime Consulting. Get an honest assessment of your situation and a clear next step.",
};

const benefits = [
  "Honest assessment — no hard sell, no wasted time",
  "Tailored to your specific industry and business size",
  "Advice from a senior consultant with 15+ years of experience",
  "Clear recommended next steps, even if we're not the right fit",
];

export default function BookPage() {
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
              Not sure if AK Prime is right for you? Book a no-obligation call. We'll hear about your situation, ask the right questions, and give you an honest recommendation — whether that means working together or pointing you in another direction.
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

          {/* Right — Calendar embed placeholder */}
          <ScrollReveal delay={0.15}>
            <div className="glass-card rounded-2xl p-8 border border-white/8">
              <div className="flex items-center gap-2 mb-6">
                <Calendar size={20} className="text-[#37B4B4]" />
                <span className="text-white font-semibold">Select a Time</span>
              </div>

              {/* Calendly placeholder */}
              <div className="bg-[#082121] rounded-xl p-8 text-center border border-white/5 mb-6">
                <Calendar size={36} className="text-[#37B4B4] mx-auto mb-4 opacity-60" />
                <p className="text-white/50 text-sm mb-2">Calendar Integration</p>
                <p className="text-white/30 text-xs mb-6">
                  Connect your Calendly or Cal.com embed here. Replace this placeholder with your booking widget script.
                </p>
                <div className="space-y-2">
                  {["Tuesday 18 March · 10:00 AM", "Tuesday 18 March · 2:00 PM", "Wednesday 19 March · 9:00 AM", "Wednesday 19 March · 11:00 AM"].map((slot) => (
                    <button
                      key={slot}
                      className="w-full px-4 py-3 rounded-xl border border-white/10 text-white/60 hover:border-[#37B4B4]/40 hover:text-white hover:bg-[#37B4B4]/5 transition-all text-sm"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <p className="text-center text-white/30 text-xs mb-4">
                All times shown in EAT (UTC+3)
              </p>

              <Link
                href="/contact"
                className="w-full flex items-center justify-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold py-3.5 rounded-xl cta-pulse transition-all"
              >
                Or Send Us a Message <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
