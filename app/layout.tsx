import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/layout/PageLoader";
import { Toaster } from "sonner";
import { Metadata } from "next";

const SITE_URL = "https://akprime.co.ke";

export const metadata: Metadata = {
  title: {
    default: "AK Prime Consulting | ERP, Financial & Strategic Advisory",
    template: "%s | AK Prime Consulting",
  },
  description:
    "AK Prime Consulting (AKPrime) provides ERP implementation, finance consulting, and digital transformation for organisations in Kenya and the UAE. Headquartered in Mombasa with offices in Nairobi and Dubai. Specialists in SAP, Odoo, and NetSuite.",
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
  ],
  alternates: {
    canonical: SITE_URL,
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
      </head>
      <body className="antialiased font-sans min-h-screen bg-[#082121] text-white overflow-x-hidden" suppressHydrationWarning>
        <ClientProviders>
          <PageLoader />
          <Navbar />
          <main className="pb-16 lg:pb-0">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
