"use client";

import { useState } from "react";
import { Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { toast } from "sonner";

export function ContactSection() {
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    toast.success("Thanks — we'll be in touch within one business day.");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <section className="section-light section-py border-t border-[#082121]/8">
      <div className="container-x grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-5 space-y-8">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-4 text-[#082121] text-balance">
              How to get started
            </h2>
            <p className="mt-4 text-[15px] text-[#3a5a5a] leading-relaxed max-w-md">
              Share a few details about what you're working on. We respond within one business day with next steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <ContactTile icon={<Phone size={16} />} label="Call" value="0118 001 001" />
            <ContactTile icon={<Mail size={16} />} label="Email" value="info@akprime.co.ke" />
            <ContactTile icon={<Clock size={16} />} label="Hours" value="Mon–Fri · 9am–6pm" />
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <form onSubmit={onSubmit} className="card-light p-7 lg:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="First name" name="first" placeholder="e.g. John" required />
              <Field label="Last name" name="last" placeholder="e.g. Mwangi" required />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Email address" name="email" type="email" placeholder="you@company.com" required />
              <Field label="Phone number" name="phone" type="tel" placeholder="+254 700 000 000" />
            </div>
            <div>
              <label htmlFor="message" className="block text-[13px] font-medium text-[#082121] mb-2">
                How can we help?
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full rounded-xl border border-[#082121]/12 bg-white px-4 py-3 text-[14px] text-[#082121] placeholder:text-[#082121]/30 focus:outline-none focus:border-[#37B4B4] transition-colors resize-none"
                placeholder="Briefly describe what you're working on and what outcome you're hoping for."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn-cta w-full sm:w-auto disabled:opacity-55 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : <>Send message <ArrowUpRight size={15} strokeWidth={2.25} /></>}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function ContactTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="card-light p-4">
      <div className="w-8 h-8 rounded-full bg-[#37B4B4]/10 text-[#37B4B4] flex items-center justify-center">{icon}</div>
      <div className="text-[10px] tracking-caption uppercase text-[#3a5a5a]/70 mt-3">{label}</div>
      <div className="text-[13px] font-medium text-[#082121] mt-1">{value}</div>
    </div>
  );
}

function Field({ label, name, type = "text", placeholder, required }: { label: string; name: string; type?: string; placeholder?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-[13px] font-medium text-[#082121] mb-2">
        {label}{required && <span className="text-[#37B4B4] ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full h-11 rounded-xl border border-[#082121]/12 bg-white px-4 text-[14px] text-[#082121] placeholder:text-[#082121]/30 focus:outline-none focus:border-[#37B4B4] transition-colors"
      />
    </div>
  );
}
