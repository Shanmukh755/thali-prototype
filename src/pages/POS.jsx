import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TableView from "./pos/TableView";
import QuickBill from "./pos/QuickBill";
import DeliveryOrders from "./pos/DeliveryOrders";

const TABS = [
  { id: "table", label: "🍽️ Table View", path: "/pos" },
  { id: "quick", label: "⚡ Quick Bill", path: "/pos/quick" },
  { id: "delivery", label: "🛵 Delivery Orders", path: "/pos/delivery" },
];

export default function POS() {
  const location = useLocation();
  const navigate = useNavigate();

  const activeTab =
    location.pathname === "/pos/quick"
      ? "quick"
      : location.pathname === "/pos/delivery"
        ? "delivery"
        : "table";

  return (
    <div
      className="fade-in"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      {/* POS Sub-Nav */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          marginBottom: "16px",
          background: "white",
          padding: "6px",
          borderRadius: "12px",
          border: "1px solid #EEEEEE",
          width: "fit-content",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            style={{
              padding: "8px 18px",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              background: activeTab === tab.id ? "#CC3333" : "transparent",
              color: activeTab === tab.id ? "white" : "#555555",
              fontWeight: activeTab === tab.id ? 600 : 400,
              fontSize: "13px",
              fontFamily: "Poppins, sans-serif",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden" }}>
        {activeTab === "table" && <TableView />}
        {activeTab === "quick" && <QuickBill />}
        {activeTab === "delivery" && <DeliveryOrders />}
      </div>
    </div>
  );
}
