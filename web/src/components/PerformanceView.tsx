"use client";

import React from "react";
import {
  Activity,
  Gauge,
  Cpu,
  HardDrive,
  Clock,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export const PerformanceView: React.FC = () => {
  const latencyData = [
    { percentile: "P10", latency: 45, baseline: 180 },
    { percentile: "P25", latency: 78, baseline: 260 },
    { percentile: "P50", latency: 142, baseline: 480 },
    { percentile: "P75", latency: 220, baseline: 820 },
    { percentile: "P90", latency: 340, baseline: 1180 },
    { percentile: "P95", latency: 420, baseline: 1420 },
    { percentile: "P99", latency: 910, baseline: 2950 },
    { percentile: "P99.9", latency: 1250, baseline: 4800 },
  ];

  return (
    <div className="space-y-6">
      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">P50 Latency (Median)</span>
            <Clock className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">142 &micro;s</div>
          <p className="text-[11px] text-slate-400">vs 480 &micro;s uncompressed baseline</p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">P99 Tail Latency</span>
            <Gauge className="w-4 h-4 text-brand-cyan" />
          </div>
          <div className="text-2xl font-bold font-mono text-brand-cyan">910 &micro;s</div>
          <p className="text-[11px] text-slate-400">Sub-1ms guarantee under 50k load</p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Indexing Throughput</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">68.4 MB/s</div>
          <p className="text-[11px] text-slate-400">250 MB indexed in 3.65s</p>
        </div>

        <div className="glass-panel p-5 rounded-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase">Peak Memory RSS</span>
            <HardDrive className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-purple-400">215 MB</div>
          <p className="text-[11px] text-slate-400">Strictly within 2GB Docker ceiling</p>
        </div>
      </div>

      {/* Latency Percentile Chart */}
      <div className="glass-panel p-6 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-brand-cyan" />
              Latency Percentile Curve (Microseconds)
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated across 50,000 multi-term Boolean and exact phrase queries
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-brand-cyan">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" /> IndexX C++ Core
            </span>
            <span className="flex items-center gap-1.5 text-slate-500">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-500" /> Reference Baseline
            </span>
          </div>
        </div>

        <div className="h-72 w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={latencyData}>
              <defs>
                <linearGradient id="colorIndexX" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00F0FF" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#00F0FF" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748B" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#64748B" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
              <XAxis dataKey="percentile" stroke="#64748B" fontSize={11} />
              <YAxis stroke="#64748B" fontSize={11} unit=" &micro;s" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F172A",
                  borderColor: "rgba(255,255,255,0.1)",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Area
                type="monotone"
                dataKey="baseline"
                stroke="#64748B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorBase)"
                name="Baseline (&micro;s)"
              />
              <Area
                type="monotone"
                dataKey="latency"
                stroke="#00F0FF"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorIndexX)"
                name="IndexX (&micro;s)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
