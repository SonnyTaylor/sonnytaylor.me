"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  Clock, Package, Phone, LayoutDashboard, Wrench, Brain,
  Users, BarChart3, FileText, Kanban,
} from "lucide-react";

// ── Dashboard demo ──

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Clock, label: "Attendance" },
  { icon: Package, label: "Parts" },
  { icon: Phone, label: "Phone AI" },
  { icon: Kanban, label: "Kanban" },
  { icon: FileText, label: "Wiki" },
];

interface PageData {
  stats: { label: string; value: string; trend: string; color: string }[];
  feed: { icon: typeof Wrench; text: string; time: string }[];
}

// Each nav page gets its own matching content
const pageData: PageData[] = [
  // Dashboard
  {
    stats: [
      { label: "Repairs Today", value: "7", trend: "+2", color: "#ce5d5b" },
      { label: "Revenue", value: "$2.4k", trend: "+18%", color: "#22c55e" },
      { label: "Bookings", value: "5", trend: "+1", color: "#3b82f6" },
    ],
    feed: [
      { icon: Wrench, text: "MacBook screen repair completed", time: "2m ago" },
      { icon: Phone, text: "AI answered call — booking created", time: "8m ago" },
      { icon: BarChart3, text: "Weekly report generated", time: "1h ago" },
    ],
  },
  // Attendance
  {
    stats: [
      { label: "Clocked In", value: "3", trend: "", color: "#22c55e" },
      { label: "Hours Today", value: "18.5", trend: "", color: "#3b82f6" },
      { label: "Avg Start", value: "8:42", trend: "", color: "#f59e0b" },
    ],
    feed: [
      { icon: Users, text: "Sarah clocked in", time: "15m ago" },
      { icon: Clock, text: "Sonny started shift", time: "1h ago" },
      { icon: Users, text: "James clocked out", time: "3h ago" },
    ],
  },
  // Parts
  {
    stats: [
      { label: "Total Parts", value: "842", trend: "+64", color: "#f59e0b" },
      { label: "Suppliers", value: "4", trend: "", color: "#3b82f6" },
      { label: "Last Scrape", value: "2h", trend: "", color: "#22c55e" },
    ],
    feed: [
      { icon: Package, text: "64 new parts from Broadway", time: "2h ago" },
      { icon: Package, text: "Price drop: MacBook screen $89", time: "5h ago" },
      { icon: Package, text: "Phinko stock updated", time: "8h ago" },
    ],
  },
  // Phone AI
  {
    stats: [
      { label: "Calls Today", value: "12", trend: "+5", color: "#ce5d5b" },
      { label: "Bookings Made", value: "4", trend: "+2", color: "#22c55e" },
      { label: "Avg Duration", value: "2:34", trend: "", color: "#3b82f6" },
    ],
    feed: [
      { icon: Phone, text: "Inbound call — repair enquiry", time: "5m ago" },
      { icon: Brain, text: "AI created booking for Thursday", time: "12m ago" },
      { icon: Phone, text: "Call transferred to staff", time: "30m ago" },
    ],
  },
  // Kanban
  {
    stats: [
      { label: "In Progress", value: "4", trend: "", color: "#f59e0b" },
      { label: "Completed", value: "12", trend: "+3", color: "#22c55e" },
      { label: "Blocked", value: "1", trend: "", color: "#ce5d5b" },
    ],
    feed: [
      { icon: Kanban, text: "Laptop repair moved to Testing", time: "10m ago" },
      { icon: Wrench, text: "iMac data recovery completed", time: "25m ago" },
      { icon: Kanban, text: "New ticket: Printer setup", time: "1h ago" },
    ],
  },
  // Wiki
  {
    stats: [
      { label: "Articles", value: "47", trend: "+3", color: "#3b82f6" },
      { label: "Views Today", value: "28", trend: "+8", color: "#22c55e" },
      { label: "AI Generated", value: "12", trend: "", color: "#a855f7" },
    ],
    feed: [
      { icon: FileText, text: "Updated: MacBook repair guide", time: "1h ago" },
      { icon: Brain, text: "AI generated: Printer troubleshooting", time: "3h ago" },
      { icon: FileText, text: "New: Windows 11 setup checklist", time: "1d ago" },
    ],
  },
];

function DashboardDemo({ inView }: { inView: boolean }) {
  const [activeNav, setActiveNav] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setActiveNav((n) => (n + 1) % navItems.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [inView]);

  const page = pageData[activeNav];
  const stats = page.stats;

  return (
    <div className="overflow-hidden rounded-lg border border-[#ce5d5b]/15 bg-[#1e1e1e]">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="flex w-10 shrink-0 flex-col items-center gap-1 border-r border-white/[0.06] bg-[#191919] py-2">
          {navItems.map((item, i) => {
            const Icon = item.icon;
            const isActive = i === activeNav;
            return (
              <div
                key={item.label}
                className="flex h-7 w-7 items-center justify-center rounded-md transition-all duration-200"
                style={{
                  backgroundColor: isActive ? "rgba(206,93,91,0.15)" : "transparent",
                }}
              >
                <Icon
                  className="h-3 w-3 transition-colors duration-200"
                  style={{ color: isActive ? "#ce5d5b" : "rgba(255,255,255,0.2)" }}
                />
              </div>
            );
          })}
        </div>

        {/* Main content */}
        <div className="flex-1 p-2.5">
          {/* Header */}
          <div className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[8px] font-bold text-white/50">
              {navItems[activeNav].label}
            </span>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
              <span className="font-mono text-[6px] text-white/25">Live</span>
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-1.5">
            {stats.map((stat, i) => (
              <motion.div
                key={`${activeNav}-${i}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.2 }}
                className="rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1.5"
              >
                <p className="font-mono text-[6px] text-white/30">{stat.label}</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-mono text-[11px] font-bold" style={{ color: stat.color }}>
                    {stat.value}
                  </span>
                  {stat.trend && (
                    <span className="font-mono text-[6px] text-emerald-400/60">{stat.trend}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mini activity feed */}
          <div className="mt-2 space-y-1">
            {page.feed.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="flex items-center gap-1.5 rounded px-1.5 py-1 bg-white/[0.02]">
                  <Icon className="h-2.5 w-2.5 shrink-0 text-white/20" />
                  <span className="flex-1 font-mono text-[6.5px] text-white/40 truncate">{item.text}</span>
                  <span className="font-mono text-[5.5px] text-white/15 shrink-0">{item.time}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main card ──

export function TechbayDashboardCard() {
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
            <h3 className="font-display text-4xl text-foreground">Techbay Portal</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ce5d5b]/20 bg-[#ce5d5b]/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-[#ce5d5b]">
              <LayoutDashboard className="h-2.5 w-2.5" />
              INTERNAL
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Internal business dashboard for managing repairs, bookings, staff
            attendance, and inventory. Features an AI phone agent, real-time
            kanban boards, parts aggregator, and collaborative wiki.
          </p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {["Next.js", "Firebase", "LiveKit", "xAI", "Tiptap"].map((tech) => (
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
              { label: "Phone AI", value: "Live", detail: "voice agent" },
              { label: "Features", value: "15+", detail: "modules" },
              { label: "Auth", value: "MFA", detail: "TOTP required" },
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
              animate={isInView ? { opacity: 1, rotate: -2 } : {}}
              transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <p className="font-handwriting text-lg text-muted-foreground/60">
                runs the whole shop
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right: Dashboard visual */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#161514] p-5 md:p-6">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(206,93,91,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="relative w-full">
            <DashboardDemo inView={isInView} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
