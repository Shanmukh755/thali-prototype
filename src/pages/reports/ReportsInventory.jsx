import { INVENTORY } from "../../data/mockData";

const CONSUMPTION = [
  { item: "Chicken", expected: 12.0, actual: 11.2, variance: -0.8, cost: 144 },
  { item: "Paneer", expected: 8.0, actual: 9.4, variance: +1.4, cost: 322 },
  {
    item: "Basmati Rice",
    expected: 6.0,
    actual: 5.8,
    variance: -0.2,
    cost: 17,
  },
  { item: "Butter", expected: 2.0, actual: 2.6, variance: +0.6, cost: 288 },
  { item: "Tomatoes", expected: 5.0, actual: 4.8, variance: -0.2, cost: 8 },
  { item: "Onions", expected: 4.0, actual: 4.2, variance: +0.2, cost: 7 },
];

export default function ReportsInventory() {
  const totalFoodCost = 12400;
  const revenue = 42800;
  const foodCostPct = Math.round((totalFoodCost / revenue) * 100);

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Food Cost Today",
            value: `₹${totalFoodCost.toLocaleString("en-IN")}`,
            color: "text-text-primary",
          },
          {
            label: "Food Cost %",
            value: `${foodCostPct}%`,
            color: foodCostPct < 32 ? "text-success" : "text-danger",
          },
          { label: "Waste Cost (week)", value: "₹537", color: "text-warning" },
          {
            label: "Variance Items",
            value: CONSUMPTION.filter((c) => Math.abs(c.variance) > 0.5).length,
            color: "text-danger",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3"
          >
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              {s.label}
            </p>
            <p className={`text-[22px] font-bold leading-tight ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Food cost % trend */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <p className="text-[14px] font-semibold text-text-primary mb-1">
          Food Cost % — Last 7 Days
        </p>
        <p className="text-[11px] text-text-muted mb-4">
          Target: &lt;32% · Green = on target
        </p>
        <div className="flex items-end gap-3 h-[80px]">
          {[31, 29, 33, 29, 30, 28, 29].map((pct, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-semibold text-text-muted">
                {pct}%
              </span>
              <div
                className={`w-full rounded-t ${pct > 32 ? "bg-danger" : "bg-success"}`}
                style={{ height: `${(pct / 35) * 60}px` }}
              />
              <span className="text-[9px] text-text-muted">
                {["M", "T", "W", "T", "F", "S", "S"][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Consumption variance */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Consumption Variance — Today
          </p>
          <p className="text-[11px] text-text-muted mt-[1px]">
            Expected vs actual usage. Large variance may indicate waste or
            theft.
          </p>
        </div>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Expected</th>
              <th>Actual</th>
              <th>Variance</th>
              <th>Cost Impact</th>
            </tr>
          </thead>
          <tbody>
            {CONSUMPTION.map((c) => (
              <tr key={c.item} className="hover:bg-[#FAFAFA]">
                <td className="font-medium">{c.item}</td>
                <td className="text-text-muted">{c.expected} kg</td>
                <td className="font-semibold">{c.actual} kg</td>
                <td>
                  <span
                    className={`text-[11px] font-semibold ${c.variance > 0.5 ? "text-danger" : c.variance < -0.5 ? "text-warning" : "text-success"}`}
                  >
                    {c.variance > 0 ? "+" : ""}
                    {c.variance} kg
                  </span>
                </td>
                <td>
                  <span
                    className={`text-[11px] font-semibold ${Math.abs(c.variance) > 0.5 ? "text-danger" : "text-text-muted"}`}
                  >
                    {c.variance > 0 ? "+" : ""}₹{c.cost}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
