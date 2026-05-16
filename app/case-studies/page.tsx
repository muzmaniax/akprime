import { Metadata } from "next";
import { CaseStudiesPageClient } from "./CaseStudiesPageClient";

export const metadata: Metadata = {
  title: "Case Studies | AK Prime Consulting",
  description:
    "AK Prime Consulting (AKPrime) case studies: real results from ERP implementations, financial transformations, and digital strategy engagements across Kenya, East Africa, and the UAE.",
  alternates: { canonical: "https://akprime.co.ke/case-studies" },
};

export default function CaseStudiesPage() {
  return <CaseStudiesPageClient />;
}
