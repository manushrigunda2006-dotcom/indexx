"use client";

import React from "react";
import {
  LayoutDashboard,
  Search,
  Code2,
  Database,
  Activity,
  Zap,
  BookOpen,
  Terminal,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export type NavTab =
  | "overview"
  | "search"
  | "playground"
  | "explorer"
  | "performance"
  | "benchmark"
  | "docs"
  | "console";

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard, badge: null },
    { id: "search", label: "Advanced Search", icon: Search, badge: "Track B" },
    { id: "playground", label: "Query Playground", icon: Code2, badge: "Visual AST" },
    { id: "explorer", label: "Index Explorer", icon: Database, badge: null },
    { id: "performance", label: "Performance", icon: Activity, badge: "P99 < 1ms" },
    { id: "benchmark", label: "Benchmark Lab", icon: Zap, badge: "7.1x Speedup" },
    { id: "docs", label: "Documentation", icon: BookOpen, badge: null },
    { id: "console", label: "Dev Console", icon: Terminal, badge: "Live" },
  ];

  return (
    <aside className="w-64 border-r border-border-subtle bg-canvas-subtle/70 backdrop-blur-md flex flex-col justify-between shrink-0 select-none">
      <div>
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-border-subtle">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-violet flex items-center justify-center shadow-glow">
            <Cpu className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold tracking-tight text-white text-lg">IndexX</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-brand-blue/20 text-brand-cyan border border-brand-blue/30">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">Search Beyond Limits</p>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase font-mono">
            Navigation Modules
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as NavTab)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-blue/15 text-brand-cyan border border-brand-blue/30 shadow-glow"
                    : "text-slate-400 hover:text-slate-200 hover:bg-canvas-panel/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-brand-cyan" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                      isActive
                        ? "bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20"
                        : "bg-canvas-panel text-slate-400 border-border-subtle"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Engine Status Footer */}
      <div className="p-4 border-t border-border-subtle bg-canvas-card/40 m-3 rounded-xl">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            C++ Core Status
          </span>
          <span className="text-emerald-400 font-mono font-medium">ONLINE</span>
        </div>
        <div className="text-[11px] text-slate-400 space-y-1">
          <div className="flex justify-between">
            <span>Corpus</span>
            <span className="font-mono text-slate-300">250 MB / 124.5k docs</span>
          </div>
          <div className="flex justify-between">
            <span>Harness Mode</span>
            <span className="font-mono text-brand-cyan flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Track B Offline
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
};
