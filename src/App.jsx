import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import POS from "./pages/POS";
import Orders from "./pages/Orders";
import Kitchen from "./pages/Kitchen";
import Inventory from "./pages/Inventory";
import InventoryStock from "./pages/inventory/InventoryStock";
import InventoryRecipes from "./pages/inventory/InventoryRecipes";
import InventoryPurchaseOrders from "./pages/inventory/InventoryPurchaseOrders";
import InventorySuppliers from "./pages/inventory/InventorySuppliers";
import InventoryWaste from "./pages/inventory/InventoryWaste";
import Reports from "./pages/Reports";
import ReportsSales from "./pages/reports/ReportsSales";
import ReportsMenu from "./pages/reports/ReportsMenu";
import ReportsInventory from "./pages/reports/ReportsInventory";
import ReportsReconciliation from "./pages/reports/ReportsReconciliation";
import ReportsFinancial from "./pages/reports/ReportsFinancial";
import Customers from "./pages/Customers";
import CustomersAll from "./pages/customers/CustomersAll";
import CustomersLoyalty from "./pages/customers/CustomersLoyalty";
import CustomersFeedback from "./pages/customers/CustomersFeedback";
import CustomersSegments from "./pages/customers/CustomersSegments";
import Intelligence from "./pages/Intelligence";
import CloudKitchen from "./pages/CloudKitchen";
import Staff from "./pages/Staff";
import Pricing from "./pages/Pricing";
import TableViewPage from "./pages/pos/TableViewPage";
import QuickBill from "./pages/pos/QuickBill";
import DeliveryOrders from "./pages/pos/DeliveryOrders";
import AllOrders from "./pages/orders/AllOrders";
import DineInOrders from "./pages/orders/DineInOrders";
import OnlineOrders from "./pages/orders/OnlineOrders";
import DirectOrders from "./pages/orders/DirectOrders";
import Reservations from "./pages/Reservations";
import MenuManagement from "./pages/MenuManagement";
import Marketing from "./pages/Marketing";
import Payments from "./pages/Payments";
import MultiBranch from "./pages/MultiBranch";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

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
          {/* POS — nested routes with Outlet */}
          <Route path="/pos" element={<POS />}>
            <Route index element={<TableViewPage />} />
            <Route path="quick" element={<QuickBill />} />
            <Route path="delivery" element={<DeliveryOrders />} />
          </Route>
          <Route path="/kitchen" element={<Kitchen />} />
          {/* Orders — nested routes with Outlet */}
          <Route path="/orders" element={<Orders />}>
            <Route index element={<AllOrders />} />
            <Route path="dine-in" element={<DineInOrders />} />
            <Route path="online" element={<OnlineOrders />} />
            <Route path="direct" element={<DirectOrders />} />
          </Route>
          {/* Inventory — nested routes with Outlet */}
          <Route path="/inventory" element={<Inventory />}>
            <Route index element={<InventoryStock />} />
            <Route path="recipes" element={<InventoryRecipes />} />
            <Route
              path="purchase-orders"
              element={<InventoryPurchaseOrders />}
            />
            <Route path="suppliers" element={<InventorySuppliers />} />
            <Route path="waste" element={<InventoryWaste />} />
          </Route>
          {/* Reports — nested routes with Outlet */}
          <Route path="/reports" element={<Reports />}>
            <Route index element={<ReportsSales />} />
            <Route path="menu" element={<ReportsMenu />} />
            <Route path="inventory" element={<ReportsInventory />} />
            <Route path="reconciliation" element={<ReportsReconciliation />} />
            <Route path="financial" element={<ReportsFinancial />} />
          </Route>
          {/* Customers — nested routes with Outlet */}
          <Route path="/customers" element={<Customers />}>
            <Route index element={<CustomersAll />} />
            <Route path="loyalty" element={<CustomersLoyalty />} />
            <Route path="feedback" element={<CustomersFeedback />} />
            <Route path="segments" element={<CustomersSegments />} />
          </Route>
          <Route path="/intelligence" element={<Intelligence />} />
          <Route path="/cloud-kitchen" element={<CloudKitchen />} />
          <Route path="/staff" element={<Staff />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/menu" element={<MenuManagement />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/branches" element={<MultiBranch />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
