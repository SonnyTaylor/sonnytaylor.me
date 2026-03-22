"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Zap, HardDrive, BatteryMedium, type LucideIcon } from "lucide-react";

// ── Animated service queue visualization ──

interface ServiceItem {
  name: string;
  icon: LucideIcon;
  stage: "queued" | "running" | "done";
}

const FRAME_DURATION = 2000; // ms per frame

const services: { name: string; icon: LucideIcon }[] = [
  { name: "SFC Scan", icon: ShieldCheck },
  { name: "Speedtest", icon: Zap },
  { name: "SMART Check", icon: HardDrive },
  { name: "Battery Report", icon: BatteryMedium },
];

// Build frames: in frame N, services 0..N-1 are done, service N is running, rest queued
const serviceSteps: ServiceItem[][] = Array.from({ length: services.length + 1 }, (_, frame) =>
  services.map((s, i) => ({
    ...s,
    stage: i < frame ? "done" as const : i === frame ? "running" as const : "queued" as const,
  }))
);

function ServiceQueue({ inView }: { inView: boolean }) {
  const [frame, setFrame] = useState(0);
  // Key that resets whenever a new "running" service starts, so the
  // progress bar remounts and replays its 0→100% animation cleanly.
  const [progressKey, setProgressKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((f) => {
        const next = (f + 1) % serviceSteps.length;
        // Reset progress bar when a new service starts running
        const hadRunning = serviceSteps[f].find((s) => s.stage === "running")?.name;
        const hasRunning = serviceSteps[next].find((s) => s.stage === "running")?.name;
        if (hasRunning && hasRunning !== hadRunning) {
          setProgressKey((k) => k + 1);
        }
        return next;
      });
    }, FRAME_DURATION);
    return () => clearInterval(interval);
  }, []);

  const services = serviceSteps[frame];

  return (
    <div className="flex flex-col gap-2">
      {/* Queue header */}
      <div className="flex items-center justify-between px-1">
        <span className="font-mono text-[8px] font-bold uppercase tracking-[2px] text-[#d97a2b]/50">
          Service Queue
        </span>
        <span className="font-mono text-[8px] text-[#d97a2b]/30">
          {services.filter((s) => s.stage === "done").length}/{services.length}
        </span>
      </div>

      {/* Service items */}
      {services.map((service, i) => (
        <motion.div
          key={service.name}
          initial={inView ? { opacity: 0, x: -10 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          className="flex items-center gap-2.5 rounded-lg border px-3 py-2"
          style={{
            borderColor:
              service.stage === "running"
                ? "rgba(217,122,43,0.4)"
                : service.stage === "done"
                  ? "rgba(52,211,153,0.2)"
                  : "rgba(217,122,43,0.1)",
            backgroundColor:
              service.stage === "running"
                ? "rgba(217,122,43,0.08)"
                : service.stage === "done"
                  ? "rgba(52,211,153,0.04)"
                  : "rgba(217,122,43,0.03)",
          }}
        >
          {/* Service icon */}
          <service.icon
            className="h-3.5 w-3.5 shrink-0"
            style={{
              color:
                service.stage === "running"
                  ? "rgba(217,122,43,0.7)"
                  : service.stage === "done"
                    ? "rgba(52,211,153,0.6)"
                    : "rgba(217,122,43,0.25)",
            }}
          />

          <span className="flex-1 font-mono text-[10px] font-medium text-[#f5ede8]/70">
            {service.name}
          </span>

          {/* Status indicator */}
          {service.stage === "queued" && (
            <span className="font-mono text-[8px] text-[#d97a2b]/30">queued</span>
          )}
          {service.stage === "running" && (
            <div className="h-3 w-16 overflow-hidden rounded-full bg-[#d97a2b]/10">
              <motion.div
                key={progressKey}
                className="h-full rounded-full bg-[#d97a2b]/60"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: FRAME_DURATION / 1000, ease: "linear" }}
              />
            </div>
          )}
          {service.stage === "done" && (
            <span className="font-mono text-[8px] text-emerald-400/50">done</span>
          )}
        </motion.div>
      ))}

      {/* Overall progress bar */}
      <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-[#d97a2b]/10">
        <motion.div
          className="h-full rounded-full bg-[#d97a2b]/40"
          animate={{
            width: `${(services.filter((s) => s.stage === "done").length / services.length) * 100}%`,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ── Mini system info readout ──

function SystemReadout({ inView }: { inView: boolean }) {
  const stats = [
    { label: "CPU", value: "i7-12700K", detail: "12C/20T · 3.6GHz" },
    { label: "RAM", value: "32 GB", detail: "DDR5-4800" },
    { label: "Storage", value: "512 GB", detail: "NVMe · 89% healthy" },
  ];

  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
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
  );
}

// ── Main card ──

export function RustServiceCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({
      x: (y - 0.5) * -4,
      y: (x - 0.5) * 4,
    });
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
        {/* ── Left: Content ── */}
        <div className="relative flex flex-col justify-center p-6 md:p-8">
          {/* Title + badge */}
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-display text-4xl text-foreground">RustService</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d97a2b]/20 bg-[#d97a2b]/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-[#d97a2b]">
              <svg className="h-2.5 w-2.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="5.5" y="1" width="5" height="8" rx="1" />
                <rect x="4" y="9" width="8" height="6" rx="1.5" />
              </svg>
              PORTABLE
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Blazing-fast portable toolkit for repair techs. 25+ diagnostic and
            maintenance services with a built-in AI agent — runs straight off a
            USB stick, no install needed.
          </p>

          {/* Tech badges */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {["Tauri", "Rust", "React", "AI Agent", "SQLite"].map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* System readout */}
          <SystemReadout inView={isInView} />

          {/* Bottom row: links + annotation */}
          <div className="mt-5 flex items-end justify-between gap-4">
            <div className="flex gap-2">
              <a
                href="https://github.com/SonnyTaylor/RustService"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                Source
              </a>
              <a
                href="https://rustservice.sonnytaylor.me"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-[#d97a2b] hover:text-[#d97a2b]"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 3H3.5A1.5 1.5 0 002 4.5v8A1.5 1.5 0 003.5 14h8a1.5 1.5 0 001.5-1.5V10M10 2h4m0 0v4m0-4L7 9" />
                </svg>
                Website
              </a>
            </div>

            {/* Handwritten annotation */}
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={isInView ? { opacity: 1, rotate: -2 } : {}}
              transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <p className="font-handwriting text-lg text-muted-foreground/60">
                my daily driver at work
              </p>
            </motion.div>
          </div>
        </div>

        {/* ── Right: Forge-branded visual panel ── */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#1a1614] p-6 md:p-8">
          {/* Shield watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.04]">
            <svg viewBox="0 0 200 240" className="h-[80%] w-[80%]" fill="#d97a2b">
              <path d="M100 10 L180 50 L180 140 Q180 200 100 230 Q20 200 20 140 L20 50 Z" />
            </svg>
          </div>

          {/* Warm gradient glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(217,122,43,0.12) 0%, transparent 60%)",
            }}
          />

          {/* Subtle grid texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(217,122,43,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(217,122,43,0.1) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* Service queue animation */}
          <div className="relative w-full max-w-[240px]">
            <ServiceQueue inView={isInView} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
