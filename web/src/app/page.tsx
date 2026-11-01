"use client";

import React, { useState } from "react";
import { Navbar, PageView } from "@/components/Navbar";
import { HomeView } from "@/components/HomeView";
import { SearchResultsView } from "@/components/SearchResultsView";
import { DashboardView } from "@/components/DashboardView";
import { PlaygroundView } from "@/components/PlaygroundView";
import { IndexExplorerView } from "@/components/IndexExplorerView";
import { BenchmarkView } from "@/components/BenchmarkView";
import { AIAssistantView } from "@/components/AIAssistantView";
import { DocsView } from "@/components/DocsView";

export default function App() {
  const [currentView, setCurrentView] = useState<PageView>("home");
  const [activeQuery, setActiveQuery] = useState("quantum AND computing");

  const handleExecuteSearch = (query: string) => {
    setActiveQuery(query);
    setCurrentView("results");
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-sans">
      {/* Top Navbar for Home and subpages (except Results page which has its own Google-style integrated search header) */}
      {currentView !== "results" && (
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          showLogo={currentView !== "home"}
        />
      )}

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === "home" && (
          <HomeView
            onSearch={handleExecuteSearch}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "results" && (
          <SearchResultsView
            initialQuery={activeQuery}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "dashboard" && (
          <DashboardView setCurrentView={setCurrentView} />
        )}

        {currentView === "playground" && <PlaygroundView />}

        {currentView === "explorer" && <IndexExplorerView />}

        {currentView === "benchmark" && <BenchmarkView />}

        {currentView === "ai-assistant" && (
          <AIAssistantView
            onSearch={handleExecuteSearch}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === "docs" && <DocsView />}
      </main>
    </div>
  );
}
