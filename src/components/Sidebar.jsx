import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingCart,
  ClipboardList,
  Calendar,
  UtensilsCrossed,
  Package,
  ChefHat,
  Users,
  UserCircle,
  BarChart3,
  CreditCard,
  Building2,
  Megaphone,
  Bot,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Store,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  {
    section: "Main",
    items: [{ label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" }],
  },
  {
    section: "Operations",
    items: [
      {
        label: "POS / Billing",
        icon: ShoppingCart,
        path: "/pos",
        sub: [
          { label: "Table View", path: "/pos" },
          { label: "Quick Bill", path: "/pos/quick" },
          { label: "Delivery Orders", path: "/pos/delivery" },
        ],
      },
      {
        label: "Orders",
        icon: ClipboardList,
        path: "/orders",
        sub: [
          { label: "All Orders", path: "/orders" },
          { label: "Dine-in", path: "/orders/dine-in" },
          { label: "Online Orders", path: "/orders/online" },
          { label: "Direct Orders", path: "/orders/direct" },
        ],
      },
      { label: "Reservations", icon: Calendar, path: "/reservations" },
      { label: "Kitchen (KDS)", icon: ChefHat, path: "/kitchen" },
    ],
  },
  {
    section: "Menu & Inventory",
    items: [
      { label: "Menu Management", icon: UtensilsCrossed, path: "/menu" },
      {
        label: "Inventory",
        icon: Package,
        path: "/inventory",
        sub: [
          { label: "Stock Overview", path: "/inventory" },
          { label: "Recipes & Costing", path: "/inventory/recipes" },
          { label: "Purchase Orders", path: "/inventory/purchase-orders" },
          { label: "Suppliers", path: "/inventory/suppliers" },
          { label: "Waste Log", path: "/inventory/waste" },
        ],
      },
    ],
  },
  {
    section: "Customers",
    items: [
      {
        label: "Customers (CRM)",
        icon: UserCircle,
        path: "/customers",
        sub: [
          { label: "All Customers", path: "/customers" },
          { label: "Loyalty Program", path: "/customers/loyalty" },
          { label: "Feedback", path: "/customers/feedback" },
          { label: "Segments", path: "/customers/segments" },
        ],
      },
      { label: "Marketing", icon: Megaphone, path: "/marketing" },
    ],
  },
  {
    section: "Analytics",
    items: [
      {
        label: "Reports",
        icon: BarChart3,
        path: "/reports",
        sub: [
          { label: "Sales Reports", path: "/reports" },
          { label: "Menu Reports", path: "/reports/menu" },
          { label: "Inventory Reports", path: "/reports/inventory" },
          {
            label: "Aggregator Reconciliation",
            path: "/reports/reconciliation",
          },
          { label: "Financial Reports", path: "/reports/financial" },
        ],
      },
      { label: "Thali Intelligence", icon: Bot, path: "/intelligence" },
    ],
  },
  {
    section: "Business",
    items: [
      { label: "Payments", icon: CreditCard, path: "/payments" },
      { label: "Multi-Branch", icon: Building2, path: "/branches" },
      { label: "Cloud Kitchen", icon: Store, path: "/cloud-kitchen" },
      { label: "Staff", icon: Users, path: "/staff" },
    ],
  },
  {
    section: "System",
    items: [
      { label: "Settings", icon: Settings, path: "/settings" },
      { label: "Help & Support", icon: HelpCircle, path: "/help" },
    ],
  },
];

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({
    "POS / Billing": false,
    Orders: false,
    Inventory: false,
    "Customers (CRM)": false,
    Reports: false,
  });

  const toggleSection = (label) => {
    setOpenSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">T</div>
        <span className="sidebar-logo-text">Thali</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {NAV_ITEMS.map((section) => (
          <div key={section.section} className="nav-section">
            {!collapsed && (
              <div className="nav-section-label">{section.section}</div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              const hasSub = item.sub && item.sub.length > 0;
              const isOpen = openSections[item.label];
              const active = isActive(item.path);

              return (
                <div key={item.label}>
                  {hasSub ? (
                    <div
                      className={`nav-item ${active ? "active" : ""}`}
                      onClick={() => toggleSection(item.label)}
                    >
                      <Icon size={18} />
                      <span className="nav-item-label" style={{ flex: 1 }}>
                        {item.label}
                      </span>
                      {!collapsed &&
                        (isOpen ? (
                          <ChevronDown
                            size={14}
                            style={{ flexShrink: 0, color: "#999" }}
                          />
                        ) : (
                          <ChevronRight
                            size={14}
                            style={{ flexShrink: 0, color: "#999" }}
                          />
                        ))}
                    </div>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `nav-item ${isActive ? "active" : ""}`
                      }
                    >
                      <Icon size={18} />
                      <span className="nav-item-label">{item.label}</span>
                    </NavLink>
                  )}

                  {/* Sub items */}
                  {hasSub && isOpen && !collapsed && (
                    <div>
                      {item.sub.map((sub) => (
                        <NavLink
                          key={sub.path}
                          to={sub.path}
                          end
                          className={({ isActive }) =>
                            `nav-item nav-sub-item ${isActive ? "active" : ""}`
                          }
                        >
                          <span className="nav-item-label">{sub.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
