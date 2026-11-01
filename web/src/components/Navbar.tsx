"use client";

import React, { useState } from "react";
import {
  LayoutDashboard,
  Code2,
  Database,
  Zap,
  Sparkles,
  BookOpen,
  User,
  Grid,
  Search,
  Cpu,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

export type PageView =
  | "home"
  | "results"
  | "dashboard"
  | "playground"
  | "explorer"
  | "benchmark"
  | "ai-assistant"
  | "docs";

interface NavbarProps {
  currentView: PageView;
  setCurrentView: (view: PageView) => void;
  showLogo?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  showLogo = true,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showAppsMenu, setShowAppsMenu] = useState(false);

  const navLinks = [
    { id: "dashboard" as PageView, label: "Dashboard", icon: LayoutDashboard },
    { id: "playground" as PageView, label: "Query Playground", icon: Code2 },
    { id: "explorer" as PageView, label: "Index Explorer", icon: Database },
    { id: "benchmark" as PageView, label: "Benchmark Lab", icon: Zap },
    { id: "ai-assistant" as PageView, label: "AI Assistant", icon: Sparkles },
    { id: "docs" as PageView, label: "Docs", icon: BookOpen },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100 h-16 px-4 md:px-8 flex items-center justify-between text-sm select-none z-30 relative">
      {/* Left: Brand Logo (when enabled or on inner pages) */}
      <div className="flex items-center gap-6">
        {showLogo ? (
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-blue-700 transition">
              X
            </div>
            <div className="flex items-baseline">
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Index<span className="text-blue-600">X</span>
              </span>
              <span className="ml-1 text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                Search
              </span>
            </div>
          </button>
        ) : (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-medium">Track B Engine: Standby (Offline Ready)</span>
          </div>
        )}
      </div>

      {/* Right Navigation */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-gray-600">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`px-3 py-1.5 rounded-md transition ${
                  isActive
                    ? "text-blue-600 bg-blue-50 font-semibold"
                    : "hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Apps Grid button */}
        <div className="relative">
          <button
            onClick={() => {
              setShowAppsMenu(!showAppsMenu);
              setShowProfileMenu(false);
            }}
            title="IndexX Modules & Apps"
            className="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition"
          >
            <Grid className="w-5 h-5" />
          </button>

          {showAppsMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider px-2 py-1 mb-1">
                IndexX Platform Modules
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentView(item.id);
                        setShowAppsMenu(false);
                      }}
                      className="p-2.5 rounded-xl hover:bg-gray-50 flex flex-col items-center gap-1.5 transition text-gray-700"
                    >
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[11px] font-medium leading-tight">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowAppsMenu(false);
            }}
            title="User Profile & Settings"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-semibold text-xs shadow-sm hover:ring-2 hover:ring-blue-200 transition"
          >
            SD
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 text-xs text-gray-700 space-y-3">
              <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  SD
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Speed Demon Judge</div>
                  <div className="text-gray-500 text-[11px]">evaluator@track-b.org</div>
                </div>
              </div>

              <div className="space-y-1.5 text-gray-600">
                <div className="flex items-center justify-between text-[11px]">
                  <span>Engine Connection:</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Offline Harness
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span>Corpus Target:</span>
                  <span className="font-mono text-gray-800">250 MB / 50k queries</span>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <button
                  onClick={() => {
                    setCurrentView("benchmark");
                    setShowProfileMenu(false);
                  }}
                  className="w-full text-center py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 font-medium text-gray-700 transition"
                >
                  Manage Benchmark Lab
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
