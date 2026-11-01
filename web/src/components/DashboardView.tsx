"use client";

import React from "react";
import {
  FileText,
  Database,
  Zap,
  Activity,
  CheckCircle2,
  Clock,
  HardDrive,
  TrendingUp,
  Shield,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { initialEngineStats } from "@/lib/mock-data";
import { PageView } from "./Navbar";

interface DashboardViewProps {
  setCurrentView: (view: PageView) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setCurrentView }) => {
  const stats = initialEngineStats;

  const latencyData = [
    { percentile: "P10", latency: 45, baseline: 180 },
    { percentile: "P25", latency: 78, baseline: 260 },
    { percentile: "P50", latency: 142, baseline: 480 },
    { percentile: "P75", latency: 220, baseline: 820 },
    { percentile: "P90", latency: 340, baseline: 1180 },
    { percentile: "P95", latency: 420, baseline: 1420 },
    { percentile: "P99", latency: 910, baseline: 2950 },
    { percentile: "P99.9", latency: 1250, baseline: 4800 },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-mono">
                System Health & Telemetry
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
              Performance Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Real-time monitoring of the 250 MB corpus index, microsecond query latency, and memory footprint.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView("benchmark")}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs shadow-sm transition"
            >
              Benchmark Suite
            </button>
            <button
              onClick={() => setCurrentView("playground")}
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-xs transition"
            >
              Query Playground
            </button>
          </div>
        </div>

        {/* Top 4 Vitals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500 text-xs font-medium uppercase font-mono">
              <span>Total Documents</span>
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-gray-900">
                {stats.totalDocuments.toLocaleString()}
              </span>
              <span className="text-xs text-gray-500">docs</span>
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1">
              <span className="text-emerald-600 font-medium">100% indexed</span> &bull; 250 MB raw corpus
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500 text-xs font-medium uppercase font-mono">
              <span>Indexing Speed</span>
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-amber-600">
                {stats.indexingThroughputMBs}
              </span>
              <span className="text-xs text-gray-500">MB / sec</span>
            </div>
            <div className="text-xs text-gray-500">
              Zero-copy <span className="font-mono text-gray-700">mmap</span> + SIMD tokenizer
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500 text-xs font-medium uppercase font-mono">
              <span>P50 Median Latency</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-emerald-600">
                {stats.p50LatencyUs} &micro;s
              </span>
              <span className="text-xs font-mono text-gray-400">
                (P99: {stats.p99LatencyUs} &micro;s)
              </span>
            </div>
            <div className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> Sub-millisecond tail latency
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-2">
            <div className="flex items-center justify-between text-gray-500 text-xs font-medium uppercase font-mono">
              <span>Peak RAM RSS</span>
              <HardDrive className="w-4 h-4 text-purple-600" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-gray-900">
                215 MB
              </span>
              <span className="text-xs text-gray-500">in-memory</span>
            </div>
            <div className="text-xs text-gray-500">
              Strictly under 2GB Docker ceiling
            </div>
          </div>
        </div>

        {/* Latency Percentile Chart (Clean Recharts) */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                Query Latency Percentile Curve (Microseconds)
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Evaluated across 50,000 multi-term Boolean and exact phrase queries
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-blue-600 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> IndexX C++ Engine
              </span>
              <span className="flex items-center gap-1.5 text-gray-400 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300" /> Reference Baseline
              </span>
            </div>
          </div>

          <div className="h-72 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={latencyData}>
                <defs>
                  <linearGradient id="colorIndexXLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorBaseLight" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9CA3AF" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#9CA3AF" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
                <XAxis dataKey="percentile" stroke="#9CA3AF" fontSize={11} />
                <YAxis stroke="#9CA3AF" fontSize={11} unit=" &micro;s" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFFFFF",
                    borderColor: "#E5E7EB",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#9CA3AF"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorBaseLight)"
                  name="Baseline (&micro;s)"
                />
                <Area
                  type="monotone"
                  dataKey="latency"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorIndexXLight)"
                  name="IndexX (&micro;s)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engine Pipeline Architecture */}
        <div className="p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
          <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Track B Evaluation Pipeline
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="text-xs font-semibold text-blue-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-[10px]">1</span>
                Corpus Ingestion & Tokenizer
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct <code className="text-blue-600 font-mono">mmap</code> of 250 MB raw corpus. SIMD chunking separates whitespace and normalizes ASCII tokens without heap allocation.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="text-xs font-semibold text-purple-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-[10px]">2</span>
                Positional Index Arena
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                DocIDs and delta-encoded word offsets stored in contiguous cache-aligned arrays with skip pointers every 128 elements.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
              <div className="text-xs font-semibold text-emerald-700 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-[10px]">3</span>
                Query Execution Loop
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Cost-ordered posting list evaluation (shortest first), SvS galloping intersection, and 2-pointer positional phrase verification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
