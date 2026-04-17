import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Users, Star, MessageSquare, Filter } from "lucide-react";
import { CUSTOMERS } from "../data/mockData";

const TABS = [
  { label: "All Customers", icon: Users, path: "/customers" },
  { label: "Loyalty Program", icon: Star, path: "/customers/loyalty" },
  { label: "Feedback", icon: MessageSquare, path: "/customers/feedback" },
  { label: "Segments", icon: Filter, path: "/customers/segments" },
];

function tabTitle(pathname) {
  if (pathname.includes("loyalty")) return "Loyalty Program";
  if (pathname.includes("feedback")) return "Feedback";
  if (pathname.includes("segments")) return "Segments";
  return "Customers (CRM)";
}

export default function Customers() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (tabPath) => {
    if (tabPath === "/customers") return pathname === "/customers";
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
        <div className="text-xs text-text-muted">
          <span className="font-semibold text-text-primary">
            {CUSTOMERS.length}
          </span>{" "}
          customers shown
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
