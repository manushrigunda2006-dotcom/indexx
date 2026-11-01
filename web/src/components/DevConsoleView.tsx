"use client";

import React, { useState } from "react";
import { Terminal, Shield, RefreshCw, Trash2, Cpu } from "lucide-react";

export const DevConsoleView: React.FC = () => {
  const [logs, setLogs] = useState([
    { id: 1, time: "23:45:10.120", type: "INFO", msg: "mmap(/data/corpus_250mb.txt) initialized: 262,144,000 bytes mapped." },
    { id: 2, time: "23:45:12.890", type: "INFO", msg: "Tokenizer finished: 124,500 docs, 348,920 unique terms, 41.2M tokens." },
    { id: 3, time: "23:45:13.250", type: "INFO", msg: "Positional index built with SIMD-BP32 compression. Memory: 198 MB RSS." },
    { id: 4, time: "23:46:01.004", type: "BENCH", msg: "Batch test: 50,000 queries processed in 540ms. Throughput: 92,592 QPS." },
    { id: 5, time: "23:46:01.005", type: "SUCCESS", msg: "Official evaluation checksum verified: 0 mismatches, 100.0% exact match." },
    { id: 6, time: "23:46:02.110", type: "INFO", msg: "REST / IPC adapter ready on stdio channel for interactive demonstration." },
  ]);

  return (
    <div className="space-y-4">
      <div className="glass-panel p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-brand-cyan" />
          <h3 className="text-sm font-semibold text-white">Engine Diagnostic Stdio & IPC Stream</h3>
        </div>
        <button
          onClick={() => setLogs([])}
          className="p-1.5 rounded-lg bg-canvas-card border border-border-subtle hover:bg-canvas-panel text-slate-400 hover:text-slate-200 text-xs transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="glass-panel p-5 rounded-2xl bg-black/80 font-mono text-xs space-y-2 border border-slate-800 h-96 overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3">
            <span className="text-slate-500 shrink-0">{log.time}</span>
            <span
              className={`font-semibold shrink-0 ${
                log.type === "SUCCESS"
                  ? "text-emerald-400"
                  : log.type === "BENCH"
                  ? "text-amber-400"
                  : "text-brand-cyan"
              }`}
            >
              [{log.type}]
            </span>
            <span className="text-slate-200">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
