# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `bun dev` — Start dev server (Turbopack)
- `bun run build` — Production build
- `bun run lint` — ESLint

No test runner is configured.

## Architecture

Personal portfolio site built with **Next.js 16** (App Router), **React 19**, **TypeScript**, and **Tailwind CSS v4**.

### Key tech choices

- **React Compiler** enabled (auto-memoization — do not add manual `useMemo`/`useCallback`)
- **Tailwind v4** — no `tailwind.config.ts`; theme is defined via `@theme` in `globals.css`
- **motion/react** for animations (Framer Motion successor)
- **shadcn (base-nova style)** + Base UI for components; CVA for variants
- **Path alias:** `@/*` → `src/*`

### Structure

- `src/app/page.tsx` — Main page (client component), orchestrates all sections
- `src/components/hero.tsx` — Hero section with parallax tools, directional shadows, depth-of-field blur
- `src/components/terminal-content.tsx` — Animated terminal with custom color markup and step-based animation system
- `src/components/tabs/` — Experience, Projects, Contact sections
- `src/components/ui/` — Reusable UI (button, cutting-mat SVG, macbook-scroll 3D mockup)
- `src/app/workbench-editor/` — Dev-only tool for interactively positioning hero items
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge)

### Fonts

Three font families loaded via `next/font`:
- `--font-display` (Instrument Serif), `--font-mono` (JetBrains Mono), `--font-handwriting` (Caveat)

### Visual system

The hero section uses math-heavy rendering: directional shadow calculations from a light source, parallax with per-item elevation multipliers, and depth-of-field blur based on distance from viewport center. Changes to hero items are easiest to iterate on using the workbench editor at `/workbench-editor`.
