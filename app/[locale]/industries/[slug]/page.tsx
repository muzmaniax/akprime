import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@/lib/i18n/types";
import { getLocalizedIndustryBySlug } from "@/lib/i18n/localized-data";
import { industriesData } from "@/data/industries";
import { IndustryPageContent } from "./_content";

const SITE_URL = "https://akprime.co.ke";

type Props = { params: Promise<{ slug: string; locale: Locale }> };

export async function generateStaticParams() {
  const params: { slug: string; locale: Locale }[] = [];
  for (const ind of industriesData) {
    params.push({ slug: ind.slug, locale: "en" });
    params.push({ slug: ind.slug, locale: "ar" });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const industry = getLocalizedIndustryBySlug(slug, locale);
  if (!industry) return {};
  return {
    title: `${industry.name} | AK Prime Consulting`,
    description: industry.shortDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/industries/${slug}`,
      languages: {
        en: `${SITE_URL}/en/industries/${slug}`,
        ar: `${SITE_URL}/ar/industries/${slug}`,
        "x-default": `${SITE_URL}/en/industries/${slug}`,
      },
    },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug, locale } = await params;
  const industry = getLocalizedIndustryBySlug(slug, locale);
  if (!industry) notFound();
  return <IndustryPageContent slug={slug} />;
}
