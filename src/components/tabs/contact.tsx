"use client";

import { motion } from "motion/react";

export function ContactTab() {
  return (
    <div>
      <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
        Contact
      </p>
      <h2 className="font-display text-5xl text-foreground">
        Get in <em className="italic text-muted-foreground">touch</em>
      </h2>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-10 max-w-md space-y-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[2px] text-muted-foreground">
            Name
          </label>
          <input
            type="text"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[2px] text-muted-foreground">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block font-mono text-[10px] font-semibold uppercase tracking-[2px] text-muted-foreground">
            Message
          </label>
          <textarea
            rows={5}
            className="w-full resize-none rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-foreground outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
            placeholder="What's on your mind?"
          />
        </div>

        <button
          type="submit"
          className="rounded-lg bg-accent px-6 py-3 font-mono text-xs font-bold uppercase tracking-[2px] text-accent-foreground transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/20"
        >
          Send Message
        </button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-12 flex gap-4"
      >
        <a
          href="https://github.com/SonnyTaylor"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg border border-border px-4 py-2.5 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          GitHub
        </a>
        <a
          href="mailto:santinotaylor08@gmail.com"
          className="rounded-lg border border-border px-4 py-2.5 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
        >
          Email
        </a>
      </motion.div>
    </div>
  );
}
