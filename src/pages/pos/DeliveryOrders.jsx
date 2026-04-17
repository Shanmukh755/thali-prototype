import { useState, useEffect } from "react";
import {
  Pause,
  Play,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Clock,
  Bike,
  TrendingUp,
  X,
  ChevronDown,
  Filter,
  MessageSquare,
  Flag,
  Star,
} from "lucide-react";
import { DELIVERY_ORDERS, PLATFORM_CONFIG } from "../../data/mockData";

// ─── Order stage pipeline ───
const STAGES = [
  { id: "new", label: "New" },
  { id: "accepted", label: "Accepted" },
  { id: "cooking", label: "Cooking" },
  { id: "packed", label: "Packed" },
  { id: "picked", label: "Picked Up" },
  { id: "delivered", label: "Delivered" },
];

const STAGE_IDX = Object.fromEntries(STAGES.map((s, i) => [s.id, i]));

// ─── Status pill config ───
const STATUS_PILL = {
  new: { bg: "bg-[#EBF5FB]", text: "text-info", label: "New Order" },
  accepted: { bg: "bg-[#EBF5FB]", text: "text-info", label: "Accepted" },
  cooking: { bg: "bg-[#FEF3E8]", text: "text-warning", label: "Cooking" },
  packed: { bg: "bg-[#E8F8F0]", text: "text-success", label: "Packed" },
  picked: { bg: "bg-[#E8F8F0]", text: "text-success", label: "Picked Up" },
  delivered: { bg: "bg-[#F5F5F5]", text: "text-[#888]", label: "Delivered" },
  cancelled: { bg: "bg-[#FDECEA]", text: "text-danger", label: "Cancelled" },
};

// ─── Platform badge ───
function PlatformBadge({ channel, size = "sm" }) {
  const cfg = PLATFORM_CONFIG[channel] || PLATFORM_CONFIG.zomato;
  return (
    <span
      className={`inline-flex items-center gap-1 font-bold rounded-full px-2 py-[2px] ${cfg.bg} ${cfg.text} ${size === "sm" ? "text-[10px]" : "text-xs"}`}
    >
      {cfg.label}
    </span>
  );
}

// ─── Profit breakdown tooltip card ───
function ProfitCard({ order }) {
  const margin =
    order.gross > 0 ? Math.round((order.netProfit / order.gross) * 100) : 0;
  const marginColor =
    margin >= 50
      ? "text-success"
      : margin >= 35
        ? "text-warning"
        : "text-danger";
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-3 min-w-[200px]">
      <p className="text-[10px] text-[#888] mb-2 font-semibold uppercase tracking-wide">
        Real Margin Breakdown
      </p>
      <div className="space-y-[5px]">
        <div className="flex justify-between text-[11px]">
          <span className="text-[#ccc]">Gross Order</span>
          <span className="text-white font-semibold">₹{order.gross}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-[#E74C3C]">
            Commission ({PLATFORM_CONFIG[order.channel]?.commissionPct ?? 0}%)
          </span>
          <span className="text-[#E74C3C]">-₹{order.commission}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-[#E74C3C]">Food Cost</span>
          <span className="text-[#E74C3C]">-₹{order.foodCost}</span>
        </div>
        <div className="flex justify-between text-[11px]">
          <span className="text-[#E74C3C]">Packaging</span>
          <span className="text-[#E74C3C]">-₹{order.packaging}</span>
        </div>
        <div className="border-t border-[#333] pt-[5px] flex justify-between text-[13px] font-bold">
          <span className="text-white">Net Profit</span>
          <span className={marginColor}>
            ₹{order.netProfit} ({margin}%)
          </span>
        </div>
      </div>
      {order.channel === "whatsapp" && (
        <div className="mt-2 text-[10px] text-[#25D366] font-semibold">
          ✅ Zero commission — direct channel
        </div>
      )}
    </div>
  );
}

// ─── Stage progress bar ───
function StageBar({ status }) {
  const currentIdx = STAGE_IDX[status] ?? 0;
  return (
    <div className="flex items-center gap-[3px]">
      {STAGES.map((stage, i) => {
        const done = i <= currentIdx;
        const current = i === currentIdx;
        return (
          <div key={stage.id} className="flex items-center gap-[3px]">
            <div
              title={stage.label}
              className={[
                "w-[7px] h-[7px] rounded-full transition-all",
                done
                  ? current
                    ? "bg-primary scale-125"
                    : "bg-success"
                  : "bg-[#E0E0E0]",
              ].join(" ")}
            />
            {i < STAGES.length - 1 && (
              <div
                className={`w-[10px] h-[1.5px] ${i < currentIdx ? "bg-success" : "bg-[#E0E0E0]"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Single delivery order card ───
function OrderCard({ order, onAction, onDispute }) {
  const [showProfit, setShowProfit] = useState(false);
  const cfg = PLATFORM_CONFIG[order.channel] || PLATFORM_CONFIG.zomato;
  const pill = STATUS_PILL[order.status] || STATUS_PILL.new;
  const margin =
    order.gross > 0 ? Math.round((order.netProfit / order.gross) * 100) : 0;
  const marginColor =
    margin >= 50
      ? "text-success"
      : margin >= 35
        ? "text-warning"
        : "text-danger";
  const isActive = !["delivered", "cancelled"].includes(order.status);

  // Next action button config
  const nextAction = {
    new: { label: "Accept", cls: "bg-info text-white hover:bg-[#4A9EC4]" },
    accepted: {
      label: "Start Cook",
      cls: "bg-warning text-white hover:bg-[#D4700F]",
    },
    cooking: {
      label: "Mark Ready",
      cls: "bg-[#F0C040] text-[#1A1A1A] hover:bg-[#D4A800]",
    },
    packed: {
      label: "Picked Up",
      cls: "bg-success text-white hover:bg-[#1E8449]",
    },
    picked: { label: "Delivered", cls: "bg-[#888] text-white hover:bg-[#666]" },
  }[order.status];

  return (
    <div
      className={[
        "bg-white rounded-xl border transition-all",
        order.hasDispute
          ? "border-danger shadow-[0_0_0_2px_rgba(231,76,60,0.15)]"
          : "border-[#E0E0E0] hover:border-[#CCCCCC] hover:shadow-md",
      ].join(" ")}
    >
      {/* ── Card header ── */}
      <div className="flex items-start justify-between px-4 pt-3 pb-2 border-b border-[#F5F5F5]">
        <div className="flex items-center gap-2 min-w-0">
          <PlatformBadge channel={order.channel} />
          <span className="text-[12px] font-semibold text-text-primary truncate">
            {order.orderId}
          </span>
          <span className="text-[11px] text-text-muted">
            · {order.customerName}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {order.hasDispute && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-danger bg-[#FDECEA] px-2 py-[2px] rounded-full">
              <AlertTriangle size={9} /> Dispute
            </span>
          )}
          <span
            className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${pill.bg} ${pill.text}`}
          >
            {pill.label}
          </span>
          <span className="text-[10px] text-text-muted">{order.placedAt}</span>
        </div>
      </div>

      {/* ── Items ── */}
      <div className="px-4 py-2">
        <p className="text-[12px] text-text-secondary leading-relaxed">
          {order.items.map((i) => `${i.name} ×${i.qty}`).join(" · ")}
        </p>
      </div>

      {/* ── Stage bar + ETA + partner ── */}
      <div className="px-4 pb-2 flex items-center justify-between gap-3">
        <StageBar status={order.status} />
        <div className="flex items-center gap-3 flex-shrink-0">
          {order.partnerEta && (
            <div className="flex items-center gap-1 text-[10px] text-warning font-semibold">
              <Bike size={11} />
              Partner in {order.partnerEta}
            </div>
          )}
          {order.deliveryEta && order.status !== "delivered" && (
            <div className="flex items-center gap-1 text-[10px] text-text-muted">
              <Clock size={10} />
              {order.deliveryEta}
            </div>
          )}
          {order.rating && (
            <div className="flex items-center gap-1 text-[10px] font-semibold">
              <Star
                size={10}
                className={order.rating >= 4 ? "text-[#F0C040]" : "text-danger"}
                fill={order.rating >= 4 ? "#F0C040" : "#E74C3C"}
              />
              <span
                className={order.rating >= 4 ? "text-[#F9A825]" : "text-danger"}
              >
                {order.rating}.0
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Footer: profit + actions ── */}
      <div className="px-4 pb-3 flex items-center justify-between gap-2 border-t border-[#F5F5F5] pt-2">
        {/* Profit pill — hover shows breakdown */}
        <div className="relative">
          <button
            onMouseEnter={() => setShowProfit(true)}
            onMouseLeave={() => setShowProfit(false)}
            className={`flex items-center gap-1 text-[11px] font-bold px-2 py-[3px] rounded-full bg-[#F8F8F8] border border-[#E0E0E0] ${marginColor} cursor-default`}
          >
            <TrendingUp size={10} />₹{order.netProfit} profit · {margin}%
          </button>
          {showProfit && (
            <div className="absolute bottom-full left-0 mb-2 z-50">
              <ProfitCard order={order} />
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Dispute flag */}
          {(order.rating <= 2 || order.hasDispute) &&
            order.status === "delivered" && (
              <button
                onClick={() => onDispute(order)}
                className="flex items-center gap-1 text-[10px] font-semibold text-danger border border-danger rounded px-2 py-[4px] hover:bg-[#FDECEA] transition-colors"
              >
                <Flag size={10} /> Flag Dispute
              </button>
            )}
          {/* Cancel (only for new/accepted) */}
          {["new", "accepted"].includes(order.status) && (
            <button
              onClick={() => onAction(order.id, "cancelled")}
              className="text-[10px] font-semibold text-text-muted border border-[#E0E0E0] rounded px-2 py-[4px] hover:border-danger hover:text-danger transition-colors"
            >
              Reject
            </button>
          )}
          {/* Primary next action */}
          {nextAction && isActive && (
            <button
              onClick={() =>
                onAction(
                  order.id,
                  Object.keys({
                    new: "accepted",
                    accepted: "cooking",
                    cooking: "packed",
                    packed: "picked",
                    picked: "delivered",
                  }).find((k) => k === order.status)
                    ? {
                        new: "accepted",
                        accepted: "cooking",
                        cooking: "packed",
                        packed: "picked",
                        picked: "delivered",
                      }[order.status]
                    : "delivered",
                )
              }
              className={`text-[11px] font-semibold rounded px-3 py-[5px] transition-colors ${nextAction.cls}`}
            >
              {nextAction.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Platform stats bar ───
function PlatformStats({ orders }) {
  const channels = ["zomato", "swiggy", "ondc", "whatsapp"];
  return (
    <div className="grid grid-cols-4 gap-3 mb-4">
      {channels.map((ch) => {
        const cfg = PLATFORM_CONFIG[ch];
        const chOrders = orders.filter((o) => o.channel === ch);
        const active = chOrders.filter(
          (o) => !["delivered", "cancelled"].includes(o.status),
        ).length;
        const revenue = chOrders.reduce((s, o) => s + o.gross, 0);
        const profit = chOrders.reduce((s, o) => s + o.netProfit, 0);
        const margin = revenue > 0 ? Math.round((profit / revenue) * 100) : 0;
        return (
          <div
            key={ch}
            className={`rounded-xl border p-3 ${cfg.bg} border-[${cfg.color}]/20`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold ${cfg.text}`}>
                {cfg.label}
              </span>
              {active > 0 && (
                <span className="text-[10px] font-bold bg-white/70 rounded-full px-2 py-[1px] text-text-primary">
                  {active} active
                </span>
              )}
            </div>
            <p className="text-[18px] font-bold text-text-primary">
              ₹{revenue.toLocaleString("en-IN")}
            </p>
            <p className="text-[10px] text-text-muted mt-[2px]">
              {chOrders.length} orders ·{" "}
              <span
                className={
                  margin >= 45
                    ? "text-success font-semibold"
                    : "text-warning font-semibold"
                }
              >
                {margin}% margin
              </span>
            </p>
            {ch === "whatsapp" && (
              <p className="text-[9px] text-[#25D366] font-bold mt-1">
                0% commission ✅
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Busy mode banner ───
function BusyModeBanner({ active, onToggle }) {
  if (!active) return null;
  return (
    <div className="flex items-center gap-3 bg-[#FEF3E8] border border-warning rounded-xl px-4 py-3 mb-4">
      <Pause size={18} className="text-warning flex-shrink-0" />
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-warning">
          Busy Mode Active
        </p>
        <p className="text-[11px] text-text-muted">
          New orders paused on all platforms. Kitchen is catching up.
        </p>
      </div>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 text-xs font-semibold text-white bg-warning rounded-lg px-3 py-[6px] hover:bg-[#D4700F] transition-colors"
      >
        <Play size={12} /> Resume
      </button>
    </div>
  );
}

// ─── Dispute modal ───
function DisputeModal({ order, onClose }) {
  const [sent, setSent] = useState(false);
  if (!order) return null;
  const cfg = PLATFORM_CONFIG[order.channel];
  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[440px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <div>
            <p className="text-[15px] font-semibold text-text-primary">
              Flag Dispute
            </p>
            <p className="text-xs text-text-muted mt-[2px]">
              {order.orderId} · {cfg.label}
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
            <CheckCircle size={48} className="text-success mb-3" />
            <p className="text-[15px] font-bold text-text-primary mb-1">
              Dispute Raised!
            </p>
            <p className="text-xs text-text-muted text-center">
              {cfg.label} support has been notified. Expected resolution: 3-5
              business days.
            </p>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 space-y-3">
              <div className="bg-surface rounded-lg p-3">
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Order Value</span>
                  <span className="font-semibold text-text-primary">
                    ₹{order.gross}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Expected Payout</span>
                  <span className="font-semibold text-text-primary">
                    ₹{order.gross - order.commission}
                  </span>
                </div>
                {order.rating && (
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Customer Rating</span>
                    <span className="font-semibold text-danger">
                      ⭐ {order.rating}.0 — Low rating
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="form-label">Reason for dispute</label>
                <select className="dropdown-select w-full">
                  <option>Wrong payout amount</option>
                  <option>Order not delivered but marked delivered</option>
                  <option>Unfair cancellation deduction</option>
                  <option>Missing order in payout</option>
                  <option>Low rating — food was correct</option>
                </select>
              </div>
              <div>
                <label className="form-label">
                  Additional notes (optional)
                </label>
                <textarea
                  className="form-input resize-none"
                  rows={3}
                  placeholder="Describe the issue..."
                />
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
                <Flag size={13} /> Raise Dispute with {cfg.label}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main DeliveryOrders ───
export default function DeliveryOrders() {
  const [orders, setOrders] = useState(DELIVERY_ORDERS);
  const [busyMode, setBusyMode] = useState(false);
  const [filterChannel, setFilterChannel] = useState("all");
  const [filterStatus, setFilterStatus] = useState("active");
  const [disputeOrder, setDisputeOrder] = useState(null);

  // ── Advance order stage ──
  const handleAction = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    );
  };

  // ── Filtered orders ──
  const filtered = orders.filter((o) => {
    const channelMatch = filterChannel === "all" || o.channel === filterChannel;
    const statusMatch =
      filterStatus === "all"
        ? true
        : filterStatus === "active"
          ? !["delivered", "cancelled"].includes(o.status)
          : o.status === filterStatus;
    return channelMatch && statusMatch;
  });

  // ── Summary stats ──
  const activeCount = orders.filter(
    (o) => !["delivered", "cancelled"].includes(o.status),
  ).length;
  const totalRevenue = orders.reduce((s, o) => s + o.gross, 0);
  const totalProfit = orders.reduce((s, o) => s + o.netProfit, 0);
  const avgMargin =
    totalRevenue > 0 ? Math.round((totalProfit / totalRevenue) * 100) : 0;
  const disputeCount = orders.filter((o) => o.hasDispute).length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Top summary bar ── */}
      <div className="flex items-center gap-4 mb-3 bg-white px-4 py-3 rounded-xl border border-[#EEEEEE] flex-shrink-0">
        {/* Stats */}
        <div className="flex items-center gap-6 flex-1">
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              Active Orders
            </p>
            <p className="text-[20px] font-bold text-text-primary leading-tight">
              {activeCount}
            </p>
          </div>
          <div className="w-px h-8 bg-[#EEEEEE]" />
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              Today Revenue
            </p>
            <p className="text-[20px] font-bold text-text-primary leading-tight">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>
          <div className="w-px h-8 bg-[#EEEEEE]" />
          <div>
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              Avg Margin
            </p>
            <p
              className={`text-[20px] font-bold leading-tight ${avgMargin >= 45 ? "text-success" : "text-warning"}`}
            >
              {avgMargin}%
            </p>
          </div>
          {disputeCount > 0 && (
            <>
              <div className="w-px h-8 bg-[#EEEEEE]" />
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
                  Disputes
                </p>
                <p className="text-[20px] font-bold text-danger leading-tight">
                  {disputeCount}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Busy mode toggle */}
        <button
          onClick={() => setBusyMode(!busyMode)}
          className={[
            "flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all",
            busyMode
              ? "bg-warning text-white border-warning"
              : "bg-white text-text-secondary border-[#E0E0E0] hover:border-warning hover:text-warning",
          ].join(" ")}
        >
          {busyMode ? <Play size={13} /> : <Pause size={13} />}
          {busyMode ? "Resume All" : "Busy Mode"}
        </button>

        <button
          onClick={() => setOrders([...DELIVERY_ORDERS])}
          className="btn-ghost py-[7px] px-3"
          title="Refresh"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* ── Busy mode banner ── */}
      <BusyModeBanner active={busyMode} onToggle={() => setBusyMode(false)} />

      {/* ── Platform stats ── */}
      <PlatformStats orders={orders} />

      {/* ── Filters ── */}
      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
        {/* Channel filter */}
        <div className="flex gap-[5px]">
          {["all", "zomato", "swiggy", "ondc", "whatsapp"].map((ch) => {
            const cfg = ch === "all" ? null : PLATFORM_CONFIG[ch];
            return (
              <button
                key={ch}
                onClick={() => setFilterChannel(ch)}
                className={[
                  "text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all",
                  filterChannel === ch
                    ? ch === "all"
                      ? "bg-primary text-white border-primary"
                      : `${cfg.bg} ${cfg.text} border-[${cfg.color}]`
                    : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCCCCC]",
                ].join(" ")}
              >
                {ch === "all" ? "All Channels" : PLATFORM_CONFIG[ch].label}
              </button>
            );
          })}
        </div>

        <div className="w-px h-5 bg-[#E0E0E0]" />

        {/* Status filter */}
        <div className="flex gap-[5px]">
          {[
            { id: "active", label: "Active" },
            { id: "cooking", label: "Cooking" },
            { id: "packed", label: "Packed" },
            { id: "delivered", label: "Delivered" },
            { id: "all", label: "All" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterStatus(s.id)}
              className={[
                "text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all",
                filterStatus === s.id
                  ? "bg-[#1A1A1A] text-white border-[#1A1A1A]"
                  : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCCCCC]",
              ].join(" ")}
            >
              {s.label}
            </button>
          ))}
        </div>

        <span className="ml-auto text-xs text-text-muted">
          {filtered.length} orders
        </span>
      </div>

      {/* ── Order grid ── */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <CheckCircle size={40} className="text-success opacity-40 mb-3" />
            <p className="text-[15px] font-semibold text-text-primary mb-1">
              All clear!
            </p>
            <p className="text-xs text-text-muted">
              No orders matching this filter
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-4">
            {filtered.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onAction={handleAction}
                onDispute={setDisputeOrder}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Dispute modal ── */}
      {disputeOrder && (
        <DisputeModal
          order={disputeOrder}
          onClose={() => setDisputeOrder(null)}
        />
      )}
    </div>
  );
}
