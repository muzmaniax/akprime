"use client";

import Link from "next/link";
import { CheckCircle2, Clock, Shield, Star, ArrowRight, Loader2 } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { useState } from "react";
import { useI18n } from "@/lib/i18n/context";

const benefitsEn = [
  "Honest assessment. No hard sell, no wasted time.",
  "Tailored to your specific industry and business size",
  "Advice from a senior consultant with 15+ years of experience",
  "Clear recommended next steps, even if we're not the right fit",
];

const benefitsAr = [
  "تقييم صريح وموضوعي: دون إلحاح بيعي ودون إهدار لوقتكم الثمين.",
  "مصمم ليتطابق مع طبيعة قطاعك وحجم مؤسستك بدقة.",
  "استشارة مباشرة يقودها مستشار تنفيذي يتمتع بخبرة تزيد عن 15 عاماً.",
  "توصيات واضحة ومحددة للخطوات التالية حتى وإن لم نكن الشريك الأنسب.",
];

const industriesEn = [
  "Manufacturing & Supply Chain",
  "Financial Services",
  "Retail & E-commerce",
  "Healthcare",
  "Real Estate & Construction",
  "Professional Services",
  "Government & Public Sector",
  "Other",
];

const industriesAr = [
  "التصنيع وسلاسل الإمداد",
  "الخدمات المالية والمصرفية",
  "التجزئة والتجارة الإلكترونية",
  "الرعاية الصحية",
  "العقارات والإنشاءات",
  "الخدمات المهنية والاستشارية",
  "القطاع الحكومي والمؤسسات العامة",
  "أخرى",
];

export default function BookPage() {
  const { locale, dir } = useI18n();
  const isAr = locale === "ar";
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    first: "", last: "", email: "", company: "", industry: "", challenge: "",
  });

  const benefits = isAr ? benefitsAr : benefitsEn;
  const industries = isAr ? industriesAr : industriesEn;

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
      setError(
        isAr
          ? "حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى أو مراسلتنا عبر info@akprime.co.ke"
          : "Something went wrong. Please try again or email us at info@akprime.co.ke"
      );
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
              <span className="section-label mb-6 inline-block">
                {isAr ? "حجز استشارة استراتيجية" : "Book a Consultation"}
              </span>
              <h1 className="text-5xl font-medium text-white tracking-tight mb-6">
                {isAr ? (
                  <>
                    جلسة استكشافية لمدة 30 دقيقة<br />
                    <span className="text-[#37B4B4]">لتحديد المسار الاستراتيجي</span>
                  </>
                ) : (
                  <>
                    30-Minute Strategy<br />
                    <span className="text-[#37B4B4]">Discovery Call</span>
                  </>
                )}
              </h1>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                {isAr
                  ? "شاركنا نبذة مختصرة عن وضع مؤسستك الحالي، ليحضر مستشارونا بالرؤى والبيانات الأكثر ملاءمة لتحدياتك."
                  : "Tell us a little about your situation — it helps us come prepared with relevant insights for your specific challenge."}
              </p>

              <div className="space-y-4 mb-10">
                {benefits.map((b) => (
                  <div key={b} className="flex gap-3 items-start">
                    <CheckCircle2 className="text-[#37B4B4] shrink-0 mt-0.5" size={18} />
                    <span className="text-white/70 text-sm leading-relaxed">{b}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-10">
                {[
                  { icon: <Clock size={18} />, label: isAr ? "30 دقيقة" : "30 Minutes", sub: isAr ? "مباشرة ومكثفة" : "Focused & efficient" },
                  { icon: <Shield size={18} />, label: isAr ? "دون قيود" : "No strings", sub: isAr ? "دون أي التزام مالي" : "Zero obligation" },
                  { icon: <Star size={18} />, label: isAr ? "مستوى تنفيذي" : "Senior level", sub: isAr ? "مستشار رئيسي" : "Principal consultant" },
                ].map((item) => (
                  <div key={item.label} className="glass-card rounded-xl p-4 text-center">
                    <div className="text-[#37B4B4] flex justify-center mb-2">{item.icon}</div>
                    <div className="text-white font-semibold text-sm">{item.label}</div>
                    <div className="text-white/40 text-xs mt-0.5">{item.sub}</div>
                  </div>
                ))}
              </div>

              <p className="text-white/35 text-sm">
                {isAr ? "تفضل المراسلة المكتوبة بدلاً من ذلك؟" : "Prefer to write instead?"}{" "}
                <Link href={`/${locale}/contact`} className="text-[#37B4B4] hover:text-[#29E0C8] underline">
                  {isAr ? "أرسل لنا رسالة تفصيلية" : "Send us a message"}
                </Link>
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="glass-card rounded-2xl p-8 border border-white/8">
                <p className="text-white font-semibold mb-1">
                  {isAr ? "طلب حجز الموعد" : "Request a call"}
                </p>
                <p className="text-white/40 text-sm mb-6">
                  {isAr
                    ? "سيتواصل معك فريقنا خلال يوم عمل واحد لتأكيد التوقيت الأنسب لك."
                    : "We'll reach out within 1 business day to confirm a time."}
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white/60 text-xs mb-1.5">
                        {isAr ? "الاسم الأول" : "First name"} <span className="text-[#37B4B4]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={form.first}
                        onChange={e => setForm(f => ({ ...f, first: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition"
                        placeholder={isAr ? "أحمد" : "Ahmed"}
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-xs mb-1.5">
                        {isAr ? "اسم العائلة" : "Last name"}
                      </label>
                      <input
                        type="text"
                        value={form.last}
                        onChange={e => setForm(f => ({ ...f, last: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition"
                        placeholder={isAr ? "حسن" : "Hassan"}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">
                      {isAr ? "البريد الإلكتروني المهني" : "Email address"} <span className="text-[#37B4B4]">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition text-left ltr-isolate"
                      dir="ltr"
                      placeholder="name@company.com"
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">
                      {isAr ? "اسم الشركة أو المؤسسة" : "Company / Organisation"}
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition"
                      placeholder={isAr ? "شركة الأفق القابضة" : "Acme Ltd"}
                    />
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">
                      {isAr ? "القطاع" : "Industry"}
                    </label>
                    <select
                      value={form.industry}
                      onChange={e => setForm(f => ({ ...f, industry: e.target.value }))}
                      className="w-full bg-[#082121] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#37B4B4]/50 transition"
                    >
                      <option value="" disabled>{isAr ? "اختر قطاع أعمالك" : "Select your industry"}</option>
                      {industries.map(i => (
                        <option key={i} value={i}>{i}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/60 text-xs mb-1.5">
                      {isAr ? "ما هو أكبر تحدٍ تشغيلي أو استراتيجي تواجهه الآن؟" : "What's your biggest challenge right now?"}{" "}
                      <span className="text-[#37B4B4]">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={form.challenge}
                      onChange={e => setForm(f => ({ ...f, challenge: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-[#37B4B4]/50 transition resize-none"
                      placeholder={isAr ? "مثال: نعاني من تشتت التقارير المالية واليدوية بين ثلاثة أنظمة مختلفة..." : "e.g. We're struggling with manual reporting across 3 systems..."}
                    />
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] disabled:opacity-60 text-[#082121] font-semibold py-3.5 rounded-xl transition-all"
                  >
                    {loading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <>
                        {isAr ? "تأكيد طلب الجلسة الاستشارية" : "Request a call"}{" "}
                        <ArrowRight size={16} className="rtl-mirror" />
                      </>
                    )}
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
              <h2 className="text-3xl font-semibold text-white mb-3">
                {isAr ? "تم استلام طلبكم بنجاح." : "Request received."}
              </h2>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                {isAr
                  ? "سيتواصل معك أحد مستشارينا التنفيذيين خلال يوم عمل واحد لتحديد الموعد الأنسب وتزويدكم برابط الجلسة."
                  : "A senior consultant will reach out within 1 business day to confirm a time that works for you."}
              </p>
              <Link
                href={`/${locale}`}
                className="inline-flex items-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-6 py-3 rounded-xl transition-all"
              >
                {isAr ? "العودة إلى الصفحة الرئيسية" : "Back to home"}
              </Link>
            </ScrollReveal>
          </div>
        )}
      </div>
    </div>
  );
}
