# Multi-Agent 文明模擬器（前端）

視覺化介面：呈現世界狀態、居民、市場、事件時間軸與每回合指標。
模擬引擎與 API 在後端 repo：[multi-agent-civilization-sim](https://github.com/greentea17dog/multi-agent-civilization-sim)。

技術：React + Vite + TypeScript。

## 快速開始

需要 Node.js 20+。

```bash
# 1. 在後端 repo 啟動 world-api（http://localhost:8000）
python -m civsim serve --config configs/baseline.yaml
# 讓世界動起來：在另一個終端機讓 Agent 經 API 跑回合
python -m civsim remote --base-url http://localhost:8000

# 2. 在本 repo
npm install
npm run dev        # http://localhost:5173
```

後端位址不同時，複製 `.env.example` 成 `.env` 並修改 `VITE_API_BASE_URL`。
後端預設只允許 `http://localhost:5173` 的跨來源請求，其他來源請設定後端的 `CIVSIM_CORS_ORIGINS`。

也可以不開後端：用「載入離線紀錄」選擇後端 `runs/<實驗>/seed<N>/metrics.jsonl`。

## 結構

```
src/
  api/types.ts        後端 /world/* 的資料格式（後端改格式時要同步更新）
  api/client.ts       呼叫 API
  useWorld.ts         每 2 秒讀取一次世界狀態
  components/         各區塊：市場、居民、指標、事件
  App.tsx             版面
```

## 使用的 API

| 路徑 | 內容 |
|---|---|
| `GET /world/state` | 目前回合、市場、每個 Agent 的狀態與權限 |
| `GET /world/metrics` | 每回合指標 |
| `GET /world/events?since_tick=N` | 第 N 回合之後的事件 |

需要新的資料時，在後端 repo 的 `src/civsim/api/server.py` 新增 `/world/*` 路徑，並更新這裡的 `src/api/types.ts`。

## 待辦

程式中以 `TODO(前端組)` 標註：

- 指標改成折線圖，並能比較不同實驗（equal vs hierarchical）
- 居民關係網路圖（分享消息、授權）
- 事件時間軸的篩選

## Git 流程

不要直接 push 到 `main`；開分支 `frontend/<功能>`，PR 經其他組員 review 後 merge。
