"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { getLocalizedServices, getLocalizedIndustries } from "@/lib/i18n/localized-data";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { locale, isRTL, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "industries" | null>(null);
  const [mobAccordion, setMobAccordion] = useState<"services" | "industries" | null>(null);
  const pathname = usePathname();

  const services = getLocalizedServices(locale);
  const industries = getLocalizedIndustries(locale);

  const CATEGORIES = [
    { key: "Systems & Technology", label: t.nav.categories.systems },
    { key: "Finance & Compliance", label: t.nav.categories.finance },
    { key: "Strategy & Transformation", label: t.nav.categories.strategy },
    { key: "Growth & Impact", label: t.nav.categories.growth },
  ];

  const navLinks = [
    { label: t.nav.caseStudies, href: `/${locale}/case-studies` },
    { label: t.nav.insights, href: `/${locale}/insights` },
    { label: t.nav.about, href: `/${locale}/about` },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lightHero = pathname.includes("/services") && !pathname.includes("/services/");
  const forceSolid = lightHero;

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 transition-colors duration-200 border-b border-white/[0.12]",
          (scrolled || forceSolid)
            ? "bg-[#082121]/95 backdrop-blur-md"
            : "bg-transparent"
        )}
        style={{ height: "var(--navbar-h)" }}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="container-x h-full flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center shrink-0 h-10"
            aria-label="AK Prime home"
          >
            <Image
              src="/ak-logo.png"
              alt="AK Prime"
              width={101}
              height={40}
              className="h-full w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[14px]">
            <NavLink
              href={`/${locale}`}
              active={pathname === `/${locale}` || pathname === "/"}
            >
              {t.nav.home}
            </NavLink>

            <DropdownTrigger
              label={t.nav.services}
              href={`/${locale}/services`}
              active={pathname.includes("/services")}
              open={openMenu === "services"}
              onOpen={() => setOpenMenu("services")}
              onClose={() => setOpenMenu(null)}
            />

            <DropdownTrigger
              label={t.nav.industries}
              href={`/${locale}/industries`}
              active={pathname.includes("/industries")}
              open={openMenu === "industries"}
              onOpen={() => setOpenMenu("industries")}
              onClose={() => setOpenMenu(null)}
            />

            {navLinks.map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                active={pathname.startsWith(l.href)}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs + Language Switcher */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher variant="desktop" />

            <Link
              href={`/${locale}/contact`}
              className="text-[13px] font-normal text-white/75 hover:text-white transition-colors px-2"
            >
              {t.nav.contact}
            </Link>

            <Link
              href={`/${locale}/book`}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] text-[13px] font-semibold transition-colors"
            >
              <span>{t.nav.bookConsultation}</span>
              <ArrowUpRight size={14} strokeWidth={2.5} className="rtl-mirror shrink-0" />
            </Link>
          </div>

          {/* Mobile Right Controls: Language switcher snippet + Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher variant="desktop" className="text-[11px]" />
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              className="text-white p-2 -mr-2"
              aria-label={mobileOpen ? t.nav.ariaClose : t.nav.ariaMenu}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Desktop mega panel */}
        {openMenu && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-[#0A2C2C] border-t border-white/10 border-b border-white/10 shadow-2xl"
            onMouseEnter={() => setOpenMenu(openMenu)}
          >
            <div className="container-x py-10">
              {openMenu === "services" ? (
                <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                  {CATEGORIES.map((cat) => (
                    <div key={cat.key}>
                      <div className="eyebrow mb-4">{cat.label}</div>
                      <ul className="space-y-2.5">
                        {services
                          .filter((s) => s.category === cat.key)
                          .map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/${locale}/services/${s.slug}`}
                                className="text-[14px] text-white/75 hover:text-[#37B4B4] transition-colors block leading-snug"
                              >
                                {s.name}
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                  ))}
                  <div className="col-span-4 pt-6 border-t border-white/10">
                    <Link
                      href={`/${locale}/services`}
                      className="text-[#37B4B4] hover:text-[#29E0C8] text-[13px] font-semibold inline-flex items-center gap-1.5 flex-wrap"
                    >
                      {t.nav.viewAllServices}{" "}
                      <ArrowUpRight size={14} className="rtl-mirror shrink-0" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                  {industries.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/${locale}/industries/${ind.slug}`}
                      className="group p-4 rounded-2xl border border-white/8 hover:border-[#37B4B4]/40 hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-[15px] font-semibold text-white group-hover:text-[#37B4B4] transition-colors">
                          {ind.name}
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-white/40 group-hover:text-[#37B4B4] transition-colors mt-1 rtl-mirror shrink-0"
                        />
                      </div>
                      <div className="text-[12px] text-white/55 mt-1.5 line-clamp-1">
                        {ind.shortDescription}
                      </div>
                    </Link>
                  ))}
                  <div className="col-span-3 pt-2">
                    <Link
                      href={`/${locale}/industries`}
                      className="text-[#37B4B4] hover:text-[#29E0C8] text-[13px] font-semibold inline-flex items-center gap-1.5 flex-wrap"
                    >
                      {t.nav.viewAllIndustries}{" "}
                      <ArrowUpRight size={14} className="rtl-mirror shrink-0" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#082121] pt-[var(--navbar-h)] overflow-y-auto">
          <div className="container-x py-6">
            {/* Language Switcher at top of mobile drawer */}
            <div className="mb-6">
              <LanguageSwitcher variant="mobile" />
            </div>

            <Link
              href={`/${locale}`}
              className="block py-3 text-[20px] font-normal text-white border-b border-white/10"
            >
              {t.nav.home}
            </Link>

            <MobileAccordion
              label={t.nav.services}
              open={mobAccordion === "services"}
              onToggle={() =>
                setMobAccordion(mobAccordion === "services" ? null : "services")
              }
            >
              <div className="space-y-5">
                {CATEGORIES.map((cat) => (
                  <div key={cat.key}>
                    <div className="eyebrow mb-2.5">{cat.label}</div>
                    <ul className="space-y-2">
                      {services
                        .filter((s) => s.category === cat.key)
                        .map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/${locale}/services/${s.slug}`}
                              className="text-[15px] text-white/75"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                ))}
                <Link
                  href={`/${locale}/services`}
                  className="text-[#37B4B4] text-[14px] font-semibold inline-flex items-center gap-1.5 pt-2 flex-wrap"
                >
                  {t.nav.viewAllServices}{" "}
                  <ArrowUpRight size={14} className="rtl-mirror shrink-0" />
                </Link>
              </div>
            </MobileAccordion>

            <MobileAccordion
              label={t.nav.industries}
              open={mobAccordion === "industries"}
              onToggle={() =>
                setMobAccordion(mobAccordion === "industries" ? null : "industries")
              }
            >
              <ul className="space-y-2.5">
                {industries.map((ind) => (
                  <li key={ind.slug}>
                    <Link
                      href={`/${locale}/industries/${ind.slug}`}
                      className="text-[15px] text-white/75"
                    >
                      {ind.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/industries`}
                className="text-[#37B4B4] text-[14px] font-semibold inline-flex items-center gap-1.5 pt-4 flex-wrap"
              >
                {t.nav.viewAllIndustries}{" "}
                <ArrowUpRight size={14} className="rtl-mirror shrink-0" />
              </Link>
            </MobileAccordion>

            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="block py-3 text-[20px] font-normal text-white border-b border-white/10"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/contact`}
              className="block py-3 text-[20px] font-normal text-white border-b border-white/10"
            >
              {t.nav.contact}
            </Link>

            <Link
              href={`/${locale}/book`}
              onClick={() => setMobileOpen(false)}
              className="w-full mt-8 py-3.5 px-4 rounded-lg bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] text-[15px] font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              <span>{t.nav.bookConsultation}</span>
              <ArrowUpRight size={16} strokeWidth={2.25} className="rtl-mirror shrink-0" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "px-3 py-2 rounded-md text-[14px] font-normal transition-colors",
        active ? "text-[#37B4B4]" : "text-white/75 hover:text-white"
      )}
    >
      {children}
    </Link>
  );
}

function DropdownTrigger({
  label,
  href,
  active,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  href: string;
  active: boolean;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onMouseEnter={onOpen}
      onClick={onClose}
      className={cn(
        "px-3 py-2 rounded-md text-[14px] font-normal transition-colors inline-flex items-center gap-1",
        active || open ? "text-[#37B4B4]" : "text-white/75 hover:text-white"
      )}
    >
      <span>{label}</span>
      <ChevronDown
        size={13}
        className={cn("transition-transform duration-200", open && "rotate-180")}
      />
    </Link>
  );
}

function MobileAccordion({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 text-[20px] font-normal text-white"
      >
        <span>{label}</span>
        <ChevronDown
          size={20}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}
