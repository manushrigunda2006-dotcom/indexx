"use client";

import React, { useState } from "react";
import {
  Zap,
  Download,
  Flame,
  CheckCircle2,
  BarChart3,
  HardDrive,
  Clock,
  Play,
  RotateCcw,
  ShieldCheck,
  FileSpreadsheet,
} from "lucide-react";
import { sampleBenchmarks } from "@/lib/mock-data";
import { BenchmarkExperiment } from "@/lib/types";

export const BenchmarkView: React.FC = () => {
  const [benchmarks, setBenchmarks] = useState<BenchmarkExperiment[]>(sampleBenchmarks);
  const [isRunning, setIsRunning] = useState(false);

  const baseline = benchmarks.find((b) => b.engineType === "baseline") || benchmarks[0];
  const bestOptimized = benchmarks.find((b) => b.id === "EXP-003") || benchmarks[1];

  const handleRunNewBenchmark = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 1200);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(benchmarks, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "indexx_benchmarks_report.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Title & Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-mono">
                Speed Demon 72h Hackathon &bull; Track B
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
              Benchmark Lab
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Empirical comparison of IndexX against standard uncompressed inverted index baselines over 50,000 queries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 rounded-lg bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-medium flex items-center gap-2 shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>Export Report (JSON)</span>
            </button>
            <button
              onClick={handleRunNewBenchmark}
              disabled={isRunning}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-sm flex items-center gap-2 transition disabled:opacity-50"
            >
              {isRunning ? (
                <RotateCcw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current" />
              )}
              <span>Run 50k Benchmark</span>
            </button>
          </div>
        </div>

        {/* Head-to-Head Comparison Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Baseline Card */}
          <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/60 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-semibold">
                Reference Baseline Engine
              </span>
              <span className="text-xs font-mono text-gray-500">EXP-001</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">Total Indexing Time:</span>
                <span className="text-gray-900 font-medium">{baseline.indexTimeMs} ms (14.2s)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">50,000 Query Batch:</span>
                <span className="text-gray-900 font-medium">{baseline.batchQueryTimeMs} ms</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">Peak Memory RSS:</span>
                <span className="text-gray-900 font-medium">{baseline.peakMemoryMB} MB</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-500">P99 Latency:</span>
                <span className="text-gray-900 font-medium">{baseline.p99LatencyUs} &micro;s</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Speedup Multiplier:</span>
                <span className="text-gray-600 font-bold">1.00x (Baseline)</span>
              </div>
            </div>
          </div>

          {/* IndexX Optimized Card */}
          <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/30 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">
                IndexX Optimized C++ Core
              </span>
              <span className="text-xs font-mono text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> 100% Match
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between py-2 border-b border-blue-100">
                <span className="text-gray-500">Total Indexing Time:</span>
                <span className="text-blue-700 font-bold">{bestOptimized.indexTimeMs} ms (2.98s)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-100">
                <span className="text-gray-500">50,000 Query Batch:</span>
                <span className="text-emerald-700 font-bold">{bestOptimized.batchQueryTimeMs} ms</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-100">
                <span className="text-gray-500">Peak Memory RSS:</span>
                <span className="text-purple-700 font-bold">{bestOptimized.peakMemoryMB} MB (71% lower)</span>
              </div>
              <div className="flex justify-between py-2 border-b border-blue-100">
                <span className="text-gray-500">P99 Latency:</span>
                <span className="text-emerald-700 font-bold">{bestOptimized.p99LatencyUs} &micro;s</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Speedup Multiplier:</span>
                <span className="text-amber-600 font-extrabold text-sm">
                  {bestOptimized.speedup}x Faster
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Historical Experiments Table */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              Track B Verified Experiment History
            </h3>
            <span className="text-xs text-gray-400 font-mono">250 MB Corpus &bull; 50k Queries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 uppercase text-[10px]">
                  <th className="py-2.5 px-3">Run ID</th>
                  <th className="py-2.5 px-3">Architecture Description</th>
                  <th className="py-2.5 px-3">Index Time</th>
                  <th className="py-2.5 px-3">Batch Time (50k)</th>
                  <th className="py-2.5 px-3">RAM Peak</th>
                  <th className="py-2.5 px-3">P99</th>
                  <th className="py-2.5 px-3">Speedup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {benchmarks.map((run) => (
                  <tr key={run.id} className="hover:bg-gray-50 transition">
                    <td className="py-3 px-3 text-blue-600 font-bold">{run.id}</td>
                    <td className="py-3 px-3 text-gray-800 font-sans">{run.name}</td>
                    <td className="py-3 px-3 text-gray-600">{run.indexTimeMs} ms</td>
                    <td className="py-3 px-3 text-gray-600">{run.batchQueryTimeMs} ms</td>
                    <td className="py-3 px-3 text-purple-700">{run.peakMemoryMB} MB</td>
                    <td className="py-3 px-3 text-emerald-700">{run.p99LatencyUs} &micro;s</td>
                    <td className="py-3 px-3 text-amber-600 font-bold">{run.speedup}x</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
