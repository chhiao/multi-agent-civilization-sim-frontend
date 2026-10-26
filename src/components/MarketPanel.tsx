import type { Good, WorldState } from "../api/types";

export function MarketPanel({ market }: { market: WorldState["market"] }) {
  return (
    <section>
      <h2>市場</h2>
      <table>
        <thead>
          <tr><th>商品</th><th>價格</th><th>庫存</th></tr>
        </thead>
        <tbody>
          {(Object.keys(market.prices) as Good[]).map((good) => (
            <tr key={good}>
              <td>{good}</td>
              <td>{market.prices[good].toFixed(2)}</td>
              <td>{market.stock[good]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>市場資金：{market.treasury.toFixed(0)}</p>
    </section>
  );
}
