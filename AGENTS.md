# AGENTS.md — Autonomous Agent Operating Guidelines

## 🤖 Purpose
This guide defines operational protocols and architectural boundaries for autonomous AI coding agents collaborating on this codebase.

---

## 🎯 Core Objectives
1. **Pixel-Perfect Visual Fidelity**: Replicate Airbnb listing visual standards, typography, colors, borders, and interactive transitions.
2. **Deterministic Builds**: Every change must produce a zero-error production build (`npm run build`).
3. **Strict Type Safety**: Maintain TypeScript strict mode with comprehensive data and prop interfaces.
4. **Audit Traceability**: Record every prompt and agent milestone in `ai-workflows/PROMPTS_LOG.md`.

---

## 🔍 Verification Protocol
Before marking any task complete:
1. **Compile Check**: Run `npm run build` to ensure Turbopack, TypeScript, and ESLint pass without warnings.
2. **Visual Verification**: Render the view in a headless browser (desktop 1280px / 1024px) and inspect against user-provided reference screenshots.
3. **Interactive Testing**: Verify modal triggers (`PhotoTourModal`, `LightboxModal`, guest dropdown, info modals) open, navigate, and close smoothly.
4. **Asset Budget**: Ensure the packaged offline submission zip remains strictly under 1MB.

---

## 🏗️ Architecture & Component Boundaries
- **Page Layout**: `src/app/page.tsx` serves as the root controller, coordinating modal state and rendering modular sections.
- **Components (`src/components/`)**:
  - Keep components modular, self-contained, and reusable.
  - Separate concerns: presentation in components, centralized data model in `src/data/listingData.ts`.
- **CSS / Styling**:
  - Tailwind CSS v4 utility classes.
  - Do not inject ad-hoc inline styles unless dynamically calculating coordinates (e.g., FLIP layout transitions).

---

## 🚫 Critical Constraints
- **Preserve Documentation Integrity**: Never delete or overwrite prompt logs in `ai-workflows/PROMPTS_LOG.md`.
- **Offline Self-Containment**: The application must run locally without external authentication or paid API dependencies.
