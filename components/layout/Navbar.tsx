"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BookingModal } from "@/components/ui/BookingModal";
import { servicesData, ServiceCategory } from "@/data/services";
import { industriesData } from "@/data/industries";

const navLinks = [
  { label: "Case Studies",  href: "/case-studies" },
  { label: "Insights",      href: "/insights" },
  { label: "About",         href: "/about" },
];

const CATEGORIES: ServiceCategory[] = [
  "Systems & Technology",
  "Finance & Compliance",
  "Strategy & Transformation",
  "Growth & Impact",
];

export function Navbar() {
  const [scrolled, setScrolled]     = useState(false);
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
        className="fixed top-4 sm:top-6 left-0 right-0 z-50 pointer-events-none transition-all duration-500"
        style={{ height: "80px" }}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative">
          
          {/* Independent Floating Logo */}
          <Link href="/" className="pointer-events-auto flex items-center group relative z-50 shrink-0">
            <div 
              className="w-[68px] h-[68px] sm:w-[76px] sm:h-[76px] rounded-full flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(55,180,180,0.15) 0%, rgba(55,180,180,0.4) 100%)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 10px 40px rgba(55,180,180,0.4), inset 0 2px 4px rgba(255,255,255,0.4), inset 0 -4px 6px rgba(10,50,50,0.2)",
                border: "1px solid rgba(255,255,255,0.3)"
              }}
            >
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1.5 shadow-inner">
                <Image 
                  src="/logo-primary.png" 
                  alt="AK Prime Consulting" 
                  width={200} 
                  height={200} 
                  className="w-full h-full object-contain drop-shadow-sm"
                  priority
                />
              </div>
            </div>
          </Link>

          {/* Centered Glass Pill (Nav + CTAs) */}
          <div 
            className={`pointer-events-auto absolute left-1/2 -translate-x-1/2 rounded-[2.5rem] transition-all duration-500 flex items-center ${
              isSolid
                ? "bg-[#082121]/90 backdrop-blur-3xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] border border-white/10 h-[64px] px-6 sm:px-8"
                : "bg-black/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] border border-white/10 h-[64px] px-6 sm:px-8"
            }`}
          >
            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1 h-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            
            {/* Services Mega Menu */}
            <div className="h-full flex items-center group/nav">
              <Link
                href="/services"
                className={`px-4 py-2 rounded-lg text-base font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname.startsWith("/services")
                    ? "text-[#37B4B4]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Services
                <ChevronDown size={16} className="opacity-70 group-hover/nav:rotate-180 transition-transform duration-300" />
              </Link>

              {/* Mega Dropdown Panel */}
              <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[800px] bg-[#0E3E3E] border border-white/10 rounded-2xl shadow-2xl p-8 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-4 group-hover/nav:translate-y-0 grid grid-cols-2 gap-10 before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:bg-transparent">
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
                            className="group/link flex items-center justify-between py-1.5 text-lg text-white/80 hover:text-white transition-colors"
                          >
                            <span>{service.name}</span>
                            <ChevronRight size={16} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[#37B4B4]" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries Mega Menu */}
            <div className="h-full flex items-center group/nav">
              <Link
                href="/industries"
                className={`px-4 py-2 rounded-lg text-base font-semibold transition-colors flex items-center gap-1.5 ${
                  pathname.startsWith("/industries")
                    ? "text-[#37B4B4]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                Industries
                <ChevronDown size={16} className="opacity-70 group-hover/nav:rotate-180 transition-transform duration-300" />
              </Link>

              {/* Mega Dropdown Panel */}
              <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-[800px] bg-[#0E3E3E] border border-white/10 rounded-2xl shadow-2xl p-8 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-4 group-hover/nav:translate-y-0 grid grid-cols-2 gap-x-8 gap-y-4 before:absolute before:-top-6 before:left-0 before:right-0 before:h-6 before:bg-transparent">
                {industriesData.map((industry) => (
                  <Link 
                    key={industry.slug}
                    href={`/industries/${industry.slug}`}
                    className="group/link flex flex-col p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-lg font-bold text-white group-hover/link:text-[#37B4B4] transition-colors">{industry.name}</span>
                      <ChevronRight size={18} className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-[#37B4B4]" />
                    </div>
                    <span className="text-base text-white/60 leading-relaxed line-clamp-1">{industry.shortDescription}</span>
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-base font-semibold transition-colors ${
                  pathname.startsWith(link.href)
                    ? "text-[#37B4B4]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3 border-l border-white/10 pl-5 ml-2 h-full drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-[#37B4B4]/40 text-[#37B4B4] hover:bg-[#37B4B4]/10 hover:border-[#37B4B4] bg-transparent rounded-xl text-base font-semibold px-5 h-12 transition-colors"
            >
              Get in Touch
            </Link>
            <Button
              onClick={() => setBookingOpen(true)}
              className="bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-bold px-6 h-12 rounded-xl cta-pulse transition-all duration-200 text-base shadow-lg shadow-[#37B4B4]/20"
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-white/90 hover:text-[#37B4B4] hover:bg-white/10 transition-colors drop-shadow-md">
              <Menu size={22} />
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
                    <div className="w-[52px] h-[52px] rounded-full bg-white flex items-center justify-center p-2 shadow-sm border border-black/5">
                      <Image 
                        src="/logo-primary.png" 
                        alt="AK Prime Consulting" 
                        width={200} 
                        height={200} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </Link>
                </div>
                <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                  
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
                      className={`block px-4 py-3 rounded-lg text-base font-semibold transition-colors ${
                        pathname.startsWith(link.href)
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
                    className="inline-flex items-center justify-center w-full border border-[#37B4B4]/40 text-[#37B4B4] hover:bg-[#37B4B4]/10 bg-transparent rounded-xl h-12 text-base font-semibold transition-colors"
                  >
                    Get in Touch
                  </Link>
                  <Button
                    className="w-full bg-[#37B4B4] hover:bg-[#29E0C8] text-[#082121] font-bold rounded-xl h-12 text-base"
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
          
          </div> {/* End of Centered Glass Pill */}
        </div>
      </header>

      <BookingModal open={bookingOpen} onOpenChange={setBookingOpen} />
    </>
  );
}
