"use client";

import { useState, useEffect, useRef, useCallback, DragEvent } from "react";
import { toast } from "sonner";
import {
  Image as ImageIcon, Upload, X, Check, ExternalLink, Loader2,
  LogOut, RefreshCw, Monitor, Smartphone, ChevronDown, AlertTriangle, MousePointer2, FileText, Pencil,
  BookOpen, LayoutList,
} from "lucide-react";
import { ImageEditorDialog } from "./ImageEditorDialog";
import { ContentEditorDialog, STATIC_INSIGHTS, type ContentItem } from "./ContentEditorDialog";
import { caseStudies } from "@/data/case-studies";
import { invalidateCMSCache } from "@/lib/use-cms-content";
import { useRouter } from "next/navigation";

/* ─────────────────────────── types ─────────────────────────── */
type Slot = { key: string; path: string; label: string; page: string; section: string };
type PageFilter = "All" | "Home" | "About" | "Industries" | "Case Studies" | "Insights" | "Shared" | "Partners" | "Services";
type Viewport = "desktop" | "mobile";
type SidebarTab = "images" | "content";

const PAGES: PageFilter[] = ["All", "Home", "About", "Industries", "Case Studies", "Insights", "Services", "Shared", "Partners"];

const PAGE_URLS: Record<PageFilter, string> = {
  All:            "/",
  Home:           "/",
  About:          "/about",
  Industries:     "/industries",
  "Case Studies": "/case-studies",
  Insights:       "/insights",
  Services:       "/services",
  Shared:         "/",
  Partners:       "/",
};

const INSIGHT_SLUGS = [
  { slug: "why-most-business-problems-are-misdiagnosed",     title: "Why Most Business Problems Are Misdiagnosed" },
  { slug: "the-real-cost-of-poor-decision-making",           title: "The Real Cost of Poor Decision-Making" },
  { slug: "when-founders-should-seek-external-perspective",  title: "When Founders Should Seek External Perspective" },
];

const SERVICE_SLUGS: { id: string; slug: string; name: string }[] = [
  { id: "erp",          slug: "erp-implementation",            name: "ERP Implementation" },
  { id: "ai",           slug: "ai-integration-automation",     name: "AI & Automation" },
  { id: "training",     slug: "systems-training",              name: "Systems Training" },
  { id: "pm",           slug: "project-management",            name: "Project Management" },
  { id: "ba",           slug: "business-analysis",             name: "Business Analysis" },
  { id: "restructuring",slug: "company-restructuring",         name: "Company Restructuring" },
  { id: "vc",           slug: "vc-fundraising-advisory",       name: "VC & Fundraising" },
  { id: "finance",      slug: "financial-management",          name: "Financial Management" },
  { id: "cashflow",     slug: "cashflow-optimisation",         name: "Cashflow Optimisation" },
  { id: "audit",        slug: "audit-assurance",               name: "Audit & Assurance" },
  { id: "it-audit",     slug: "it-systems-audit",              name: "IT Systems Audit" },
  { id: "bookkeeping",  slug: "cloud-accounting",              name: "Cloud Accounting" },
  { id: "risk",         slug: "risk-compliance",               name: "Risk & Compliance" },
  { id: "secretarial",  slug: "company-secretarial",           name: "Company Secretarial" },
  { id: "marketing",    slug: "digital-marketing",             name: "Digital Marketing" },
  { id: "hr-advisory",  slug: "hr-advisory-org-design",        name: "HR Advisory" },
  { id: "hr-policy",    slug: "hr-policy-compliance",          name: "HR Policy" },
  { id: "payroll",      slug: "payroll-management",            name: "Payroll" },
  { id: "recruitment",  slug: "recruitment-talent-acquisition",name: "Recruitment" },
  { id: "performance",  slug: "performance-management-systems",name: "Performance Mgmt" },
  { id: "hrms",         slug: "hrms-implementation",           name: "HRMS Implementation" },
  { id: "learning",     slug: "learning-development",          name: "Learning & Development" },
  { id: "me",           slug: "monitoring-evaluation",         name: "Monitoring & Evaluation" },
];

const INDUSTRY_SLUGS = [
  "manufacturing", "financial-services", "logistics",
  "healthcare", "ngos", "government", "education", "retail",
];

const CASE_STUDY_IDS = [
  "mo-radio-tax-compliance",
  "coastal-image-technologies",
];

function isPartner(key: string) { return key.startsWith("partner."); }

/* Build reverse-map: path → slot keys that use it */
function buildSharedMap(slots: Slot[]): Record<string, string[]> {
  const map: Record<string, string[]> = {};
  slots.forEach(s => {
    if (!s.path) return;
    if (!map[s.path]) map[s.path] = [];
    map[s.path].push(s.key);
  });
  return map;
}

/* ══════════════════════════ Admin Page ══════════════════════════ */
export default function AdminPage() {
  const [slots,        setSlots]        = useState<Slot[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [filter,       setFilter]       = useState<PageFilter>("Home");
  const [activeSlot,   setActiveSlot]   = useState<Slot | null>(null);
  const [sharedPick,   setSharedPick]   = useState<Slot[] | null>(null);
  const [viewport,     setViewport]     = useState<Viewport>("desktop");
  const [iframeSrc,    setIframeSrc]    = useState("/");
  const [iframeKey,    setIframeKey]    = useState(0);
  const [industry,     setIndustry]     = useState(INDUSTRY_SLUGS[0]);
  const [caseStudyId,  setCaseStudyId]  = useState(CASE_STUDY_IDS[0]);
  const [serviceSlug,  setServiceSlug]  = useState(SERVICE_SLUGS[0].slug);
  const [insightSlug,  setInsightSlug]  = useState(INSIGHT_SLUGS[0].slug);
  const [overlayOn,    setOverlayOn]    = useState(true);
  const [sidebarTab,    setSidebarTab]    = useState<SidebarTab>("images");
  const [activeContent, setActiveContent] = useState<ContentItem | null>(null);
  const [contentCMS,    setContentCMS]    = useState<{
    "case-studies": Record<string, Record<string, unknown>>;
    insights:       Record<string, Record<string, unknown>>;
  }>({ "case-studies": {}, insights: {} });
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  /* keep handleImageClick ref fresh — avoids stale-closure in iframe injection */
  const slotsRef = useRef(slots);
  slotsRef.current = slots;

  /* load slots + content CMS once */
  useEffect(() => {
    fetch("/api/cms/images")
      .then(r => r.json())
      .then(d => setSlots(d.slots ?? []))
      .catch(() => toast.error("Failed to load slots"))
      .finally(() => setLoading(false));

    fetch("/api/cms/content")
      .then(r => r.json())
      .then(d => setContentCMS({
        "case-studies": (d?.["case-studies"] ?? {}) as Record<string, Record<string, unknown>>,
        insights:       (d?.insights ?? {})         as Record<string, Record<string, unknown>>,
      }))
      .catch(() => {});
  }, []);

  /* sync iframe when filter/sub-filter changes */
  useEffect(() => {
    let base = PAGE_URLS[filter];
    if (filter === "Industries")     base = `/industries/${industry}`;
    if (filter === "Case Studies")   base = `/case-studies/${caseStudyId}`;
    if (filter === "Services")       base = `/services/${serviceSlug}`;
    if (filter === "Insights")       base = `/insights/${insightSlug}`;
    setIframeSrc(base);
  }, [filter, industry, caseStudyId, serviceSlug, insightSlug]);

  /* ── iframe overlay injection ── */
  const injectOverlay = useCallback(() => {
    if (!overlayOn) return;
    const doc = iframeRef.current?.contentDocument;
    if (!doc || !doc.body) return;

    const handleClick = (path: string) => {
      // Normalise: strip origin prefix if present
      const cleanPath = path.startsWith("http")
        ? new URL(path).pathname
        : path;

      const matching = slotsRef.current.filter(s => s.path === cleanPath);
      if (matching.length === 0) {
        toast(`No CMS slot registered for ${cleanPath}`, { icon: "ℹ️" });
        return;
      }
      if (matching.length === 1) {
        setActiveSlot(matching[0]);
      } else {
        setSharedPick(matching);
      }
    };

    /* ── img elements ── */
    doc.querySelectorAll<HTMLImageElement>("img:not([data-cms])").forEach(img => {
      img.dataset.cms = "1";
      img.style.cursor = "pointer";
      img.style.transition = "outline 80ms";

      img.addEventListener("mouseenter", () => {
        img.style.outline = "3px solid #37B4B4";
        img.style.outlineOffset = "2px";
      });
      img.addEventListener("mouseleave", () => {
        img.style.outline = "";
        img.style.outlineOffset = "";
      });

      // Prevent parent anchor from navigating when image is clicked in CMS mode
      const anchor = img.closest("a");
      if (anchor && !anchor.dataset.cmsAnchor) {
        anchor.dataset.cmsAnchor = "1";
        anchor.addEventListener("click", e => {
          if ((e.target as HTMLElement).closest("[data-cms]")) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        }, true);
      }

      img.addEventListener("click", e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        handleClick(img.src);
      });
    });

    /* ── background-image elements ── */
    doc.querySelectorAll<HTMLElement>("*:not([data-cms-bg])").forEach(el => {
      const bg = el.style?.backgroundImage;
      if (!bg || !bg.includes("url(")) return;
      const match = bg.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      if (!match) return;
      const src = match[1];
      if (!src.startsWith("/images/") && !src.startsWith("/partners/")) return;

      el.dataset.cmsBg = "1";
      el.style.cursor = "pointer";
      el.style.transition = "outline 80ms";

      el.addEventListener("mouseenter", () => {
        el.style.outline = "3px solid #37B4B4";
        el.style.outlineOffset = "0px";
        // Also show a CMS badge tooltip
        let badge = el.querySelector<HTMLElement>("[data-cms-badge]");
        if (!badge) {
          badge = doc.createElement("div");
          badge.dataset.cmsBadge = "1";
          badge.textContent = "✎ Edit image";
          badge.style.cssText = "position:absolute;top:8px;right:8px;z-index:9999;background:#37B4B4;color:#082121;font-size:11px;font-weight:600;padding:4px 8px;border-radius:6px;pointer-events:none;font-family:system-ui,sans-serif;";
          // ensure parent is positioned
          if (getComputedStyle(el).position === "static") el.style.position = "relative";
          el.appendChild(badge);
        }
        badge.style.display = "block";
      });
      el.addEventListener("mouseleave", () => {
        el.style.outline = "";
        el.style.outlineOffset = "";
        el.querySelector<HTMLElement>("[data-cms-badge]")?.remove();
      });

      // Prevent the parent <a> / Next.js Link from navigating
      const anchor = el.closest("a");
      if (anchor && !anchor.dataset.cmsAnchor) {
        anchor.dataset.cmsAnchor = "1";
        anchor.addEventListener("click", e => {
          if ((e.target as HTMLElement).closest("[data-cms-bg]")) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        }, true); // capture phase — fires before Next.js router
      }

      el.addEventListener("click", e => {
        e.preventDefault();
        e.stopImmediatePropagation();
        handleClick(src);
      });
    });
  }, [overlayOn]);

  /* re-inject on overlay toggle, slot list changes, or iframe reload */
  useEffect(() => {
    if (!overlayOn) return;
    // small delay to let the iframe settle before querying its DOM
    const t = setTimeout(injectOverlay, 600);
    return () => clearTimeout(t);
  }, [iframeKey, overlayOn, injectOverlay]);

  function reload() { setIframeKey(k => k + 1); }

  async function handleSignOut() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  const sharedMap = buildSharedMap(slots);

  const filtered =
    filter === "All"          ? slots :
    filter === "Partners"     ? slots.filter(s => isPartner(s.key)) :
    filter === "Shared"       ? slots.filter(s => s.page === "Shared" && !isPartner(s.key)) :
    filter === "Services"     ? slots.filter(s => s.page === "Services") :
    filter === "Insights"     ? slots.filter(s => s.page === "Insights") :
    slots.filter(s => s.page === filter);

  function handleApply(key: string, path: string) {
    setSlots(prev => prev.map(s => s.key === key ? { ...s, path } : s));
    setActiveSlot(null);
    setTimeout(reload, 300);
  }

  /* ── render ── */
  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#082121", color: "#fff" }}>

      {/* ── Header ── */}
      <header
        className="shrink-0 flex items-center justify-between px-5 h-14 border-b z-40"
        style={{ background: "#082121", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#37B4B4" }}>
              <ImageIcon size={14} color="#082121" />
            </div>
            <span className="text-white font-semibold text-[14px] tracking-tight">Image CMS</span>
          </div>

          <nav className="hidden md:flex items-center gap-0.5">
            {PAGES.map(p => (
              <button
                key={p}
                onClick={() => setFilter(p)}
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap"
                style={filter === p
                  ? { background: "#37B4B4", color: "#082121" }
                  : { color: "rgba(255,255,255,0.5)" }}
              >
                {p}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          {/* Overlay toggle */}
          <button
            onClick={() => setOverlayOn(v => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
            style={{
              background: overlayOn ? "rgba(55,180,180,0.15)" : "rgba(255,255,255,0.05)",
              color: overlayOn ? "#37B4B4" : "rgba(255,255,255,0.4)",
              border: overlayOn ? "1px solid rgba(55,180,180,0.3)" : "1px solid transparent",
            }}
            title={overlayOn ? "Click mode on — images in preview are clickable" : "Click mode off"}
          >
            <MousePointer2 size={12} />
            <span className="hidden sm:inline">Click mode</span>
          </button>
          <a
            href={iframeSrc}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition-colors"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            <ExternalLink size={13} />
          </a>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            <LogOut size={13} />
          </button>
        </div>
      </header>

      {/* ── Split pane ── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ════ LEFT: preview ════ */}
        <div className="flex-1 flex flex-col min-w-0 border-r" style={{ borderColor: "rgba(255,255,255,0.06)" }}>

          {/* Browser chrome */}
          <div
            className="shrink-0 flex items-center gap-2 px-3 h-10 border-b"
            style={{ background: "#061818", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={reload}
              className="w-7 h-7 rounded flex items-center justify-center transition-colors hover:bg-white/10"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <RefreshCw size={12} />
            </button>

            {/* URL pill */}
            <div
              className="flex-1 flex items-center gap-2 px-3 h-6 rounded-full text-[11px] truncate"
              style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}
            >
              <span className="text-[10px] shrink-0" style={{ color: "rgba(255,255,255,0.2)" }}>localhost:3000</span>
              <span className="truncate">{iframeSrc}</span>
            </div>

            {/* Industry sub-picker — switches to detail page view */}
            {filter === "Industries" && (
              <div className="relative flex items-center shrink-0">
                <select
                  value={industry}
                  onChange={e => {
                    setIndustry(e.target.value);
                    setIframeSrc(`/industries/${e.target.value}`);
                  }}
                  className="appearance-none pl-2 pr-6 h-6 rounded text-[11px] font-medium cursor-pointer"
                  style={{ background: "rgba(55,180,180,0.15)", color: "#37B4B4", border: "1px solid rgba(55,180,180,0.3)" }}
                >
                  <option value="" style={{ background: "#082121" }}>All (listing)</option>
                  {INDUSTRY_SLUGS.map(s => (
                    <option key={s} value={s} style={{ background: "#082121" }}>{s.replace(/-/g, " ")}</option>
                  ))}
                </select>
                <ChevronDown size={10} className="absolute right-1.5 pointer-events-none" style={{ color: "#37B4B4" }} />
              </div>
            )}

            {/* Case study sub-picker */}
            {filter === "Case Studies" && (
              <div className="relative flex items-center shrink-0">
                <select
                  value={caseStudyId}
                  onChange={e => setCaseStudyId(e.target.value)}
                  className="appearance-none pl-2 pr-6 h-6 rounded text-[11px] font-medium cursor-pointer"
                  style={{ background: "rgba(55,180,180,0.15)", color: "#37B4B4", border: "1px solid rgba(55,180,180,0.3)" }}
                >
                  {CASE_STUDY_IDS.map(id => (
                    <option key={id} value={id} style={{ background: "#082121" }}>{id.replace(/-/g, " ")}</option>
                  ))}
                </select>
                <ChevronDown size={10} className="absolute right-1.5 pointer-events-none" style={{ color: "#37B4B4" }} />
              </div>
            )}

            {/* Insight sub-picker */}
            {filter === "Insights" && (
              <div className="relative flex items-center shrink-0">
                <select
                  value={insightSlug}
                  onChange={e => setInsightSlug(e.target.value)}
                  className="appearance-none pl-2 pr-6 h-6 rounded text-[11px] font-medium cursor-pointer"
                  style={{ background: "rgba(55,180,180,0.15)", color: "#37B4B4", border: "1px solid rgba(55,180,180,0.3)" }}
                >
                  {INSIGHT_SLUGS.map(s => (
                    <option key={s.slug} value={s.slug} style={{ background: "#082121" }}>{s.title}</option>
                  ))}
                </select>
                <ChevronDown size={10} className="absolute right-1.5 pointer-events-none" style={{ color: "#37B4B4" }} />
              </div>
            )}

            {/* Service sub-picker */}
            {filter === "Services" && (
              <div className="relative flex items-center shrink-0">
                <select
                  value={serviceSlug}
                  onChange={e => setServiceSlug(e.target.value)}
                  className="appearance-none pl-2 pr-6 h-6 rounded text-[11px] font-medium cursor-pointer"
                  style={{ background: "rgba(55,180,180,0.15)", color: "#37B4B4", border: "1px solid rgba(55,180,180,0.3)" }}
                >
                  {SERVICE_SLUGS.map(s => (
                    <option key={s.slug} value={s.slug} style={{ background: "#082121" }}>{s.name}</option>
                  ))}
                </select>
                <ChevronDown size={10} className="absolute right-1.5 pointer-events-none" style={{ color: "#37B4B4" }} />
              </div>
            )}

            {/* Viewport toggle */}
            <div className="flex rounded overflow-hidden shrink-0" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
              {(["desktop", "mobile"] as Viewport[]).map(v => (
                <button
                  key={v}
                  onClick={() => setViewport(v)}
                  className="w-7 h-6 flex items-center justify-center"
                  style={{
                    background: viewport === v ? "rgba(55,180,180,0.2)" : "transparent",
                    color: viewport === v ? "#37B4B4" : "rgba(255,255,255,0.3)",
                  }}
                >
                  {v === "desktop" ? <Monitor size={12} /> : <Smartphone size={12} />}
                </button>
              ))}
            </div>
          </div>

          {/* Click-mode hint banner */}
          {overlayOn && (
            <div
              className="shrink-0 flex items-center justify-center gap-2 py-1.5 text-[11px]"
              style={{ background: "rgba(55,180,180,0.08)", color: "#37B4B4", borderBottom: "1px solid rgba(55,180,180,0.15)" }}
            >
              <MousePointer2 size={11} />
              Click any image in the preview to edit it
            </div>
          )}

          {/* Iframe */}
          <div className="flex-1 overflow-auto flex" style={{ background: "#030f0f" }}>
            <div
              className="transition-all duration-300 mx-auto"
              style={{ width: viewport === "mobile" ? "390px" : "100%", minHeight: "100%", flexShrink: 0 }}
            >
              <iframe
                key={iframeKey}
                ref={iframeRef}
                src={iframeSrc}
                onLoad={injectOverlay}
                className="w-full h-full"
                style={{ minHeight: "calc(100vh - 120px)", border: "none", display: "block" }}
                title="Site preview"
              />
            </div>
          </div>
        </div>

        {/* ════ RIGHT: sidebar ════ */}
        <div className="shrink-0 flex flex-col overflow-hidden" style={{ width: "360px", background: "#082121" }}>

          {/* Tab bar */}
          <div className="shrink-0 flex border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
            {([["images", LayoutList, "Images"] as const, ["content", FileText, "Content"] as const]).map(([key, Icon, label]) => (
              <button
                key={key}
                onClick={() => setSidebarTab(key)}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 text-[12px] font-medium transition-colors"
                style={sidebarTab === key
                  ? { color: "#37B4B4", borderBottom: "2px solid #37B4B4", background: "rgba(55,180,180,0.05)" }
                  : { color: "rgba(255,255,255,0.35)" }}
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>

          {/* ── IMAGES tab ── */}
          {sidebarTab === "images" && (<>
            <div className="shrink-0 px-4 py-2.5 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-white text-[12px] font-semibold">
                {filter === "All" ? "All image slots" : `${filter} · Images`}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
                {loading ? "Loading…" : `${filtered.length} slot${filtered.length !== 1 ? "s" : ""}`}
              </p>
            </div>
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-2">
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader2 size={22} className="animate-spin" style={{ color: "#37B4B4" }} />
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-16 text-[13px]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  No image slots for this page.
                </div>
              ) : (
                filtered.map(slot => (
                  <SlotRow
                    key={slot.key}
                    slot={slot}
                    sharedWith={sharedMap[slot.path]?.filter(k => k !== slot.key) ?? []}
                    allSlots={slots}
                    onEdit={() => setActiveSlot(slot)}
                  />
                ))
              )}
            </div>
          </>)}

          {/* ── CONTENT tab ── */}
          {sidebarTab === "content" && (
            <div className="flex-1 overflow-y-auto py-3 px-3 space-y-4">

              {/* Case Studies */}
              <div>
                <p className="px-1 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Case Studies
                </p>
                <div className="space-y-1.5">
                  {caseStudies.map(cs => {
                    const hasEdits = Object.keys(contentCMS["case-studies"][cs.id] ?? {}).length > 0;
                    return (
                      <button
                        key={cs.id}
                        onClick={() => setActiveContent({ kind: "case-study", id: cs.id })}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-bold tracking-wide" style={{ background: "rgba(55,180,180,0.12)", color: "#37B4B4" }}>
                          {cs.clientInitials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[12px] font-medium truncate">{cs.client}</p>
                          <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{cs.industry}</p>
                        </div>
                        {hasEdits && (
                          <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: "#37B4B4" }} title="Has CMS edits" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Insights */}
              <div>
                <p className="px-1 mb-2 text-[10px] font-semibold uppercase tracking-widest" style={{ color: "rgba(255,255,255,0.3)" }}>
                  Insights / Articles
                </p>
                <div className="space-y-1.5">
                  {STATIC_INSIGHTS.map(article => {
                    const hasEdits = Object.keys(contentCMS.insights[article.slug] ?? {}).length > 0;
                    return (
                      <button
                        key={article.slug}
                        onClick={() => setActiveContent({ kind: "insight", slug: article.slug })}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors group"
                        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.06)" }}>
                          <BookOpen size={13} style={{ color: "rgba(255,255,255,0.4)" }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[12px] font-medium truncate leading-snug">{article.title}</p>
                          <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{article.category}</p>
                        </div>
                        {hasEdits && (
                          <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: "#37B4B4" }} title="Has CMS edits" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ── Shared slot picker (when clicked image maps to >1 slot) ── */}
      {sharedPick && (
        <SharedSlotPicker
          slots={sharedPick}
          onSelect={slot => { setSharedPick(null); setActiveSlot(slot); }}
          onClose={() => setSharedPick(null)}
        />
      )}

      {/* ── Image picker ── */}
      {activeSlot && (
        <ImagePickerDialog
          slot={activeSlot}
          sharedWith={sharedMap[activeSlot.path]?.filter(k => k !== activeSlot.key) ?? []}
          allSlots={slots}
          onClose={() => setActiveSlot(null)}
          onApply={handleApply}
        />
      )}

      {/* ── Content editor ── */}
      {activeContent && (
        <ContentEditorDialog
          item={activeContent}
          cmsData={
            activeContent.kind === "case-study"
              ? contentCMS["case-studies"]
              : contentCMS.insights
          }
          onClose={() => setActiveContent(null)}
          onSaved={(type, id, data) => {
            setContentCMS(prev => ({
              ...prev,
              [type]: { ...prev[type], [id]: data as Record<string, unknown> },
            }));
            invalidateCMSCache(); // bust the landing-page hook cache
            setTimeout(reload, 400); // refresh iframe
          }}
        />
      )}
    </div>
  );
}

/* ══════════════════════════ Slot row ══════════════════════════ */
function SlotRow({
  slot, sharedWith, allSlots, onEdit,
}: {
  slot: Slot; sharedWith: string[]; allSlots: Slot[]; onEdit: () => void;
}) {
  const partner = isPartner(slot.key);
  const isShared = sharedWith.length > 0;

  return (
    <div
      className="flex items-center gap-3 p-2.5 rounded-xl cursor-pointer group transition-all"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: isShared ? "1px solid rgba(251,191,36,0.2)" : "1px solid rgba(255,255,255,0.06)",
      }}
      onClick={onEdit}
    >
      {/* Thumbnail */}
      <div className="shrink-0 rounded-lg overflow-hidden" style={{ width: 72, height: 48, background: "#061818" }}>
        {slot.path
          ? <img src={slot.path} alt={slot.label} className="w-full h-full" style={{ objectFit: partner ? "contain" : "cover" }} />
          : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={16} style={{ color: "rgba(255,255,255,0.2)" }} /></div>
        }
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-white text-[12px] font-medium leading-tight truncate">{slot.section}</p>
        <p className="text-[11px] truncate mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>{slot.label}</p>

        {/* Shared badge */}
        {isShared && (
          <div
            className="mt-1 flex items-center gap-1"
            title={`Also used in: ${sharedWith.map(k => allSlots.find(s => s.key === k)?.label ?? k).join(", ")}`}
          >
            <AlertTriangle size={10} style={{ color: "#fbbf24" }} />
            <span className="text-[10px]" style={{ color: "#fbbf24" }}>
              Shared with {sharedWith.length} other slot{sharedWith.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>

      {/* Edit hover indicator */}
      <div
        className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ background: "rgba(55,180,180,0.15)", color: "#37B4B4" }}
      >
        <ImageIcon size={13} />
      </div>
    </div>
  );
}

/* ══════════════════════════ Shared slot picker ══════════════════════════ */
function SharedSlotPicker({ slots, onSelect, onClose }: {
  slots: Slot[]; onSelect: (s: Slot) => void; onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-sm rounded-2xl overflow-hidden"
        style={{ background: "#0E3E3E", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-white font-semibold text-[14px]">Shared image</p>
            <p className="text-[12px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
              This image is used in multiple slots. Which one do you want to change?
            </p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>
            <X size={14} />
          </button>
        </div>
        <div className="p-3 space-y-2">
          {slots.map(s => (
            <button
              key={s.key}
              onClick={() => onSelect(s)}
              className="w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors hover:bg-white/5"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="shrink-0 rounded-lg overflow-hidden" style={{ width: 56, height: 36, background: "#061818" }}>
                {s.path && <img src={s.path} alt="" className="w-full h-full object-cover" />}
              </div>
              <div className="min-w-0">
                <p className="text-white text-[13px] font-medium truncate">{s.section}</p>
                <p className="text-[11px] truncate" style={{ color: "rgba(255,255,255,0.45)" }}>{s.page} · {s.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ Image Picker ══════════════════════════ */
function ImagePickerDialog({
  slot, sharedWith, allSlots, onClose, onApply,
}: {
  slot: Slot; sharedWith: string[]; allSlots: Slot[];
  onClose: () => void; onApply: (key: string, path: string) => void;
}) {
  const [library,        setLibrary]        = useState<string[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(true);
  const [selected,       setSelected]       = useState(slot.path);
  const [uploading,      setUploading]      = useState(false);
  const [saving,         setSaving]         = useState(false);
  const [dragOver,       setDragOver]       = useState(false);
  const [editingPath,    setEditingPath]    = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/cms/library")
      .then(r => r.json())
      .then(d => setLibrary(d.images ?? []))
      .catch(() => toast.error("Failed to load library"))
      .finally(() => setLibraryLoading(false));
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res  = await fetch("/api/cms/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      setLibrary(prev => [data.path, ...prev]);
      setSelected(data.path);
      toast.success("Image uploaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, []);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }

  async function handleApply() {
    if (!selected) return;
    setSaving(true);
    try {
      const res = await fetch("/api/cms/images", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: slot.key, path: selected }),
      });
      if (!res.ok) throw new Error("Failed to save");
      toast.success("Image updated");
      onApply(slot.key, selected);
    } catch {
      toast.error("Failed to save image");
    } finally {
      setSaving(false);
    }
  }

  const partner = isPartner(slot.key);
  const isShared = sharedWith.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(8px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full sm:max-w-2xl max-h-[88vh] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden"
        style={{ background: "#0E3E3E", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b shrink-0" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-white font-semibold text-[15px]">Change Image</p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.45)" }}>
              {slot.page} · {slot.section} · {slot.label}
            </p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}>
            <X size={15} />
          </button>
        </div>

        {/* Shared warning */}
        {isShared && (
          <div
            className="shrink-0 flex items-start gap-2.5 px-5 py-3 border-b"
            style={{ background: "rgba(251,191,36,0.07)", borderColor: "rgba(251,191,36,0.15)" }}
          >
            <AlertTriangle size={14} className="shrink-0 mt-0.5" style={{ color: "#fbbf24" }} />
            <p className="text-[12px] leading-relaxed" style={{ color: "#fbbf24" }}>
              <strong>Shared image.</strong> This image is also used in{" "}
              {sharedWith
                .map(k => allSlots.find(s => s.key === k))
                .filter(Boolean)
                .map(s => `${s!.section} · ${s!.label}`)
                .join(", ")}.
              {" "}Only this slot will be changed.
            </p>
          </div>
        )}

        {/* Before / After */}
        <div
          className="shrink-0 flex gap-3 px-5 py-3 border-b"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(0,0,0,0.12)" }}
        >
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "rgba(255,255,255,0.3)" }}>Current</p>
            <div className="rounded-lg overflow-hidden" style={{ aspectRatio: "16/9", background: "#061818" }}>
              <img src={slot.path} alt="Current" className="w-full h-full" style={{ objectFit: partner ? "contain" : "cover" }} />
            </div>
          </div>
          <div className="w-px" style={{ background: "rgba(255,255,255,0.07)" }} />
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-widest mb-1.5" style={{ color: "#37B4B4" }}>New selection</p>
            <div
              className="rounded-lg overflow-hidden"
              style={{
                aspectRatio: "16/9",
                background: "#061818",
                border: selected !== slot.path ? "1.5px solid #37B4B4" : "1.5px solid transparent",
              }}
            >
              {selected
                ? <img src={selected} alt="Selected" className="w-full h-full" style={{ objectFit: partner ? "contain" : "cover" }} />
                : <div className="w-full h-full flex items-center justify-center"><ImageIcon size={18} style={{ color: "rgba(255,255,255,0.2)" }} /></div>
              }
            </div>
            {selected && (
              <button
                onClick={() => setEditingPath(selected)}
                className="mt-1.5 w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors"
                style={{ background: "rgba(55,180,180,0.1)", color: "#37B4B4", border: "1px solid rgba(55,180,180,0.2)" }}
              >
                <Pencil size={11} strokeWidth={2} />
                Edit in editor
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          {/* Upload zone */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              Upload New
            </p>
            <div
              role="button"
              tabIndex={0}
              onClick={() => fileRef.current?.click()}
              onKeyDown={e => { if (e.key === "Enter") fileRef.current?.click(); }}
              onDragOver={e => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className="rounded-xl border-2 border-dashed flex flex-col items-center justify-center py-7 cursor-pointer transition-all"
              style={{
                borderColor: dragOver ? "#37B4B4" : "rgba(255,255,255,0.1)",
                background:  dragOver ? "rgba(55,180,180,0.06)" : "transparent",
              }}
            >
              {uploading
                ? <Loader2 size={22} className="animate-spin" style={{ color: "#37B4B4" }} />
                : <>
                    <Upload size={20} style={{ color: "rgba(255,255,255,0.3)" }} />
                    <p className="mt-2 text-[13px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                      Drop here or <span style={{ color: "#37B4B4" }}>click to browse</span>
                    </p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.25)" }}>JPG, PNG, WebP, GIF, SVG</p>
                  </>
              }
            </div>
            <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png,.webp,.gif,.svg" className="hidden" onChange={handleFileInput} />
          </div>

          {/* Library */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-2" style={{ color: "rgba(255,255,255,0.4)" }}>
              Pick from Library
            </p>
            {libraryLoading
              ? <div className="flex justify-center py-6"><Loader2 size={18} className="animate-spin" style={{ color: "#37B4B4" }} /></div>
              : library.length === 0
                ? <p className="text-center py-4 text-[13px]" style={{ color: "rgba(255,255,255,0.3)" }}>No images yet.</p>
                : (
                  <div className="grid grid-cols-4 gap-2">
                    {library.map(img => {
                      const isSel      = selected === img;
                      const isPartnerImg = img.startsWith("/partners/");
                      return (
                        <button
                          key={img}
                          onClick={() => setSelected(img)}
                          className="relative rounded-lg overflow-hidden transition-all"
                          style={{
                            aspectRatio: "16/9",
                            background:  "#061818",
                            outline:     isSel ? "2px solid #37B4B4" : "2px solid transparent",
                            outlineOffset: "1px",
                          }}
                        >
                          <img src={img} alt="" className="w-full h-full" style={{ objectFit: isPartnerImg ? "contain" : "cover" }} />
                          {isSel && (
                            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(55,180,180,0.2)" }}>
                              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: "#37B4B4" }}>
                                <Check size={12} color="#082121" strokeWidth={3} />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )
            }
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <p className="text-[10px] truncate" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "monospace", maxWidth: 200 }}>
            {selected || "No image selected"}
          </p>
          <div className="flex gap-2 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[13px] font-medium"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.55)" }}
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!selected || saving || selected === slot.path}
              className="px-5 py-2 rounded-lg text-[13px] font-semibold disabled:opacity-40"
              style={{ background: "#37B4B4", color: "#082121" }}
            >
              {saving
                ? <span className="flex items-center gap-1.5"><Loader2 size={12} className="animate-spin" /> Saving…</span>
                : "Apply"
              }
            </button>
          </div>
        </div>
      </div>

      {/* ── Image Editor (Figma-like) ── */}
      {editingPath && (
        <ImageEditorDialog
          imagePath={editingPath}
          onSave={(newPath: string) => {
            setLibrary(prev => [newPath, ...prev.filter(p => p !== newPath)]);
            setSelected(newPath);
            setEditingPath(null);
            toast.success("Image saved");
          }}
          onClose={() => setEditingPath(null)}
        />
      )}
    </div>
  );
}
