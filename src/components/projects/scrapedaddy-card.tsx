"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  List, Table2, Link2, Mail, Phone, Image, FileText, Code2,
} from "lucide-react";

// ── Tool data ──

const tools = [
  { name: "Lists", icon: List, color: "#3b82f6" },
  { name: "Tables", icon: Table2, color: "#ec4899" },
  { name: "Links", icon: Link2, color: "#06b6d4" },
  { name: "Emails", icon: Mail, color: "#f59e0b" },
  { name: "Phones", icon: Phone, color: "#14b8a6" },
  { name: "Images", icon: Image, color: "#ef4444" },
  { name: "Markdown", icon: FileText, color: "#a855f7" },
  { name: "Schema", icon: Code2, color: "#22c55e" },
];

// ── Extraction demo — mini webpage with picker + results ──

const mockRows = [
  ["MacBook Pro 14″", "$2,499", "In Stock"],
  ["ThinkPad X1 Carbon", "$1,849", "In Stock"],
  ["Dell XPS 15", "$1,699", "Low Stock"],
  ["Surface Laptop 5", "$1,299", "In Stock"],
];

type DemoPhase = "idle" | "picking" | "extracting" | "results";

function ExtractionDemo({ inView }: { inView: boolean }) {
  const [phase, setPhase] = useState<DemoPhase>("idle");
  const [activeToolIdx, setActiveToolIdx] = useState(0);
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const run = () => {
      setPhase("idle");
      setVisibleRows(0);

      const t1 = setTimeout(() => setPhase("picking"), 400);
      const t2 = setTimeout(() => setPhase("extracting"), 1600);
      const t3 = setTimeout(() => { setPhase("results"); setVisibleRows(1); }, 2200);
      const t4 = setTimeout(() => setVisibleRows(2), 2500);
      const t5 = setTimeout(() => setVisibleRows(3), 2800);
      const t6 = setTimeout(() => setVisibleRows(4), 3100);
      const t7 = setTimeout(() => {
        setActiveToolIdx((i) => (i + 1) % tools.length);
      }, 4800);

      return [t1, t2, t3, t4, t5, t6, t7];
    };

    let timers = run();
    const interval = setInterval(() => { timers = run(); }, 5000);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, [inView]);

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden">
      {/* Mini webpage mockup */}
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#1a1816]">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] bg-[#201e1a] px-3 py-1.5">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </div>
          <div className="flex-1 rounded bg-white/[0.06] px-2 py-0.5">
            <span className="font-mono text-[7px] text-white/30">wholesale-supplier.com/products</span>
          </div>
        </div>

        {/* Page content — fake product rows */}
        <div className="px-3 py-2 space-y-1.5">
          {mockRows.map((row, i) => (
            <motion.div
              key={i}
              className="flex items-center justify-between rounded px-2 py-1.5 transition-colors duration-200"
              style={{
                backgroundColor:
                  phase === "picking" || phase === "extracting"
                    ? "rgba(245,158,11,0.08)"
                    : "transparent",
                borderLeft:
                  phase === "picking" || phase === "extracting"
                    ? "2px solid rgba(245,158,11,0.5)"
                    : "2px solid transparent",
              }}
            >
              <span className="font-mono text-[9px] text-white/60">{row[0]}</span>
              <div className="flex gap-3">
                <span className="font-mono text-[9px] text-[#f59e0b]/70">{row[1]}</span>
                <span className="font-mono text-[8px] text-white/35">{row[2]}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Picker cursor / highlight indicator */}
        {phase === "picking" && (
          <motion.div
            className="mx-3 mb-2 flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="h-1 w-1 rounded-full bg-[#f59e0b] animate-pulse" />
            <span className="font-mono text-[7px] text-[#f59e0b]/60">4 similar elements found</span>
          </motion.div>
        )}
        {phase === "extracting" && (
          <motion.div
            className="mx-3 mb-2 flex items-center gap-1.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <motion.div
              className="h-1 w-8 overflow-hidden rounded-full bg-[#f59e0b]/10"
            >
              <motion.div
                className="h-full rounded-full bg-[#f59e0b]/60"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.5, ease: "linear" }}
              />
            </motion.div>
            <span className="font-mono text-[7px] text-[#f59e0b]/60">Extracting...</span>
          </motion.div>
        )}
      </div>

      {/* Results table — always rendered to prevent layout shift */}
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#1a1816]">
        {/* Table header */}
        <div className="flex border-b border-white/[0.08] bg-[#201e1a] px-3 py-1.5">
          <span className="flex-1 font-mono text-[7px] font-bold uppercase tracking-wider text-[#f59e0b]/50">Product</span>
          <span className="w-14 font-mono text-[7px] font-bold uppercase tracking-wider text-[#f59e0b]/50">Price</span>
          <span className="w-14 text-right font-mono text-[7px] font-bold uppercase tracking-wider text-[#f59e0b]/50">Status</span>
        </div>
        {/* Rows — always 4 slots, fade in/out */}
        {mockRows.map((row, i) => (
          <motion.div
            key={i}
            animate={{
              opacity: phase === "results" && i < visibleRows ? 1 : 0,
            }}
            transition={{ duration: 0.15 }}
            className="flex border-b border-white/[0.04] px-3 py-1"
          >
            <span className="flex-1 font-mono text-[8px] text-white/60">{row[0]}</span>
            <span className="w-14 font-mono text-[8px] text-white/50">{row[1]}</span>
            <span className="w-14 text-right font-mono text-[8px] text-white/40">{row[2]}</span>
          </motion.div>
        ))}
        {/* Export hint */}
        <div className="flex items-center justify-between px-3 py-1.5">
          <motion.span
            animate={{ opacity: phase === "results" && visibleRows > 0 ? 1 : 0 }}
            className="font-mono text-[7px] text-white/25"
          >
            {visibleRows} rows
          </motion.span>
          <motion.span
            animate={{ opacity: phase === "results" && visibleRows > 0 ? 1 : 0 }}
            className="rounded bg-[#f59e0b]/15 px-1.5 py-0.5 font-mono text-[7px] font-semibold text-[#f59e0b]/60"
          >
            Export CSV
          </motion.span>
        </div>
      </div>

      {/* Tool grid */}
      <div className="grid grid-cols-4 gap-1.5">
        {tools.map((tool, i) => {
          const Icon = tool.icon;
          const isActive = i === activeToolIdx;
          return (
            <div
              key={tool.name}
              className="flex flex-col items-center gap-1 rounded-md border py-1.5 transition-all duration-300"
              style={{
                borderColor: isActive ? tool.color + "50" : "rgba(255,255,255,0.06)",
                backgroundColor: isActive ? tool.color + "15" : "rgba(255,255,255,0.02)",
              }}
            >
              <Icon
                className="h-3 w-3 transition-colors duration-300"
                style={{ color: isActive ? tool.color : "rgba(255,255,255,0.25)" }}
              />
              <span
                className="font-mono text-[6px] font-semibold uppercase tracking-wider transition-colors duration-300"
                style={{ color: isActive ? tool.color : "rgba(255,255,255,0.18)" }}
              >
                {tool.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main card ──

export function ScrapeDaddyCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -4, y: (x - 0.5) * 4 });
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1200px" }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Left: Content */}
        <div className="relative flex flex-col justify-center p-6 md:p-8">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-display text-4xl text-foreground">ScrapeDaddy</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-[#f59e0b]">
              <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 2v3M5 5l2 2" />
              </svg>
              EXTENSION
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Browser extension for zero-code data extraction. 8 tools for grabbing
            lists, tables, emails, images, and more from any webpage. Smart element
            picker with auto-detection and export to CSV, Excel, or Sheets.
          </p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {["React", "TypeScript", "WXT", "Chrome API", "SheetJS"].map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Feature highlights */}
          <div className="mb-5 grid grid-cols-3 gap-2">
            {[
              { label: "Tools", value: "8", detail: "extraction modes" },
              { label: "Exports", value: "6+", detail: "CSV, XLSX, JSON..." },
              { label: "Browsers", value: "2", detail: "Chrome & Firefox" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                className="rounded-lg border border-border bg-muted/50 px-3 py-2"
              >
                <p className="font-mono text-[8px] font-bold uppercase tracking-[1.5px] text-muted-foreground/60">
                  {stat.label}
                </p>
                <p className="font-mono text-xs font-semibold text-foreground">{stat.value}</p>
                <p className="font-mono text-[9px] text-muted-foreground/70">{stat.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4">
            <a
              href="https://github.com/SonnyTaylor/scrape-daddy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View Source
            </a>

            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={isInView ? { opacity: 1, rotate: -2 } : {}}
              transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <p className="font-handwriting text-lg text-muted-foreground/60">
                no more copy-pasting
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right: Visualizer panel */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#1c1a17] p-5 md:p-6">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(245,158,11,0.06) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(245,158,11,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.1) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative w-full">
            <ExtractionDemo inView={isInView} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
