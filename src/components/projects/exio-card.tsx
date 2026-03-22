"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";

// ── Vertical network topology for the visual panel ──

function NetworkDiagram() {
  // Nodes are evenly spaced vertically across the viewBox
  // viewBox is 280x400, nodes centered at y: 55, 150, 250, 345
  const nodes = [
    { label: "localhost", value: ":3000", y: 55 },
    { label: "exio", value: "client", y: 150, status: true },
    { label: "exiod", value: "server", y: 250, status: true },
    { label: "public", value: "tunnel.dev/app", y: 345 },
  ];

  return (
    <svg
      viewBox="0 0 280 400"
      className="h-full w-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="exio-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M 28 0 L 0 0 0 28" fill="none" stroke="rgba(91,155,213,0.08)" strokeWidth="0.5" />
        </pattern>
        <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <rect width="280" height="400" fill="url(#exio-grid)" />

      {/* ── Connection lines ── */}
      {/* Node edges: localhost bottom=76, client top=129 bottom=171, server top=229 bottom=271, public top=324 */}

      {/* localhost → client */}
      <line x1="140" y1="76" x2="140" y2="129" stroke="rgba(91,155,213,0.2)" strokeWidth="1.5" />
      <polygon points="137,125 143,125 140,129" fill="rgba(91,155,213,0.35)" />

      {/* client → server (tunnel section — dashed with envelope) */}
      <line x1="140" y1="171" x2="140" y2="229" stroke="rgba(91,155,213,0.18)" strokeWidth="1.5" strokeDasharray="6 4">
        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
      </line>
      <polygon points="137,225 143,225 140,229" fill="rgba(91,155,213,0.35)" />

      {/* Tunnel envelope pill around the dashed section */}
      <rect x="118" y="172" width="44" height="56" rx="22" fill="none" stroke="rgba(91,155,213,0.12)" strokeWidth="1" strokeDasharray="4 3">
        <animate attributeName="stroke-dashoffset" from="14" to="0" dur="2s" repeatCount="indefinite" />
      </rect>
      <text x="175" y="203" fill="rgba(91,155,213,0.3)" fontSize="8" letterSpacing="1.5" className="font-mono">WSS</text>

      {/* server → public */}
      <line x1="140" y1="271" x2="140" y2="324" stroke="rgba(91,155,213,0.2)" strokeWidth="1.5" />
      <polygon points="137,320 143,320 140,324" fill="rgba(91,155,213,0.35)" />

      {/* ── Single request packet cascading down, then single response back up ──
           Total cycle: ~8s. Request goes down in 3 hops, response comes back up in 3 hops. */}

      {/* Request: localhost → client */}
      <circle r="3" fill="#5b9bd5" filter="url(#packet-glow)">
        <animateMotion dur="1s" repeatCount="indefinite" begin="0s; 8s" path="M140,76 L140,129" />
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur="1s" repeatCount="indefinite" begin="0s; 8s" />
      </circle>
      {/* Request: client → server (through tunnel) */}
      <circle r="3" fill="#5b9bd5" filter="url(#packet-glow)">
        <animateMotion dur="1.2s" repeatCount="indefinite" begin="1.2s; 9.2s" path="M140,171 L140,229" />
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur="1.2s" repeatCount="indefinite" begin="1.2s; 9.2s" />
      </circle>
      {/* Request: server → public */}
      <circle r="3" fill="#5b9bd5" filter="url(#packet-glow)">
        <animateMotion dur="1s" repeatCount="indefinite" begin="2.6s; 10.6s" path="M140,271 L140,324" />
        <animate attributeName="opacity" values="0;0.9;0.9;0" keyTimes="0;0.15;0.85;1" dur="1s" repeatCount="indefinite" begin="2.6s; 10.6s" />
      </circle>

      {/* Response: public → server */}
      <circle r="2.5" fill="#3a649b" filter="url(#packet-glow)">
        <animateMotion dur="1s" repeatCount="indefinite" begin="4.2s; 12.2s" path="M140,324 L140,271" />
        <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.15;0.85;1" dur="1s" repeatCount="indefinite" begin="4.2s; 12.2s" />
      </circle>
      {/* Response: server → client (through tunnel) */}
      <circle r="2.5" fill="#3a649b" filter="url(#packet-glow)">
        <animateMotion dur="1.2s" repeatCount="indefinite" begin="5.4s; 13.4s" path="M140,229 L140,171" />
        <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.15;0.85;1" dur="1.2s" repeatCount="indefinite" begin="5.4s; 13.4s" />
      </circle>
      {/* Response: client → localhost */}
      <circle r="2.5" fill="#3a649b" filter="url(#packet-glow)">
        <animateMotion dur="1s" repeatCount="indefinite" begin="6.8s; 14.8s" path="M140,129 L140,76" />
        <animate attributeName="opacity" values="0;0.5;0.5;0" keyTimes="0;0.15;0.85;1" dur="1s" repeatCount="indefinite" begin="6.8s; 14.8s" />
      </circle>

      {/* ── Nodes ── */}
      {nodes.map((node) => (
        <g key={node.label}>
          <rect
            x={node.label === "public" ? 60 : 75}
            y={node.y - 21}
            width={node.label === "public" ? 160 : 130}
            height="42"
            rx="8"
            fill={node.status ? "rgba(91,155,213,0.08)" : "rgba(91,155,213,0.05)"}
            stroke={node.status ? "rgba(91,155,213,0.3)" : "rgba(91,155,213,0.18)"}
            strokeWidth="1"
          />
          <text x="140" y={node.y - 4} textAnchor="middle" fill="#7080a0" fontSize="9" className="font-mono">
            {node.label}
          </text>
          <text
            x="140"
            y={node.y + 12}
            textAnchor="middle"
            fill="#5b9bd5"
            fontSize={node.label === "public" ? "9.5" : "12"}
            fontWeight="bold"
            className="font-mono"
          >
            {node.value}
          </text>
          {node.status && (
            <circle cx={node.label === "public" ? 70 : 85} cy={node.y - 11} r="3" fill="#34d399">
              <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
            </circle>
          )}
        </g>
      ))}
    </svg>
  );
}

// ── Mini terminal ──

const terminalLines = [
  { text: "$ exio http 3000", color: "text-[#e0e4f0]", delay: 0 },
  { text: "✓ Connected to tunnel.sonnytaylor.dev", color: "text-emerald-500", delay: 0.5 },
  { text: "✓ Forwarding → localhost:3000", color: "text-emerald-500", delay: 0.8 },
  { text: "", color: "", delay: 1.0 },
  { text: "200  GET  /api/health      12ms", color: "text-[#7080a0]", delay: 1.4 },
  { text: "200  GET  /                45ms", color: "text-[#7080a0]", delay: 1.9 },
  { text: "301  GET  /dashboard        3ms", color: "text-[#7080a0]", delay: 2.4 },
];

function MiniTerminal({ inView }: { inView: boolean }) {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-[#0f1219]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-1.5">
        <div className="flex gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/15" />
        </div>
        <span className="font-mono text-[8px] text-white/20">exio</span>
      </div>
      <div className="px-3 py-2 font-mono text-[10px] leading-[1.7]">
        {terminalLines.map((line, i) =>
          line.text === "" ? (
            <div key={i} className="h-1.5" />
          ) : (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
              transition={{ delay: line.delay, duration: 0.25, ease: "easeOut" }}
              className={line.color}
            >
              {line.text}
            </motion.div>
          )
        )}
      </div>
    </div>
  );
}

// ── Main card — two-column layout ──

export function ExioCard() {
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
        className="relative grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-300 hover:shadow-lg md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── Left: Visual panel with network diagram ── */}
        <div className="relative flex items-center justify-center overflow-hidden bg-accent/[0.04] p-6 md:p-8">
          {/* Accent gradient wash */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 100% 80% at 30% 20%, rgba(91,155,213,0.08) 0%, transparent 60%)",
            }}
          />
          <div className="relative w-full max-w-[260px]">
            <NetworkDiagram />
          </div>
        </div>

        {/* ── Right: Content ── */}
        <div className="relative flex flex-col justify-center p-6 md:p-8">
          {/* Title + status */}
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-display text-4xl text-foreground">exio</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
              ACTIVE
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Self-hosted ngrok alternative. Expose local services to the internet
            via WebSocket tunnels — fast, private, no third-party dependency.
          </p>

          {/* Tech badges */}
          <div className="mb-5 flex flex-wrap gap-1.5">
            {["Go", "WebSockets", "Yamux", "Cloudflare"].map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Mini terminal */}
          <MiniTerminal inView={isInView} />

          {/* Bottom row: GitHub link + annotation */}
          <div className="mt-5 flex items-end justify-between gap-4">
            <a
              href="https://github.com/SonnyTaylor/exio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              View Source
            </a>

            {/* Handwritten annotation */}
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={isInView ? { opacity: 1, rotate: -2 } : {}}
              transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <p className="font-handwriting text-lg text-muted-foreground/60">
                why pay for ngrok?
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
