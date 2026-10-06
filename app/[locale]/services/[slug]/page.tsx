import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Locale } from "@/lib/i18n/types";
import { getLocalizedServiceBySlug } from "@/lib/i18n/localized-data";
import { servicesData } from "@/data/services";
import { ServicePageContent } from "./_content";

const SITE_URL = "https://akprime.co.ke";

type Props = { params: Promise<{ slug: string; locale: Locale }> };

export async function generateStaticParams() {
  const params: { slug: string; locale: Locale }[] = [];
  for (const s of servicesData) {
    params.push({ slug: s.slug, locale: "en" });
    params.push({ slug: s.slug, locale: "ar" });
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const service = getLocalizedServiceBySlug(slug, locale);
  if (!service) return {};
  return {
    title: `${service.name} | AK Prime Consulting`,
    description: service.shortDescription,
    alternates: {
      canonical: `${SITE_URL}/${locale}/services/${slug}`,
      languages: {
        en: `${SITE_URL}/en/services/${slug}`,
        ar: `${SITE_URL}/ar/services/${slug}`,
        "x-default": `${SITE_URL}/en/services/${slug}`,
      },
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug, locale } = await params;
  const service = getLocalizedServiceBySlug(slug, locale);
  if (!service) notFound();
  return <ServicePageContent slug={slug} />;
}
