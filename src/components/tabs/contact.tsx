"use client";

import { motion } from "motion/react";
import { Mail, Github, MapPin, Send } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "Email",
    value: "santinotaylor08@gmail.com",
    href: "mailto:santinotaylor08@gmail.com",
    color: "#5b9bd5",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "SonnyTaylor",
    href: "https://github.com/SonnyTaylor",
    color: "#e0e4f0",
  },
];

export function ContactTab() {
  return (
    <div>
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
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
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
            href="mailto:santinotaylor08@gmail.com"
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
