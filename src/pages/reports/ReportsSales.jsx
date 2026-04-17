import { useState } from "react";
import { Download, ArrowUpRight, ArrowDownRight } from "lucide-react";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const REVENUE = [32000, 28000, 35000, 42800, 38000, 52000, 48000];
const MAX_REV = Math.max(...REVENUE);

const TOP_ITEMS = [
  {
    rank: 1,
    name: "Butter Chicken",
    orders: 312,
    revenue: 99840,
    margin: 68,
    cat: "⭐ Star",
  },
  {
    rank: 2,
    name: "Chicken Biryani",
    orders: 287,
    revenue: 97580,
    margin: 62,
    cat: "⭐ Star",
  },
  {
    rank: 3,
    name: "Dal Makhani",
    orders: 241,
    revenue: 53020,
    margin: 74,
    cat: "⭐ Star",
  },
  {
    rank: 4,
    name: "Paneer Butter Masala",
    orders: 198,
    revenue: 55440,
    margin: 71,
    cat: "⭐ Star",
  },
  {
    rank: 5,
    name: "Mutton Biryani",
    orders: 142,
    revenue: 59640,
    margin: 55,
    cat: "🐄 Plowhorse",
  },
];

const HOURLY = [
  { hour: "12 PM", orders: 18 },
  { hour: "1 PM", orders: 34 },
  { hour: "2 PM", orders: 28 },
  { hour: "3 PM", orders: 12 },
  { hour: "4 PM", orders: 8 },
  { hour: "5 PM", orders: 14 },
  { hour: "6 PM", orders: 22 },
  { hour: "7 PM", orders: 48 },
  { hour: "8 PM", orders: 62 },
  { hour: "9 PM", orders: 54 },
  { hour: "10 PM", orders: 38 },
  { hour: "11 PM", orders: 18 },
];
const MAX_HOURLY = Math.max(...HOURLY.map((h) => h.orders));

export default function ReportsSales() {
  const [period, setPeriod] = useState("week");

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      {/* Period selector + stats */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div className="flex gap-[4px]">
          {["week", "month", "year"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`text-[11px] font-semibold px-3 py-[5px] rounded-lg border capitalize transition-all ${period === p ? "bg-primary text-white border-primary" : "bg-white text-text-muted border-[#E0E0E0]"}`}
            >
              This {p}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Revenue", value: "₹2,75,800", change: 12, up: true },
          { label: "Avg Daily", value: "₹39,400", change: 8, up: true },
          { label: "Total Orders", value: "1,247", change: 5, up: true },
          { label: "Avg Order Value", value: "₹221", change: -2, up: false },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3"
          >
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              {s.label}
            </p>
            <p className="text-[22px] font-bold text-text-primary leading-tight">
              {s.value}
            </p>
            <div
              className={`flex items-center gap-1 text-[11px] font-medium mt-1 ${s.up ? "text-success" : "text-danger"}`}
            >
              {s.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(s.change)}% vs last {period}
            </div>
          </div>
        ))}
      </div>

      {/* Revenue bar chart */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[14px] font-semibold text-text-primary">
            Daily Revenue — This Week
          </p>
          <button className="btn-ghost text-xs py-[4px] px-3">
            <Download size={12} /> Export
          </button>
        </div>
        <div className="flex items-end gap-3 h-[140px]">
          {DAYS.map((day, i) => (
            <div
              key={day}
              className="flex-1 flex flex-col items-center gap-[5px]"
            >
              <span className="text-[10px] font-semibold text-primary">
                ₹{(REVENUE[i] / 1000).toFixed(0)}k
              </span>
              <div
                className={`w-full rounded-t-md transition-all ${day === "Thu" ? "bg-primary" : "bg-info/40"}`}
                style={{ height: `${(REVENUE[i] / MAX_REV) * 100}px` }}
              />
              <span
                className={`text-[11px] ${day === "Thu" ? "font-bold text-primary" : "text-text-muted"}`}
              >
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hourly heatmap */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <p className="text-[14px] font-semibold text-text-primary mb-4">
          Peak Hours — Today
        </p>
        <div className="flex items-end gap-2 h-[80px]">
          {HOURLY.map((h) => (
            <div
              key={h.hour}
              className="flex-1 flex flex-col items-center gap-1"
            >
              <div
                className="w-full rounded-t"
                style={{
                  height: `${(h.orders / MAX_HOURLY) * 60}px`,
                  background:
                    h.orders >= 50
                      ? "#CC3333"
                      : h.orders >= 30
                        ? "#E67E22"
                        : "#AED6F1",
                }}
              />
              <span className="text-[9px] text-text-muted">{h.hour}</span>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-text-muted mt-2">
          🔴 Peak: 8-9 PM · 62 orders/hour
        </p>
      </div>

      {/* Top items */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Top Selling Items
          </p>
        </div>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Orders</th>
              <th>Revenue</th>
              <th>Margin</th>
              <th>ME</th>
            </tr>
          </thead>
          <tbody>
            {TOP_ITEMS.map((item) => (
              <tr key={item.rank} className="hover:bg-[#FAFAFA]">
                <td className="font-bold text-primary">#{item.rank}</td>
                <td className="font-medium">{item.name}</td>
                <td>{item.orders}</td>
                <td className="font-semibold">
                  ₹{item.revenue.toLocaleString("en-IN")}
                </td>
                <td>
                  <span
                    className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${item.margin > 65 ? "bg-[#E8F8F0] text-success" : "bg-[#FEF3E8] text-warning"}`}
                  >
                    {item.margin}%
                  </span>
                </td>
                <td className="text-[11px]">{item.cat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
