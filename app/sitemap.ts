import { MetadataRoute } from "next";

const BASE = "https://akprime.co.ke";
const NOW = new Date("2026-05-16");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core
    { url: BASE, lastModified: NOW, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: NOW, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/contact`, lastModified: NOW, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/book`, lastModified: NOW, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/industries`, lastModified: NOW, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/case-studies`, lastModified: NOW, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/insights`, lastModified: NOW, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/resources`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    // Services
    { url: `${BASE}/services/erp`, lastModified: NOW, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services/ai`, lastModified: NOW, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/services/pm`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/finance`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/services/digital`, lastModified: NOW, changeFrequency: "monthly", priority: 0.8 },
    // Industries
    { url: `${BASE}/industries/manufacturing`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/industries/financial-services`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/industries/logistics`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/industries/healthcare`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/industries/ngos`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/industries/government`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/industries/education`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    { url: `${BASE}/industries/retail`, lastModified: NOW, changeFrequency: "monthly", priority: 0.75 },
    // Case studies
    { url: `${BASE}/case-studies/mo-radio-tax-compliance`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/case-studies/coastal-image-technologies`, lastModified: NOW, changeFrequency: "monthly", priority: 0.7 },
  ];
}
