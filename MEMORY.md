# INDEXX – Master Project Memory & Architecture Specification

> **Project:** IndexX  
> **Tagline:** *Search Beyond Limits.*  
> **Competition:** Speed Demon 72-Hour Hackathon  
> **Selected Track:** Track B – Index (Search Indexing)  
> **Role:** Senior Software Architect, Full-Stack Developer, UI/UX Designer, Performance Engineering Specialist  
> **Last Updated:** 2026-11-01  
> **Status:** Phase 1 – Architecture & Memory Setup Active

---

## 1. Executive Summary & Objective

**IndexX** is an ultra-high-performance intelligent document search platform engineered for the Speed Demon 72-Hour Hackathon (Track B). The platform bifurcates into two strictly decoupled yet harmoniously connected systems:

1. **High-Performance C++ Competition Search Engine:**  
   The core engine designed for official offline evaluation. Built for maximum throughput, sub-millisecond tail latency, compact positional inverted indexes, and zero-allocation query execution over large text corpuses (250 MB corpus, 50,000 queries) under strict Docker harness constraints.
2. **Modern Next.js Full-Stack Web Application:**  
   An enterprise-grade developer studio and demonstration cockpit offering real-time query execution inspection, index exploration, visual AST execution graphs, performance analytics, and a benchmark comparison lab.

> [!IMPORTANT]
> **Strict Competition Boundary:**  
> The web interface and its adapters must **NEVER** introduce runtime overhead, non-standard dependencies, or compromise the correctness, determinism, or offline constraints of the official C++ submission engine.

---

## 2. Technology Stack Architecture

```
+---------------------------------------------------------------------------------------+
|                                    PRESENTATION LAYER                                 |
|  Next.js 14+ (App Router)  *  React 18/19  *  TypeScript  *  Tailwind CSS             |
|  Framer Motion (Micro-interactions)  *  Lucide Icons  *  Recharts (Data Visualizations)|
+-------------------------------------------+-------------------------------------------+
                                            | REST / JSON / IPC
+-------------------------------------------v-------------------------------------------+
|                                     ADAPTER LAYER                                     |
|  Next.js Route Handlers  /  Lightweight C++ REST Daemon (Crow / cpp-httplib / std::cin)|
+-------------------------------------------+-------------------------------------------+
                                            | Zero-Copy Internal C++ Calls
+-------------------------------------------v-------------------------------------------+
|                              COMPETITION C++ SEARCH CORE                              |
|  C++20  *  SIMD Bitmaps (AVX2/NEON)  *  Positional Inverted Index                     |
|  Memory-Mapped Corpus (mmap)  *  Elias-Fano / Roaring / Varint Compression           |
|  Zero-Heap Query Processing  *  Galloping / SvS Intersection Algorithms               |
+---------------------------------------------------------------------------------------+
```

### Detailed Component Specifications

- **Frontend & Visualization:**
  - Framework: Next.js (TypeScript, React)
  - Styling: Tailwind CSS with dark theme tokens (dark navy `#0B0F19`, charcoal `#111827`, electric blue `#3B82F6` / `#00F0FF`, violet accents `#8B5CF6`)
  - Motion: Framer Motion for execution step animations and visual postings list operations
  - Charts: Recharts for latency histograms, P50/P95/P99 curves, and memory profiles
  - Icons: Lucide React
- **Backend & Adapters:**
  - Competition C++ Search Engine: Self-contained binary compilable via GCC/Clang with standard flags (`-O3 -march=native -pthread`)
  - Adapter: Headless REST API adapter bridge (and CLI batch harness interface for benchmark ingestion)
  - Next.js API Routes: Server-side query validation, adapter proxies, AI orchestration, export formatters
- **Infrastructure & Development:**
  - Git / GitHub version control
  - Official Docker harness compliance (Ubuntu base, memory/CPU quotas, offline container)
  - VS Code workspace configurations and environment variables

---

## 3. Core Search Engine Specification (Track B)

### Official Workload & Targets
- **Corpus Size:** 250 MB raw text documents.
- **Query Load:** 50,000 queries (Boolean, Phrase, Multi-term, Exclusions).
- **Correctness:** 100% exact matching against ground truth.
- **Constraints:** Zero network egress, fixed memory budget, CPU time limits.

### Engine Architecture
- **Tokenizer & Normalizer:** High-speed ASCII/UTF-8 streaming tokenizer with zero intermediate allocations, SIMD case conversion, and punctuation stripping.
- **Inverted Index:** Term dictionary with hash-table / minimal perfect hash index pointing into contiguous posting memory.
- **Positional Indexing:** Document IDs with delta-encoded position offsets to support exact phrase search.
- **Posting-List Optimization:** Compressed postings lists using SIMD-BP32, Varint, or Elias-Fano; Skip pointers / chunk metadata for galloping intersections.
- **Query Execution Engine:**
  - Boolean Operators: `AND`, `OR`, `NOT`.
  - Exact Phrase Matching: Positional verification using 2-pointer scan with distance delta checks.
  - Query Optimization: Cost-based evaluation ordering (shortest posting list first for intersections).
  - Profiling: Cycle-accurate query execution timers (TSC or `std::chrono::high_resolution_clock`).

---

## 4. Web Application Modules (Phased Breakdown)

| Module | Purpose | Status |
| :--- | :--- | :--- |
| **A. Overview Dashboard** | System vitals, corpus metrics, query counters, engine health, recent activity | `[Planned]` |
| **B. Advanced Search** | Full-featured Boolean & phrase search, highlights, previews, latency badge, pagination | `[Planned]` |
| **C. Query Playground** | Interactive query AST builder, syntax validator, execution plan visualizer, templates | `[Planned]` |
| **D. Inverted Index Explorer**| Term lookup, posting list inspection, docID mapping, term frequency & positions | `[Planned]` |
| **E. Performance Dashboard** | Indexing duration, latency distributions (P50/P95/P99), RAM usage, throughput curves | `[Planned]` |
| **F. Benchmark Lab** | Reference vs Optimized A/B tests, speedup multipliers, verified test harness runs | `[Planned]` |
| **G. Documentation Center** | Architecture diagrams, algorithmic deep-dives, API specifications, Docker guides | `[Planned]` |

---

## 5. Premium Differentiators & Roadmap

1. **AI Search Assistant:** Natural language to Boolean query translation, query correction, empty-result explainability.
2. **Visual Query Execution:** Interactive step-through animation of posting list intersections, unions, and positional verifications.
3. **Smart Search Suggestions:** Trie-based prefix autocomplete, typo correction, and query suggestion graphs.
4. **Document Preview:** High-efficiency keyword-in-context (KWIC) snippets with match term highlighting.
5. **Advanced Search Filters:** Facets by DocID, score thresholds, mode toggles (strict vs fuzzy).
6. **Search Analytics:** Query frequency distribution, latency percentiles, error rate telemetry.
7. **Developer Console:** Live API request/response inspector, engine diagnostic logs, IPC heartbeat.
8. **Benchmark Report Generator:** One-click CSV/JSON export and PDF performance executive summaries.
9. **Interactive Learning Center:** Visual educational sandbox explaining inverted indexes, Elias-Fano compression, and skip lists.
10. **Personalization:** Dark/Light theme toggle, query bookmarks, configurable layout widgets.
11. **System Health Monitor:** Real-time multi-tier ping (Next.js -> Adapter -> C++ Engine) with degraded state alerts.
12. **Interactive Onboarding:** Guided interactive tour of the platform for hackathon judges and developers.

---

## 6. UI/UX Design System Specification

- **Theme & Atmosphere:** Minimalist Google-inspired developer search engine with clean white aesthetics and generous whitespace.
- **Color Palette:**
  - Clean Canvas Background: Pure White (`#FFFFFF`)
  - Elevated Cards / Surfaces: Clean White with subtle borders (`#E5E7EB` / `#DFE1E5`) and soft hover shadows
  - Primary Text: `#202124` (Charcoal Slate), Subtext: `#5F6368` (Muted Grey)
  - Google Link Blue: `#1A0DAB` (hover underline), Accent Blue: `#1A73E8`
  - Engine Status Green: `#1E8E3E` (Offline ready / Success)
  - Accent Amber: `#F9AB00` (Warnings / Benchmarks)
- **Homepage Structure:**
  - Centered minimalist IndexX logo and tagline.
  - Large rounded pill search bar (`rounded-full`) with search suggestions, history, and `/` shortcut.
  - Minimal action buttons ("IndexX Search", "I'm Feeling Fast") and subtle syntax hints.
  - Uncluttered: Complex cards, charts, and dashboards moved to dedicated, accessible subpages.
- **Search Results Page:**
  - Google-inspired top search bar and brand link.
  - Result count & microsecond execution timer badge.
  - Link blue titles, URL/ID breadcrumbs, and keyword-in-context (KWIC) highlights.
  - Document inspection preview modal and simple pagination.
  - Right-hand query intelligence sidebar for AST traces.

---

## 7. Development Discipline & Rules

1. **Verification Before Action:** Inspect code files prior to editing. Never overwrite working code.
2. **Zero Fabrication Policy:** Never show synthetic or fake benchmark results in the Benchmark Lab. If the engine hasn't executed a test, show clear unbenchmarked or pending state.
3. **Correctness First:** Official Track B scoring rules dominate. Visual features must never compromise engine performance or offline submission compliance.
4. **TypeScript Strictness:** Strict typing throughout the full stack; no loose `any` types for query ASTs or engine responses.
5. **Memory Management Tracking:** Update `project/features/`, `project/decisions/`, and `project/experiments/` alongside every major architectural change.

---

## 8. Memory Structure Directory Map

```
indexx/
|-- MEMORY.md                          <-- (This file) Master Context & Overview
`-- project/
    |-- decisions/                     <-- Confirmed architectural decisions (ADRs)
    |   |-- 001-architecture-separation.md
    |   |-- 002-cpp-engine-design.md
    |   `-- 003-ui-ux-design-system.md
    |-- features/                      <-- Feature status and roadmap
    |   `-- feature-status.md
    |-- reference/                      <-- Hackathon specs & evaluation constraints
    |   `-- hackathon-track-b-spec.md
    `-- experiments/                    <-- Benchmarks, experiments, profiling logs
        `-- benchmarking-protocol.md
```
