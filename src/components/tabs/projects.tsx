"use client";

import { motion } from "motion/react";

interface Project {
  name: string;
  stack: string;
  description: string;
  screenshot?: string;
  link?: string;
}

const workProjects: Project[] = [
  {
    name: "Techbay Store",
    stack: "Next.js · Tailwind · Shopify",
    description:
      "Full e-commerce storefront with Shopify integration and AI chatbot for customer support.",
    screenshot: "/projects/techbay-store.png",
  },
  {
    name: "Techbay Portal",
    stack: "Next.js · Firebase · Tailwind",
    description:
      "Internal dashboard for managing repairs, inventory tracking, and customer records.",
    screenshot: "/projects/techbay-portal.png",
  },
  {
    name: "Wholesale IT Scraping Tool",
    stack: "TypeScript · Puppeteer",
    description:
      "Automated product scraper that pulls inventory and pricing from wholesale IT suppliers.",
    screenshot: "/projects/scraper.png",
  },
];

const personalProjects: Project[] = [
  {
    name: "RustService",
    stack: "Tauri · Rust · React",
    description:
      "Desktop toolkit for repair techs with a built-in AI agent for diagnostics.",
    link: "https://github.com/SonnyTaylor/RustService",
    screenshot: "/projects/rustservice.png",
  },
  {
    name: "Smart Sort Bin",
    stack: "Computer Vision · Edge AI",
    description:
      "AI-powered waste sorting bin. VCE Systems Engineering project.",
    link: "https://github.com/SonnyTaylor/smart-sort-bin",
    screenshot: "/projects/smart-sort-bin.png",
  },
  {
    name: "exio",
    stack: "Go · WebSockets",
    description: "Self-hosted ngrok alternative via WebSocket tunnels.",
    link: "https://github.com/SonnyTaylor/exio",
    screenshot: "/projects/exio.png",
  },
];

export function ProjectsTab() {
  return (
    <div>
      <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
        Projects
      </p>
      <h2 className="font-display text-5xl text-foreground">
        Things I've <em className="italic text-muted-foreground">built</em>
      </h2>

      <div className="mt-10">
        <h4 className="mb-4 border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
          Work Projects
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {workProjects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h4 className="mb-4 border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
          Personal Projects
        </h4>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {personalProjects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.4 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
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

function ProjectCard({ project }: { project: Project }) {
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? { href: project.link, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group block cursor-pointer rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-border/80 hover:shadow-md"
    >
      {/* Screenshot placeholder */}
      <div className="mb-4 aspect-video w-full overflow-hidden rounded-lg bg-muted">
        {project.screenshot ? (
          <img // eslint-disable-line @next/next/no-img-element
            src={project.screenshot}
            alt={project.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
              (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
            }}
          />
        ) : null}
        <div className={`flex h-full w-full items-center justify-center ${project.screenshot ? "hidden" : ""}`}>
          <span className="font-mono text-[10px] text-muted-foreground">
            Screenshot coming soon
          </span>
        </div>
      </div>

      <h3 className="font-display text-xl text-foreground">{project.name}</h3>
      <p className="mb-2 font-mono text-[9px] font-semibold tracking-[0.5px] text-accent">
        {project.stack}
      </p>
      <p className="font-mono text-[10px] leading-[1.6] text-muted-foreground">
        {project.description}
      </p>
    </Wrapper>
  );
}
