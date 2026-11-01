"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Search,
  HelpCircle,
  Copy,
  Check,
} from "lucide-react";
import { PageView } from "./Navbar";

interface AIAssistantViewProps {
  onSearch: (query: string) => void;
  setCurrentView: (view: PageView) => void;
}

export const AIAssistantView: React.FC<AIAssistantViewProps> = ({
  onSearch,
  setCurrentView,
}) => {
  const [naturalQuery, setNaturalQuery] = useState(
    "find research on quantum computing using superconducting circuits but not classical simulation"
  );
  const [translatedBoolean, setTranslatedBoolean] = useState(
    '(quantum AND computing) AND "superconducting circuits" NOT "classical simulation"'
  );
  const [copied, setCopied] = useState(false);

  const samplePrompts = [
    {
      nl: "find research on quantum computing using superconducting circuits but not classical simulation",
      boolean: '(quantum AND computing) AND "superconducting circuits" NOT "classical simulation"',
      reason: "Extracts primary concepts 'quantum' & 'computing', matches exact phrase for 'superconducting circuits', and excludes 'classical simulation'.",
    },
    {
      nl: "documents discussing fast inverse square root or AVX2 vectorization without floating point inaccuracies",
      boolean: '("fast inverse square root" OR (AVX2 AND vectorization)) NOT "floating point inaccuracies"',
      reason: "Groups algorithmic alternative with exact phrase, combines AVX2 vectorization, and eliminates inaccuracy documents.",
    },
    {
      nl: "search for distributed database consensus algorithms like Paxos or Raft",
      boolean: '(distributed AND database) AND (consensus OR Paxos OR Raft)',
      reason: "Ensures database domain match and matches either Paxos or Raft consensus models.",
    },
  ];

  const handleTranslate = (item: typeof samplePrompts[0]) => {
    setNaturalQuery(item.nl);
    setTranslatedBoolean(item.boolean);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedBoolean);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    onSearch(translatedBoolean);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Title */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-mono">
              Intelligent Search Optimization
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
            AI Search Assistant
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Translate everyday natural language queries into exact Boolean expressions, diagnose empty results, and suggest index-optimized terms.
          </p>
        </div>

        {/* Translation Card */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-900">
                Natural Language to Boolean Query Converter
              </h3>
            </div>
            <span className="text-xs text-blue-600 font-mono font-medium">
              Real-Time AST Translation
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                Enter your plain-English search request:
              </label>
              <textarea
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                rows={2}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white resize-none"
                placeholder="e.g. Find articles about inverted indexing with SIMD compression but exclude GPU algorithms..."
              />
            </div>

            {/* Presets */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-gray-500 font-medium">Examples:</span>
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleTranslate(p)}
                  className="px-2.5 py-1 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 text-[11px] truncate max-w-xs transition"
                >
                  Example {i + 1}
                </button>
              ))}
            </div>

            {/* Generated Boolean Expression */}
            <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Optimized C++ Engine Boolean Query:
                </span>
                <button
                  onClick={handleCopy}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Copied" : "Copy Query"}</span>
                </button>
              </div>

              <div className="p-3 bg-white rounded-lg border border-blue-100 font-mono text-sm text-blue-700 select-all font-semibold">
                {translatedBoolean}
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-gray-600">
                  Ready to execute against the 250 MB inverted index.
                </p>
                <button
                  onClick={handleExecute}
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm flex items-center gap-2 transition"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Execute Search Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis & Advice Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Boolean Query Tips
            </h4>
            <ul className="text-xs text-gray-600 space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Always capitalize operators: <code className="text-blue-600 font-mono">AND</code>, <code className="text-blue-600 font-mono">OR</code>, <code className="text-blue-600 font-mono">NOT</code>.</li>
              <li>Wrap contiguous multi-word phrases in double quotes: <code className="text-blue-600 font-mono">"fast inverse square root"</code>.</li>
              <li>Use parentheses to force precedence: <code className="text-blue-600 font-mono">(A OR B) AND C</code>.</li>
            </ul>
          </div>

          <div className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm space-y-2">
            <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-blue-600" />
              Empty Result Diagnostic
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              If an <code className="text-blue-600 font-mono">AND</code> query yields zero hits, inspect individual terms in the{" "}
              <button
                onClick={() => setCurrentView("explorer")}
                className="text-blue-600 hover:underline font-medium"
              >
                Index Explorer
              </button>{" "}
              to verify dictionary presence or relax constraints with <code className="text-blue-600 font-mono">OR</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
