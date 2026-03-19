"use client";

import { useState, type ReactNode } from "react";

interface TerminalVariant {
  id: string;
  render: (compact: boolean) => ReactNode;
}

const S = (compact: boolean) => (compact ? "text-[5px]" : "text-xs");
const B = (compact: boolean) => (compact ? "h-0.5" : "h-1.5");

const variants: TerminalVariant[] = [
  {
    id: "about",
    render: (c) => {
      const s = S(c);
      return (
        <>
          <p className={s}><span className="text-blue-400">$</span> <span className="text-white/70">sonny --about</span></p>
          <div className={B(c)} />
          <p className={`${s} text-cyan-400`}>  ╭──────────────────────────────╮</p>
          <p className={`${s} text-cyan-400`}>  │ <span className="font-bold text-white/90">Sonny Taylor</span>                 │</p>
          <p className={`${s} text-cyan-400`}>  ├──────────────────────────────┤</p>
          <p className={`${s} text-cyan-400`}>  │ <span className="text-green-400">◆</span> <span className="text-white/60">repair tech & AI-native dev</span> │</p>
          <p className={`${s} text-cyan-400`}>  │ <span className="text-yellow-400">◆</span> <span className="text-white/60">ships with claude & cursor</span>  │</p>
          <p className={`${s} text-cyan-400`}>  │ <span className="text-red-400">◆</span> <span className="text-white/60">fixes macbooks & consoles</span>   │</p>
          <p className={`${s} text-cyan-400`}>  │ <span className="text-purple-400">◆</span> <span className="text-white/60">based in AU</span>                │</p>
          <p className={`${s} text-cyan-400`}>  ╰──────────────────────────────╯</p>
          <div className={B(c)} />
          <p className={s}><span className="text-blue-400">$</span> <span className="animate-pulse text-white/70">_</span></p>
        </>
      );
    },
  },
  {
    id: "build",
    render: (c) => {
      const s = S(c);
      return (
        <>
          <p className={s}><span className="text-blue-400">$</span> <span className="text-white/70">sonny build --all</span></p>
          <div className={B(c)} />
          <p className={`${s} text-green-400`}>  ✓ <span className="text-white/60">techbay-store</span>    <span className="text-white/30">·····</span> <span className="text-yellow-400/60">1.2s</span></p>
          <p className={`${s} text-green-400`}>  ✓ <span className="text-white/60">techbay-portal</span>   <span className="text-white/30">·····</span> <span className="text-yellow-400/60">0.9s</span></p>
          <p className={`${s} text-green-400`}>  ✓ <span className="text-white/60">smart-sort-bin</span>   <span className="text-white/30">·····</span> <span className="text-yellow-400/60">0.8s</span></p>
          <p className={`${s} text-green-400`}>  ✓ <span className="text-white/60">exio</span>             <span className="text-white/30">·····</span> <span className="text-yellow-400/60">2.1s</span></p>
          <p className={`${s} text-green-400`}>  ✓ <span className="text-white/60">rust-service</span>     <span className="text-white/30">·····</span> <span className="text-yellow-400/60">0.4s</span></p>
          <div className={B(c)} />
          <p className={`${s} text-white/40`}>  ──────────────────────────────</p>
          <p className={s}><span className="text-green-400 font-bold">  ● 5 built</span> <span className="text-white/30">│</span> <span className="text-green-400/70">0 errors</span> <span className="text-white/30">│</span> <span className="text-yellow-400/60">5.4s total</span></p>
          <div className={B(c)} />
          <p className={s}><span className="text-blue-400">$</span> <span className="animate-pulse text-white/70">_</span></p>
        </>
      );
    },
  },
  {
    id: "git",
    render: (c) => {
      const s = S(c);
      const logs = [
        { hash: "a1b2c3d", msg: "ship portfolio site", branch: "main" },
        { hash: "f4e5d6c", msg: "add AI repair diagnostics", branch: null },
        { hash: "7g8h9i0", msg: "refactor payment system", branch: null },
        { hash: "b2c3d4e", msg: "build smart sort bin MVP", branch: null },
        { hash: "e5f6g7h", msg: "launch techbay store", branch: null },
        { hash: "1a2b3c4", msg: "initial commit", branch: null },
      ];
      return (
        <>
          <p className={s}><span className="text-blue-400">$</span> <span className="text-white/70">git log --oneline --graph</span></p>
          <div className={B(c)} />
          {logs.map((l, i) => (
            <p key={i} className={s}>
              <span className="text-red-400/50">{i === 0 ? "  * " : "  │ "}</span>
              <span className="text-yellow-400/70">{l.hash}</span>
              {l.branch && <span className="text-cyan-400/60"> ({l.branch})</span>}
              <span className="text-white/50"> {l.msg}</span>
            </p>
          ))}
          <div className={B(c)} />
          <p className={s}><span className="text-blue-400">$</span> <span className="animate-pulse text-white/70">_</span></p>
        </>
      );
    },
  },
  {
    id: "neofetch",
    render: (c) => {
      const s = S(c);
      const label = c ? "text-[5px] text-cyan-400 font-bold" : "text-xs text-cyan-400 font-bold";
      const val = `${s} text-white/50`;
      return (
        <>
          <p className={s}><span className="text-blue-400">$</span> <span className="text-white/70">neofetch</span></p>
          <div className={B(c)} />
          <p className={`${s} text-cyan-400 font-bold`}>  sonny<span className="text-white/30">@</span>workbench</p>
          <p className={`${s} text-cyan-400/40`}>  ─────────────────────────</p>
          <p className={val}><span className={label}>  stack   </span> <span className="text-white/30">→</span> TypeScript, React, Next.js</p>
          <p className={val}><span className={label}>  tools   </span> <span className="text-white/30">→</span> Claude, Cursor, Bun</p>
          <p className={val}><span className={label}>  repairs </span> <span className="text-white/30">→</span> MacBook, iPhone, PS5</p>
          <p className={val}><span className={label}>  editor  </span> <span className="text-white/30">→</span> Cursor + Vim motions</p>
          <p className={val}><span className={label}>  status  </span> <span className="text-white/30">→</span> <span className="text-green-400">●</span> shipping</p>
          <div className={B(c)} />
          <p className={s}>  <span className="text-red-400">●</span><span className="text-yellow-400">●</span><span className="text-green-400">●</span><span className="text-cyan-400">●</span><span className="text-blue-400">●</span><span className="text-purple-400">●</span><span className="text-white/40">●</span><span className="text-white/20">●</span></p>
          <div className={B(c)} />
          <p className={s}><span className="text-blue-400">$</span> <span className="animate-pulse text-white/70">_</span></p>
        </>
      );
    },
  },
];

export function TerminalContent({ compact = false }: { compact?: boolean }) {
  const [index] = useState(() =>
    Math.floor(Math.random() * variants.length),
  );

  return (
    <div className="font-mono leading-relaxed">
      {variants[index].render(compact)}
    </div>
  );
}
