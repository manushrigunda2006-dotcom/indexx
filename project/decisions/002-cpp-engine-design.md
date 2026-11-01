# ADR 002: High-Performance C++ Search Engine Architecture & Data Structures

- **Status:** Confirmed
- **Date:** 2026-11-01
- **Deciders:** Performance Engineering Specialist, C++ Architect

---

## Context
Track B evaluates the engine against a 250 MB text corpus and 50,000 queries including Boolean operators (AND, OR, NOT) and exact positional phrase matches. Top-tier performance requires optimizing for CPU cache lines (L1/L2/L3), minimizing TLB misses, avoiding heap allocations in the query path, and implementing fast posting-list intersections.

## Decision
The core engine (`indexx_core`) will implement the following high-performance techniques:

1. **Memory-Mapped Input & Zero-Copy Tokenization:**
   - Use `mmap` (or Windows memory-mapped files) for instant corpus access without file buffering copies.
   - Streaming tokenizer utilizing SIMD bit-masks to locate whitespace and delimiters in 32-byte chunks.
   - In-place string-view tokens (`std::string_view`) mapped to 32-bit term identifiers.

2. **Compact Positional Inverted Index Layout:**
   - Contiguous memory allocation for postings: `DocID` array separated from `Position` arrays to preserve CPU cache lines during initial DocID filtering.
   - Positional offsets delta-encoded (`pos[i] - pos[i-1]`) to minimize memory footprint.
   - Skip pointers (every $\sqrt{N}$ entries or 128 elements) storing max-doc-ID for galloping search during intersections.

3. **Query Optimization & Execution Algorithms:**
   - **Cost-Based Query Planning:** Order `AND` terms by increasing posting-list length ($|P_1| \le |P_2| \le \dots$) to minimize intermediate set sizes.
   - **Galloping / SvS Intersection:** Small-versus-Large list intersection utilizing binary/galloping search with SIMD vectorized comparisons.
   - **Positional Phrase Verification:** Verify candidate document matches by linear 2-pointer scan checking $pos_2 = pos_1 + 1$ with early exit.
   - **Thread Affinity & Parallel Query Execution:** Static thread pool matching physical CPU cores with batch query partitioning.

4. **Zero-Allocation Query Evaluation:**
   - Pre-allocated thread-local scratch buffers for intermediate posting lists to ensure zero heap allocations (`malloc`/`new`) during query execution.

## Consequences
- Exceptional indexing throughput (> 50 MB/s).
- Microsecond-range query response times for multi-term Boolean and phrase queries.
- Memory consumption remains well within official Docker limits.
