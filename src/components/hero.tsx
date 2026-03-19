"use client";

import { useEffect, useRef, useState } from "react";
import { MacbookStatic } from "@/components/ui/macbook-scroll";
import { CuttingMat } from "@/components/ui/cutting-mat";
import { TerminalContent } from "@/components/terminal-content";

interface ToolItem {
  id: string;
  label: string;
  img: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  shadow: number;
  skewX: number;
  skewY: number;
  /** How "tall" the object sits off the surface — affects shadow spread and DOF. 0 = flat, 1 = tallest */
  elevation?: number;
  /** Parallax speed multiplier. Higher = moves more on scroll. Default ~distance from center */
  parallaxSpeed?: number;
}

const toolSlots: ToolItem[] = [
  { id: "motherboard", label: "Motherboard", img: "/tools/motherboard.webp", x: 72.5, y: -10, width: 43, rotation: 6, shadow: 100, skewX: 0, skewY: 0, elevation: 0.15, parallaxSpeed: 0.15 },
  { id: "multimeter", label: "Multimeter", img: "/tools/multimeter.webp", x: 1.4, y: 64.2, width: 21.9, rotation: -5, shadow: 100, skewX: 0, skewY: 0, elevation: 0.5, parallaxSpeed: 0.12 },
  { id: "spudger", label: "Spudger Tools", img: "/tools/spudger.webp", x: 0.8, y: 43.2, width: 18, rotation: 0, shadow: 40, skewX: 0, skewY: 0, elevation: 0.05, parallaxSpeed: 0.08 },
  { id: "screwdriver", label: "iFixit Screwdriver", img: "/tools/screwdriver.webp", x: 27.1, y: 60.4, width: 10.9, rotation: 20, shadow: 100, skewX: 0, skewY: 0, elevation: 0.3, parallaxSpeed: 0.1 },
  { id: "nothing-phone", label: "Nothing Phone 2a", img: "/tools/nothing-phone.webp", x: 77.6, y: 66.7, width: 17.2, rotation: -8, shadow: 100, skewX: 0, skewY: 0, elevation: 0.2, parallaxSpeed: 0.13 },
  { id: "thermal-paste", label: "Thermal Paste", img: "/tools/thermal-paste.webp", x: 72.6, y: 29.7, width: 11.7, rotation: 15, shadow: 100, skewX: 0, skewY: 0, elevation: 0.4, parallaxSpeed: 0.07 },
  { id: "esp32", label: "ESP32", img: "/tools/esp32.webp", x: 23.9, y: 40.3, width: 5, rotation: -12, shadow: 40, skewX: 0, skewY: 0, elevation: 0.1, parallaxSpeed: 0.05 },
  { id: "laptop-repair", label: "Laptop in Repair", img: "/tools/laptop-repair.webp", x: -3.4, y: -1, width: 36.2, rotation: -15, shadow: 51, skewX: 0, skewY: 0, elevation: 0.15, parallaxSpeed: 0.18 },
  { id: "monster", label: "Monster Energy", img: "/tools/monster.webp", x: 63.8, y: 43.8, width: 18.2, rotation: 8, shadow: 100, skewX: 0, skewY: 0, elevation: 0.7, parallaxSpeed: 0.04 },
];

/** Distance from viewport center (0–1), used for DOF blur */
function distFromCenter(x: number, y: number, w: number): number {
  const cx = x + w / 2;
  const cy = y + (w * 0.6) / 2; // approximate center of item
  const dx = (cx - 50) / 50;
  const dy = (cy - 50) / 50;
  return Math.min(1, Math.sqrt(dx * dx + dy * dy));
}

/** Build realistic shadow: tight contact shadow + softer ambient */
function buildShadow(elevation: number, shadowIntensity: number): string {
  if (shadowIntensity === 0) return "none";
  const amt = shadowIntensity / 100;
  // Contact shadow — tight, dark, barely offset
  const contactY = 1 + elevation * 2;
  const contactBlur = 2 + elevation * 4;
  const contactOpacity = amt * 0.4 * (1 - elevation * 0.3);
  // Ambient shadow — soft, spread out, offset further for taller objects
  const ambientY = 4 + elevation * 12;
  const ambientBlur = 10 + elevation * 20;
  const ambientOpacity = amt * 0.25;
  return [
    `drop-shadow(0 ${contactY}px ${contactBlur}px rgba(0,0,0,${contactOpacity.toFixed(2)}))`,
    `drop-shadow(0 ${ambientY}px ${ambientBlur}px rgba(0,0,0,${ambientOpacity.toFixed(2)}))`,
  ].join(" ");
}

function TerminalCard() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f1219] shadow-2xl shadow-black/40">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 font-mono text-[10px] text-white/25">~/portfolio</span>
      </div>
      {/* Terminal content */}
      <div className="px-4 py-3">
        <TerminalContent compact={false} />
      </div>
    </div>
  );
}

function WorkbenchTool({ slot, scrollY }: { slot: ToolItem; scrollY: number }) {
  const elevation = slot.elevation ?? 0.2;
  const parallax = slot.parallaxSpeed ?? 0.04;
  const dist = distFromCenter(slot.x, slot.y, slot.width);

  // DOF blur: items far from center get slight blur
  const dofBlur = dist > 0.6 ? (dist - 0.6) * 0.8 : 0;

  // Parallax offset based on scroll
  const yOffset = scrollY * parallax;

  const shadow = buildShadow(elevation, slot.shadow);

  return (
    <div
      className="absolute will-change-transform"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        width: `${slot.width}%`,
        transform: `translate3d(0, ${yOffset}px, 0) rotate(${slot.rotation}deg) skewX(${slot.skewX}deg) skewY(${slot.skewY}deg)`,
        filter: [shadow, dofBlur > 0 ? `blur(${dofBlur.toFixed(1)}px)` : ""].filter(Boolean).join(" "),
      }}
    >
      <img
        src={slot.img}
        alt={slot.label}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </div>
  );
}

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      // Only track scroll while hero is visible
      if (rect.bottom > 0) {
        setScrollY(-rect.top);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative flex h-svh w-full flex-col items-center justify-center overflow-hidden"
    >
      {/* ===== MOBILE LAYOUT (< md) ===== */}
      <div className="relative z-20 flex h-full w-full flex-col md:hidden">
        {/* Full-bleed cutting mat background */}
        <div className="absolute inset-0">
          <CuttingMat
            width={400}
            height={850}
            className="h-full w-full"
          />
        </div>

        {/* Content on the mat */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
          {/* Title block */}
          <div className="mb-6 flex flex-col items-center gap-2">
            <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[4px] text-white/50 backdrop-blur-sm">
              Portfolio
            </span>
            <h1 className="font-display text-5xl tracking-tight text-white/90">
              Sonny Taylor
            </h1>
            <p className="font-mono text-xs font-medium text-white/40">
              I ship software with AI and repair stuff
            </p>
          </div>

          {/* Terminal card */}
          <div className="w-full max-w-sm">
            <TerminalCard />
          </div>

          {/* Floating badges */}
          <div className="mt-8 flex gap-3">
            <span className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
              Repair Tech
            </span>
            <span className="rounded-md border border-white/10 bg-white/10 px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-white/50 backdrop-blur-sm">
              AI-Native Dev
            </span>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP LAYOUT (>= md) ===== */}
      <div className="relative hidden h-full w-full md:flex md:flex-col md:items-center md:justify-center">
        {/* Workbench surface background */}
        <div className="absolute inset-0 bg-[#f5f5f0]">
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
          {/* Paper grain / noise texture */}
          <svg className="absolute inset-0 h-full w-full opacity-[0.4]" xmlns="http://www.w3.org/2000/svg">
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
          </svg>
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.08)_100%)]" />
        </div>

        {/* Workbench tools — 16:10 container matching the editor coordinate system */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
          <div className="relative h-full w-full" style={{ aspectRatio: "16/10", maxHeight: "100%", maxWidth: "100%" }}>
            {toolSlots.map((slot) => (
              <WorkbenchTool key={slot.id} slot={slot} scrollY={scrollY} />
            ))}
          </div>
        </div>


        {/* Center content */}
        <div className="relative z-20 flex flex-col items-center px-4">
          <div className="mb-4 flex flex-col items-center gap-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-[4px] text-accent">
              Portfolio
            </span>
            <h1 className="font-display text-6xl tracking-tight text-foreground lg:text-8xl">
              Sonny Taylor
            </h1>
            <p className="font-mono text-sm font-medium text-muted-foreground">
              I ship software with AI and repair stuff
            </p>
          </div>

          {/* MacBook + cutting mat */}
          <div
            className="flex flex-col items-center"
            style={{ zoom: "var(--hero-zoom)" } as React.CSSProperties}
          >
            <div className="relative grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
              <CuttingMat
                width={720}
                height={620}
                className="w-[720px] drop-shadow-lg"
              />
              {/* Contact shadow — larger than the laptop so it peeks out around edges */}
              <div
                className="h-[40rem] w-[38rem] translate-y-[2.5rem]"
                style={{
                  filter: "blur(30px)",
                  background: "radial-gradient(ellipse 100% 70% at 50% 55%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, transparent 75%)",
                }}
              />
              <MacbookStatic showGradient={false}>
                <div className="flex h-full w-full flex-col bg-[#0f1219] p-3">
                  <TerminalContent compact={true} />
                </div>
              </MacbookStatic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
