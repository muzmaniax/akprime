"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  firstName:   z.string().min(1, "Required"),
  lastName:    z.string().min(1, "Required"),
  company:     z.string().min(1, "Required"),
  email:       z.string().email("Invalid email"),
  phone:       z.string().optional(),
  service:     z.string().min(1, "Please select a service"),
  budget:      z.string().min(1, "Please select a budget"),
  message:     z.string().min(10, "Please tell us more (min 10 chars)"),
});
type FormData = z.infer<typeof schema>;

const serviceOptions = [
  "ERP Implementation","AI Integration & Automation","Project Management","Business Analysis",
  "Audit Services","Bookkeeping & Cloud Accounting","System & IT Audits","Financial Management & FP&A",
  "Cashflow Optimisation","Company Restructuring","Digital Marketing","Training Services",
  "Company Secretarial","VC & Fundraising Advisory","Risk & Compliance","M&E / Impact Assessment",
  "Other / Multiple",
];

const budgetOptions = ["Under $10k","$10k–$50k","$50k–$200k","$200k+"];

const inputCls = "w-full px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[#37B4B4] focus:ring-2 focus:ring-[#37B4B4]/20 bg-[#F4FAFA]";
const labelCls = "block text-xs font-semibold uppercase tracking-wider mb-1.5";

export function ContactSection() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        toast.success("Message sent! We'll be in touch within 1 business day.");
        reset();
      } else {
        toast.error("Something went wrong. Please email us directly.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 lg:py-24 section-light" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-start">

          {/* Left — contact info */}
          <div>
            <span className="section-label-light mb-5 inline-block">GET IN TOUCH</span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "#082121" }}>
              We'd love to hear about your challenge.
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: "#3a5a5a" }}>
              Whether you're in Nairobi, Mombasa or the Middle East — every conversation starts with listening. Tell us where you are, and we'll show you where you could be.
            </p>

            <div className="space-y-4 mb-8">
              {[
                { icon: "📧", label: "Email", value: "hello@akprimeconsulting.com", href: "mailto:hello@akprimeconsulting.com" },
                { icon: "📞", label: "Phone / WhatsApp", value: "+254 700 000 000", href: "tel:+254700000000" },
                { icon: "📍", label: "Location", value: "Nairobi & Mombasa, Kenya · Middle East Coming Soon" },
                { icon: "🕐", label: "Response Time", value: "Within 1 business day" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: "rgba(55,180,180,.08)", border: "1px solid rgba(55,180,180,.2)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-0.5" style={{ color: "#37B4B4" }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm hover:text-[#37B4B4] transition-colors" style={{ color: "#082121" }}>{item.value}</a>
                    ) : (
                      <p className="text-sm" style={{ color: "#082121" }}>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Free resources box */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "#F4FAFA", border: "1px solid rgba(55,180,180,.3)" }}
            >
              <p className="text-sm font-semibold mb-2" style={{ color: "#082121" }}>Free Resources</p>
              <p className="text-sm mb-4" style={{ color: "#3a5a5a" }}>ERP Checklist · AI Strategy Guide · Cashflow Playbook</p>
              <a
                href="/resources"
                className="inline-block text-sm font-semibold px-5 py-2 rounded-xl border transition-colors"
                style={{ border: "1px solid rgba(55,180,180,.4)", color: "#37B4B4" }}
              >
                Download Free Guides →
              </a>
            </div>
          </div>

          {/* Right — form card */}
          <div
            className="rounded-2xl p-8"
            style={{ background: "#fff", border: "1.5px solid rgba(55,180,180,.25)", boxShadow: "0 4px 40px rgba(8,33,33,.08)" }}
          >
            <h3 className="text-xl font-bold mb-6" style={{ color: "#082121" }}>Send Us a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name row */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls} style={{ color: "#37B4B4" }}>First Name</label>
                  <input {...register("firstName")} className={inputCls} style={{ borderColor: errors.firstName ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }} placeholder="James" />
                  {errors.firstName && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className={labelCls} style={{ color: "#37B4B4" }}>Last Name</label>
                  <input {...register("lastName")} className={inputCls} style={{ borderColor: errors.lastName ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }} placeholder="Mwangi" />
                  {errors.lastName && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Company / Organisation</label>
                <input {...register("company")} className={inputCls} style={{ borderColor: errors.company ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }} placeholder="Acme Corp Ltd" />
                {errors.company && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.company.message}</p>}
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Work Email</label>
                <input {...register("email")} type="email" className={inputCls} style={{ borderColor: errors.email ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }} placeholder="james@company.com" />
                {errors.email && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Phone / WhatsApp</label>
                <input {...register("phone")} className={inputCls} style={{ borderColor: "rgba(55,180,180,.2)", color: "#082121" }} placeholder="+254 700 000 000" />
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Service of Interest</label>
                <select {...register("service")} className={inputCls} style={{ borderColor: errors.service ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }}>
                  <option value="">Select a service…</option>
                  {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.service && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.service.message}</p>}
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Approximate Budget</label>
                <select {...register("budget")} className={inputCls} style={{ borderColor: errors.budget ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }}>
                  <option value="">Select budget range…</option>
                  {budgetOptions.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
                {errors.budget && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.budget.message}</p>}
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Tell Us About Your Challenge</label>
                <textarea
                  {...register("message")}
                  rows={4}
                  className={inputCls}
                  style={{ borderColor: errors.message ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121", resize: "vertical" }}
                  placeholder="Describe your current challenges and what you're hoping to achieve…"
                />
                {errors.message && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-sm font-semibold transition-colors cta-pulse disabled:opacity-60"
                style={{ background: "#37B4B4", color: "#082121" }}
              >
                {loading ? "Sending…" : "Send Message →"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
