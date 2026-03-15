import type { Metadata } from "next";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

const ibmPlex = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AK Prime Consulting | ERP, AI & Strategic Advisory",
    template: "%s | AK Prime Consulting",
  },
  description:
    "AK Prime Consulting helps organisations replace fragmented systems, automate workflows, and build data-driven operations through ERP implementation, AI integration, and financial transformation.",
  keywords: [
    "ERP consulting Africa",
    "ERP implementation Kenya",
    "AI integration consulting",
    "digital transformation",
    "financial advisory Nairobi",
    "business consulting East Africa",
    "Odoo implementation",
    "SAP Business One Africa",
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
      "AK Prime Consulting — ERP implementation, AI integration, and financial transformation for growing organisations.",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibmPlex.variable}>
      <body className="antialiased min-h-screen bg-[#082121] text-white overflow-x-hidden">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#0E3E3E",
              border: "1px solid rgba(55,180,180,0.35)",
              color: "#fff",
            },
          }}
        />
      </body>
    </html>
  );
}
