"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  X,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { PageView } from "./Navbar";

interface HomeViewProps {
  onSearch: (query: string) => void;
  setCurrentView: (view: PageView) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onSearch, setCurrentView }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([
    "quantum AND computing",
    '"inverted index" AND SIMD',
    "vectorization OR cache NOT gpu",
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const curatedSuggestions = [
    "quantum AND computing",
    '"inverted index" AND SIMD',
    "vectorization OR cache NOT gpu",
    '"fast inverse square root"',
    "memory AND zero-copy",
    "elias-fano AND positional",
    "distributed consensus AND vector clocks",
  ];

  // Filter suggestions based on query
  const filteredSuggestions = curatedSuggestions.filter(
    (item) => item.toLowerCase().includes(query.toLowerCase()) && item !== query
  );

  // Keyboard shortcut listener ('/' to focus search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    // Add to history
    if (!searchHistory.includes(query)) {
      setSearchHistory([query, ...searchHistory.slice(0, 5)]);
    }
    setShowSuggestions(false);
    onSearch(query);
  };

  const handleSelectSuggestion = (text: string) => {
    setQuery(text);
    if (!searchHistory.includes(text)) {
      setSearchHistory([text, ...searchHistory.slice(0, 5)]);
    }
    setShowSuggestions(false);
    onSearch(text);
  };

  const handleClearHistoryItem = (e: React.MouseEvent, item: string) => {
    e.stopPropagation();
    setSearchHistory(searchHistory.filter((h) => h !== item));
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-white text-gray-900 select-none">
      {/* Centered Main Search Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 -mt-10 sm:-mt-16">
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Minimalist IndexX Logo */}
          <div className="mb-8 text-center">
            <h1 className="text-6xl sm:text-7xl font-bold tracking-tight text-gray-900 font-sans">
              Index<span className="text-blue-600">X</span>
            </h1>
            <p className="mt-2 text-xs font-semibold tracking-widest text-gray-500 uppercase font-mono">
              Search Beyond Limits
            </p>
          </div>

          {/* Large Rounded Search Bar (Google Inspired) */}
          <div ref={containerRef} className="w-full relative z-20">
            <form onSubmit={handleSubmit} className="relative w-full">
              <div
                className={`w-full flex items-center h-12 sm:h-13 px-4 rounded-full border bg-white transition-all duration-200 ${
                  showSuggestions
                    ? "rounded-b-none border-gray-300 shadow-lg"
                    : "border-gray-200 hover:border-gray-300 hover:shadow-md focus-within:border-gray-300 focus-within:shadow-md"
                }`}
              >
                {/* Search Icon */}
                <Search className="w-5 h-5 text-gray-400 shrink-0 mr-3" />

                {/* Input Field */}
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search 124,500 documents (Boolean: AND, OR, NOT, Quotes)"
                  className="w-full h-full bg-transparent text-gray-900 placeholder-gray-400 text-sm sm:text-base focus:outline-none"
                  autoComplete="off"
                />

                {/* Keyboard shortcut hint / Clear button */}
                <div className="flex items-center gap-2 ml-2 shrink-0">
                  {query ? (
                    <button
                      type="button"
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="p-1 rounded-full text-gray-400 hover:text-gray-600 transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <kbd className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-mono text-gray-400 bg-gray-50 border border-gray-200 rounded">
                      /
                    </kbd>
                  )}

                  {/* AI Assistant Quick Trigger */}
                  <button
                    type="button"
                    onClick={() => setCurrentView("ai-assistant")}
                    title="Natural Language to Boolean Query Assistant"
                    className="p-1.5 rounded-full text-blue-600 hover:bg-blue-50 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>

            {/* Suggestions & Search History Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 bg-white border border-t-0 border-gray-300 rounded-b-3xl shadow-lg overflow-hidden py-2 text-sm z-30">
                {/* Search History */}
                {searchHistory.length > 0 && (
                  <div className="mb-1">
                    <div className="px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 font-mono">
                      Recent Searches
                    </div>
                    {searchHistory.map((item) => (
                      <div
                        key={item}
                        onClick={() => handleSelectSuggestion(item)}
                        className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between cursor-pointer group text-gray-700"
                      >
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-purple-600" />
                          <span className="font-mono text-xs sm:text-sm text-purple-900">
                            {item}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleClearHistoryItem(e, item)}
                          className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition p-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggested Queries */}
                {filteredSuggestions.length > 0 && (
                  <div>
                    <div className="px-4 py-1 text-[11px] font-semibold uppercase tracking-wider text-gray-500 font-mono">
                      Boolean & Positional Suggestions
                    </div>
                    {filteredSuggestions.slice(0, 4).map((item) => (
                      <div
                        key={item}
                        onClick={() => handleSelectSuggestion(item)}
                        className="px-4 py-2 hover:bg-gray-50 flex items-center gap-3 cursor-pointer text-gray-700"
                      >
                        <Search className="w-4 h-4 text-gray-400" />
                        <span className="font-mono text-xs sm:text-sm">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Google-Inspired Action Buttons */}
          <div className="mt-7 flex items-center justify-center gap-3 text-sm">
            <button
              onClick={() => handleSubmit()}
              className="px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-100 hover:border-gray-200 transition font-medium text-xs sm:text-sm"
            >
              IndexX Search
            </button>
            <button
              onClick={() => {
                setQuery('"quantum computing"');
                onSearch('"quantum computing"');
              }}
              className="px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-800 border border-gray-100 hover:border-gray-200 transition font-medium text-xs sm:text-sm"
            >
              I'm Feeling Fast
            </button>
          </div>

          {/* Minimalist Syntax Guide Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
            <span>Syntax hints:</span>
            <button
              onClick={() => handleSelectSuggestion("quantum AND computing")}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono transition"
            >
              AND
            </button>
            <button
              onClick={() => handleSelectSuggestion("vector OR matrix")}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono transition"
            >
              OR
            </button>
            <button
              onClick={() => handleSelectSuggestion("apple NOT fruit")}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono transition"
            >
              NOT
            </button>
            <button
              onClick={() => handleSelectSuggestion('"fast inverse square root"')}
              className="px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-mono transition"
            >
              "Exact Phrase"
            </button>
          </div>
        </div>
      </div>

      {/* Clean Minimalist Footer */}
      <footer className="w-full border-t border-gray-100 bg-gray-50/60 text-xs text-gray-500 py-3.5 px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Track B &bull; 250 MB Corpus (50,000 Query Batch)
          </span>
          <span className="hidden md:inline text-gray-300">|</span>
          <span className="hidden md:inline">Speed Demon 72-Hour Hackathon</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setCurrentView("playground")}
            className="hover:text-blue-600 transition"
          >
            Query AST Builder
          </button>
          <button
            onClick={() => setCurrentView("benchmark")}
            className="hover:text-blue-600 transition"
          >
            Verified Benchmarks
          </button>
          <button
            onClick={() => setCurrentView("docs")}
            className="hover:text-blue-600 transition"
          >
            Architecture
          </button>
        </div>
      </footer>
    </div>
  );
};
