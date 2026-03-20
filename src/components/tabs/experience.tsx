"use client";

import { motion } from "motion/react";

// ── Data ──

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
  active?: boolean;
  annotation?: { text: string; rotation?: number };
}

const experience: ExperienceItem[] = [
  {
    title: "Junior Repair Technician",
    company: "Techbay Computer Specialists",
    location: "Highett, VIC",
    date: "Jun 2024 - Present",
    description:
      "Diagnose and repair PCs, laptops, and mobile devices. Handle customer interactions, manage inventory, and build internal tools. Developed the company's online store and internal portal from scratch using AI-augmented development.",
    active: true,
    annotation: { text: "built the whole store from scratch!", rotation: -2 },
  },
  {
    title: "Trade Apprentice",
    company: "The Door Taylor",
    location: "Toorak, VIC",
    date: "Jan 2024",
    description:
      "Flooring installation, demolition, and waste removal. Hands-on trade work requiring precision and physical problem-solving.",
    active: false,
    annotation: { text: "learned to measure twice", rotation: 2 },
  },
  {
    title: "Junior IT Technician",
    company: "Yeshivah - Beth Rivkah Colleges",
    location: "St Kilda, VIC",
    date: "Jan 2023",
    description:
      "Refurbished school computers by securely erasing data and reinstalling operating systems. Organised laptops and cables for charging stations across the school.",
    active: false,
    annotation: { text: "first real gig", rotation: -1.5 },
  },
];

const education = [
  {
    title: "VCE",
    company: "Beaumaris Secondary College",
    location: "Cheltenham, VIC",
    date: "2020 - 2025",
    description:
      "Year 12. Subjects: Food Studies, Systems Engineering, English, General Maths, Psychology. Completed Applied Computing.",
  },
  {
    title: "Primary School",
    company: "Cheltenham East Primary School",
    location: "Cheltenham, VIC",
    date: "2014 - 2019",
    description:
      "Mastered the Cool S. Learned to read and write (mostly). Undefeated at handball.",
  },
];

// ── Layout constants ──
const PCB_W = 56;
const PAD_A = 20;
const PAD_B = 38;
const LED_CX = 28;
const FFC_GAP = 22; // flex cable zone between PCB and display
const CONTENT_LEFT = PCB_W + FFC_GAP;
const WIRE_ZONE = 80;
const PCB_EXTENSION = 65;

// ── LED image layout — pin positions measured from the source image ──
const LED_W = 25;
const LED_H = 48;
const LED_LEFT = 16; // left edge on PCB so pins land on PAD_A / PAD_B

// ── Power wires — organic curves with natural imperfections ──

function PowerWires() {
  const pcbTop = WIRE_ZONE - PCB_EXTENSION;
  const landingY = pcbTop + 14;

  return (
    <svg
      className="pointer-events-none absolute z-[15]"
      style={{ left: 0, top: 0, overflow: "visible" }}
      width={PCB_W}
      height={landingY + 15}
    >
      {/* ── Red VCC wire — multi-segment with kinks ── */}
      {/* Shadow */}
      <path
        d={`M-800 ${landingY - 120} C-600 ${landingY - 107}, -420 ${landingY - 83}, -280 ${landingY - 67} C-180 ${landingY - 55}, -90 ${landingY - 29}, -30 ${landingY - 15} C0 ${landingY - 5}, 12 ${landingY + 6}, ${PAD_A} ${landingY + 3}`}
        fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="6" strokeLinecap="round"
      />
      {/* Wire body */}
      <path
        d={`M-800 ${landingY - 122} C-600 ${landingY - 109}, -420 ${landingY - 85}, -280 ${landingY - 69} C-180 ${landingY - 57}, -90 ${landingY - 31}, -30 ${landingY - 17} C0 ${landingY - 7}, 12 ${landingY + 4}, ${PAD_A} ${landingY + 1}`}
        fill="none" stroke="#b71c1c" strokeWidth="5" strokeLinecap="round"
      />
      {/* Silicone sheen highlight */}
      <path
        d={`M-800 ${landingY - 125} C-600 ${landingY - 112}, -420 ${landingY - 88}, -280 ${landingY - 72} C-180 ${landingY - 60}, -90 ${landingY - 34}, -30 ${landingY - 20} C0 ${landingY - 10}, 12 ${landingY + 1}, ${PAD_A} ${landingY - 2}`}
        fill="none" stroke="#e57373" strokeWidth="1.5" strokeLinecap="round" opacity="0.45"
      />
      {/* Solder blob — centered on landing pad */}
      <ellipse cx={PAD_A} cy={landingY} rx="5.5" ry="3.5" fill="#c8c8c8" />
      <ellipse cx={PAD_A} cy={landingY - 1.5} rx="3.5" ry="2" fill="#e8e8e8" opacity="0.6" />

      {/* ── Black GND wire — different curve shape ── */}
      <path
        d={`M-700 ${landingY - 150} C-520 ${landingY - 135}, -370 ${landingY - 99}, -240 ${landingY - 77} C-150 ${landingY - 61}, -70 ${landingY - 35}, -20 ${landingY - 17} C8 ${landingY - 3}, 28 ${landingY + 8}, ${PAD_B} ${landingY + 3}`}
        fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="5.5" strokeLinecap="round"
      />
      <path
        d={`M-700 ${landingY - 152} C-520 ${landingY - 137}, -370 ${landingY - 101}, -240 ${landingY - 79} C-150 ${landingY - 63}, -70 ${landingY - 37}, -20 ${landingY - 19} C8 ${landingY - 5}, 28 ${landingY + 6}, ${PAD_B} ${landingY + 1}`}
        fill="none" stroke="#1a1a1a" strokeWidth="4.5" strokeLinecap="round"
      />
      <path
        d={`M-700 ${landingY - 155} C-520 ${landingY - 140}, -370 ${landingY - 104}, -240 ${landingY - 82} C-150 ${landingY - 66}, -70 ${landingY - 40}, -20 ${landingY - 22} C8 ${landingY - 8}, 28 ${landingY + 3}, ${PAD_B} ${landingY - 2}`}
        fill="none" stroke="#555" strokeWidth="1.2" strokeLinecap="round" opacity="0.3"
      />
      <ellipse cx={PAD_B} cy={landingY} rx="5" ry="3.5" fill="#c8c8c8" />
      <ellipse cx={PAD_B} cy={landingY - 1.5} rx="3" ry="2" fill="#e8e8e8" opacity="0.5" />
    </svg>
  );
}

// ── Continuous PCB strip ──

function PCBStrip() {
  const stripTop = WIRE_ZONE - PCB_EXTENSION;
  const landingLocalY = 14;

  return (
    <div
      className="absolute left-0 z-10"
      style={{
        top: stripTop,
        bottom: 0,
        width: PCB_W,
        borderRadius: 2,
        boxShadow: `
          1px 2px 3px rgba(0,0,0,0.2),
          3px 5px 12px rgba(0,0,0,0.12),
          6px 10px 24px rgba(0,0,0,0.06),
          inset 0 0 0 0.5px rgba(0,0,0,0.3),
          0 0 0 0.8px #a08030,
          0 0 0 1.5px rgba(160,128,48,0.3)
        `,
      }}
    >
      {/* FR4 base color — dark matte green */}
      <div className="absolute inset-0 rounded-[2px]" style={{ background: "#004d22" }} />

      {/* Solder mask sheen — very subtle directional gloss */}
      <div
        className="absolute inset-0 rounded-[2px]"
        style={{
          background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 35%, rgba(0,0,0,0.03) 100%)",
        }}
      />

      {/* Fiberglass weave — fine crosshatch */}
      <div
        className="absolute inset-0 rounded-[2px]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 0.5px, transparent 0.5px, transparent 2.5px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 0.5px, transparent 0.5px, transparent 2.5px)
          `,
        }}
      />

      {/* Subtle color variation — darker patches like real solder mask */}
      <div
        className="absolute rounded-[2px]"
        style={{
          left: 0, top: "20%", right: 0, height: "30%",
          background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.03) 50%, transparent)",
        }}
      />

      {/* Copper traces — visible under solder mask */}
      <div
        className="absolute top-0 bottom-0"
        style={{ left: PAD_A - 2.5, width: 5, background: "rgba(140,110,50,0.22)", borderRadius: 1 }}
      />
      <div
        className="absolute top-0 bottom-0"
        style={{ left: PAD_B - 2.5, width: 5, background: "rgba(140,110,50,0.22)", borderRadius: 1 }}
      />

      {/* Ground pour — faint copper hatching */}
      <div
        className="absolute inset-0 rounded-[2px]"
        style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent 0px, transparent 6px, rgba(140,110,50,0.025) 6px, rgba(140,110,50,0.025) 6.5px)`,
        }}
      />

      {/* Board details SVG overlay */}
      <svg className="absolute inset-0 h-full w-full">
        {/* ── Wire landing pads at top of board ── */}
        <circle cx={PAD_A} cy={landingLocalY} r="7" fill="#8c6e32" opacity="0.5" />
        <circle cx={PAD_A} cy={landingLocalY} r="6" fill="#c9a84a" />
        <circle cx={PAD_A} cy={landingLocalY} r="2.5" fill="#003318" />
        <circle cx={PAD_B} cy={landingLocalY} r="6.5" fill="#8c6e32" opacity="0.5" />
        <circle cx={PAD_B} cy={landingLocalY} r="5.5" fill="#c9a84a" />
        <circle cx={PAD_B} cy={landingLocalY} r="2" fill="#003318" />

        {/* Silkscreen labels — near landing pads */}
        <text x={PAD_A - 7} y={landingLocalY + 15} fill="white" fontSize="4" fontFamily="monospace" opacity="0.35">VCC</text>
        <text x={PAD_B - 7} y={landingLocalY + 15} fill="white" fontSize="4" fontFamily="monospace" opacity="0.35">GND</text>

        {/* Vias — scattered, below landing area */}
        {[
          { x: 8, y: "12%" }, { x: PCB_W - 8, y: "28%" },
          { x: 10, y: "55%" }, { x: PCB_W - 10, y: "72%" },
          { x: 8, y: "90%" }, { x: PCB_W - 7, y: "45%" },
        ].map((v, i) => (
          <g key={i}>
            <circle cx={v.x} cy={v.y} r="2.5" fill="#8c6e32" opacity="0.35" />
            <circle cx={v.x} cy={v.y} r="1.3" fill="#003318" />
          </g>
        ))}
      </svg>

      {/* Board edge outline */}
      <div
        className="absolute rounded-[1px]"
        style={{ inset: 1.5, border: "0.5px solid rgba(255,255,255,0.06)" }}
      />

      {/* Bottom edge — copper edge plating */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-b-[2px]"
        style={{
          height: 2.5,
          background: "linear-gradient(180deg, #a08030 0%, #8a6e28 100%)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
}

// ── Solder pads with SMD resistor ──

function SolderPads({ index }: { index: number }) {
  const padY = 50;
  const resY = 2;

  return (
    <svg width={PCB_W} height="72" viewBox={`0 0 ${PCB_W} 72`} className="block" style={{ overflow: "visible" }}>
      {/* ── SMD Resistor (220Ω current limiter, in series on VCC → anode) ── */}

      {/* Solder mask opening around resistor pads */}
      <rect x={PAD_A - 5.5} y={resY} width="11" height="18" rx="1" fill="rgba(140,110,50,0.08)" />

      {/* Top copper pad (VCC input) */}
      <rect x={PAD_A - 4.5} y={resY + 1} width="9" height="3.5" rx="0.5" fill="#c9a84a" />
      <rect x={PAD_A - 4.5} y={resY + 1} width="9" height="3.5" rx="0.5" fill="#d0d0d0" opacity="0.15" />

      {/* Resistor body */}
      <rect x={PAD_A - 3.5} y={resY + 4.5} width="7" height="9" rx="0.8" fill="#1a1a1a" />
      <text x={PAD_A} y={resY + 10.5} fill="white" fontSize="3.5" fontFamily="monospace" opacity="0.45" textAnchor="middle">221</text>

      {/* Bottom copper pad (output to LED anode) */}
      <rect x={PAD_A - 4.5} y={resY + 13.5} width="9" height="3.5" rx="0.5" fill="#c9a84a" />
      <rect x={PAD_A - 4.5} y={resY + 13.5} width="9" height="3.5" rx="0.5" fill="#d0d0d0" opacity="0.15" />

      {/* Resistor silkscreen outline */}
      <rect x={PAD_A - 5} y={resY + 0.5} width="10" height="17" rx="0.5" fill="none" stroke="white" strokeWidth="0.4" opacity="0.2" />

      {/* Resistor designator */}
      <text x={PAD_A + 8} y={resY + 11} fill="white" fontSize="3.5" fontFamily="monospace" opacity="0.3">R{index}</text>

      {/* ── Trace from resistor output to LED anode ── */}
      <rect x={PAD_A - 1.5} y={resY + 17} width="3" height={padY - resY - 24} rx="0.5" fill="#8c6e32" opacity="0.30" />

      {/* ── LED Pads ── */}

      {/* Solder mask openings — exposed copper ring around pads */}
      <rect x={PAD_A - 8.5} y={padY - 8.5} width="17" height="17" rx="2.5" fill="rgba(140,110,50,0.08)" />
      <circle cx={PAD_B} cy={padY} r="8.5" fill="rgba(140,110,50,0.08)" />

      {/* Anode pad — square for polarity indication (ENIG gold finish) */}
      <rect x={PAD_A - 7} y={padY - 7} width="14" height="14" rx="2" fill="#8c6e32" />
      <rect x={PAD_A - 6} y={padY - 6} width="12" height="12" rx="1.5" fill="#b8943e" />
      <rect x={PAD_A - 5} y={padY - 5} width="10" height="10" rx="1.5" fill="#c9a84a" />
      {/* Drill hole */}
      <circle cx={PAD_A} cy={padY} r="2.5" fill="#003318" />

      {/* Cathode pad — round (ENIG gold finish), matching size */}
      <circle cx={PAD_B} cy={padY} r="7" fill="#8c6e32" />
      <circle cx={PAD_B} cy={padY} r="6" fill="#b8943e" />
      <circle cx={PAD_B} cy={padY} r="5" fill="#c9a84a" />
      {/* Drill hole */}
      <circle cx={PAD_B} cy={padY} r="2" fill="#003318" />

      {/* Trace stub under LED body */}
      <rect x={LED_CX - 5} y={padY - 1.5} width="10" height="3" rx="1" fill="#8c6e32" opacity="0.28" />

      {/* Polarity marker — anode (+) */}
      <text x={PAD_A - 11} y={padY + 2} fill="white" fontSize="5" fontFamily="monospace" opacity="0.3">+</text>

      {/* LED silkscreen outline — circle with cathode flat */}
      <circle cx={LED_CX} cy={padY} r="11" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1={LED_CX + 9} y1={padY - 8} x2={LED_CX + 9} y2={padY + 8} stroke="white" strokeWidth="0.7" opacity="0.2" />

      {/* LED designator */}
      <text x="3" y={padY - 11} fill="white" fontSize="4.5" fontFamily="monospace" opacity="0.35">D{index}</text>

      {/* ── FPC connector footprint — right edge, data bus to display ── */}

      {/* Horizontal traces branching from power rails to connector */}
      <rect x={PAD_A + 3} y={padY - 20} width={PCB_W - PAD_A - 8} height="1" rx="0.3" fill="#8c6e32" opacity="0.25" />
      <rect x={PAD_A + 3} y={padY - 16} width={PCB_W - PAD_A - 8} height="1" rx="0.3" fill="#8c6e32" opacity="0.25" />
      <rect x={PAD_B - 2} y={padY - 12} width={PCB_W - PAD_B - 3} height="1" rx="0.3" fill="#8c6e32" opacity="0.25" />
      <rect x={PAD_B - 2} y={padY - 8} width={PCB_W - PAD_B - 3} height="1" rx="0.3" fill="#8c6e32" opacity="0.25" />
      {/* Additional signal traces */}
      {[-22, -18, -6, -4, -2].map((dy, i) => (
        <rect key={`sig-${i}`} x={PCB_W - 14} y={padY + dy} width={10} height="0.7" rx="0.2" fill="#8c6e32" opacity="0.18" />
      ))}

      {/* ZIF connector body — beige plastic */}
      <rect x={PCB_W - 5} y={padY - 24} width="7" height="22" rx="0.8" fill="#d4cbb8" />
      <rect x={PCB_W - 5} y={padY - 24} width="7" height="22" rx="0.8" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.4" />
      {/* Gold contact pads inside connector */}
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={`jpad-${i}`} x={PCB_W - 4} y={padY - 22 + i * 2.4} width="2.5" height="1.4" rx="0.3" fill="#c9a84a" />
      ))}
      {/* Latch lever */}
      <rect x={PCB_W + 1} y={padY - 23} width="1.5" height="20" rx="0.4" fill="#333" />
      {/* Silkscreen connector label */}
      <text x={PCB_W - 13} y={padY - 25} fill="white" fontSize="3.5" fontFamily="monospace" opacity="0.25">J1</text>
    </svg>
  );
}

// ── LED — semicircle dome on cylindrical body ──

function LEDDome({ active }: { active: boolean }) {
  return (
    <div className="relative" style={{ width: LED_W, height: LED_H }}>
      {/* Outer glow — centered on dome */}
      {active && (
        <div
          className="absolute z-0 rounded-full animate-[led-pulse_2s_ease-in-out_infinite]"
          style={{
            left: -14, right: -14, top: -10, height: 48,
            background: "radial-gradient(circle, rgba(34,197,94,0.55) 0%, rgba(34,197,94,0.2) 40%, transparent 70%)",
          }}
        />
      )}
      {/* Inner glow — tight, bright */}
      {active && (
        <div
          className="absolute z-0 rounded-full"
          style={{
            left: -4, right: -4, top: -4, height: 28,
            background: "radial-gradient(circle, rgba(74,222,128,0.6) 0%, rgba(34,197,94,0.15) 60%, transparent 100%)",
          }}
        />
      )}

      {/* Real LED image — colorised with sepia → hue-rotate */}
      <img
        src="/tools/led-red.webp"
        alt=""
        draggable={false}
        className="relative z-10 block"
        style={{
          width: LED_W,
          height: LED_H,
          objectFit: "contain",
          filter: active
            ? "sepia(1) hue-rotate(90deg) saturate(3) brightness(1.05) drop-shadow(0 0 3px rgba(34,197,94,0.4))"
            : "sepia(1) hue-rotate(10deg) saturate(2) brightness(0.85)",
        }}
      />
    </div>
  );
}

// ── Flat flex cable (FFC) — polyimide with visible conductors ──

function FlexCable() {
  return (
    <div className="relative h-full w-full">
      {/* Cable shadow */}
      <div
        className="absolute"
        style={{ left: 0, right: 0, top: 2, bottom: -1, background: "rgba(0,0,0,0.06)", borderRadius: 0.5 }}
      />
      {/* Polyimide base — semi-transparent orange */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, #d4983e 0%, #c08030 30%, #a87028 70%, #966020 100%)",
          borderRadius: 0.5,
          opacity: 0.85,
        }}
      />
      {/* Conductor traces — visible through polyimide */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{ left: 0, right: 0, top: 1.5 + i * 1.3, height: 0.6, background: "rgba(190,140,50,0.55)" }}
        />
      ))}
      {/* Polyimide sheen */}
      <div
        className="absolute"
        style={{
          left: 2, right: 2, top: 0, height: "35%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.12), transparent)",
          borderRadius: "0.5px 0.5px 0 0",
        }}
      />
    </div>
  );
}

// ── Display module — FR4 PCB carrier with e-ink panel, driver IC, passives ──

function DisplayModule({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div
      className="relative rounded-[2px]"
      style={{
        boxShadow: `
          1px 2px 3px rgba(0,0,0,0.15),
          3px 5px 10px rgba(0,0,0,0.08),
          inset 0 0 0 0.5px rgba(0,0,0,0.25),
          0 0 0 0.8px #a08030,
          0 0 0 1.5px rgba(160,128,48,0.3)
        `,
      }}
    >
      {/* ── PCB layers ── */}

      {/* FR4 base — dark matte green */}
      <div className="absolute inset-0 rounded-[2px]" style={{ background: "#004d22" }} />
      {/* Fiberglass weave */}
      <div
        className="absolute inset-0 rounded-[2px]"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 0.5px, transparent 0.5px, transparent 2.5px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 0.5px, transparent 0.5px, transparent 2.5px)
          `,
        }}
      />
      {/* Solder mask sheen */}
      <div
        className="absolute inset-0 rounded-[2px]"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.06) 0%, transparent 35%, rgba(0,0,0,0.03) 100%)" }}
      />
      {/* Ground pour hatching */}
      <div
        className="absolute inset-0 rounded-[2px]"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0px, transparent 6px, rgba(140,110,50,0.025) 6px, rgba(140,110,50,0.025) 6.5px)" }}
      />

      {/* ── Content area — e-ink panel sits here ── */}
      <div className="relative" style={{ padding: "8px 8px 26px 8px" }}>
        {/* E-ink screen panel */}
        <div
          className="relative overflow-hidden rounded-[1px]"
          style={{
            background: "#dfddd6",
            padding: "10px 12px",
            boxShadow: "inset 0 0.5px 1px rgba(0,0,0,0.08), 0 0 0 0.5px rgba(0,0,0,0.1)",
          }}
        >
          {/* Paper grain — fine noise texture */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
              backgroundSize: "150px 150px",
            }}
          />
          {/* Pixel grid — faint e-ink subpixel structure */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                repeating-linear-gradient(0deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 0.5px, transparent 0.5px, transparent 2px),
                repeating-linear-gradient(90deg, rgba(0,0,0,0.015) 0px, rgba(0,0,0,0.015) 0.5px, transparent 0.5px, transparent 2px)
              `,
            }}
          />
          {/* Uneven lighting — characteristic e-ink look */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse at 25% 15%, rgba(255,255,255,0.06) 0%, transparent 55%), radial-gradient(ellipse at 85% 85%, rgba(0,0,0,0.03) 0%, transparent 45%)",
            }}
          />
          <div className="relative">{children}</div>
        </div>
      </div>

      {/* ── Mounting holes — 4 corners ── */}
      {[
        { left: 3, top: 3 },
        { right: 3, top: 3 },
        { left: 3, bottom: 5 },
        { right: 3, bottom: 5 },
      ].map((pos, i) => (
        <div key={`mh-${i}`} className="pointer-events-none absolute" style={pos}>
          <svg width="6" height="6" viewBox="0 0 6 6">
            <circle cx="3" cy="3" r="3" fill="#8c6e32" opacity="0.4" />
            <circle cx="3" cy="3" r="1.8" fill="#003318" />
          </svg>
        </div>
      ))}

      {/* ── ZIF connector — left edge, receives FFC from main PCB ── */}
      <div className="pointer-events-none absolute" style={{ left: 1, top: 28, width: 8, height: 18 }}>
        {/* Connector body — beige plastic */}
        <div className="absolute inset-0 rounded-[1px]" style={{ background: "#d4cbb8", boxShadow: "0 0.5px 1px rgba(0,0,0,0.15)" }} />
        {/* Gold contact pads */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute" style={{ left: 1, top: 2 + i * 1.8, width: 3, height: 1, borderRadius: 0.3, background: "#c9a84a" }} />
        ))}
        {/* Latch lever — flips open to accept cable */}
        <div className="absolute" style={{ left: -1.5, top: 1, width: 1.5, height: 16, borderRadius: "0.5px 0 0 0.5px", background: "#333" }} />
        {/* Silkscreen */}
        <div className="absolute font-mono" style={{ left: 10, top: 5, fontSize: 3, color: "rgba(255,255,255,0.2)" }}>J2</div>
      </div>

      {/* ── Bottom component area — driver IC, passives, traces ── */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-[2px]" style={{ height: 24 }}>

        {/* Copper traces — from ZIF connector to driver IC */}
        <svg className="absolute" style={{ left: 10, top: 0, width: 80, height: 24 }} viewBox="0 0 80 24">
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1="0" y1={4 + i * 1.8}
              x2={28 + i * 0.5} y2={4 + i * 2.1}
              stroke="#8c6e32" strokeWidth="0.7" opacity="0.28"
            />
          ))}
          {/* Traces from IC to panel flex connector */}
          <rect x="44" y="7" width="25" height="0.7" rx="0.2" fill="#8c6e32" opacity="0.22" />
          <rect x="44" y="10" width="25" height="0.7" rx="0.2" fill="#8c6e32" opacity="0.22" />
          <rect x="44" y="13" width="20" height="0.7" rx="0.2" fill="#8c6e32" opacity="0.22" />
          <rect x="44" y="16" width="15" height="0.7" rx="0.2" fill="#8c6e32" opacity="0.22" />
        </svg>

        {/* Driver IC — SSD1681 QFN package */}
        <div className="absolute" style={{ left: 40, top: 4, width: 14, height: 16 }}>
          <div className="absolute inset-0 rounded-[0.5px]" style={{ background: "#1a1a1a", boxShadow: "0 0.5px 1px rgba(0,0,0,0.25)" }} />
          {/* Die label */}
          <span className="absolute block font-mono" style={{ left: 2, top: 5, fontSize: 2.5, color: "rgba(255,255,255,0.25)", letterSpacing: 0.3, lineHeight: 1 }}>
            SSD<br />1681
          </span>
          {/* Pin 1 dot */}
          <div className="absolute rounded-full" style={{ left: 1.5, top: 1.5, width: 1.5, height: 1.5, background: "rgba(255,255,255,0.2)" }} />
          {/* QFN pads — left edge */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`l-${i}`} className="absolute" style={{ left: -0.5, top: 2.5 + i * 3.2, width: 1, height: 2, background: "#c9a84a", borderRadius: 0.2 }} />
          ))}
          {/* QFN pads — right edge */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={`r-${i}`} className="absolute" style={{ right: -0.5, top: 2.5 + i * 3.2, width: 1, height: 2, background: "#c9a84a", borderRadius: 0.2 }} />
          ))}
          {/* QFN pads — bottom edge */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={`b-${i}`} className="absolute" style={{ left: 2.5 + i * 3.5, bottom: -0.5, width: 2, height: 1, background: "#c9a84a", borderRadius: 0.2 }} />
          ))}
        </div>

        {/* Decoupling caps — 0402 MLCC ceramic */}
        {[58, 64, 70].map((x, i) => (
          <div key={`cap-${i}`} className="absolute" style={{ left: x, top: 7 + i * 5, width: 4, height: 2.5 }}>
            {/* Left solder pad */}
            <div className="absolute" style={{ left: 0, top: 0, width: 1, height: 2.5, borderRadius: "0.3px 0 0 0.3px", background: "#c9a84a" }} />
            {/* Ceramic body */}
            <div className="absolute" style={{ left: 1, top: 0.3, width: 2, height: 1.9, background: "#8B7355", borderRadius: 0.2 }} />
            {/* Right solder pad */}
            <div className="absolute" style={{ right: 0, top: 0, width: 1, height: 2.5, borderRadius: "0 0.3px 0.3px 0", background: "#c9a84a" }} />
          </div>
        ))}

        {/* Vias near IC — for ground/power connections */}
        {[
          { x: 36, y: 8 }, { x: 36, y: 15 },
          { x: 56, y: 19 },
        ].map((v, i) => (
          <svg key={`via-${i}`} className="absolute" style={{ left: v.x, top: v.y }} width="4" height="4" viewBox="0 0 4 4">
            <circle cx="2" cy="2" r="2" fill="#8c6e32" opacity="0.35" />
            <circle cx="2" cy="2" r="1" fill="#003318" />
          </svg>
        ))}

        {/* Silkscreen — component designators */}
        <span className="absolute font-mono" style={{ left: 40, bottom: 1, fontSize: 2.5, color: "rgba(255,255,255,0.2)" }}>U1</span>
        <span className="absolute font-mono" style={{ left: 58, bottom: 1, fontSize: 2, color: "rgba(255,255,255,0.18)" }}>C1</span>
        <span className="absolute font-mono" style={{ left: 64, bottom: 1, fontSize: 2, color: "rgba(255,255,255,0.18)" }}>C2</span>

        {/* Module designator — silkscreen */}
        <span className="absolute font-mono" style={{ right: 8, top: 3, fontSize: 3.5, color: "rgba(255,255,255,0.22)", letterSpacing: 0.5 }}>
          DISP-{index}
        </span>
      </div>

      {/* ── Panel flex ribbon — thin FFC from e-ink glass to driver IC ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: 40, bottom: 24, width: 14, height: 4,
          background: "linear-gradient(180deg, transparent 0%, #b8843a 15%, #a67830 85%, transparent 100%)",
          opacity: 0.45,
        }}
      />

      {/* ── Edge plating — bottom ── */}
      <div
        className="absolute bottom-0 left-0 right-0 rounded-b-[2px]"
        style={{
          height: 2,
          background: "linear-gradient(180deg, #a08030 0%, #8a6e28 100%)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        }}
      />
    </div>
  );
}

// ── Margin note ──

function MarginNote({ text, rotation = 0, align }: { text: string; rotation?: number; align: "left" | "center" | "right" }) {
  const cls = align === "right" ? "ml-auto mr-4" : align === "center" ? "mx-auto" : "ml-4";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`pointer-events-none mt-3 w-fit ${cls}`}
    >
      <span className="inline-block font-handwriting text-[16px] text-accent/50" style={{ transform: `rotate(${rotation}deg)` }}>
        — {text}
      </span>
    </motion.div>
  );
}

// ── Main component ──

export function ExperienceTab() {
  const aligns: Array<"left" | "center" | "right"> = ["right", "left", "center"];

  return (
    <div>
      <SectionLabel>Experience</SectionLabel>
      <PageTitle>Where I&apos;ve <em>worked</em></PageTitle>

      {/* ── Desktop ── */}
      <div className="relative mt-12 hidden md:block">
        <PowerWires />
        <PCBStrip />

        {/* Wire landing zone — keeps wires above first LED */}
        <div style={{ height: WIRE_ZONE }} />

        {/* Entries */}
        <div className="relative z-20 space-y-16" style={{ paddingLeft: CONTENT_LEFT }}>
          {experience.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="relative"
            >
              {/* Solder pads + resistor on PCB */}
              <div className="absolute z-20" style={{ left: -CONTENT_LEFT, top: 0 }}>
                <SolderPads index={i + 1} />
              </div>

              {/* LED — pin-aligned to solder pads */}
              <div className="absolute z-30" style={{ left: -CONTENT_LEFT + LED_LEFT, top: 4 }}>
                <LEDDome active={!!exp.active} />
              </div>

              {/* Green LED light cast on PCB surface — opacity-only pulse */}
              {exp.active && (
                <div
                  className="pointer-events-none absolute z-[15] rounded-full animate-[led-surface-pulse_2s_ease-in-out_infinite]"
                  style={{
                    left: -CONTENT_LEFT + LED_CX - 20,
                    top: 14,
                    width: 40,
                    height: 40,
                    background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
                  }}
                />
              )}

              {/* FFC cable — spans gap between main PCB and display module */}
              <div className="absolute z-[12]" style={{ left: -FFC_GAP, top: 28, width: FFC_GAP, height: 14 }}>
                <FlexCable />
              </div>

              <DisplayModule index={i + 1}>
                <ExperienceEntry
                  title={exp.title} company={exp.company}
                  location={exp.location} date={exp.date}
                  description={exp.description}
                  eink
                />
              </DisplayModule>
              {exp.annotation && (
                <MarginNote text={exp.annotation.text} rotation={exp.annotation.rotation} align={aligns[i]} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Mobile ── */}
      <div className="mt-10 space-y-10 md:hidden">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="flex items-start gap-3"
          >
            <div className="mt-1 flex-shrink-0"><LEDDome active={!!exp.active} /></div>
            <div className="min-w-0 flex-1">
              <ExperienceEntry title={exp.title} company={exp.company} location={exp.location} date={exp.date} description={exp.description} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Education ── */}
      <div className="mt-16">
        <SectionDivider>Education</SectionDivider>
        <div className="relative mt-6 space-y-8">
          {/* Pencil — left side, laid diagonally as if someone just put it down */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="pointer-events-none absolute z-10 hidden md:block"
            style={{
              left: -240,
              top: -30,
              width: 220,
              transform: "rotate(-30deg)",
              filter: "drop-shadow(2px 3px 4px rgba(45,30,10,0.25)) drop-shadow(5px 8px 16px rgba(45,30,10,0.12))",
            }}
          >
            <img src="/tools/pencil.webp" alt="" className="w-full" draggable={false} />
          </motion.div>

          {/* Cool S — right side, like a doodle on paper placed on the desk */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 8 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pointer-events-none absolute z-10 hidden md:block"
            style={{
              right: -100,
              top: "45%",
              width: 40,
              transform: "translateY(-50%) rotate(8deg)",
              filter: "drop-shadow(1px 2px 3px rgba(45,30,10,0.2)) drop-shadow(3px 6px 12px rgba(45,30,10,0.1))",
            }}
          >
            {/* Inline Cool S — pencil-graphite style */}
            <svg viewBox=".5 .5 5 11" className="w-full" style={{ stroke: "#3a3a3a", strokeWidth: 0.35 }}>
              <path id="cool-s-half" fill="none" d="M3 9V7L1 5V3L3 1 5 3V5L4 6" />
              <use xlinkHref="#cool-s-half" transform="rotate(180 3 6)" />
            </svg>
          </motion.div>

          {education.map((edu, i) => (
            <motion.div key={edu.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}>
              <ExperienceEntry {...edu} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Certifications ── */}
      <div className="mt-16">
        <SectionDivider>Certifications</SectionDivider>
        <div className="mt-6 space-y-5">
          {[
            { name: "Google IT Support Professional Certificate", issuer: "Coursera", date: "2024" },
            { name: "Operating Systems Basics", issuer: "Cisco Networking Academy", date: "Oct 2023" },
            { name: "Computer Hardware Basics", issuer: "Cisco Networking Academy", date: "Oct 2023" },
            { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Oct 2023" },
            { name: "Python for Beginners", issuer: "Grok Learning", date: "Sep 2023" },
          ].map((cert, i) => (
            <motion.div key={cert.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }} className="space-y-1">
              <p className="font-mono text-sm text-foreground">{cert.name}</p>
              <p className="font-mono text-[11px] text-muted-foreground">{cert.issuer} · {cert.date}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Shared sub-components ──

function ExperienceEntry({ title, company, location, date, description, eink }: { title: string; company: string; location: string; date: string; description: string; eink?: boolean }) {
  if (eink) {
    return (
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-mono text-[15px] font-bold uppercase tracking-wide" style={{ color: "#111" }}>{title}</h3>
          <span className="shrink-0 font-mono text-[9px] font-medium" style={{ color: "#222" }}>{date}</span>
        </div>
        {/* Pixel-row divider — like a 1px line on a low-res display */}
        <div style={{ height: 1, background: "#222", margin: "4px 0 5px", opacity: 0.2 }} />
        <p className="font-mono text-[10px] font-semibold" style={{ color: "#111" }}>{company} · {location}</p>
        <p className="mt-1.5 font-mono text-[10px] leading-[1.65]" style={{ color: "#222" }}>{description}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-[22px] text-foreground">{title}</h3>
        <span className="shrink-0 font-mono text-[10px] font-medium text-muted-foreground">{date}</span>
      </div>
      <p className="mb-2 font-mono text-[11px] font-medium text-accent">{company} · {location}</p>
      <p className="font-mono text-[11px] leading-[1.7] text-muted-foreground">{description}</p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">{children}</p>;
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-5xl text-foreground [&>em]:italic [&>em]:text-muted-foreground">{children}</h2>;
}

function SectionDivider({ children }: { children: React.ReactNode }) {
  return <h4 className="border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">{children}</h4>;
}
