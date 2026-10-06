import "../globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LanguageSuggestionBanner } from "@/components/layout/LanguageSuggestionBanner";
import { Metadata } from "next";
import siteImages from "@/data/site-images.json";
import { ClientProviders } from "@/components/layout/ClientProviders";
import { PageTransition } from "@/components/layout/PageTransition";
import { MobileBackButton } from "@/components/layout/MobileBackButton";
import { I18nProvider } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/types";
import { getDictionary, isValidLocale } from "@/lib/i18n/get-dictionary";

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "optional",
  variable: "--font-heading",
  preload: true,
});

const SITE_URL = "https://akprime.co.ke";

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "en";
  const dict = getDictionary(locale);
  const isArabic = locale === "ar";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.seo.defaultTitle,
      template: dict.seo.titleTemplate,
    },
    description: dict.seo.defaultDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: {
        en: `${SITE_URL}/en`,
        ar: `${SITE_URL}/ar`,
        "x-default": `${SITE_URL}/en`,
      },
    },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: [{ url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" }],
      shortcut: "/icon.svg",
    },
    openGraph: {
      type: "website",
      locale: isArabic ? "ar_AR" : "en_GB",
      url: `${SITE_URL}/${locale}`,
      siteName: isArabic ? "إيه كي برايم للاستشارات" : "AK Prime Consulting",
      title: dict.seo.defaultTitle,
      description: dict.seo.defaultDescription,
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: isArabic ? "إيه كي برايم للاستشارات" : "AK Prime Consulting — ERP, AI & Strategic Advisory",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.seo.defaultTitle,
      description: dict.seo.defaultDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "en";
  const isArabic = locale === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const heroImage = (siteImages as Record<string, string>)["hero.background"] ?? "/images/hero-coins.webp";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: isArabic ? "إيه كي برايم للاستشارات" : "AK Prime Consulting",
    alternateName: ["AKPrime", "AK Prime", "akprime", "إيه كي برايم"],
    url: `${SITE_URL}/${locale}`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/Logos/ak-logo.png`,
      width: 200,
      height: 60,
    },
    description: isArabic
      ? "تقدم شركة إيه كي برايم خدمات تطبيق أنظمة ERP والاستشارات المالية والذكاء الاصطناعي في كينيا والإمارات والشرق الأوسط."
      : "AK Prime Consulting provides ERP implementation, finance consulting, and digital transformation for organisations in Kenya and the UAE.",
    foundingLocation: {
      "@type": "Place",
      name: "Mombasa, Kenya",
    },
    areaServed: ["Kenya", "UAE", "East Africa", "Middle East"],
    address: [
      { "@type": "PostalAddress", addressLocality: "Mombasa", addressCountry: "KE" },
      { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
      { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: `${SITE_URL}/${locale}/contact`,
    },
  };

  return (
    <html lang={locale} dir={dir} className={`${inter.variable} ${isArabic ? "font-arabic" : ""}`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href={heroImage} fetchPriority="high" />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/en`} />
        <link rel="alternate" hrefLang="ar" href={`${SITE_URL}/ar`} />
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/en`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`antialiased font-sans min-h-screen bg-[#082121] text-white overflow-x-hidden ${isArabic ? "font-arabic" : ""}`} suppressHydrationWarning>
        <I18nProvider locale={locale}>
          <ClientProviders>
            <LanguageSuggestionBanner />
            <Navbar />
            <PageTransition>
              <MobileBackButton />
              <main className="pb-16 lg:pb-0">{children}</main>
            </PageTransition>
            <Footer />
          </ClientProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
