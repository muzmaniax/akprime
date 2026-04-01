"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ChevronRight, Home } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/ui/BookingModal";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { AnimatedBackground } from '@/components/motion-primitives/animated-background';
import { cn } from "@/lib/utils";
import { servicesData, ServiceCategory } from "@/data/services";
import { industriesData } from "@/data/industries";

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
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isDarkHeroPage =
    pathname === "/" ||
    pathname === "/services" ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/industries/");
  const isSolid = scrolled || !isDarkHeroPage;

  return (
    <>
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 h-[60px] lg:h-[68px] ${
          isSolid
            ? "bg-[#082121]/97 backdrop-blur-xl shadow-[0_1px_0_rgba(55,180,180,0.15)] border-b border-white/[0.06]"
            : "bg-[#082121]/80 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-6">

          {/* Logo — bare image, no circle */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="h-8 w-auto flex items-center transition-opacity group-hover:opacity-80">
              <Image
                src="/logo-primary.png"
                alt="AK Prime Consulting"
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
            <span className="hidden sm:block text-white font-bold text-sm tracking-tight leading-tight">
              AK<span className="text-[#37B4B4]"> Prime</span>
            </span>
          </Link>

          {/* Desktop Nav — inline, not absolutely positioned */}
          <div className="flex items-center gap-6">
            {/* Desktop Nav */}
            <div className="hidden lg:block h-full">
              <NavigationMenu className="h-full" align="center">
                <NavigationMenuList className="h-full gap-1">
                  <AnimatedBackground
                    defaultValue={pathname}
                    className="rounded-lg bg-white/10 backdrop-blur-sm"
                    transition={{
                      type: 'spring',
                      bounce: 0.2,
                      duration: 0.3,
                    }}
                    enableHover
                  >
                    {/* Home */}
                    <NavigationMenuItem data-id="/">
                      <Link href="/" legacyBehavior passHref>
                        <NavigationMenuLink
                          className={`px-4 py-2 rounded-lg text-[0.9375rem] font-medium transition-colors inline-flex items-center gap-1.5 ${pathname === "/" ? "text-[#37B4B4]" : "text-white/70 hover:text-white"
                            }`}
                        >
                          <Home size={14} />
                          Home
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>

                    {/* Services Mega Menu */}
                    <NavigationMenuItem data-id="services">
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-white/70 hover:text-white data-[state=open]:text-[#37B4B4] data-[state=open]:bg-transparent focus:bg-transparent text-[0.9375rem] font-medium px-4 py-2 h-auto gap-1.5 whitespace-nowrap">
                        Services
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-6 min-w-[600px] w-[700px] max-w-[calc(100vw-2rem)] bg-[#0E3E3E]/95 backdrop-blur-xl border border-white/10 rounded-[18px] shadow-2xl">
                        <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                          {CATEGORIES.map((category) => (
                            <div key={category}>
                              <h3 className="text-sm font-bold tracking-widest text-[#37B4B4] uppercase mb-4 border-b border-white/10 pb-2">
                                {category}
                              </h3>
                              <ul className="space-y-2">
                                {servicesData.filter(s => s.category === category).map((service) => (
                                  <li key={service.slug}>
                                    <Link
                                      href={`/services/${service.slug}`}
                                      legacyBehavior passHref
                                    >
                                      <NavigationMenuLink className="group/link flex items-center justify-between py-1 text-base text-white/80 hover:text-white transition-colors w-full">
                                        <span>{service.name}</span>
                                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[#37B4B4]" />
                                      </NavigationMenuLink>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                        {/* View All Services link */}
                        <div className="mt-6 pt-5 border-t border-white/10">
                          <Link
                            href="/services"
                            className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm transition-colors group/all"
                          >
                            View All Services
                            <ChevronRight size={15} className="group-hover/all:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Industries Mega Menu */}
                    <NavigationMenuItem data-id="industries">
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent text-white/70 hover:text-white data-[state=open]:text-[#37B4B4] data-[state=open]:bg-transparent focus:bg-transparent text-[0.9375rem] font-medium px-4 py-2 h-auto gap-1.5 whitespace-nowrap">
                        Industries
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="p-6 min-w-[650px] w-[740px] max-w-[calc(100vw-2rem)] bg-[#0E3E3E]/95 backdrop-blur-xl border border-white/10 rounded-[18px] shadow-2xl">
                        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                          {industriesData.map((industry) => (
                            <Link
                              key={industry.slug}
                              href={`/industries/${industry.slug}`}
                              legacyBehavior passHref
                            >
                              <NavigationMenuLink className="group/link flex flex-col p-3.5 rounded-[12px] hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 w-full text-left">
                                <div className="flex items-center justify-between mb-1 w-full">
                                  <span className="text-base font-bold text-white group-hover/link:text-[#37B4B4] transition-colors">{industry.name}</span>
                                  <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[#37B4B4]" />
                                </div>
                                <span className="text-sm text-white/60 leading-relaxed line-clamp-1">{industry.shortDescription}</span>
                              </NavigationMenuLink>
                            </Link>
                          ))}
                        </div>
                        {/* View All Industries link */}
                        <div className="mt-4 pt-5 border-t border-white/10">
                          <Link
                            href="/industries"
                            className="inline-flex items-center gap-2 text-[#37B4B4] hover:text-[#29E0C8] font-semibold text-sm transition-colors group/all"
                          >
                            View All Industries
                            <ChevronRight size={15} className="group-hover/all:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>

                    {/* Normal Links */}
                    {navLinks.map((link) => (
                      <NavigationMenuItem key={link.href} data-id={link.href}>
                        <Link href={link.href} legacyBehavior passHref>
                          <NavigationMenuLink
                            className={`px-4 py-2 rounded-lg text-[0.9375rem] font-medium transition-colors whitespace-nowrap inline-flex items-center justify-center ${pathname.startsWith(link.href)
                                ? "text-[#37B4B4]"
                                : "text-white/70 hover:text-white"
                              }`}
                          >
                            {link.label}
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}
                  </AnimatedBackground>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-2.5 border-l border-white/10 pl-5 ml-1">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center border border-[#37B4B4]/40 text-[#37B4B4] hover:bg-[#37B4B4]/10 hover:border-[#37B4B4] bg-transparent rounded-[10px] text-sm font-semibold px-4 h-9 transition-colors whitespace-nowrap shrink-0"
              >
                Get in Touch
              </Link>
              <Button
                onClick={() => setBookingOpen(true)}
                className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-bold px-5 h-9 rounded-[10px] transition-all duration-200 text-sm shadow-md shadow-[#37B4B4]/20 whitespace-nowrap shrink-0"
              >
                Book Consultation
              </Button>
            </div>

          </div>

          {/* Mobile menu — left aligned via flex-row-reverse */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden pointer-events-auto p-2 text-white/90 hover:text-[#37B4B4] transition-colors flex items-center justify-center">
              <Menu size={28} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] sm:w-[400px] bg-[#0E3E3E] border-l border-white/8 p-0"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-6 border-b border-white/8">
                  <Link
                    href="/"
                    className="flex shrink-0"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Image
                      src="/logo-primary.png"
                      alt="AK Prime Consulting"
                      width={100}
                      height={32}
                      className="h-8 w-auto object-contain"
                    />
                  </Link>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                  {/* Home */}
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg text-base font-semibold transition-colors ${pathname === "/"
                        ? "text-[#37B4B4] bg-[#37B4B4]/10"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <Home size={16} />
                    Home
                  </Link>

                  {/* Mobile Services Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-colors ${pathname.startsWith("/services") ? "text-[#37B4B4]" : "text-white/70 hover:text-white"}`}
                    >
                      Services
                      <ChevronDown size={18} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Accordion Content */}
                    <div className={`overflow-hidden transition-all duration-300 ${mobileServicesOpen ? "max-h-[1000px] opacity-100 mt-2 mb-4" : "max-h-0 opacity-0"}`}>
                      <div className="pl-5 pr-2 space-y-6 border-l border-white/10 ml-5 py-2">
                        {CATEGORIES.map((cat) => (
                          <div key={cat}>
                            <div className="text-xs font-bold tracking-widest uppercase text-[#37B4B4] mb-3">{cat}</div>
                            <ul className="space-y-2">
                              {servicesData.filter(s => s.category === cat).map((service) => (
                                <li key={service.slug}>
                                  <Link
                                    href={`/services/${service.slug}`}
                                    onClick={() => setMobileOpen(false)}
                                    className="block text-lg font-medium text-white/70 hover:text-white py-2 transition-colors"
                                  >
                                    {service.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Industries Accordion */}
                  <div>
                    <button
                      onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-base font-semibold transition-colors ${pathname.startsWith("/industries") ? "text-[#37B4B4]" : "text-white/70 hover:text-white"}`}
                    >
                      Industries
                      <ChevronDown size={18} className={`transition-transform duration-300 ${mobileIndustriesOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Accordion Content */}
                    <div className={`overflow-hidden transition-all duration-300 ${mobileIndustriesOpen ? "max-h-[1000px] opacity-100 mt-2 mb-4" : "max-h-0 opacity-0"}`}>
                      <div className="pl-5 pr-2 space-y-3 border-l border-white/10 ml-5 py-2">
                        {industriesData.map((industry) => (
                          <Link
                            key={industry.slug}
                            href={`/industries/${industry.slug}`}
                            onClick={() => setMobileOpen(false)}
                            className="block text-lg font-medium text-white/70 hover:text-white py-1.5 transition-colors"
                          >
                            {industry.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>

                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${pathname.startsWith(link.href)
                          ? "text-[#37B4B4] bg-[#37B4B4]/10"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    Contact
                  </Link>
                </nav>
                <div className="p-6 border-t border-white/8 space-y-3 bg-[#082121]">
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center w-full border border-[#37B4B4]/40 text-[#37B4B4] hover:bg-[#37B4B4]/10 bg-transparent rounded-[12px] h-12 text-base font-semibold transition-colors"
                  >
                    Get in Touch
                  </Link>
                  <Button
                    className="w-full bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-bold rounded-[12px] h-12 text-base"
                    onClick={() => {
                      setMobileOpen(false);
                      setBookingOpen(true);
                    }}
                  >
                    Book Consultation
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

        </div>
      </header>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
