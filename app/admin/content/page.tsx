"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { caseStudies } from "@/data/case-studies";
import {
  FileText, LogOut, Loader2, Save, Plus, Trash2,
  ChevronRight, BookOpen, RefreshCw, ArrowUpRight,
} from "lucide-react";

/* ─────────────────── Types ─────────────────── */
type Tab = "case-studies" | "insights";

type CaseStudyEdit = {
  title: string;
  tagline: string;
  summary: string;
  duration: string;
  metrics: { value: string; label: string }[];
  narrative_problem: string;
  narrative_outcome: string;
  testimonial_quote: string;
  testimonial_name: string;
  testimonial_role: string;
  approach: { title: string; description: string; points: string[] }[];
};

type InsightEdit = {
  title: string;
  category: string;
  author: string;
  authorRole: string;
  date: string;
  excerpt: string;
  content: string;
};

type CMSData = {
  "case-studies": Record<string, Partial<CaseStudyEdit>>;
  insights: Record<string, Partial<InsightEdit>>;
};

/* ─────────────────── Static data ─────────────────── */
const STATIC_INSIGHTS = [
  {
    slug: "why-most-business-problems-are-misdiagnosed",
    category: "Strategy",
    title: "Why Most Business Problems Are Misdiagnosed",
    author: "Mark Wood",
    authorRole: "Senior Strategy Consultant",
    date: "January 2026",
    excerpt: "The cost of getting the diagnosis wrong is too high. Here's how we approach discovery.",
    content: `<p>Most business failures don't stem from poor execution. They stem from solving the wrong problem. A company rushes to implement new ERP software when the real issue is unclear business processes. A CFO cuts costs across the board when the problem is actually a revenue concentration risk.</p>

<h3>The Diagnosis Trap</h3>
<p>Under pressure to act quickly, leadership teams often accept the first plausible explanation for their challenges. The problem is that surface-level problems are often symptoms of deeper, systemic issues.</p>

<h3>The Cost of Getting It Wrong</h3>
<p>A misdiagnosed problem leads to wasted capital, opportunity cost, and demoralised teams.</p>

<h3>Structured Discovery Works</h3>
<p>At AK Prime, we start every engagement with a rigorous diagnostic phase. We interview stakeholders across the business, map current workflows, identify gaps between intended and actual performance, and build a clear diagnostic report before recommending solutions.</p>

<p>Getting the diagnosis right is the foundation for every successful transformation.</p>`,
  },
  {
    slug: "the-real-cost-of-poor-decision-making",
    category: "Operations",
    title: "The Real Cost of Poor Decision-Making for Business",
    author: "Hanry Mandu",
    authorRole: "Operations Lead",
    date: "January 2026",
    excerpt: "How informational gaps cascade into operational failures. And how to fix it.",
    content: `<p>Every strategic decision — whether it's entering a new market, scaling operations, or restructuring the organisation — is made on incomplete information. The challenge isn't eliminating uncertainty; it's building sufficient rigour into decision-making so that when things do go wrong, the downside is minimised.</p>

<h3>The Decision-Making Framework</h3>
<p>Poor decisions happen when: (1) the right stakeholders aren't in the room; (2) the relevant data isn't synthesized; (3) alternative scenarios aren't tested; or (4) implementation plans lack clarity on ownership and accountability.</p>

<h3>The Compounding Effect</h3>
<p>A poor decision made by a CFO in Q1 cascades through operational priorities, capital deployment, and team morale for the entire year.</p>

<h3>Building Decision-Making Discipline</h3>
<p>At AK Prime, we help organisations design decision-making governance that delivers clarity without bureaucracy.</p>`,
  },
  {
    slug: "when-founders-should-seek-external-perspective",
    category: "Leadership",
    title: "When Founders Should Seek External Perspective",
    author: "Andy Milan",
    authorRole: "Advisory Partner",
    date: "January 2026",
    excerpt: "The moments when fresh, external eyes unlock breakthrough clarity.",
    content: `<p>Founders live inside their company. They see problems through the lens of existing constraints, past decisions, and internal politics. This insider perspective is invaluable, but it's also a liability when the business reaches moments of inflection.</p>

<h3>The Limits of Internal Perspective</h3>
<p>A founder knows their business better than anyone. But that same intimacy can create blind spots. Processes that feel efficient internally might appear as unnecessary friction to someone seeing them for the first time.</p>

<h3>The Right Moments to Seek External Perspective</h3>
<p>You should consider external counsel when: you're scaling to a new order of magnitude; you're entering a new market; you're facing a significant operational bottleneck; or you're sensing that the team lacks consensus on strategic direction.</p>

<h3>What External Advisors Bring</h3>
<p>The best external advisors don't tell you what to do. They hold up a mirror. The most successful founders we work with view external advisors not as a sign of weakness, but as a competitive advantage.</p>`,
  },
];

/* ─────────────────── Merge helpers ─────────────────── */
function mergeCaseStudy(
  study: (typeof caseStudies)[0],
  overrides: Partial<CaseStudyEdit>
): CaseStudyEdit {
  return {
    title:              overrides.title              ?? study.title,
    tagline:            overrides.tagline            ?? study.tagline,
    summary:            overrides.summary            ?? study.summary,
    duration:           overrides.duration           ?? study.duration,
    metrics:            overrides.metrics            ?? study.metrics.map(m => ({ value: m.value, label: m.label })),
    narrative_problem:  overrides.narrative_problem  ?? study.narrative.problem,
    narrative_outcome:  overrides.narrative_outcome  ?? study.narrative.outcome,
    testimonial_quote:  overrides.testimonial_quote  ?? study.testimonial.quote,
    testimonial_name:   overrides.testimonial_name   ?? study.testimonial.name,
    testimonial_role:   overrides.testimonial_role   ?? study.testimonial.role,
    approach:           overrides.approach           ?? study.narrative.approach.map(a => ({
      title: a.title,
      description: a.description,
      points: [...a.points],
    })),
  };
}

function mergeInsight(
  article: (typeof STATIC_INSIGHTS)[0],
  overrides: Partial<InsightEdit>
): InsightEdit {
  return {
    title:      overrides.title      ?? article.title,
    category:   overrides.category   ?? article.category,
    author:     overrides.author     ?? article.author,
    authorRole: overrides.authorRole ?? article.authorRole,
    date:       overrides.date       ?? article.date,
    excerpt:    overrides.excerpt    ?? article.excerpt,
    content:    overrides.content    ?? article.content,
  };
}

/* ─────────────────── Sub-components ─────────────────── */
const INPUT_STYLE = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 8,
  color: "#fff",
  fontSize: 13,
  padding: "8px 12px",
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
  resize: "vertical" as const,
};

const LABEL_STYLE = {
  display: "block",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.4)",
  marginBottom: 6,
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

/* ─── Case Study editor tabs ─── */
type CSEditorTab = "overview" | "story" | "metrics" | "approach" | "testimonial";

function CaseStudyEditor({
  study,
  initial,
  onSave,
  saving,
}: {
  study: (typeof caseStudies)[0];
  initial: CaseStudyEdit;
  onSave: (data: CaseStudyEdit) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<CaseStudyEdit>(initial);
  const [editorTab, setEditorTab] = useState<CSEditorTab>("overview");

  // reset form when item changes
  useEffect(() => { setForm(initial); }, [study.id]);

  const dirty = JSON.stringify(form) !== JSON.stringify(initial);

  function set(key: keyof CaseStudyEdit, value: unknown) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function setMetric(i: number, field: "value" | "label", val: string) {
    const next = form.metrics.map((m, idx) => idx === i ? { ...m, [field]: val } : m);
    set("metrics", next);
  }

  function addMetric() {
    set("metrics", [...form.metrics, { value: "", label: "" }]);
  }

  function removeMetric(i: number) {
    set("metrics", form.metrics.filter((_, idx) => idx !== i));
  }

  function setApproach(phaseIdx: number, field: string, value: unknown) {
    const next = form.approach.map((a, i) =>
      i === phaseIdx ? { ...a, [field]: value } : a
    );
    set("approach", next);
  }

  function setApproachPoint(phaseIdx: number, ptIdx: number, val: string) {
    const next = form.approach.map((a, i) => {
      if (i !== phaseIdx) return a;
      const pts = a.points.map((p, j) => j === ptIdx ? val : p);
      return { ...a, points: pts };
    });
    set("approach", next);
  }

  function addApproachPoint(phaseIdx: number) {
    const next = form.approach.map((a, i) =>
      i === phaseIdx ? { ...a, points: [...a.points, ""] } : a
    );
    set("approach", next);
  }

  function removeApproachPoint(phaseIdx: number, ptIdx: number) {
    const next = form.approach.map((a, i) =>
      i === phaseIdx ? { ...a, points: a.points.filter((_, j) => j !== ptIdx) } : a
    );
    set("approach", next);
  }

  function addApproachPhase() {
    set("approach", [...form.approach, { title: "", description: "", points: [""] }]);
  }

  function removeApproachPhase(i: number) {
    set("approach", form.approach.filter((_, idx) => idx !== i));
  }

  const TABS: { key: CSEditorTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "story", label: "Story" },
    { key: "metrics", label: "Metrics" },
    { key: "approach", label: "Approach" },
    { key: "testimonial", label: "Testimonial" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="shrink-0 flex gap-0.5 px-5 pt-4 pb-0">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setEditorTab(t.key)}
            className="px-3 py-1.5 rounded-t-lg text-[12px] font-medium transition-colors"
            style={editorTab === t.key
              ? { background: "rgba(55,180,180,0.15)", color: "#37B4B4", borderBottom: "2px solid #37B4B4" }
              : { color: "rgba(255,255,255,0.4)" }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mx-5 mb-0" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

        {/* OVERVIEW */}
        {editorTab === "overview" && (
          <>
            <Field label="Title">
              <input
                style={INPUT_STYLE}
                value={form.title}
                onChange={e => set("title", e.target.value)}
                placeholder="Case study title"
              />
            </Field>
            <Field label="Tagline">
              <input
                style={INPUT_STYLE}
                value={form.tagline}
                onChange={e => set("tagline", e.target.value)}
                placeholder="One-line result statement"
              />
            </Field>
            <Field label="Summary">
              <textarea
                style={{ ...INPUT_STYLE, minHeight: 80 }}
                value={form.summary}
                onChange={e => set("summary", e.target.value)}
                placeholder="2–3 sentence summary shown on the listing card"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Duration">
                <input
                  style={INPUT_STYLE}
                  value={form.duration}
                  onChange={e => set("duration", e.target.value)}
                  placeholder="e.g. 3 months"
                />
              </Field>
              <Field label="Client">
                <input
                  style={{ ...INPUT_STYLE, opacity: 0.5, cursor: "not-allowed" }}
                  value={study.client}
                  readOnly
                  title="Client name is managed in the data file"
                />
              </Field>
            </div>
            <Field label="Location">
              <input
                style={{ ...INPUT_STYLE, opacity: 0.5, cursor: "not-allowed" }}
                value={study.location}
                readOnly
                title="Location is managed in the data file"
              />
            </Field>
          </>
        )}

        {/* STORY */}
        {editorTab === "story" && (
          <>
            <Field label="Problem / Challenge">
              <textarea
                style={{ ...INPUT_STYLE, minHeight: 140 }}
                value={form.narrative_problem}
                onChange={e => set("narrative_problem", e.target.value)}
                placeholder="Describe the client's situation and the problems they faced before engaging AK Prime"
              />
            </Field>
            <Field label="Outcome">
              <textarea
                style={{ ...INPUT_STYLE, minHeight: 140 }}
                value={form.narrative_outcome}
                onChange={e => set("narrative_outcome", e.target.value)}
                placeholder="Describe the results and impact after the engagement"
              />
            </Field>
          </>
        )}

        {/* METRICS */}
        {editorTab === "metrics" && (
          <>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>
              Up to 4 key results shown prominently on the case study page.
            </p>
            <div className="space-y-3">
              {form.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <input
                      style={INPUT_STYLE}
                      value={m.value}
                      onChange={e => setMetric(i, "value", e.target.value)}
                      placeholder="Value (e.g. KSh 8.5M)"
                    />
                    <input
                      style={INPUT_STYLE}
                      value={m.label}
                      onChange={e => setMetric(i, "label", e.target.value)}
                      placeholder="Label (e.g. Recovered)"
                    />
                  </div>
                  <button
                    onClick={() => removeMetric(i)}
                    className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
            {form.metrics.length < 4 && (
              <button
                onClick={addMetric}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
                style={{ background: "rgba(55,180,180,0.1)", color: "#37B4B4", border: "1px dashed rgba(55,180,180,0.3)" }}
              >
                <Plus size={13} /> Add metric
              </button>
            )}
          </>
        )}

        {/* APPROACH */}
        {editorTab === "approach" && (
          <>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>
              Each phase shows in the &ldquo;How we did it&rdquo; section with title, description, and bullet points.
            </p>
            <div className="space-y-6">
              {form.approach.map((phase, pi) => (
                <div
                  key={pi}
                  className="rounded-xl p-4 space-y-3"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#37B4B4", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                      Phase {pi + 1}
                    </span>
                    {form.approach.length > 1 && (
                      <button
                        onClick={() => removeApproachPhase(pi)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        <Trash2 size={12} />
                      </button>
                    )}
                  </div>
                  <Field label="Phase Title">
                    <input
                      style={INPUT_STYLE}
                      value={phase.title}
                      onChange={e => setApproach(pi, "title", e.target.value)}
                      placeholder="e.g. Comprehensive Tax Audit"
                    />
                  </Field>
                  <Field label="Description">
                    <input
                      style={INPUT_STYLE}
                      value={phase.description}
                      onChange={e => setApproach(pi, "description", e.target.value)}
                      placeholder="Short description of what this phase involved"
                    />
                  </Field>
                  <div>
                    <label style={LABEL_STYLE}>Bullet Points</label>
                    <div className="space-y-2">
                      {phase.points.map((pt, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <span style={{ color: "#37B4B4", fontSize: 16, lineHeight: "34px", flexShrink: 0 }}>·</span>
                          <input
                            style={{ ...INPUT_STYLE, flex: 1 }}
                            value={pt}
                            onChange={e => setApproachPoint(pi, j, e.target.value)}
                            placeholder={`Point ${j + 1}`}
                          />
                          {phase.points.length > 1 && (
                            <button
                              onClick={() => removeApproachPoint(pi, j)}
                              className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors"
                              style={{ color: "rgba(255,255,255,0.25)" }}
                            >
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={() => addApproachPoint(pi)}
                        className="text-[11px] flex items-center gap-1.5 mt-1 px-2 py-1.5 rounded-lg transition-colors"
                        style={{ color: "rgba(55,180,180,0.7)", background: "rgba(55,180,180,0.06)" }}
                      >
                        <Plus size={11} /> Add point
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addApproachPhase}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium transition-colors"
              style={{ background: "rgba(55,180,180,0.1)", color: "#37B4B4", border: "1px dashed rgba(55,180,180,0.3)" }}
            >
              <Plus size={13} /> Add phase
            </button>
          </>
        )}

        {/* TESTIMONIAL */}
        {editorTab === "testimonial" && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Name">
                <input
                  style={INPUT_STYLE}
                  value={form.testimonial_name}
                  onChange={e => set("testimonial_name", e.target.value)}
                  placeholder="e.g. Station Manager"
                />
              </Field>
              <Field label="Role / Company">
                <input
                  style={INPUT_STYLE}
                  value={form.testimonial_role}
                  onChange={e => set("testimonial_role", e.target.value)}
                  placeholder="e.g. MO Radio 88.2FM"
                />
              </Field>
            </div>
            <Field label="Quote">
              <textarea
                style={{ ...INPUT_STYLE, minHeight: 160 }}
                value={form.testimonial_quote}
                onChange={e => set("testimonial_quote", e.target.value)}
                placeholder="The client's testimonial quote (without quotation marks)"
              />
            </Field>
            <div
              className="rounded-xl p-4"
              style={{ background: "rgba(55,180,180,0.05)", border: "1px solid rgba(55,180,180,0.15)" }}
            >
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>
                Tip: good testimonials are specific about the outcome — &ldquo;went from 8 days to 2 days&rdquo; rather than &ldquo;much faster.&rdquo;
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-4 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <p style={{ fontSize: 11, color: dirty ? "#37B4B4" : "rgba(255,255,255,0.25)" }}>
          {dirty ? "Unsaved changes" : "No changes"}
        </p>
        <div className="flex gap-2">
          {dirty && (
            <button
              onClick={() => setForm(initial)}
              className="px-4 py-2 rounded-lg text-[12px] font-medium transition-colors"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            >
              Discard
            </button>
          )}
          <button
            onClick={() => onSave(form)}
            disabled={!dirty || saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold disabled:opacity-40 transition-all"
            style={{ background: "#37B4B4", color: "#082121" }}
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Insight editor ─── */
type INEditorTab = "meta" | "content";

function InsightEditor({
  article,
  initial,
  onSave,
  saving,
}: {
  article: (typeof STATIC_INSIGHTS)[0];
  initial: InsightEdit;
  onSave: (data: InsightEdit) => void;
  saving: boolean;
}) {
  const [form, setForm] = useState<InsightEdit>(initial);
  const [editorTab, setEditorTab] = useState<INEditorTab>("meta");

  useEffect(() => { setForm(initial); }, [article.slug]);

  const dirty = JSON.stringify(form) !== JSON.stringify(initial);

  function set(key: keyof InsightEdit, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  const TABS: { key: INEditorTab; label: string }[] = [
    { key: "meta", label: "Meta" },
    { key: "content", label: "Content" },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Tab bar */}
      <div className="shrink-0 flex gap-0.5 px-5 pt-4 pb-0">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setEditorTab(t.key)}
            className="px-3 py-1.5 rounded-t-lg text-[12px] font-medium transition-colors"
            style={editorTab === t.key
              ? { background: "rgba(55,180,180,0.15)", color: "#37B4B4", borderBottom: "2px solid #37B4B4" }
              : { color: "rgba(255,255,255,0.4)" }}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="mx-5 mb-0" style={{ height: 1, background: "rgba(255,255,255,0.08)" }} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {editorTab === "meta" && (
          <>
            <Field label="Title">
              <input
                style={INPUT_STYLE}
                value={form.title}
                onChange={e => set("title", e.target.value)}
                placeholder="Article title"
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <input
                  style={INPUT_STYLE}
                  value={form.category}
                  onChange={e => set("category", e.target.value)}
                  placeholder="e.g. Strategy"
                />
              </Field>
              <Field label="Date">
                <input
                  style={INPUT_STYLE}
                  value={form.date}
                  onChange={e => set("date", e.target.value)}
                  placeholder="e.g. January 2026"
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Author">
                <input
                  style={INPUT_STYLE}
                  value={form.author}
                  onChange={e => set("author", e.target.value)}
                  placeholder="Author name"
                />
              </Field>
              <Field label="Author Role">
                <input
                  style={INPUT_STYLE}
                  value={form.authorRole}
                  onChange={e => set("authorRole", e.target.value)}
                  placeholder="e.g. Senior Strategy Consultant"
                />
              </Field>
            </div>
            <Field label="Excerpt">
              <textarea
                style={{ ...INPUT_STYLE, minHeight: 80 }}
                value={form.excerpt}
                onChange={e => set("excerpt", e.target.value)}
                placeholder="1–2 sentence summary shown on listing cards and SEO description"
              />
            </Field>
          </>
        )}

        {editorTab === "content" && (
          <>
            <div
              className="rounded-xl px-4 py-3 mb-1"
              style={{ background: "rgba(55,180,180,0.05)", border: "1px solid rgba(55,180,180,0.15)" }}
            >
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Body content supports basic HTML: use <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: 4 }}>&lt;p&gt;</code> for paragraphs, <code style={{ background: "rgba(255,255,255,0.1)", padding: "1px 4px", borderRadius: 4 }}>&lt;h3&gt;</code> for subheadings. Line breaks are preserved.
              </p>
            </div>
            <Field label="Body">
              <textarea
                style={{ ...INPUT_STYLE, minHeight: 400, fontFamily: "monospace", fontSize: 12 }}
                value={form.content}
                onChange={e => set("content", e.target.value)}
                placeholder="<p>Article body content...</p>"
              />
            </Field>
          </>
        )}
      </div>

      {/* Footer */}
      <div
        className="shrink-0 flex items-center justify-between px-5 py-4 border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <p style={{ fontSize: 11, color: dirty ? "#37B4B4" : "rgba(255,255,255,0.25)" }}>
          {dirty ? "Unsaved changes" : "No changes"}
        </p>
        <div className="flex gap-2">
          {dirty && (
            <button
              onClick={() => setForm(initial)}
              className="px-4 py-2 rounded-lg text-[12px] font-medium"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            >
              Discard
            </button>
          )}
          <button
            onClick={() => onSave(form)}
            disabled={!dirty || saving}
            className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold disabled:opacity-40 transition-all"
            style={{ background: "#37B4B4", color: "#082121" }}
          >
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ Main Page ══════════════════════════ */
export default function ContentAdminPage() {
  const [tab, setTab] = useState<Tab>("case-studies");
  const [cms, setCms] = useState<CMSData>({ "case-studies": {}, insights: {} });
  const [loading, setLoading] = useState(true);
  const [activeCS, setActiveCS] = useState<string>(caseStudies[0].id);
  const [activeIN, setActiveIN] = useState<string>(STATIC_INSIGHTS[0].slug);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/cms/content")
      .then(r => r.json())
      .then(d => { setCms(d); setLoading(false); })
      .catch(() => { toast.error("Failed to load content"); setLoading(false); });
  }, []);

  async function handleSignOut() {
    await fetch("/api/cms/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  async function saveCaseStudy(id: string, data: CaseStudyEdit) {
    setSaving(true);
    try {
      const res = await fetch("/api/cms/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "case-studies", id, data }),
      });
      if (!res.ok) throw new Error("Save failed");
      setCms(prev => ({ ...prev, "case-studies": { ...prev["case-studies"], [id]: data } }));
      toast.success("Case study saved");
    } catch {
      toast.error("Failed to save case study");
    } finally {
      setSaving(false);
    }
  }

  async function saveInsight(slug: string, data: InsightEdit) {
    setSaving(true);
    try {
      const res = await fetch("/api/cms/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "insights", id: slug, data }),
      });
      if (!res.ok) throw new Error("Save failed");
      setCms(prev => ({ ...prev, insights: { ...prev.insights, [slug]: data } }));
      toast.success("Insight saved");
    } catch {
      toast.error("Failed to save insight");
    } finally {
      setSaving(false);
    }
  }

  /* derived: merged data for active items */
  const activeStudy = caseStudies.find(s => s.id === activeCS)!;
  const activeStudyData = activeStudy ? mergeCaseStudy(activeStudy, cms["case-studies"][activeCS] ?? {}) : null;

  const activeArticle = STATIC_INSIGHTS.find(a => a.slug === activeIN)!;
  const activeArticleData = activeArticle ? mergeInsight(activeArticle, cms.insights[activeIN] ?? {}) : null;

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: "#082121", color: "#fff" }}>

      {/* Header */}
      <header
        className="shrink-0 flex items-center justify-between px-5 h-14 border-b z-40"
        style={{ background: "#082121", borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#37B4B4" }}>
              <FileText size={14} color="#082121" />
            </div>
            <span className="text-white font-semibold text-[14px] tracking-tight">Content CMS</span>
          </div>

          <nav className="hidden md:flex items-center gap-0.5">
            {([["case-studies", "Case Studies"], ["insights", "Insights"]] as [Tab, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors whitespace-nowrap"
                style={tab === key
                  ? { background: "#37B4B4", color: "#082121" }
                  : { color: "rgba(255,255,255,0.5)" }}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-1">
          <a
            href="/admin"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-colors hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            <BookOpen size={13} />
            <span className="hidden sm:inline">Images</span>
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

      {/* Split pane */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 size={24} className="animate-spin" style={{ color: "#37B4B4" }} />
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">

          {/* ── Left: item list ── */}
          <div
            className="shrink-0 flex flex-col overflow-hidden border-r"
            style={{ width: 260, borderColor: "rgba(255,255,255,0.06)" }}
          >
            <div className="shrink-0 px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <p className="text-white text-[12px] font-semibold">
                {tab === "case-studies" ? `${caseStudies.length} Case Studies` : `${STATIC_INSIGHTS.length} Articles`}
              </p>
              <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.3)" }}>
                Click to edit
              </p>
            </div>

            <div className="flex-1 overflow-y-auto py-2 px-2">
              {tab === "case-studies" && caseStudies.map(s => {
                const hasOverride = !!cms["case-studies"][s.id] && Object.keys(cms["case-studies"][s.id]).length > 0;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveCS(s.id)}
                    className="w-full text-left rounded-xl p-3 mb-1.5 transition-all group"
                    style={{
                      background: activeCS === s.id ? "rgba(55,180,180,0.12)" : "rgba(255,255,255,0.02)",
                      border: activeCS === s.id ? "1px solid rgba(55,180,180,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-white text-[12px] font-medium leading-tight truncate">{s.client}</p>
                        <p className="text-[11px] mt-0.5 truncate leading-tight" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {s.title}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span
                          className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full"
                          style={{ background: "rgba(55,180,180,0.15)", color: "#37B4B4" }}
                        >
                          {s.category}
                        </span>
                        {hasOverride && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
                            Edited
                          </span>
                        )}
                      </div>
                    </div>
                    {activeCS !== s.id && (
                      <div className="flex items-center gap-1 mt-2">
                        <ChevronRight size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>Edit</span>
                      </div>
                    )}
                  </button>
                );
              })}

              {tab === "insights" && STATIC_INSIGHTS.map(a => {
                const hasOverride = !!cms.insights[a.slug] && Object.keys(cms.insights[a.slug]).length > 0;
                return (
                  <button
                    key={a.slug}
                    onClick={() => setActiveIN(a.slug)}
                    className="w-full text-left rounded-xl p-3 mb-1.5 transition-all"
                    style={{
                      background: activeIN === a.slug ? "rgba(55,180,180,0.12)" : "rgba(255,255,255,0.02)",
                      border: activeIN === a.slug ? "1px solid rgba(55,180,180,0.3)" : "1px solid rgba(255,255,255,0.05)",
                    }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-white text-[12px] font-medium leading-tight"
                          style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {a.title}
                        </p>
                        <p className="text-[11px] mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
                          {a.author}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(55,180,180,0.15)", color: "#37B4B4" }}>
                          {a.category}
                        </span>
                        {hasOverride && (
                          <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: "rgba(34,197,94,0.12)", color: "#22c55e" }}>
                            Edited
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Right: editor ── */}
          <div className="flex-1 flex flex-col overflow-hidden" style={{ background: "#061818" }}>
            {/* Editor header */}
            <div
              className="shrink-0 flex items-center justify-between px-5 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "#082121" }}
            >
              {tab === "case-studies" && activeStudy && (
                <>
                  <div>
                    <p className="text-white font-semibold text-[14px]">{activeStudy.client}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {activeStudy.industry} · {activeStudy.duration}
                    </p>
                  </div>
                  <a
                    href={`/case-studies/${activeStudy.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] transition-colors hover:bg-white/5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <ArrowUpRight size={13} /> View live
                  </a>
                </>
              )}
              {tab === "insights" && activeArticle && (
                <>
                  <div>
                    <p className="text-white font-semibold text-[14px]">{activeArticle.title}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.4)" }}>
                      {activeArticle.author} · {activeArticle.category}
                    </p>
                  </div>
                  <a
                    href={`/insights/${activeArticle.slug}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] transition-colors hover:bg-white/5"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    <ArrowUpRight size={13} /> View live
                  </a>
                </>
              )}
            </div>

            {/* Editor body */}
            <div className="flex-1 overflow-hidden">
              {tab === "case-studies" && activeStudy && activeStudyData && (
                <CaseStudyEditor
                  key={activeCS}
                  study={activeStudy}
                  initial={activeStudyData}
                  onSave={(data) => saveCaseStudy(activeCS, data)}
                  saving={saving}
                />
              )}
              {tab === "insights" && activeArticle && activeArticleData && (
                <InsightEditor
                  key={activeIN}
                  article={activeArticle}
                  initial={activeArticleData}
                  onSave={(data) => saveInsight(activeIN, data)}
                  saving={saving}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
