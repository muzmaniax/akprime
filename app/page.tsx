import { Metadata } from "next";
import { HomePageClient } from "@/components/sections/HomePageClient";

export const metadata: Metadata = {
  title: "AK Prime Consulting | Finance, Audit, HR & ERP Advisory",
  description:
    "AK Prime Consulting — finance consulting, audit services, HR consulting, and ERP implementation (Odoo, NetSuite, SAP) for organisations in Kenya and the UAE. Senior advisory teams in Mombasa, Nairobi, and Dubai.",
  alternates: {
    canonical: "https://akprime.co.ke",
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
