import { useState } from "react";
import { Search, Download, Filter } from "lucide-react";
import { PLATFORM_CONFIG } from "../../data/mockData";
import OrderDetailPanel from "./OrderDetailPanel";

// ─── Status config ───
const STATUS_CONFIG = {
  served: { label: "Served", bg: "bg-[#E8F8F0]", text: "text-success" },
  cooking: { label: "Cooking", bg: "bg-[#FEF3E8]", text: "text-warning" },
  delivered: { label: "Delivered", bg: "bg-[#EBF5FB]", text: "text-info" },
  running: { label: "Running", bg: "bg-[#FEF3E8]", text: "text-warning" },
  billed: { label: "Billed", bg: "bg-[#E8F8F0]", text: "text-success" },
  ready: { label: "Ready", bg: "bg-[#E8F8F0]", text: "text-success" },
  paid: { label: "Paid", bg: "bg-[#E8F8F0]", text: "text-success" },
};

// ─── Channel display ───
const CHANNEL_DISPLAY = {
  "dine-in": { label: "Dine-in", icon: "🍽️", color: "text-info" },
  zomato: { label: "Zomato", icon: "🔴", color: "text-[#E23744]" },
  swiggy: { label: "Swiggy", icon: "🟠", color: "text-[#FC8019]" },
  ondc: { label: "ONDC", icon: "🟢", color: "text-success" },
  direct: { label: "Direct", icon: "💬", color: "text-[#25D366]" },
  takeaway: { label: "Takeaway", icon: "🥡", color: "text-[#888]" },
};

// ─── Stat cards row ───
function StatCards({ orders }) {
  const total = orders.length;
  const revenue = orders.reduce((s, o) => s + o.amount, 0);
  const avgVal = total > 0 ? Math.round(revenue / total) : 0;
  const active = orders.filter((o) =>
    ["running", "cooking", "ready"].includes(o.status),
  ).length;

  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {[
        { label: "Total Orders", value: total, color: "text-text-primary" },
        {
          label: "Revenue",
          value: `₹${revenue.toLocaleString("en-IN")}`,
          color: "text-primary",
        },
        {
          label: "Avg Order Value",
          value: `₹${avgVal.toLocaleString("en-IN")}`,
          color: "text-info",
        },
        { label: "Active Now", value: active, color: "text-warning" },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3"
        >
          <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold mb-1">
            {s.label}
          </p>
          <p className={`text-[22px] font-bold leading-tight ${s.color}`}>
            {s.value}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── Main table ───
export default function OrdersTable({
  orders,
  showChannel = true,
  emptyLabel = "No orders found",
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = [
    "all",
    "running",
    "cooking",
    "ready",
    "served",
    "billed",
    "delivered",
    "paid",
  ];

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) =>
        i.name.toLowerCase().includes(search.toLowerCase()),
      ) ||
      (o.table || "").toLowerCase().includes(search.toLowerCase()) ||
      (o.platform || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <StatCards orders={orders} />

      {/* ── Toolbar ── */}
      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
        {/* Search */}
        <div className="relative flex-1 max-w-[320px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            className="form-input pl-9 text-[13px] w-full"
            placeholder="Search by order ID, item, table..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Status filter pills */}
        <div className="flex gap-[4px] flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={[
                "text-[10px] font-semibold px-[10px] py-[4px] rounded-full border capitalize transition-all",
                statusFilter === s
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCCCCC]",
              ].join(" ")}
            >
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>

        <span className="ml-auto text-xs text-text-muted">
          {filtered.length} orders
        </span>
        <button className="btn-ghost py-[6px] px-3 text-xs">
          <Download size={13} /> Export
        </button>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full py-16 text-center">
            <p className="text-[15px] font-semibold text-text-primary mb-1">
              {emptyLabel}
            </p>
            <p className="text-xs text-text-muted">
              Try adjusting your search or filter
            </p>
          </div>
        ) : (
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Time</th>
                {showChannel && <th>Channel</th>}
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => {
                const pill = STATUS_CONFIG[order.status] || {
                  label: order.status,
                  bg: "bg-[#F5F5F5]",
                  text: "text-[#888]",
                };
                const chDisp = CHANNEL_DISPLAY[order.channel] || {
                  label: order.channel,
                  icon: "📦",
                  color: "",
                };
                const itemStr = order.items
                  .map((i) => `${i.name} ×${i.qty}`)
                  .join(", ");

                return (
                  <tr
                    key={order.id}
                    className="cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <td>
                      <span className="font-bold text-primary">{order.id}</span>
                    </td>
                    <td className="text-text-muted text-xs">{order.time}</td>
                    {showChannel && (
                      <td>
                        <div className="flex items-center gap-[6px]">
                          <span>{chDisp.icon}</span>
                          <div>
                            <p
                              className={`text-xs font-semibold ${chDisp.color}`}
                            >
                              {order.platform || order.table || chDisp.label}
                            </p>
                            {order.waiter && (
                              <p className="text-[10px] text-text-muted">
                                {order.waiter}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>
                    )}
                    <td>
                      <p className="text-xs text-text-secondary max-w-[220px] truncate">
                        {itemStr}
                      </p>
                      {order.covers && (
                        <p className="text-[10px] text-text-muted">
                          {order.covers} covers
                        </p>
                      )}
                    </td>
                    <td>
                      <p className="font-semibold text-[13px]">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </p>
                      {order.commission != null && order.commission > 0 && (
                        <p className="text-[10px] text-danger">
                          -₹{order.commission} comm.
                        </p>
                      )}
                      {order.commission === 0 && (
                        <p className="text-[10px] text-[#25D366] font-semibold">
                          0% comm.
                        </p>
                      )}
                    </td>
                    <td>
                      <span
                        className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${pill.bg} ${pill.text}`}
                      >
                        {pill.label}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn-ghost py-[4px] px-3 text-[11px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail panel */}
      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
}
