import { useState } from "react";
import {
  Store,
  Pause,
  Play,
  RefreshCw,
  TrendingUp,
  Bike,
  Package,
} from "lucide-react";
import { CLOUD_KITCHEN_BRANDS } from "../data/mockData";

// ─── Live orders ───
const LIVE_ORDERS = [
  {
    id: "CK-041",
    brand: "Biryani Brothers",
    platform: "Zomato",
    items: "Chicken Biryani ×2, Raita ×2",
    stage: "cooking",
    eta: "12 mins",
    partnerEta: "8 mins",
  },
  {
    id: "CK-040",
    brand: "Wrap & Roll",
    platform: "Swiggy",
    items: "Paneer Wrap ×1, Cold Coffee ×1",
    stage: "packed",
    eta: "5 mins",
    partnerEta: "3 mins",
  },
  {
    id: "CK-039",
    brand: "South Spice",
    platform: "ONDC",
    items: "Masala Dosa ×2, Vada ×2",
    stage: "received",
    eta: "25 mins",
    partnerEta: null,
  },
  {
    id: "CK-038",
    brand: "Dessert Box",
    platform: "Zomato",
    items: "Gulab Jamun ×4",
    stage: "picked",
    eta: "Picked",
    partnerEta: null,
  },
  {
    id: "CK-037",
    brand: "Biryani Brothers",
    platform: "Swiggy",
    items: "Mutton Biryani ×1, Salan ×1",
    stage: "prep",
    eta: "18 mins",
    partnerEta: null,
  },
  {
    id: "CK-036",
    brand: "South Spice",
    platform: "ONDC",
    items: "Filter Coffee ×3",
    stage: "cooking",
    eta: "8 mins",
    partnerEta: "5 mins",
  },
];

const STAGES = ["received", "prep", "cooking", "packed", "picked"];
const STAGE_LABELS = {
  received: "Received",
  prep: "Prep",
  cooking: "Cooking",
  packed: "Packed",
  picked: "Picked Up",
};

const PLATFORM_CFG = {
  Zomato: { color: "#E23744", bg: "bg-[#FDE8EA]", text: "text-[#E23744]" },
  Swiggy: { color: "#FC8019", bg: "bg-[#FEF0E6]", text: "text-[#FC8019]" },
  ONDC: { color: "#27AE60", bg: "bg-[#E8F8F0]", text: "text-success" },
};

const BRAND_COLORS = {
  "Biryani Brothers": "bg-[#FDE8EA] text-[#E23744]",
  "Wrap & Roll": "bg-[#FEF0E6] text-[#FC8019]",
  "South Spice": "bg-[#E8F8F0] text-success",
  "Dessert Box": "bg-[#F3E5F5] text-[#9B59B6]",
};

// ─── Stage progress bar ───
function StageBar({ stage }) {
  const currentIdx = STAGES.indexOf(stage);
  return (
    <div className="flex items-center gap-[3px]">
      {STAGES.map((s, i) => {
        const done = i <= currentIdx;
        const current = i === currentIdx;
        return (
          <div key={s} className="flex items-center gap-[3px]">
            <div
              title={STAGE_LABELS[s]}
              className={`w-[7px] h-[7px] rounded-full transition-all ${done ? (current ? "bg-primary scale-125" : "bg-success") : "bg-[#E0E0E0]"}`}
            />
            {i < STAGES.length - 1 && (
              <div
                className={`w-[12px] h-[1.5px] ${i < currentIdx ? "bg-success" : "bg-[#E0E0E0]"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Brand card ───
function BrandCard({ brand, busyMode, onToggleBusy }) {
  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[14px] font-bold text-text-primary">
            {brand.name}
          </p>
          <p className="text-[10px] text-text-muted mt-[1px]">
            {brand.platform}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${busyMode ? "bg-[#FEF3E8] text-warning" : "bg-[#E8F8F0] text-success"}`}
          >
            {busyMode ? "⏸ Busy" : "🟢 Online"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="bg-surface rounded-lg p-2 text-center">
          <p className="text-[16px] font-bold text-primary">{brand.orders}</p>
          <p className="text-[9px] text-text-muted">Orders</p>
        </div>
        <div className="bg-surface rounded-lg p-2 text-center">
          <p
            className={`text-[16px] font-bold ${brand.margin > 60 ? "text-success" : "text-warning"}`}
          >
            {brand.margin}%
          </p>
          <p className="text-[9px] text-text-muted">Margin</p>
        </div>
      </div>

      <div className="bg-[#FFF5F5] rounded-lg px-3 py-2 mb-3">
        <p className="text-[10px] text-text-muted">Net Revenue (March)</p>
        <p className="text-[15px] font-bold text-primary">
          ₹{(brand.netRevenue / 1000).toFixed(0)}k
        </p>
      </div>

      <button
        onClick={() => onToggleBusy(brand.id)}
        className={`w-full flex items-center justify-center gap-2 text-xs font-semibold py-[7px] rounded-lg border transition-all ${busyMode ? "bg-[#E8F8F0] text-success border-success hover:bg-[#D4F0E4]" : "bg-white text-warning border-warning hover:bg-[#FEF3E8]"}`}
      >
        {busyMode ? (
          <>
            <Play size={12} /> Resume Orders
          </>
        ) : (
          <>
            <Pause size={12} /> Pause Orders
          </>
        )}
      </button>
    </div>
  );
}

// ─── Live order queue ───
function LiveOrderQueue() {
  const [orders, setOrders] = useState(LIVE_ORDERS);

  const advance = (id) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const idx = STAGES.indexOf(o.stage);
        return idx < STAGES.length - 1 ? { ...o, stage: STAGES[idx + 1] } : o;
      }),
    );
  };

  const active = orders.filter((o) => o.stage !== "picked").length;

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <p className="text-[13px] font-semibold text-text-primary">
          {active} active orders across all brands
        </p>
        <span className="text-[10px] font-bold bg-warning text-white px-2 py-[2px] rounded-full">
          {active} active
        </span>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        {orders.map((order, i) => {
          const platCfg = PLATFORM_CFG[order.platform] || PLATFORM_CFG.ONDC;
          const brandColor =
            BRAND_COLORS[order.brand] || "bg-surface text-text-muted";
          const isDone = order.stage === "picked";
          return (
            <div
              key={order.id}
              className={`flex items-center gap-4 px-5 py-3 border-b border-[#F5F5F5] last:border-b-0 ${isDone ? "opacity-50" : ""}`}
            >
              {/* Brand + platform */}
              <div className="min-w-[160px]">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-[2px] rounded-full ${brandColor}`}
                  >
                    {order.brand}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-semibold px-2 py-[1px] rounded-full ${platCfg.bg} ${platCfg.text}`}
                >
                  {order.platform}
                </span>
              </div>

              {/* Items */}
              <p className="flex-1 text-[12px] text-text-secondary truncate">
                {order.items}
              </p>

              {/* Stage bar */}
              <StageBar stage={order.stage} />

              {/* Stage label */}
              <span
                className={`text-[10px] font-semibold px-2 py-[3px] rounded-full min-w-[72px] text-center ${
                  order.stage === "picked"
                    ? "bg-[#F5F5F5] text-[#888]"
                    : order.stage === "packed"
                      ? "bg-[#E8F8F0] text-success"
                      : "bg-[#FEF3E8] text-warning"
                }`}
              >
                {STAGE_LABELS[order.stage]}
              </span>

              {/* ETA + partner */}
              <div className="text-right min-w-[80px]">
                <p className="text-[11px] text-text-muted">{order.eta}</p>
                {order.partnerEta && (
                  <p className="text-[10px] text-warning font-semibold flex items-center gap-1 justify-end">
                    <Bike size={9} /> {order.partnerEta}
                  </p>
                )}
              </div>

              {/* Advance button */}
              {!isDone && (
                <button
                  onClick={() => advance(order.id)}
                  className="btn-primary text-[10px] py-[4px] px-3 flex-shrink-0"
                >
                  Next →
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Brand P&L table ───
function BrandPL() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <div className="px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Brand Performance — March 2026
          </p>
          <p className="text-[11px] text-text-muted mt-[1px]">
            True profit per brand after food cost + commission + packaging
          </p>
        </div>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Orders</th>
              <th>Gross Revenue</th>
              <th>Commission</th>
              <th>Food Cost %</th>
              <th>Net Revenue</th>
              <th>Margin</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {CLOUD_KITCHEN_BRANDS.map((brand) => (
              <tr key={brand.id} className="hover:bg-[#FAFAFA]">
                <td>
                  <span
                    className={`text-[11px] font-bold px-2 py-[3px] rounded-full ${BRAND_COLORS[brand.name] || "bg-surface text-text-muted"}`}
                  >
                    {brand.name}
                  </span>
                </td>
                <td className="font-semibold">{brand.orders}</td>
                <td className="font-semibold">
                  ₹{(brand.revenue / 1000).toFixed(1)}k
                </td>
                <td className="text-danger font-semibold">
                  -₹{(brand.commission / 1000).toFixed(1)}k
                </td>
                <td>
                  <span
                    className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${brand.foodCost < 30 ? "bg-[#E8F8F0] text-success" : brand.foodCost < 35 ? "bg-[#FEF3E8] text-warning" : "bg-[#FDECEA] text-danger"}`}
                  >
                    {brand.foodCost}%
                  </span>
                </td>
                <td className="font-bold text-primary">
                  ₹{(brand.netRevenue / 1000).toFixed(1)}k
                </td>
                <td>
                  <span
                    className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${brand.margin > 65 ? "bg-[#E8F8F0] text-success" : brand.margin > 55 ? "bg-[#FEF3E8] text-warning" : "bg-[#FDECEA] text-danger"}`}
                  >
                    {brand.margin}%
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-1">
                    <span className="text-[#F9A825]">⭐</span>
                    <span className="text-[12px] font-semibold">
                      {brand.rating}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          {/* Totals row */}
          <tfoot>
            <tr className="border-t-2 border-[#E0E0E0] bg-[#FAFAFA]">
              <td className="font-bold text-text-primary">Total</td>
              <td className="font-bold">
                {CLOUD_KITCHEN_BRANDS.reduce((s, b) => s + b.orders, 0)}
              </td>
              <td className="font-bold">
                ₹
                {(
                  CLOUD_KITCHEN_BRANDS.reduce((s, b) => s + b.revenue, 0) / 1000
                ).toFixed(0)}
                k
              </td>
              <td className="font-bold text-danger">
                -₹
                {(
                  CLOUD_KITCHEN_BRANDS.reduce((s, b) => s + b.commission, 0) /
                  1000
                ).toFixed(0)}
                k
              </td>
              <td />
              <td className="font-bold text-primary text-[15px]">
                ₹
                {(
                  CLOUD_KITCHEN_BRANDS.reduce((s, b) => s + b.netRevenue, 0) /
                  1000
                ).toFixed(0)}
                k
              </td>
              <td />
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

// ─── Main CloudKitchen page ───
const TABS = [
  { id: "brands", label: "Brand Overview" },
  { id: "queue", label: "Live Order Queue" },
  { id: "pl", label: "Brand P&L" },
];

export default function CloudKitchen() {
  const [activeTab, setActiveTab] = useState("brands");
  const [busyBrands, setBusyBrands] = useState({});

  const toggleBusy = (id) =>
    setBusyBrands((prev) => ({ ...prev, [id]: !prev[id] }));

  const totalRevenue = CLOUD_KITCHEN_BRANDS.reduce(
    (s, b) => s + b.netRevenue,
    0,
  );
  const totalOrders = CLOUD_KITCHEN_BRANDS.reduce((s, b) => s + b.orders, 0);

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Store size={22} color="white" />
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-text-primary">
              Cloud Kitchen Mode
            </h1>
            <p className="text-[13px] text-text-muted mt-[1px]">
              {CLOUD_KITCHEN_BRANDS.length} brands · All platforms unified
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-pill green">All Brands Online</span>
          <button className="btn-ghost text-xs py-[5px] px-3">
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {/* Chain stats */}
      <div className="grid grid-cols-4 gap-3 mb-4 flex-shrink-0">
        {[
          {
            label: "Total Net Revenue",
            value: `₹${(totalRevenue / 1000).toFixed(0)}k`,
            color: "text-primary",
          },
          {
            label: "Total Orders",
            value: totalOrders,
            color: "text-text-primary",
          },
          {
            label: "Active Brands",
            value: CLOUD_KITCHEN_BRANDS.length,
            color: "text-success",
          },
          {
            label: "Live Orders",
            value: LIVE_ORDERS.filter((o) => o.stage !== "picked").length,
            color: "text-warning",
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

      {/* Tabs */}
      <div className="flex gap-[5px] mb-4 flex-shrink-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-[7px] rounded-lg text-xs font-semibold border transition-all ${activeTab === t.id ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-[#E0E0E0] hover:bg-surface"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "brands" && (
          <div className="overflow-y-auto h-full">
            <div className="grid grid-cols-4 gap-3">
              {CLOUD_KITCHEN_BRANDS.map((brand) => (
                <BrandCard
                  key={brand.id}
                  brand={brand}
                  busyMode={!!busyBrands[brand.id]}
                  onToggleBusy={toggleBusy}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === "queue" && <LiveOrderQueue />}
        {activeTab === "pl" && <BrandPL />}
      </div>
    </div>
  );
}
