import type { AgentView } from "../api/types";

// TODO(前端組)：改成地圖或關係網路圖（誰分享消息給誰、誰授權給誰）
export function AgentTable({ agents }: { agents: AgentView[] }) {
  return (
    <section>
      <h2>居民（{agents.filter((a) => a.health > 0).length} / {agents.length} 存活）</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th><th>職業</th><th>目標</th><th>健康</th>
            <th>貨幣</th><th>食物</th><th>木材</th><th>工具</th><th>權限</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a) => (
            <tr key={a.id} className={a.health <= 0 ? "dead" : undefined}>
              <td>{a.id}</td>
              <td>{a.role}</td>
              <td>{a.goal}</td>
              <td>{a.health}</td>
              <td>{a.inventory.money.toFixed(0)}</td>
              <td>{a.inventory.food.toFixed(1)}</td>
              <td>{a.inventory.wood.toFixed(1)}</td>
              <td>{a.inventory.tools.toFixed(1)}</td>
              <td>{a.permissions.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
