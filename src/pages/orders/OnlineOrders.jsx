import { useState } from "react";
import { ORDERS, PLATFORM_CONFIG } from "../../data/mockData";
import OrdersTable from "./OrdersTable";

export default function OnlineOrders() {
  const [platform, setPlatform] = useState("all");

  const platforms = ["all", "zomato", "swiggy", "ondc"];
  const base = ORDERS.filter((o) =>
    ["zomato", "swiggy", "ondc"].includes(o.channel),
  );
  const orders =
    platform === "all" ? base : base.filter((o) => o.channel === platform);

  // Per-platform revenue summary
  const summary = platforms.slice(1).map((p) => {
    const pOrders = base.filter((o) => o.channel === p);
    const revenue = pOrders.reduce((s, o) => s + o.amount, 0);
    const commPaid = pOrders.reduce((s, o) => s + (o.commission || 0), 0);
    const cfg = PLATFORM_CONFIG[p];
    return { p, cfg, count: pOrders.length, revenue, commPaid };
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Platform summary cards */}
      <div className="grid grid-cols-3 gap-3 mb-3 flex-shrink-0">
        {summary.map(({ p, cfg, count, revenue, commPaid }) => (
          <button
            key={p}
            onClick={() => setPlatform(platform === p ? "all" : p)}
            className={[
              "rounded-xl border p-3 text-left transition-all",
              platform === p
                ? `${cfg.bg} border-[${cfg.color}]`
                : "bg-white border-[#EEEEEE] hover:border-[#CCCCCC]",
            ].join(" ")}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${cfg.text}`}>
                {cfg.label}
              </span>
              <span className="text-[10px] text-text-muted">
                {count} orders
              </span>
            </div>
            <p className="text-[18px] font-bold text-text-primary">
              ₹{revenue.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-danger mt-[2px]">
              -₹{commPaid.toLocaleString("en-IN")} commission
            </p>
          </button>
        ))}
      </div>

      <OrdersTable orders={orders} showChannel emptyLabel="No online orders" />
    </div>
  );
}
