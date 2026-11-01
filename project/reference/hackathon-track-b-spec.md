# Speed Demon 72-Hour Hackathon – Track B: Index (Search Indexing)

> **Frozen Track Specification Reference**  
> **Target Track:** Track B – Search Indexing  
> **Evaluation Mode:** Offline Containerized Benchmark Harness

---

## 1. Challenge Definition
Participants must construct an ultra-fast, memory-efficient search indexing and query processing engine. The engine is evaluated on its ability to build an index over a large text corpus and execute a comprehensive batch of search queries with 100% exact output correctness in the shortest total wall-clock time under memory constraints.

---

## 2. Official Workload
- **Corpus Size:** 250 MB raw plain-text corpus.
- **Documents:** Variable length text documents, identified by unique 32-bit Document IDs (`DocID`).
- **Query Batch:** 50,000 queries.
- **Query Categories:**
  - Single-term queries (e.g. `technology`)
  - Multi-term Boolean `AND` queries (e.g. `quantum AND computing`)
  - Multi-term Boolean `OR` queries (e.g. `vector OR matrix`)
  - Boolean `NOT` queries (e.g. `apple NOT fruit`)
  - Complex Boolean combinations (e.g. `(cloud OR edge) AND computing NOT azure`)
  - Exact phrase queries (e.g. `"artificial intelligence"`, `"fast inverse square root"`)

---

## 3. Evaluation Environment & Constraints
1. **Container Environment:**
   - Linux (Ubuntu 22.04 LTS x86_64).
   - Fixed CPU allocations (e.g., 4 to 8 physical vCPUs).
   - Fixed RAM ceiling (e.g., 2 GB – 4 GB). Out-of-memory (OOM) killer triggers immediate failure.
2. **Network Access:**
   - **Strictly Offline.** No external network requests, DNS resolution, or remote API calls are permitted during official scoring.
3. **Correctness Verification:**
   - Output for all 50,000 queries must match the official ground truth exact DocID set.
   - For phrase queries, only documents where tokens appear contiguously and in the exact positional sequence are counted as valid.
   - Any incorrect result, missed match, or spurious document will result in severe score penalties.

---

## 4. Scoring Function
Total Score is calculated as a composite of:
1. **Total Execution Time ($T_{total} = T_{index} + T_{query}$):** Lower is better.
2. **Query Latency Percentiles:** P50, P95, and P99 latency.
3. **Memory Footprint Peak:** Maximum Resident Set Size (RSS) during execution.
4. **Correctness Multiplier:** Must be 100% to qualify for podium ranking.

---

## 5. Submission Artifacts Required
- Standalone C++ source code with standard `CMakeLists.txt` or `Makefile`.
- Dockerfile producing the verified offline evaluation binary.
- Brief technical report documenting data structures, memory layout, and optimization techniques.
