import type { SimEvent, TickMetrics, WorldState } from "./types";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000").replace(/\/$/, "");

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`);
  if (!res.ok) throw new Error(`${path} 回傳 ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  state: () => get<WorldState>("/world/state"),
  metrics: () => get<TickMetrics[]>("/world/metrics"),
  events: (sinceTick = 0) => get<SimEvent[]>(`/world/events?since_tick=${sinceTick}`),
};

/** 離線模式：讀取後端 runs/<實驗>/seed<N>/metrics.jsonl */
export function parseJsonl<T>(text: string): T[] {
  return text
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => JSON.parse(line) as T);
}
