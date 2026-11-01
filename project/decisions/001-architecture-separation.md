# ADR 001: Strict Architecture Separation Between C++ Engine and Web Platform

- **Status:** Confirmed
- **Date:** 2026-11-01
- **Deciders:** Senior Software Architect, Performance Specialist

---

## Context
IndexX participates in the Speed Demon 72-Hour Hackathon (Track B – Search Indexing). The evaluation harness runs in a strictly offline, containerized Docker environment with stringent CPU, memory, and wall-clock execution limits. At the same time, IndexX provides an enterprise-grade Next.js web application for demonstration, visualization, benchmark reporting, and developer analysis.

If web application dependencies, Node runtimes, or non-essential server layers are tangled into the competition engine repository or runtime, it risks:
1. Failing the official offline Docker submission requirements.
2. Degrading C++ search indexing performance, cache locality, and memory overhead.
3. Introducing runtime crashes or memory leaks during the 50,000 query evaluation.

## Decision
We enforce a strict physical and logical decoupling:
1. **The C++ Competition Core (`engine/`):**
   - Pure C++20 with zero non-standard runtime dependencies.
   - Self-contained build via CMake or Makefile producing a standalone binary (`indexx_core`).
   - Standard I/O or binary file interfaces that comply 100% with Track B submission specifications.
   - Capable of indexing the 250 MB corpus and executing 50,000 queries in standalone offline batch mode without any web or network subsystem.

2. **The Adapter Layer (`adapter/` or Next.js Route Bridge):**
   - A lightweight HTTP/JSON or IPC bridge wrapping the engine for interactive web queries.
   - Completely omitted from the official competition Docker build harness.

3. **The Web Platform (`web/`):**
   - Independent Next.js / TypeScript project with Tailwind CSS, Framer Motion, and Recharts.
   - Communicates with the C++ engine solely through standard REST/IPC endpoints.
   - Contains fallback mock/simulator modes so UI development and testing can proceed seamlessly even when the C++ binary is not actively running.

## Consequences
- **Positive:** Guarantees zero penalty in hackathon scoring; the C++ binary remains lean, deterministic, and blazing fast.
- **Positive:** Frontend engineers and UI polish can proceed without risking engine instability.
- **Negative:** Requires maintaining a clear IPC / REST interface contract between the engine and the web application.
