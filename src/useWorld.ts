import { useEffect, useState } from "react";
import { api } from "./api/client";
import type { SimEvent, TickMetrics, WorldState } from "./api/types";

const POLL_MS = 2000;

/** 定時向後端讀取世界狀態。offline 為 true 時停止讀取（正在看離線紀錄）。 */
export function useWorld(offline: boolean) {
  const [state, setState] = useState<WorldState | null>(null);
  const [metrics, setMetrics] = useState<TickMetrics[]>([]);
  const [events, setEvents] = useState<SimEvent[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (offline) return;
    let cancelled = false;
    async function poll() {
      try {
        const [s, m, e] = await Promise.all([api.state(), api.metrics(), api.events()]);
        if (cancelled) return;
        setState(s);
        setMetrics(m);
        setEvents(e);
        setError(null);
      } catch (err) {
        if (!cancelled) setError(String(err));
      }
    }
    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [offline]);

  return { state, metrics, events, error, setMetrics };
}
