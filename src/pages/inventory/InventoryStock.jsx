import { useState } from "react";
import { Send, X, CheckCircle, AlertTriangle, Plus } from "lucide-react";
import { INVENTORY } from "../../data/mockData";

// ─── WhatsApp PO Modal ───
function POModal({ item, onClose }) {
  const [sent, setSent] = useState(false);
  const qty = (item.max - item.current).toFixed(1);
  const cost = (qty * item.costPerUnit).toLocaleString("en-IN");

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[460px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <div>
            <p className="text-[16px] font-semibold text-text-primary">
              Send Purchase Order
            </p>
            <p className="text-xs text-text-muted mt-[2px]">
              via WhatsApp to {item.supplier}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        {sent ? (
          <div className="flex flex-col items-center py-10 px-6">
            <CheckCircle size={52} className="text-success mb-3" />
            <p className="text-[16px] font-bold text-text-primary mb-1">
              Order Sent!
            </p>
            <p className="text-sm text-text-muted">
              WhatsApp message sent to {item.supplier}
            </p>
            <button
              className="btn-primary mt-6 w-full justify-center"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 space-y-3">
              <div className="bg-surface rounded-lg p-4 space-y-2">
                {[
                  { label: "Item", value: item.name, color: "" },
                  {
                    label: "Current Stock",
                    value: `${item.current} ${item.unit}`,
                    color: "text-danger",
                  },
                  {
                    label: "Suggested Order",
                    value: `${qty} ${item.unit}`,
                    color: "text-success",
                  },
                  { label: "Estimated Cost", value: `₹${cost}`, color: "" },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between text-[13px]"
                  >
                    <span className="text-text-muted">{r.label}</span>
                    <span className={`font-semibold ${r.color}`}>
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <p className="form-label mb-2">Message Preview</p>
                <div className="bg-[#DCF8C6] rounded-lg p-3 text-[13px] leading-relaxed font-[system-ui]">
                  Hi {item.supplier},<br />
                  Please deliver{" "}
                  <strong>
                    {qty} {item.unit} {item.name}
                  </strong>{" "}
                  tomorrow morning.
                  <br />
                  Estimated cost: ₹{cost}
                  <br />— Rajesh, Spice Garden
                </div>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
              <button className="btn-ghost flex-shrink-0" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-primary flex-1 justify-center"
                onClick={() => setSent(true)}
              >
                <Send size={14} /> Send on WhatsApp
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Stock level bar ───
function StockBar({ current, min, max }) {
  const pct = Math.min(100, Math.round((current / max) * 100));
  const color =
    current <= min * 0.5
      ? "bg-danger"
      : current <= min
        ? "bg-warning"
        : "bg-success";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-[6px] bg-[#F0F0F0] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-[10px] text-text-muted w-[28px] text-right">
        {pct}%
      </span>
    </div>
  );
}

export default function InventoryStock() {
  const [inventory, setInventory] = useState(INVENTORY);
  const [poItem, setPoItem] = useState(null);
  const [filter, setFilter] = useState("all");

  const critical = inventory.filter((i) => i.status === "critical").length;
  const low = inventory.filter((i) => i.status === "low").length;
  const ok = inventory.filter((i) => i.status === "ok").length;

  const filtered =
    filter === "all" ? inventory : inventory.filter((i) => i.status === filter);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Total Items",
            value: inventory.length,
            color: "text-text-primary",
          },
          { label: "Critical", value: critical, color: "text-danger" },
          { label: "Low Stock", value: low, color: "text-warning" },
          { label: "Today's Usage", value: "₹12,400", color: "text-success" },
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

      {/* Filter + Add */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        {[
          { id: "all", label: "All" },
          { id: "critical", label: "🔴 Critical" },
          { id: "low", label: "⚠️ Low" },
          { id: "ok", label: "✅ OK" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all ${filter === f.id ? "bg-primary text-white border-primary" : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCC]"}`}
          >
            {f.label}
          </button>
        ))}
        <button className="btn-primary ml-auto">
          <Plus size={14} /> Add Stock Entry
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Current Stock</th>
              <th>Stock Level</th>
              <th>Min / Max</th>
              <th>Cost/Unit</th>
              <th>Supplier</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-[#FAFAFA]">
                <td className="font-medium text-text-primary">{item.name}</td>
                <td className="text-xs text-text-muted">{item.category}</td>
                <td>
                  <span
                    className={`font-semibold text-[13px] ${item.status === "critical" ? "text-danger" : item.status === "low" ? "text-warning" : "text-success"}`}
                  >
                    {item.current} {item.unit}
                  </span>
                </td>
                <td className="min-w-[100px]">
                  <StockBar
                    current={item.current}
                    min={item.min}
                    max={item.max}
                  />
                </td>
                <td className="text-xs text-text-muted">
                  {item.min} / {item.max} {item.unit}
                </td>
                <td className="text-[13px]">
                  ₹{item.costPerUnit}/{item.unit}
                </td>
                <td className="text-xs text-text-muted">{item.supplier}</td>
                <td>
                  <span
                    className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${item.status === "critical" ? "bg-[#FDECEA] text-danger" : item.status === "low" ? "bg-[#FEF3E8] text-warning" : "bg-[#E8F8F0] text-success"}`}
                  >
                    {item.status === "critical"
                      ? "🔴 Critical"
                      : item.status === "low"
                        ? "⚠️ Low"
                        : "✅ OK"}
                  </span>
                </td>
                <td>
                  {(item.status === "critical" || item.status === "low") && (
                    <button
                      className="btn-primary py-[4px] px-3 text-[11px]"
                      onClick={() => setPoItem(item)}
                    >
                      Order Now
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {poItem && <POModal item={poItem} onClose={() => setPoItem(null)} />}
    </div>
  );
}
