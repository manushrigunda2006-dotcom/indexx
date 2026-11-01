# ADR 004: Minimalist Google-Inspired Search Interface Redesign

- **Status:** Confirmed
- **Date:** 2026-11-01
- **Deciders:** Senior Software Architect, UI/UX Designer, Full-Stack Developer

---

## Context
The user requested a complete visual redesign of the IndexX web platform from the previous cyber-industrial dark theme into a clean, minimalist Google-inspired search experience with a white background, generous whitespace, clean typography, and a centered search bar on the homepage. All existing functionality (Boolean search, phrase search, query playground, index explorer, performance dashboard, benchmark lab, and documentation) had to be strictly preserved on dedicated accessible pages rather than cluttering the homepage.

## Decision
1. **Clean White Theme & Google Aesthetic:**
   - Switched from dark navy to pure white background (`#FFFFFF`) with subtle grey borders (`#DFE1E5` / `#E5E7EB`).
   - Clean typography using Google-inspired font hierarchy, minimal electric blue (`#1A73E8`) and emerald green (`#1E8E3E`) accents.
   - Removed all distracting cards, heavy gradients, and complex charts from the homepage.

2. **Homepage Layout (`HomeView.tsx`):**
   - Centered IndexX logo with clean subtitle "Search Beyond Limits".
   - Large, rounded search bar (`rounded-full`) with subtle box shadow on hover and focus.
   - Search suggestions & recent query history dropdown with keyboard navigation (`/` to focus, `Escape` to close).
   - "IndexX Search" and "I'm Feeling Fast" action buttons.
   - Minimalist syntax guide chips for Boolean operators (`AND`, `OR`, `NOT`) and exact phrases (`"..."`).

3. **Google-Inspired Search Results Page (`SearchResultsView.tsx`):**
   - Top search bar with IndexX logo linking back to home.
   - Result count and microsecond execution timer badge.
   - Google link blue titles (`#1A0DAB`), URL/ID breadcrumbs, and keyword-in-context (KWIC) highlighted snippets.
   - Click-to-preview document inspection modal (`DocumentPreviewModal.tsx`).
   - Clean Google-style pagination (`< Previous 1 2 3 Next >`).
   - Right-hand query intelligence card displaying the Boolean execution trace.

4. **Dedicated Subpage Navigation (`Navbar.tsx`):**
   - Simple top navigation with links to Dashboard, Query Playground, Index Explorer, Benchmark Lab, AI Assistant, and Docs.
   - Google-style 9-dot App Grid dropdown for quick access to all modules.
   - User profile avatar with evaluator status and offline harness indicators.

5. **Separation of Concerns:**
   - C++ search engine remains decoupled.
   - Demo corpus preview is clearly identified to judges, preventing any ambiguity with official offline Docker evaluation runs.
