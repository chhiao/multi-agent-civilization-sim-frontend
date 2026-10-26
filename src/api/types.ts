// 對應後端 world-api 的 /world/* 回傳格式。
// 後端改格式時要同步更新這裡（後端：src/civsim/api/server.py、src/civsim/analysis/metrics.py）。

export type Good = "food" | "wood" | "tools";
export type Inventory = Record<Good | "money", number>;

export interface AgentView {
  id: string;
  role: "farmer" | "woodcutter" | "craftsman" | "merchant";
  goal: "wealth" | "safety" | "influence";
  health: number;
  inventory: Inventory;
  permissions: string[];
}

export interface WorldState {
  tick: number;
  market: {
    prices: Record<Good, number>;
    stock: Record<Good, number>;
    treasury: number;
  };
  agents: AgentView[];
}

export interface TickMetrics {
  tick: number;
  alive: number;
  wealth_gini: number;
  wealth_mean: number;
  food_gini: number;
  n_authorities: number;
  grants_this_tick: number;
  starving: number;
  deaths: number;
  rejected_actions: number;
  info_shares: number;
  prices: Record<Good, number>;
}

export interface SimEvent {
  tick: number;
  kind: string; // action:trade / world:food_shock_forecast / world:death ...
  actor: string | null;
  success: boolean;
  payload: Record<string, unknown>;
  message: string;
}
