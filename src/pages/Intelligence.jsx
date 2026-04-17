import { useState } from "react";
import {
  Bot,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { AI_BRIEFING } from "../data/mockData";

// ─── Forecast data ───
const FORECAST = [
  { day: "Fri 18", butterChicken: 62, biryani: 48, dal: 38, event: "Weekend" },
  { day: "Sat 19", butterChicken: 85, biryani: 72, dal: 52, event: "Weekend" },
  { day: "Sun 20", butterChicken: 78, biryani: 68, dal: 48, event: null },
  { day: "Mon 21", butterChicken: 45, biryani: 35, dal: 28, event: null },
  { day: "Tue 22", butterChicken: 48, biryani: 38, dal: 30, event: null },
  { day: "Wed 23", butterChicken: 52, biryani: 42, dal: 34, event: null },
  { day: "Thu 24", butterChicken: 65, biryani: 55, dal: 40, event: null },
];
const MAX_FORECAST = 90;

// ─── Menu matrix ───
const MENU_MATRIX = [
  { name: "Butter Chicken", category: "star" },
  { name: "Dal Makhani", category: "star" },
  { name: "Garlic Naan", category: "star" },
  { name: "Chicken Biryani", category: "plowhorse" },
  { name: "Mutton Biryani", category: "plowhorse" },
  { name: "Paneer Tikka", category: "puzzle" },
  { name: "Mushroom 65", category: "puzzle" },
  { name: "Veg Spring Roll", category: "dog" },
  { name: "Ice Cream", category: "dog" },
];

const ME_CFG = {
  star: {
    label: "⭐ Star",
    bg: "bg-[#E8F8F0]",
    border: "border-success",
    text: "text-success",
    action: "Feature prominently. Never discount.",
  },
  plowhorse: {
    label: "🐄 Plowhorse",
    bg: "bg-[#EBF5FB]",
    border: "border-info",
    text: "text-info",
    action: "Raise price 5-8%. Reduce portion slightly.",
  },
  puzzle: {
    label: "🧩 Puzzle",
    bg: "bg-[#FEF3E8]",
    border: "border-warning",
    text: "text-warning",
    action: "Improve placement. Add photo. Promote.",
  },
  dog: {
    label: "🐕 Dog",
    bg: "bg-[#FDECEA]",
    border: "border-danger",
    text: "text-danger",
    action: "Consider removing or reworking.",
  },
};

// ─── Waste predictions ───
const WASTE_PREDICTIONS = [
  {
    item: "Paneer",
    risk: "high",
    detail:
      "Bought 5kg Mon. Consumption 30% below forecast. Risk: 1.8kg waste by Sat.",
    action: "Push Paneer dishes today",
  },
  {
    item: "Chicken",
    risk: "medium",
    detail:
      "Weekend demand forecast +40%. Current stock may run short by Sun evening.",
    action: "Order 3kg more today",
  },
  {
    item: "Cream",
    risk: "low",
    detail: "Usage on track. No action needed.",
    action: null,
  },
];

// ─── Fraud alerts ───
const FRAUD_ALERTS = [
  {
    type: "kot_cancel",
    staff: "Ravi Shankar",
    detail: "8 KOT cancellations today (avg: 1.2). Unusual pattern detected.",
    severity: "high",
  },
  {
    type: "discount",
    staff: "Priya Devi",
    detail: "Applied 'Manager Discount' 4 times in 2 hours on same item.",
    severity: "medium",
  },
  {
    type: "cash_gap",
    staff: "Counter",
    detail: "Expected cash ₹12,400. Reported ₹11,800. Gap: ₹600.",
    severity: "high",
  },
];

// ─── Section 1: Morning Briefing ───
function MorningBriefing({ b }) {
  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F5F5]">
        <p className="text-[14px] font-semibold text-text-primary">
          Today's Morning Briefing
        </p>
        <span className="text-[11px] text-text-muted">
          Sent at 8:00 AM · {b.date}
        </span>
      </div>
      <div className="p-5 grid grid-cols-2 gap-5">
        {/* WhatsApp preview */}
        <div>
          <div className="whatsapp-header">
            <div className="w-8 h-8 rounded-full bg-[#128C7E] flex items-center justify-center font-bold text-white">
              T
            </div>
            <div>
              <p className="text-[13px] font-semibold">Thali Intelligence</p>
              <p className="text-[10px] opacity-80">Online</p>
            </div>
          </div>
          <div className="whatsapp-body">
            <div className="whatsapp-bubble">
              <strong>Good morning, {b.ownerName}! ☀️</strong>
              <br />
              <span className="text-[11px] text-[#666]">{b.date}</span>
              <br />
              <br />
              <strong>Yesterday's snapshot:</strong>
              <br />• Revenue: ₹{b.revenue.toLocaleString("en-IN")} (↑
              {b.revenueChange}% vs {b.revenueVs})<br />• Orders: {b.orders}{" "}
              (Dine-in: {b.dineIn} | Swiggy: {b.swiggy} | Zomato: {b.zomato})
              <br />• Top dish: {b.topDish} ({b.topDishOrders} orders)
              <br />• Food cost: {b.foodCost}% ✅<br />
              <br />
              <strong>Today's actions:</strong>
              <br />
              {b.alerts.map((a, i) => (
                <div key={i}>
                  {a.icon} {a.text}
                </div>
              ))}
              <div className="text-[10px] text-[#888] mt-2 text-right">
                Reply REPORT for full breakdown
              </div>
            </div>
          </div>
        </div>

        {/* Action items */}
        <div>
          <p className="text-[13px] font-semibold text-text-primary mb-3">
            Action Items
          </p>
          <div className="space-y-2">
            {b.alerts.map((alert, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 px-3 py-[10px] rounded-lg ${
                  alert.type === "urgent"
                    ? "bg-[#FDECEA]"
                    : alert.type === "warning"
                      ? "bg-[#FEF3E8]"
                      : alert.type === "tip"
                        ? "bg-[#EBF5FB]"
                        : "bg-surface"
                }`}
              >
                <span className="text-lg flex-shrink-0">{alert.icon}</span>
                <p className="text-[12px] text-text-primary leading-relaxed">
                  {alert.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 2: Demand Forecast ───
function DemandForecast() {
  const SERIES = [
    { key: "butterChicken", label: "Butter Chicken", color: "bg-primary" },
    { key: "biryani", label: "Chicken Biryani", color: "bg-info" },
    { key: "dal", label: "Dal Makhani", color: "bg-success" },
  ];

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[14px] font-semibold text-text-primary">
          7-Day Demand Forecast
        </p>
        <span className="status-pill blue text-[10px]">AI Powered</span>
      </div>
      <p className="text-[11px] text-text-muted mb-4">
        Based on 90 days of order history + weather + local events
      </p>

      {/* Legend */}
      <div className="flex gap-4 mb-4">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-2">
            <div className={`w-3 h-[3px] rounded ${s.color}`} />
            <span className="text-[11px] text-text-muted">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="flex items-end gap-2 h-[120px] mb-3">
        {FORECAST.map((d) => (
          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
            <div className="flex gap-[2px] items-end h-[90px]">
              {SERIES.map((s) => (
                <div
                  key={s.key}
                  className={`w-[8px] rounded-t ${s.color} opacity-85`}
                  style={{ height: `${(d[s.key] / MAX_FORECAST) * 90}px` }}
                />
              ))}
            </div>
            <div className="text-center">
              <p className="text-[9px] text-text-muted">{d.day}</p>
              {d.event && (
                <p className="text-[8px] font-bold text-primary">{d.event}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* AI insight */}
      <div className="bg-[#FFF5F5] rounded-lg px-3 py-2 flex items-start gap-2">
        <span className="text-base flex-shrink-0">💡</span>
        <p className="text-[12px] text-primary font-medium">
          <strong>AI Insight:</strong> Saturday shows 40% higher demand. Prep
          25% more Butter Chicken and Biryani. Current stock covers only a
          normal day.
        </p>
      </div>
    </div>
  );
}

// ─── Section 3: Menu Engineering ───
function MenuEngineering() {
  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[14px] font-semibold text-text-primary">
          Menu Engineering Matrix
        </p>
        <span className="text-[11px] text-text-muted">
          Monthly analysis · Auto-generated
        </span>
      </div>
      <p className="text-[11px] text-text-muted mb-4">
        Every item classified by sales volume × gross margin
      </p>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(ME_CFG).map(([key, cfg]) => {
          const items = MENU_MATRIX.filter((m) => m.category === key);
          return (
            <div
              key={key}
              className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}
            >
              <p className={`text-[14px] font-bold ${cfg.text} mb-1`}>
                {cfg.label}
              </p>
              <p className="text-[10px] text-text-muted italic mb-3">
                {cfg.action}
              </p>
              <div className="space-y-1">
                {items.map((item) => (
                  <p
                    key={item.name}
                    className="text-[12px] font-medium text-text-primary border-b border-black/5 pb-1"
                  >
                    {item.name}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section 4: Waste Prediction ───
function WastePrediction() {
  const RISK_CFG = {
    high: {
      bg: "bg-[#FDECEA]",
      text: "text-danger",
      border: "border-danger/30",
      label: "🔴 High Risk",
    },
    medium: {
      bg: "bg-[#FEF3E8]",
      text: "text-warning",
      border: "border-warning/30",
      label: "⚠️ Medium Risk",
    },
    low: {
      bg: "bg-[#E8F8F0]",
      text: "text-success",
      border: "border-success/30",
      label: "✅ On Track",
    },
  };

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[14px] font-semibold text-text-primary">
          Waste Prediction
        </p>
        <span className="status-pill blue text-[10px]">AI Powered</span>
      </div>
      <p className="text-[11px] text-text-muted mb-4">
        Pre-waste alerts — act before food is wasted, not after
      </p>
      <div className="space-y-3">
        {WASTE_PREDICTIONS.map((w) => {
          const cfg = RISK_CFG[w.risk];
          return (
            <div
              key={w.item}
              className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[13px] font-semibold text-text-primary">
                      {w.item}
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-[2px] rounded-full bg-white/60 ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    {w.detail}
                  </p>
                </div>
                {w.action && (
                  <button className="btn-primary text-xs py-[5px] px-3 flex-shrink-0">
                    {w.action} <ChevronRight size={11} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Section 5: Fraud Detection ───
function FraudDetection() {
  const SEV_CFG = {
    high: {
      bg: "bg-[#FDECEA]",
      text: "text-danger",
      border: "border-danger/30",
      label: "🔴 High",
    },
    medium: {
      bg: "bg-[#FEF3E8]",
      text: "text-warning",
      border: "border-warning/30",
      label: "⚠️ Medium",
    },
  };

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <Shield size={16} className="text-danger" />
          <p className="text-[14px] font-semibold text-text-primary">
            Fraud Detection
          </p>
        </div>
        <span className="text-[10px] font-bold bg-[#FDECEA] text-danger px-2 py-[2px] rounded-full">
          {FRAUD_ALERTS.length} alerts
        </span>
      </div>
      <p className="text-[11px] text-text-muted mb-4">
        AI monitors KOT cancellations, discounts, and cash patterns for
        anomalies
      </p>
      <div className="space-y-3">
        {FRAUD_ALERTS.map((alert, i) => {
          const cfg = SEV_CFG[alert.severity];
          return (
            <div
              key={i}
              className={`rounded-xl border p-4 ${cfg.bg} ${cfg.border}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[13px] font-semibold text-text-primary">
                      {alert.staff}
                    </p>
                    <span
                      className={`text-[10px] font-semibold px-2 py-[2px] rounded-full bg-white/60 ${cfg.text}`}
                    >
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    {alert.detail}
                  </p>
                </div>
                <button className="btn-ghost text-xs py-[4px] px-3 flex-shrink-0">
                  Investigate
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main Intelligence page ───
const SECTIONS = [
  { id: "briefing", label: "Morning Briefing", icon: Bot },
  { id: "forecast", label: "Demand Forecast", icon: TrendingUp },
  { id: "menu", label: "Menu Engineering", icon: Zap },
  { id: "waste", label: "Waste Prediction", icon: AlertTriangle },
  { id: "fraud", label: "Fraud Detection", icon: Shield },
];

export default function Intelligence() {
  const [active, setActive] = useState("briefing");
  const b = AI_BRIEFING;

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
            <Bot size={22} color="white" />
          </div>
          <div>
            <h1 className="text-[20px] font-semibold text-text-primary">
              Thali Intelligence
            </h1>
            <p className="text-[13px] text-text-muted mt-[1px]">
              AI-powered insights for your restaurant
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="status-pill green">AI Active</span>
          <button className="btn-ghost text-xs py-[5px] px-3">
            <RefreshCw size={12} /> Refresh
          </button>
        </div>
      </div>

      {/* Section tabs */}
      <div className="flex gap-[5px] mb-4 flex-shrink-0 flex-wrap">
        {SECTIONS.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={[
                "flex items-center gap-[6px] px-3 py-[6px] rounded-lg text-xs font-semibold border transition-all",
                active === s.id
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-text-secondary border-[#E0E0E0] hover:bg-surface",
              ].join(" ")}
            >
              <Icon size={13} />
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {active === "briefing" && <MorningBriefing b={b} />}
        {active === "forecast" && <DemandForecast />}
        {active === "menu" && <MenuEngineering />}
        {active === "waste" && <WastePrediction />}
        {active === "fraud" && <FraudDetection />}
      </div>
    </div>
  );
}
