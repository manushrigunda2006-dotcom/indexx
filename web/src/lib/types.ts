export interface SearchResult {
  docId: number;
  title: string;
  snippet: string;
  content?: string;
  url?: string;
  score: number;
  positions: number[];
  category: string;
  matchedTerms: string[];
  updatedAt?: string;
}

export interface InvertedIndexTerm {
  term: string;
  docFrequency: number;
  totalOccurrences: number;
  postingList: {
    docId: number;
    positions: number[];
  }[];
}

export interface BenchmarkExperiment {
  id: string;
  name: string;
  corpusSizeMB: number;
  queryCount: number;
  indexTimeMs: number;
  batchQueryTimeMs: number;
  peakMemoryMB: number;
  p50LatencyUs: number;
  p95LatencyUs: number;
  p99LatencyUs: number;
  speedup: number;
  correctness: number;
  engineType: "baseline" | "optimized";
  timestamp: string;
}

export interface EngineStats {
  status: "online" | "indexing" | "standby" | "offline";
  totalDocuments: number;
  corpusSizeBytes: number;
  uniqueTerms: number;
  totalTokens: number;
  p50LatencyUs: number;
  p95LatencyUs: number;
  p99LatencyUs: number;
  indexingThroughputMBs: number;
  totalQueriesProcessed: number;
  successRate: number;
}
