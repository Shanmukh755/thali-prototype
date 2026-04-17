import { X, Printer, MessageSquare, RotateCcw, TrendingUp } from "lucide-react";
import { PLATFORM_CONFIG } from "../../data/mockData";

const STATUS_CONFIG = {
  served: { label: "Served", bg: "bg-[#E8F8F0]", text: "text-success" },
  cooking: { label: "Cooking", bg: "bg-[#FEF3E8]", text: "text-warning" },
  delivered: { label: "Delivered", bg: "bg-[#EBF5FB]", text: "text-info" },
  running: { label: "Running", bg: "bg-[#FEF3E8]", text: "text-warning" },
  billed: { label: "Billed", bg: "bg-[#E8F8F0]", text: "text-success" },
  ready: { label: "Ready", bg: "bg-[#E8F8F0]", text: "text-success" },
  paid: { label: "Paid", bg: "bg-[#E8F8F0]", text: "text-success" },
};

export default function OrderDetailPanel({ order, onClose }) {
  if (!order) return null;

  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;
  const pill = STATUS_CONFIG[order.status] || {
    label: order.status,
    bg: "bg-[#F5F5F5]",
    text: "text-[#888]",
  };
  const platCfg =
    order.channel !== "dine-in" && order.channel !== "takeaway"
      ? PLATFORM_CONFIG[order.channel]
      : null;

  const netProfit = platCfg
    ? grandTotal - (order.commission || 0) - Math.round(grandTotal * 0.28)
    : null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-[199]" onClick={onClose} />

      {/* Panel */}
      <div className="side-panel open flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEEEEE]">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-bold text-primary">{order.id}</p>
              <span
                className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${pill.bg} ${pill.text}`}
              >
                {pill.label}
              </span>
            </div>
            <p className="text-[11px] text-text-muted mt-[2px]">
              {order.time}
              {order.table ? ` · ${order.table}` : ""}
              {order.waiter ? ` · ${order.waiter}` : ""}
              {platCfg ? ` · ${platCfg.label}` : ""}
              {order.covers ? ` · ${order.covers} covers` : ""}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Platform badge */}
          {platCfg && (
            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-2 ${platCfg.bg}`}
            >
              <span className={`text-xs font-bold ${platCfg.text}`}>
                {platCfg.label}
              </span>
              {order.commission != null && (
                <span className="text-[11px] text-text-muted ml-auto">
                  Commission:{" "}
                  <span className="font-semibold text-danger">
                    ₹{order.commission}
                  </span>
                </span>
              )}
            </div>
          )}

          {/* Direct channel badge */}
          {order.channel === "direct" && (
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 bg-[#E6F9EE]">
              <span className="text-xs font-bold text-[#25D366]">
                {order.platform || "Direct"} — Zero Commission ✅
              </span>
            </div>
          )}

          {/* Items */}
          <div>
            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-2">
              Items
            </p>
            <div className="space-y-2">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-semibold text-primary bg-[#FFF5F5] rounded px-[6px] py-[1px]">
                      ×{item.qty}
                    </span>
                    <span className="text-[13px] text-text-primary">
                      {item.name}
                    </span>
                  </div>
                  <span className="text-[13px] font-semibold">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bill breakdown */}
          <div className="bg-surface rounded-lg p-3 space-y-1">
            <div className="flex justify-between text-xs text-text-muted">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-xs text-text-muted">
              <span>GST (5%)</span>
              <span>₹{gst.toLocaleString("en-IN")}</span>
            </div>
            {order.commission != null && (
              <div className="flex justify-between text-xs text-danger">
                <span>Platform Commission</span>
                <span>-₹{order.commission}</span>
              </div>
            )}
            <div className="flex justify-between text-[15px] font-bold pt-1 border-t border-[#E0E0E0]">
              <span>Total</span>
              <span className="text-primary">
                ₹{grandTotal.toLocaleString("en-IN")}
              </span>
            </div>
            {netProfit != null && (
              <div className="flex justify-between text-[11px] font-semibold pt-1">
                <span className="flex items-center gap-1 text-text-muted">
                  <TrendingUp size={11} /> Net Profit (est.)
                </span>
                <span
                  className={netProfit > 0 ? "text-success" : "text-danger"}
                >
                  ₹{netProfit.toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="px-5 py-4 border-t border-[#EEEEEE] flex gap-2">
          <button className="btn-ghost flex-1 justify-center text-xs py-[8px]">
            <Printer size={13} /> Print Bill
          </button>
          <button className="btn-ghost flex-1 justify-center text-xs py-[8px]">
            <MessageSquare size={13} /> WhatsApp Bill
          </button>
          <button className="btn-primary flex-1 justify-center text-xs py-[8px]">
            <RotateCcw size={13} /> Reorder
          </button>
        </div>
      </div>
    </>
  );
}
