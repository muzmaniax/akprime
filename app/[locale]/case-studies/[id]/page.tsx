import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@/lib/i18n/types";
import { caseStudies } from "@/data/case-studies";
import { getLocalizedCaseStudyById } from "@/lib/i18n/localized-data";
import { CaseStudyDetailClient } from "./CaseStudyDetailClient";

const SITE_URL = "https://akprime.co.ke";

type Props = { params: Promise<{ id: string; locale: Locale }> };

export async function generateStaticParams() {
  const params: { id: string; locale: Locale }[] = [];
  for (const cs of caseStudies) {
    params.push({ id: cs.id, locale: "en" });
    params.push({ id: cs.id, locale: "ar" });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id, locale } = await params;
  const study = getLocalizedCaseStudyById(id, locale);
  if (!study) return {};
  return {
    title: `${study.title} | AK Prime Consulting`,
    description: study.summary,
    alternates: {
      canonical: `${SITE_URL}/${locale}/case-studies/${id}`,
      languages: {
        en: `${SITE_URL}/en/case-studies/${id}`,
        ar: `${SITE_URL}/ar/case-studies/${id}`,
        "x-default": `${SITE_URL}/en/case-studies/${id}`,
      },
    },
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { id, locale } = await params;
  const study = getLocalizedCaseStudyById(id, locale);
  if (!study) notFound();
  return <CaseStudyDetailClient id={id} />;
}
