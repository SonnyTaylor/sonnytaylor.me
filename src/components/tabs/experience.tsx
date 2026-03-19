"use client";

import { motion } from "motion/react";

const experience = [
  {
    title: "Junior Repair Technician",
    company: "Techbay Computer Specialists",
    location: "Highett, VIC",
    date: "Jun 2024 - Present",
    description:
      "Diagnose and repair PCs, laptops, and mobile devices. Handle customer interactions, manage inventory, and build internal tools. Developed the company's online store and internal portal from scratch using AI-augmented development.",
  },
];

const education = [
  {
    title: "VCE",
    company: "Beaumaris Secondary College",
    location: "Cheltenham, VIC",
    date: "2020 - 2025",
    description:
      "Year 12. Subjects: Food Studies, Systems Engineering, English, General Maths, Psychology. Completed Applied Computing.",
  },
];

export function ExperienceTab() {
  return (
    <div>
      <SectionLabel>Experience</SectionLabel>
      <PageTitle>
        Where I've <em>worked</em>
      </PageTitle>

      <div className="mt-10 space-y-8">
        {experience.map((exp, i) => (
          <motion.div
            key={exp.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
          >
            <ExperienceEntry {...exp} />
          </motion.div>
        ))}
      </div>

      <div className="mt-16">
        <SectionDivider>Education</SectionDivider>
        <div className="mt-6 space-y-8">
          {education.map((edu, i) => (
            <motion.div
              key={edu.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
            >
              <ExperienceEntry {...edu} />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionDivider>Certifications</SectionDivider>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-6 space-y-2"
        >
          <p className="font-mono text-sm text-foreground">
            Google IT Support Professional Certificate
          </p>
          <p className="font-mono text-[11px] text-muted-foreground">
            Coursera - 2024
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ExperienceEntry({
  title,
  company,
  location,
  date,
  description,
}: {
  title: string;
  company: string;
  location: string;
  date: string;
  description: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h3 className="font-display text-[22px] text-foreground">{title}</h3>
        <span className="font-mono text-[10px] font-medium text-muted-foreground">
          {date}
        </span>
      </div>
      <p className="mb-2 font-mono text-[11px] font-medium text-accent">
        {company} · {location}
      </p>
      <p className="font-mono text-[11px] leading-[1.7] text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
      {children}
    </p>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-5xl text-foreground [&>em]:italic [&>em]:text-muted-foreground">
      {children}
    </h2>
  );
}

function SectionDivider({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="border-b border-border pb-2 font-mono text-[10px] font-bold uppercase tracking-[3px] text-accent">
      {children}
    </h4>
  );
}
