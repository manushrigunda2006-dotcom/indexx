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
import { UserProfileMenu } from "./UserProfileMenu";

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

        {/* User Profile / Account Menu */}
        <UserProfileMenu setCurrentView={setCurrentView} />
      </div>
    </header>
  );
};
