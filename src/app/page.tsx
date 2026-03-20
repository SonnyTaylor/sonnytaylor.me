"use client";

import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ExperienceTab } from "@/components/tabs/experience";
import { ProjectsTab } from "@/components/tabs/projects";
import { ContactTab } from "@/components/tabs/contact";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-clip">
      <Navbar />

      <Hero />

      <section id="experience" className="mx-auto max-w-5xl px-8 py-24 sm:px-16">
        <ExperienceTab />
      </section>

      <section id="projects" className="mx-auto max-w-5xl px-8 py-24 sm:px-16">
        <ProjectsTab />
      </section>

      <section id="contact" className="mx-auto max-w-5xl px-8 py-24 sm:px-16">
        <ContactTab />
      </section>
    </div>
  );
}
