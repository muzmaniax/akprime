import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.akprimeconsulting.com";
  const now = new Date();

  const pages = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "weekly" as const },
    { url: "/services/erp", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/services/ai", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/services/pm", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/finance", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/services/digital", priority: 0.8, changeFrequency: "monthly" as const },
    { url: "/industries", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/case-studies", priority: 0.85, changeFrequency: "monthly" as const },
    { url: "/about", priority: 0.75, changeFrequency: "monthly" as const },
    { url: "/contact", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/book", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/insights", priority: 0.8, changeFrequency: "weekly" as const },
    { url: "/resources", priority: 0.8, changeFrequency: "monthly" as const },
  ];

  return pages.map((page) => ({
    url: `${base}${page.url}`,
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
