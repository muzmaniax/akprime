import { Metadata } from "next";
import { HomePageClient } from "@/components/sections/HomePageClient";

export const metadata: Metadata = {
  title: "AK Prime Consulting | ERP, Financial & Strategic Advisory",
  description:
    "AK Prime Consulting (AKPrime) — ERP implementation, AI integration, and financial transformation for organisations in Kenya and the UAE. SAP, Odoo, NetSuite specialists. Offices in Mombasa, Nairobi, and Dubai.",
  alternates: {
    canonical: "https://akprime.co.ke",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
