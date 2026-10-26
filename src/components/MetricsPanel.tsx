import type { TickMetrics } from "../api/types";

// TODO(前端組)：改成折線圖（吉尼係數、存活數、價格隨回合變化），並支援比較不同實驗
export function MetricsPanel({ metrics }: { metrics: TickMetrics[] }) {
  return (
    <section>
      <h2>每回合指標</h2>
      <table>
        <thead>
          <tr>
            <th>回合</th><th>存活</th><th>財富吉尼</th><th>食物吉尼</th>
            <th>授權者數</th><th>挨餓</th><th>被拒行動</th><th>分享消息</th>
          </tr>
        </thead>
        <tbody>
          {[...metrics].reverse().map((m) => (
            <tr key={m.tick}>
              <td>{m.tick}</td>
              <td>{m.alive}</td>
              <td>{m.wealth_gini.toFixed(3)}</td>
              <td>{m.food_gini.toFixed(3)}</td>
              <td>{m.n_authorities}</td>
              <td>{m.starving}</td>
              <td>{m.rejected_actions}</td>
              <td>{m.info_shares}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
