# CLAUDE.md — Project Guide & Coding Instructions

## Overview
This repository contains a desktop clone of the Airbnb listing page for **"Romantic Jacuzzi 1BHK Candolim | Mirashya UG10"**, developed for the **Playpower Labs Take-Home Task**.

---

## 🛠️ Build, Development & Verification Commands
- **Install dependencies**: `npm install`
- **Start development server**: `npm run dev` (runs Next.js Turbopack dev server on http://localhost:3000)
- **Production build**: `npm run build` (runs Next.js static page generation & TypeScript compilation)
- **Start production server**: `npm run start -- -p 3000`
- **Lint code**: `npm run lint` (ESLint 9 with Next.js Core Web Vitals configuration)

---

## 🏗️ Architecture & Tech Stack
- **Framework**: Next.js 16.3.6 (App Router with Turbopack)
- **UI Library**: React 19.2.8
- **Language**: TypeScript 5 (Strict Mode enabled)
- **Styling**: Tailwind CSS v4 (Zero-runtime utility tokens)
- **Icons**: Lucide React + custom Airbnb SVG icons
- **Animations**: Framer Motion 13+ (spring and cubic-bezier transitions)

---

## 🎨 Design Tokens & UI Guidelines
- **Primary Accent / Brand**: Airbnb Coral `#ff385c` / Rausch `#e61e4d`
- **Text Primary**: Dark Charcoal `#222222`
- **Text Secondary**: Muted Grey `#717171`
- **Dividers & Borders**: `#ebebeb` / `#dddddd`
- **Subtle Surface / Grey Badges**: `#f2f2f2` / `#f7f7f7`
- **Card Backgrounds**: `#ffffff` with soft drop shadows (`shadow-sm`, `shadow-xl`)
- **Font Stack**: System sans-serif matching Airbnb Cereal (`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`)

---

## 📐 Code Style & Conventions
- **Component Modularity**: Single Responsibility Principle. Place all UI modules in `src/components/`.
- **Naming Conventions**:
  - Components: `PascalCase.tsx` (e.g., `HostProfileSection.tsx`, `ThingsToKnowSection.tsx`)
  - Utility/Data: `camelCase.ts` (e.g., `listingData.ts`)
- **Typing**: Explicit TypeScript interfaces for all props and data entities. Avoid `any`.
- **Accessibility**: Use semantic HTML (`<header>`, `<main>`, `<section>`, `<h1>`–`<h3>`), `aria-label`, and `role="dialog"` for modals.
- **Client Components**: Mark interactive components with `"use client";` at line 1.
- **Image Handling**: Use Next.js `<Image />` component with dimensions, priority where appropriate, or scalable SVG icons.

---

## 📁 Key File Locations
- `src/app/page.tsx`: Main listing page composition and modal orchestrator.
- `src/components/`: Modular presentation components (Navbar, Photos, Booking, Reviews, Map, Host, Things to know).
- `src/data/listingData.ts`: Central listing data source (photos, reviews, pricing, rules).
- `architecture/`: Production scaling architecture diagram (PNG & PDF) and scaling strategy document.
- `ai-workflows/PROMPTS_LOG.md`: Step-by-step audit log of all AI prompts and implementation milestones.
