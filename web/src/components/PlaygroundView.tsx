"use client";

import React, { useState } from "react";
import {
  Code2,
  Play,
  CheckCircle2,
  AlertCircle,
  Layers,
  ArrowRight,
  Sparkles,
  RefreshCw,
  HelpCircle,
} from "lucide-react";

export const PlaygroundView: React.FC = () => {
  const [queryCode, setQueryCode] = useState('(quantum AND computing) NOT "classical simulation"');
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(3);

  const sampleTemplates = [
    '(quantum AND computing) NOT "classical simulation"',
    '"inverted index" AND (SIMD OR AVX2)',
    'vectorization AND cache NOT (gpu OR fpga)',
    '"fast inverse square root"',
  ];

  const steps = [
    {
      num: 1,
      name: "Tokenization & Normalization",
      desc: "Parsed 4 raw tokens: ['quantum', 'computing', 'classical', 'simulation']. Normalized in-place to ASCII lowercase using SIMD bitmasks.",
      status: "done",
    },
    {
      num: 2,
      name: "Lexicon Lookup & Posting Retrieval",
      desc: "Retrieved posting lists from memory-mapped inverted index. Ordered by length: |P_quantum| = 1,420, |P_computing| = 3,890.",
      status: "done",
    },
    {
      num: 3,
      name: "SvS Galloping Intersection (AND)",
      desc: "Intersected 'quantum' AND 'computing' using skip pointers (stride 128). Candidate DocIDs reduced from 3,890 to 24 documents.",
      status: "active",
    },
    {
      num: 4,
      name: "Positional Phrase Verification",
      desc: "Inspected positional offsets for contiguous sequence 'classical simulation' (pos2 = pos1 + 1). Excluded 3 non-consecutive matches.",
      status: "pending",
    },
    {
      num: 5,
      name: "Final Result Materialization",
      desc: "Materialized DocID set into zero-alloc thread-local scratch buffer. Total matches: 21 documents in 112 &micro;s.",
      status: "pending",
    },
  ];

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Title */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-mono">
              AST & Execution Trace
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
            Query Playground
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Build, validate, and inspect low-level query evaluation plans with zero heap allocations.
          </p>
        </div>

        {/* Editor & Controls */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">Boolean Query Expression</h3>
            </div>
            <span className="text-xs font-mono text-emerald-600 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> AST Valid
            </span>
          </div>

          <div className="relative">
            <textarea
              value={queryCode}
              onChange={(e) => setQueryCode(e.target.value)}
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm text-blue-700 focus:outline-none focus:border-blue-500 focus:bg-white resize-none shadow-inner"
              placeholder="Type Boolean or Phrase query..."
            />
            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="absolute bottom-4 right-4 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              {isExecuting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>Simulate Pipeline</span>
            </button>
          </div>

          {/* Quick template chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-gray-500 font-medium">Templates:</span>
            {sampleTemplates.map((tpl) => (
              <button
                key={tpl}
                onClick={() => setQueryCode(tpl)}
                className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono text-[11px] transition truncate max-w-xs"
              >
                {tpl}
              </button>
            ))}
          </div>

          {/* Query Explanation Banner */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 flex items-start gap-3 text-xs text-gray-700">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-gray-900">Query AST Explanation:</span>
              <p className="text-gray-600 leading-relaxed">
                Finds documents matching the Boolean intersection of <code className="text-blue-700 font-mono">quantum</code> and{" "}
                <code className="text-blue-700 font-mono">computing</code>, then removes documents where{" "}
                <code className="text-red-600 font-mono">classical</code> and <code className="text-red-600 font-mono">simulation</code> appear contiguously in sequence.
              </p>
            </div>
          </div>
        </div>

        {/* Stepped Visual Execution Pipeline */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Execution Trace Pipeline (Track B C++ Engine)
            </h3>
            <span className="text-xs font-mono text-gray-400">Target Time: &lt; 200 &micro;s</span>
          </div>

          <div className="space-y-3">
            {steps.map((s) => (
              <div
                key={s.num}
                onClick={() => setActiveStep(s.num)}
                className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-4 ${
                  activeStep === s.num
                    ? "bg-blue-50/40 border-blue-300 shadow-sm"
                    : "bg-white border-gray-100 hover:border-gray-200"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                    activeStep === s.num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {s.num}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-gray-900">{s.name}</h4>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded border ${
                        s.status === "done"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
                          : s.status === "active"
                          ? "bg-blue-50 text-blue-700 border-blue-200 font-semibold"
                          : "bg-gray-100 text-gray-400 border-gray-200"
                      }`}
                    >
                      {s.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed font-mono">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
