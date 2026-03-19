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
  {
    title: "Trade Apprentice",
    company: "The Door Taylor",
    location: "Toorak, VIC",
    date: "Jan 2024",
    description:
      "Flooring installation, demolition, and waste removal. Hands-on trade work requiring precision and physical problem-solving.",
  },
  {
    title: "Junior IT Technician",
    company: "Yeshivah - Beth Rivkah Colleges",
    location: "St Kilda, VIC",
    date: "Jan 2023",
    description:
      "Refurbished school computers by securely erasing data and reinstalling operating systems. Organised laptops and cables for charging stations across the school.",
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
        <div className="mt-6 space-y-5">
          {[
            { name: "Google IT Support Professional Certificate", issuer: "Coursera", date: "2024" },
            { name: "Operating Systems Basics", issuer: "Cisco Networking Academy", date: "Oct 2023" },
            { name: "Computer Hardware Basics", issuer: "Cisco Networking Academy", date: "Oct 2023" },
            { name: "Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Oct 2023" },
            { name: "Python for Beginners", issuer: "Grok Learning", date: "Sep 2023" },
          ].map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
              className="space-y-1"
            >
              <p className="font-mono text-sm text-foreground">{cert.name}</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                {cert.issuer} · {cert.date}
              </p>
            </motion.div>
          ))}
        </div>
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
