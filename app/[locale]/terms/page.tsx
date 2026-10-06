import { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Primitives";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "الشروط والأحكام | AK Prime Consulting"
      : "Terms of Service | AK Prime Consulting",
    description: isAr
      ? "الشروط والأحكام المنظمة لاستخدام الموقع الإلكتروني والخدمات الاستشارية المقدمة من شركة AK Prime Consulting في كينيا والإمارات."
      : "Terms and conditions governing the use of AK Prime Consulting's website and services.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/terms`,
      languages: {
        en: "https://akprime.co.ke/en/terms",
        ar: "https://akprime.co.ke/ar/terms",
        "x-default": "https://akprime.co.ke/en/terms",
      },
    },
    robots: { index: true, follow: true },
  };
}

const LAST_UPDATED_EN = "1 May 2025";
const LAST_UPDATED_AR = "1 مايو 2025";

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  if (isAr) {
    return (
      <section className="section-dark min-h-screen" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 48px)", paddingBottom: "80px" }}>
        <div className="container-x max-w-3xl">
          <Eyebrow>الوثائق القانونية</Eyebrow>
          <h1 className="mt-3 text-white" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.4rem)", lineHeight: 1.15 }}>
            شروط وأحكام الاستخدام
          </h1>
          <p className="mt-2 text-[13px] text-white/40">آخر تحديث: {LAST_UPDATED_AR}</p>

          <div className="mt-10 space-y-10 text-[15px] text-white/70 leading-relaxed">
            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">1. الموافقة على الشروط</h2>
              <p>
                يُعد وصولك إلى الموقع الإلكتروني{" "}
                <a href="https://akprime.co.ke" className="text-[#37B4B4] hover:underline" dir="ltr">akprime.co.ke</a>{" "}
                واستخدامك له موافقة صريحة وكاملة على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى التوقف عن استخدام الموقع فوراً.
              </p>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">2. نبذة عن إيه كي برايم للاستشارات</h2>
              <p>
                شركة إيه كي برايم للاستشارات (&quot;AK Prime&quot;) هي بيت خبرة استشاري متخصص يقدم حلول تطبيق أنظمة تخطيط موارد المؤسسات (ERP)، والاستشارات المالية، والتحول الرقمي، وإعادة الهيكلة التشغيلية للمؤسسات في كينيا ودولة الإمارات العربية المتحدة وعموم منطقة الشرق الأوسط وشرق إفريقيا.
              </p>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">3. ضوابط الاستخدام المشروع</h2>
              <p className="mb-3">تتعهد باستخدام الموقع للأغراض المشروعة والنظامية فقط، وتوافق على الامتناع عما يلي:</p>
              <ul className="list-disc pr-5 space-y-2">
                <li>مخالفة أي قوانين أو لوائح محلية أو إقليمية أو دولية معمول بها.</li>
                <li>التعدي على حقوق الملكية الفكرية أو العلامات التجارية الخاصة بالشركة أو أطراف أخرى.</li>
                <li>محاولة الوصول غير المصرح به إلى أنظمة الموقع أو خوادمه أو قواعد بياناته.</li>
                <li>إرسال أي مواد برمجية ضارة أو محاولات تعطيل البنية التحتية للموقع.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">4. الملكية الفكرية</h2>
              <p>
                كافة النصوص والرسومات والتحليلات ودراسات الحالة والعلامات التجارية والبرمجيات المنشورة على هذا الموقع مملوكة حصرياً لشركة AK Prime Consulting ومحمية بموجب أنظمة حماية الملكية الفكرية. لا يجوز نسخ أو إعادة نشر أي جزء دون إذن خطي مسبق.
              </p>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">5. إخلاء المسؤولية عن الاستشارات</h2>
              <p>
                المحتوى المنشور في الموقع ومقالات الرؤى هو لأغراض التوعية والإرشاد العام فقط، ولا يشكل استشارة مهنية أو مالية أو قانونية أو تقنية ملزمة. إن التعاقد مع AK Prime Consulting يخضع دائماً لاتفاقيات تعاقد استشارية رسمية مستقلة تحدد نطاق العمل والمسؤوليات المتبادلة.
              </p>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">6. القانون الواجب التطبيق والاختصاص القضائي</h2>
              <p>
                تخضع هذه الشروط والأحكام وتُفسر وفقاً لقوانين جمهورية كينيا والقوانين المعمول بها في إمارة دبي بدولة الإمارات العربية المتحدة، وتختص المحاكم المعنية بالنظر في أي نزاع ينشأ عن استخدام هذا الموقع.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-dark min-h-screen" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 48px)", paddingBottom: "80px" }}>
      <div className="container-x max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="mt-3 text-white" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.4rem)", lineHeight: 1.1 }}>
          Terms of Service
        </h1>
        <p className="mt-2 text-[13px] text-white/40">Last updated: {LAST_UPDATED_EN}</p>

        <div className="mt-10 space-y-10 text-[15px] text-white/70 leading-relaxed">
          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">1. Agreement to Terms</h2>
            <p>
              By accessing or using the website at{" "}
              <a href="https://akprime.co.ke" className="text-[#37B4B4] hover:underline">akprime.co.ke</a>{" "}
              (&quot;Site&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree,
              please do not use the Site. These Terms apply to all visitors, users, and others who access the Site.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">2. About AK Prime Consulting</h2>
            <p>
              AK Prime Consulting (&quot;AK Prime&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a strategic consulting firm
              providing ERP implementation, financial advisory, technology transformation, and related professional
              services to organisations in Kenya, the UAE, and across Africa and the Middle East.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">3. Use of the Site</h2>
            <p className="mb-3">You agree to use the Site only for lawful purposes and in a manner that does not:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Violate any applicable local, national, or international law or regulation.</li>
              <li>Infringe the rights of any third party, including intellectual property rights.</li>
              <li>Transmit unsolicited or unauthorised advertising or promotional material.</li>
              <li>Attempt to gain unauthorised access to any part of the Site or its related systems.</li>
              <li>Interfere with the proper functioning of the Site.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">4. Intellectual Property</h2>
            <p>
              All content on this Site — including text, graphics, logos, images, case studies, and software — is
              the property of AK Prime Consulting and is protected by applicable intellectual property laws. You
              may not reproduce, distribute, modify, or create derivative works without our prior written consent.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">5. Professional Services Disclaimer</h2>
            <p>
              Content published on this Site is for general informational purposes only and does not constitute
              professional consulting, financial, legal, or technical advice. Engaging AK Prime Consulting for
              professional services is governed by a separate written engagement agreement. No information on
              this Site creates a client relationship between you and AK Prime Consulting.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">6. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of Kenya and the United Arab Emirates, without regard to conflict of law principles.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
