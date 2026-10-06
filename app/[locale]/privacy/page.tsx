import { Metadata } from "next";
import { Eyebrow } from "@/components/ui/Primitives";
import { Locale } from "@/lib/i18n/types";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  return {
    title: isAr
      ? "سياسة الخصوصية وحماية البيانات | AK Prime Consulting"
      : "Privacy Policy | AK Prime Consulting",
    description: isAr
      ? "تعرف على كيفية جمع واستخدام وحماية البيانات الشخصية لزوار وعملاء AK Prime Consulting في كينيا ودولة الإمارات العربية المتحدة."
      : "How AK Prime Consulting collects, uses, and protects your personal information.",
    alternates: {
      canonical: `https://akprime.co.ke/${locale}/privacy`,
      languages: {
        en: "https://akprime.co.ke/en/privacy",
        ar: "https://akprime.co.ke/ar/privacy",
        "x-default": "https://akprime.co.ke/en/privacy",
      },
    },
    robots: { index: true, follow: true },
  };
}

const LAST_UPDATED_EN = "1 May 2025";
const LAST_UPDATED_AR = "1 مايو 2025";

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  const isAr = locale === "ar";

  if (isAr) {
    return (
      <section className="section-dark min-h-screen" style={{ paddingTop: "calc(var(--navbar-h, 64px) + 48px)", paddingBottom: "80px" }}>
        <div className="container-x max-w-3xl">
          <Eyebrow>الوثائق القانونية</Eyebrow>
          <h1 className="mt-3 text-white" style={{ fontSize: "clamp(1.75rem, 1.2rem + 2vw, 2.4rem)", lineHeight: 1.15 }}>
            سياسة الخصوصية وحماية البيانات
          </h1>
          <p className="mt-2 text-[13px] text-white/40">آخر تحديث: {LAST_UPDATED_AR}</p>

          <div className="mt-10 space-y-10 text-[15px] text-white/70 leading-relaxed">
            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">1. من نحن</h2>
              <p>
                شركة إيه كي برايم للاستشارات (&quot;AK Prime&quot;، أو &quot;نحن&quot;) هي شركة استشارات إدارية وتقنية متخصصة
                تمتلك مكاتب وممثليات في مومباسا ونيروبي (كينيا) ودبي (دولة الإمارات العربية المتحدة). موقعنا الإلكتروني الرسمي هو{" "}
                <a href="https://akprime.co.ke" className="text-[#37B4B4] hover:underline" dir="ltr">akprime.co.ke</a>.
                لأي استفسارات تتعلق بالخصوصية وحماية البيانات، يرجى مراسلتنا عبر البريد الإلكتروني{" "}
                <a href="mailto:info@akprime.co.ke" className="text-[#37B4B4] hover:underline" dir="ltr">info@akprime.co.ke</a>.
              </p>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">2. البيانات التي نجمعها</h2>
              <p className="mb-3">نقوم بجمع ومعالجة المعلومات الضرورية فقط بالطرق التالية:</p>
              <ul className="list-disc pr-5 space-y-2">
                <li>
                  <span className="text-white/90 font-medium">بيانات نماذج التواصل:</span> الاسم الأول واسم العائلة، عنوان البريد الإلكتروني، رقم الهاتف، واسم الشركة ومحتوى الاستفسار عند تواصلكم معنا.
                </li>
                <li>
                  <span className="text-white/90 font-medium">طلبات حجز الاستشارات:</span> البيانات المقدمة عند حجز موعد جلسة استكشافية، وتشمل مجال القطاع والتحديات التشغيلية.
                </li>
                <li>
                  <span className="text-white/90 font-medium">بيانات التصفح التقنية:</span> سجلات الخادم القياسية التي تشمل عنوان بروتوكول الإنترنت (IP)، ونوع المتصفح، والصفحات التي تمت زيارتها، وتُجمع هذه البيانات بشكل مجهول ومجمع لأغراض تحسين الأداء فقط.
                </li>
                <li>
                  <span className="text-white/90 font-medium">ملفات تعريف الارتباط (Cookies):</span> ملفات تعريف ارتباط وظيفية لحفظ تفضيلات اللغة والتصفح، دون استخدام ملفات تتبع إعلانية متطفلة.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">3. أوجه استخدام المعلومات</h2>
              <p className="mb-3">نستخدم المعلومات المجمعة حصرياً للأغراض التالية:</p>
              <ul className="list-disc pr-5 space-y-2">
                <li>الرد على استفساراتكم ومناقشة نطاق الخدمات الاستشارية المطلوبة.</li>
                <li>جدولة وإدارة المواعيد والجلسات النقاشية مع المستشارين.</li>
                <li>إرسال الأدلة الإرشادية والمصادر التي قمتم بطلب تحميلها.</li>
                <li>تحسين كفاءة وأداء وأمان بوابتنا الرقمية.</li>
                <li>الامتثال للالتزامات والأنظمة القانونية المعمول بها في كينيا ودولة الإمارات.</li>
              </ul>
              <p className="mt-3">
                نؤكد التزامنا التام بعدم بيع أو تأجير أو مشاركة بياناتكم الشخصية مع أي طرف ثالث لأغراض تسويقية تجارية.
              </p>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">4. الأساس القانوني للمعالجة</h2>
              <p>
                تتم معالجة بياناتكم الشخصية استناداً إلى موافقتكم الصريحة عند تعبئة النماذج، ولمصالحنا المشروعة في الرد على استفسارات الأعمال، ووفقاً لقانون حماية البيانات الكيني لعام 2019 (Data Protection Act) وقوانين حماية البيانات والخصوصية في دولة الإمارات العربية المتحدة.
              </p>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">5. مشاركة البيانات مع أطراف موثوقة</h2>
              <p className="mb-3">
                لا نشارك بياناتكم إلا في الحدود الدنيا الضرورية مع مزودي خدمات البنية التحتية المعتمدين والمقيدين باتفاقيات سرية صارمة:
              </p>
              <ul className="list-disc pr-5 space-y-2">
                <li><span className="text-white/90 font-medium">Resend</span> — لإرسال رسائل البريد الإلكتروني التشغيلية وإشعارات التأكيد.</li>
                <li><span className="text-white/90 font-medium">Vercel</span> — لاستضافة وتشغيل البنية السحابية للموقع بأعلى معايير الأمان.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-white text-[17px] font-semibold mb-3">6. حقوقكم القانونية</h2>
              <p>
                يحق لكم في أي وقت طلب الوصول إلى بياناتكم الشخصية المخزنة لدينا، أو تصحيحها، أو طلب حذفها نهائياً. لممارسة هذه الحقوق، يرجى مراسلة مسؤول حماية البيانات عبر{" "}
                <a href="mailto:info@akprime.co.ke" className="text-[#37B4B4] hover:underline" dir="ltr">info@akprime.co.ke</a>.
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
          Privacy Policy
        </h1>
        <p className="mt-2 text-[13px] text-white/40">Last updated: {LAST_UPDATED_EN}</p>

        <div className="mt-10 space-y-10 text-[15px] text-white/70 leading-relaxed">
          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">1. Who We Are</h2>
            <p>
              AK Prime Consulting (&quot;AK Prime&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a strategic consulting firm
              with offices in Mombasa, Nairobi (Kenya) and Dubai (UAE). Our registered website is{" "}
              <a href="https://akprime.co.ke" className="text-[#37B4B4] hover:underline">akprime.co.ke</a>.
              For any privacy-related enquiries, contact us at{" "}
              <a href="mailto:info@akprime.co.ke" className="text-[#37B4B4] hover:underline">info@akprime.co.ke</a>.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">2. Information We Collect</h2>
            <p className="mb-3">We collect information in the following ways:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-white/90 font-medium">Contact form submissions</span> — your first and last name,
                email address, phone number (optional), company name, and message content when you reach out to us via our website.
              </li>
              <li>
                <span className="text-white/90 font-medium">Booking requests</span> — details provided when scheduling
                a consultation, including name, email, company, and industry challenge.
              </li>
              <li>
                <span className="text-white/90 font-medium">Usage data</span> — standard server logs including IP address,
                browser type, pages visited, and referring URLs. This data is aggregated and not linked to individuals.
              </li>
              <li>
                <span className="text-white/90 font-medium">Cookies</span> — essential functional cookies required for website operation and language preferences.
                We do not use invasive advertising or tracking cookies.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="mb-3">We use collected information solely to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Respond to your enquiries and service requests.</li>
              <li>Schedule and manage consultations.</li>
              <li>Send relevant guides and frameworks you have requested.</li>
              <li>Improve the quality and performance of our website.</li>
              <li>Comply with legal obligations applicable in Kenya and the UAE.</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to third parties for marketing purposes.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">4. Legal Basis for Processing</h2>
            <p>
              We process your personal data on the basis of your consent (when you submit a form), our legitimate
              interests in operating a consulting practice and responding to enquiries, and compliance with the Kenya Data Protection Act 2019 and UAE data protection regulations.
              You may withdraw consent at any time by contacting us.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">5. Data Sharing</h2>
            <p className="mb-3">
              We share your data only where necessary with trusted infrastructure providers who assist us in operating
              our website and delivering communications:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><span className="text-white/90 font-medium">Resend</span> — transactional email delivery.</li>
              <li><span className="text-white/90 font-medium">Vercel</span> — website hosting and cloud infrastructure.</li>
            </ul>
            <p className="mt-3">
              All service providers are contractually required to handle your data securely and only for the
              purposes we specify.
            </p>
          </div>

          <div>
            <h2 className="text-white text-[17px] font-semibold mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, update, or request the deletion of your personal data at any time.
              To exercise these rights, please email us at{" "}
              <a href="mailto:info@akprime.co.ke" className="text-[#37B4B4] hover:underline">info@akprime.co.ke</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
