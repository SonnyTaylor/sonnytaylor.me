"use client";

import { MacbookStatic } from "@/components/ui/macbook-scroll";
import { CuttingMat } from "@/components/ui/cutting-mat";

const toolSlots = [
  {
    id: "screwdriver",
    label: "Screwdriver",
    className: "top-[4%] left-[3%] w-[160px] h-[110px] -rotate-[15deg]",
  },
  {
    id: "thermal-paste",
    label: "Thermal Paste",
    className: "top-[3%] right-[4%] w-[90px] h-[70px] rotate-[10deg]",
  },
  {
    id: "ram",
    label: "RAM Stick",
    className: "bottom-[20%] left-[2%] w-[140px] h-[50px] -rotate-[5deg]",
  },
  {
    id: "pcb",
    label: "PCB",
    className: "top-[12%] right-[2%] w-[180px] h-[140px] rotate-[8deg]",
  },
  {
    id: "multimeter",
    label: "Multimeter",
    className: "bottom-[10%] right-[3%] w-[120px] h-[140px] -rotate-[12deg]",
  },
  {
    id: "spudger",
    label: "Spudger Tools",
    className: "top-[50%] left-[1%] w-[100px] h-[70px] rotate-[25deg]",
  },
  {
    id: "coffee",
    label: "Coffee",
    className: "bottom-[5%] left-[5%] w-[80px] h-[80px] rotate-[3deg]",
  },
  {
    id: "cable",
    label: "Cable Tester",
    className: "bottom-[25%] right-[1%] w-[90px] h-[100px] rotate-[20deg]",
  },
];

export function Hero() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
    >
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
          {/*
            Replace with:
            <img src={`/tools/${slot.id}.png`} alt={slot.label}
              className="w-full h-full object-contain drop-shadow-lg" />
          */}
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

      {/* Center content - title + macbook */}
      <div className="relative z-20 flex flex-col items-center pt-24">
        {/* Title */}
        <div className="mb-4 flex flex-col items-center gap-2">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[4px] text-accent">
            Portfolio
          </span>
          <h1 className="font-display text-6xl tracking-tight text-foreground md:text-8xl">
            Sonny Taylor
          </h1>
          <p className="font-mono text-sm font-medium text-muted-foreground">
            I ship software with AI
          </p>
        </div>

        {/* MacBook on cutting mat */}
        <div className="relative">
          <CuttingMat className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[48%] w-[min(90vw,700px)] drop-shadow-lg" />
          <MacbookStatic showGradient={false}>
            <div className="flex h-full w-full flex-col bg-[#0f1219] p-3 font-mono text-[6px] leading-relaxed text-green-400/80">
              <div className="mb-1 flex gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/60" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-500/60" />
              </div>
              <p className="text-white/40">~/portfolio</p>
              <p><span className="text-blue-400">$</span> bun run dev</p>
              <p className="text-white/50">▲ Next.js 16.2.0 (Turbopack)</p>
              <p className="text-white/50">- Local: http://localhost:3001</p>
              <p className="text-green-400/60">✓ Ready in 818ms</p>
              <p className="mt-1"><span className="text-blue-400">$</span> <span className="animate-pulse">_</span></p>
            </div>
          </MacbookStatic>
        </div>
      </div>
    </section>
  );
}
