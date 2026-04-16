import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar collapsed={collapsed} />
      <div className="main-content">
        <Header onToggleSidebar={() => setCollapsed(!collapsed)} />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
