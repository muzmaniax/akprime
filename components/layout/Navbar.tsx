"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { BookingModal } from "@/components/ui/BookingModal";
import { servicesData, ServiceCategory } from "@/data/services";
import { industriesData } from "@/data/industries";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Case Studies", href: "/case-studies" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

const CATEGORIES: ServiceCategory[] = [
  "Systems & Technology",
  "Finance & Compliance",
  "Strategy & Transformation",
  "Growth & Impact",
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"services" | "industries" | null>(null);
  const [mobAccordion, setMobAccordion] = useState<"services" | "industries" | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Light-hero routes — force solid navbar so white text stays legible
  const lightHero = pathname.startsWith("/services") && !pathname.startsWith("/services/");
  const forceSolid = lightHero;

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

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
        <div className="container-x h-full flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0 h-10" aria-label="AK Prime home">
            <img
              src="/ak-logo.png"
              alt="AK Prime"
              className="h-full w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1 text-[14px]">
            <NavLink href="/" active={pathname === "/"}>Home</NavLink>

            <DropdownTrigger
              label="Services"
              href="/services"
              active={pathname.startsWith("/services")}
              open={openMenu === "services"}
              onOpen={() => setOpenMenu("services")}
              onClose={() => setOpenMenu(null)}
            />

            <DropdownTrigger
              label="Industries"
              href="/industries"
              active={pathname.startsWith("/industries")}
              open={openMenu === "industries"}
              onOpen={() => setOpenMenu("industries")}
              onClose={() => setOpenMenu(null)}
            />

            {navLinks.map((l) => (
              <NavLink key={l.href} href={l.href} active={pathname.startsWith(l.href)}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-[13px] font-normal text-white/75 hover:text-white transition-colors px-2"
            >
              Contact
            </Link>
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] text-[13px] font-semibold transition-colors"
            >
              Book a call
              <ArrowUpRight size={14} strokeWidth={2.5} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-white p-2 -mr-2"
            aria-label="Open menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop mega panel */}
        {openMenu && (
          <div
            className="hidden lg:block absolute left-0 right-0 top-full bg-[#0A2C2C] border-t border-white/10 border-b border-white/10"
            onMouseEnter={() => setOpenMenu(openMenu)}
          >
            <div className="container-x py-10">
              {openMenu === "services" ? (
                <div className="grid grid-cols-4 gap-x-8 gap-y-6">
                  {CATEGORIES.map((cat) => (
                    <div key={cat}>
                      <div className="eyebrow mb-4">{cat}</div>
                      <ul className="space-y-2.5">
                        {servicesData.filter((s) => s.category === cat).map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/services/${s.slug}`}
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
                    <Link href="/services" className="text-[#37B4B4] hover:text-[#29E0C8] text-[13px] font-semibold inline-flex items-center gap-1.5 flex-wrap">
                      View all services <ArrowUpRight size={14} className="shrink-0" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-x-6 gap-y-3">
                  {industriesData.map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industries/${ind.slug}`}
                      className="group p-4 rounded-2xl border border-white/8 hover:border-[#37B4B4]/40 hover:bg-white/[0.03] transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="text-[15px] font-medium text-white group-hover:text-[#37B4B4] transition-colors">
                          {ind.name}
                        </div>
                        <ArrowUpRight size={14} className="text-white/40 group-hover:text-[#37B4B4] transition-colors mt-1" />
                      </div>
                      <div className="text-[12px] text-white/55 mt-1.5 line-clamp-1">{ind.shortDescription}</div>
                    </Link>
                  ))}
                  <div className="col-span-3 pt-2">
                    <Link href="/industries" className="text-[#37B4B4] hover:text-[#29E0C8] text-[13px] font-semibold inline-flex items-center gap-1.5 flex-wrap">
                      View all industries <ArrowUpRight size={14} className="shrink-0" />
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
            <Link href="/" className="block py-3 text-[20px] font-normal text-white border-b border-white/10">Home</Link>

            <MobileAccordion
              label="Services"
              open={mobAccordion === "services"}
              onToggle={() => setMobAccordion(mobAccordion === "services" ? null : "services")}
            >
              <div className="space-y-5">
                {CATEGORIES.map((cat) => (
                  <div key={cat}>
                    <div className="eyebrow mb-2.5">{cat}</div>
                    <ul className="space-y-2">
                      {servicesData.filter((s) => s.category === cat).map((s) => (
                        <li key={s.slug}>
                          <Link href={`/services/${s.slug}`} className="text-[15px] text-white/75">{s.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <Link href="/services" className="text-[#37B4B4] text-[14px] font-semibold inline-flex items-center gap-1.5 pt-2 flex-wrap">
                  All services <ArrowUpRight size={14} className="shrink-0" />
                </Link>
              </div>
            </MobileAccordion>

            <MobileAccordion
              label="Industries"
              open={mobAccordion === "industries"}
              onToggle={() => setMobAccordion(mobAccordion === "industries" ? null : "industries")}
            >
              <ul className="space-y-2.5">
                {industriesData.map((ind) => (
                  <li key={ind.slug}>
                    <Link href={`/industries/${ind.slug}`} className="text-[15px] text-white/75">{ind.name}</Link>
                  </li>
                ))}
              </ul>
            </MobileAccordion>

            {navLinks.map((l) => (
              <Link key={l.href} href={l.href} className="block py-3 text-[20px] font-normal text-white border-b border-white/10">
                {l.label}
              </Link>
            ))}
            <Link href="/contact" className="block py-3 text-[20px] font-normal text-white border-b border-white/10">Contact</Link>

            <button
              type="button"
              onClick={() => { setMobileOpen(false); setBookingOpen(true); }}
              className="w-full mt-8 py-3.5 px-4 rounded-lg bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] text-[15px] font-semibold inline-flex items-center justify-center gap-2 transition-colors"
            >
              Book a Strategy Call <ArrowUpRight size={16} strokeWidth={2.25} />
            </button>
          </div>
        </div>
      )}

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}

function NavLink({ href, active, children }: { href: string; active?: boolean; children: React.ReactNode }) {
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
  label, href, active, open, onOpen, onClose,
}: { label: string; href: string; active: boolean; open: boolean; onOpen: () => void; onClose: () => void }) {
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
      {label}
      <ChevronDown size={13} className={cn("transition-transform", open && "rotate-180")} />
    </Link>
  );
}

function MobileAccordion({
  label, open, onToggle, children,
}: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 text-[20px] font-normal text-white"
      >
        {label}
        <ChevronDown size={20} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && <div className="pb-5">{children}</div>}
    </div>
  );
}
