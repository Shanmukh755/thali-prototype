import { useState } from "react";
import { AlertTriangle, Plus, TrendingDown } from "lucide-react";

const WASTE_LOG = [
  {
    id: 1,
    date: "17 Apr",
    item: "Paneer",
    qty: 0.4,
    unit: "kg",
    reason: "Expiry",
    cost: 92,
    category: "Dairy",
  },
  {
    id: 2,
    date: "17 Apr",
    item: "Chicken",
    qty: 0.3,
    unit: "kg",
    reason: "Spoilage",
    cost: 54,
    category: "Meat",
  },
  {
    id: 3,
    date: "16 Apr",
    item: "Tomatoes",
    qty: 0.8,
    unit: "kg",
    reason: "Preparation",
    cost: 32,
    category: "Vegetables",
  },
  {
    id: 4,
    date: "16 Apr",
    item: "Cream",
    qty: 0.2,
    unit: "ltr",
    reason: "Over-cooking",
    cost: 24,
    category: "Dairy",
  },
  {
    id: 5,
    date: "15 Apr",
    item: "Mutton",
    qty: 0.2,
    unit: "kg",
    reason: "Spoilage",
    cost: 130,
    category: "Meat",
  },
  {
    id: 6,
    date: "15 Apr",
    item: "Butter",
    qty: 0.1,
    unit: "kg",
    reason: "Expiry",
    cost: 48,
    category: "Dairy",
  },
  {
    id: 7,
    date: "14 Apr",
    item: "Paneer",
    qty: 0.5,
    unit: "kg",
    reason: "Spoilage",
    cost: 115,
    category: "Dairy",
  },
  {
    id: 8,
    date: "14 Apr",
    item: "Onions",
    qty: 1.2,
    unit: "kg",
    reason: "Preparation",
    cost: 42,
    category: "Vegetables",
  },
];

const REASON_COLOR = {
  Expiry: "bg-[#FDECEA] text-danger",
  Spoilage: "bg-[#FEF3E8] text-warning",
  Preparation: "bg-[#EBF5FB] text-info",
  "Over-cooking": "bg-[#F5F5F5] text-[#888]",
};

// ─── AI pre-waste prediction ───
function WastePrediction() {
  return (
    <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded-xl p-4 mb-3">
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">🔮</span>
        <div>
          <p className="text-[13px] font-semibold text-[#5D4037] mb-1">
            AI Pre-waste Prediction
          </p>
          <div className="space-y-[6px]">
            {[
              {
                item: "Paneer",
                risk: "You bought 5kg on Monday. Consumption running 30% below forecast. Risk: 1.8kg waste by Saturday.",
                action: "Push Paneer dishes today",
              },
              {
                item: "Chicken",
                risk: "Weekend demand forecast is 40% higher. Current stock may run short by Sunday evening.",
                action: "Order 3kg more today",
              },
            ].map((p) => (
              <div key={p.item} className="flex items-start gap-2">
                <AlertTriangle
                  size={11}
                  className="text-warning mt-[2px] flex-shrink-0"
                />
                <div className="flex-1">
                  <span className="text-[11px] font-semibold text-[#5D4037]">
                    {p.item}:{" "}
                  </span>
                  <span className="text-[11px] text-[#795548]">{p.risk}</span>
                </div>
                <button className="text-[10px] font-semibold text-primary border border-primary rounded px-2 py-[2px] hover:bg-[#FFF5F5] transition-colors flex-shrink-0">
                  {p.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InventoryWaste() {
  const [log] = useState(WASTE_LOG);

  const totalCost = log.reduce((s, w) => s + w.cost, 0);
  const byReason = log.reduce((acc, w) => {
    acc[w.reason] = (acc[w.reason] || 0) + w.cost;
    return acc;
  }, {});
  const topReason = Object.entries(byReason).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Waste This Week",
            value: `₹${totalCost.toLocaleString("en-IN")}`,
            color: "text-danger",
          },
          { label: "Entries", value: log.length, color: "text-text-primary" },
          {
            label: "Top Reason",
            value: topReason?.[0] ?? "—",
            color: "text-warning",
          },
          {
            label: "Avg Daily Waste",
            value: `₹${Math.round(totalCost / 7).toLocaleString("en-IN")}`,
            color: "text-info",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3"
          >
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              {s.label}
            </p>
            <p className={`text-[18px] font-bold leading-tight ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* AI prediction */}
      <WastePrediction />

      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <p className="text-[13px] font-semibold text-text-primary">
          Waste Log — Last 7 Days
        </p>
        <button className="btn-primary">
          <Plus size={14} /> Log Waste
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Reason</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {log.map((w) => (
              <tr key={w.id} className="hover:bg-[#FAFAFA]">
                <td className="text-xs text-text-muted">{w.date}</td>
                <td className="font-medium text-text-primary">{w.item}</td>
                <td className="text-xs text-text-muted">{w.category}</td>
                <td className="text-[13px]">
                  {w.qty} {w.unit}
                </td>
                <td>
                  <span
                    className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${REASON_COLOR[w.reason] || "bg-[#F5F5F5] text-[#888]"}`}
                  >
                    {w.reason}
                  </span>
                </td>
                <td className="font-semibold text-danger">₹{w.cost}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-[#E0E0E0] bg-[#FAFAFA]">
              <td
                colSpan={5}
                className="px-4 py-3 text-[13px] font-bold text-text-primary"
              >
                Total Waste Cost
              </td>
              <td className="px-4 py-3 text-[15px] font-bold text-danger">
                ₹{totalCost.toLocaleString("en-IN")}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
