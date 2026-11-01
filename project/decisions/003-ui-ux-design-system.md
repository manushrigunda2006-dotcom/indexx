# ADR 003: UI/UX Design System & Visualization Architecture

- **Status:** Confirmed
- **Date:** 2026-11-01
- **Deciders:** UI/UX Designer, Full-Stack Developer

---

## Context
The IndexX web interface must deliver a modern, premium, enterprise-grade developer tool experience that impresses hackathon judges and users. It must blend the clarity of high-end developer dashboards (e.g. Datadog, Vercel, Linear) with educational and investigative search tooling (e.g. Elasticsearch Dev Tools, Kibana).

## Decision
Establish a cohesive design language, typography, and component hierarchy:

1. **Theme & Palette:**
   - **Background:** Deep Navy Canvas (`#080C14`), Card Surface Charcoal (`#0F172A`), Elevated Panel (`#1E293B`).
   - **Borders & Glass:** Subtle translucent slate borders (`#334155` at 50% opacity) with backdrop-filter blur (`backdrop-blur-md`).
   - **Accents:** Electric Blue (`#3B82F6`), Neon Cyan (`#00F0FF`), and Violet Gradient (`#8B5CF6` to `#6366F1`) for highlights, execution flows, and active states.
   - **Status Indicators:** Success Emerald (`#10B981`), Warning Amber (`#F59E0B`), Error Crimson (`#EF4444`).

2. **Typography & Layout:**
   - **Primary Font:** Inter / sans-serif for UI labels, metrics, and navigation.
   - **Monospace Font:** JetBrains Mono for queries, tokens, DocIDs, posting lists, and developer logs.
   - **Dashboard Layout:** Sidebar navigation with persistent top header showing engine connectivity, corpus stats, and quick-action keyboard shortcuts (`/` for search, `Ctrl+K` for command palette).

3. **Motion & Interaction Design:**
   - Framer Motion for smooth tab transitions, modal appearances, and stepped postings list animations (visualizing set intersections).
   - Recharts configured with custom dark-mode tooltips, gradient fills, and responsive containers.
   - Zero-layout-shift skeleton loaders for data tables and metric cards.

## Accessibility & Responsiveness
- Desktop-first enterprise layout with full responsive collapse for mobile/tablet.
- Keyboard navigation throughout query playground, explorer, and search inputs.
