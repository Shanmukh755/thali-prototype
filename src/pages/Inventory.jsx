import { useState } from "react";
import { AlertTriangle, Package, X, Send } from "lucide-react";
import { INVENTORY } from "../data/mockData";

function SupplierModal({ item, onClose }) {
  const [sent, setSent] = useState(false);
  const suggestedQty = item.max - item.current;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div style={{ fontWeight: 600, fontSize: "16px" }}>
              Send Purchase Order
            </div>
            <div style={{ fontSize: "12px", color: "#888" }}>
              via WhatsApp to {item.supplier}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <X size={20} color="#888" />
          </button>
        </div>
        <div className="modal-body">
          {!sent ? (
            <>
              <div
                style={{
                  background: "#F8F8F8",
                  borderRadius: "8px",
                  padding: "14px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#888" }}>Item</span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    {item.name}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    Current Stock
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 600,
                      color: "#E74C3C",
                    }}
                  >
                    {item.current} {item.unit}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                  }}
                >
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    Suggested Order
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#27AE60",
                    }}
                  >
                    {suggestedQty.toFixed(1)} {item.unit}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span style={{ fontSize: "12px", color: "#888" }}>
                    Estimated Cost
                  </span>
                  <span style={{ fontSize: "13px", fontWeight: 600 }}>
                    ₹{(suggestedQty * item.costPerUnit).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div style={{ marginBottom: "16px" }}>
                <div className="form-label">Message Preview</div>
                <div
                  style={{
                    background: "#DCF8C6",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "13px",
                    lineHeight: 1.6,
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  Hi {item.supplier},<br />
                  Please deliver{" "}
                  <strong>
                    {suggestedQty.toFixed(1)} {item.unit} {item.name}
                  </strong>{" "}
                  tomorrow morning.
                  <br />
                  Estimated cost: ₹
                  {(suggestedQty * item.costPerUnit).toLocaleString("en-IN")}
                  <br />— Rajesh, Spice Garden
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "20px" }}>
              <div style={{ fontSize: "48px", marginBottom: "12px" }}>✅</div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "16px",
                  marginBottom: "4px",
                }}
              >
                Order Sent!
              </div>
              <div style={{ fontSize: "13px", color: "#888" }}>
                WhatsApp message sent to {item.supplier}
              </div>
            </div>
          )}
        </div>
        {!sent && (
          <div className="modal-footer">
            <button className="btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button className="btn-primary" onClick={() => setSent(true)}>
              <Send size={14} /> Send on WhatsApp
            </button>
          </div>
        )}
        {sent && (
          <div className="modal-footer">
            <button
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={onClose}
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Inventory() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeTab, setActiveTab] = useState("stock");

  const critical = INVENTORY.filter((i) => i.status === "critical").length;
  const low = INVENTORY.filter((i) => i.status === "low").length;

  return (
    <div className="fade-in">
      <div className="page-header">
        <div>
          <div className="page-title">Inventory</div>
          <div className="page-subtitle">
            {INVENTORY.length} items tracked · {critical + low} alerts
          </div>
        </div>
        <button className="btn-primary">
          <Package size={14} /> Add Stock Entry
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
          {
            label: "Total Items",
            value: INVENTORY.length,
            icon: "📦",
            color: "#5DADE2",
          },
          {
            label: "Critical Stock",
            value: critical,
            icon: "🔴",
            color: "#E74C3C",
          },
          { label: "Low Stock", value: low, icon: "⚠️", color: "#E67E22" },
          {
            label: "Today's Usage",
            value: "₹12,400",
            icon: "📊",
            color: "#27AE60",
          },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="stat-label">{s.label}</div>
                <div
                  className="stat-value"
                  style={{ fontSize: "24px", marginTop: "4px", color: s.color }}
                >
                  {s.value}
                </div>
              </div>
              <span style={{ fontSize: "28px" }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-bar" style={{ marginBottom: "16px" }}>
        {[
          { id: "stock", label: "Stock Overview" },
          { id: "recipes", label: "Recipes & Costing" },
          { id: "suppliers", label: "Suppliers" },
          { id: "waste", label: "Waste Log" },
        ].map((t) => (
          <div
            key={t.id}
            className={`tab-item ${activeTab === t.id ? "active" : ""}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </div>
        ))}
      </div>

      {activeTab === "stock" && (
        <div className="card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Category</th>
                <th>Current Stock</th>
                <th>Min Level</th>
                <th>Cost/Unit</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {INVENTORY.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 500 }}>{item.name}</td>
                  <td style={{ color: "#888" }}>{item.category}</td>
                  <td>
                    <span
                      style={{
                        fontWeight: 600,
                        color:
                          item.status === "critical"
                            ? "#E74C3C"
                            : item.status === "low"
                              ? "#E67E22"
                              : "#27AE60",
                      }}
                    >
                      {item.current} {item.unit}
                    </span>
                  </td>
                  <td style={{ color: "#888" }}>
                    {item.min} {item.unit}
                  </td>
                  <td>
                    ₹{item.costPerUnit}/{item.unit}
                  </td>
                  <td style={{ color: "#888" }}>{item.supplier}</td>
                  <td>
                    <span
                      className={`status-pill ${item.status === "critical" ? "red" : item.status === "low" ? "orange" : "green"}`}
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
                        className="btn-primary"
                        style={{ padding: "4px 10px", fontSize: "11px" }}
                        onClick={() => setSelectedItem(item)}
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
      )}

      {activeTab === "recipes" && (
        <div className="card">
          <div className="card-header">
            <div style={{ fontWeight: 600, fontSize: "14px" }}>
              Recipe Costing
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Plate Cost</th>
                <th>Selling Price</th>
                <th>Gross Margin</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  dish: "Butter Chicken",
                  cost: 86,
                  price: 320,
                  margin: 73,
                  cat: "⭐ Star",
                },
                {
                  dish: "Chicken Biryani",
                  cost: 124,
                  price: 340,
                  margin: 64,
                  cat: "⭐ Star",
                },
                {
                  dish: "Dal Makhani",
                  cost: 58,
                  price: 220,
                  margin: 74,
                  cat: "⭐ Star",
                },
                {
                  dish: "Mutton Biryani",
                  cost: 188,
                  price: 420,
                  margin: 55,
                  cat: "🐄 Plowhorse",
                },
                {
                  dish: "Paneer Tikka",
                  cost: 92,
                  price: 260,
                  margin: 65,
                  cat: "⭐ Star",
                },
                {
                  dish: "Veg Spring Roll",
                  cost: 42,
                  price: 180,
                  margin: 77,
                  cat: "🧩 Puzzle",
                },
              ].map((r) => (
                <tr key={r.dish}>
                  <td style={{ fontWeight: 500 }}>{r.dish}</td>
                  <td>₹{r.cost}</td>
                  <td style={{ fontWeight: 600 }}>₹{r.price}</td>
                  <td>
                    <span
                      className={`status-pill ${r.margin > 70 ? "green" : r.margin > 60 ? "orange" : "red"}`}
                    >
                      {r.margin}%
                    </span>
                  </td>
                  <td style={{ fontSize: "12px" }}>{r.cat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {(activeTab === "suppliers" || activeTab === "waste") && (
        <div style={{ textAlign: "center", padding: "60px", color: "#888" }}>
          <Package size={48} style={{ margin: "0 auto 16px", opacity: 0.3 }} />
          <div style={{ fontSize: "16px", fontWeight: 600 }}>
            {activeTab === "suppliers" ? "Supplier Management" : "Waste Log"}
          </div>
          <div style={{ fontSize: "13px", marginTop: "8px" }}>
            Available in full version
          </div>
        </div>
      )}

      {selectedItem && (
        <SupplierModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
