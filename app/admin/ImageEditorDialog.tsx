"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, Loader2, ZoomIn, ZoomOut, RotateCcw, FlipHorizontal2 } from "lucide-react";
import { toast } from "sonner";

/* ─── Types ─────────────────────────────────────────────────── */
type Adj = { brightness: number; contrast: number; saturation: number; exposure: number };

const RATIOS = [
  { label: "Free",  w: 0,  h: 0  },
  { label: "16:9",  w: 16, h: 9  },
  { label: "3:2",   w: 3,  h: 2  },
  { label: "4:3",   w: 4,  h: 3  },
  { label: "1:1",   w: 1,  h: 1  },
  { label: "2:3",   w: 2,  h: 3  },
] as const;

type RatioLabel = typeof RATIOS[number]["label"];

const ADJ_DEFAULT: Adj = { brightness: 1, contrast: 1, saturation: 1, exposure: 1 };

/* ─── Helpers ────────────────────────────────────────────────── */
function buildFilter(adj: Adj) {
  const exp = adj.exposure;
  return `brightness(${(adj.brightness * exp).toFixed(3)}) contrast(${adj.contrast.toFixed(3)}) saturate(${adj.saturation.toFixed(3)})`;
}

/* ══════════════════════════ Component ══════════════════════════ */
export function ImageEditorDialog({
  imagePath,
  onSave,
  onClose,
}: {
  imagePath: string;
  onSave: (newPath: string) => void;
  onClose: () => void;
}) {
  /* ── state ── */
  const [tab, setTab]           = useState<"reframe" | "adjust">("reframe");
  const [ratioLabel, setRatioLabel] = useState<RatioLabel>("3:2");
  const [scale, setScale]       = useState(1);
  const [panX, setPanX]         = useState(0);
  const [panY, setPanY]         = useState(0);
  const [adj, setAdj]           = useState<Adj>(ADJ_DEFAULT);
  const [nat, setNat]           = useState({ w: 0, h: 0 });
  const [imgLoaded, setImgLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [flipH, setFlipH]       = useState(false);

  /* ── refs ── */
  const dragRef  = useRef<{ sx: number; sy: number; spx: number; spy: number } | null>(null);
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* ── derived ── */
  const ratio = RATIOS.find(r => r.label === ratioLabel)!;
  const previewW = containerRef.current?.clientWidth ?? 520;
  const previewH = ratio.w === 0
    ? (nat.h && nat.w ? Math.round(previewW * nat.h / nat.w) : Math.round(previewW * 9 / 16))
    : Math.round(previewW * ratio.h / ratio.w);

  const minScale = nat.w > 0
    ? Math.max(previewW / nat.w, previewH / nat.h)
    : 1;

  /* ── pan clamping ── */
  function clamp(px: number, py: number, s: number, pH = previewH) {
    return {
      x: Math.max(0, Math.min(px, Math.max(0, nat.w * s - previewW))),
      y: Math.max(0, Math.min(py, Math.max(0, nat.h * s - pH))),
    };
  }

  /* ── init on load ── */
  function initImage(imgEl: HTMLImageElement) {
    const s = Math.max(
      (containerRef.current?.clientWidth ?? 520) / imgEl.naturalWidth,
      previewH / imgEl.naturalHeight,
    );
    const px = Math.max(0, (imgEl.naturalWidth * s - (containerRef.current?.clientWidth ?? 520)) / 2);
    const py = Math.max(0, (imgEl.naturalHeight * s - previewH) / 2);
    setNat({ w: imgEl.naturalWidth, h: imgEl.naturalHeight });
    setScale(s);
    setPanX(px);
    setPanY(py);
    setImgLoaded(true);
  }

  /* ── zoom ── */
  function doZoom(delta: number) {
    setScale(prev => {
      const newS = Math.max(minScale, Math.min(5, prev + delta));
      const cx = panX + previewW / 2;
      const cy = panY + previewH / 2;
      const r = newS / prev;
      const { x, y } = clamp(cx * r - previewW / 2, cy * r - previewH / 2, newS);
      setPanX(x);
      setPanY(y);
      return newS;
    });
  }

  /* ── drag ── */
  const onMove = useCallback((e: MouseEvent) => {
    if (!dragRef.current) return;
    isDragging.current = true;
    const dx = e.clientX - dragRef.current.sx;
    const dy = e.clientY - dragRef.current.sy;
    const { x, y } = clamp(dragRef.current.spx - dx, dragRef.current.spy - dy, scale);
    setPanX(x);
    setPanY(y);
  }, [scale, nat.w, nat.h, previewW, previewH]);

  const onUp = useCallback(() => {
    dragRef.current = null;
    setTimeout(() => { isDragging.current = false; }, 10);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => { window.removeEventListener("mousemove", onMove); window.removeEventListener("mouseup", onUp); };
  }, [onMove, onUp]);

  /* ── re-center when ratio changes ── */
  useEffect(() => {
    if (!nat.w) return;
    const newPH = ratio.w === 0
      ? Math.round(previewW * nat.h / nat.w)
      : Math.round(previewW * ratio.h / ratio.w);
    const newS = Math.max(previewW / nat.w, newPH / nat.h, minScale);
    const { x, y } = clamp(panX * newS / scale, panY * newS / scale, newS, newPH);
    setScale(newS);
    setPanX(x);
    setPanY(y);
  }, [ratioLabel]);

  /* ── canvas export + upload ── */
  async function handleSave() {
    if (!nat.w) return;
    setProcessing(true);
    try {
      const canvas = document.createElement("canvas");
      const cropX = panX / scale;
      const cropY = panY / scale;
      const cropW = previewW / scale;
      const cropH = previewH / scale;
      const outW = Math.min(2400, Math.round(cropW));
      const outH = Math.round(outW * (cropH / cropW));
      canvas.width = outW;
      canvas.height = outH;
      const ctx = canvas.getContext("2d")!;
      ctx.filter = buildFilter(adj);

      if (flipH) {
        ctx.translate(outW, 0);
        ctx.scale(-1, 1);
      }

      const img = new Image();
      img.crossOrigin = "anonymous";
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => {
          // fallback: try without crossOrigin
          const img2 = new Image();
          img2.onload = () => { Object.assign(img, img2); res(); };
          img2.onerror = rej;
          img2.src = imagePath;
        };
        img.src = imagePath;
      });

      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, outW, outH);

      const blob = await new Promise<Blob | null>(r => canvas.toBlob(r, "image/jpeg", 0.93));
      if (!blob) throw new Error("Canvas export failed");

      const fd = new FormData();
      fd.append("file", blob, `edited-${Date.now()}.jpg`);
      const res = await fetch("/api/cms/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");

      toast.success("Image saved");
      onSave(data.path);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save");
    } finally {
      setProcessing(false);
    }
  }

  const filterStr = buildFilter(adj);
  const hasAdjChanges = adj.brightness !== 1 || adj.contrast !== 1 || adj.saturation !== 1 || adj.exposure !== 1;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.88)", backdropFilter: "blur(12px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="w-full rounded-2xl flex flex-col overflow-hidden"
        style={{
          background: "#061818",
          border: "1px solid rgba(255,255,255,0.09)",
          maxHeight: "94vh",
          maxWidth: 680,
        }}
      >
        {/* ── Header ── */}
        <div
          className="shrink-0 flex items-center justify-between px-5 py-3.5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)", background: "#082121" }}
        >
          <div>
            <p className="text-white font-semibold text-[14px]">Edit Image</p>
            <p className="text-[11px] mt-0.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              Drag to reframe · scroll to zoom · sliders to adjust
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.5)" }}
          >
            <X size={14} />
          </button>
        </div>

        {/* ── Toolbar ── */}
        <div
          className="shrink-0 flex items-center justify-between px-5 py-2.5 border-b gap-4"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "#061818" }}
        >
          {/* Aspect ratio pills */}
          <div className="flex items-center gap-1 flex-wrap">
            {RATIOS.map(r => (
              <button
                key={r.label}
                onClick={() => setRatioLabel(r.label)}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold transition-colors"
                style={ratioLabel === r.label
                  ? { background: "#37B4B4", color: "#082121" }
                  : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.4)" }}
              >
                {r.label}
              </button>
            ))}
          </div>

          {/* Flip + tab toggle */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setFlipH(v => !v)}
              title="Flip horizontal"
              className="w-7 h-7 rounded-md flex items-center justify-center transition-colors"
              style={{
                background: flipH ? "rgba(55,180,180,0.15)" : "rgba(255,255,255,0.05)",
                color: flipH ? "#37B4B4" : "rgba(255,255,255,0.4)",
              }}
            >
              <FlipHorizontal2 size={13} />
            </button>
            <div
              className="flex rounded-lg overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {(["reframe", "adjust"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className="px-3 py-1.5 text-[11px] font-medium capitalize transition-colors"
                  style={tab === t
                    ? { background: "rgba(55,180,180,0.15)", color: "#37B4B4" }
                    : { color: "rgba(255,255,255,0.35)" }}
                >
                  {t === "reframe" ? "Reframe" : "Adjustments"}
                  {t === "adjust" && hasAdjChanges && (
                    <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[#37B4B4] align-middle" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Preview ── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">
          <div
            ref={containerRef}
            style={{
              width: "100%",
              aspectRatio: ratio.w > 0 ? `${ratio.w} / ${ratio.h}` : (nat.w && nat.h ? `${nat.w} / ${nat.h}` : "16 / 9"),
              position: "relative",
              overflow: "hidden",
              borderRadius: 10,
              background: "#030e0e",
              cursor: tab === "reframe" ? "grab" : "default",
              border: "1px solid rgba(255,255,255,0.07)",
              userSelect: "none",
              touchAction: "none",
            }}
            onMouseDown={e => {
              if (tab !== "reframe") return;
              e.preventDefault();
              dragRef.current = { sx: e.clientX, sy: e.clientY, spx: panX, spy: panY };
            }}
            onWheel={e => { e.preventDefault(); doZoom(e.deltaY < 0 ? 0.07 : -0.07); }}
          >
            {/* Hidden loader img for natural dimensions */}
            <img
              src={imagePath}
              style={{ display: "none" }}
              onLoad={e => initImage(e.currentTarget)}
              alt=""
            />

            {/* Visible preview */}
            {imgLoaded && nat.w > 0 && (
              <img
                src={imagePath}
                alt="Preview"
                style={{
                  position: "absolute",
                  width: nat.w * scale,
                  height: nat.h * scale,
                  top: -panY,
                  left: -panX,
                  filter: filterStr,
                  transform: flipH ? "scaleX(-1)" : undefined,
                  pointerEvents: "none",
                  display: "block",
                  maxWidth: "none",
                }}
                draggable={false}
              />
            )}
            {!imgLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 size={22} className="animate-spin" style={{ color: "#37B4B4" }} />
              </div>
            )}

            {/* Crosshair centre guide (reframe mode) */}
            {tab === "reframe" && imgLoaded && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
                <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: "#37B4B4", transform: "translateX(-0.5px)" }} />
                <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: "#37B4B4", transform: "translateY(-0.5px)" }} />
              </div>
            )}
          </div>

          {/* ── Reframe controls ── */}
          {tab === "reframe" && (
            <div className="flex items-center gap-3">
              <button
                onClick={() => doZoom(-0.1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
              >
                <ZoomOut size={14} />
              </button>
              <input
                type="range"
                min={Math.max(10, Math.round(minScale * 100))}
                max={500}
                step={1}
                value={Math.round(scale * 100)}
                onChange={e => {
                  const s = parseInt(e.target.value) / 100;
                  const { x, y } = clamp(panX * s / scale, panY * s / scale, s);
                  setScale(s);
                  setPanX(x);
                  setPanY(y);
                }}
                className="flex-1"
                style={{ accentColor: "#37B4B4" }}
              />
              <button
                onClick={() => doZoom(0.1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
              >
                <ZoomIn size={14} />
              </button>
              <span
                className="shrink-0 text-right"
                style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", minWidth: 42, fontFamily: "monospace" }}
              >
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={() => { if (!nat.w) return; initImage({ naturalWidth: nat.w, naturalHeight: nat.h } as HTMLImageElement); }}
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                title="Reset zoom"
                style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.3)" }}
              >
                <RotateCcw size={12} />
              </button>
            </div>
          )}

          {/* ── Adjustment controls ── */}
          {tab === "adjust" && (
            <div className="space-y-5">
              {([
                ["exposure",    "Exposure",    0.25, 2,   0.01],
                ["brightness",  "Brightness",  0.5,  2,   0.01],
                ["contrast",    "Contrast",    0.5,  2,   0.01],
                ["saturation",  "Saturation",  0,    2,   0.01],
              ] as [keyof Adj, string, number, number, number][]).map(([key, label, min, max, step]) => {
                const pct = ((adj[key] - min) / (max - min)) * 100;
                return (
                  <div key={key}>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>{label}</span>
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 11, color: "#37B4B4", fontFamily: "monospace", minWidth: 36, textAlign: "right" }}>
                          {adj[key] === 1 ? "—" : (adj[key] > 1 ? "+" : "") + ((adj[key] - 1) * 100).toFixed(0) + "%"}
                        </span>
                        {adj[key] !== 1 && (
                          <button
                            onClick={() => setAdj(p => ({ ...p, [key]: 1 }))}
                            style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}
                          >
                            <RotateCcw size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="relative">
                      <input
                        type="range" min={min} max={max} step={step}
                        value={adj[key]}
                        onChange={e => setAdj(p => ({ ...p, [key]: parseFloat(e.target.value) }))}
                        className="w-full"
                        style={{ accentColor: "#37B4B4" }}
                      />
                      {/* Centre tick (shows "0 change") */}
                      <div
                        className="absolute bottom-0 pointer-events-none"
                        style={{
                          left: `${((1 - min) / (max - min)) * 100}%`,
                          width: 1,
                          height: 6,
                          background: "rgba(255,255,255,0.2)",
                          transform: "translateX(-0.5px)",
                        }}
                      />
                    </div>
                  </div>
                );
              })}

              {hasAdjChanges && (
                <button
                  onClick={() => setAdj(ADJ_DEFAULT)}
                  className="text-[11px] flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  <RotateCcw size={11} /> Reset all adjustments
                </button>
              )}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="shrink-0 flex items-center justify-between px-5 py-3.5 border-t"
          style={{ borderColor: "rgba(255,255,255,0.07)", background: "#061818" }}
        >
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
            Exports a new file · original is preserved
          </p>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-[12px] font-medium"
              style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!imgLoaded || processing}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-[13px] font-semibold disabled:opacity-40 transition-all"
              style={{ background: "#37B4B4", color: "#082121" }}
            >
              {processing
                ? <><Loader2 size={13} className="animate-spin" /> Processing…</>
                : "Apply & Save"
              }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
