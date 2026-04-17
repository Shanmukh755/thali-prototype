import { useState, useRef } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import OrderNotificationSystem from "./OrderNotificationSystem";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);
  const triggerRef = useRef(null);

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} />
      <div className="main-content">
        <Header
          onToggleSidebar={() => setCollapsed(!collapsed)}
          onTriggerOrder={() => triggerRef.current?.()}
        />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <OrderNotificationSystem triggerRef={triggerRef} />
    </div>
  );
}
