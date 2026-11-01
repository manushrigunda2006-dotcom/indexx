"use client";

import React from "react";
import { BookOpen, Shield, Cpu, Layers, Terminal, Zap, FileCode, CheckCircle2 } from "lucide-react";

export const DocsView: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Title */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-mono">
              Track B Specification & Guide
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
            Technical Documentation
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Algorithmic deep-dive into IndexX's positional inverted index, SIMD vectorization, and offline Docker evaluation.
          </p>
        </div>

        {/* Section 1 */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-600" />
            1. Positional Inverted Index Layout
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            IndexX segregates DocIDs from positional offset arrays in contiguous memory arenas. This achieves high L1/L2 CPU cache line utilization during initial Boolean filtering, preventing interleaved word offset bloat from exhausting memory bandwidth.
          </p>
          <pre className="p-4 rounded-xl bg-gray-50 border border-gray-200 font-mono text-xs text-gray-800 overflow-x-auto">
{`struct PostingList {
    uint32_t doc_count;
    const uint32_t* doc_ids;       // 64-byte cache-aligned DocID array
    const uint32_t* pos_offsets;   // Delta-encoded word positions
    const uint32_t* skip_pointers; // Stride of 128 DocIDs with max bounds
};`}
          </pre>
        </div>

        {/* Section 2 */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500" />
            2. Small-Versus-Small (SvS) Galloping Intersections
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
            For multi-term Boolean <code className="text-blue-600 font-mono">AND</code> queries, posting lists are sorted by ascending cardinality ($|P_1| \le |P_2| \le \dots$). Intersections are executed by galloping binary search leveraging 128-element skip headers, pruning large swathes of unmatching documents.
          </p>
        </div>

        {/* Section 3 */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-3">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            3. Track B Official Docker Evaluation Compliance
          </h3>
          <ul className="text-xs sm:text-sm text-gray-600 space-y-2 list-disc pl-5 leading-relaxed">
            <li><strong>Zero Allocation Query Loop:</strong> Thread-local scratch buffers pre-allocated before query processing ensure no heap calls (<code className="font-mono text-gray-700">malloc</code>/<code className="font-mono text-gray-700">new</code>).</li>
            <li><strong>Offline Evaluation:</strong> C++ engine functions completely standalone without internet, DNS, or socket bindings.</li>
            <li><strong>Strict Determinism:</strong> 100% exact DocID matches against the ground truth for all 50,000 queries.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
