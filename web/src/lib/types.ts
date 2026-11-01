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

export interface UserSettings {
  theme?: "light" | "dark" | "system";
  emailNotifications?: boolean;
  defaultEngineMode?: "offline" | "ipc" | "http";
  resultsPerPage?: number;
  enableTelemetry?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  role?: string;
  organization?: string;
  createdAt?: string;
  settings?: UserSettings;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string, name?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}
