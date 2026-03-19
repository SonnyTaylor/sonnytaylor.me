"use client";

import { MacbookStatic } from "@/components/ui/macbook-scroll";
import { CuttingMat } from "@/components/ui/cutting-mat";
import { TerminalContent } from "@/components/terminal-content";

const toolSlots = [
  {
    id: "screwdriver",
    label: "Screwdriver",
    className: "top-[4%] left-[3%] w-[12%] aspect-[16/11] -rotate-[15deg]",
  },
  {
    id: "thermal-paste",
    label: "Thermal Paste",
    className: "top-[3%] right-[4%] w-[7%] aspect-[9/7] rotate-[10deg]",
  },
  {
    id: "ram",
    label: "RAM Stick",
    className: "bottom-[20%] left-[2%] w-[10%] aspect-[14/5] -rotate-[5deg]",
  },
  {
    id: "pcb",
    label: "PCB",
    className: "top-[12%] right-[2%] w-[13%] aspect-[18/14] rotate-[8deg]",
  },
  {
    id: "multimeter",
    label: "Multimeter",
    className: "bottom-[10%] right-[3%] w-[9%] aspect-[12/14] -rotate-[12deg]",
  },
  {
    id: "spudger",
    label: "Spudger Tools",
    className: "top-[50%] left-[1%] w-[8%] aspect-[10/7] rotate-[25deg]",
  },
  {
    id: "coffee",
    label: "Coffee",
    className: "bottom-[5%] left-[5%] w-[6%] aspect-square rotate-[3deg]",
  },
  {
    id: "cable",
    label: "Cable Tester",
    className: "bottom-[25%] right-[1%] w-[7%] aspect-[9/10] rotate-[20deg]",
  },
];

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

export function Hero() {
  return (
    <section
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
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.06)_100%)]" />
        </div>

        {/* Tool photo placeholders */}
        {toolSlots.map((slot) => (
          <div key={slot.id} className={`absolute z-10 ${slot.className}`}>
            <div className="flex h-full w-full items-center justify-center rounded-lg border-2 border-dashed border-black/10 bg-black/[0.03] p-2">
              <span className="text-center font-mono text-[9px] text-black/20">
                {slot.label}
              </span>
            </div>
          </div>
        ))}

        {/* Inventory sticker labels */}
        <div className="absolute left-[4%] top-[65%] z-20 -rotate-[3deg] rounded-md border border-black/10 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
            Repair Tech
          </span>
        </div>
        <div className="absolute right-[5%] top-[60%] z-20 rotate-[2deg] rounded-md border border-black/10 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">
            AI-Native Dev
          </span>
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
            <div className="grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
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
