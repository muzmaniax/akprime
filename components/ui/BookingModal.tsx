"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowUpRight, Check, Mail, Phone, MapPin, Clock } from "lucide-react";
import { servicesData } from "@/data/services";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefilledService?: string;
}

export function BookingModal({ open, onOpenChange, prefilledService }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { service: prefilledService },
  });

  const onSubmit = async (data: FormData) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: "booking_modal" }),
      });
      setSubmitted(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) { reset(); setSubmitted(false); } }}>
      <DialogContent
        className="bg-transparent border-0 shadow-none p-0 max-w-3xl w-[calc(100vw-2rem)] max-h-[92vh] overflow-hidden rounded-3xl"
      >
        {!submitted ? (
          <div className="grid md:grid-cols-12 max-h-[92vh] rounded-3xl overflow-hidden bg-white shadow-2xl">
            {/* LEFT — info panel (dark, photo-backed) */}
            <div className="hidden md:block md:col-span-5 relative bg-[#082121] text-white p-8 lg:p-9">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1400&q=80')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#082121] via-[#082121]/85 to-[#0E3E3E]/80" />
              <div className="relative h-full flex flex-col">
                <DialogHeader className="text-left space-y-2">
                  <span className="inline-flex items-center gap-2 self-start text-[11px] font-semibold tracking-label uppercase text-[#37B4B4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                    Strategy Call
                  </span>
                  <DialogTitle className="text-white text-[28px] leading-[1.1] font-semibold tracking-tight">
                    Let&apos;s talk about your goals.
                  </DialogTitle>
                  <DialogDescription className="text-white/65 text-[14px] leading-relaxed pt-1">
                    A free 30-minute discovery call. No hard sell — an honest assessment of where we can help and where we can&apos;t.
                  </DialogDescription>
                </DialogHeader>

                <ul className="mt-8 space-y-3 text-[13px] text-white/80">
                  <Bullet>Senior consultant, not a sales rep</Bullet>
                  <Bullet>Reply within 1 business day</Bullet>
                  <Bullet>Clear proposal in 5 business days</Bullet>
                </ul>

                <div className="mt-auto pt-8 space-y-3 text-[13px]">
                  <ContactRow icon={<Mail size={14} />} value="info@akprime.co.ke" />
                  <ContactRow icon={<Phone size={14} />} value="0118 001 001" />
                  <ContactRow icon={<MapPin size={14} />} value="Nairobi & Mombasa" />
                  <ContactRow icon={<Clock size={14} />} value="Mon–Fri · 9am–6pm EAT" />
                </div>
              </div>
            </div>

            {/* RIGHT — form panel (light) */}
            <div className="md:col-span-7 bg-white p-6 sm:p-8 lg:p-9 overflow-y-auto">
              {/* Mobile header (md hidden uses left panel, mobile shows compact title) */}
              <div className="md:hidden mb-5">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-label uppercase text-[#37B4B4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                  Strategy Call
                </span>
                <h2 className="mt-2 text-[#082121] text-[22px] leading-[1.15] font-semibold">
                  Let&apos;s talk about your goals.
                </h2>
                <p className="mt-2 text-[13px] text-[#3a5a5a] leading-relaxed">
                  A free 30-minute discovery call. We respond within 1 business day.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Full name" error={errors.name?.message}>
                    <input
                      {...register("name")}
                      placeholder="Your full name"
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field label="Company" error={errors.company?.message}>
                    <input
                      {...register("company")}
                      placeholder="Company name"
                      className={inputCls(!!errors.company)}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="Work email" error={errors.email?.message}>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      className={inputCls(!!errors.email)}
                    />
                  </Field>
                  <Field label="Phone / WhatsApp" optional>
                    <input
                      {...register("phone")}
                      placeholder="+254..."
                      className={inputCls(false)}
                    />
                  </Field>
                </div>

                <Field label="Service of interest" optional>
                  <select
                    {...register("service")}
                    defaultValue={prefilledService || ""}
                    className={cn(inputCls(false), "appearance-none bg-no-repeat bg-[right_0.75rem_center] bg-[length:14px] pr-10")}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23082121' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                    }}
                  >
                    <option value="">What can we help with?</option>
                    {servicesData.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </Field>

                <Field label="Tell us about your situation" optional>
                  <textarea
                    {...register("message")}
                    placeholder="Brief overview of what you're working on…"
                    rows={4}
                    className={cn(inputCls(false), "resize-none py-3 leading-relaxed")}
                  />
                </Field>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-cta disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Sending…" : <>Submit request <ArrowUpRight size={16} strokeWidth={2.5} /></>}
                  </button>
                  <p className="text-[11.5px] text-[#3a5a5a] leading-snug">
                    By submitting you agree to be contacted by AK Prime regarding your request.
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl px-6 sm:px-10 py-12 text-center max-h-[92vh] overflow-hidden">
            <div className="w-14 h-14 rounded-full bg-[#37B4B4]/15 border border-[#37B4B4]/30 flex items-center justify-center mx-auto mb-5">
              <Check size={26} strokeWidth={2.5} className="text-[#37B4B4]" />
            </div>
            <h3 className="text-[#082121] text-[24px] font-semibold tracking-tight">Request received.</h3>
            <p className="mt-2 text-[14px] text-[#3a5a5a] max-w-md mx-auto leading-relaxed">
              A senior consultant will reach out within 1 business day to confirm a time
              that works for you.
            </p>
            <button
              onClick={() => { setSubmitted(false); onOpenChange(false); reset(); }}
              className="btn-ghost btn-ghost-light mt-7"
            >
              Close
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full h-12 rounded-xl bg-white px-4 text-[14px] text-[#082121] placeholder:text-[#082121]/40 focus:outline-none transition-colors border",
    hasError
      ? "border-red-400 focus:border-red-500"
      : "border-[#082121]/12 focus:border-[#37B4B4] focus:ring-2 focus:ring-[#37B4B4]/15"
  );
}

function Field({
  label,
  optional,
  error,
  children,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between mb-1.5">
        <span className="text-[12px] font-medium text-[#082121]">
          {label}{!optional && <span className="text-[#37B4B4] ml-0.5">*</span>}
        </span>
        {optional && <span className="text-[11px] text-[#3a5a5a]/60">Optional</span>}
      </span>
      {children}
      {error && <span className="block mt-1 text-[11px] text-red-500">{error}</span>}
    </label>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="w-4 h-4 mt-0.5 rounded-full bg-[#37B4B4]/20 text-[#37B4B4] inline-flex items-center justify-center shrink-0">
        <Check size={10} strokeWidth={3} />
      </span>
      <span>{children}</span>
    </li>
  );
}

function ContactRow({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <div className="flex items-center gap-2.5 text-white/80">
      <span className="w-7 h-7 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-[#37B4B4] shrink-0">
        {icon}
      </span>
      <span className="text-[13px]">{value}</span>
    </div>
  );
}
