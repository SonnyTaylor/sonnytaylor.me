"use client";

import { useEffect, useRef } from "react";
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

// ── Directional light source — simulates an overhead desk lamp ──
const LIGHT = { x: 22, y: -8 }; // top-left, slightly above the scene

/** Build directional shadow cast away from the light source.
 *  Static per-object (no scroll dependency) so filter never changes → GPU-friendly. */
function buildDirectionalShadow(
  objX: number, objY: number, objW: number,
  elevation: number, intensity: number,
): string {
  if (intensity === 0) return "none";
  const amt = intensity / 100;

  // Object centre (% coords)
  const cx = objX + objW / 2;
  const cy = objY + (objW * 0.6) / 2;

  // Vector from light → object (not normalised — further objects cast longer shadows)
  const rawDx = (cx - LIGHT.x) * 0.08;
  const rawDy = (cy - LIGHT.y) * 0.08;
  const h = elevation;

  // Warm brown tint
  const warm = "45,30,10";

  // Single combined shadow — blends contact + cast for perf (1 filter op instead of 2)
  const mul = 0.8 + h * 2;
  const offX = rawDx * mul;
  const offY = rawDy * mul + 1.5;
  const blur = 4 + h * 12;
  const alpha = amt * 0.35 * Math.max(0.4, 1 - h * 0.2);

  return `drop-shadow(${offX.toFixed(1)}px ${offY.toFixed(1)}px ${blur.toFixed(1)}px rgba(${warm},${alpha.toFixed(2)}))`;
}

function TerminalCard() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f1219] shadow-2xl shadow-black/40">
      {/* Windows Terminal title bar */}
      <div className="flex items-center border-b border-white/5 bg-[#1a1a2e]">
        <div className="flex items-center gap-2 px-3 py-1.5 border-b-2 border-[#da7758]">
          <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none">
            <path d="M2 3.5L7.5 8L2 12.5" stroke="#da7758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8.5 12.5H14" stroke="#da7758" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="font-mono text-[10px] text-white/50">Claude Code</span>
        </div>
        <div className="ml-auto flex">
          <span className="px-3 py-1.5 text-[10px] text-white/20 hover:text-white/40">─</span>
          <span className="px-3 py-1.5 text-[10px] text-white/20 hover:text-white/40">□</span>
          <span className="px-3 py-1.5 text-[10px] text-white/20 hover:text-white/40">×</span>
        </div>
      </div>
      {/* Terminal content */}
      <div className="px-4 py-3">
        <TerminalContent compact={false} />
      </div>
    </div>
  );
}

/** Pre-compute shadow filter strings at module level (static data). */
const toolFilters = toolSlots.map((slot) => {
  const elevation = slot.elevation ?? 0.2;
  return buildDirectionalShadow(slot.x, slot.y, slot.width, elevation, slot.shadow);
});

function WorkbenchTool({ slot, index }: { slot: ToolItem; index: number }) {
  return (
    <div
      className="absolute"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        width: `${slot.width}%`,
        transform: `rotate(${slot.rotation}deg) skewX(${slot.skewX}deg) skewY(${slot.skewY}deg)`,
        translate: "0 0",
        willChange: "translate",
        filter: toolFilters[index],
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
  const sectionRef = useRef<HTMLElement>(null);
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId = 0;
    let sectionTop = 0;
    let sectionHeight = 0;

    const cachePosition = () => {
      if (sectionRef.current) {
        sectionTop = sectionRef.current.offsetTop;
        sectionHeight = sectionRef.current.offsetHeight;
      }
    };
    cachePosition();

    // Force early rasterization — nudge translate so the browser composites
    // all layers immediately (during load) rather than on first scroll.
    if (toolsRef.current) {
      const ch = toolsRef.current.children;
      for (let i = 0; i < ch.length; i++)
        (ch[i] as HTMLElement).style.translate = "0 0.1px";
      requestAnimationFrame(() => {
        if (!toolsRef.current) return;
        const ch2 = toolsRef.current.children;
        for (let i = 0; i < ch2.length; i++)
          (ch2[i] as HTMLElement).style.translate = "0 0";
      });
    }

    // Pre-compute parallax speeds so the hot loop does zero object lookups
    const speeds = toolSlots.map((s) => s.parallaxSpeed ?? 0.04);

    const update = () => {
      if (!toolsRef.current) return;
      const sy = window.scrollY;
      if (sy > sectionTop + sectionHeight) return; // past the section
      const scrollY = sy - sectionTop;
      const children = toolsRef.current.children;
      for (let i = 0; i < speeds.length && i < children.length; i++) {
        (children[i] as HTMLElement).style.translate = `0 ${scrollY * speeds[i]}px`;
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", cachePosition);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", cachePosition);
      cancelAnimationFrame(rafId);
    };
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
        <div className="absolute inset-0 bg-[#f5f5f0]" style={{ contain: "strict" }}>
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
          {/* Paper grain / noise texture — pre-rasterised PNG, zero runtime cost */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{ backgroundImage: "url(/noise.png)", backgroundRepeat: "repeat" }}
          />
          {/* Lighting & vignette — combined into one element to reduce compositor layers */}
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(ellipse 75% 70% at 20% 10%, rgba(255,240,215,0.30) 0%, rgba(255,235,200,0.12) 35%, transparent 60%)",
                "radial-gradient(ellipse 40% 35% at 85% 90%, rgba(200,210,225,0.06) 0%, transparent 50%)",
                "radial-gradient(ellipse 80% 75% at 30% 35%, transparent 25%, rgba(0,0,0,0.06) 55%, rgba(0,0,0,0.14) 85%, rgba(0,0,0,0.20) 100%)",
              ].join(", "),
            }}
          />
          {/* Warm edge highlight along the top — light hitting desk edge */}
          <div
            className="absolute inset-x-0 top-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent 3%, rgba(255,235,200,0.35) 20%, rgba(255,240,210,0.15) 55%, transparent 80%)" }}
          />
          {/* ── Surface imperfections ── */}

          {/* Coffee ring stain — fresh, mug-sized (~85mm), slightly oval */}
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "5%",
              top: "62%",
              width: "180px",
              height: "170px",
              borderRadius: "50%",
              transform: "rotate(-8deg)",
              background: "radial-gradient(ellipse at center, transparent 39%, rgba(100,65,25,0.07) 43%, rgba(100,65,25,0.12) 46%, rgba(100,65,25,0.14) 48%, rgba(100,65,25,0.08) 51%, rgba(100,65,25,0.03) 54%, transparent 58%)",
            }}
          />
          {/* Coffee ring — older, fainter, overlapping the first */}
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "76%",
              top: "70%",
              width: "165px",
              height: "155px",
              borderRadius: "50%",
              transform: "rotate(12deg)",
              background: "radial-gradient(ellipse at center, transparent 37%, rgba(100,65,25,0.05) 42%, rgba(100,65,25,0.09) 46%, rgba(100,65,25,0.06) 50%, transparent 56%)",
            }}
          />
          {/* Drip trail from a mug being moved */}
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "13%",
              top: "66%",
              width: "80px",
              height: "12px",
              borderRadius: "6px",
              transform: "rotate(-18deg)",
              background: "radial-gradient(ellipse at 20% 50%, rgba(100,65,25,0.08) 0%, rgba(100,65,25,0.04) 50%, transparent 80%)",
            }}
          />

          {/* Scuff / discoloration patches — where hands rest or things get dragged */}
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "38%",
              top: "80%",
              width: "280px",
              height: "120px",
              borderRadius: "40%",
              background: "radial-gradient(ellipse at center, rgba(170,150,110,0.07) 0%, rgba(170,150,110,0.03) 50%, transparent 75%)",
            }}
          />
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "15%",
              top: "30%",
              width: "160px",
              height: "90px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(170,150,110,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Thermal paste smudge — grey smear near the thermal paste tube */}
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "80%",
              top: "36%",
              width: "70px",
              height: "22px",
              borderRadius: "40%",
              transform: "rotate(25deg)",
              background: "radial-gradient(ellipse at 30% 50%, rgba(130,135,140,0.12) 0%, rgba(130,135,140,0.06) 50%, transparent 85%)",
            }}
          />
          {/* Secondary thermal paste dot */}
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "83%",
              top: "40%",
              width: "18px",
              height: "14px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse at center, rgba(130,135,140,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Adhesive residue patch — where tape or a sticker was peeled off */}
          <div
            className="pointer-events-none absolute z-[5]"
            style={{
              left: "28%",
              top: "20%",
              width: "80px",
              height: "55px",
              borderRadius: "25%",
              background: "radial-gradient(ellipse at center, rgba(190,170,120,0.08) 0%, rgba(190,170,120,0.04) 55%, transparent 80%)",
            }}
          />

          {/* Scratch marks, scuffs, nicks, and debris */}
          <svg className="pointer-events-none absolute inset-0 z-[5] h-full w-full" xmlns="http://www.w3.org/2000/svg">
            {/* Longer drag scratches */}
            <line x1="14%" y1="24%" x2="26%" y2="27.5%" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
            <line x1="54%" y1="53%" x2="68%" y2="50%" stroke="rgba(0,0,0,0.07)" strokeWidth="0.7" />
            <line x1="34%" y1="78%" x2="48%" y2="75%" stroke="rgba(0,0,0,0.08)" strokeWidth="0.7" />
            <line x1="79%" y1="18%" x2="90%" y2="16.5%" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
            <line x1="68%" y1="61%" x2="78%" y2="58%" stroke="rgba(0,0,0,0.06)" strokeWidth="0.7" />
            <line x1="8%" y1="48%" x2="16%" y2="46%" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
            {/* Small nicks / gouge marks (screwdriver slips, dropped components) */}
            <circle cx="22%" cy="52%" r="1.8" fill="rgba(0,0,0,0.07)" />
            <circle cx="65%" cy="30%" r="1.4" fill="rgba(0,0,0,0.06)" />
            <circle cx="48%" cy="70%" r="2" fill="rgba(0,0,0,0.05)" />
            <circle cx="88%" cy="55%" r="1.2" fill="rgba(0,0,0,0.05)" />
            <circle cx="35%" cy="15%" r="1.5" fill="rgba(0,0,0,0.04)" />
            <circle cx="12%" cy="75%" r="1.3" fill="rgba(0,0,0,0.05)" />
            <circle cx="75%" cy="85%" r="1.6" fill="rgba(0,0,0,0.04)" />
            {/* Dust / debris specks — scattered around, especially near edges */}
            <circle cx="3%" cy="12%" r="0.8" fill="rgba(60,50,35,0.12)" />
            <circle cx="95%" cy="8%" r="1" fill="rgba(60,50,35,0.10)" />
            <circle cx="7%" cy="88%" r="0.7" fill="rgba(60,50,35,0.10)" />
            <circle cx="92%" cy="85%" r="0.8" fill="rgba(60,50,35,0.08)" />
            <circle cx="50%" cy="4%" r="0.6" fill="rgba(60,50,35,0.08)" />
            <circle cx="15%" cy="95%" r="0.9" fill="rgba(60,50,35,0.10)" />
            <circle cx="85%" cy="45%" r="0.6" fill="rgba(60,50,35,0.08)" />
            <circle cx="60%" cy="92%" r="0.8" fill="rgba(60,50,35,0.10)" />
            <circle cx="97%" cy="50%" r="0.7" fill="rgba(60,50,35,0.09)" />
            <circle cx="2%" cy="40%" r="0.5" fill="rgba(60,50,35,0.08)" />
            {/* Tiny metal shavings / solder splatter near center work area */}
            <circle cx="45%" cy="58%" r="0.5" fill="rgba(80,80,80,0.10)" />
            <circle cx="47%" cy="56%" r="0.4" fill="rgba(80,80,80,0.08)" />
            <circle cx="43%" cy="60%" r="0.6" fill="rgba(80,80,80,0.07)" />
            <circle cx="52%" cy="62%" r="0.4" fill="rgba(80,80,80,0.09)" />
          </svg>
        </div>

        {/* Workbench tools — 16:10 container matching the editor coordinate system */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
          <div ref={toolsRef} className="relative h-full w-full" style={{ aspectRatio: "16/10", maxHeight: "100%", maxWidth: "100%" }}>
            {toolSlots.map((slot, idx) => (
              <WorkbenchTool key={slot.id} slot={slot} index={idx} />
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
                className="w-[720px]"
              />
              {/* Contact shadow — warm-tinted, offset toward light direction.
                  Uses a naturally diffuse gradient instead of blur() filter for perf. */}
              <div
                className="h-[40rem] w-[38rem]"
                style={{
                  transform: "translate(6px, 12px)",
                  background: "radial-gradient(ellipse 115% 85% at 48% 54%, rgba(45,30,15,0.28) 0%, rgba(45,30,15,0.18) 25%, rgba(45,30,15,0.08) 50%, rgba(45,30,15,0.02) 65%, transparent 78%)",
                }}
              />
              {/* Screen glow — cool blue wash on the mat surface in front of the screen */}
              <div
                className="pointer-events-none"
                style={{
                  width: "34rem",
                  height: "20rem",
                  transform: "translateY(6rem)",
                  background: "radial-gradient(ellipse 80% 60% at 50% 15%, rgba(15,18,25,0.12) 0%, rgba(25,35,60,0.06) 30%, transparent 65%)",
                }}
              />
              <MacbookStatic showGradient={false}>
                <div className="flex h-full w-full flex-col bg-[#0f1219]">
                  {/* Windows Terminal title bar */}
                  <div className="flex shrink-0 items-center border-b border-white/5 bg-[#1a1a2e]">
                    <div className="flex items-center gap-1 px-2 py-0.5 border-b border-[#da7758]">
                      <svg viewBox="0 0 16 16" className="h-1.5 w-1.5" fill="none">
                        <path d="M2 3.5L7.5 8L2 12.5" stroke="#da7758" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8.5 12.5H14" stroke="#da7758" strokeWidth="2.5" strokeLinecap="round"/>
                      </svg>
                      <span className="font-mono text-[3px] text-white/50">Claude Code</span>
                    </div>
                    <div className="ml-auto flex">
                      <span className="px-1 text-[3px] text-white/20">─</span>
                      <span className="px-1 text-[3px] text-white/20">□</span>
                      <span className="px-1 text-[3px] text-white/20">×</span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-hidden p-2">
                    <TerminalContent compact={true} />
                  </div>
                </div>
              </MacbookStatic>
              {/* Screen bloom — faint light spill beyond the bezel edges */}
              <div
                className="pointer-events-none"
                style={{
                  width: "36rem",
                  height: "16rem",
                  transform: "translateY(-18rem)",
                  background: "radial-gradient(ellipse 90% 50% at 50% 80%, rgba(30,45,80,0.08) 0%, rgba(20,30,55,0.04) 40%, transparent 70%)",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
