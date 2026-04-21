import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { LayoutGrid, Truck, ShoppingBag, RefreshCw } from "lucide-react";

// ─── Tab definitions — path drives everything ───
const TABS = [
  { label: "Dine-in", icon: LayoutGrid, path: "/pos" },
  { label: "Takeaway", icon: ShoppingBag, path: "/pos/quick" },
  { label: "Delivery", icon: Truck, path: "/pos/delivery" },  
];

function tabTitle(pathname) {
  if (pathname.includes("delivery")) return "Delivery Orders";
  if (pathname.includes("quick")) return "Quick Bill";
  return "Table View";
}

export default function POS() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (tabPath) => {
    if (tabPath === "/pos") return pathname === "/pos";
    return pathname.startsWith(tabPath);
  };

  return (
    <div className="fade-in flex flex-col h-full">
      {/* ── Shared top bar ── */}
      <div className="flex items-center justify-between mb-3 bg-white px-4 py-[10px] rounded-lg border border-[#EEEEEE] flex-shrink-0">
        {/* Title + tabs */}
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-text-primary">
            {tabTitle(pathname)}
          </span>

          <div className="flex gap-[6px]">
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

        {/* Refresh */}
        <button
          className="btn-ghost py-[5px] px-[10px]"
          onClick={() => navigate(pathname)}
          title="Refresh"
        >
          <RefreshCw size={14} />
        </button>
      </div>

      {/* ── Child route renders here ── */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
