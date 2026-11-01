"use client";

import React, { useState } from "react";
import { Database, Search, Hash, ListFilter, ArrowRight, Layers, FileCode } from "lucide-react";
import { sampleInvertedTerms } from "@/lib/mock-data";
import { InvertedIndexTerm } from "@/lib/types";

export const IndexExplorerView: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<InvertedIndexTerm>(sampleInvertedTerms[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTerms = sampleInvertedTerms.filter((t) =>
    t.term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Title */}
        <div className="pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 font-mono">
              Inverted Index Architecture
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mt-1">
            Inverted Index Explorer
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Browse the 348.9k lexicon dictionary, inspect contiguous DocID posting lists and delta-encoded word offsets.
          </p>
        </div>

        {/* Explorer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Term Dictionary List */}
          <div className="p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                Lexicon Vocabulary
              </h3>
              <span className="text-[11px] font-mono text-gray-400">348.9k total</span>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search vocabulary..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="space-y-1 max-h-96 overflow-y-auto pr-1">
              {filteredTerms.map((t) => (
                <button
                  key={t.term}
                  onClick={() => setSelectedTerm(t)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition ${
                    selectedTerm.term === t.term
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-200"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  <span>{t.term}</span>
                  <span className="text-[10px] text-gray-500 font-sans px-1.5 py-0.5 rounded bg-gray-100">
                    {t.docFrequency} docs
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Postings Entries */}
          <div className="md:col-span-2 p-6 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
              <div>
                <div className="text-xs text-gray-400 font-mono">Inspecting Posting List</div>
                <h2 className="text-xl font-bold font-mono text-blue-700 mt-0.5">
                  "{selectedTerm.term}"
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-gray-50 border border-gray-100 text-gray-700">
                  Doc Frequency: <strong>{selectedTerm.docFrequency}</strong>
                </span>
                <span className="px-2.5 py-1 rounded bg-gray-50 border border-gray-100 text-gray-700">
                  Total Occurrences: <strong>{selectedTerm.totalOccurrences}</strong>
                </span>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
                Contiguous Posting Entries (DocID &rarr; Word Offsets)
              </h4>

              <div className="space-y-2">
                {selectedTerm.postingList.map((entry) => (
                  <div
                    key={entry.docId}
                    className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono hover:border-gray-300 transition"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                        <Hash className="w-3.5 h-3.5" />
                      </span>
                      <div>
                        <span className="text-gray-500">DocID:</span>{" "}
                        <span className="text-gray-900 font-semibold">#{entry.docId}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">Word Offsets:</span>
                      <div className="flex flex-wrap gap-1">
                        {entry.positions.map((pos) => (
                          <span
                            key={pos}
                            className="px-2 py-0.5 rounded bg-white border border-gray-200 text-amber-700 font-semibold text-[11px]"
                          >
                            offset {pos}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compression Information */}
            <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 space-y-1.5 text-xs text-gray-700">
              <div className="flex items-center justify-between font-semibold text-gray-900">
                <span>Elias-Fano & Positional Delta Encoding</span>
                <span className="text-emerald-700 font-mono text-[11px]">76% memory savings</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-mono text-[11px]">
                Raw: [4, 5, 23] &rarr; Delta-Encoded: [4, +1, +18]. Stored in contiguous 64-byte cache-aligned memory blocks with 128-entry skip pointers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
