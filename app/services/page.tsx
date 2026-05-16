import { Metadata } from "next";
import { ServicesPageClient } from "./ServicesPageClient";

export const metadata: Metadata = {
  title: "Services | AK Prime Consulting — ERP, AI & Finance Advisory",
  description:
    "AK Prime Consulting (AKPrime) services: ERP implementation (SAP, Odoo, NetSuite), AI integration, financial transformation, project management, and digital strategy for organisations in Kenya and the UAE.",
  alternates: { canonical: "https://www.akprimeconsulting.com/services" },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
