"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

// Main pages only — detail/content pages excluded
const MAIN_PAGES = [
  "/services",
  "/industries",
  "/case-studies",
  "/insights",
  "/about",
  "/contact",
  "/book",
  "/resources",
];

export function MobileBackButton() {
  const pathname = usePathname();

  // Only show on exact main page matches, not detail pages like /industries/manufacturing
  const isMainPage = MAIN_PAGES.includes(pathname);
  if (!isMainPage) return null;

  return (
    <div className="lg:hidden px-4 pt-4 pb-0">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#37B4B4] hover:text-white transition-colors"
      >
        <ArrowLeft size={14} strokeWidth={2.5} />
        Back to home
      </Link>
    </div>
  );
}
