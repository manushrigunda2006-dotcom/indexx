"use client";

import React from "react";
import { Zap, Shield, Search, Terminal, Gauge, RefreshCw } from "lucide-react";
import { NavTab } from "./Sidebar";

interface HeaderProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onRunBatch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const getTabTitle = (tab: NavTab) => {
    switch (tab) {
      case "overview":
        return "System Dashboard & Corpus Overview";
      case "search":
        return "Advanced Search Engine (Track B)";
      case "playground":
        return "Query Playground & Visual AST Execution";
      case "explorer":
        return "Inverted Index Explorer & Postings List Inspector";
      case "performance":
        return "Real-Time Telemetry & Microsecond Profiler";
      case "benchmark":
        return "Benchmark Lab (Reference vs Optimized)";
      case "docs":
        return "Technical Documentation & Track B Specs";
      case "console":
        return "Developer Console & IPC Stream";
    }
  };

  return (
    <header className="h-16 border-b border-border-subtle bg-canvas-subtle/50 backdrop-blur-md px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <h1 className="text-base font-semibold text-slate-100 tracking-tight">
          {getTabTitle(activeTab)}
        </h1>
        <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-mono bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
          <Shield className="w-3 h-3" /> 72h Speed Demon
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* Quick Search Launcher */}
        <button
          onClick={() => setActiveTab("search")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-canvas-card border border-border-subtle text-slate-400 hover:text-slate-200 hover:border-slate-600 text-xs transition"
        >
          <Search className="w-3.5 h-3.5 text-brand-cyan" />
          <span>Search query...</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono rounded bg-canvas-panel border border-border-subtle text-slate-400">
            /
          </kbd>
        </button>

        {/* Live metric chips */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono">
          <div className="px-2.5 py-1 rounded bg-canvas-card border border-border-subtle flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-brand-cyan" />
            <span className="text-slate-400">P50:</span>
            <span className="text-emerald-400 font-semibold">142 &micro;s</span>
          </div>
          <div className="px-2.5 py-1 rounded bg-canvas-card border border-border-subtle flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-400">Throughput:</span>
            <span className="text-brand-cyan font-semibold">68.4 MB/s</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setActiveTab("benchmark")}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-brand-blue to-brand-indigo hover:from-blue-600 hover:to-indigo-600 text-white font-medium text-xs shadow-glow transition"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Benchmark Suite</span>
        </button>
      </div>
    </header>
  );
};
