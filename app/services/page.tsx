import { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | ERP, Finance, Audit & HR Consulting",
  description:
    "AK Prime Consulting offers ERP implementation (Odoo, NetSuite, SAP), finance & FP&A consulting, audit & assurance, HR consulting, AI integration, and management consulting for organisations in Kenya and the UAE.",
  alternates: { canonical: "https://akprime.co.ke/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
