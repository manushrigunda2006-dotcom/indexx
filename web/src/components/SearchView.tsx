"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  Clock,
  Sparkles,
  CheckCircle,
  FileText,
  Tag,
  ArrowUpDown,
  Filter,
} from "lucide-react";
import { sampleDocuments } from "@/lib/mock-data";
import { SearchResult } from "@/lib/types";

export const SearchView: React.FC = () => {
  const [query, setQuery] = useState("quantum AND computing");
  const [searchLatency, setSearchLatency] = useState(118); // microseconds
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"score" | "docId">("score");

  const samplePresets = [
    'quantum AND computing',
    '"inverted index" AND SIMD',
    'vectorization OR cache NOT gpu',
    '"fast inverse square root"',
    'memory AND "zero-copy"',
  ];

  // Dynamic search execution simulation
  const filteredResults = useMemo(() => {
    const rawTokens = query
      .toLowerCase()
      .replace(/[()"]/g, "")
      .split(/\s+/)
      .filter((t) => t && !["and", "or", "not"].includes(t));

    return sampleDocuments
      .filter((doc) => {
        if (selectedCategory !== "all" && doc.category !== selectedCategory) {
          return false;
        }
        if (rawTokens.length === 0) return true;
        const text = (doc.title + " " + doc.snippet).toLowerCase();
        return rawTokens.some((t) => text.includes(t));
      })
      .sort((a, b) => {
        if (sortBy === "score") return b.score - a.score;
        return a.docId - b.docId;
      });
  }, [query, selectedCategory, sortBy]);

  const handleRunSearch = (q: string) => {
    setQuery(q);
    // Simulate ultra-fast query execution latency between 80 - 150 microseconds
    setSearchLatency(Math.floor(Math.random() * 60) + 85);
  };

  const highlightSnippet = (snippet: string, queryStr: string) => {
    const words = queryStr
      .toLowerCase()
      .replace(/[()"]/g, "")
      .split(/\s+/)
      .filter((w) => w && !["and", "or", "not"].includes(w));

    if (words.length === 0) return snippet;

    const regex = new RegExp(`(${words.join("|")})`, "gi");
    const parts = snippet.split(regex);

    return parts.map((part, i) =>
      words.includes(part.toLowerCase()) ? (
        <mark
          key={i}
          className="bg-brand-blue/30 text-brand-cyan px-1 py-0.5 rounded border border-brand-blue/40 font-medium"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Search Input Box */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="relative">
          <Search className="w-5 h-5 text-brand-cyan absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleRunSearch(e.target.value)}
            placeholder="Enter Boolean query (e.g., quantum AND computing or 'fast inverse' NOT float)"
            className="w-full bg-canvas-subtle border border-border-subtle focus:border-brand-blue rounded-xl pl-12 pr-28 py-3.5 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:ring-1 focus:ring-brand-blue transition shadow-inner"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-brand-blue/20 text-brand-cyan border border-brand-blue/30 flex items-center gap-1">
              <Clock className="w-3 h-3" /> {searchLatency} &micro;s
            </span>
          </div>
        </div>

        {/* Preset Query Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Presets:
          </span>
          {samplePresets.map((preset) => (
            <button
              key={preset}
              onClick={() => handleRunSearch(preset)}
              className={`px-2.5 py-1 rounded-lg font-mono text-xs border transition ${
                query === preset
                  ? "bg-brand-blue/20 text-brand-cyan border-brand-blue/40"
                  : "bg-canvas-card border-border-subtle text-slate-400 hover:text-slate-200 hover:bg-canvas-panel"
              }`}
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Filters and Sorting bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border-subtle text-xs">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Category:</span>
            {["all", "Physics & CS", "Information Retrieval", "Systems Engineering"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-md transition ${
                  selectedCategory === cat
                    ? "bg-brand-blue text-white font-medium shadow-sm"
                    : "text-slate-400 hover:text-slate-200 bg-canvas-card"
                }`}
              >
                {cat === "all" ? "All Categories" : cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "score" | "docId")}
              className="bg-canvas-card border border-border-subtle text-slate-200 rounded-md px-2 py-1 text-xs focus:outline-none"
            >
              <option value="score">Relevance Score</option>
              <option value="docId">Document ID (Asc)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1 font-mono">
        <div>
          Showing <span className="text-slate-200 font-semibold">{filteredResults.length}</span> matching documents
        </div>
        <div>
          Corpus: <span className="text-brand-cyan font-semibold">250 MB</span> &bull; Galloping Scan
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {filteredResults.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl space-y-3">
            <FileText className="w-10 h-10 text-slate-500 mx-auto" />
            <h4 className="text-sm font-semibold text-slate-300">No matching documents found</h4>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Check Boolean syntax or try less restrictive terms. You can also inspect terms in the Inverted Index Explorer.
            </p>
          </div>
        ) : (
          filteredResults.map((result) => (
            <div
              key={result.docId}
              className="glass-panel p-5 rounded-xl space-y-3 hover:border-brand-blue/40 transition duration-150"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-brand-blue/15 text-brand-cyan border border-brand-blue/30 font-semibold">
                      Doc #{result.docId}
                    </span>
                    <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                      <Tag className="w-3 h-3 text-slate-400" /> {result.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold text-white hover:text-brand-cyan cursor-pointer transition">
                    {result.title}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-semibold text-emerald-400">
                    {(result.score * 100).toFixed(1)}% match
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    pos: [{result.positions.join(", ")}]
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {highlightSnippet(result.snippet, query)}
              </p>

              <div className="flex items-center gap-2 pt-2 border-t border-border-subtle/60 text-[11px] text-slate-400 font-mono">
                <span>Matched tokens:</span>
                {result.matchedTerms.map((term) => (
                  <span
                    key={term}
                    className="px-1.5 py-0.5 rounded bg-canvas-card border border-border-subtle text-slate-300"
                  >
                    {term}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
