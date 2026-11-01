"use client";

import React from "react";
import {
  FileText,
  Database,
  Zap,
  Activity,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Layers,
  Flame,
} from "lucide-react";
import { initialEngineStats } from "@/lib/mock-data";
import { NavTab } from "./Sidebar";

interface OverviewViewProps {
  setActiveTab: (tab: NavTab) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({ setActiveTab }) => {
  const stats = initialEngineStats;

  const quickLinks = [
    {
      tab: "search" as NavTab,
      title: "Advanced Search",
      desc: "Execute Boolean & phrase queries with instant keyword highlighting",
      icon: Search,
      color: "from-blue-500/20 to-cyan-500/10 text-cyan-400 border-blue-500/30",
    },
    {
      tab: "playground" as NavTab,
      title: "Query Playground",
      desc: "Visually build query ASTs and observe step-by-step set intersections",
      icon: Layers,
      color: "from-purple-500/20 to-indigo-500/10 text-purple-400 border-purple-500/30",
    },
    {
      tab: "explorer" as NavTab,
      title: "Inverted Index Explorer",
      desc: "Inspect dictionary terms, postings lists, and positional arrays",
      icon: Database,
      color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
    },
    {
      tab: "benchmark" as NavTab,
      title: "Benchmark Lab",
      desc: "Compare IndexX against standard inverted index baselines (7.1x speedup)",
      icon: Flame,
      color: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/30",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-r from-canvas-card via-canvas-panel to-canvas-card p-6 lg:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-brand-blue/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 -mb-16 w-64 h-64 rounded-full bg-brand-violet/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-brand-blue/10 text-brand-cyan border border-brand-blue/30">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-ping" />
              Speed Demon 72-Hour Hackathon &bull; Track B
            </div>
            <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
              IndexX: Search Beyond Limits
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ultra-high-throughput document search engine powered by C++20, SIMD tokenization,
              and Elias-Fano compressed positional inverted indexes. Built for offline zero-alloc
              query execution across 50,000 queries.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("search")}
              className="px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-medium text-sm shadow-glow flex items-center gap-2 transition"
            >
              <Search className="w-4 h-4" /> Try Search
            </button>
            <button
              onClick={() => setActiveTab("benchmark")}
              className="px-5 py-2.5 rounded-xl bg-canvas-panel hover:bg-slate-700/60 text-slate-200 border border-border-subtle font-medium text-sm flex items-center gap-2 transition"
            >
              <Zap className="w-4 h-4 text-amber-400" /> View Benchmarks
            </button>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Total Documents</span>
            <FileText className="w-4 h-4 text-brand-cyan" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">
              {stats.totalDocuments.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">docs</span>
          </div>
          <div className="text-[11px] text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-medium">100% indexed</span> &bull; 250 MB raw corpus
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Indexing Speed</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-amber-400">
              {stats.indexingThroughputMBs}
            </span>
            <span className="text-xs text-slate-400">MB / sec</span>
          </div>
          <div className="text-[11px] text-slate-400">
            Zero-copy <span className="font-mono text-slate-300">mmap</span> + SIMD tokenizer
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Latency (P50 / P99)</span>
            <Activity className="w-4 h-4 text-brand-violet" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">
              {stats.p50LatencyUs} &micro;s
            </span>
            <span className="text-xs font-mono text-purple-400">
              / {stats.p99LatencyUs} &micro;s
            </span>
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Sub-millisecond tail latency
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-medium uppercase font-mono tracking-wider">Unique Terms</span>
            <Database className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold font-mono text-white">
              {stats.uniqueTerms.toLocaleString()}
            </span>
            <span className="text-xs text-slate-400">lexicon</span>
          </div>
          <div className="text-[11px] text-slate-400">
            41.2M positional postings stored
          </div>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <span>Engine Modules & Tools</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`p-5 rounded-xl border bg-gradient-to-br ${item.color} text-left transition duration-200 hover:scale-[1.02] flex flex-col justify-between`}
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-canvas-card flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-semibold text-white text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-normal">{item.desc}</p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-medium text-white/90">
                  <span>Explore module</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Engine Architecture & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Architecture Flow */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-cyan" />
              Engine Pipeline Architecture
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Track B Official Harness</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-4 rounded-lg bg-canvas-subtle border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-cyan">
                <span className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center text-[10px]">1</span>
                Ingestion & Tokenizer
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Direct <code className="text-brand-cyan">mmap</code> of 250 MB corpus. 32-byte SIMD chunking splits whitespace and normalizes ASCII without intermediate heap allocations.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-canvas-subtle border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-violet">
                <span className="w-5 h-5 rounded-full bg-brand-violet/20 flex items-center justify-center text-[10px]">2</span>
                Positional Index
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Contiguous posting buffers storing DocIDs and delta-encoded word positions. Skip pointers inserted every 128 items for fast galloping.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-canvas-subtle border border-border-subtle space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center text-[10px]">3</span>
                Query Execution
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Cost-ordered intersections (shortest posting list first), SvS galloping algorithm, and 2-pointer positional phrase verification.
              </p>
            </div>
          </div>
        </div>

        {/* System Health / Vitals */}
        <div className="glass-panel p-6 rounded-xl space-y-4">
          <h3 className="text-sm font-semibold text-white flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            Evaluation Constraints
          </h3>
          <ul className="text-xs space-y-3 font-mono">
            <li className="flex items-center justify-between py-1.5 border-b border-border-subtle">
              <span className="text-slate-400">Network Egress:</span>
              <span className="text-emerald-400 font-semibold">BLOCKED (Offline)</span>
            </li>
            <li className="flex items-center justify-between py-1.5 border-b border-border-subtle">
              <span className="text-slate-400">Docker Harness:</span>
              <span className="text-brand-cyan font-semibold">Ubuntu 22.04 LTS</span>
            </li>
            <li className="flex items-center justify-between py-1.5 border-b border-border-subtle">
              <span className="text-slate-400">Batch Query Target:</span>
              <span className="text-slate-200">50,000 queries</span>
            </li>
            <li className="flex items-center justify-between py-1.5 border-b border-border-subtle">
              <span className="text-slate-400">Peak Memory RSS:</span>
              <span className="text-slate-200 font-semibold">&lt; 256 MB</span>
            </li>
            <li className="flex items-center justify-between py-1.5">
              <span className="text-slate-400">Correctness Multiplier:</span>
              <span className="text-emerald-400 font-semibold">100.0% Exact</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
