"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import { Recycle, Trash2, Leaf, ScanLine } from "lucide-react";

// ── Data ──

interface SortItem {
  name: string;
  category: "general" | "recycling" | "compost";
  confidence: number;
  image: string;
}

const sortItems: SortItem[] = [
  { name: "Snickers Wrapper", category: "general", confidence: 0.94, image: "/projects/waste-items/snickers.png" },
  { name: "Aluminium Can", category: "recycling", confidence: 0.97, image: "/projects/waste-items/can.png" },
  { name: "Banana Peel", category: "compost", confidence: 0.92, image: "/projects/waste-items/banana-peel.png" },
  { name: "Plastic Bag", category: "general", confidence: 0.88, image: "/projects/waste-items/plastic-bag.png" },
  { name: "Glass Bottle", category: "recycling", confidence: 0.96, image: "/projects/waste-items/glass-bottle.png" },
  { name: "Apple", category: "compost", confidence: 0.93, image: "/projects/waste-items/apple.png" },
];

const categoryConfig = {
  general: { label: "General", color: "#ef4444", icon: Trash2 },
  recycling: { label: "Recycling", color: "#3b82f6", icon: Recycle },
  compost: { label: "Compost", color: "#22c55e", icon: Leaf },
};

// ── Classification visualizer ──

type Phase = "scanning" | "classified" | "sorting";

function ClassificationVisualizer({ inView }: { inView: boolean }) {
  const [itemIndex, setItemIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("scanning");

  useEffect(() => {
    if (!inView) return;

    const run = () => {
      setPhase("scanning");
      const t1 = setTimeout(() => setPhase("classified"), 1200);
      const t2 = setTimeout(() => setPhase("sorting"), 2700);
      const t3 = setTimeout(() => {
        setItemIndex((i) => (i + 1) % sortItems.length);
        setPhase("scanning");
      }, 3500);
      return [t1, t2, t3];
    };

    let timers = run();
    const interval = setInterval(() => { timers = run(); }, 3500);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, [inView]);

  const item = sortItems[itemIndex];
  const config = categoryConfig[item.category];
  const Icon = config.icon;

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Camera viewfinder */}
      <div className="relative h-44 w-44">
        <div className="absolute inset-0 rounded-xl border border-white/10 bg-black/40">
          {/* Corner brackets */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 176 176" fill="none">
            <path d="M4 22 L4 4 L22 4" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            <path d="M154 4 L172 4 L172 22" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 154 L4 172 L22 172" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
            <path d="M154 172 L172 172 L172 154" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" />
          </svg>

          {/* Scan line */}
          {phase === "scanning" && (
            <motion.div
              className="absolute left-2 right-2 h-px"
              style={{ backgroundColor: "rgba(99,102,241,0.6)" }}
              initial={{ top: "10%" }}
              animate={{ top: ["10%", "90%", "10%"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}

          {/* Bounding box */}
          <AnimatePresence>
            {(phase === "classified" || phase === "sorting") && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-5 rounded-lg border-2"
                style={{ borderColor: config.color }}
              >
                <div
                  className="absolute -top-2.5 left-2 rounded px-1.5 py-0.5 font-mono text-[9px] font-bold text-white"
                  style={{ backgroundColor: config.color }}
                >
                  {(item.confidence * 100).toFixed(0)}%
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Item image */}
          <div className="flex h-full items-center justify-center p-6">
            <AnimatePresence mode="wait">
              <motion.img
                key={item.name}
                src={item.image}
                alt={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                className="h-24 w-24 object-contain drop-shadow-lg"
                draggable={false}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Status line */}
      <div className="flex h-5 items-center gap-2">
        {phase === "scanning" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
            <ScanLine className="h-3.5 w-3.5 animate-pulse text-indigo-400/70" />
            <span className="font-mono text-[10px] text-white/30">Analysing...</span>
          </motion.div>
        )}
        {phase === "classified" && (
          <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2">
            <Icon className="h-3.5 w-3.5" style={{ color: config.color }} />
            <span className="font-mono text-[10px] font-semibold" style={{ color: config.color }}>
              {config.label}
            </span>
          </motion.div>
        )}
        {phase === "sorting" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 0.6, repeat: Infinity }} className="flex items-center gap-2">
            <span className="font-mono text-[10px]" style={{ color: config.color }}>Sorting...</span>
          </motion.div>
        )}
      </div>

      {/* Category bins */}
      <div className="flex gap-3">
        {(["general", "recycling", "compost"] as const).map((cat) => {
          const c = categoryConfig[cat];
          const CatIcon = c.icon;
          const isActive = phase !== "scanning" && item.category === cat;
          return (
            <div
              key={cat}
              className="flex flex-col items-center gap-1 rounded-lg border px-3 py-2 transition-all duration-300"
              style={{
                borderColor: isActive ? c.color + "60" : "rgba(255,255,255,0.06)",
                backgroundColor: isActive ? c.color + "15" : "transparent",
              }}
            >
              <CatIcon
                className="h-3.5 w-3.5 transition-colors duration-300"
                style={{ color: isActive ? c.color : "rgba(255,255,255,0.2)" }}
              />
              <span
                className="font-mono text-[7px] font-semibold uppercase tracking-wider transition-colors duration-300"
                style={{ color: isActive ? c.color : "rgba(255,255,255,0.15)" }}
              >
                {c.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main card ──

export function SmartSortBinCard() {
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
        {/* Left: Visualizer panel */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0b] p-6 md:p-8">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(99,102,241,0.08) 0%, transparent 60%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="relative">
            <ClassificationVisualizer inView={isInView} />
          </div>
        </div>

        {/* Right: Content */}
        <div className="relative flex flex-col justify-center p-6 md:p-8">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-display text-4xl text-foreground">Smart Sort Bin</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-indigo-500">
              <Recycle className="h-2.5 w-2.5" />
              EDGE AI
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
            AI-powered waste sorting bin that classifies items using computer vision
            and sorts them into General, Recycling, or Compost via a servo-driven
            mechanism. Dual-mode: offline YOLO or cloud LLM fallback.
          </p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {["YOLO11", "MaixCAM", "ESP32", "Python", "Flask"].map((tech) => (
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
              { label: "Accuracy", value: ">90%", detail: "50-item test batch" },
              { label: "Sort Time", value: "<3s", detail: "detect to drop" },
              { label: "Budget", value: "$155", detail: "AUD total BOM" },
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
              href="https://github.com/SonnyTaylor/smart-sort-bin"
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
              animate={isInView ? { opacity: 1, rotate: 2 } : {}}
              transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <p className="font-handwriting text-lg text-muted-foreground/60">
                VCE systems engineering
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
