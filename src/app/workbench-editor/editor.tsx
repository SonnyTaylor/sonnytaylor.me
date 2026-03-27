"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  shadow: number;   // 0-100 opacity
  skewX: number;     // degrees
  skewY: number;     // degrees
}

const defaults = { shadow: 40, skewX: 0, skewY: 0 };

const INITIAL_TOOLS: ToolItem[] = [
  { id: "motherboard", label: "Motherboard", img: "/tools/motherboard.webp", x: 74, y: 2, width: 22, rotation: 6, ...defaults },
  { id: "multimeter", label: "Multimeter", img: "/tools/multimeter.webp", x: 2, y: 58, width: 18, rotation: -5, ...defaults },
  { id: "spudger", label: "Spudger Tools", img: "/tools/spudger.webp", x: 0, y: 4, width: 18, rotation: 0, ...defaults },
  { id: "screwdriver", label: "iFixit Screwdriver", img: "/tools/screwdriver.webp", x: 8, y: 28, width: 6, rotation: 20, ...defaults },
  { id: "nothing-phone", label: "Nothing Phone 2a", img: "/tools/nothing-phone.webp", x: 82, y: 28, width: 10, rotation: -8, ...defaults },
  { id: "thermal-paste", label: "Thermal Paste", img: "/tools/thermal-paste.webp", x: 78, y: 62, width: 12, rotation: 15, ...defaults },
  { id: "esp32", label: "ESP32", img: "/tools/esp32.webp", x: 16, y: 60, width: 5, rotation: -12, ...defaults },
  { id: "laptop-repair", label: "Laptop in Repair", img: "/tools/laptop-repair.webp", x: 52, y: 76, width: 24, rotation: -2, ...defaults },
  { id: "monster", label: "Monster Energy", img: "/tools/monster.webp", x: 62, y: 48, width: 7, rotation: 8, ...defaults },
];

function Slider({ label, value, onChange, min, max, step = 1, unit = "" }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; unit?: string;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="w-16 text-right font-mono text-[10px] text-white/50">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="h-1 w-24 cursor-pointer accent-blue-500" />
      <span className="w-12 font-mono text-[10px] text-white/70">{value}{unit}</span>
    </label>
  );
}

export function WorkbenchEditor() {
  const [tools, setTools] = useState<ToolItem[]>(INITIAL_TOOLS);
  const [selected, setSelected] = useState<string | null>(null);
  const [dragging, setDragging] = useState<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const [resizing, setResizing] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [exported, setExported] = useState(false);

  const getContainerRect = () => containerRef.current?.getBoundingClientRect();
  const toPercent = (px: number, total: number) => (px / total) * 100;

  const updateTool = (id: string, patch: Partial<ToolItem>) => {
    setTools((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const handleMouseDown = useCallback((e: React.MouseEvent, tool: ToolItem) => {
    e.stopPropagation();
    e.preventDefault();
    const rect = getContainerRect();
    if (!rect) return;
    const toolEl = (e.target as HTMLElement).closest("[data-tool-id]") as HTMLElement;
    if (!toolEl) return;
    const toolRect = toolEl.getBoundingClientRect();
    setSelected(tool.id);
    setDragging({ id: tool.id, offsetX: e.clientX - toolRect.left, offsetY: e.clientY - toolRect.top });
  }, []);

  const handleResizeDown = useCallback((e: React.MouseEvent, toolId: string) => {
    e.stopPropagation();
    e.preventDefault();
    setResizing(toolId);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = getContainerRect();
      if (!rect) return;
      if (dragging) {
        const x = toPercent(e.clientX - rect.left - dragging.offsetX, rect.width);
        const y = toPercent(e.clientY - rect.top - dragging.offsetY, rect.height);
        setTools((prev) =>
          prev.map((t) =>
            t.id === dragging.id ? { ...t, x: Math.max(-10, Math.min(100, x)), y: Math.max(-10, Math.min(100, y)) } : t,
          ),
        );
      }
      if (resizing) {
        const tool = tools.find((t) => t.id === resizing);
        if (!tool) return;
        const toolLeftPx = (tool.x / 100) * rect.width + rect.left;
        const newWidthPx = e.clientX - toolLeftPx;
        const newWidth = toPercent(Math.max(30, newWidthPx), rect.width);
        setTools((prev) =>
          prev.map((t) => (t.id === resizing ? { ...t, width: Math.max(3, Math.min(50, newWidth)) } : t)),
        );
      }
    };
    const handleMouseUp = () => { setDragging(null); setResizing(null); };
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => { window.removeEventListener("mousemove", handleMouseMove); window.removeEventListener("mouseup", handleMouseUp); };
  }, [dragging, resizing, tools]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!selected) return;
      e.preventDefault();
      setTools((prev) =>
        prev.map((t) => (t.id === selected ? { ...t, rotation: t.rotation + (e.deltaY > 0 ? 2 : -2) } : t)),
      );
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [selected]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selected) {
        setTools((prev) => prev.filter((t) => t.id !== selected));
        setSelected(null);
      }
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selected]);

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.multiple = true;
    input.onchange = async () => {
      if (!input.files) return;
      for (const file of Array.from(input.files)) {
        const name = file.name.replace(/\.[^.]+$/, "");
        const dataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        setTools((prev) => [
          ...prev,
          {
            id: name + "-" + Date.now(),
            label: name,
            img: dataUrl,
            x: 10 + Math.random() * 30,
            y: 10 + Math.random() * 30,
            width: 15,
            rotation: Math.round(Math.random() * 20 - 10),
            ...defaults,
          },
        ]);
      }
    };
    input.click();
  };

  const handleExport = () => {
    const config = tools.map((t) => ({
      id: t.id,
      label: t.label,
      img: t.img.startsWith("data:") ? `/tools/${t.label.toLowerCase().replace(/\s+/g, "-")}.png` : t.img,
      x: Math.round(t.x * 10) / 10,
      y: Math.round(t.y * 10) / 10,
      width: Math.round(t.width * 10) / 10,
      rotation: Math.round(t.rotation),
      shadow: Math.round(t.shadow),
      skewX: Math.round(t.skewX),
      skewY: Math.round(t.skewY),
    }));
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "workbench-layout.json";
    a.click();
    URL.revokeObjectURL(url);
    navigator.clipboard.writeText(json);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  const selectedTool = tools.find((t) => t.id === selected);

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Main area */}
      <div className="flex flex-1 flex-col">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <h1 className="font-mono text-sm font-bold">Workbench Editor</h1>
          <div className="h-4 w-px bg-white/20" />
          <button onClick={handleImport} className="rounded-md bg-blue-600 px-3 py-1.5 font-mono text-xs font-medium hover:bg-blue-500">
            + Import Image
          </button>
          <button onClick={handleExport} className="rounded-md bg-green-600 px-3 py-1.5 font-mono text-xs font-medium hover:bg-green-500">
            {exported ? "Copied + Downloaded!" : "Export Layout"}
          </button>
          <div className="h-4 w-px bg-white/20" />
          <span className="font-mono text-[10px] text-white/40">
            Drag to move · Scroll to rotate · Corner to resize · Del to remove
          </span>
        </div>

        {/* Canvas */}
        <div className="flex flex-1 items-center justify-center overflow-hidden p-4">
          <div
            ref={containerRef}
            className="relative overflow-hidden"
            style={{ aspectRatio: "16/10", height: "100%", maxWidth: "100%" }}
            onMouseDown={(e) => {
            // Only deselect if clicking directly on the canvas, not on a tool
            if ((e.target as HTMLElement).closest("[data-tool-id]") === null) {
              setSelected(null);
            }
          }}
          >
            {/* Hero backdrop */}
            <div className="pointer-events-none absolute inset-0">
              {/* Navbar */}
              <div className="absolute top-3 left-0 right-0 z-40 flex justify-center">
                <nav className="flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/70 px-2 py-1.5 shadow-lg shadow-black/[0.03] backdrop-blur-xl">
                  <span className="mr-2 pl-3 pr-4 font-display text-base text-foreground">Sonny Taylor</span>
                  <div className="h-4 w-px bg-black/10" />
                  {["About", "Experience", "Projects", "Contact"].map((item) => (
                    <span key={item} className="rounded-full px-4 py-1.5 font-mono text-[11px] font-medium text-muted-foreground">{item}</span>
                  ))}
                </nav>
              </div>
              <div className="absolute inset-0 bg-[#f5f5f0]">
                <div
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.3) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.06)_100%)]" />
              </div>

              <div className="absolute left-[4%] top-[65%] z-20 -rotate-[3deg] rounded-md border border-black/10 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">Repair Tech</span>
              </div>
              <div className="absolute right-[5%] top-[60%] z-20 rotate-[2deg] rounded-md border border-black/10 bg-white/90 px-3 py-1.5 shadow-sm backdrop-blur-sm">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-accent">AI-Native Dev</span>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="mb-4 flex flex-col items-center gap-2">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[4px] text-accent">Portfolio</span>
                  <h1 className="font-display text-6xl tracking-tight text-foreground lg:text-8xl">Sonny Taylor</h1>
                  <p className="font-mono text-sm font-medium text-muted-foreground">I ship software with AI and repair stuff</p>
                </div>
                <div className="flex flex-col items-center" style={{ zoom: 0.55 }}>
                  <div className="grid place-items-center [&>*]:col-start-1 [&>*]:row-start-1">
                    <CuttingMat width={720} height={620} className="w-[720px] drop-shadow-lg" />
                    <div className="h-[40rem] w-[38rem] translate-y-[2.5rem]" style={{
                      filter: "blur(30px)",
                      background: "radial-gradient(ellipse 100% 70% at 50% 55%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 50%, transparent 75%)",
                    }} />
                    <MacbookStatic showGradient={false}>
                      <div className="flex h-full w-full flex-col bg-[#0f1219] p-3">
                        <TerminalContent compact={true} />
                      </div>
                    </MacbookStatic>
                  </div>
                </div>
              </div>
            </div>

            {/* Draggable tools */}
            {tools.map((tool) => {
              const shadowStr = tool.shadow > 0
                ? `drop-shadow(0 ${4 + tool.shadow * 0.1}px ${8 + tool.shadow * 0.2}px rgba(0,0,0,${tool.shadow / 100 * 0.5}))`
                : "none";
              return (
                <div
                  key={tool.id}
                  data-tool-id={tool.id}
                  className={`absolute cursor-grab select-none active:cursor-grabbing ${selected === tool.id ? "z-50" : "z-30"}`}
                  style={{
                    left: `${tool.x}%`,
                    top: `${tool.y}%`,
                    width: `${tool.width}%`,
                    transform: `rotate(${tool.rotation}deg) skewX(${tool.skewX}deg) skewY(${tool.skewY}deg)`,
                    filter: shadowStr,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, tool)}
                >
                  {selected === tool.id && (
                    <div className="absolute -inset-1 border-2 border-blue-500 bg-blue-500/5" />
                  )}
                  <img src={tool.img} alt={tool.label} className="h-full w-full object-contain" draggable={false} />
                  <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/60 px-1.5 py-0.5 font-mono text-[9px] text-white/70">
                    {tool.label}
                  </span>
                  {selected === tool.id && (
                    <div className="absolute -bottom-1 -right-1 h-3 w-3 cursor-se-resize border-2 border-blue-500 bg-white"
                      onMouseDown={(e) => handleResizeDown(e, tool.id)} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Properties panel (right sidebar) */}
      <div className="flex w-64 flex-col border-l border-white/10 bg-neutral-950">
        <div className="border-b border-white/10 px-4 py-3">
          <h2 className="font-mono text-xs font-bold text-white/70">Properties</h2>
        </div>

        {selectedTool ? (
          <div className="flex flex-col gap-4 p-4">
            {/* Name */}
            <div>
              <span className="mb-1 block font-mono text-[10px] font-bold uppercase tracking-wider text-white/30">Name</span>
              <input
                type="text"
                value={selectedTool.label}
                onChange={(e) => updateTool(selectedTool.id, { label: e.target.value })}
                className="w-full rounded bg-white/5 px-2 py-1 font-mono text-xs text-white/80 outline-none ring-1 ring-white/10 focus:ring-blue-500"
              />
            </div>

            {/* Position */}
            <div>
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-white/30">Position</span>
              <div className="flex flex-col gap-1.5">
                <Slider label="X" value={Math.round(selectedTool.x * 10) / 10} onChange={(v) => updateTool(selectedTool.id, { x: v })} min={-10} max={100} step={0.5} unit="%" />
                <Slider label="Y" value={Math.round(selectedTool.y * 10) / 10} onChange={(v) => updateTool(selectedTool.id, { y: v })} min={-10} max={100} step={0.5} unit="%" />
              </div>
            </div>

            {/* Size */}
            <div>
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-white/30">Size</span>
              <Slider label="Width" value={Math.round(selectedTool.width * 10) / 10} onChange={(v) => updateTool(selectedTool.id, { width: v })} min={3} max={50} step={0.5} unit="%" />
            </div>

            {/* Transform */}
            <div>
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-white/30">Transform</span>
              <div className="flex flex-col gap-1.5">
                <Slider label="Rotate" value={selectedTool.rotation} onChange={(v) => updateTool(selectedTool.id, { rotation: v })} min={-180} max={180} unit="°" />
                <Slider label="Skew X" value={selectedTool.skewX} onChange={(v) => updateTool(selectedTool.id, { skewX: v })} min={-45} max={45} unit="°" />
                <Slider label="Skew Y" value={selectedTool.skewY} onChange={(v) => updateTool(selectedTool.id, { skewY: v })} min={-45} max={45} unit="°" />
              </div>
            </div>

            {/* Shadow */}
            <div>
              <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-wider text-white/30">Shadow</span>
              <Slider label="Opacity" value={selectedTool.shadow} onChange={(v) => updateTool(selectedTool.id, { shadow: v })} min={0} max={100} unit="%" />
            </div>

            {/* Reset button */}
            <button
              onClick={() => updateTool(selectedTool.id, { rotation: 0, skewX: 0, skewY: 0, shadow: 40 })}
              className="mt-2 rounded bg-white/5 px-3 py-1.5 font-mono text-[10px] text-white/40 hover:bg-white/10 hover:text-white/60"
            >
              Reset transforms
            </button>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center p-4">
            <span className="text-center font-mono text-[11px] text-white/20">Select a tool to edit its properties</span>
          </div>
        )}

        {/* Tool list */}
        <div className="mt-auto border-t border-white/10">
          <div className="px-4 py-2">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-white/30">Layers</span>
          </div>
          <div className="max-h-48 overflow-y-auto px-2 pb-2">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={(e) => { e.stopPropagation(); setSelected(t.id); }}
                className={`flex w-full items-center gap-2 rounded px-2 py-1.5 text-left font-mono text-[11px] ${
                  selected === t.id ? "bg-blue-600/20 text-blue-400" : "text-white/50 hover:bg-white/5"
                }`}
              >
                <img src={t.img} alt="" className="h-5 w-5 object-contain" />
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
