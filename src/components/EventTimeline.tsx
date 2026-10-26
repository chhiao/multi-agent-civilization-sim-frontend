import type { SimEvent } from "../api/types";

const MAX_SHOWN = 50;

// TODO(前端組)：依回合分組、可篩選事件類型或特定 Agent
export function EventTimeline({ events }: { events: SimEvent[] }) {
  const shown = events.slice(-MAX_SHOWN).reverse();
  return (
    <section>
      <h2>事件（最近 {shown.length} 筆）</h2>
      <ul className="events">
        {shown.map((e, i) => (
          <li key={i} className={e.success ? undefined : "failed"}>
            <span className="tick">t{e.tick}</span> {e.kind} {e.actor ?? ""} {e.message}
          </li>
        ))}
      </ul>
    </section>
  );
}
