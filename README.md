# Er. Jiss Boban — Technical Dossier & Engineering Portfolio

> Minimalist Editorial / Swiss International Typographic Style  
> Strict Monochrome (Pure Black & Pure White) • High-Density Enterprise Dossier  
> [LinkedIn Profile](https://www.linkedin.com/in/jissboban07) • [Email Contact](mailto:jissboban@gmail.com)

Welcome to the redesigned portfolio repository for **Er. Jiss Boban**, Associate Security Engineer at **Paramount Computer Systems** and Microsoft Transformation Engineer.

---

## 🏛️ Design Paradigm: "Signal Over Noise"

Following the specifications outlined in [`DESIGN.md`](./DESIGN.md), this website has been redesigned from the ground up:
- **Strict Monochrome Color System**: Pure blacks (`#000000`), crisp whites (`#ffffff`), and calibrated neutral grays. Zero decorative color gradients or synthetic glows.
- **Editorial Typography**: Powered by `Google Sans Flex` (primary sans) and `JetBrains Mono` (technical / monospace metrics).
- **Zero Distractions**: All artificial waiting gates, simulated CAPTCHA challenges, canvas particles, and 3D flip cards have been removed in favor of authoritative, high-density case studies and tabular credential indexes.
- **Responsive 960px Grid**: Clean hairline dividers (`1px solid var(--border-subtle)`), 8-point typographic rhythm, and print-ready PDF resume generation.

---

## 📂 Architecture & Directory Structure

This repository provides both an **instant zero-build single-page web app** (ready for GitHub Pages and local viewing) and a **fully scaffolded Vite + React + TypeScript** modular migration:

```text
jiss_portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Pages deployment workflow
├── assets/
│   ├── css/
│   │   └── style.css             # Monochrome design system & tokens
│   ├── js/
│   │   └── main.js               # Theme switching, modal, & telemetry
│   └── images/                   # Technical diagrams & monochrome portraits
│       ├── ai-portrait-primary.png
│       ├── drone.jpg
│       ├── project-workbook.jpg
│       ├── project-logstash.jpg
│       ├── project-copilot.jpg
│       ├── project-soar.jpg
│       └── project-ccf-rules.jpg
├── src/                          # Strongly-typed Vite + React + TypeScript source
│   ├── types/                    # Interfaces (project, credential, experience, profile)
│   ├── data/                     # Typed data modules
│   ├── components/               # Layout, sections, and UI components
│   ├── App.tsx                   # Master orchestration
│   ├── main.tsx                  # React DOM root
│   └── index.css                 # Style entrypoint
├── index.html                    # High-performance editorial single-page dossier
├── DESIGN.md                     # Full Technical & Visual Specification
├── package.json                  # Vite + React + TS dependencies
├── tsconfig.json                 # Strict TypeScript configuration
├── tsconfig.node.json
├── vite.config.ts                # Vite config with base path resolution
└── README.md
```

---

## 🛠️ Key Sections & Features

1. **Sticky Header**: Minimal brand mark, section navigation links, printable CV modal trigger, and instant `[Light / Dark]` monochrome theme switch.
2. **Hero Dossier**: Direct engineering summary, role affiliation at Paramount Computer Systems, and direct action coordinates.
3. **Executive Impact Strip**: Verified enterprise deployment coverage across Dubai & Kuwait Government, Commercial Aviation, Telecommunications, and Enterprise Healthcare.
4. **Section 01 // About & Principles**: High-resolution monochrome portrait and 4 core engineering principles (Signal Over Noise, Zero-Trust Boundaries, Zero-Touch Containment, Agentic Forensics).
5. **Section 02 // Chronological Dossier**: Unified career and academic timeline detailing Microsoft Sentinel SIEM workspace architecture, DCR cost optimization (>60%), and AISAT B.Tech degree (8.65 CGPA, Principal's Club).
6. **Section 03 // Selected Engineering Systems**: 6 in-depth architectural case studies (Rescue Drone, Sentinel Workbooks, Ingestion Pipelines, Security Copilot, Logic Apps SOAR, and Codeless Connector Framework).
7. **Section 04 // Honors & Recognitions**: PT Thomas MLA Excellence Award, KTU State Selection for ENTE KERALAM Expo, and AISAT Principal's Club Induction.
8. **Section 05 // Verified Credentials Index**: High-density tabular index of all 11 verified certifications across Microsoft, Anthropic, IISc Bangalore, and NPTEL.
9. **Section 06 // Capabilities Matrix**: 4-column monospace capabilities index across SIEM, SOAR, Agentic AI, and Core Engineering.
10. **Section 07 // Direct Communication**: Direct communication channels with one-click clipboard copy.
11. **Printable CV Modal**: Print and PDF-ready resume viewer optimized with dedicated `@media print` rules.

---

## 🚀 Running Locally

### Option A: Instant Static Preview (No Node.js Required)
Simply open `index.html` in any modern web browser or serve via Python:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### Option B: Vite + React + TypeScript Dev Server (When Node.js is installed)
```bash
npm install
npm run dev
```

---

## 📜 License & Copyright
© 2026 Er. Jiss Boban. All rights reserved.
