"use client";

import { useId } from "react";
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
    company: "Beaumaris North Primary School",
    location: "Beaumaris, VIC",
    date: "2014 - 2019",
    description:
      "Mastered the Cool S. Learned to read and write (mostly). Undefeated at handball.",
    handwritten: true,
  },
];

// ── Layout constants ──
const PCB_W = 56;
const PAD_A = 20;
const PAD_B = 38;
const LED_CX = 28;
const CONTENT_LEFT = PCB_W + 22;
const WIRE_ZONE = 80;
const PCB_EXTENSION = 65;

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
  const padY = 34;

  return (
    <svg width={PCB_W} height="56" viewBox={`0 0 ${PCB_W} 56`} className="block">
      {/* ── SMD Resistor (220Ω current limiter, in series on VCC → anode) ── */}

      {/* Solder mask opening around resistor pads */}
      <rect x={PAD_A - 5.5} y="2" width="11" height="18" rx="1" fill="rgba(140,110,50,0.08)" />

      {/* Top copper pad (VCC input) */}
      <rect x={PAD_A - 4.5} y="3" width="9" height="3.5" rx="0.5" fill="#c9a84a" />
      <rect x={PAD_A - 4.5} y="3" width="9" height="3.5" rx="0.5" fill="#d0d0d0" opacity="0.15" />

      {/* Resistor body */}
      <rect x={PAD_A - 3.5} y="6.5" width="7" height="9" rx="0.8" fill="#1a1a1a" />
      <text x={PAD_A} y="12.5" fill="white" fontSize="3.5" fontFamily="monospace" opacity="0.45" textAnchor="middle">221</text>

      {/* Bottom copper pad (output to LED anode) */}
      <rect x={PAD_A - 4.5} y="15.5" width="9" height="3.5" rx="0.5" fill="#c9a84a" />
      <rect x={PAD_A - 4.5} y="15.5" width="9" height="3.5" rx="0.5" fill="#d0d0d0" opacity="0.15" />

      {/* Resistor silkscreen outline */}
      <rect x={PAD_A - 5} y="2.5" width="10" height="17" rx="0.5" fill="none" stroke="white" strokeWidth="0.4" opacity="0.2" />

      {/* Resistor designator */}
      <text x={PAD_A + 8} y="13" fill="white" fontSize="3.5" fontFamily="monospace" opacity="0.3">R{index}</text>

      {/* ── Trace from resistor output to LED anode ── */}
      <rect x={PAD_A - 1.5} y="19" width="3" height="8" rx="0.5" fill="#8c6e32" opacity="0.30" />

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
    </svg>
  );
}

// ── LED — semicircle dome on cylindrical body ──

function LEDDome({ active }: { active: boolean }) {
  const gradId = useId();
  const cylId = `${gradId}-cyl`;

  return (
    <div className="relative">
      {/* Outer glow — centered on dome */}
      {active && (
        <div
          className="absolute z-0 rounded-full animate-[led-pulse_2s_ease-in-out_infinite]"
          style={{
            left: -14, right: -14, top: -14, height: 48,
            background: "radial-gradient(circle, rgba(34,197,94,0.55) 0%, rgba(34,197,94,0.2) 40%, transparent 70%)",
          }}
        />
      )}
      {/* Inner glow — tight, bright */}
      {active && (
        <div
          className="absolute z-0 rounded-full"
          style={{
            left: -4, right: -4, top: -6, height: 28,
            background: "radial-gradient(circle, rgba(74,222,128,0.6) 0%, rgba(34,197,94,0.15) 60%, transparent 100%)",
          }}
        />
      )}

      <svg width="28" height="34" viewBox="0 0 28 34" className="relative z-10 block">
        <defs>
          <radialGradient id={gradId} cx="0.4" cy="0.3" r="0.65" fx="0.35" fy="0.25">
            {active ? (
              <>
                <stop offset="0%" stopColor="white" />
                <stop offset="8%" stopColor="#dcfce7" />
                <stop offset="22%" stopColor="#86efac" />
                <stop offset="40%" stopColor="#4ade80" />
                <stop offset="62%" stopColor="#22c55e" />
                <stop offset="80%" stopColor="#16a34a" />
                <stop offset="100%" stopColor="#14532d" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#fef9c3" />
                <stop offset="12%" stopColor="#fde047" />
                <stop offset="30%" stopColor="#eab308" />
                <stop offset="55%" stopColor="#a16207" />
                <stop offset="78%" stopColor="#78350f" />
                <stop offset="100%" stopColor="#451a03" stopOpacity="0.85" />
              </>
            )}
          </radialGradient>
          {/* Cylinder body gradient — horizontal, shows round cross-section */}
          <linearGradient id={cylId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={active ? "#0f4a25" : "#3d1a00"} />
            <stop offset="18%" stopColor={active ? "#16a34a" : "#a16207"} />
            <stop offset="42%" stopColor={active ? "#22c55e" : "#ca8a04"} />
            <stop offset="58%" stopColor={active ? "#22c55e" : "#ca8a04"} />
            <stop offset="82%" stopColor={active ? "#16a34a" : "#a16207"} />
            <stop offset="100%" stopColor={active ? "#0f4a25" : "#3d1a00"} />
          </linearGradient>
        </defs>

        {/* Shadow on PCB surface */}
        <ellipse cx="14" cy="28" rx="12" ry="3.5" fill="rgba(0,0,0,0.15)" />

        {/* ── Cylindrical body — prominent straight sides ── */}
        <rect x="3" y="12" width="22" height="12" fill={`url(#${cylId})`} />
        {/* Left edge shadow */}
        <rect x="3" y="12" width="2" height="12" fill="rgba(0,0,0,0.08)" />
        {/* Right edge shadow */}
        <rect x="23" y="12" width="2" height="12" fill="rgba(0,0,0,0.05)" />

        {/* ── Base rim / flange ── */}
        <ellipse cx="14" cy="24" rx="12.5" ry="3.5" fill="#555" opacity="0.45" />
        <ellipse cx="14" cy="23.5" rx="12" ry="3" fill="#777" opacity="0.3" />
        <ellipse cx="14" cy="23" rx="11.5" ry="2.5" fill={active ? "#0f4a25" : "#3d1a00"} opacity="0.2" />

        {/* ── Dome — semicircle (hemisphere) sitting on top of cylinder ── */}
        <path
          d="M3 12 A11 11 0 0 1 25 12 Z"
          fill={`url(#${gradId})`}
        />

        {/* Junction line — dome meets cylinder */}
        <line x1="3" y1="12" x2="25" y2="12" stroke={active ? "#14532d" : "#451a03"} strokeWidth="0.5" opacity="0.12" />

        {/* Primary specular highlight on dome */}
        <ellipse cx="10" cy="5" rx="4" ry="2.5" fill="white" opacity={active ? 0.55 : 0.25} />

        {/* Secondary glint */}
        <ellipse cx="17" cy="9" rx="1.5" ry="1" fill="white" opacity={active ? 0.15 : 0.08} />

        {/* Dome edge arc highlight */}
        <path d="M4 12 A10.5 10.5 0 0 1 24 12" fill="none" stroke="white" strokeWidth="0.5" opacity={active ? 0.1 : 0.04} />

        {/* Cathode flat — right side of dome + cylinder */}
        <line x1="24" y1="4" x2="24" y2="24" stroke={active ? "#14532d" : "#451a03"} strokeWidth="0.8" opacity="0.15" strokeLinecap="round" />

        {/* Subtle cylinder specular — vertical sheen */}
        <rect x="10" y="12" width="2" height="12" rx="1" fill="white" opacity="0.035" />
      </svg>
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
              <div className="absolute z-20" style={{ left: -CONTENT_LEFT, top: -20 }}>
                <SolderPads index={i + 1} />
              </div>

              {/* LED — centered between pads, aligned with title */}
              <div className="absolute z-30" style={{ left: -CONTENT_LEFT + LED_CX - 14, top: -10 }}>
                <LEDDome active={!!exp.active} />
              </div>

              {/* Green LED light cast on PCB surface — opacity-only pulse */}
              {exp.active && (
                <div
                  className="pointer-events-none absolute z-[15] rounded-full animate-[led-surface-pulse_2s_ease-in-out_infinite]"
                  style={{
                    left: -CONTENT_LEFT + LED_CX - 20,
                    top: -6,
                    width: 40,
                    height: 40,
                    background: "radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)",
                  }}
                />
              )}

              <ExperienceEntry
                title={exp.title} company={exp.company}
                location={exp.location} date={exp.date}
                description={exp.description}
              />
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
              {"handwritten" in edu && edu.handwritten ? (
                <HandwrittenEntry title={edu.title} company={edu.company} location={edu.location} date={edu.date} description={edu.description} />
              ) : (
                <ExperienceEntry {...edu} />
              )}
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

function ExperienceEntry({ title, company, location, date, description }: { title: string; company: string; location: string; date: string; description: string }) {
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

function HandwrittenEntry({ title, company, location, date, description }: { title: string; company: string; location: string; date: string; description: string }) {
  return (
    <div className="font-handwriting" style={{ transform: "rotate(-0.5deg)" }}>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-[24px] text-foreground/80">{title}</h3>
        <span className="shrink-0 text-[16px] text-muted-foreground/60">{date}</span>
      </div>
      <p className="mb-2 text-[16px] text-accent/60">{company} · {location}</p>
      <p className="text-[16px] leading-[1.7] text-muted-foreground/60">{description}</p>
    </div>
  );
}

function SectionDivider({ children }: { children: React.ReactNode }) {
  return <h4 className="border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">{children}</h4>;
}
