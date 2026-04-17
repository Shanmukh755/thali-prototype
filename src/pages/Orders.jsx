import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  ClipboardList,
  UtensilsCrossed,
  Globe,
  MessageSquare,
} from "lucide-react";
import { ORDERS } from "../data/mockData";

const TABS = [
  { label: "All Orders", icon: ClipboardList, path: "/orders" },
  { label: "Dine-in", icon: UtensilsCrossed, path: "/orders/dine-in" },
  { label: "Online Orders", icon: Globe, path: "/orders/online" },
  { label: "Direct Orders", icon: MessageSquare, path: "/orders/direct" },
];

function tabTitle(pathname) {
  if (pathname.includes("dine-in")) return "Dine-in Orders";
  if (pathname.includes("online")) return "Online Orders";
  if (pathname.includes("direct")) return "Direct Orders";
  return "All Orders";
}

export default function Orders() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (tabPath) => {
    if (tabPath === "/orders") return pathname === "/orders";
    return pathname.startsWith(tabPath);
  };

  const counts = {
    "/orders": ORDERS.length,
    "/orders/dine-in": ORDERS.filter((o) => o.channel === "dine-in").length,
    "/orders/online": ORDERS.filter((o) =>
      ["zomato", "swiggy", "ondc"].includes(o.channel),
    ).length,
    "/orders/direct": ORDERS.filter((o) => o.channel === "direct").length,
  };

  return (
    <div className="fade-in flex flex-col h-full">
      {/* ── Shared top bar ── */}
      <div className="flex items-center justify-between mb-3 bg-white px-4 py-[10px] rounded-lg border border-[#EEEEEE] flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="text-lg font-semibold text-text-primary">
            {tabTitle(pathname)}
          </span>
          <div className="flex gap-[5px]">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.path);
              const count = counts[tab.path];
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
                  <span
                    className={`text-[10px] font-bold rounded-full px-[5px] py-[1px] ${active ? "bg-white/20 text-white" : "bg-[#F0F0F0] text-text-muted"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Child route renders here ── */}
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
