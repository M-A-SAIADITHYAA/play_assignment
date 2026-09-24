# Airbnb Clone — Playpower Labs Take-Home Assignment

A pixel-perfect desktop clone of the Airbnb listing page, built in accordance with the **Playpower Labs Take-Home Task: Airbnb-Clone App** specification.

---

## 🚀 Live Demo & Local Setup

### Prerequisites
* Node.js 18+ (tested on Node.js v22)
* npm 9+

### Installation & Running Locally

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Run Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📱 Three Required Views Implemented

1. **Listing Page** (`/`):
   * Full desktop property page with identical spacing, typography, and colors.
   * Sticky top navigation bar with auto-tracking scroll tabs (*Photos, Amenities, Reviews, Location*) and quick Reserve CTA.
   * 5-photo hero mosaic with smooth hover brightness transitions and *"Show all photos"* floating button.
   * 2-column layout: left column property details, right column sticky booking widget.
   * Interactive components: 10% discount claim, date picker calendar, guest count selector, reviews filter tags, OpenStreetMap embed, and host messaging modal.

2. **Photo Tour** (`/?modal=PHOTO_TOUR_SCROLLABLE`):
   * Full-screen gallery organized room-by-room (*Living room 1, Living room 2, Full kitchen, Bedroom, Full bathroom, Gym, Exterior, Pool, Additional photos*).
   * Displays room amenity tags and high-resolution photo grids.
   * Clicking any photo opens the Lightbox single-photo viewer.

3. **Lightbox Viewer** (`/?modal=PHOTO_TOUR_SCROLLABLE&modalItem={id}`):
   * Single-photo viewer with smooth fade transitions (Framer Motion).
   * Previous/Next navigation buttons (disabled at edges).
   * **Keyboard Controls**: $\leftarrow$ (previous), $\rightarrow$ (next), and `Escape` (close/back).
   * **Accessibility**: WAI-ARIA `role="dialog"`, background scroll locking, and Tab focus trapping.

---

## 🏛️ Architecture Deliverables

As requested by the take-home specification, a production-scale vacation-rental marketplace architecture is provided in the `architecture/` folder:

* **High-Resolution Diagram (PNG)**: [`architecture/vacation-rental-marketplace-architecture.png`](architecture/vacation-rental-marketplace-architecture.png)
* **Printable Vector Diagram (PDF)**: [`architecture/vacation-rental-marketplace-architecture.pdf`](architecture/vacation-rental-marketplace-architecture.pdf)
* **Detailed Technical Document**: [`architecture/ARCHITECTURE.md`](architecture/ARCHITECTURE.md) covering scaling strategies across:
  * Frontend & Edge Delivery (ISR + Global CDN)
  * Gateway & Security (WAF, Bot Mitigation, Envoy Gateway, GraphQL Federation)
  * Core Microservices (Distributed Saga booking engine, Redis availability bitsets)
  * Storage Tier (Aurora PostgreSQL, OpenSearch geospatial index, Kafka streaming)
  * Deployment & Reliability (Multi-Region Kubernetes, GitOps canary deployments)

---

## 🤖 AI Workflow, Subagents & Prompts Log

The assignment evaluated modern AI-native workflows. The configurations and logs are preserved in `ai-workflows/`:

* **Subagent Configurations**:
  * [`ai-workflows/subagents/ui-fidelity-agent.json`](ai-workflows/subagents/ui-fidelity-agent.json): Specialist agent for visual parity and token verification.
  * [`ai-workflows/subagents/architecture-designer.json`](ai-workflows/subagents/architecture-designer.json): Specialist agent for distributed systems scaling.
* **Skill Configurations**:
  * [`ai-workflows/skills/airbnb-design-tokens/SKILL.md`](ai-workflows/skills/airbnb-design-tokens/SKILL.md): Token specifications (colors, typography, spacing).
  * [`ai-workflows/skills/accessibility-checker/SKILL.md`](ai-workflows/skills/accessibility-checker/SKILL.md): ARIA roles, focus trap, and keyboard navigation.
* **Prompts Sequence**:
  * [`ai-workflows/PROMPTS_LOG.md`](ai-workflows/PROMPTS_LOG.md): Full chronological sequence of prompts and development milestones.

---

## 🔒 Confidentiality Notice
As instructed in the assignment, this codebase has **not** been pushed to a public GitHub repository and is packaged for private submission.
