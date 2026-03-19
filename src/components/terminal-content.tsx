"use client";

import { useState, useEffect, useRef } from "react";

interface Step {
  /** "type" = typed char by char, "print" = instant lines, "wait" = pause ms */
  kind: "type" | "print" | "wait";
  /** For "type": the command text. For "print": array of pre-colored lines. For "wait": ignored. */
  text?: string;
  lines?: string[];
  ms?: number;
  /** Custom prompt symbol. Defaults to "$" */
  prompt?: string;
}

// ── Color markup: [c:class]text[/c] ──
// Supports Tailwind classes and hex colors like text-[#da7758]
function colorize(raw: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  const regex = /\[c:([^\]]+)\]([^[]*)\[\/c\]/g;
  let last = 0;
  let key = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(raw)) !== null) {
    if (match.index > last) nodes.push(<span key={key++}>{raw.slice(last, match.index)}</span>);
    const classes = match[1];
    if (classes === "clawd") {
      nodes.push(<span key={key++} style={{ color: "#da7758" }}>{match[2]}</span>);
    } else {
      nodes.push(<span key={key++} className={classes}>{match[2]}</span>);
    }
    last = regex.lastIndex;
  }
  if (last < raw.length) nodes.push(<span key={key++}>{raw.slice(last)}</span>);
  return nodes;
}

// ── The script ──
const script: Step[] = [
  // 1. fastfetch
  { kind: "wait", ms: 1500 },
  { kind: "type", text: "fastfetch" },
  { kind: "wait", ms: 500 },
  { kind: "print", lines: [
    "[c:text-cyan-400 font-bold]sonny[/c][c:text-white/30]@[/c][c:text-cyan-400 font-bold]workbench[/c]",
    "[c:text-cyan-400/40]──────────────────────────────[/c]",
    "[c:text-cyan-400 font-bold]OS      [/c] [c:text-white/30]→[/c] [c:text-white/50]Windows 11 Pro x86_64[/c]",
    "[c:text-cyan-400 font-bold]Host    [/c] [c:text-white/30]→[/c] [c:text-white/50]XiaoXinPro 14 AHP9[/c]",
    "[c:text-cyan-400 font-bold]Shell   [/c] [c:text-white/30]→[/c] [c:text-white/50]bash 5.2.37[/c]",
    "[c:text-cyan-400 font-bold]Display [/c] [c:text-white/30]→[/c] [c:text-white/50]2880x1800 @ 120Hz[/c]",
    "[c:text-cyan-400 font-bold]CPU     [/c] [c:text-white/30]→[/c] [c:text-white/50]AMD Ryzen 7 8745H (16) @ 4.95GHz[/c]",
    "[c:text-cyan-400 font-bold]GPU     [/c] [c:text-white/30]→[/c] [c:text-white/50]AMD Radeon 780M[/c]",
    "[c:text-cyan-400 font-bold]Memory  [/c] [c:text-white/30]→[/c] [c:text-white/50]18.85 GiB / 23.31 GiB (81%)[/c]",
    "[c:text-cyan-400 font-bold]Battery [/c] [c:text-white/30]→[/c] [c:text-green-400]71%[/c] [c:text-white/30]AC Connected[/c]",
    "",
    "[c:text-red-400]●[/c][c:text-yellow-400]●[/c][c:text-green-400]●[/c][c:text-cyan-400]●[/c][c:text-blue-400]●[/c][c:text-purple-400]●[/c][c:text-white/40]●[/c][c:text-white/20]●[/c]",
  ] },
  { kind: "wait", ms: 3000 },

  // 2. claude
  { kind: "wait", ms: 2000 },
  { kind: "type", text: "claude" },
  { kind: "wait", ms: 800 },
  { kind: "print", lines: [
    "[c:text-white/90 font-bold]Claude Code[/c] [c:text-white/30]v2.1.79[/c]",
    "[c:text-white/50]Opus 4.6 (1M context)[/c] [c:text-white/30]· Claude Max[/c]",
    "[c:text-white/30]~/portfolio[/c]",
    "",
    "[c:text-white/15]──────────────────────────────────────────[/c]",
  ] },
  { kind: "wait", ms: 1500 },
  { kind: "type", text: "add tool images to the hero workbench", prompt: "❯" },
  { kind: "wait", ms: 800 },
  { kind: "print", lines: [
    "",
    "[c:text-white/40]●[/c] [c:text-white/50]I'll add the tool images and position them around the laptop.[/c]",
    "",
  ] },
  { kind: "wait", ms: 400 },
  { kind: "print", lines: [
    "[c:text-green-400]●[/c] [c:text-cyan-400]Update[/c][c:text-white/30](src/components/hero.tsx)[/c]",
    "  [c:text-white/20]⎿[/c]  [c:text-white/30]Added 42 lines, removed 12 lines[/c]",
  ] },
  { kind: "wait", ms: 300 },
  { kind: "print", lines: [
    "[c:text-green-400]●[/c] [c:text-cyan-400]Bash[/c][c:text-white/30](python -c \"from PIL import Image; ...\" )[/c]",
    "  [c:text-white/20]⎿[/c]  [c:text-white/30]Compressed 3.7MB → 400KB[/c]",
  ] },
  { kind: "wait", ms: 300 },
  { kind: "print", lines: [
    "[c:text-green-400]●[/c] [c:text-cyan-400]Update[/c][c:text-white/30](src/components/terminal-content.tsx)[/c]",
    "  [c:text-white/20]⎿[/c]  [c:text-white/30]Added 125 lines, removed 63 lines[/c]",
  ] },
  { kind: "wait", ms: 500 },
  { kind: "print", lines: [
    "",
    "[c:text-white/50]All 9 tool images placed with parallax and dual-layer shadows.[/c]",
    "",
    "[c:text-white/15]──────────────────────────────────────────[/c]",
    "[c:text-white/30]✻ Worked for 4m 12s[/c]",
  ] },
  { kind: "wait", ms: 2000 },

  // 3. git push
  { kind: "wait", ms: 1500 },
  { kind: "type", text: "git push origin main" },
  { kind: "wait", ms: 600 },
  { kind: "print", lines: [
    "[c:text-white/40]Enumerating objects: 42, done.[/c]",
    "[c:text-white/40]Compressing objects: 100% (38/38), done.[/c]",
    "[c:text-white/40]Writing objects: 100% (42/42), 401.2 KiB[/c]",
    "",
    "[c:text-white/50]To github.com:SonnyTaylor/portfolio.git[/c]",
    "[c:text-green-400]   c2174f1..f4e5d6c[/c] [c:text-cyan-400]main → main[/c]",
  ] },
  { kind: "wait", ms: 800 },
  { kind: "print", lines: [
    "",
    "[c:text-green-400 font-bold]✓ Deployed[/c] [c:text-white/40]to production[/c]",
  ] },
  { kind: "wait", ms: 3500 },

  // 4. git log
  { kind: "type", text: "git log --oneline" },
  { kind: "wait", ms: 300 },
  { kind: "print", lines: [
    "[c:text-yellow-400]c2174f1[/c] [c:text-white/60]feat: add workbench tool images with shadows and parallax[/c]",
    "[c:text-yellow-400]73df357[/c] [c:text-white/60]feat: responsive hero with mobile layout and terminal[/c]",
    "[c:text-yellow-400]1f83d79[/c] [c:text-white/60]feat: add hero section with cutting mat and macbook[/c]",
    "[c:text-yellow-400]78b6e4c[/c] [c:text-white/60]feat: initial commit[/c]",
    "[c:text-yellow-400]ab8eda4[/c] [c:text-white/50]Initial commit from Create Next App[/c]",
  ] },
  { kind: "wait", ms: 4000 },

  // 5. bun run build
  { kind: "type", text: "bun run build" },
  { kind: "wait", ms: 600 },
  { kind: "print", lines: [
    "[c:text-white/40]▲ Next.js 15.3.0[/c]",
    "",
    "[c:text-white/50]Creating an optimized production build...[/c]",
  ] },
  { kind: "wait", ms: 1800 },
  { kind: "print", lines: [
    "[c:text-green-400]✓[/c] [c:text-white/50]Compiled successfully[/c]",
  ] },
  { kind: "wait", ms: 400 },
  { kind: "print", lines: [
    "[c:text-green-400]✓[/c] [c:text-white/50]Linting and type checking[/c]",
  ] },
  { kind: "wait", ms: 600 },
  { kind: "print", lines: [
    "[c:text-green-400]✓[/c] [c:text-white/50]Collecting page data[/c]",
  ] },
  { kind: "wait", ms: 300 },
  { kind: "print", lines: [
    "[c:text-green-400]✓[/c] [c:text-white/50]Generating static pages (4/4)[/c]",
  ] },
  { kind: "wait", ms: 500 },
  { kind: "print", lines: [
    "[c:text-green-400]✓[/c] [c:text-white/50]Finalizing page optimization[/c]",
    "",
  ] },
  { kind: "wait", ms: 300 },
  { kind: "print", lines: [
    "[c:text-white/30]Route                          Size     First Load[/c]",
    "[c:text-white/20]──────────────────────────────────────────────────[/c]",
    "[c:text-cyan-400]○ /[/c]                            [c:text-white/40]5.2 kB[/c]   [c:text-white/40]89.4 kB[/c]",
    "[c:text-cyan-400]○ /workbench-editor[/c]             [c:text-white/40]3.1 kB[/c]   [c:text-white/40]87.3 kB[/c]",
    "[c:text-white/30]+ First Load JS shared by all[/c]  [c:text-white/40]84.2 kB[/c]",
  ] },
  { kind: "wait", ms: 400 },
  { kind: "print", lines: [
    "",
    "[c:text-green-400 font-bold]●[/c] [c:text-white/50]Build completed in[/c] [c:text-green-400]4.8s[/c]",
  ] },
  { kind: "wait", ms: 8000 },
];

const MAX_LINES = 22;

export function TerminalContent({ compact = false }: { compact?: boolean }) {
  const [lines, setLines] = useState<{ text: string; isCmd: boolean; prompt?: string }[]>([]);
  const [typing, setTyping] = useState("");
  const [activePrompt, setActivePrompt] = useState("$");
  const [cursorOn, setCursorOn] = useState(true);
  const cancelled = useRef(false);

  const sz = compact ? "text-[5px] leading-[1.5]" : "text-[11px] leading-[1.7]";

  useEffect(() => {
    cancelled.current = false;
    const sleep = (ms: number) =>
      new Promise<void>((r) => {
        const id = setTimeout(r, ms);
        // no-op cleanup on unmount handled by cancelled flag
        return id;
      });

    const push = (text: string, isCmd: boolean, prompt?: string) =>
      setLines((prev) => {
        const next = [...prev, { text, isCmd, prompt }];
        return next.length > MAX_LINES ? next.slice(next.length - MAX_LINES) : next;
      });

    (async () => {
      while (!cancelled.current) {
        setLines([]);
        setTyping("");

        for (const step of script) {
          if (cancelled.current) return;

          if (step.kind === "wait") {
            await sleep(step.ms ?? 1000);
          } else if (step.kind === "type") {
            const cmd = step.text ?? "";
            const prompt = step.prompt ?? "$";
            setActivePrompt(prompt);
            for (let i = 0; i <= cmd.length; i++) {
              if (cancelled.current) return;
              setTyping(cmd.slice(0, i));
              // Variable speed: occasional pauses mid-word feel human
              const jitter = Math.random() < 0.1 ? 180 : Math.random() * 60;
              await sleep(65 + jitter);
            }
            await sleep(150);
            push(cmd, true, prompt);
            setTyping("");
            setActivePrompt("$");
          } else if (step.kind === "print") {
            for (const line of step.lines ?? []) {
              if (cancelled.current) return;
              push(line, false);
              await sleep(40);
            }
          }
        }
      }
    })();

    return () => {
      cancelled.current = true;
    };
  }, []);

  // cursor blink
  useEffect(() => {
    const id = setInterval(() => setCursorOn((c) => !c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={`font-mono ${sz} select-none overflow-hidden`}>
      {lines.map((line, i) => (
        <p key={i} className="whitespace-pre">
          {line.isCmd ? (
            <>
              <span className={line.prompt === "❯" ? "text-green-400" : "text-blue-400"}>{line.prompt ?? "$"} </span>
              <span className="text-white/70">{line.text}</span>
            </>
          ) : line.text === "" ? (
            <span>&nbsp;</span>
          ) : (
            <span>  {colorize(line.text)}</span>
          )}
        </p>
      ))}
      <p className="whitespace-pre">
        <span className={activePrompt === "❯" ? "text-green-400" : "text-blue-400"}>{activePrompt} </span>
        <span className="text-white/70">{typing}</span>
        <span className={cursorOn ? "text-white/80" : "text-transparent"}>▋</span>
      </p>
    </div>
  );
}
