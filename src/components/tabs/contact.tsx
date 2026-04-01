"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Mail, Github, MapPin, Send } from "lucide-react";

// Email is split into char-code chunks and XOR'd with a rotating key
// so the address never appears as a string in source, bundle, or SSR HTML.
const _k = [0x17, 0x2a, 0x3f, 0x51, 0x0d];
const _c = [0x64, 0x4b, 0x51, 0x25, 0x64, 0x79, 0x45, 0x4b, 0x30, 0x74, 0x7b, 0x45, 0x4d, 0x61, 0x35, 0x57, 0x4d, 0x52, 0x30, 0x64, 0x7b, 0x04, 0x5c, 0x3e, 0x60];
function _d(): string {
  return _c.map((c, i) => String.fromCharCode(c ^ _k[i % _k.length])).join("");
}

function useEmail() {
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    // Delay decode so it's never in the initial render / SSR snapshot
    const t = setTimeout(() => setEmail(_d()), 80);
    return () => clearTimeout(t);
  }, []);
  return email;
}

const staticLinks = [
  {
    icon: Github,
    label: "GitHub",
    value: "SonnyTaylor",
    href: "https://github.com/SonnyTaylor",
    color: "#e0e4f0",
  },
];

export function ContactTab() {
  const email = useEmail();

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (email) window.location.href = "mai" + "lto:" + email;
  };

  return (
    <div>
      {/* Honeypot mailto — visually hidden, bots scrape it and get a dead address */}
      <a
        href="mailto:contact-81a9x@sonnytaylor.me"
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0, overflow: "hidden", pointerEvents: "none" }}
      >
        contact-81a9x@sonnytaylor.me
      </a>

      <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
        Contact
      </p>
      <h2 className="font-display text-5xl text-foreground">
        Get in <em className="italic text-muted-foreground">touch</em>
      </h2>

      <div className="mt-10 grid gap-8 md:grid-cols-[1fr_1fr]">
        {/* Left: message + context */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-mono text-sm leading-relaxed text-muted-foreground">
            I'm always open to chatting about new projects, interesting problems,
            or opportunities to collaborate. Whether it's a repair tool idea, a
            web project, or just to say hi — reach out.
          </p>

          <div className="mt-6 flex items-center gap-2 text-muted-foreground/60">
            <MapPin className="h-3.5 w-3.5" />
            <span className="font-mono text-[11px]">Melbourne, Australia</span>
          </div>

          {/* Handwritten note */}
          <motion.div
            initial={{ opacity: 0, rotate: -4 }}
            animate={{ opacity: 1, rotate: -2 }}
            transition={{ delay: 0.5, duration: 0.4, type: "spring", stiffness: 200 }}
            className="mt-8"
          >
            <p className="font-handwriting text-xl text-muted-foreground/50">
              I usually reply within a day
            </p>
          </motion.div>
        </motion.div>

        {/* Right: contact links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="space-y-3"
        >
          {/* Email link — decoded client-side only */}
          <motion.a
            href="#contact"
            onClick={handleEmailClick}
            aria-label="Send me an email"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors duration-200 group-hover:bg-accent/15">
              <Mail className="h-5 w-5 text-accent" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[2px] text-muted-foreground/60">
                Email
              </p>
              <p className="truncate font-mono text-sm text-foreground group-hover:text-accent transition-colors duration-200">
                {email ?? "\u00a0"}
              </p>
            </div>
            <Send className="h-4 w-4 text-muted-foreground/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent/50" />
          </motion.a>

          {staticLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.28 + i * 0.08, duration: 0.3 }}
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 transition-colors duration-200 group-hover:bg-accent/15">
                  <Icon className="h-5 w-5 text-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[2px] text-muted-foreground/60">
                    {link.label}
                  </p>
                  <p className="truncate font-mono text-sm text-foreground group-hover:text-accent transition-colors duration-200">
                    {link.value}
                  </p>
                </div>
                <Send className="h-4 w-4 text-muted-foreground/20 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent/50" />
              </motion.a>
            );
          })}

          {/* Quick email CTA */}
          <motion.a
            href="#contact"
            onClick={handleEmailClick}
            aria-label="Send me an email"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.3 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[2px] text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
          >
            <Mail className="h-4 w-4" />
            Send me an email
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
