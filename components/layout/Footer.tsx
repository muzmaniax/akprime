"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { locale, isRTL, t } = useI18n();

  const services = [
    {
      label: locale === "ar" ? "تطبيق أنظمة ERP" : "ERP Implementation",
      href: `/${locale}/services/erp-implementation`,
    },
    {
      label: locale === "ar" ? "تكامل الذكاء الاصطناعي" : "AI Integration",
      href: `/${locale}/services/ai-integration-automation`,
    },
    {
      label: locale === "ar" ? "الإدارة المالية (FP&A)" : "Financial Management",
      href: `/${locale}/services/financial-management`,
    },
    {
      label: locale === "ar" ? "تحليل الأعمال" : "Business Analysis",
      href: `/${locale}/services/business-analysis`,
    },
    {
      label: locale === "ar" ? "خدمات التدقيق والمراجعة" : "Audit Services",
      href: `/${locale}/services/audit-assurance`,
    },
    {
      label: locale === "ar" ? "إدارة المشاريع" : "Project Management",
      href: `/${locale}/services/project-management`,
    },
  ];

  const company = [
    { label: t.nav.about, href: `/${locale}/about` },
    { label: t.nav.caseStudies, href: `/${locale}/case-studies` },
    { label: t.nav.industries, href: `/${locale}/industries` },
    { label: t.nav.insights, href: `/${locale}/insights` },
    { label: t.nav.contact, href: `/${locale}/contact` },
  ];

  const legal = [
    { label: t.footer.privacyPolicy, href: `/${locale}/privacy` },
    { label: t.footer.termsOfService, href: `/${locale}/terms` },
  ];

  return (
    <footer className="bg-[#061818] text-white">
      <div className="container-x pt-20 pb-10">
        {/* Top row: brand + CTA */}
        <div className="grid lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center h-12">
              <Link href={`/${locale}`}>
                <Image
                  src="/ak-logo.png"
                  alt="AK Prime"
                  width={101}
                  height={40}
                  className="h-full w-auto"
                />
              </Link>
            </div>
            <p className="text-[15px] text-white/80 max-w-md leading-relaxed">
              {t.footer.brandDescription}
            </p>
            <div className="flex items-center gap-3 pt-2">
              <SocialIcon href="https://linkedin.com" label="LinkedIn"><Linkedin size={16} /></SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter"><Twitter size={16} /></SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram"><Instagram size={16} /></SocialIcon>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <FooterCol title={t.footer.servicesTitle} items={services} />
            <FooterCol title={t.footer.companyTitle} items={company} />
            <div>
              <div className="eyebrow mb-5">{t.footer.connectTitle}</div>
              <ul className="space-y-3 text-[14px] text-white/70">
                <li className="flex items-start gap-2.5">
                  <Mail size={14} className="mt-1 text-[#37B4B4] shrink-0" />
                  <a
                    href="mailto:info@akprime.co.ke"
                    dir="ltr"
                    className="ltr-isolate hover:text-white transition-colors"
                  >
                    <bdi>info@akprime.co.ke</bdi>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone size={14} className="mt-1 text-[#37B4B4] shrink-0" />
                  <a
                    href="tel:+254118001001"
                    dir="ltr"
                    className="ltr-isolate hover:text-white transition-colors"
                  >
                    <bdi>0118 001 001</bdi>
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin size={14} className="mt-1 text-[#37B4B4] shrink-0" />
                  <span>{t.footer.locations}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA strip */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-8">
          <div className="text-[18px] sm:text-[22px] text-white/85 max-w-xl leading-snug">
            {locale === "ar"
              ? "هل أنت مستعد لإضفاء الوضوح والكفاءة التامة على عملياتك؟"
              : "Ready to bring clarity to your operations?"}
          </div>
          <Link
            href={`/${locale}/contact`}
            className="btn-cta self-start sm:self-auto inline-flex items-center gap-2"
          >
            <span>{locale === "ar" ? "ابدأ المحادثة الآن" : "Start the conversation"}</span>
            <ArrowUpRight size={16} strokeWidth={2.25} className="rtl-mirror shrink-0" />
          </Link>
        </div>

        {/* Oversized wordmark */}
        <div className="pt-6 pb-2" dir="ltr">
          <div
            aria-hidden
            className="select-none leading-none font-medium tracking-[-0.04em] text-white/[0.07] hover:text-[#37B4B4]/30 transition-colors duration-700"
            style={{ fontSize: "clamp(5rem, 18vw, 17rem)" }}
          >
            AK PRIME
          </div>
        </div>

        {/* Bottom strip */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between pt-6 border-t border-white/10 text-[12px] text-white/50">
          <div>{t.footer.copyright}</div>
          <div className="flex flex-wrap items-center gap-5">
            <LanguageSwitcher variant="footer" />
            {legal.map((l) => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  return (
    <div>
      <div className="eyebrow mb-5">{title}</div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.href}>
            <Link href={it.href} className="text-[14px] text-white/70 hover:text-white transition-colors">
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 rounded-full border border-white/15 hover:border-[#37B4B4] hover:text-[#37B4B4] text-white/70 inline-flex items-center justify-center transition-colors"
    >
      {children}
    </a>
  );
}
