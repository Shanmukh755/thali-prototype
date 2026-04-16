import { useState } from "react";
import { Search } from "lucide-react";
import { ORDERS } from "../data/mockData";

const STATUS_CONFIG = {
  served: { label: "Served", class: "green" },
  cooking: { label: "Cooking", class: "orange" },
  delivered: { label: "Delivered", class: "blue" },
  running: { label: "Running", class: "orange" },
  billed: { label: "Billed", class: "green" },
  ready: { label: "Ready", class: "green" },
};

export default function Orders() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const tabs = [
    { id: "all", label: "All Orders" },
    { id: "dine-in", label: "Dine-in" },
    { id: "zomato", label: "Zomato" },
    { id: "swiggy", label: "Swiggy" },
    { id: "ondc", label: "ONDC" },
    { id: "direct", label: "Direct" },
    { id: "takeaway", label: "Takeaway" },
  ];

  const filtered = ORDERS.filter(
    (o) =>
      (activeTab === "all" || o.channel === activeTab) &&
      (o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.items.toLowerCase().includes(search.toLowerCase())),
  );

  const channelIcon = (channel) => {
    const icons = {
      "dine-in": "🍽️",
      zomato: "🔴",
      swiggy: "🟠",
      ondc: "🟢",
      direct: "💬",
      takeaway: "🥡",
    };
    return icons[channel] || "📦";
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <div className="page-title">Orders</div>
          <div className="page-subtitle">
            Today · {ORDERS.length} orders shown
          </div>
        </div>
        <div className="search-wrapper">
          <Search size={14} />
          <input
            className="search-input"
            placeholder="Search orders..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: "12px",
          marginBottom: "20px",
        }}
      >
        {[
          { label: "Total Today", value: "187", color: "#1A1A1A" },
          { label: "Dine-in", value: "134", color: "#5DADE2" },
          { label: "Zomato", value: "38", color: "#E23744" },
          { label: "Swiggy", value: "15", color: "#FC8019" },
          { label: "Direct/ONDC", value: "12", color: "#27AE60" },
        ].map((s) => (
          <div key={s.label} className="stat-card" style={{ padding: "14px" }}>
            <div style={{ fontSize: "22px", fontWeight: 700, color: s.color }}>
              {s.value}
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ marginBottom: "16px" }}>
        {tabs.map((t) => (
          <div
            key={t.id}
            className={`tab-item ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Time</th>
              <th>Channel</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((order) => {
              const status = STATUS_CONFIG[order.status] || {
                label: order.status,
                class: "gray",
              };
              return (
                <tr key={order.id}>
                  <td style={{ fontWeight: 700, color: "#CC3333" }}>
                    {order.id}
                  </td>
                  <td style={{ color: "#888" }}>{order.time}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                      }}
                    >
                      <span>{channelIcon(order.channel)}</span>
                      <span style={{ fontSize: "12px", fontWeight: 500 }}>
                        {order.table || order.platform || order.type}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      maxWidth: "200px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: "#555",
                    }}
                  >
                    {order.items}
                  </td>
                  <td style={{ fontWeight: 600 }}>
                    ₹{order.amount.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <span className={`status-pill ${status.class}`}>
                      {status.label}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-ghost"
                      style={{ padding: "4px 8px", fontSize: "11px" }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
