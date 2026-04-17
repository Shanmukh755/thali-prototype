import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Search,
  Plus,
  Bell,
  Globe,
  User,
  ChevronDown,
  Wifi,
  WifiOff,
  UtensilsCrossed,
  Monitor,
  ShoppingBag,
  Clock,
  HelpCircle,
  Wallet,
  MapPin,
  X,
  CheckCircle,
  AlertTriangle,
  Package,
  Star,
  MessageSquare,
  ExternalLink,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { INVENTORY, ORDERS, AI_BRIEFING } from "../data/mockData";

// ─── Click-outside hook ───
function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

// ─── Dropdown wrapper ───
function Dropdown({ children, className = "" }) {
  return (
    <div
      className={`absolute top-full mt-2 bg-white rounded-xl shadow-modal border border-[#E0E0E0] z-[400] ${className}`}
    >
      {children}
    </div>
  );
}

// ─── Menu On/Off panel ───
function MenuPanel({ onClose }) {
  const [categories, setCategories] = useState([
    { name: "Starters", on: true },
    { name: "Mains", on: true },
    { name: "Breads", on: true },
    { name: "Rice & Biryani", on: true },
    { name: "Beverages", on: true },
    { name: "Desserts", on: false },
  ]);
  const toggle = (i) =>
    setCategories((prev) =>
      prev.map((c, idx) => (idx === i ? { ...c, on: !c.on } : c)),
    );
  return (
    <Dropdown className="w-[260px] right-0">
      <div className="px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">
          Menu Categories
        </p>
        <p className="text-[10px] text-text-muted mt-[1px]">
          Toggle availability on all platforms
        </p>
      </div>
      <div className="py-2">
        {categories.map((cat, i) => (
          <div
            key={cat.name}
            className="flex items-center justify-between px-4 py-2 hover:bg-surface"
          >
            <span className="text-[12px] text-text-primary">{cat.name}</span>
            <button
              onClick={() => toggle(i)}
              className={`w-8 h-[18px] rounded-full transition-colors ${cat.on ? "bg-primary" : "bg-[#CCC]"}`}
            >
              <div
                className={`w-[14px] h-[14px] rounded-full bg-white shadow transition-all mt-[2px] ${cat.on ? "ml-[18px]" : "ml-[2px]"}`}
              />
            </button>
          </div>
        ))}
      </div>
    </Dropdown>
  );
}

// ─── Store Status panel ───
function StoreStatusPanel({ isOnline, setIsOnline, onClose }) {
  return (
    <Dropdown className="w-[240px] right-0">
      <div className="px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">
          Store Status
        </p>
      </div>
      <div className="p-4 space-y-3">
        {[
          {
            label: "Open — Accepting orders",
            value: true,
            color: "border-success bg-[#E8F8F0]",
            dot: "bg-success",
          },
          {
            label: "Closed — Not accepting",
            value: false,
            color: "border-danger bg-[#FDECEA]",
            dot: "bg-danger",
          },
        ].map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => {
              setIsOnline(opt.value);
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border-2 transition-all ${isOnline === opt.value ? opt.color : "border-[#E0E0E0] bg-white"}`}
          >
            <div className={`w-3 h-3 rounded-full ${opt.dot}`} />
            <span className="text-[12px] font-medium text-text-primary">
              {opt.label}
            </span>
            {isOnline === opt.value && (
              <CheckCircle size={13} className="ml-auto text-success" />
            )}
          </button>
        ))}
        <p className="text-[10px] text-text-muted text-center">
          Changes apply to Zomato, Swiggy & ONDC
        </p>
      </div>
    </Dropdown>
  );
}

// ─── Live View panel ───
function LiveViewPanel({ onClose }) {
  const navigate = useNavigate();
  return (
    <Dropdown className="w-[220px] right-0">
      <div className="px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">Live View</p>
      </div>
      <div className="py-2">
        {[
          { label: "Table View", path: "/pos", icon: "🍽️" },
          { label: "Kitchen (KDS)", path: "/kitchen", icon: "👨‍🍳" },
          { label: "Live Orders", path: "/orders", icon: "📋" },
          { label: "Dashboard", path: "/dashboard", icon: "📊" },
        ].map((item) => (
          <button
            key={item.path}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface text-left"
          >
            <span>{item.icon}</span>
            <span className="text-[12px] text-text-primary">{item.label}</span>
            <ExternalLink size={11} className="ml-auto text-text-muted" />
          </button>
        ))}
      </div>
    </Dropdown>
  );
}

// ─── Online Orders panel ───
function OnlineOrdersPanel({ onClose }) {
  const navigate = useNavigate();
  const onlineOrders = ORDERS.filter((o) =>
    ["zomato", "swiggy", "ondc", "direct"].includes(o.channel),
  );
  const active = onlineOrders.filter((o) =>
    ["cooking", "running", "ready"].includes(o.status),
  );
  const CHANNEL_COLOR = {
    zomato: "text-[#E23744]",
    swiggy: "text-[#FC8019]",
    ondc: "text-success",
    direct: "text-[#25D366]",
  };
  return (
    <Dropdown className="w-[320px] right-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">
          Online Orders
        </p>
        <span className="text-[10px] font-bold bg-warning text-white px-2 py-[2px] rounded-full">
          {active.length} active
        </span>
      </div>
      <div className="max-h-[280px] overflow-y-auto">
        {onlineOrders.slice(0, 6).map((o) => (
          <div
            key={o.id}
            className="flex items-center gap-3 px-4 py-3 border-b border-[#F5F5F5] last:border-b-0 hover:bg-surface"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-primary">
                  {o.id}
                </span>
                <span
                  className={`text-[10px] font-semibold capitalize ${CHANNEL_COLOR[o.channel] || ""}`}
                >
                  {o.platform || o.channel}
                </span>
              </div>
              <p className="text-[10px] text-text-muted mt-[1px] truncate max-w-[180px]">
                {o.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
              </p>
            </div>
            <span
              className={`ml-auto text-[10px] font-semibold px-2 py-[2px] rounded-full flex-shrink-0 ${o.status === "cooking" ? "bg-[#FEF3E8] text-warning" : o.status === "delivered" ? "bg-[#F5F5F5] text-[#888]" : "bg-[#E8F8F0] text-success"}`}
            >
              {o.status}
            </span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-[#F0F0F0]">
        <button
          onClick={() => {
            navigate("/orders/online");
            onClose();
          }}
          className="btn-primary w-full justify-center text-xs py-[7px]"
        >
          View All Online Orders
        </button>
      </div>
    </Dropdown>
  );
}

// ─── Hold Orders panel ───
function HoldOrdersPanel({ onClose }) {
  const [held, setHeld] = useState([
    {
      id: "H-001",
      table: "Table 3",
      items: "Butter Chicken, Naan ×2",
      amount: 420,
      heldAt: "7:45 PM",
    },
    {
      id: "H-002",
      table: "Counter",
      items: "Chicken Biryani ×1",
      amount: 340,
      heldAt: "8:02 PM",
    },
  ]);
  return (
    <Dropdown className="w-[300px] right-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">
          Hold Orders
        </p>
        <span className="text-[10px] font-bold bg-[#FEF3E8] text-warning px-2 py-[2px] rounded-full">
          {held.length} on hold
        </span>
      </div>
      {held.length === 0 ? (
        <div className="px-4 py-6 text-center text-[12px] text-text-muted">
          No orders on hold
        </div>
      ) : (
        <div>
          {held.map((h) => (
            <div
              key={h.id}
              className="flex items-center gap-3 px-4 py-3 border-b border-[#F5F5F5] last:border-b-0"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-primary">
                    {h.table}
                  </span>
                  <span className="text-[10px] text-text-muted">
                    {h.heldAt}
                  </span>
                </div>
                <p className="text-[10px] text-text-muted truncate">
                  {h.items}
                </p>
              </div>
              <span className="text-[12px] font-semibold flex-shrink-0">
                ₹{h.amount}
              </span>
              <button
                onClick={() =>
                  setHeld((prev) => prev.filter((x) => x.id !== h.id))
                }
                className="btn-primary text-[10px] py-[3px] px-2 flex-shrink-0"
              >
                Resume
              </button>
            </div>
          ))}
        </div>
      )}
    </Dropdown>
  );
}

// ─── Alerts panel ───
function AlertsPanel({ onClose }) {
  const navigate = useNavigate();
  const lowStock = INVENTORY.filter(
    (i) => i.status === "critical" || i.status === "low",
  );
  const alerts = [
    ...AI_BRIEFING.alerts.map((a) => ({
      type: a.type,
      icon: a.icon,
      text: a.text,
      action: null,
    })),
    ...lowStock.map((i) => ({
      type: "warning",
      icon: "📦",
      text: `${i.name}: ${i.current}${i.unit} left (min: ${i.min}${i.unit})`,
      action: "/inventory",
    })),
  ];
  return (
    <Dropdown className="w-[320px] right-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">Alerts</p>
        <span className="text-[10px] font-bold bg-[#FDECEA] text-danger px-2 py-[2px] rounded-full">
          {alerts.length}
        </span>
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {alerts.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 px-4 py-3 border-b border-[#F5F5F5] last:border-b-0 ${a.type === "urgent" ? "bg-[#FDECEA]" : a.type === "warning" ? "bg-[#FEF3E8]" : "bg-white"} hover:opacity-90`}
          >
            <span className="text-base flex-shrink-0">{a.icon}</span>
            <p className="text-[11px] text-text-primary leading-relaxed flex-1">
              {a.text}
            </p>
            {a.action && (
              <button
                onClick={() => {
                  navigate(a.action);
                  onClose();
                }}
                className="text-[10px] text-primary font-semibold flex-shrink-0"
              >
                View
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-[#F0F0F0]">
        <button
          onClick={() => {
            navigate("/intelligence");
            onClose();
          }}
          className="btn-outline w-full justify-center text-xs py-[6px]"
        >
          View All in Intelligence
        </button>
      </div>
    </Dropdown>
  );
}

// ─── Wallet panel ───
function WalletPanel({ onClose }) {
  const navigate = useNavigate();
  return (
    <Dropdown className="w-[260px] right-0">
      <div className="px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">Thali Pay</p>
      </div>
      <div className="p-4 space-y-3">
        <div
          className="rounded-xl p-4 text-white text-center"
          style={{ background: "linear-gradient(135deg,#CC3333,#A93226)" }}
        >
          <p className="text-[10px] text-white/70 mb-1">Today's Collections</p>
          <p className="text-[24px] font-bold">₹42,800</p>
          <p className="text-[10px] text-white/70 mt-1">
            UPI ₹22.6k · Cash ₹12.4k · Card ₹7.8k
          </p>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-text-muted">Pending Settlement</span>
          <span className="font-semibold text-warning">₹30,400</span>
        </div>
        <div className="flex justify-between text-[12px]">
          <span className="text-text-muted">Thali Earn (0.3%)</span>
          <span className="font-semibold text-success">+₹128</span>
        </div>
        <button
          onClick={() => {
            navigate("/payments");
            onClose();
          }}
          className="btn-primary w-full justify-center text-xs py-[7px]"
        >
          Open Payments
        </button>
      </div>
    </Dropdown>
  );
}

// ─── Help Center panel ───
function HelpCenterPanel({ onClose }) {
  const navigate = useNavigate();
  return (
    <Dropdown className="w-[240px] right-0">
      <div className="px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">
          Help Center
        </p>
      </div>
      <div className="py-2">
        {[
          {
            label: "Live Chat Support",
            icon: MessageSquare,
            path: "/help",
            badge: "18 min avg",
          },
          {
            label: "Video Tutorials",
            icon: Monitor,
            path: "/help",
            badge: null,
          },
          { label: "FAQ", icon: HelpCircle, path: "/help", badge: null },
          { label: "What's New", icon: Star, path: "/help", badge: "v2.4.1" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
              className="w-full flex items-center gap-3 px-4 py-2 hover:bg-surface text-left"
            >
              <Icon size={14} className="text-text-muted" />
              <span className="text-[12px] text-text-primary flex-1">
                {item.label}
              </span>
              {item.badge && (
                <span className="text-[9px] font-semibold bg-[#EBF5FB] text-info px-[5px] py-[1px] rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
      <div className="px-4 py-3 border-t border-[#F0F0F0]">
        <div className="flex items-center gap-2 text-[11px] text-success font-semibold">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          Support Online · SLA: 30 min
        </div>
      </div>
    </Dropdown>
  );
}

// ─── User profile dropdown ───
function UserDropdown({ onClose }) {
  const navigate = useNavigate();
  return (
    <Dropdown className="w-[200px] right-0">
      <div className="px-4 py-3 border-b border-[#F0F0F0]">
        <p className="text-[13px] font-semibold text-text-primary">
          Rajesh Kumar
        </p>
        <p className="text-[10px] text-text-muted">Owner · Spice Garden</p>
      </div>
      <div className="py-2">
        {[
          { label: "My Profile", path: "/settings" },
          { label: "Settings", path: "/settings" },
          { label: "Subscription", path: "/settings" },
          { label: "Help & Support", path: "/help" },
        ].map((item) => (
          <button
            key={item.label}
            onClick={() => {
              navigate(item.path);
              onClose();
            }}
            className="w-full text-left px-4 py-2 text-[12px] text-text-primary hover:bg-surface"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-[#F0F0F0]">
        <button
          onClick={() => {
            navigate("/login");
            onClose();
          }}
          className="w-full text-left text-[12px] text-danger font-semibold"
        >
          Sign Out
        </button>
      </div>
    </Dropdown>
  );
}

export default function Header({ onToggleSidebar, onTriggerOrder }) {
  const [isOnline, setIsOnline] = useState(true);
  const [menuOn, setMenuOn] = useState(true);
  const [openPanel, setOpenPanel] = useState(null); // which dropdown is open
  const navigate = useNavigate();
  const panelRef = useRef(null);

  useClickOutside(panelRef, () => setOpenPanel(null));

  const toggle = (name) =>
    setOpenPanel((prev) => (prev === name ? null : name));

  // Online orders count
  const onlineOrderCount = ORDERS.filter(
    (o) =>
      ["zomato", "swiggy", "ondc", "direct"].includes(o.channel) &&
      ["cooking", "running", "ready"].includes(o.status),
  ).length;
  const alertCount =
    AI_BRIEFING.alerts.length +
    INVENTORY.filter((i) => i.status === "critical" || i.status === "low")
      .length;

  return (
    <header className="app-header" ref={panelRef}>
      {/* Hamburger */}
      <button
        onClick={onToggleSidebar}
        className="p-1 rounded-md text-[#555] hover:bg-surface transition-colors"
      >
        <Menu size={20} />
      </button>

      {/* Branch switcher */}
      <button className="flex items-center gap-[6px] border border-[#E0E0E0] rounded-md px-[10px] py-[6px] text-[13px] font-medium text-[#333] hover:bg-surface transition-colors">
        <MapPin size={14} className="text-primary" />
        <span>Koramangala</span>
        <ChevronDown size={12} className="text-[#999]" />
      </button>

      {/* Search */}
      <div className="search-wrapper ml-1">
        <Search size={14} />
        <input
          className="search-input"
          placeholder="Bill No, Customer, Item..."
          style={{ width: "200px" }}
        />
      </div>

      {/* New Order */}
      <button className="btn-primary ml-1" onClick={() => navigate("/pos")}>
        <Plus size={16} /> New Order
      </button>

      {/* ── Demo trigger — simulates incoming online order ── */}
      <button
        onClick={onTriggerOrder}
        className="flex items-center gap-[6px] ml-1 px-3 py-[7px] rounded-lg text-[11px] font-bold border-2 border-dashed border-[#E23744] text-[#E23744] bg-[#FDE8EA] hover:bg-[#FBBCBC] transition-colors"
        title="Simulate incoming online order (demo)"
      >
        🔴 Simulate Order
      </button>

      <div className="flex-1" />

      {/* ── Icon Nav ── */}
      <div className="flex items-center gap-[2px] relative">
        {/* Menu on/off */}
        <div className="relative">
          <button
            onClick={() => toggle("menu")}
            className={`icon-btn ${menuOn ? "active" : ""}`}
            title="Menu on/off"
          >
            <UtensilsCrossed size={20} />
            <span className="icon-btn-label">Menu {menuOn ? "On" : "Off"}</span>
          </button>
          {openPanel === "menu" && (
            <MenuPanel onClose={() => setOpenPanel(null)} />
          )}
        </div>

        {/* Store status */}
        <div className="relative">
          <button
            onClick={() => toggle("store")}
            className={`icon-btn ${isOnline ? "active" : ""}`}
            title="Store status"
          >
            <Globe size={20} />
            <span className="icon-btn-label">
              Store {isOnline ? "Open" : "Closed"}
            </span>
          </button>
          {openPanel === "store" && (
            <StoreStatusPanel
              isOnline={isOnline}
              setIsOnline={setIsOnline}
              onClose={() => setOpenPanel(null)}
            />
          )}
        </div>

        {/* Live view */}
        <div className="relative">
          <button
            onClick={() => toggle("live")}
            className="icon-btn"
            title="Live view"
          >
            <Monitor size={20} />
            <span className="icon-btn-label">Live view</span>
          </button>
          {openPanel === "live" && (
            <LiveViewPanel onClose={() => setOpenPanel(null)} />
          )}
        </div>

        {/* Online orders */}
        <div className="relative">
          <button
            onClick={() => toggle("online")}
            className="icon-btn"
            title="Online orders"
          >
            <div className="relative">
              <ShoppingBag size={20} />
              {onlineOrderCount > 0 && (
                <span className="badge badge-red absolute -top-[6px] -right-[6px] text-[9px] min-w-[14px] h-[14px]">
                  {onlineOrderCount}
                </span>
              )}
            </div>
            <span className="icon-btn-label">Online orders</span>
          </button>
          {openPanel === "online" && (
            <OnlineOrdersPanel onClose={() => setOpenPanel(null)} />
          )}
        </div>

        {/* Hold orders */}
        <div className="relative">
          <button
            onClick={() => toggle("hold")}
            className="icon-btn"
            title="Hold orders"
          >
            <div className="relative">
              <Clock size={20} />
              <span className="badge badge-red absolute -top-[6px] -right-[6px] text-[9px] min-w-[14px] h-[14px]">
                1
              </span>
            </div>
            <span className="icon-btn-label">Hold orders</span>
          </button>
          {openPanel === "hold" && (
            <HoldOrdersPanel onClose={() => setOpenPanel(null)} />
          )}
        </div>

        {/* Help center */}
        <div className="relative">
          <button
            onClick={() => toggle("help")}
            className="icon-btn"
            title="Help center"
          >
            <HelpCircle size={20} />
            <span className="icon-btn-label">Help center</span>
          </button>
          {openPanel === "help" && (
            <HelpCenterPanel onClose={() => setOpenPanel(null)} />
          )}
        </div>

        {/* Wallet */}
        <div className="relative">
          <button
            onClick={() => toggle("wallet")}
            className="icon-btn"
            title="Wallet"
          >
            <Wallet size={20} />
            <span className="icon-btn-label">Wallet</span>
          </button>
          {openPanel === "wallet" && (
            <WalletPanel onClose={() => setOpenPanel(null)} />
          )}
        </div>

        {/* Alerts */}
        <div className="relative">
          <button
            onClick={() => toggle("alerts")}
            className="icon-btn"
            title="Alerts"
          >
            <div className="relative">
              <Bell size={20} />
              {alertCount > 0 && (
                <span className="badge badge-red absolute -top-[6px] -right-[6px] text-[9px] min-w-[14px] h-[14px]">
                  {alertCount}
                </span>
              )}
            </div>
            <span className="icon-btn-label">Alerts</span>
          </button>
          {openPanel === "alerts" && (
            <AlertsPanel onClose={() => setOpenPanel(null)} />
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-[#EEEEEE] mx-2" />

      {/* Sync status */}
      <div
        className="flex items-center gap-[6px] cursor-pointer"
        title="Sync status"
      >
        <div className="sync-dot synced" />
        <span className="text-[11px] text-[#888]">Synced</span>
      </div>

      {/* Online/Offline toggle */}
      <button
        onClick={() => setIsOnline(!isOnline)}
        className={`flex items-center gap-[6px] px-2 py-1 rounded-md transition-colors ${isOnline ? "bg-[#E8F8F0]" : "bg-[#FDECEA]"}`}
        title="Toggle store online/offline"
      >
        {isOnline ? (
          <Wifi size={14} className="text-success" />
        ) : (
          <WifiOff size={14} className="text-danger" />
        )}
        <span
          className={`text-[11px] font-semibold ${isOnline ? "text-success" : "text-danger"}`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </button>

      {/* User profile */}
      <div className="relative">
        <button
          onClick={() => toggle("user")}
          className="flex items-center gap-2 bg-surface rounded-[20px] px-3 py-[6px] border border-[#EEEEEE] hover:bg-[#F0F0F0] transition-colors"
        >
          <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <User size={14} color="white" />
          </div>
          <div className="leading-tight">
            <p className="text-[10px] text-[#888]">Rajesh Kumar</p>
            <p className="text-[11px] font-bold text-primary">Owner</p>
          </div>
          <ChevronDown size={12} className="text-[#999]" />
        </button>
        {openPanel === "user" && (
          <UserDropdown onClose={() => setOpenPanel(null)} />
        )}
      </div>
    </header>
  );
}
