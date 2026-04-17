import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Package, BookOpen, ShoppingCart, Truck, Trash2 } from "lucide-react";

const TABS = [
  { label: "Stock Overview", icon: Package, path: "/inventory" },
  { label: "Recipes & Costing", icon: BookOpen, path: "/inventory/recipes" },
  {
    label: "Purchase Orders",
    icon: ShoppingCart,
    path: "/inventory/purchase-orders",
  },
  { label: "Suppliers", icon: Truck, path: "/inventory/suppliers" },
  { label: "Waste Log", icon: Trash2, path: "/inventory/waste" },
];

function tabTitle(pathname) {
  if (pathname.includes("recipes")) return "Recipes & Costing";
  if (pathname.includes("purchase-orders")) return "Purchase Orders";
  if (pathname.includes("suppliers")) return "Suppliers";
  if (pathname.includes("waste")) return "Waste Log";
  return "Stock Overview";
}

export default function Inventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (tabPath) => {
    if (tabPath === "/inventory") return pathname === "/inventory";
    return pathname.startsWith(tabPath);
  };

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Shared top bar */}
      <div className="flex items-center justify-between mb-3 bg-white px-4 py-[10px] rounded-lg border border-[#EEEEEE] flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-text-primary">
            {tabTitle(pathname)}
          </span>
          <div className="flex gap-[5px]">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path);
              return (
                <button
                  key={tab.path}
                  onClick={() => navigate(tab.path)}
                  className={[
                    "flex items-center gap-[6px] px-3 py-[5px] rounded-md text-xs font-semibold transition-all",
                    active
                      ? "bg-primary text-white"
                      : "bg-transparent text-[#555] border border-[#E0E0E0] hover:bg-surface",
                  ].join(" ")}
                >
                  <Icon size={13} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
