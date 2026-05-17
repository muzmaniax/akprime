import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { Metadata } from "next";

const SITE_URL = "https://akprime.co.ke";

export const metadata: Metadata = {
  title: {
    default: "AK Prime Consulting | ERP, Financial & Strategic Advisory",
    template: "%s | AK Prime Consulting",
  },
  description:
    "AK Prime Consulting — Kenya's leading ERP, finance & AI advisory firm. We help organisations replace broken systems, automate operations, and scale with confidence. SAP, Odoo & NetSuite specialists. Offices in Mombasa, Nairobi & Dubai.",
  keywords: [
    "AK Prime",
    "AKPrime",
    "AK Prime Consulting",
    "akprime consulting",
    "AK Prime Kenya",
    "AK Prime Mombasa",
    "AK Prime Nairobi",
    "ERP consulting Kenya",
    "ERP consulting Nairobi",
    "ERP consulting Mombasa",
    "ERP consulting Dubai",
    "ERP implementation Kenya",
    "ERP implementation UAE",
    "finance consulting Nairobi",
    "finance consulting Mombasa",
    "finance consulting Dubai",
    "SAP implementation Kenya",
    "Odoo implementation Kenya",
    "NetSuite implementation Africa",
    "digital transformation consulting",
    "AI integration consulting Kenya",
    "financial transformation services",
    "business consulting Africa",
    "management consulting UAE",
    "technology consulting Nairobi",
    "operational excellence consulting",
    "finance consulting Kenya",
    "finance consulting services Africa",
    "audit services Kenya",
    "audit consulting Mombasa",
    "HR services consulting Kenya",
    "HRMS implementation Kenya",
    "Odoo ERP Kenya",
    "Odoo implementation Mombasa",
    "NetSuite consulting Africa",
    "management consulting Nairobi",
    "management consulting Mombasa",
    "CFO advisory Kenya",
    "financial transformation Kenya",
    "ERP system Kenya",
    "business process consulting Dubai",
    "accounting services Kenya",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: "AK Prime Consulting",
    title: "AK Prime Consulting (AKPrime) | ERP, AI & Strategic Advisory",
    description:
      "AK Prime Consulting helps organisations replace fragmented systems, automate workflows, and build data-driven operations through ERP implementation, AI integration, and financial transformation.",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "AK Prime Consulting — ERP, AI & Strategic Advisory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Prime Consulting (AKPrime) | ERP, AI & Strategic Advisory",
    description:
      "AK Prime Consulting: ERP implementation, AI integration, and financial transformation for growing organisations in Kenya and the UAE.",
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
  // Add your Google Search Console verification token here after verifying:
  // verification: { google: "YOUR_VERIFICATION_TOKEN" },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { ClientProviders } from "@/components/layout/ClientProviders";
import { PageTransition } from "@/components/layout/PageTransition";
import { MobileBackButton } from "@/components/layout/MobileBackButton";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "AK Prime Consulting",
  alternateName: ["AKPrime", "AK Prime", "akprime"],
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/logo-primary.png`,
    width: 200,
    height: 60,
  },
  description:
    "AK Prime Consulting provides ERP implementation, finance consulting, and digital transformation for organisations in Kenya and the UAE.",
  foundingLocation: {
    "@type": "Place",
    name: "Mombasa, Kenya",
  },
  areaServed: ["Kenya", "UAE", "East Africa"],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Mombasa",
      addressCountry: "KE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: `${SITE_URL}/contact`,
  },
  sameAs: [],
};

const professionalServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#professionalservice`,
  name: "AK Prime Consulting",
  url: SITE_URL,
  telephone: "",
  email: "info@akprime.co.ke",
  description:
    "AK Prime Consulting provides finance consulting, audit & assurance, HR consulting, ERP implementation (Odoo, NetSuite, SAP), AI integration, and management consulting for organisations in Kenya and the UAE.",
  areaServed: ["Kenya", "UAE", "East Africa"],
  address: [
    {
      "@type": "PostalAddress",
      addressLocality: "Mombasa",
      addressCountry: "KE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Nairobi",
      addressCountry: "KE",
    },
    {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AK Prime Consulting Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Finance & FP&A Consulting",
          description:
            "CFO advisory, financial planning and analysis (FP&A), consolidation, budgeting, and financial transformation for organisations in Kenya and the UAE.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Audit & Assurance Services",
          description:
            "Internal audit, risk frameworks, compliance reviews, and regulatory readiness for businesses across East Africa and the Middle East.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "HR Consulting & HRMS Implementation",
          description:
            "HR strategy, organisation design, payroll compliance, and end-to-end HRMS implementation including system selection, configuration, and staff training.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "ERP Implementation (Odoo, NetSuite, SAP)",
          description:
            "Full lifecycle ERP implementation and customisation for Odoo ERP, NetSuite, and SAP for businesses in Kenya, Nairobi, Mombasa, and Dubai.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI Integration",
          description:
            "AI workflow automation and intelligent system integration to optimise business operations across East Africa and the Middle East.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Management Consulting",
          description:
            "Strategic management consulting, operational excellence, and business process optimisation for organisations in Nairobi, Mombasa, and Dubai.",
        },
      },
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What finance consulting services does AK Prime offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AK Prime provides CFO advisory, financial planning and analysis (FP&A), consolidation, budgeting, and financial transformation services for organisations in Kenya and the UAE.",
      },
    },
    {
      "@type": "Question",
      name: "Does AK Prime offer audit and assurance services?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AK Prime provides internal audit, risk frameworks, compliance reviews, and regulatory readiness services for businesses across East Africa and the Middle East.",
      },
    },
    {
      "@type": "Question",
      name: "Can AK Prime help with HR consulting and HRMS implementation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. AK Prime handles HR strategy, organisation design, payroll compliance, and end-to-end HRMS implementation — including system selection, configuration, and staff training.",
      },
    },
    {
      "@type": "Question",
      name: "Which ERP systems does AK Prime implement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AK Prime implements and customises Odoo ERP, NetSuite, and SAP for businesses in Kenya, Nairobi, Mombasa, and Dubai. We handle full project lifecycle from requirements to go-live.",
      },
    },
    {
      "@type": "Question",
      name: "Where is AK Prime Consulting located?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AK Prime Consulting is headquartered in Mombasa, Kenya, with offices in Nairobi and Dubai. We serve clients across East Africa and the Middle East.",
      },
    },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "AK Prime Consulting",
  description:
    "ERP implementation, finance consulting, and digital transformation for organisations in Kenya and the UAE.",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/insights?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body className="antialiased font-sans min-h-screen bg-[#082121] text-white overflow-x-hidden" suppressHydrationWarning>
        <ClientProviders>
          <Navbar />
          <PageTransition>
            <MobileBackButton />
            <main className="pb-16 lg:pb-0">{children}</main>
          </PageTransition>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
