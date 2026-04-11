"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const schema = z.object({
  firstName:   z.string().min(1, "First name is required"),
  lastName:    z.string().min(1, "Last name is required"),
  company:     z.string().min(1, "Company name is required"),
  email:       z
    .string()
    .min(1, "Email is required")
    .regex(
      /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
      "Enter a valid email address (e.g. name@company.com)"
    ),
  phone:       z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^\+?[0-9]{7,12}$/,
      "Enter a valid phone number with country code, digits only (e.g. +254700000000)"
    ),
  service:     z.string().min(1, "Please select a service"),
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



const inputCls = "w-full min-h-[44px] px-3 py-2.5 rounded-xl border text-sm outline-none transition-colors focus:border-[#37B4B4] focus:ring-2 focus:ring-[#37B4B4]/20 bg-[#F4FAFA]";
const labelCls = "block text-[13px] font-medium mb-2";

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
    <section className="py-10 lg:py-14 section-light" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">

          {/* Left — contact info */}
          <div>
            <span className="section-overline mb-3 inline-block">Get in touch</span>
            <h2 className="text-2xl sm:text-3xl font-medium mb-2" style={{ color: "#082121" }}>
              We'd love to hear about your challenge.
            </h2>
            <p className="text-base leading-relaxed mb-4" style={{ color: "#3a5a5a" }}>
              Whether you're in <span className="text-[#37B4B4] font-medium">Nairobi</span>, <span className="text-[#37B4B4] font-medium">Mombasa</span> or the <span className="text-[#37B4B4] font-medium">Middle East</span> — every conversation starts with <span className="text-[#082121] font-medium">listening</span>. Tell us where you are, and we'll show you where you could be.
            </p>

            <div className="space-y-4 mb-4">
              {[
                { icon: Mail, label: "Email", value: "info@akprime.co.ke", href: "mailto:info@akprime.co.ke" },
                { icon: Phone, label: "Phone / WhatsApp", value: "0118001001", href: "tel:0118001001" },
                { icon: MapPin, label: "Location", value: "Nairobi & Mombasa, Kenya · Middle East Coming Soon" },
                { icon: Clock, label: "Response Time", value: "Within 1 business day" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-[#37B4B4] shrink-0"
                    style={{ background: "rgba(55,180,180,.1)", border: "1px solid rgba(55,180,180,.2)" }}
                  >
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="flex flex-col items-start gap-1 pt-0.5">
                    <span className="pill-a !h-5 !px-3 font-semibold !text-[10px]">{item.label}</span>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium hover:text-[#37B4B4] transition-colors" style={{ color: "#082121" }}>{item.value}</a>
                    ) : (
                      <p className="text-sm font-medium" style={{ color: "#082121" }}>{item.value}</p>
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
                className="pill-a !h-10 !px-6 !text-sm hover:bg-[#37B4B4] hover:text-white transition-colors duration-300"
              >
                Download Free Guides →
              </a>
            </div>
          </div>

          {/* Right — form card */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#fff", border: "1.5px solid rgba(55,180,180,.25)", boxShadow: "0 4px 40px rgba(8,33,33,.08)" }}
          >
            <h3 className="text-lg font-bold mb-4" style={{ color: "#082121" }}>Send Us a Message</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              {/* Name row */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className={labelCls} style={{ color: "#37B4B4" }}>First Name</label>
                  <input {...register("firstName")} className={inputCls} style={{ borderColor: errors.firstName ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }} placeholder="First name" autoComplete="given-name" />
                  {errors.firstName && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className={labelCls} style={{ color: "#37B4B4" }}>Last Name</label>
                  <input {...register("lastName")} className={inputCls} style={{ borderColor: errors.lastName ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }} placeholder="Last name" autoComplete="family-name" />
                  {errors.lastName && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.lastName.message}</p>}
                </div>
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Company / Organisation</label>
                <input {...register("company")} className={inputCls} style={{ borderColor: errors.company ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }} placeholder="Company or organisation name" autoComplete="organization" />
                {errors.company && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.company.message}</p>}
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Work Email</label>
                <input
                  {...register("email")}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  className={inputCls}
                  style={{ borderColor: errors.email ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }}
                  placeholder="your@email.com"
                />
                {errors.email && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.email.message}</p>}
              </div>

              <div>
                <label className={labelCls} style={{ color: "#37B4B4" }}>Phone / WhatsApp</label>
                <input
                  {...register("phone")}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={13}
                  className={inputCls}
                  style={{ borderColor: errors.phone ? "#d9534f" : "rgba(55,180,180,.2)", color: "#082121" }}
                  placeholder="+254 700 000 000"
                  onKeyDown={(e) => {
                    // Allow: Backspace, Delete, Tab, Escape, Enter, Arrow keys, Home, End
                    const allowed = ["Backspace","Delete","Tab","Escape","Enter","ArrowLeft","ArrowRight","Home","End"];
                    if (allowed.includes(e.key)) return;
                    // Allow + only as the very first character
                    if (e.key === "+" && (e.currentTarget as HTMLInputElement).selectionStart === 0) return;
                    // Block anything that is not a digit
                    if (!/^[0-9]$/.test(e.key)) e.preventDefault();
                  }}
                />
                {errors.phone && <p className="text-[11px] mt-1" style={{ color: "#d9534f" }}>{errors.phone.message}</p>}
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
                className="pill-e cta-pulse disabled:opacity-60 w-full"
              >
                <div className="pill-e-group w-full justify-center">
                  {loading ? "Sending…" : "Send message"}
                  {loading ? null : (
                    <div className="pill-e-icon">
                      <span>→</span>
                    </div>
                  )}
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
