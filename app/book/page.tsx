"use client";

import Link from "next/link";
import { CheckCircle2, Clock, Shield, Star, ArrowRight, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState } from "react";

const benefits = [
  "Honest assessment. No hard sell, no wasted time.",
  "Tailored to your specific industry and business size",
  "Advice from a senior consultant with 15+ years of experience",
  "Clear recommended next steps, even if we're not the right fit",
];

const industries = [
  "Manufacturing & Supply Chain",
  "Financial Services",
  "Retail & E-commerce",
  "Healthcare",
  "Real Estate & Construction",
  "Professional Services",
  "Government & Public Sector",
  "Other",
];

export default function BookPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first: "", last: "", email: "", company: "", industry: "", challenge: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Something went wrong. Please try again or email us at info@akprime.co.ke");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#082121] pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {!submitted ? (
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <span className="section-label mb-6 inline-block">Book a Consultation</span>
              <h1 className="text-5xl font-medium text-white tracking-tight mb-6">
                30-Minute Strategy<br />
                <span className="text-[#37B4B4]">Discovery Call</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Tell us a little about your situation — it helps us come prepared with relevant insights for your specific challenge.
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
                Prefer to write instead?{" "}
                <Link href="/contact" className="text-[#37B4B4] hover:text-[#29E0C8] underline">
                  Send us a message
                </Link>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="glass-card rounded-2xl p-8 border border-white/8">
                <p className="text-white font-semibold mb-1">Request a call</p>
                <p className="text-white/40 text-sm mb-6">We'll reach out within 1 business day to confirm a time.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs mb-1.5">First name <span className="text-[#37B4B4]">*</span></label>
                      <input
                        type="text"
                        required
                        value={form.first}
                        onChange={e => setForm(f => ({ ...f, first: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition"
                        placeholder="Ahmed"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs mb-1.5">Last name</label>
                      <input
                        type="text"
                        value={form.last}
                        onChange={e => setForm(f => ({ ...f, last: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition"
                        placeholder="Hassan"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Email address <span className="text-[#37B4B4]">*</span></label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition"
                      placeholder="ahmed@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Company / Organisation</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition"
                      placeholder="Acme Ltd"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">Industry</label>
                    <select
                      value={form.industry}
                      onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                      className="w-full bg-[#082121] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#37B4B4]/50 transition"
                    >
                      <option value="" disabled>Select your industry</option>
                      {industries.map(i => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">What's your biggest challenge right now? <span className="text-[#37B4B4]">*</span></label>
                    <textarea
                      required
                      rows={4}
                      value={form.challenge}
                      onChange={e => setForm(f => ({ ...f, challenge: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition resize-none"
                      placeholder="e.g. We're struggling with manual reporting across 3 systems..."
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] disabled:opacity-60 text-[#082121] font-semibold py-3.5 rounded-xl transition-all"
                  >
                    {loading ? <Loader2 size={16} className="animate-spin" /> : <>Request a call <ArrowRight size={16} /></>}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        ) : (
          <div className="max-w-lg mx-auto text-center py-20">
            <ScrollReveal>
              <div className="w-16 h-16 rounded-full bg-[#37B4B4]/15 border border-[#37B4B4]/30 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={30} className="text-[#37B4B4]" />
              </div>
              <h2 className="text-3xl font-semibold text-white mb-3">Request received.</h2>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                A senior consultant will reach out within 1 business day to confirm a time that works for you.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-6 py-3 rounded-xl transition-all"
              >
                Back to home
              </Link>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
