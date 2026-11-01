# IndexX – Benchmarking Protocol & Performance Experiment Log

> **Strict Scientific Protocol:**  
> Never fabricate, hardcode, or exaggerate performance figures.  
> Measurements in the Benchmark Lab and experiment records must originate exclusively from verified harness executions.

---

## 1. Benchmarking Metrics

Every benchmark run measures and logs the following dimensions:

1. **Indexing Metrics:**
   - Indexing Time ($T_{build}$): Milliseconds elapsed from corpus read to ready state.
   - Indexing Throughput: MB/s processed ($250 \text{ MB} / T_{build}$).
   - Peak RSS Memory ($M_{peak}$): Maximum resident memory observed during indexing.
   - Index Footprint: Total bytes occupied by vocabulary, postings, and positional offsets in memory.

2. **Query Execution Metrics:**
   - Total Batch Time ($T_{batch}$): Wall-clock time to process 50,000 queries.
   - Throughput (QPS): Queries per second ($50,000 / T_{batch}$).
   - Latency Percentiles:
     - **P50 (Median):** $\mu s$
     - **P95:** $\mu s$
     - **P99:** $\mu s$
   - Category Breakdown:
     - Term query average latency
     - Boolean AND / OR / NOT average latency
     - Phrase query average latency

3. **Correctness Audit:**
   - Mismatches count: Must be 0.
   - False Positives count: Must be 0.
   - False Negatives count: Must be 0.

---

## 2. Standard Comparative Baselines

To prove optimization efficacy in the Benchmark Lab, runs compare:

- **Baseline Reference Engine:**
  - Standard inverted index with uncompressed `std::vector<uint32_t>` postings.
  - Linear intersection (`std::set_intersection`).
  - Standard library string stream tokenizer.
- **IndexX Optimized Engine:**
  - SIMD chunked tokenization with zero-copy string views.
  - Delta-compressed postings with Elias-Fano / SIMD-BP32.
  - Galloping intersection with skip pointers.
  - Positional 2-pointer scan with early cutoff.
  - Cache-aligned contiguous posting pools.

---

## 3. Experiment Run Registry

| Run ID | Date | Engine Version | Corpus Size | Query Count | Index Time | Query Batch Time | Peak RSS | Speedup vs Baseline | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| *EXP-000* | *Pending* | Reference Baseline | 250 MB | 50,000 | Pending | Pending | Pending | 1.0x (Baseline) | `[Planned]` |
| *EXP-001* | *Pending* | IndexX Core v0.1 | 250 MB | 50,000 | Pending | Pending | Pending | Pending | `[Planned]` |

*(Actual verified benchmark runs will be appended here after execution through the test harness)*
