import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  TrendingUp,
  UtensilsCrossed,
  Package,
  AlertTriangle,
  DollarSign,
  Download,
} from "lucide-react";

const TABS = [
  { label: "Sales Reports", icon: TrendingUp, path: "/reports" },
  { label: "Menu Reports", icon: UtensilsCrossed, path: "/reports/menu" },
  { label: "Inventory Reports", icon: Package, path: "/reports/inventory" },
  {
    label: "⚠️ Reconciliation",
    icon: AlertTriangle,
    path: "/reports/reconciliation",
  },
  { label: "Financial Reports", icon: DollarSign, path: "/reports/financial" },
];

function tabTitle(pathname) {
  if (pathname.includes("menu")) return "Menu Reports";
  if (pathname.includes("inventory")) return "Inventory Reports";
  if (pathname.includes("reconciliation")) return "Aggregator Reconciliation";
  if (pathname.includes("financial")) return "Financial Reports";
  return "Sales Reports";
}

export default function Reports() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (tabPath) => {
    if (tabPath === "/reports") return pathname === "/reports";
    return pathname.startsWith(tabPath);
  };

  return (
    <div className="fade-in flex flex-col h-full">
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
        <button className="btn-ghost text-xs py-[5px] px-3">
          <Download size={13} /> Export All
        </button>
      </div>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
