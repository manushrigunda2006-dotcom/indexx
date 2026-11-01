"use client";

import React, { useEffect } from "react";
import { X, FileText, Tag, Hash, Clock, CheckCircle, ExternalLink } from "lucide-react";
import { SearchResult } from "@/lib/types";

interface DocumentPreviewModalProps {
  document: SearchResult | null;
  onClose: () => void;
  query: string;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({
  document,
  onClose,
  query,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!document) return null;

  const highlightText = (text: string, queryStr: string) => {
    const words = queryStr
      .toLowerCase()
      .replace(/[()"]/g, "")
      .split(/\s+/)
      .filter((w) => w && !["and", "or", "not"].includes(w));

    if (words.length === 0) return text;

    const regex = new RegExp(`(${words.join("|")})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      words.includes(part.toLowerCase()) ? (
        <mark
          key={i}
          className="bg-yellow-100 text-yellow-900 font-semibold px-1 py-0.5 rounded"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-100 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-gray-500 font-mono">
                Document Inspection &bull; Doc #{document.docId}
              </div>
              <h3 className="text-base font-semibold text-gray-900 leading-snug">
                {document.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-gray-700">
          {/* Metadata badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
              Category: {document.category}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-medium">
              Score: {(document.score * 100).toFixed(1)}% match
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-700">
              Positions: [{document.positions.join(", ")}]
            </span>
            {document.updatedAt && (
              <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">
                Indexed: {document.updatedAt}
              </span>
            )}
          </div>

          {/* Full content */}
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider font-mono">
              Document Content Body
            </div>
            <p className="whitespace-pre-line text-gray-800 leading-relaxed font-sans text-sm">
              {highlightText(document.content || document.snippet, query)}
            </p>
          </div>

          {/* Positional verification trace */}
          <div className="text-xs text-gray-500 space-y-1 bg-white p-3 rounded-lg border border-gray-100 font-mono">
            <div className="font-semibold text-gray-700 flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Positional Inverted Index Verification:
            </div>
            <div>
              Matched terms: [{document.matchedTerms.join(", ")}] &rarr; Verified contiguous at offsets [{document.positions.join(", ")}]
            </div>
            <div className="text-[11px] text-gray-400">
              Zero heap allocations during verification scan.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 bg-gray-50">
          <span>Corpus identifier: 250MB Track B benchmark dataset</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
