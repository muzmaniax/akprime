import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { servicesData } from "@/data/services";
import { ServicePageContent } from "./_content";

const SITE_URL = "https://akprime.co.ke";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} | AK Prime Consulting`,
    description: service.shortDescription,
    alternates: { canonical: `${SITE_URL}/services/${slug}` },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) notFound();
  return <ServicePageContent slug={slug} />;
}
