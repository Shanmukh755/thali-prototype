import { useState } from "react";
import { AlertTriangle, TrendingUp, CheckCircle, Download } from "lucide-react";
import { RECONCILIATION } from "../data/mockData";

function ReconciliationCard({ platform, data, color }) {
  return (
    <div className="reconcile-card" style={{ marginBottom: "20px" }}>
      {/* Header */}
      <div
        style={{
          padding: "16px 20px",
          background: color + "12",
          borderBottom: "1px solid #E0E0E0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "8px",
              background: color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "14px",
            }}
          >
            {platform[0]}
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "15px" }}>{platform}</div>
            <div style={{ fontSize: "11px", color: "#888" }}>
              {data.month} · {data.orders} orders
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <span style={{ fontSize: "12px", color: "#888" }}>
            Rating: ⭐ {data.rating}
          </span>
          <span style={{ fontSize: "12px", color: "#888" }}>
            Acceptance: {data.acceptanceRate}%
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="reconcile-row">
        <span>Gross Order Value</span>
        <span style={{ fontWeight: 600 }}>
          ₹{data.grossValue.toLocaleString("en-IN")}
        </span>
      </div>
      <div className="reconcile-row" style={{ color: "#E74C3C" }}>
        <span>Commission ({data.commissionPct}%)</span>
        <span>-₹{data.commission.toLocaleString("en-IN")}</span>
      </div>
      <div className="reconcile-row" style={{ color: "#E74C3C" }}>
        <span>GST on Commission</span>
        <span>-₹{data.gstOnCommission.toLocaleString("en-IN")}</span>
      </div>
      <div className="reconcile-row" style={{ color: "#E74C3C" }}>
        <span>Payment Gateway Fee</span>
        <span>-₹{data.paymentGateway.toLocaleString("en-IN")}</span>
      </div>
      <div className="reconcile-row" style={{ color: "#E74C3C" }}>
        <span>Cancellation Deductions</span>
        <span>-₹{data.cancellationDeductions.toLocaleString("en-IN")}</span>
      </div>
      <div className="reconcile-row total">
        <span>Net Payout Expected</span>
        <span>₹{data.netExpected.toLocaleString("en-IN")}</span>
      </div>
      <div className="reconcile-row total">
        <span>Net Payout Received</span>
        <span>₹{data.netReceived.toLocaleString("en-IN")}</span>
      </div>
      <div className="reconcile-row discrepancy">
        <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <AlertTriangle size={16} /> DISCREPANCY
        </span>
        <span>₹{data.discrepancy.toLocaleString("en-IN")}</span>
      </div>

      {/* Action */}
      <div style={{ padding: "12px 20px" }}>
        <button
          className="btn-primary"
          style={{ width: "100%", justifyContent: "center" }}
        >
          Raise Dispute with {platform} →
        </button>
      </div>
    </div>
  );
}

function SalesReport() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const values = [32000, 28000, 35000, 42800, 38000, 52000, 48000];
  const max = Math.max(...values);

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {[
          {
            label: "This Week Revenue",
            value: "₹2,75,800",
            change: "+12%",
            up: true,
          },
          {
            label: "Avg Daily Revenue",
            value: "₹39,400",
            change: "+8%",
            up: true,
          },
          { label: "Total Orders", value: "1,247", change: "+5%", up: true },
          { label: "Avg Order Value", value: "₹221", change: "-2%", up: false },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div
              className="stat-value"
              style={{ fontSize: "22px", marginTop: "6px" }}
            >
              {s.value}
            </div>
            <div
              className={`stat-change ${s.up ? "up" : "down"}`}
              style={{ marginTop: "4px" }}
            >
              {s.up ? "↑" : "↓"} {s.change} vs last week
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart */}
      <div className="card">
        <div className="card-header">
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Daily Revenue — This Week
          </div>
          <button
            className="btn-ghost"
            style={{ fontSize: "11px", padding: "4px 10px" }}
          >
            <Download size={12} /> Export
          </button>
        </div>
        <div className="card-body">
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              height: "160px",
            }}
          >
            {days.map((day, i) => (
              <div
                key={day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#CC3333",
                  }}
                >
                  ₹{(values[i] / 1000).toFixed(0)}k
                </div>
                <div
                  style={{
                    width: "100%",
                    background: day === "Thu" ? "#CC3333" : "#AED6F1",
                    borderRadius: "4px 4px 0 0",
                    height: `${(values[i] / max) * 120}px`,
                    transition: "height 0.3s ease",
                  }}
                />
                <div
                  style={{
                    fontSize: "11px",
                    color: "#888",
                    fontWeight: day === "Thu" ? 700 : 400,
                  }}
                >
                  {day}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Items */}
      <div className="card" style={{ marginTop: "16px" }}>
        <div className="card-header">
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Top Selling Items
          </div>
        </div>
        <div className="card-body" style={{ padding: "0" }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Orders</th>
                <th>Revenue</th>
                <th>Margin</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {[
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
              ].map((item) => (
                <tr key={item.rank}>
                  <td style={{ fontWeight: 700, color: "#CC3333" }}>
                    #{item.rank}
                  </td>
                  <td style={{ fontWeight: 500 }}>{item.name}</td>
                  <td>{item.orders}</td>
                  <td style={{ fontWeight: 600 }}>
                    ₹{item.revenue.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <span
                      className={`status-pill ${item.margin > 65 ? "green" : "orange"}`}
                    >
                      {item.margin}%
                    </span>
                  </td>
                  <td style={{ fontSize: "11px" }}>{item.cat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default function Reports() {
  const [activeTab, setActiveTab] = useState("reconciliation");

  const tabs = [
    { id: "sales", label: "Sales Reports" },
    { id: "reconciliation", label: "⚠️ Aggregator Reconciliation" },
    { id: "menu", label: "Menu Reports" },
    { id: "inventory", label: "Inventory Reports" },
    { id: "financial", label: "Financial Reports" },
  ];

  const totalDiscrepancy =
    RECONCILIATION.swiggy.discrepancy + RECONCILIATION.zomato.discrepancy;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <div className="page-title">Reports & Analytics</div>
          <div className="page-subtitle">March 2026 · Koramangala</div>
        </div>
        <button className="btn-outline">
          <Download size={14} /> Export All
        </button>
      </div>

      {/* Tabs */}
      <div
        className="tab-bar"
        style={{
          marginBottom: "20px",
          borderRadius: "10px 10px 0 0",
          overflow: "hidden",
        }}
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`tab-item ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      {activeTab === "reconciliation" && (
        <div>
          {/* Summary Banner */}
          <div
            style={{
              background: "linear-gradient(135deg, #27AE60, #1E8449)",
              borderRadius: "12px",
              padding: "20px 24px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              color: "white",
            }}
          >
            <div>
              <div
                style={{ fontSize: "13px", opacity: 0.85, marginBottom: "4px" }}
              >
                💰 Total money found this month that you didn't know about
              </div>
              <div style={{ fontSize: "36px", fontWeight: 800 }}>
                ₹{totalDiscrepancy.toLocaleString("en-IN")}
              </div>
              <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>
                Swiggy: ₹
                {RECONCILIATION.swiggy.discrepancy.toLocaleString("en-IN")} ·
                Zomato: ₹
                {RECONCILIATION.zomato.discrepancy.toLocaleString("en-IN")}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <CheckCircle size={48} style={{ opacity: 0.8 }} />
              <div style={{ fontSize: "12px", opacity: 0.8, marginTop: "4px" }}>
                Raise disputes to recover
              </div>
            </div>
          </div>

          <ReconciliationCard
            platform="Swiggy"
            data={RECONCILIATION.swiggy}
            color="#FC8019"
          />
          <ReconciliationCard
            platform="Zomato"
            data={RECONCILIATION.zomato}
            color="#E23744"
          />
        </div>
      )}

      {activeTab === "sales" && <SalesReport />}

      {(activeTab === "menu" ||
        activeTab === "inventory" ||
        activeTab === "financial") && (
        <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
          <TrendingUp
            size={48}
            style={{ margin: "0 auto 16px", opacity: 0.3 }}
          />
          <div
            style={{ fontSize: "16px", fontWeight: 600, marginBottom: "8px" }}
          >
            {activeTab === "menu"
              ? "Menu Engineering Reports"
              : activeTab === "inventory"
                ? "Inventory Reports"
                : "Financial Reports"}
          </div>
          <div style={{ fontSize: "13px" }}>
            Detailed reports with AI insights available in full version
          </div>
        </div>
      )}
    </div>
  );
}
