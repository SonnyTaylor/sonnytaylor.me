"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  Database, Image as ImageIcon, FileText, ShoppingBag, Bot, Cpu,
} from "lucide-react";

// ── Pipeline demo ──

const pipelineSteps = [
  { icon: Database, label: "Scrape", detail: "842 products" },
  { icon: ImageIcon, label: "Images", detail: "BG removal" },
  { icon: Bot, label: "AI Descriptions", detail: "Gemini" },
  { icon: ShoppingBag, label: "Sync", detail: "Shopify" },
];

function PipelineDemo({ inView }: { inView: boolean }) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveStep((s) => (s + 1) % (pipelineSteps.length + 1));
    }, 1500);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div className="flex flex-col gap-3">
      {/* Pipeline visualization */}
      <div className="overflow-hidden rounded-lg border border-emerald-500/10 bg-[#1a1c1a]">
        <div className="border-b border-white/[0.06] bg-[#1e201e] px-3 py-1.5">
          <span className="font-mono text-[7px] font-bold uppercase tracking-[1.5px] text-emerald-400/40">
            Pipeline
          </span>
        </div>
        <div className="p-3">
          <div className="flex flex-col gap-2">
            {pipelineSteps.map((step, i) => {
              const Icon = step.icon;
              const isDone = i < activeStep;
              const isActive = i === activeStep;
              return (
                <div key={step.label} className="flex items-center gap-2">
                  {/* Step indicator */}
                  <div
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md transition-all duration-300"
                    style={{
                      backgroundColor: isDone
                        ? "rgba(34,197,94,0.15)"
                        : isActive
                          ? "rgba(34,197,94,0.1)"
                          : "rgba(255,255,255,0.03)",
                      borderWidth: 1,
                      borderColor: isDone
                        ? "rgba(34,197,94,0.3)"
                        : isActive
                          ? "rgba(34,197,94,0.2)"
                          : "rgba(255,255,255,0.06)",
                    }}
                  >
                    {isDone ? (
                      <svg className="h-3 w-3 text-emerald-400/70" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 8.5L6.5 12L13 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      <Icon
                        className="h-3 w-3 transition-colors duration-300"
                        style={{
                          color: isActive ? "rgba(34,197,94,0.7)" : "rgba(255,255,255,0.2)",
                        }}
                      />
                    )}
                  </div>

                  {/* Label + detail */}
                  <div className="flex-1">
                    <span
                      className="font-mono text-[8px] font-semibold transition-colors duration-300"
                      style={{
                        color: isDone || isActive ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                      }}
                    >
                      {step.label}
                    </span>
                    <span className="ml-1.5 font-mono text-[7px] text-white/20">{step.detail}</span>
                  </div>

                  {/* Progress bar for active step */}
                  {isActive && (
                    <div className="h-1 w-12 overflow-hidden rounded-full bg-emerald-500/10">
                      <motion.div
                        className="h-full rounded-full bg-emerald-400/50"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.3, ease: "linear" }}
                        key={activeStep}
                      />
                    </div>
                  )}
                  {isDone && (
                    <span className="font-mono text-[6px] text-emerald-400/40">done</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mini terminal output */}
      <div className="overflow-hidden rounded-lg border border-emerald-500/10 bg-[#1a1c1a]">
        <div className="border-b border-white/[0.06] bg-[#1e201e] px-3 py-1.5">
          <span className="font-mono text-[7px] text-white/25">wits — output</span>
        </div>
        <div className="px-3 py-2 font-mono text-[8px] leading-[1.7]">
          <div className="text-white/50">$ wits scrape start --limit 50</div>
          <div className="text-emerald-400/50">✓ Scraped 842 products from 2 suppliers</div>
          <div className="text-white/50">$ wits products process-images</div>
          <div className="text-emerald-400/50">✓ 842 images processed (rembg)</div>
          <div className="text-white/50">$ wits shopify sync</div>
          <div className="text-emerald-400/50">✓ 38 new · 204 updated · 0 errors</div>
        </div>
      </div>

      {/* Supplier badges */}
      <div className="flex gap-2">
        {["Wholesale IT", "Leader"].map((supplier) => (
          <div
            key={supplier}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-md border border-emerald-500/10 bg-emerald-500/[0.04] py-1.5"
          >
            <Cpu className="h-2.5 w-2.5 text-emerald-400/40" />
            <span className="font-mono text-[7px] font-semibold text-white/40">{supplier}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main card ──

export function WholesaleScraperCard() {
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
        className="relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Left: Pipeline visual */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#141614] p-5 md:p-6">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(34,197,94,0.05) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(34,197,94,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.15) 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative w-full">
            <PipelineDemo inView={isInView} />
          </div>
        </div>

        {/* Right: Content */}
        <div className="relative flex flex-col justify-center p-6 md:p-8">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-display text-3xl text-foreground sm:text-4xl">Wholesale Scraper</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-emerald-600">
              <Database className="h-2.5 w-2.5" />
              AUTOMATION
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Full pipeline for scraping wholesale IT suppliers, processing product
            images with AI background removal, standardising descriptions with
            Gemini, and syncing everything to Shopify automatically.
          </p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {["Python", "FastAPI", "Selenium", "Gemini", "Shopify API"].map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2">
            {[
              { label: "Suppliers", value: "2", detail: "auto-scraped" },
              { label: "Products", value: "800+", detail: "processed" },
              { label: "Images", value: "AI", detail: "BG removal" },
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
            <span className="rounded-lg border border-border px-4 py-2 font-mono text-[10px] font-semibold text-muted-foreground/50">
              Private — Internal Tool
            </span>

            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={isInView ? { opacity: 1, rotate: 2 } : {}}
              transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <p className="font-handwriting text-lg text-muted-foreground/60">
                saves hours every week
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
