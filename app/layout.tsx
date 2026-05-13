import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageLoader } from "@/components/layout/PageLoader";
import { Toaster } from "sonner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "AK Prime Consulting | ERP, Financial & Strategic Advisory",
    template: "%s | AK Prime Consulting",
  },
  description:
    "AK Prime Consulting provides ERP implementation, finance consulting, and digital transformation for organisations in Kenya and the UAE. Headquartered in Mombasa with offices in Nairobi and Dubai. Specialising in SAP, Odoo, NetSuite.",
  keywords: [
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
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://www.akprimeconsulting.com",
    siteName: "AK Prime Consulting",
    title: "AK Prime Consulting | ERP, AI & Strategic Advisory",
    description:
      "AK Prime Consulting helps organisations replace fragmented systems, automate workflows, and build data-driven operations through ERP implementation, AI integration, and financial transformation.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Prime Consulting | ERP, AI & Strategic Advisory",
    description:
      "AK Prime Consulting: ERP implementation, AI integration, and financial transformation for growing organisations.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

import { ClientProviders } from "@/components/layout/ClientProviders";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
