import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Kitchen from "./pages/Kitchen";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Intelligence from "./pages/Intelligence";
import CloudKitchen from "./pages/CloudKitchen";
import Staff from "./pages/Staff";
import Pricing from "./pages/Pricing";

// Placeholder for pages not yet built
function ComingSoon({ title }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "80px 20px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🚧</div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: 600,
          color: "#1A1A1A",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "13px", color: "#888" }}>
        This page is part of the full Thali product
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* App with Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pos" element={<POS />} />
          <Route path="/pos/quick" element={<POS />} />
          <Route path="/pos/delivery" element={<POS />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/dine-in" element={<Orders />} />
          <Route path="/orders/online" element={<Orders />} />
          <Route path="/orders/direct" element={<Orders />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/inventory/recipes" element={<Inventory />} />
          <Route
            path="/inventory/purchase-orders"
            element={<ComingSoon title="Purchase Orders" />}
          />
          <Route path="/inventory/suppliers" element={<Inventory />} />
          <Route path="/inventory/waste" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/menu" element={<Reports />} />
          <Route path="/reports/inventory" element={<Reports />} />
          <Route path="/reports/reconciliation" element={<Reports />} />
          <Route path="/reports/financial" element={<Reports />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/loyalty" element={<Customers />} />
          <Route path="/customers/feedback" element={<Customers />} />
          <Route path="/customers/segments" element={<Customers />} />
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/cloud-kitchen" element={<CloudKitchen />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route
            path="/reservations"
            element={<ComingSoon title="Reservations" />}
          />
          <Route
            path="/menu"
            element={<ComingSoon title="Menu Management" />}
          />
          <Route
            path="/marketing"
            element={<ComingSoon title="Marketing & Campaigns" />}
          />
          <Route
            path="/payments"
            element={<ComingSoon title="Payments & Settlements" />}
          />
          <Route
            path="/branches"
            element={<ComingSoon title="Multi-Branch Management" />}
          />
          <Route path="/settings" element={<ComingSoon title="Settings" />} />
          <Route path="/help" element={<ComingSoon title="Help & Support" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
