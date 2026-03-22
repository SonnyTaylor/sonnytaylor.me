"use client";

import { motion } from "motion/react";
import { ExioCard } from "@/components/projects/exio-card";
import { RustServiceCard } from "@/components/projects/rustservice-card";
import { SmartSortBinCard } from "@/components/projects/smartsortbin-card";
import { ScrapeDaddyCard } from "@/components/projects/scrapedaddy-card";
import { TechbayCard } from "@/components/projects/techbay-card";
import { TechbayDashboardCard } from "@/components/projects/techbay-dashboard-card";
import { WholesaleScraperCard } from "@/components/projects/wholesale-scraper-card";

export function ProjectsTab() {
  return (
    <div>
      <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
        Projects
      </p>
      <h2 className="font-display text-5xl text-foreground">
        Things I've <em className="italic text-muted-foreground">built</em>
      </h2>

      {/* Work projects */}
      <div className="mt-10">
        <h4 className="mb-6 border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
          Work
        </h4>
        <div className="space-y-4">
          <TechbayCard />
          <TechbayDashboardCard />
          <WholesaleScraperCard />
        </div>
      </div>

      {/* Personal projects */}
      <div className="mt-12">
        <h4 className="mb-6 border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
          Personal
        </h4>
        <div className="space-y-4">
          <RustServiceCard />
          <ExioCard />
          <SmartSortBinCard />
          <ScrapeDaddyCard />
        </div>
      </div>

      {/* Skills */}
      <div className="mt-12">
        <h4 className="mb-4 border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
          Tools & Skills
        </h4>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex flex-wrap gap-1.5"
        >
          {[
            "Claude",
            "Cursor",
            "Agentic AI Dev",
            "Docker",
            "Linux",
            "Firebase",
            "Server Infrastructure",
            "Git",
            "Shopify",
            "Hardware Repair",
            "IT Support",
            "Networking",
          ].map((skill) => (
            <span
              key={skill}
              className="rounded-md bg-accent/10 px-3 py-1.5 font-mono text-[10px] font-semibold text-accent"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-8 font-mono text-[10px] leading-relaxed text-muted-foreground"
      >
        All projects built using AI-augmented development with Claude and Cursor.
      </motion.p>
    </div>
  );
}
