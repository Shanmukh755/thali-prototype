import { Bot, TrendingUp, Zap, AlertTriangle } from "lucide-react";
import { AI_BRIEFING } from "../data/mockData";

export default function Intelligence() {
  const b = AI_BRIEFING;

  const forecastData = [
    { day: "Fri 18", biryani: 48, butterChicken: 62, dal: 38 },
    { day: "Sat 19", biryani: 72, butterChicken: 85, dal: 52 },
    { day: "Sun 20", biryani: 68, butterChicken: 78, dal: 48 },
    { day: "Mon 21", biryani: 35, butterChicken: 45, dal: 28 },
    { day: "Tue 22", biryani: 38, butterChicken: 48, dal: 30 },
    { day: "Wed 23", biryani: 42, butterChicken: 52, dal: 34 },
    { day: "Thu 24", biryani: 55, butterChicken: 65, dal: 40 },
  ];

  const menuMatrix = [
    {
      name: "Butter Chicken",
      volume: "High",
      margin: "High",
      category: "star",
    },
    { name: "Dal Makhani", volume: "High", margin: "High", category: "star" },
    {
      name: "Chicken Biryani",
      volume: "High",
      margin: "Medium",
      category: "plowhorse",
    },
    {
      name: "Mutton Biryani",
      volume: "High",
      margin: "Low",
      category: "plowhorse",
    },
    {
      name: "Veg Spring Roll",
      volume: "Low",
      margin: "High",
      category: "puzzle",
    },
    { name: "Rasmalai", volume: "Low", margin: "High", category: "puzzle" },
    { name: "Mushroom 65", volume: "Low", margin: "Low", category: "dog" },
    { name: "Fish Fry", volume: "Low", margin: "Low", category: "dog" },
  ];

  const catConfig = {
    star: {
      label: "⭐ Star",
      bg: "#E8F8F0",
      border: "#27AE60",
      color: "#27AE60",
      action: "Feature prominently. Never discount.",
    },
    plowhorse: {
      label: "🐄 Plowhorse",
      bg: "#EBF5FB",
      border: "#5DADE2",
      color: "#5DADE2",
      action: "Raise price 5-8%. Reduce portion slightly.",
    },
    puzzle: {
      label: "🧩 Puzzle",
      bg: "#FEF3E8",
      border: "#E67E22",
      color: "#E67E22",
      action: "Improve placement. Add photo. Promote.",
    },
    dog: {
      label: "🐕 Dog",
      bg: "#FDECEA",
      border: "#E74C3C",
      color: "#E74C3C",
      action: "Consider removing or reworking.",
    },
  };

  return (
    <div className="fade-in">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#CC3333",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Bot size={24} color="white" />
          </div>
          <div>
            <div className="page-title">Thali Intelligence</div>
            <div className="page-subtitle">
              AI-powered insights for your restaurant
            </div>
          </div>
        </div>
        <span className="status-pill green">AI Active</span>
      </div>

      {/* WhatsApp Briefing */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-header">
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Today's Morning Briefing
          </div>
          <span style={{ fontSize: "11px", color: "#888" }}>
            Sent at 8:00 AM · {b.date}
          </span>
        </div>
        <div className="card-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            {/* WhatsApp Preview */}
            <div>
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
                  <strong>Good morning, {b.ownerName}! ☀️</strong>
                  <br />
                  <span style={{ fontSize: "11px", color: "#666" }}>
                    {b.date}
                  </span>
                  <br />
                  <br />
                  <strong>Yesterday's snapshot:</strong>
                  <br />• Revenue: ₹{b.revenue.toLocaleString("en-IN")} (↑
                  {b.revenueChange}% vs {b.revenueVs})<br />• Orders: {b.orders}{" "}
                  (Dine-in: {b.dineIn} | Swiggy: {b.swiggy} | Zomato: {b.zomato}
                  )<br />• Top dish: {b.topDish} ({b.topDishOrders} orders)
                  <br />• Food cost: {b.foodCost}% ✅
                  <br />
                  <br />
                  <strong>Today's actions:</strong>
                  <br />
                  {b.alerts.map((a, i) => (
                    <div key={i}>
                      {a.icon} {a.text}
                    </div>
                  ))}
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

            {/* Alerts */}
            <div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "13px",
                  marginBottom: "12px",
                }}
              >
                Action Items
              </div>
              {b.alerts.map((alert, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "10px",
                    padding: "10px 12px",
                    borderRadius: "8px",
                    background:
                      alert.type === "urgent"
                        ? "#FDECEA"
                        : alert.type === "warning"
                          ? "#FEF3E8"
                          : "#F8F8F8",
                    marginBottom: "8px",
                    alignItems: "flex-start",
                  }}
                >
                  <span style={{ fontSize: "18px", flexShrink: 0 }}>
                    {alert.icon}
                  </span>
                  <div
                    style={{ fontSize: "12px", color: "#333", lineHeight: 1.5 }}
                  >
                    {alert.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Demand Forecast */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-header">
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>
              7-Day Demand Forecast
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
              Based on 90 days of your order history + weather + events
            </div>
          </div>
          <span className="status-pill blue">AI Powered</span>
        </div>
        <div className="card-body">
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
            {[
              { label: "Butter Chicken", color: "#CC3333" },
              { label: "Chicken Biryani", color: "#5DADE2" },
              { label: "Dal Makhani", color: "#27AE60" },
            ].map((l) => (
              <div
                key={l.label}
                style={{ display: "flex", alignItems: "center", gap: "5px" }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "3px",
                    background: l.color,
                    borderRadius: "2px",
                  }}
                />
                <span style={{ fontSize: "11px", color: "#666" }}>
                  {l.label}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "8px",
              height: "140px",
            }}
          >
            {forecastData.map((d, i) => (
              <div
                key={d.day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2px",
                    alignItems: "flex-end",
                    height: "110px",
                  }}
                >
                  {[
                    { val: d.butterChicken, color: "#CC3333", max: 90 },
                    { val: d.biryani, color: "#5DADE2", max: 90 },
                    { val: d.dal, color: "#27AE60", max: 90 },
                  ].map((bar, j) => (
                    <div
                      key={j}
                      style={{
                        width: "8px",
                        background: bar.color,
                        borderRadius: "2px 2px 0 0",
                        height: `${(bar.val / bar.max) * 100}px`,
                        opacity: 0.85,
                      }}
                    />
                  ))}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#888",
                    textAlign: "center",
                  }}
                >
                  {d.day}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: "#FFF5F5",
              borderRadius: "8px",
              padding: "10px 12px",
              marginTop: "12px",
              fontSize: "12px",
              color: "#CC3333",
            }}
          >
            💡 <strong>AI Insight:</strong> Saturday shows 40% higher demand.
            Prep 25% more Butter Chicken and Biryani. Current stock covers only
            a normal day.
          </div>
        </div>
      </div>

      {/* Menu Engineering Matrix */}
      <div className="card">
        <div className="card-header">
          <div>
            <div style={{ fontWeight: 600, fontSize: "14px" }}>
              Menu Engineering Matrix
            </div>
            <div style={{ fontSize: "11px", color: "#888", marginTop: "2px" }}>
              Monthly analysis · Auto-generated action plan
            </div>
          </div>
        </div>
        <div className="card-body">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
            }}
          >
            {Object.entries(catConfig).map(([key, config]) => {
              const items = menuMatrix.filter((m) => m.category === key);
              return (
                <div
                  key={key}
                  style={{
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    borderRadius: "10px",
                    padding: "14px",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "14px",
                      color: config.color,
                      marginBottom: "4px",
                    }}
                  >
                    {config.label}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#666",
                      marginBottom: "10px",
                      fontStyle: "italic",
                    }}
                  >
                    {config.action}
                  </div>
                  {items.map((item) => (
                    <div
                      key={item.name}
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        padding: "4px 0",
                        borderBottom: "1px solid rgba(0,0,0,0.05)",
                      }}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
