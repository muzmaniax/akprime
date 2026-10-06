import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, CheckCircle2, Mail, Calendar } from "lucide-react";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "شكراً لتواصلك معنا | AK Prime Consulting"
      : "Thank You | AK Prime Consulting",
    description: isAr
      ? "شكراً لتواصلكم مع AK Prime Consulting. سيقوم فريقنا الاستشاري بمراجعة طلبكم والتواصل معكم خلال 24 ساعة."
      : "Thank you for reaching out. A member of our team will be in touch within 24 hours.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/thank-you`,
      languages: {
        en: "https://akprime.co.ke/en/thank-you",
        ar: "https://akprime.co.ke/ar/thank-you",
        "x-default": "https://akprime.co.ke/en/thank-you",
      },
    },
  };
}

export default async function ThankYouPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  const stepsEn = [
    { icon: <Mail size={16} />, text: "You'll receive a confirmation email shortly" },
    { icon: <Calendar size={16} />, text: "Our team will review your needs and reach out within 24 hours" },
    { icon: <CheckCircle2 size={16} />, text: "We'll schedule a discovery call at a time that works for you" },
  ];

  const stepsAr = [
    { icon: <Mail size={16} />, text: "ستصلك رسالة تأكيد عبر بريدك الإلكتروني بعد لحظات" },
    { icon: <Calendar size={16} />, text: "سيقوم فريقنا بدراسة متطلباتك والتواصل معك خلال 24 ساعة" },
    { icon: <CheckCircle2 size={16} />, text: "سنحدد موعد جلسة نقاشية معمقة في الوقت الذي يلائم جدول أعمالك" },
  ];

  const steps = isAr ? stepsAr : stepsEn;

  return (
    <div className="min-h-screen bg-[#082121] pt-24 flex items-center justify-center">
      <div className="max-w-xl mx-auto px-4 text-center py-20">
        <div className="w-16 h-16 rounded-full bg-[#37B4B4]/15 border border-[#37B4B4]/30 flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={28} className="text-[#37B4B4]" />
        </div>

        <h1 className="text-4xl font-medium text-white mb-4">
          {isAr ? "سنتواصل معك في أقرب وقت!" : "We'll be in touch soon!"}
        </h1>
        <p className="text-white/55 text-lg leading-relaxed mb-10">
          {isAr
            ? "شكراً لتواصلك مع إيه كي برايم للاستشارات. سيقوم أحد مستشارينا التنفيذيين بدراسة طلبكم والرد خلال 24 ساعة."
            : "Thank you for reaching out to AK Prime Consulting. A member of our team will review your enquiry and respond within 24 hours."}
        </p>

        <div className="glass-card rounded-2xl p-6 mb-10 text-left rtl:text-right space-y-4">
          <p className="text-white/70 text-sm font-semibold uppercase tracking-wide mb-3">
            {isAr ? "ما هي الخطوات التالية؟" : "What happens next?"}
          </p>
          {steps.map((item, i) => (
            <div key={i} className="flex gap-3 items-center text-white/60 text-sm">
              <span className="text-[#37B4B4] shrink-0">{item.icon}</span>
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            <Home size={16} /> {isAr ? "العودة للرئيسية" : "Return to Home"}
          </Link>
          <Link
            href={`/${locale}/insights`}
            className="inline-flex items-center gap-2 border border-white/15 text-white hover:bg-white/5 px-6 py-3 rounded-xl transition-colors"
          >
            {isAr ? "استكشف مقالاتنا ورؤانا" : "Read Our Insights"}{" "}
            <ArrowRight size={16} className="rtl-mirror" />
          </Link>
        </div>
      </div>
    </div>
  );
}
