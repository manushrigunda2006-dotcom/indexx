# IndexX – Search Beyond Limits

> **Competition:** Speed Demon 72-Hour Hackathon  
> **Track:** Track B – Index (Search Indexing)  
> **Architecture:** Decoupled C++20 Search Engine + Modern Next.js Minimalist Search Platform  
> **Live Demo:** https://in-dexx.vercel.app

---

## 1. Overview

**IndexX** is an ultra-high-performance document search platform engineered for the Speed Demon 72-Hour Hackathon. It pairs an offline, zero-allocation C++ search engine designed to index a 250 MB raw text corpus and process 50,000 queries in microseconds with a clean, minimalist Google-inspired web platform for query visualization, index exploration, and benchmarking.

### Core Pillars
- **Minimalist Search Interface:** Clean Google-inspired homepage with centered branding, rounded search bar, autocomplete suggestions, and search history.
- **Microsecond Latency:** Positional inverted index with Small-Versus-Small (SvS) galloping intersections and delta-encoded word offsets.
- **Strict Decoupling:** The web interface and demonstration layer remain completely independent of the official C++ submission harness.

---

## 2. Platform Modules

1. **Minimalist Search Interface:** Clean white canvas, centered IndexX logo, pill search bar, suggestions, history, and syntax hints (`AND`, `OR`, `NOT`, `"..."`).
2. **Google-Style Results Page:** Clean result list with keyword-in-context (KWIC) highlights, document breadcrumbs, relevance scoring, and document preview modal.
3. **Performance Dashboard:** Real-time latency percentile curves (P10 through P99.9), memory RSS tracking, and throughput telemetry.
4. **Query Playground:** Visual AST builder, syntax validator, and step-by-step pipeline execution trace.
5. **Inverted Index Explorer:** Lexicon dictionary viewer, posting list inspection, DocID mapping, and positional offset verification.
6. **Benchmark Lab:** Head-to-head comparison against reference inverted index baselines (7.1x speedup) with JSON report export.
7. **AI Search Assistant:** Natural language to Boolean query translation, query error diagnosis, and syntax advice.
8. **Technical Documentation:** In-depth algorithmic breakdown of posting list layouts, SIMD bitmasks, and Track B Docker submission constraints.

---

## 3. Technology Stack

- **Frontend & UI:** Next.js 14+ (App Router), React 18, TypeScript, Tailwind CSS, Recharts, Lucide Icons.
- **Engine Core (Track B):** C++20, SIMD vectorization (AVX2/NEON), memory-mapped corpus (`mmap`), Elias-Fano / delta compression, zero-alloc query execution loops.

---

## 4. Getting Started

### Web Platform
```bash
cd web
npm install
npm run build
npm start
```
The search interface will be live at `http://localhost:3000`.

---

## 5. Hackathon Submission Compliance

- **Corpus:** 250 MB raw text documents.
- **Query Load:** 50,000 queries executed in offline containerized environment.
- **Deterministic Correctness:** 100% exact DocID matches against the ground truth.
