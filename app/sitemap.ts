import { MetadataRoute } from "next";
import { servicesData } from "@/data/services";
import { industriesData } from "@/data/industries";
import { caseStudies } from "@/data/case-studies";

const BASE = "https://akprime.co.ke";
const NOW = new Date("2026-05-16");

const INSIGHT_SLUGS = [
  "why-most-business-problems-are-misdiagnosed",
  "the-real-cost-of-poor-decision-making",
  "when-founders-should-seek-external-perspective",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }> = [
    // Core pages
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/services", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/book", priority: 0.9, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.85, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.85, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/resources", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.75, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.5, changeFrequency: "yearly" },

    // Shortcut service alias routes
    { path: "/services/erp", priority: 0.85, changeFrequency: "monthly" },
    { path: "/services/ai", priority: 0.85, changeFrequency: "monthly" },

    // All dynamic service pages (23 total)
    ...servicesData.map((s) => ({
      path: `/services/${s.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),

    // All dynamic industry pages (8 total)
    ...industriesData.map((ind) => ({
      path: `/industries/${ind.slug}`,
      priority: 0.75,
      changeFrequency: "monthly" as const,
    })),

    // All dynamic case study pages (2 total)
    ...caseStudies.map((cs) => ({
      path: `/case-studies/${cs.id}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),

    // All dynamic insight article pages (3 total)
    ...INSIGHT_SLUGS.map((slug) => ({
      path: `/insights/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];

  // Deduplicate routes in case any path is duplicated
  const uniqueRoutes = new Map<string, (typeof routes)[number]>();
  for (const r of routes) {
    if (!uniqueRoutes.has(r.path)) {
      uniqueRoutes.set(r.path, r);
    }
  }

  for (const r of uniqueRoutes.values()) {
    const enUrl = `${BASE}/en${r.path}`;
    const arUrl = `${BASE}/ar${r.path}`;

    const alternates = {
      languages: {
        en: enUrl,
        ar: arUrl,
        "x-default": enUrl,
      },
    };

    // English version
    entries.push({
      url: enUrl,
      lastModified: NOW,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates,
    });

    // Arabic version
    entries.push({
      url: arUrl,
      lastModified: NOW,
      changeFrequency: r.changeFrequency,
      priority: r.priority,
      alternates,
    });
  }

  return entries;
}
