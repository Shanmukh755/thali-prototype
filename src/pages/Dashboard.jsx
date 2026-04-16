import {
  TrendingUp,
  TrendingDown,
  ShoppingBag,
  Percent,
  Table2,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Bot,
  Target,
  CreditCard,
  Users,
  Star,
  Clock,
  Zap,
  RefreshCw,
  ChevronRight,
} from "lucide-react";
import {
  DASHBOARD_STATS,
  TABLES,
  AI_BRIEFING,
  INVENTORY,
} from "../data/mockData";
import { useNavigate } from "react-router-dom";

// ─── Stat Card ───
function StatCard({
  label,
  value,
  change,
  changeLabel,
  icon: Icon,
  iconColor,
  prefix = "",
  suffix = "",
  alert,
}) {
  const isUp = change > 0;
  return (
    <div className="stat-card fade-in">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div className="stat-label">{label}</div>
          <div className="stat-value" style={{ marginTop: "6px" }}>
            {prefix}
            {typeof value === "number" ? value.toLocaleString("en-IN") : value}
            {suffix}
          </div>
          {change !== undefined && (
            <div
              className={`stat-change ${isUp ? "up" : "down"}`}
              style={{ marginTop: "6px" }}
            >
              {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(change)}% {changeLabel || "vs last week"}
            </div>
          )}
          {alert && (
            <div
              style={{
                fontSize: "11px",
                color: "#27AE60",
                fontWeight: 600,
                marginTop: "4px",
              }}
            >
              ✅ Target: {alert}
            </div>
          )}
        </div>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "10px",
            background: iconColor + "18",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon size={22} color={iconColor} />
        </div>
      </div>
    </div>
  );
}

// ─── Mini Table Map ───
function MiniTableMap() {
  const navigate = useNavigate();
  const statusColors = {
    blank: "#F5F5F5",
    running: "#AED6F1",
    printed: "#A9DFBF",
    paid: "#F9E79F",
    kot: "#F5CBA7",
  };
  const statusBorders = {
    blank: "#CCCCCC",
    running: "#5DADE2",
    printed: "#27AE60",
    paid: "#F0C040",
    kot: "#E67E22",
  };

  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-header">
        <div>
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Live Table Map
          </div>
          <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
            12 occupied · 18 available
          </div>
        </div>
        <button
          className="btn-outline"
          style={{ fontSize: "11px", padding: "4px 10px" }}
          onClick={() => navigate("/pos")}
        >
          Open POS
        </button>
      </div>
      <div className="card-body" style={{ padding: "16px" }}>
        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "12px",
          }}
        >
          {[
            { label: "Blank", color: "#AAAAAA" },
            { label: "Running", color: "#5DADE2" },
            { label: "Printed", color: "#27AE60" },
            { label: "Paid", color: "#F0C040" },
            { label: "KOT", color: "#E67E22" },
          ].map((l) => (
            <div
              key={l.label}
              style={{ display: "flex", alignItems: "center", gap: "5px" }}
            >
              <div className="legend-dot" style={{ background: l.color }} />
              <span style={{ fontSize: "11px", color: "#666" }}>{l.label}</span>
            </div>
          ))}
        </div>
        {/* Table grid */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {TABLES.map((table) => (
            <div
              key={table.id}
              onClick={() => navigate("/pos")}
              style={{
                width: "52px",
                height: "44px",
                borderRadius: "6px",
                background: statusColors[table.status],
                border: `1px ${table.status === "blank" ? "dashed" : "solid"} ${statusBorders[table.status]}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "10px",
                fontWeight: 500,
                color: "#333",
                cursor: "pointer",
                transition: "transform 0.1s",
              }}
              title={table.name}
            >
              {table.id}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WhatsApp Briefing Widget ───
function WhatsAppWidget() {
  const b = AI_BRIEFING;
  return (
    <div className="card" style={{ height: "100%" }}>
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "#25D366",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: "14px" }}>W</span>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>
              Thali Intelligence
            </div>
            <div style={{ fontSize: "11px", color: "#888" }}>
              8:00 AM Daily Briefing
            </div>
          </div>
        </div>
        <span className="status-pill green">Live</span>
      </div>
      <div className="card-body" style={{ padding: "0" }}>
        <div className="whatsapp-header">
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "#128C7E",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "14px",
              fontWeight: 700,
            }}
          >
            T
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600 }}>
              Thali Intelligence
            </div>
            <div style={{ fontSize: "10px", opacity: 0.8 }}>Online</div>
          </div>
        </div>
        <div className="whatsapp-body">
          <div className="whatsapp-bubble">
            <div style={{ marginBottom: "8px" }}>
              <strong>Good morning, {b.ownerName}! ☀️</strong>
              <br />
              <span style={{ fontSize: "11px", color: "#666" }}>{b.date}</span>
            </div>
            <div
              style={{
                marginBottom: "8px",
                paddingBottom: "8px",
                borderBottom: "1px solid #C8E6C9",
              }}
            >
              <strong>Yesterday's snapshot:</strong>
              <br />• Revenue: ₹{b.revenue.toLocaleString("en-IN")} (↑
              {b.revenueChange}% vs {b.revenueVs})<br />• Orders: {b.orders}{" "}
              (Dine-in: {b.dineIn} | Swiggy: {b.swiggy} | Zomato: {b.zomato})
              <br />• Top dish: {b.topDish} ({b.topDishOrders} orders)
              <br />• Food cost: {b.foodCost}% ✅
            </div>
            <div>
              <strong>Today's actions:</strong>
              <br />
              {b.alerts.map((alert, i) => (
                <div key={i} style={{ marginTop: "4px" }}>
                  {alert.icon} {alert.text}
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#888",
                marginTop: "8px",
                textAlign: "right",
              }}
            >
              Reply REPORT for full breakdown
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Channel Breakdown ───
function ChannelBreakdown() {
  const s = DASHBOARD_STATS;
  const total = s.dineInOrders + s.swiggyOrders + s.zomatoOrders;
  const channels = [
    {
      label: "Dine-in",
      count: s.dineInOrders,
      color: "#5DADE2",
      pct: Math.round((s.dineInOrders / total) * 100),
    },
    {
      label: "Swiggy",
      count: s.swiggyOrders,
      color: "#FC8019",
      pct: Math.round((s.swiggyOrders / total) * 100),
    },
    {
      label: "Zomato",
      count: s.zomatoOrders,
      color: "#E23744",
      pct: Math.round((s.zomatoOrders / total) * 100),
    },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ fontWeight: 600, fontSize: "14px" }}>Order Channels</div>
        <span style={{ fontSize: "11px", color: "#888" }}>Today</span>
      </div>
      <div className="card-body">
        {channels.map((ch) => (
          <div key={ch.label} style={{ marginBottom: "14px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "5px",
              }}
            >
              <span style={{ fontSize: "13px", fontWeight: 500 }}>
                {ch.label}
              </span>
              <span style={{ fontSize: "13px", fontWeight: 600 }}>
                {ch.count} orders
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${ch.pct}%`, background: ch.color }}
              />
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "3px" }}>
              {ch.pct}% of total
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Inventory Alerts Widget ───
function InventoryAlerts() {
  const lowItems = INVENTORY.filter(
    (i) => i.status === "low" || i.status === "critical",
  );
  const navigate = useNavigate();
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <AlertTriangle size={16} color="#E67E22" />
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Inventory Alerts
          </div>
        </div>
        <span className="badge badge-orange">{lowItems.length}</span>
      </div>
      <div className="card-body" style={{ padding: "0" }}>
        {lowItems.map((item, i) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              borderBottom:
                i < lowItems.length - 1 ? "1px solid #F5F5F5" : "none",
            }}
          >
            <div>
              <div style={{ fontSize: "13px", fontWeight: 500 }}>
                {item.name}
              </div>
              <div style={{ fontSize: "11px", color: "#888" }}>
                {item.current} {item.unit} remaining
              </div>
            </div>
            <span
              className={`status-pill ${item.status === "critical" ? "red" : "orange"}`}
            >
              {item.status === "critical" ? "Critical" : "Low"}
            </span>
          </div>
        ))}
        <div style={{ padding: "10px 16px" }}>
          <button
            className="btn-outline"
            style={{
              width: "100%",
              justifyContent: "center",
              fontSize: "12px",
            }}
            onClick={() => navigate("/inventory")}
          >
            View All Inventory
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AI Actions Widget ───
function AIActions() {
  const actions = [
    {
      icon: "⚠️",
      text: "Order 6kg Paneer from Sharma Dairy",
      action: "Order Now",
      color: "#E67E22",
    },
    {
      icon: "🌧️",
      text: "Push hot soup combos — rain forecast today",
      action: "Create Offer",
      color: "#5DADE2",
    },
    {
      icon: "💡",
      text: "Biryani margin down 8% — review pricing",
      action: "View Report",
      color: "#CC3333",
    },
    {
      icon: "⭐",
      text: "Respond to 2 new 2-star Zomato reviews",
      action: "Respond",
      color: "#E74C3C",
    },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Bot size={16} color="#CC3333" />
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            AI Actions Today
          </div>
        </div>
        <span className="status-pill green">4 insights</span>
      </div>
      <div className="card-body" style={{ padding: "0" }}>
        {actions.map((a, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderBottom:
                i < actions.length - 1 ? "1px solid #F5F5F5" : "none",
            }}
          >
            <span style={{ fontSize: "18px" }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "12px", color: "#333" }}>{a.text}</div>
            </div>
            <button
              style={{
                background: "none",
                border: `1px solid ${a.color}`,
                color: a.color,
                borderRadius: "4px",
                padding: "3px 8px",
                fontSize: "10px",
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {a.action}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Revenue Goal ───
function RevenueGoal() {
  const s = DASHBOARD_STATS;
  const pct = Math.round((s.monthlyActual / s.monthlyTarget) * 100);
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Target size={16} color="#CC3333" />
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Monthly Revenue Goal
          </div>
        </div>
        <span style={{ fontSize: "12px", color: "#888" }}>April 2026</span>
      </div>
      <div className="card-body">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
          }}
        >
          <span style={{ fontSize: "13px", color: "#555" }}>Actual</span>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#1A1A1A" }}>
            ₹{(s.monthlyActual / 100000).toFixed(1)}L
          </span>
        </div>
        <div
          className="progress-bar"
          style={{ height: "10px", marginBottom: "8px" }}
        >
          <div className="progress-fill" style={{ width: `${pct}%` }} />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: "12px", color: "#888" }}>
            {pct}% of ₹{(s.monthlyTarget / 100000).toFixed(0)}L target
          </span>
          <span style={{ fontSize: "12px", color: "#27AE60", fontWeight: 600 }}>
            On track ✅
          </span>
        </div>
        <div
          style={{
            marginTop: "12px",
            padding: "10px",
            background: "#F8F8F8",
            borderRadius: "8px",
          }}
        >
          <div style={{ fontSize: "11px", color: "#888" }}>
            Projected month-end
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: "#CC3333",
              marginTop: "2px",
            }}
          >
            ₹12.4L
          </div>
          <div style={{ fontSize: "11px", color: "#27AE60" }}>
            ↑ 3% above target
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Payment Summary ───
function PaymentSummary() {
  const s = DASHBOARD_STATS;
  const total = s.cashPayments + s.upiPayments + s.cardPayments;
  const methods = [
    { label: "UPI", amount: s.upiPayments, color: "#5DADE2", icon: "📱" },
    { label: "Cash", amount: s.cashPayments, color: "#27AE60", icon: "💵" },
    { label: "Card", amount: s.cardPayments, color: "#9B59B6", icon: "💳" },
  ];
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <CreditCard size={16} color="#CC3333" />
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Payment Summary
          </div>
        </div>
        <span style={{ fontSize: "12px", color: "#888" }}>Today</span>
      </div>
      <div className="card-body">
        <div
          style={{ fontSize: "24px", fontWeight: 700, marginBottom: "12px" }}
        >
          ₹{total.toLocaleString("en-IN")}
        </div>
        {methods.map((m) => (
          <div
            key={m.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span>{m.icon}</span>
              <span style={{ fontSize: "13px" }}>{m.label}</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>
                ₹{m.amount.toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: "10px", color: "#888" }}>
                {Math.round((m.amount / total) * 100)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Kitchen Status ───
function KitchenStatus() {
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Zap size={16} color="#E67E22" />
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Kitchen Status
          </div>
        </div>
        <span className="status-pill orange">6 active</span>
      </div>
      <div className="card-body">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
          }}
        >
          {[
            { label: "In Queue", value: "6", color: "#5DADE2" },
            { label: "Avg Prep Time", value: "8.4 min", color: "#27AE60" },
            { label: "Delayed", value: "2", color: "#E74C3C" },
            { label: "Completed Today", value: "142", color: "#9B59B6" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#F8F8F8",
                borderRadius: "8px",
                padding: "12px",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "22px", fontWeight: 700, color: s.color }}
              >
                {s.value}
              </div>
              <div
                style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Aggregator Health ───
function AggregatorHealth() {
  return (
    <div className="card">
      <div className="card-header">
        <div style={{ fontWeight: 600, fontSize: "14px" }}>
          Aggregator Health
        </div>
        <span style={{ fontSize: "11px", color: "#888" }}>Last 7 days</span>
      </div>
      <div className="card-body" style={{ padding: "0" }}>
        {[
          {
            name: "Zomato",
            rating: 4.4,
            acceptance: "96%",
            avgTime: "28 min",
            color: "#E23744",
          },
          {
            name: "Swiggy",
            rating: 4.2,
            acceptance: "94%",
            avgTime: "31 min",
            color: "#FC8019",
          },
          {
            name: "ONDC",
            rating: 4.5,
            acceptance: "98%",
            avgTime: "35 min",
            color: "#27AE60",
          },
        ].map((p, i) => (
          <div
            key={p.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "12px 16px",
              borderBottom: i < 2 ? "1px solid #F5F5F5" : "none",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: p.color + "18",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: 700,
                color: p.color,
              }}
            >
              {p.name[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "13px", fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: "11px", color: "#888" }}>
                Acceptance: {p.acceptance} · Avg: {p.avgTime}
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "3px" }}>
              <Star size={12} color="#F0C040" fill="#F0C040" />
              <span style={{ fontSize: "13px", fontWeight: 600 }}>
                {p.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───
export default function Dashboard() {
  const s = DASHBOARD_STATS;

  return (
    <div className="fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-title">Dashboard</div>
          <div className="page-subtitle">
            Thursday, 17 April 2026 · Koramangala
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px" }}>
          <button className="btn-ghost">
            <RefreshCw size={14} />
            Refresh
          </button>
          <button className="btn-outline">
            <Clock size={14} />
            Today
          </button>
        </div>
      </div>

      {/* Stat Cards Row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <StatCard
          label="Today's Revenue"
          value={s.todayRevenue}
          change={s.revenueChange}
          changeLabel="vs last Thursday"
          icon={TrendingUp}
          iconColor="#CC3333"
          prefix="₹"
        />
        <StatCard
          label="Total Orders"
          value={s.totalOrders}
          change={s.ordersChange}
          changeLabel="vs yesterday"
          icon={ShoppingBag}
          iconColor="#5DADE2"
        />
        <StatCard
          label="Food Cost %"
          value={s.foodCost}
          icon={Percent}
          iconColor="#27AE60"
          suffix="%"
          alert={`${s.foodCostTarget}%`}
        />
        <StatCard
          label="Active Tables"
          value={`${s.activeTables}/${s.totalTables}`}
          icon={Table2}
          iconColor="#E67E22"
        />
      </div>

      {/* Row 2 — Table Map + WhatsApp */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <MiniTableMap />
        <WhatsAppWidget />
      </div>

      {/* Row 3 — Channel + Inventory + AI Actions */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <ChannelBreakdown />
        <InventoryAlerts />
        <AIActions />
      </div>

      {/* Row 4 — Revenue Goal + Payment + Kitchen + Aggregator */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "16px",
        }}
      >
        <RevenueGoal />
        <PaymentSummary />
        <KitchenStatus />
        <AggregatorHealth />
      </div>
    </div>
  );
}
