import { useState } from "react";
import {
  Menu,
  Search,
  Plus,
  Bell,
  MessageSquare,
  Globe,
  User,
  ChevronDown,
  Wifi,
  WifiOff,
  RefreshCw,
  UtensilsCrossed,
  Monitor,
  ShoppingBag,
  Clock,
  HelpCircle,
  Wallet,
  MapPin,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ICON_NAV = [
  { icon: UtensilsCrossed, label: "Menu on/off", active: true },
  { icon: Globe, label: "Store status", active: true },
  { icon: Monitor, label: "Live view", active: false },
  { icon: ShoppingBag, label: "Online orders", active: false, badge: 3 },
  { icon: Clock, label: "Hold orders", active: false, badge: 1 },
  { icon: HelpCircle, label: "Help center", active: false },
  { icon: Wallet, label: "Wallet", active: false },
  { icon: Bell, label: "Alerts", active: false, badge: 5 },
];

export default function Header({ onToggleSidebar }) {
  const [isOnline, setIsOnline] = useState(true);
  const [syncStatus] = useState("synced"); // synced | syncing | offline
  const navigate = useNavigate();

  return (
    <header className="app-header">
      {/* Left — Hamburger */}
      <button
        onClick={onToggleSidebar}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#555",
          display: "flex",
          alignItems: "center",
          padding: "4px",
          borderRadius: "6px",
        }}
        className="hover:bg-gray-100"
      >
        <Menu size={20} />
      </button>

      {/* Branch Switcher */}
      <button
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "none",
          border: "1px solid #E0E0E0",
          borderRadius: "6px",
          padding: "6px 10px",
          cursor: "pointer",
          color: "#333",
          fontSize: "13px",
          fontWeight: 500,
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <MapPin size={14} color="#CC3333" />
        <span>Koramangala</span>
        <ChevronDown size={12} color="#999" />
      </button>

      {/* Search */}
      <div className="search-wrapper" style={{ marginLeft: "4px" }}>
        <Search size={14} />
        <input
          className="search-input"
          placeholder="Bill No, Customer, Item..."
          style={{ width: "200px" }}
        />
      </div>

      {/* New Order Button */}
      <button
        className="btn-primary"
        onClick={() => navigate("/pos")}
        style={{ marginLeft: "4px" }}
      >
        <Plus size={16} />
        New Order
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Icon Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {ICON_NAV.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={`icon-btn ${item.active ? "active" : ""}`}
              title={item.label}
            >
              <div style={{ position: "relative" }}>
                <Icon size={20} />
                {item.badge && (
                  <span
                    className="badge badge-red"
                    style={{
                      position: "absolute",
                      top: "-6px",
                      right: "-6px",
                      fontSize: "9px",
                      minWidth: "14px",
                      height: "14px",
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="icon-btn-label">{item.label}</span>
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "32px",
          background: "#EEEEEE",
          margin: "0 8px",
        }}
      />

      {/* Sync Status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
        }}
        title="Sync status"
      >
        <div className={`sync-dot ${syncStatus}`} />
        <span style={{ fontSize: "11px", color: "#888" }}>
          {syncStatus === "synced"
            ? "Synced"
            : syncStatus === "syncing"
              ? "Syncing..."
              : "Offline"}
        </span>
      </div>

      {/* Online Toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer",
          padding: "4px 8px",
          borderRadius: "6px",
          background: isOnline ? "#E8F8F0" : "#FDECEA",
        }}
        onClick={() => setIsOnline(!isOnline)}
        title="Toggle store online/offline"
      >
        {isOnline ? (
          <Wifi size={14} color="#27AE60" />
        ) : (
          <WifiOff size={14} color="#E74C3C" />
        )}
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: isOnline ? "#27AE60" : "#E74C3C",
          }}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Support */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          background: "#F8F8F8",
          borderRadius: "20px",
          padding: "6px 12px",
          border: "1px solid #EEEEEE",
        }}
      >
        <div
          style={{
            width: "28px",
            height: "28px",
            borderRadius: "50%",
            background: "#CC3333",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <User size={14} color="white" />
        </div>
        <div style={{ lineHeight: 1.3 }}>
          <div style={{ fontSize: "10px", color: "#888" }}>Rajesh Kumar</div>
          <div style={{ fontSize: "11px", fontWeight: 700, color: "#CC3333" }}>
            Owner
          </div>
        </div>
        <ChevronDown size={12} color="#999" />
      </div>
    </header>
  );
}
