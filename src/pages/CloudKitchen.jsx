import { Store, TrendingUp, TrendingDown } from "lucide-react";
import { CLOUD_KITCHEN_BRANDS } from "../data/mockData";

export default function CloudKitchen() {
  const liveOrders = [
    {
      id: "CK-041",
      brand: "Biryani Brothers",
      platform: "Zomato",
      item: "Chicken Biryani x2",
      stage: "cooking",
      eta: "12 mins",
      color: "#E23744",
    },
    {
      id: "CK-040",
      brand: "Wrap & Roll",
      platform: "Swiggy",
      item: "Paneer Wrap x1",
      stage: "packed",
      eta: "5 mins",
      color: "#FC8019",
    },
    {
      id: "CK-039",
      brand: "South Spice",
      platform: "ONDC",
      item: "Masala Dosa x2",
      stage: "received",
      eta: "25 mins",
      color: "#27AE60",
    },
    {
      id: "CK-038",
      brand: "Dessert Box",
      platform: "Zomato",
      item: "Gulab Jamun x4",
      stage: "picked",
      eta: "Picked up",
      color: "#E23744",
    },
    {
      id: "CK-037",
      brand: "Biryani Brothers",
      platform: "Swiggy",
      item: "Mutton Biryani x1",
      stage: "prep",
      eta: "18 mins",
      color: "#FC8019",
    },
  ];

  const stages = ["received", "prep", "cooking", "packed", "picked"];
  const stageLabels = {
    received: "Received",
    prep: "Prep Started",
    cooking: "Cooking",
    packed: "Packed",
    picked: "Picked Up",
  };
  const stageColors = {
    received: "#5DADE2",
    prep: "#E67E22",
    cooking: "#E67E22",
    packed: "#27AE60",
    picked: "#888",
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
            <Store size={24} color="white" />
          </div>
          <div>
            <div className="page-title">Cloud Kitchen Mode</div>
            <div className="page-subtitle">
              4 brands · All platforms unified
            </div>
          </div>
        </div>
        <span className="status-pill green">All Brands Online</span>
      </div>

      {/* Brand Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        {CLOUD_KITCHEN_BRANDS.map((brand) => (
          <div key={brand.id} className="card">
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: "14px" }}>
                    {brand.name}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#888",
                      marginTop: "2px",
                    }}
                  >
                    {brand.platform}
                  </div>
                </div>
                <span
                  className="status-pill green"
                  style={{ fontSize: "10px" }}
                >
                  Online
                </span>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    background: "#F8F8F8",
                    borderRadius: "6px",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#CC3333",
                    }}
                  >
                    {brand.orders}
                  </div>
                  <div style={{ fontSize: "10px", color: "#888" }}>Orders</div>
                </div>
                <div
                  style={{
                    background: "#F8F8F8",
                    borderRadius: "6px",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: "#27AE60",
                    }}
                  >
                    {brand.margin}%
                  </div>
                  <div style={{ fontSize: "10px", color: "#888" }}>Margin</div>
                </div>
              </div>
              <div
                style={{
                  marginTop: "10px",
                  padding: "8px",
                  background: "#FFF5F5",
                  borderRadius: "6px",
                }}
              >
                <div style={{ fontSize: "11px", color: "#888" }}>
                  Net Revenue
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#CC3333",
                  }}
                >
                  ₹{(brand.netRevenue / 1000).toFixed(0)}k
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Live Order Queue */}
      <div className="card" style={{ marginBottom: "20px" }}>
        <div className="card-header">
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Live Order Queue
          </div>
          <span className="badge badge-orange">
            {liveOrders.filter((o) => o.stage !== "picked").length} active
          </span>
        </div>
        <div className="card-body" style={{ padding: "0" }}>
          {liveOrders.map((order, i) => (
            <div
              key={order.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px 20px",
                borderBottom:
                  i < liveOrders.length - 1 ? "1px solid #F5F5F5" : "none",
              }}
            >
              {/* Brand + Platform */}
              <div style={{ minWidth: "140px" }}>
                <div style={{ fontWeight: 600, fontSize: "13px" }}>
                  {order.brand}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                    marginTop: "2px",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: order.color,
                    }}
                  />
                  <span style={{ fontSize: "11px", color: "#888" }}>
                    {order.platform}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div style={{ flex: 1, fontSize: "13px", color: "#555" }}>
                {order.item}
              </div>

              {/* Stage Tracker */}
              <div
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                {stages.map((stage, si) => {
                  const currentIdx = stages.indexOf(order.stage);
                  const isDone = si <= currentIdx;
                  return (
                    <div
                      key={stage}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: isDone
                            ? stageColors[order.stage]
                            : "#E0E0E0",
                          transition: "background 0.3s",
                        }}
                        title={stageLabels[stage]}
                      />
                      {si < stages.length - 1 && (
                        <div
                          style={{
                            width: "16px",
                            height: "2px",
                            background:
                              isDone && si < currentIdx
                                ? stageColors[order.stage]
                                : "#E0E0E0",
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stage Label */}
              <span
                className={`status-pill ${order.stage === "picked" ? "gray" : order.stage === "packed" ? "green" : "orange"}`}
                style={{ minWidth: "80px", justifyContent: "center" }}
              >
                {stageLabels[order.stage]}
              </span>

              {/* ETA */}
              <div
                style={{
                  fontSize: "12px",
                  color: "#888",
                  minWidth: "70px",
                  textAlign: "right",
                }}
              >
                {order.eta}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Per-Brand P&L */}
      <div className="card">
        <div className="card-header">
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Brand Performance — March 2026
          </div>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Orders</th>
              <th>Gross Revenue</th>
              <th>Commission</th>
              <th>Food Cost %</th>
              <th>Net Revenue</th>
              <th>Margin</th>
            </tr>
          </thead>
          <tbody>
            {CLOUD_KITCHEN_BRANDS.map((brand) => (
              <tr key={brand.id}>
                <td style={{ fontWeight: 600 }}>{brand.name}</td>
                <td>{brand.orders}</td>
                <td>₹{(brand.revenue / 1000).toFixed(1)}k</td>
                <td style={{ color: "#E74C3C" }}>
                  ₹{(brand.commission / 1000).toFixed(1)}k
                </td>
                <td>
                  <span
                    className={`status-pill ${brand.foodCost < 30 ? "green" : brand.foodCost < 35 ? "orange" : "red"}`}
                  >
                    {brand.foodCost}%
                  </span>
                </td>
                <td style={{ fontWeight: 600 }}>
                  ₹{(brand.netRevenue / 1000).toFixed(1)}k
                </td>
                <td>
                  <span
                    className={`status-pill ${brand.margin > 65 ? "green" : brand.margin > 55 ? "orange" : "red"}`}
                  >
                    {brand.margin}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
