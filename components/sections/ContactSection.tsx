"use client";

import { useState } from "react";
import { Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { Reveal, Eyebrow } from "@/components/ui/Primitives";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n/context";

export function ContactSection() {
  const { locale, isRTL, t } = useI18n();
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error();
      toast.success(
        locale === "ar"
          ? "شكراً لتواصلك. سيقوم أحد مستشارينا بالرد عليك خلال يوم عمل واحد."
          : "Thanks. We'll be in touch within one business day."
      );
      form.reset();
    } catch {
      toast.error(
        locale === "ar"
          ? "حدث خطأ أثناء الإرسال. يرجى مراسلتنا مباشرة عبر info@akprime.co.ke"
          : "Something went wrong. Please email us directly at info@akprime.co.ke"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-light section-py border-t border-[#082121]/8">
      <div className="container-x">
        <div className="max-w-[1060px] mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left — info panel */}
          <Reveal className="lg:col-span-5 space-y-6">
            <div>
              <Eyebrow>{t.contactSection.overline}</Eyebrow>
              <h2 className="mt-4 text-[#082121] text-balance text-[28px] sm:text-[34px] font-medium">
                {locale === "ar" ? "كيف تبدأ التعاون معنا؟" : "How to get started"}
              </h2>
              <p className="mt-3 text-[14px] text-[#3a5a5a] leading-relaxed max-w-md">
                {t.contactSection.description}
              </p>
            </div>

            {/* Contact details — simple vertical list */}
            <div className="flex flex-col gap-4">
              <ContactRow
                icon={<Phone size={15} />}
                label={locale === "ar" ? "اتصال هاتف / واتساب" : "Call"}
                value="0118 001 001"
                isLtr
              />
              <ContactRow
                icon={<Mail size={15} />}
                label={locale === "ar" ? "البريد الإلكتروني" : "Email"}
                value="info@akprime.co.ke"
                isLtr
              />
              <ContactRow
                icon={<Clock size={15} />}
                label={locale === "ar" ? "أوقات العمل" : "Hours"}
                value={
                  locale === "ar"
                    ? "الإثنين–الجمعة: 8 ص – 5 م"
                    : "Mon–Fri 8am–5pm EAT"
                }
              />
            </div>
          </Reveal>

          {/* Right — form */}
          <Reveal delay={120} className="lg:col-span-7">
            <form
              onSubmit={onSubmit}
              className="card-light p-5 sm:p-7 lg:p-8 space-y-4 sm:space-y-5"
            >
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                  label={locale === "ar" ? "الاسم الأول" : "First name"}
                  name="first"
                  placeholder={locale === "ar" ? "مثال: أحمد" : "e.g. John"}
                  required
                />
                <Field
                  label={locale === "ar" ? "اسم العائلة" : "Last name"}
                  name="last"
                  placeholder={locale === "ar" ? "مثال: المنصوري" : "e.g. Mwangi"}
                  required
                />
              </div>
              <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                <Field
                  label={locale === "ar" ? "البريد الإلكتروني المهني" : "Email address"}
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  dir="ltr"
                />
                <Field
                  label={locale === "ar" ? "رقم الهاتف / واتساب" : "Phone number"}
                  name="phone"
                  type="tel"
                  placeholder="+254 700 000 000"
                  dir="ltr"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-[14px] font-medium text-[#082121] mb-2"
                >
                  {locale === "ar"
                    ? "كيف يمكننا مساعدتك في تحقيق أهدافك؟"
                    : "How can we help?"}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  className="w-full rounded-xl border border-[#082121]/12 bg-white px-4 py-3 text-[14px] text-[#082121] placeholder:text-[#082121]/30 focus:outline-none focus:border-[#37B4B4] transition-colors resize-none"
                  placeholder={
                    locale === "ar"
                      ? "صف لنا بإيجاز التحديات التشغيلية، والأنظمة الحالية، والنتائج التي تطمح لتحقيقها..."
                      : "Briefly describe what you're working on and what outcome you're hoping for."
                  }
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="btn-cta w-full sm:w-auto disabled:opacity-55 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {submitting ? (
                  locale === "ar" ? "جاري الإرسال…" : "Submitting…"
                ) : (
                  <>
                    <span>
                      {locale === "ar" ? "إرسال الرسالة" : "Send message"}
                    </span>
                    <ArrowUpRight size={15} strokeWidth={2.25} className="rtl-mirror shrink-0" />
                  </>
                )}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
  isLtr = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isLtr?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[#37B4B4] shrink-0">{icon}</span>
      <div>
        <div className="text-[10px] tracking-widest uppercase text-[#3a5a5a]/60 font-medium">
          {label}
        </div>
        <div
          className={`text-[13px] font-medium text-[#082121] leading-snug ${
            isLtr ? "ltr-isolate" : ""
          }`}
          dir={isLtr ? "ltr" : undefined}
        >
          {isLtr ? <bdi>{value}</bdi> : value}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  dir,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  dir?: "ltr" | "rtl";
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[14px] font-medium text-[#082121] mb-2">
        {label}
        {required && <span className="text-[#37B4B4] ml-0.5 mr-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        dir={dir}
        className={`w-full h-11 rounded-xl border border-[#082121]/12 bg-white px-4 text-[14px] text-[#082121] placeholder:text-[#082121]/30 focus:outline-none focus:border-[#37B4B4] transition-colors ${
          dir === "ltr" ? "ltr-isolate" : ""
        }`}
      />
    </div>
  );
}
