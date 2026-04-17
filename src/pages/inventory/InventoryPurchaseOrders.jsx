import { useState } from "react";
import { Send, CheckCircle, Clock, Plus, X } from "lucide-react";

const PO_DATA = [
  {
    id: "PO-018",
    supplier: "Sharma Dairy",
    date: "17 Apr 2026",
    expectedDelivery: "18 Apr 2026",
    status: "sent",
    items: [
      { name: "Paneer", qty: 12.7, unit: "kg", costPerUnit: 230, total: 2921 },
      { name: "Butter", qty: 4.2, unit: "kg", costPerUnit: 480, total: 2016 },
      { name: "Cream", qty: 4.8, unit: "ltr", costPerUnit: 120, total: 576 },
    ],
    total: 5513,
  },
  {
    id: "PO-017",
    supplier: "Fresh Farms",
    date: "16 Apr 2026",
    expectedDelivery: "17 Apr 2026",
    status: "delivered",
    items: [
      { name: "Chicken", qty: 18.5, unit: "kg", costPerUnit: 180, total: 3330 },
      { name: "Mutton", qty: 8.5, unit: "kg", costPerUnit: 650, total: 5525 },
    ],
    total: 8855,
  },
  {
    id: "PO-016",
    supplier: "Veggie Hub",
    date: "15 Apr 2026",
    expectedDelivery: "16 Apr 2026",
    status: "delivered",
    items: [
      { name: "Tomatoes", qty: 5.8, unit: "kg", costPerUnit: 40, total: 232 },
      { name: "Onions", qty: 13.5, unit: "kg", costPerUnit: 35, total: 473 },
    ],
    total: 705,
  },
  {
    id: "PO-015",
    supplier: "Spice World",
    date: "14 Apr 2026",
    expectedDelivery: "15 Apr 2026",
    status: "pending",
    items: [
      {
        name: "Garam Masala",
        qty: 1.6,
        unit: "kg",
        costPerUnit: 800,
        total: 1280,
      },
    ],
    total: 1280,
  },
];

const STATUS_CFG = {
  sent: { label: "Sent", bg: "bg-[#EBF5FB]", text: "text-info" },
  delivered: { label: "Delivered", bg: "bg-[#E8F8F0]", text: "text-success" },
  pending: { label: "Pending", bg: "bg-[#FEF3E8]", text: "text-warning" },
};

// ─── AI-suggested PO banner ───
function AISuggestion({ onGenerate }) {
  return (
    <div className="flex items-start gap-3 bg-[#FFF8E1] border border-[#FFD54F] rounded-xl px-4 py-3 mb-3">
      <span className="text-xl flex-shrink-0">💡</span>
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-[#5D4037]">
          AI Restock Suggestion
        </p>
        <p className="text-[11px] text-[#795548] mt-[2px]">
          Based on last 14 days usage: order{" "}
          <strong>8kg Maida, 12kg Onion, 4kg Paneer</strong> today. Estimated
          cost: ₹2,840. Delivery expected tomorrow.
        </p>
      </div>
      <button
        onClick={onGenerate}
        className="btn-primary text-xs py-[6px] px-3 flex-shrink-0"
      >
        Generate PO
      </button>
    </div>
  );
}

export default function InventoryPurchaseOrders() {
  const [orders, setOrders] = useState(PO_DATA);
  const [expanded, setExpanded] = useState(null);
  const [showAI, setShowAI] = useState(true);

  const totalSpent = orders
    .filter((o) => o.status === "delivered")
    .reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status !== "delivered").length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Total POs",
            value: orders.length,
            color: "text-text-primary",
          },
          { label: "Pending", value: pending, color: "text-warning" },
          {
            label: "Delivered",
            value: orders.filter((o) => o.status === "delivered").length,
            color: "text-success",
          },
          {
            label: "Spent (7 days)",
            value: `₹${totalSpent.toLocaleString("en-IN")}`,
            color: "text-primary",
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

      {/* AI suggestion */}
      {showAI && <AISuggestion onGenerate={() => setShowAI(false)} />}

      {/* Header row */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <p className="text-[13px] font-semibold text-text-primary">
          {orders.length} purchase orders
        </p>
        <button className="btn-primary">
          <Plus size={14} /> New PO
        </button>
      </div>

      {/* PO list */}
      <div className="flex-1 overflow-y-auto space-y-3">
        {orders.map((po) => {
          const cfg = STATUS_CFG[po.status] || STATUS_CFG.pending;
          const isOpen = expanded === po.id;
          return (
            <div
              key={po.id}
              className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden"
            >
              <div
                className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-[#FAFAFA] transition-colors"
                onClick={() => setExpanded(isOpen ? null : po.id)}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[13px] font-bold text-primary">
                      {po.id}
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${cfg.bg} ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-[12px] text-text-muted">
                    {po.supplier} · {po.date}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[15px] font-bold text-text-primary">
                    ₹{po.total.toLocaleString("en-IN")}
                  </p>
                  <p className="text-[10px] text-text-muted">
                    {po.items.length} items · Delivery: {po.expectedDelivery}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  {po.status === "sent" && (
                    <button className="btn-ghost py-[4px] px-3 text-[11px]">
                      <CheckCircle size={12} /> Mark Received
                    </button>
                  )}
                  {po.status === "pending" && (
                    <button className="btn-primary py-[4px] px-3 text-[11px]">
                      <Send size={12} /> Send WhatsApp
                    </button>
                  )}
                </div>
              </div>
              {isOpen && (
                <div className="px-5 pb-4 border-t border-[#F5F5F5]">
                  <table className="w-full text-[12px] mt-3">
                    <thead>
                      <tr className="text-text-muted text-[10px] uppercase tracking-wide">
                        <th className="text-left pb-2 font-semibold">Item</th>
                        <th className="text-left pb-2 font-semibold">Qty</th>
                        <th className="text-left pb-2 font-semibold">Rate</th>
                        <th className="text-right pb-2 font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {po.items.map((item, i) => (
                        <tr key={i} className="border-t border-[#F5F5F5]">
                          <td className="py-[6px] text-text-primary font-medium">
                            {item.name}
                          </td>
                          <td className="py-[6px] text-text-muted">
                            {item.qty} {item.unit}
                          </td>
                          <td className="py-[6px] text-text-muted">
                            ₹{item.costPerUnit}/{item.unit}
                          </td>
                          <td className="py-[6px] text-right font-semibold">
                            ₹{item.total.toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-[#E0E0E0]">
                        <td
                          colSpan={3}
                          className="py-[6px] font-bold text-text-primary"
                        >
                          Total
                        </td>
                        <td className="py-[6px] text-right font-bold text-primary">
                          ₹{po.total.toLocaleString("en-IN")}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
