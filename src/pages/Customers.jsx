import { useState } from "react";
import { Search, X, Star, Gift, MessageSquare, Phone } from "lucide-react";
import { CUSTOMERS } from "../data/mockData";

const TIER_COLORS = {
  Bronze: "#CD7F32",
  Silver: "#C0C0C0",
  Gold: "#FFD700",
  Platinum: "#E5E4E2",
};
const TIER_BG = {
  Bronze: "#FDF3E7",
  Silver: "#F5F5F5",
  Gold: "#FFFDE7",
  Platinum: "#F3F3F3",
};

function CustomerProfile({ customer, onClose }) {
  return (
    <div className="side-panel open">
      <div className="side-panel-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              background: "#CC3333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 700,
              fontSize: "18px",
            }}
          >
            {customer.name[0]}
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: "15px" }}>
              {customer.name}
            </div>
            <div style={{ fontSize: "11px", color: "#888" }}>
              📱 {customer.phone}
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{ background: "none", border: "none", cursor: "pointer" }}
        >
          <X size={20} color="#888" />
        </button>
      </div>

      <div className="side-panel-body">
        {/* Tier Badge */}
        <div
          style={{
            background: TIER_BG[customer.tier],
            border: `1px solid ${TIER_COLORS[customer.tier]}`,
            borderRadius: "10px",
            padding: "14px",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "4px" }}>
            {customer.tier === "Platinum"
              ? "💎"
              : customer.tier === "Gold"
                ? "🥇"
                : customer.tier === "Silver"
                  ? "🥈"
                  : "🥉"}
          </div>
          <div
            style={{
              fontWeight: 700,
              fontSize: "16px",
              color: TIER_COLORS[customer.tier],
            }}
          >
            {customer.tier} Member
          </div>
          <div style={{ fontSize: "13px", color: "#888", marginTop: "2px" }}>
            {customer.loyaltyPoints} points
          </div>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "10px",
            marginBottom: "16px",
          }}
        >
          {[
            { label: "Total Visits", value: customer.visits },
            { label: "Last Visit", value: customer.lastVisit },
            {
              label: "Total Spent",
              value: `₹${customer.totalSpent.toLocaleString("en-IN")}`,
            },
            {
              label: "Avg per Visit",
              value: `₹${Math.round(customer.totalSpent / customer.visits).toLocaleString("en-IN")}`,
            },
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
                style={{ fontSize: "16px", fontWeight: 700, color: "#1A1A1A" }}
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

        {/* Favourite */}
        <div
          style={{
            background: "#FFF5F5",
            borderRadius: "8px",
            padding: "12px",
            marginBottom: "16px",
          }}
        >
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            Favourite Item
          </div>
          <div style={{ fontWeight: 600, color: "#CC3333" }}>
            ❤️ {customer.favoriteItem}
          </div>
        </div>

        {/* Source */}
        <div style={{ marginBottom: "16px" }}>
          <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>
            Acquisition Source
          </div>
          <span className="status-pill blue">{customer.acquisitionSource}</span>
        </div>

        {/* Order History */}
        <div>
          <div
            style={{ fontWeight: 600, fontSize: "13px", marginBottom: "10px" }}
          >
            Recent Orders
          </div>
          {[
            { date: "14 Apr", items: "Butter Chicken, Naan x2", amount: 420 },
            { date: "8 Apr", items: "Chicken Biryani, Raita", amount: 380 },
            { date: "1 Apr", items: "Dal Makhani, Roti x3", amount: 290 },
          ].map((order, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #F5F5F5",
                fontSize: "12px",
              }}
            >
              <div>
                <div style={{ fontWeight: 500 }}>{order.items}</div>
                <div style={{ color: "#888", marginTop: "2px" }}>
                  {order.date}
                </div>
              </div>
              <div style={{ fontWeight: 600 }}>₹{order.amount}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="side-panel-footer">
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            className="btn-outline"
            style={{ flex: 1, justifyContent: "center", fontSize: "12px" }}
          >
            <MessageSquare size={13} /> WhatsApp
          </button>
          <button
            className="btn-primary"
            style={{ flex: 1, justifyContent: "center", fontSize: "12px" }}
          >
            <Gift size={13} /> Send Offer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search),
  );

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <div className="page-title">Customers (CRM)</div>
          <div className="page-subtitle">
            2,847 total customers · 124 new this month
          </div>
        </div>
        <button className="btn-primary">
          <MessageSquare size={14} /> New Campaign
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {[
          { label: "Total Customers", value: "2,847", icon: "👥" },
          { label: "New This Month", value: "124", icon: "🆕" },
          { label: "Returning Rate", value: "68%", icon: "🔄" },
          { label: "Avg Lifetime Value", value: "₹4,200", icon: "💰" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div style={{ fontSize: "28px", marginBottom: "6px" }}>
              {s.icon}
            </div>
            <div className="stat-value" style={{ fontSize: "22px" }}>
              {s.value}
            </div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ marginBottom: "16px" }}>
        {["all", "platinum", "gold", "silver", "bronze", "lapsed"].map((t) => (
          <div
            key={t}
            className={`tab-item ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
            style={{ textTransform: "capitalize" }}
          >
            {t === "all" ? "All Customers" : t}
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginBottom: "16px" }}>
        <div className="search-wrapper">
          <Search size={14} />
          <input
            className="search-input"
            style={{ width: "300px" }}
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Visits</th>
              <th>Last Visit</th>
              <th>Total Spent</th>
              <th>Loyalty</th>
              <th>Tier</th>
              <th>Source</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((customer) => (
              <tr
                key={customer.id}
                style={{ cursor: "pointer" }}
                onClick={() => setSelectedCustomer(customer)}
              >
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#CC3333",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "13px",
                        flexShrink: 0,
                      }}
                    >
                      {customer.name[0]}
                    </div>
                    <span style={{ fontWeight: 500 }}>{customer.name}</span>
                  </div>
                </td>
                <td style={{ color: "#888" }}>{customer.phone}</td>
                <td style={{ fontWeight: 600 }}>{customer.visits}</td>
                <td style={{ color: "#888" }}>{customer.lastVisit}</td>
                <td style={{ fontWeight: 600 }}>
                  ₹{customer.totalSpent.toLocaleString("en-IN")}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Star size={12} color="#F0C040" fill="#F0C040" />
                    <span style={{ fontSize: "12px", fontWeight: 600 }}>
                      {customer.loyaltyPoints} pts
                    </span>
                  </div>
                </td>
                <td>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: "4px",
                      fontSize: "11px",
                      fontWeight: 700,
                      background: TIER_BG[customer.tier],
                      color: TIER_COLORS[customer.tier],
                      border: `1px solid ${TIER_COLORS[customer.tier]}`,
                    }}
                  >
                    {customer.tier}
                  </span>
                </td>
                <td>
                  <span
                    className="status-pill blue"
                    style={{ fontSize: "10px" }}
                  >
                    {customer.acquisitionSource}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-ghost"
                    style={{ padding: "4px 8px", fontSize: "11px" }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCustomer(customer);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Profile Panel */}
      {selectedCustomer && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.2)",
              zIndex: 199,
            }}
            onClick={() => setSelectedCustomer(null)}
          />
          <CustomerProfile
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        </>
      )}
    </div>
  );
}
