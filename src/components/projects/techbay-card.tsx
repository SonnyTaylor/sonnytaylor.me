"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";
import {
  Monitor, Search, ShoppingCart, MessageCircle, Star, Shield,
} from "lucide-react";

// ── Mini storefront demo ──

const products = [
  { name: "MacBook Pro 14″", price: "$1,299", tag: "Refurbished" },
  { name: "ThinkPad X1 Carbon", price: "$849", tag: "Refurbished" },
  { name: "Dell OptiPlex 7090", price: "$599", tag: "Desktop" },
  { name: "HP EliteBook 840", price: "$729", tag: "Laptop" },
];

type DemoPhase = "browsing" | "search" | "cart" | "chat";

function StorefrontDemo({ inView }: { inView: boolean }) {
  const [phase, setPhase] = useState<DemoPhase>("browsing");
  const [cartCount, setCartCount] = useState(0);
  const [chatTyping, setChatTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const run = () => {
      setPhase("browsing");
      setCartCount(0);
      setChatTyping(false);

      const t1 = setTimeout(() => { setPhase("search"); }, 1200);
      const t2 = setTimeout(() => { setPhase("cart"); setCartCount(1); }, 2800);
      const t3 = setTimeout(() => setCartCount(2), 3400);
      const t4 = setTimeout(() => { setPhase("chat"); setChatTyping(true); }, 4200);
      const t5 = setTimeout(() => setChatTyping(false), 5400);

      return [t1, t2, t3, t4, t5];
    };

    let timers = run();
    const interval = setInterval(() => { timers = run(); }, 6200);
    return () => { timers.forEach(clearTimeout); clearInterval(interval); };
  }, [inView]);

  return (
    <div className="flex flex-col gap-3">
      {/* Mini website mockup */}
      <div className="overflow-hidden rounded-lg border border-[#ce5d5b]/15 bg-white/[0.03]">
        {/* Nav bar */}
        <div className="flex items-center justify-between border-b border-[#ce5d5b]/10 bg-[#ce5d5b]/[0.06] px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[8px] font-bold text-[#ce5d5b]">TECH</span>
            <span className="font-mono text-[8px] font-bold text-foreground/70">BAY</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[6px] text-muted-foreground/50">Services</span>
            <span className="font-mono text-[6px] text-muted-foreground/50">Shop</span>
            <span className="font-mono text-[6px] text-muted-foreground/50">Contact</span>
            <div className="relative">
              <ShoppingCart className="h-3 w-3 text-muted-foreground/40" />
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1.5 -top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-[#ce5d5b] font-mono text-[6px] font-bold text-white"
                >
                  {cartCount}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="border-b border-border/30 px-3 py-1.5">
          <div className="flex items-center gap-1.5 rounded bg-muted/30 px-2 py-1">
            <Search className="h-2.5 w-2.5 text-muted-foreground/40" />
            <div className="flex-1">
              {phase === "search" ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="font-mono text-[8px] text-foreground/60"
                >
                  macbook pro...
                </motion.span>
              ) : (
                <span className="font-mono text-[8px] text-muted-foreground/30">Search products...</span>
              )}
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 gap-1.5 p-2">
          {products.map((product, i) => {
            const isHighlighted = phase === "search" && i === 0;
            const isAdded = phase === "cart" && i <= cartCount - 1;
            return (
              <div
                key={product.name}
                className="rounded-md border p-2 transition-all duration-200"
                style={{
                  borderColor: isHighlighted
                    ? "rgba(206,93,91,0.4)"
                    : isAdded
                      ? "rgba(206,93,91,0.25)"
                      : "rgba(0,0,0,0.06)",
                  backgroundColor: isHighlighted
                    ? "rgba(206,93,91,0.05)"
                    : "transparent",
                }}
              >
                <div className="mb-1 flex h-8 items-center justify-center rounded bg-muted/40">
                  <Monitor className="h-4 w-4 text-muted-foreground/25" />
                </div>
                <p className="font-mono text-[7px] font-medium text-foreground/60 leading-tight">{product.name}</p>
                <div className="mt-0.5 flex items-center justify-between">
                  <span className="font-mono text-[8px] font-bold text-[#ce5d5b]/80">{product.price}</span>
                  <span className="font-mono text-[5px] text-muted-foreground/40">{product.tag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat bubble */}
      <div className="overflow-hidden rounded-lg border border-[#ce5d5b]/15 bg-white/[0.03]">
        <div className="flex items-center gap-2 border-b border-[#ce5d5b]/10 bg-[#ce5d5b]/[0.06] px-3 py-1.5">
          <MessageCircle className="h-3 w-3 text-[#ce5d5b]/70" />
          <span className="font-mono text-[7px] font-semibold text-[#ce5d5b]/70">AI Support</span>
          <div className="ml-auto flex items-center gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
            <span className="font-mono text-[6px] text-muted-foreground/40">Online</span>
          </div>
        </div>
        <div className="px-3 py-2 space-y-1.5">
          <div className="flex gap-1.5">
            <div className="rounded-lg rounded-tl-sm bg-muted/40 px-2 py-1">
              <span className="font-mono text-[7px] text-foreground/50">Do you repair MacBook screens?</span>
            </div>
          </div>
          <div className="flex justify-end gap-1.5">
            <div className="rounded-lg rounded-tr-sm bg-[#ce5d5b]/15 px-2 py-1">
              {chatTyping ? (
                <motion.div className="flex items-center gap-0.5 px-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="h-1 w-1 rounded-full bg-[#ce5d5b]/50"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </motion.div>
              ) : (
                <span className="font-mono text-[7px] text-[#ce5d5b]/70">Yes! We offer screen repairs with a 12-month warranty.</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feature badges */}
      <div className="flex gap-2">
        {[
          { icon: Shield, label: "No Fix No Fee" },
          { icon: Star, label: "4.9★ Reviews" },
        ].map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex flex-1 items-center gap-1.5 rounded-md border border-[#ce5d5b]/10 bg-[#ce5d5b]/[0.04] px-2 py-1.5"
          >
            <Icon className="h-3 w-3 text-[#ce5d5b]/50" />
            <span className="font-mono text-[7px] font-semibold text-foreground/50">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main card ──

export function TechbayCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-60px" });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -4, y: (x - 0.5) * 4 });
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
        {/* Left: Storefront visual */}
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-muted/30 p-5 md:p-6">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(206,93,91,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="relative w-full">
            <StorefrontDemo inView={isInView} />
          </div>
        </div>

        {/* Right: Content */}
        <div className="relative flex flex-col justify-center p-6 md:p-8">
          <div className="mb-1 flex items-center gap-3">
            <h3 className="font-display text-4xl text-foreground">Techbay</h3>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ce5d5b]/20 bg-[#ce5d5b]/10 px-2 py-0.5 font-mono text-[8px] font-semibold text-[#ce5d5b]">
              <ShoppingCart className="h-2.5 w-2.5" />
              E-COMMERCE
            </span>
          </div>

          <p className="mb-4 font-mono text-xs leading-relaxed text-muted-foreground">
            Full website and e-commerce storefront for a Melbourne IT repair
            business. Shopify-powered shop with Meilisearch autocomplete, AI
            chatbot for 24/7 customer support, service booking, and a blog.
          </p>

          <div className="mb-5 flex flex-wrap gap-1.5">
            {["Next.js", "Shopify", "Meilisearch", "xAI", "Firebase"].map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-accent/10 px-2.5 py-1 font-mono text-[9px] font-semibold text-accent"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2">
            {[
              { label: "AI Chat", value: "24/7", detail: "xAI-powered" },
              { label: "Search", value: "Instant", detail: "Meilisearch" },
              { label: "Warranty", value: "12mo", detail: "on all repairs" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.3 }}
                className="rounded-lg border border-border bg-muted/50 px-3 py-2"
              >
                <p className="font-mono text-[8px] font-bold uppercase tracking-[1.5px] text-muted-foreground/60">
                  {stat.label}
                </p>
                <p className="font-mono text-xs font-semibold text-foreground">{stat.value}</p>
                <p className="font-mono text-[9px] text-muted-foreground/70">{stat.detail}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex items-end justify-between gap-4">
            <a
              href="https://techbay.net.au"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ce5d5b] hover:text-[#ce5d5b]"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                <path d="M6 3H3.5A1.5 1.5 0 002 4.5v8A1.5 1.5 0 003.5 14h8a1.5 1.5 0 001.5-1.5V10M10 2h4m0 0v4m0-4L7 9" />
              </svg>
              Visit Site
            </a>

            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              animate={isInView ? { opacity: 1, rotate: -2 } : {}}
              transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200 }}
            >
              <p className="font-handwriting text-lg text-muted-foreground/60">
                built the whole thing from scratch!
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
