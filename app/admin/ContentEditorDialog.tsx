"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { X, Save, Loader2, Plus, Trash2, ExternalLink } from "lucide-react";
import { caseStudies } from "@/data/case-studies";

/* ─────────────────── Static insight definitions ─────────────────── */
export const STATIC_INSIGHTS = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    category: "Strategy",
    title: "Why Most Business Problems Are Misdiagnosed",
    author: "Mark Wood",
    authorRole: "Senior Strategy Consultant",
    date: "January 2026",
    excerpt: "The cost of getting the diagnosis wrong is too high. Here's how we approach discovery.",
    content: `<p>Most business failures don't stem from poor execution. They stem from solving the wrong problem.</p>\n\n<h3>The Diagnosis Trap</h3>\n<p>Under pressure to act quickly, leadership teams often accept the first plausible explanation for their challenges.</p>\n\n<h3>Structured Discovery Works</h3>\n<p>At AK Prime, we start every engagement with a rigorous diagnostic phase before recommending solutions.</p>`,
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    category: "Operations",
    title: "The Real Cost of Poor Decision-Making for Business",
    author: "Hanry Mandu",
    authorRole: "Operations Lead",
    date: "January 2026",
    excerpt: "How informational gaps cascade into operational failures. And how to fix it.",
    content: `<p>Every strategic decision is made on incomplete information. The challenge is building sufficient rigour into decision-making.</p>\n\n<h3>The Decision-Making Framework</h3>\n<p>Poor decisions happen when the right stakeholders aren't in the room, relevant data isn't synthesized, or implementation plans lack clarity.</p>`,
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    category: "Leadership",
    title: "When Founders Should Seek External Perspective",
    author: "Andy Milan",
    authorRole: "Advisory Partner",
    date: "January 2026",
    excerpt: "The moments when fresh, external eyes unlock breakthrough clarity.",
    content: `<p>Founders live inside their company. This insider perspective is invaluable, but it's also a liability at moments of inflection.</p>\n\n<h3>The Right Moments</h3>\n<p>Consider external counsel when scaling, entering new markets, facing operational bottlenecks, or sensing strategic misalignment.</p>`,
  },
];

/* ─────────────────── Types ─────────────────── */
type CaseStudyEdit = {
  title: string; tagline: string; summary: string; duration: string; image: string;
  metrics: { value: string; label: string }[];
  narrative_problem: string; narrative_outcome: string;
  testimonial_quote: string; testimonial_name: string; testimonial_role: string;
  approach: { title: string; description: string; points: string[] }[];
};

type InsightEdit = {
  title: string; category: string; author: string; authorRole: string;
  date: string; excerpt: string; content: string;
};

export type ContentItem =
  | { kind: "case-study"; id: string }
  | { kind: "insight";    slug: string };

/* ─────────────────── Style helpers ─────────────────── */
const IS: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8, color: "#fff", fontSize: 13,
  padding: "8px 12px", width: "100%", outline: "none",
  fontFamily: "inherit", resize: "vertical" as const,
};
const LS: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 600,
  letterSpacing: "0.08em", textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.4)", marginBottom: 6,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label style={LS}>{label}</label>{children}</div>;
}

/* ─────────────────── Case Study Editor ─────────────────── */
type CSTab = "overview" | "story" | "metrics" | "approach" | "testimonial";

function CaseStudyEditor({
  study, initial, onSave, saving,
}: {
  study: (typeof caseStudies)[0];
  initial: CaseStudyEdit;
  onSave: (d: CaseStudyEdit) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<CaseStudyEdit>(initial);
  const [tab, setTab] = useState<CSTab>("overview");
  useEffect(() => { setForm(initial); setTab("overview"); }, [study.id]);
  const dirty = JSON.stringify(form) !== JSON.stringify(initial);
  const set = (k: keyof CaseStudyEdit, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  const TABS: { key: CSTab; label: string }[] = [
    { key: "overview", label: "Overview" }, { key: "story", label: "Story" },
    { key: "metrics", label: "Metrics" }, { key: "approach", label: "Approach" },
    { key: "testimonial", label: "Testimonial" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="shrink-0 flex gap-0.5 px-5 pt-4">
        {TABS.map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className="px-3 py-1.5 rounded-t-lg text-[12px] font-medium transition-colors"
            style={tab === t.key
              ? { background: "rgba(55,180,180,0.15)", color: "#37B4B4", borderBottom: "2px solid #37B4B4" }
              : { color: "rgba(255,255,255,0.4)" }}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="mx-5" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {tab === "overview" && (<>
          <Field label="Title"><input style={IS} value={form.title} onChange={e => set("title", e.target.value)} placeholder="Case study title" /></Field>
          <Field label="Tagline"><input style={IS} value={form.tagline} onChange={e => set("tagline", e.target.value)} placeholder="One-line result statement" /></Field>
          <Field label="Summary"><textarea style={{ ...IS, minHeight: 80 }} value={form.summary} onChange={e => set("summary", e.target.value)} placeholder="2–3 sentence summary shown on listing card" /></Field>
          <Field label="Image"><input style={IS} value={form.image} onChange={e => set("image", e.target.value)} placeholder="/images/case-study-image.jpg" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Duration"><input style={IS} value={form.duration} onChange={e => set("duration", e.target.value)} placeholder="e.g. 3 months" /></Field>
            <Field label="Client"><input style={{ ...IS, opacity: 0.45, cursor: "not-allowed" }} value={study.client} readOnly /></Field>
          </div>
        </>)}

        {tab === "story" && (<>
          <Field label="Problem / Challenge">
            <textarea style={{ ...IS, minHeight: 150 }} value={form.narrative_problem} onChange={e => set("narrative_problem", e.target.value)} placeholder="Describe the client's situation before engaging AK Prime" />
          </Field>
          <Field label="Outcome">
            <textarea style={{ ...IS, minHeight: 150 }} value={form.narrative_outcome} onChange={e => set("narrative_outcome", e.target.value)} placeholder="Results and impact after the engagement" />
          </Field>
        </>)}

        {tab === "metrics" && (<>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Up to 4 key results shown on the case study page.</p>
          <div className="space-y-3">
            {form.metrics.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <input style={IS} value={m.value} onChange={e => { const n = form.metrics.map((x, j) => j === i ? { ...x, value: e.target.value } : x); set("metrics", n); }} placeholder="Value (e.g. KSh 8.5M)" />
                  <input style={IS} value={m.label} onChange={e => { const n = form.metrics.map((x, j) => j === i ? { ...x, label: e.target.value } : x); set("metrics", n); }} placeholder="Label (e.g. Recovered)" />
                </div>
                <button onClick={() => set("metrics", form.metrics.filter((_, j) => j !== i))} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}><Trash2 size={13} /></button>
              </div>
            ))}
          </div>
          {form.metrics.length < 4 && (
            <button onClick={() => set("metrics", [...form.metrics, { value: "", label: "" }])} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium" style={{ background: "rgba(55,180,180,0.1)", color: "#37B4B4", border: "1px dashed rgba(55,180,180,0.3)" }}>
              <Plus size={13} /> Add metric
            </button>
          )}
        </>)}

        {tab === "approach" && (<>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Phases shown in the "How we did it" section.</p>
          <div className="space-y-5">
            {form.approach.map((phase, pi) => (
              <div key={pi} className="rounded-xl p-4 space-y-3" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="flex items-center justify-between">
                  <span style={{ fontSize: 11, fontWeight: 600, color: "#37B4B4", letterSpacing: "0.08em", textTransform: "uppercase" }}>Phase {pi + 1}</span>
                  {form.approach.length > 1 && (
                    <button onClick={() => set("approach", form.approach.filter((_, j) => j !== pi))} className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors" style={{ color: "rgba(255,255,255,0.3)" }}><Trash2 size={12} /></button>
                  )}
                </div>
                <Field label="Phase Title"><input style={IS} value={phase.title} onChange={e => { const n = form.approach.map((a, j) => j === pi ? { ...a, title: e.target.value } : a); set("approach", n); }} /></Field>
                <Field label="Description"><input style={IS} value={phase.description} onChange={e => { const n = form.approach.map((a, j) => j === pi ? { ...a, description: e.target.value } : a); set("approach", n); }} /></Field>
                <div>
                  <label style={LS}>Bullet Points</label>
                  <div className="space-y-2">
                    {phase.points.map((pt, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <span style={{ color: "#37B4B4", fontSize: 16, lineHeight: "34px", flexShrink: 0 }}>·</span>
                        <input style={{ ...IS, flex: 1 }} value={pt} onChange={e => { const n = form.approach.map((a, ai) => ai === pi ? { ...a, points: a.points.map((p, k) => k === j ? e.target.value : p) } : a); set("approach", n); }} />
                        {phase.points.length > 1 && (
                          <button onClick={() => { const n = form.approach.map((a, ai) => ai === pi ? { ...a, points: a.points.filter((_, k) => k !== j) } : a); set("approach", n); }} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors" style={{ color: "rgba(255,255,255,0.25)" }}><Trash2 size={12} /></button>
                        )}
                      </div>
                    ))}
                    <button onClick={() => { const n = form.approach.map((a, ai) => ai === pi ? { ...a, points: [...a.points, ""] } : a); set("approach", n); }} className="text-[11px] flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors" style={{ color: "rgba(55,180,180,0.7)", background: "rgba(55,180,180,0.06)" }}>
                      <Plus size={11} /> Add point
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => set("approach", [...form.approach, { title: "", description: "", points: [""] }])} className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium" style={{ background: "rgba(55,180,180,0.1)", color: "#37B4B4", border: "1px dashed rgba(55,180,180,0.3)" }}>
            <Plus size={13} /> Add phase
          </button>
        </>)}

        {tab === "testimonial" && (<>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Name"><input style={IS} value={form.testimonial_name} onChange={e => set("testimonial_name", e.target.value)} placeholder="e.g. Station Manager" /></Field>
            <Field label="Role / Company"><input style={IS} value={form.testimonial_role} onChange={e => set("testimonial_role", e.target.value)} placeholder="e.g. MO Radio 88.2FM" /></Field>
          </div>
          <Field label="Quote">
            <textarea style={{ ...IS, minHeight: 160 }} value={form.testimonial_quote} onChange={e => set("testimonial_quote", e.target.value)} placeholder="Client quote (no quotation marks)" />
          </Field>
          <div className="rounded-xl p-3" style={{ background: "rgba(55,180,180,0.05)", border: "1px solid rgba(55,180,180,0.15)" }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>Tip: specific outcomes ("went from 8 days to 2 days") are more compelling than vague praise.</p>
          </div>
        </>)}
      </div>

      {/* Footer */}
      <div className="shrink-0 flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 11, color: dirty ? "#37B4B4" : "rgba(255,255,255,0.25)" }}>{dirty ? "Unsaved changes" : "No changes"}</p>
        <div className="flex gap-2">
          {dirty && <button onClick={() => setForm(initial)} className="px-4 py-2 rounded-lg text-[12px] font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>Discard</button>}
          <button onClick={() => onSave(form)} disabled={!dirty || saving} className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold disabled:opacity-40" style={{ background: "#37B4B4", color: "#082121" }}>
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────── Insight Editor ─────────────────── */
type INTab = "meta" | "content";

function InsightEditor({
  article, initial, onSave, saving,
}: {
  article: (typeof STATIC_INSIGHTS)[0];
  initial: InsightEdit;
  onSave: (d: InsightEdit) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<InsightEdit>(initial);
  const [tab, setTab] = useState<INTab>("meta");
  useEffect(() => { setForm(initial); setTab("meta"); }, [article.slug]);
  const dirty = JSON.stringify(form) !== JSON.stringify(initial);
  const set = (k: keyof InsightEdit, v: string) => setForm(p => ({ ...p, [k]: v }));

  return (
    <div className="flex flex-col h-full">
      <div className="shrink-0 flex gap-0.5 px-5 pt-4">
        {(["meta", "content"] as INTab[]).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className="px-3 py-1.5 rounded-t-lg text-[12px] font-medium transition-colors capitalize"
            style={tab === t ? { background: "rgba(55,180,180,0.15)", color: "#37B4B4", borderBottom: "2px solid #37B4B4" } : { color: "rgba(255,255,255,0.4)" }}>
            {t}
          </button>
        ))}
      </div>
      <div className="mx-5" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {tab === "meta" && (<>
          <Field label="Title"><input style={IS} value={form.title} onChange={e => set("title", e.target.value)} /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category"><input style={IS} value={form.category} onChange={e => set("category", e.target.value)} placeholder="e.g. Strategy" /></Field>
            <Field label="Date"><input style={IS} value={form.date} onChange={e => set("date", e.target.value)} placeholder="e.g. January 2026" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Author"><input style={IS} value={form.author} onChange={e => set("author", e.target.value)} /></Field>
            <Field label="Author Role"><input style={IS} value={form.authorRole} onChange={e => set("authorRole", e.target.value)} /></Field>
          </div>
          <Field label="Excerpt"><textarea style={{ ...IS, minHeight: 80 }} value={form.excerpt} onChange={e => set("excerpt", e.target.value)} placeholder="1–2 sentence preview shown on listing cards" /></Field>
        </>)}

        {tab === "content" && (<>
          <div className="rounded-xl px-4 py-3" style={{ background: "rgba(55,180,180,0.05)", border: "1px solid rgba(55,180,180,0.15)" }}>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              Supports basic HTML: <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: 4 }}>&lt;p&gt;</code> for paragraphs, <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: 4 }}>&lt;h3&gt;</code> for subheadings.
            </p>
          </div>
          <Field label="Body">
            <textarea style={{ ...IS, minHeight: 420, fontFamily: "monospace", fontSize: 12 }} value={form.content} onChange={e => set("content", e.target.value)} />
          </Field>
        </>)}
      </div>

      <div className="shrink-0 flex items-center justify-between px-5 py-4 border-t" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p style={{ fontSize: 11, color: dirty ? "#37B4B4" : "rgba(255,255,255,0.25)" }}>{dirty ? "Unsaved changes" : "No changes"}</p>
        <div className="flex gap-2">
          {dirty && <button onClick={() => setForm(initial)} className="px-4 py-2 rounded-lg text-[12px] font-medium" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}>Discard</button>}
          <button onClick={() => onSave(form)} disabled={!dirty || saving} className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold disabled:opacity-40" style={{ background: "#37B4B4", color: "#082121" }}>
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   ContentEditorDialog — the outer modal shell
══════════════════════════════════════════════════════════════════ */
export function ContentEditorDialog({
  item,
  cmsData,
  onClose,
  onSaved,
}: {
  item: ContentItem;
  cmsData: Record<string, Record<string, unknown>>;
  onClose: () => void;
  onSaved: (type: "case-studies" | "insights", id: string, data: unknown) => void;
}) {
  const [saving, setSaving] = useState(false);

  /* Narrow once at top — needed in both the if-blocks and JSX */
  const csId   = item.kind === "case-study" ? item.id   : null;
  const inSlug = item.kind === "insight"    ? item.slug : null;

  /* ── Build initial merged data for the selected item ── */
  let previewHref = "/";
  let editorNode: React.ReactNode = null;

  if (item.kind === "case-study" && csId) {
    const study = caseStudies.find(s => s.id === csId)!;
    if (!study) return null;
    previewHref = `/case-studies/${study.id}`;

    const ov = (cmsData[csId] ?? {}) as Partial<CaseStudyEdit>;
    const initial: CaseStudyEdit = {
      title:             ov.title             ?? study.title,
      tagline:           ov.tagline           ?? study.tagline,
      summary:           ov.summary           ?? study.summary,
      duration:          ov.duration          ?? study.duration,
      image:             ov.image             ?? study.image,
      metrics:           ov.metrics           ?? study.metrics.map(m => ({ value: m.value, label: m.label })),
      narrative_problem: ov.narrative_problem ?? study.narrative.problem,
      narrative_outcome: ov.narrative_outcome ?? study.narrative.outcome,
      testimonial_quote: ov.testimonial_quote ?? study.testimonial.quote,
      testimonial_name:  ov.testimonial_name  ?? study.testimonial.name,
      testimonial_role:  ov.testimonial_role  ?? study.testimonial.role,
      approach:          ov.approach          ?? study.narrative.approach.map(a => ({
        title: a.title, description: a.description, points: [...a.points],
      })),
    };

    async function saveCS(data: CaseStudyEdit) {
      setSaving(true);
      try {
        const res = await fetch("/api/cms/content", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "case-studies", id: csId!, data }),
        });
        if (!res.ok) throw new Error();
        onSaved("case-studies", csId!, data);
        toast.success("Case study saved");
      } catch {
        toast.error("Failed to save");
      } finally {
        setSaving(false);
      }
    }

    editorNode = <CaseStudyEditor study={study} initial={initial} onSave={saveCS} saving={saving} />;
  }

  if (item.kind === "insight" && inSlug) {
    const article = STATIC_INSIGHTS.find(a => a.slug === inSlug)!;
    if (!article) return null;
    previewHref = `/insights/${article.slug}`;

    const ov = (cmsData[inSlug] ?? {}) as Partial<InsightEdit>;
    const initial: InsightEdit = {
      title:      ov.title      ?? article.title,
      category:   ov.category   ?? article.category,
      author:     ov.author     ?? article.author,
      authorRole: ov.authorRole ?? article.authorRole,
      date:       ov.date       ?? article.date,
      excerpt:    ov.excerpt    ?? article.excerpt,
      content:    ov.content    ?? article.content,
    };

    async function saveIN(data: InsightEdit) {
      setSaving(true);
      try {
        const res = await fetch("/api/cms/content", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "insights", id: inSlug!, data }),
        });
        if (!res.ok) throw new Error();
        onSaved("insights", inSlug!, data);
        toast.success("Insight saved");
      } catch {
        toast.error("Failed to save");
      } finally {
        setSaving(false);
      }
    }

    editorNode = <InsightEditor article={article} initial={initial} onSave={saveIN} saving={saving} />;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full max-w-2xl h-[85vh] flex flex-col rounded-2xl overflow-hidden"
        style={{ background: "#0E3E3E", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Modal header */}
        <div className="shrink-0 flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
          <div>
            <p className="text-white font-semibold text-[15px]">
              {item.kind === "case-study" ? "Edit Case Study" : "Edit Insight"}
            </p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
              {item.kind === "case-study" && csId
                ? caseStudies.find(s => s.id === csId)?.client
                : item.kind === "insight" && inSlug
                  ? STATIC_INSIGHTS.find(a => a.slug === inSlug)?.title
                  : null}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={previewHref}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            >
              <ExternalLink size={12} /> Preview
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Editor body */}
        <div className="flex-1 overflow-hidden">
          {editorNode}
        </div>
      </div>
    </div>
  );
}
