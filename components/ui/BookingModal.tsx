"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ArrowUpRight, Check, Mail, Phone, MapPin, Clock, X } from "lucide-react";
import { getLocalizedServices } from "@/lib/i18n/localized-data";
import { useI18n } from "@/lib/i18n/context";
import { cn } from "@/lib/utils";
import { useSiteImage } from "@/lib/use-site-images";

interface BookingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  prefilledService?: string;
}

export function BookingModal({ open, onOpenChange, prefilledService }: BookingModalProps) {
  const { locale, isRTL, t: dict } = useI18n();
  const bookingBg = useSiteImage("booking.bg");
  const [submitted, setSubmitted] = useState(false);

  const services = getLocalizedServices(locale);

  const schema = z.object({
    name: z
      .string()
      .min(2, locale === "ar" ? "الاسم مطلوب" : "Name is required"),
    company: z
      .string()
      .min(1, locale === "ar" ? "اسم الشركة مطلوب" : "Company is required"),
    email: z
      .string()
      .email(locale === "ar" ? "البريد الإلكتروني غير صالح" : "Valid email required"),
    phone: z
      .string()
      .min(1, locale === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required"),
    service: z.string().optional(),
    message: z.string().optional(),
  });

  type FormData = z.infer<typeof schema>;

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
        body: JSON.stringify({ ...data, source: "booking_modal", locale }),
      });
      setSubmitted(true);
    } catch {
      toast.error(
        locale === "ar"
          ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again."
      );
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        onOpenChange(o);
        if (!o) {
          reset();
          setSubmitted(false);
        }
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="bg-transparent border-0 shadow-none ring-0 p-0 gap-0 w-[calc(100vw-2rem)] max-w-[900px] sm:max-w-[900px] max-h-[90vh] overflow-hidden rounded-3xl"
      >
        {!submitted ? (
          <div
            className="relative grid md:grid-cols-[5fr_7fr] max-h-[90vh] rounded-3xl overflow-hidden bg-white shadow-2xl"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Close button */}
            <DialogClose className="absolute top-3 ltr:right-3 rtl:left-3 z-20 w-8 h-8 rounded-full bg-black/20 hover:bg-black/35 flex items-center justify-center text-white transition-colors backdrop-blur-sm cursor-pointer">
              <X size={15} strokeWidth={2.5} />
            </DialogClose>

            {/* LEFT — info panel (dark, photo-backed) */}
            <div className="hidden md:flex flex-col relative bg-[#082121] text-white p-7">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-25"
                style={{
                  backgroundImage: `url('${bookingBg || "/images/team-collaboration.webp"}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#082121] via-[#082121]/85 to-[#0E3E3E]/80" />
              <div className="relative h-full flex flex-col">
                <DialogHeader className="text-left rtl:text-right space-y-2">
                  <span className="inline-flex items-center gap-2 self-start text-[11px] font-semibold tracking-[0.14em] uppercase text-[#37B4B4]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                    {locale === "ar" ? "جلسة استكشافية" : "Strategy Call"}
                  </span>
                  <DialogTitle className="text-white text-[22px] leading-[1.2] font-semibold tracking-tight">
                    {locale === "ar"
                      ? "دعنا نناقش أهدافك وتطلعاتك المؤسسية."
                      : "Let's talk about your goals."}
                  </DialogTitle>
                  <DialogDescription className="text-white/65 text-[13px] leading-relaxed pt-1">
                    {locale === "ar"
                      ? "جلسة استكشافية مجانية لمدة 30 دقيقة. تقييم موضوعي وصادق لكيفية دعم مؤسستك وتحقيق أهدافك."
                      : "A free 30-minute discovery call. No hard sell, just an honest assessment of where we can help and where we can't."}
                  </DialogDescription>
                </DialogHeader>

                <ul className="mt-6 space-y-3 text-[13px] text-white/80">
                  <Bullet>
                    {locale === "ar"
                      ? "حوار مع مستشار أول، وليس مندوب مبيعات"
                      : "Senior consultant, not a sales rep"}
                  </Bullet>
                  <Bullet>
                    {locale === "ar"
                      ? "تأكيد الموعد خلال يوم عمل واحد"
                      : "Reply within 1 business day"}
                  </Bullet>
                  <Bullet>
                    {locale === "ar"
                      ? "مقترح عمل واضح خلال 5 أيام عمل"
                      : "Clear proposal in 5 business days"}
                  </Bullet>
                </ul>

                <div className="mt-auto pt-6 space-y-3 text-[13px]">
                  <ContactRow
                    icon={<Mail size={14} />}
                    value="info@akprime.co.ke"
                    isLtr
                  />
                  <ContactRow
                    icon={<Phone size={14} />}
                    value="0118 001 001"
                    isLtr
                  />
                  <ContactRow
                    icon={<MapPin size={14} />}
                    value={
                      locale === "ar"
                        ? "نيروبي · مومباسا · دبي"
                        : "Mombasa · Nairobi · Dubai"
                    }
                  />
                  <ContactRow
                    icon={<Clock size={14} />}
                    value={
                      locale === "ar"
                        ? "الإثنين–الجمعة · 8 ص – 5 م EAT"
                        : "Mon–Fri · 8am–5pm EAT"
                    }
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — form panel (light) */}
            <div className="bg-white p-6 sm:p-8 overflow-y-auto">
              {/* Mobile header */}
              <div className="md:hidden mb-5">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#37B4B4]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#37B4B4]" />
                  {locale === "ar" ? "جلسة استكشافية" : "Strategy Call"}
                </span>
                <h2 className="mt-2 text-[#082121] text-[22px] leading-[1.2] font-semibold">
                  {locale === "ar"
                    ? "دعنا نناقش أهدافك وتطلعاتك المؤسسية."
                    : "Let's talk about your goals."}
                </h2>
                <p className="mt-2 text-[13px] text-[#3a5a5a] leading-relaxed">
                  {locale === "ar"
                    ? "جلسة استكشافية مجانية لمدة 30 دقيقة. نرد خلال يوم عمل واحد."
                    : "A free 30-minute discovery call. We respond within 1 business day."}
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field
                    label={locale === "ar" ? "الاسم الكامل" : "Full name"}
                    error={errors.name?.message}
                  >
                    <input
                      {...register("name")}
                      placeholder={
                        locale === "ar" ? "اسمك الكريم" : "Your full name"
                      }
                      className={inputCls(!!errors.name)}
                    />
                  </Field>
                  <Field
                    label={locale === "ar" ? "اسم المؤسسة / الشركة" : "Company"}
                    error={errors.company?.message}
                  >
                    <input
                      {...register("company")}
                      placeholder={
                        locale === "ar" ? "اسم الشركة" : "Company name"
                      }
                      className={inputCls(!!errors.company)}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field
                    label={locale === "ar" ? "البريد الإلكتروني المهني" : "Work email"}
                    error={errors.email?.message}
                  >
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="you@company.com"
                      dir="ltr"
                      className={cn(inputCls(!!errors.email), "ltr-isolate")}
                    />
                  </Field>
                  <Field
                    label={locale === "ar" ? "الهاتف / واتساب" : "Phone / WhatsApp"}
                    error={errors.phone?.message}
                  >
                    <input
                      {...register("phone")}
                      placeholder="+254..."
                      dir="ltr"
                      className={cn(inputCls(false), "ltr-isolate")}
                    />
                  </Field>
                </div>

                <Field
                  label={locale === "ar" ? "مجال الاستشارة المطلوب" : "Service of interest"}
                  optional
                >
                  <select
                    {...register("service")}
                    defaultValue={prefilledService || ""}
                    className={cn(
                      inputCls(false),
                      "appearance-none bg-no-repeat bg-[length:14px] ltr:bg-[right_0.75rem_center] rtl:bg-[left_0.75rem_center] ltr:pr-10 rtl:pl-10"
                    )}
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%23082121' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'/%3e%3c/svg%3e\")",
                    }}
                  >
                    <option value="">
                      {locale === "ar" ? "كيف يمكننا مساعدتك؟" : "What can we help with?"}
                    </option>
                    {services.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                    <option value="Not sure yet">
                      {locale === "ar" ? "لست متأكداً بعد" : "Not sure yet"}
                    </option>
                  </select>
                </Field>

                <Field
                  label={locale === "ar" ? "نبذة عن التحديات أو الأهداف" : "Tell us about your situation"}
                  optional
                >
                  <textarea
                    {...register("message")}
                    placeholder={
                      locale === "ar"
                        ? "أخبرنا بإيجاز عن التحديات والأنظمة الحالية..."
                        : "Brief overview of what you're working on…"
                    }
                    rows={4}
                    className={cn(inputCls(false), "resize-none py-3 leading-relaxed")}
                  />
                </Field>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-cta disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      locale === "ar" ? "جاري الإرسال…" : "Sending…"
                    ) : (
                      <>
                        <span>
                          {locale === "ar" ? "تأكيد طلب الاستشارة" : "Submit request"}
                        </span>
                        <ArrowUpRight size={16} strokeWidth={2.5} className="rtl-mirror shrink-0" />
                      </>
                    )}
                  </button>
                  <p className="text-[11.5px] text-[#3a5a5a] leading-snug">
                    {locale === "ar"
                      ? "بإرسالك هذا النموذج، فإنك توافق على تواصل إيه كي برايم معك بخصوص طلبك."
                      : "By submitting you agree to be contacted by AK Prime regarding your request."}
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div
            className="bg-white rounded-3xl shadow-2xl px-6 sm:px-10 py-12 text-center max-h-[92vh] overflow-hidden"
            dir={isRTL ? "rtl" : "ltr"}
          >
            <div className="w-14 h-14 rounded-full bg-[#37B4B4]/15 border border-[#37B4B4]/30 flex items-center justify-center mx-auto mb-5">
              <Check size={26} strokeWidth={2.5} className="text-[#37B4B4]" />
            </div>
            <h3 className="text-[#082121] text-[24px] font-semibold tracking-tight">
              {locale === "ar" ? "تم استلام طلبك بنجاح." : "Request received."}
            </h3>
            <p className="mt-2 text-[14px] text-[#3a5a5a] max-w-md mx-auto leading-relaxed">
              {locale === "ar"
                ? "سيتواصل معك أحد كبار المستشارين خلال يوم عمل واحد لتأكيد موعد اللقاء المناسب لك."
                : "A senior consultant will reach out within 1 business day to confirm a time that works for you."}
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onOpenChange(false);
                reset();
              }}
              className="btn-ghost btn-ghost-light mt-7 cursor-pointer"
            >
              {locale === "ar" ? "إغلاق" : "Close"}
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
          {label}
          {!optional && <span className="text-[#37B4B4] ml-0.5 mr-0.5">*</span>}
        </span>
        {optional && (
          <span className="text-[11px] text-[#3a5a5a]/60">
            {label.includes("مجال") || label.includes("نبذة") ? "اختياري" : "Optional"}
          </span>
        )}
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

function ContactRow({
  icon,
  value,
  isLtr = false,
}: {
  icon: React.ReactNode;
  value: string;
  isLtr?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 text-white/80">
      <span className="w-7 h-7 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-[#37B4B4] shrink-0">
        {icon}
      </span>
      <span className={`text-[13px] ${isLtr ? "ltr-isolate" : ""}`} dir={isLtr ? "ltr" : undefined}>
        {isLtr ? <bdi>{value}</bdi> : value}
      </span>
    </div>
  );
}
