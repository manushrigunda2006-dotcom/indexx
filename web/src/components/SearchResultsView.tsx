"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Clock,
  CheckCircle2,
  Tag,
  ExternalLink,
  Info,
} from "lucide-react";
import { sampleDocuments } from "@/lib/mock-data";
import { SearchResult } from "@/lib/types";
import { DocumentPreviewModal } from "./DocumentPreviewModal";
import { PageView } from "./Navbar";
import { UserProfileMenu } from "./UserProfileMenu";

interface SearchResultsViewProps {
  initialQuery: string;
  setCurrentView: (view: PageView) => void;
}

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  initialQuery,
  setCurrentView,
}) => {
  const [query, setQuery] = useState(initialQuery || "quantum AND computing");
  const [searchLatencyUs, setSearchLatencyUs] = useState(118);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"score" | "docId">("score");
  const [previewDoc, setPreviewDoc] = useState<SearchResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const categories = [
    "all",
    "Physics & CS",
    "Information Retrieval",
    "Systems Engineering",
    "Distributed Systems",
    "Performance Engineering",
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

  const totalPages = Math.max(1, Math.ceil(filteredResults.length / itemsPerPage));
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchLatencyUs(Math.floor(Math.random() * 60) + 85);
    setCurrentPage(1);
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
        <span key={i} className="font-semibold text-gray-900 bg-yellow-100 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Top Search Header (Google Results Header) */}
      <div className="border-b border-gray-200 px-4 sm:px-8 py-3 sticky top-0 bg-white/95 backdrop-blur-sm z-30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-6 flex-1">
          {/* Logo */}
          <button
            onClick={() => setCurrentView("home")}
            className="flex items-center gap-1.5 group select-none shrink-0"
          >
            <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              X
            </div>
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Index<span className="text-blue-600">X</span>
            </span>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="flex-1 max-w-2xl">
            <div className="flex items-center h-10 px-4 rounded-full border border-gray-200 hover:border-gray-300 hover:shadow-sm focus-within:shadow-md focus-within:border-gray-300 transition-all bg-white">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
                className="w-full bg-transparent text-sm text-gray-900 focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-2"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button type="submit" className="text-blue-600 hover:text-blue-700">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick nav links */}
        <div className="flex items-center gap-3 text-xs font-medium text-gray-600 shrink-0">
          <button
            onClick={() => setCurrentView("playground")}
            className="hover:text-blue-600 hidden sm:inline"
          >
            Query Playground
          </button>
          <button
            onClick={() => setCurrentView("explorer")}
            className="hover:text-blue-600 hidden sm:inline"
          >
            Index Explorer
          </button>
          <button
            onClick={() => setCurrentView("dashboard")}
            className="px-3 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-800 transition"
          >
            Dashboard
          </button>
          <UserProfileMenu setCurrentView={setCurrentView} />
        </div>
      </div>

      {/* Filter / Subheader tabs */}
      <div className="border-b border-gray-100 px-4 sm:px-8 py-2 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600 bg-gray-50/50">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPage(1);
              }}
              className={`px-3 py-1 rounded-full transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              {cat === "all" ? "All" : cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="text-gray-500">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "score" | "docId")}
            className="bg-white border border-gray-200 rounded px-2 py-0.5 text-xs text-gray-700 focus:outline-none"
          >
            <option value="score">Relevance Score</option>
            <option value="docId">Document ID</option>
          </select>
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-7xl px-4 sm:px-8 py-4 flex-1 flex flex-col lg:flex-row gap-8">
        {/* Left Column: Results List */}
        <div className="flex-1 max-w-3xl space-y-6">
          {/* Results count & execution time */}
          <div className="text-xs text-gray-500 font-sans flex items-center justify-between">
            <div>
              About <span className="font-semibold text-gray-700">{filteredResults.length}</span> results{" "}
              <span className="font-mono">({(searchLatencyUs / 1000).toFixed(2)} ms)</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[11px] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Demo data preview &bull; Zero-alloc C++ query path
            </div>
          </div>

          {/* Results List */}
          {paginatedResults.length === 0 ? (
            <div className="py-12 text-center text-gray-500 space-y-2">
              <p className="text-base font-semibold text-gray-800">
                No documents matched your query.
              </p>
              <p className="text-xs text-gray-500 max-w-md mx-auto">
                Suggestions: Try different keywords, check Boolean capitalization (e.g. AND, OR, NOT), or open the Query Playground to inspect syntax.
              </p>
              <button
                onClick={() => setCurrentView("playground")}
                className="mt-3 px-4 py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-medium text-xs transition"
              >
                Inspect Query in Playground
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedResults.map((doc) => (
                <div key={doc.docId} className="space-y-1 group">
                  {/* URL / Breadcrumb */}
                  <div className="text-xs text-gray-500 flex items-center gap-1.5">
                    <span className="font-mono truncate max-w-md">
                      {doc.url || `https://indexx.internal/corpus/doc-${doc.docId}`}
                    </span>
                    <span className="text-gray-300">&rsaquo;</span>
                    <span className="text-emerald-700 font-medium">{doc.category}</span>
                  </div>

                  {/* Title (Google blue hover link) */}
                  <h3
                    onClick={() => setPreviewDoc(doc)}
                    className="text-lg text-blue-700 hover:underline font-medium cursor-pointer leading-snug"
                  >
                    {doc.title}
                  </h3>

                  {/* Snippet with KWIC highlights */}
                  <p className="text-sm text-gray-700 leading-relaxed font-sans">
                    {highlightSnippet(doc.snippet, query)}
                  </p>

                  {/* Metadata Chips */}
                  <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-gray-500">
                    <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold">
                      Doc #{doc.docId}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                      {(doc.score * 100).toFixed(0)}% match
                    </span>
                    <span className="text-gray-400">
                      pos: [{doc.positions.join(", ")}]
                    </span>
                    <button
                      onClick={() => setPreviewDoc(doc)}
                      className="text-blue-600 hover:underline ml-1 font-sans text-xs flex items-center gap-1"
                    >
                      <span>Preview document</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Google-Inspired Pagination */}
          {totalPages > 1 && (
            <div className="pt-8 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-blue-700">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent text-gray-600"
              >
                &lsaquo; Previous
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-full font-medium transition ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white font-bold"
                        : "hover:bg-gray-100 text-blue-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-md hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent text-gray-600"
              >
                Next &rsaquo;
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Google Knowledge Panel / Query Intelligence */}
        <div className="lg:w-80 shrink-0 space-y-4">
          <div className="p-5 rounded-2xl border border-gray-200 bg-gray-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              <h4 className="text-xs font-semibold text-gray-900 uppercase tracking-wider font-mono">
                Query Intelligence
              </h4>
            </div>

            <div className="text-xs space-y-2 text-gray-600 font-mono">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>Active Query:</span>
                <span className="font-semibold text-blue-700 truncate max-w-[140px]">
                  {query}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>Execution Time:</span>
                <span className="text-emerald-700 font-semibold">{searchLatencyUs} &micro;s</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>Corpus Ingested:</span>
                <span>250 MB (124.5k docs)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span>Intersection Mode:</span>
                <span className="text-blue-600 font-medium">SvS Galloping</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Positional Check:</span>
                <span className="text-emerald-600 font-medium">Exact Contiguous</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setCurrentView("playground")}
                className="w-full py-2 px-3 rounded-lg bg-white border border-gray-200 hover:border-gray-300 text-gray-800 text-xs font-medium transition text-center shadow-sm"
              >
                Inspect Query AST & Trace
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-gray-100 bg-white text-xs text-gray-500 space-y-2">
            <div className="font-medium text-gray-800 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-600" />
              Evaluation Benchmark Notice
            </div>
            <p className="leading-relaxed">
              Official hackathon scoring executes headlessly inside the Docker container. This web interface provides interactive query exploration and telemetry inspection.
            </p>
          </div>
        </div>
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal
          document={previewDoc}
          query={query}
          onClose={() => setPreviewDoc(null)}
        />
      )}
    </div>
  );
};
