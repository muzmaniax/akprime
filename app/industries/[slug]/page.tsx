import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { industriesData } from "@/data/industries";
import { IndustryPageContent } from "./_content";

const SITE_URL = "https://akprime.co.ke";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) return {};
  return {
    title: `${industry.name} Advisory | AK Prime Consulting`,
    description: industry.shortDescription,
    alternates: { canonical: `${SITE_URL}/industries/${slug}` },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) notFound();
  return <IndustryPageContent slug={slug} />;
}
