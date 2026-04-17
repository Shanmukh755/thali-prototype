import { useState, useRef, useEffect } from "react";
import {
  Phone,
  Search,
  Plus,
  Minus,
  X,
  Star,
  RotateCcw,
  Hash,
  CheckCircle,
  Printer,
  Trash2,
  ChevronRight,
  User,
} from "lucide-react";
import {
  MENU_ITEMS,
  MENU_CATEGORIES,
  CUSTOMERS,
  QUICK_BILL_ORDERS,
} from "../../data/mockData";
import PaymentModal from "./PaymentModal";

// ─── Tier config ───
const TIER_CONFIG = {
  Platinum: {
    bg: "bg-[#F3F3F3]",
    text: "text-[#555]",
    border: "border-[#E5E4E2]",
    icon: "💎",
  },
  Gold: {
    bg: "bg-[#FFFDE7]",
    text: "text-[#F9A825]",
    border: "border-[#FFD54F]",
    icon: "🥇",
  },
  Silver: {
    bg: "bg-[#F5F5F5]",
    text: "text-[#757575]",
    border: "border-[#BDBDBD]",
    icon: "🥈",
  },
  Bronze: {
    bg: "bg-[#FDF3E7]",
    text: "text-[#CD7F32]",
    border: "border-[#FFCC80]",
    icon: "🥉",
  },
};

// ─── Veg indicator ───
function VegDot({ veg }) {
  return (
    <div
      className={`w-[13px] h-[13px] rounded-sm border-[1.5px] flex items-center justify-center flex-shrink-0 ${veg ? "border-success" : "border-danger"}`}
    >
      {veg ? (
        <div className="w-[5px] h-[5px] rounded-full bg-success" />
      ) : (
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: "3px solid transparent",
            borderRight: "3px solid transparent",
            borderBottom: "6px solid #E74C3C",
          }}
        />
      )}
    </div>
  );
}

// ─── Customer lookup card ───
function CustomerCard({ customer, onRepeatOrder, onDismiss }) {
  const tier = TIER_CONFIG[customer.tier] || TIER_CONFIG.Bronze;
  return (
    <div className={`rounded-lg border p-3 mb-3 ${tier.bg} ${tier.border}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-bold">
              {customer.name[0]}
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-text-primary truncate">
                {customer.name}
              </p>
              <span
                className={`text-[10px] font-bold px-[6px] py-[1px] rounded-full border ${tier.bg} ${tier.text} ${tier.border}`}
              >
                {tier.icon} {customer.tier}
              </span>
            </div>
            <p className="text-[11px] text-text-muted mt-[1px]">
              {customer.visits} visits · ₹
              {customer.totalSpent.toLocaleString("en-IN")} lifetime
            </p>
          </div>
        </div>
        <button
          onClick={onDismiss}
          className="text-text-muted hover:text-text-primary flex-shrink-0"
        >
          <X size={14} />
        </button>
      </div>

      {/* Loyalty points */}
      <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
        <div className="flex items-center gap-1">
          <Star size={11} className="text-[#F9A825]" fill="#F9A825" />
          <span className="text-[11px] font-semibold text-text-secondary">
            {customer.loyaltyPoints} pts
          </span>
          <span className="text-[10px] text-text-muted">
            · Fav: {customer.favoriteItem}
          </span>
        </div>
        <button
          onClick={onRepeatOrder}
          className="flex items-center gap-1 text-[10px] font-semibold text-primary border border-primary rounded px-2 py-[3px] hover:bg-primary hover:text-white transition-colors"
        >
          <RotateCcw size={10} /> Repeat Last Order
        </button>
      </div>
    </div>
  );
}

// ─── AI combo suggestion banner ───
function ComboSuggestion({ text, price, onAdd, onDismiss }) {
  return (
    <div className="flex items-center gap-2 bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-3 py-2 mb-3">
      <span className="text-base flex-shrink-0">💡</span>
      <p className="flex-1 text-[11px] text-[#5D4037] font-medium leading-tight">
        {text}
      </p>
      <span className="text-[11px] font-bold text-primary flex-shrink-0">
        +₹{price}
      </span>
      <button
        onClick={onAdd}
        className="text-[10px] font-semibold text-white bg-primary rounded px-2 py-[3px] hover:bg-primary-dark transition-colors flex-shrink-0"
      >
        Add
      </button>
      <button
        onClick={onDismiss}
        className="text-text-muted hover:text-text-primary flex-shrink-0"
      >
        <X size={11} />
      </button>
    </div>
  );
}

// ─── Pending order token card ───
function PendingOrderCard({ order, onSelect, onComplete }) {
  const total = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = Math.round(total * 0.05);
  return (
    <div
      className={`rounded-lg border p-3 cursor-pointer transition-all hover:shadow-md ${
        order.status === "ready"
          ? "border-success bg-[#E8F8F0]"
          : "border-[#E0E0E0] bg-white hover:border-primary"
      }`}
      onClick={() => onSelect(order)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold">#{order.token}</span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-text-primary">
              {order.customer}
            </p>
            <p className="text-[10px] text-text-muted">{order.time}</p>
          </div>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${
            order.status === "ready"
              ? "bg-[#E8F8F0] text-success border border-success"
              : "bg-[#FEF3E8] text-warning border border-warning"
          }`}
        >
          {order.status === "ready" ? "✅ Ready" : "⏳ Pending"}
        </span>
      </div>
      <p className="text-[11px] text-text-muted truncate mb-2">
        {order.items.map((i) => `${i.name} ×${i.qty}`).join(", ")}
      </p>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-bold text-text-primary">
          ₹{(total + gst).toLocaleString("en-IN")}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onComplete(order);
          }}
          className="text-[10px] font-semibold text-white bg-primary rounded px-2 py-[3px] hover:bg-primary-dark transition-colors"
        >
          Collect Payment
        </button>
      </div>
    </div>
  );
}

// ─── Menu item card ───
function MenuCard({ item, qty, onAdd, onRemove }) {
  return (
    <div
      onClick={() => onAdd(item)}
      className={`rounded-lg border p-[10px] cursor-pointer transition-all duration-150 ${
        qty > 0
          ? "border-primary bg-[#FFF5F5]"
          : "border-[#E0E0E0] bg-white hover:border-primary hover:bg-[#FFF5F5]"
      }`}
    >
      <div className="flex justify-between items-start mb-1">
        <VegDot veg={item.veg} />
        {qty > 0 && (
          <span className="text-[10px] font-bold text-primary bg-white px-[5px] py-[1px] rounded border border-primary">
            ×{qty}
          </span>
        )}
      </div>
      <p className="text-[12px] font-medium text-text-primary leading-tight mb-1 mt-1">
        {item.name}
      </p>
      <p className="text-[13px] font-bold text-primary">₹{item.price}</p>
    </div>
  );
}

// ─── Main QuickBill ───
export default function QuickBill() {
  const [phone, setPhone] = useState("");
  const [customer, setCustomer] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Favourites");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCombo, setShowCombo] = useState(true);
  const [pendingOrders, setPendingOrders] = useState(QUICK_BILL_ORDERS);
  const [paymentTarget, setPaymentTarget] = useState(null); // { label, items }
  const [tokenCounter, setTokenCounter] = useState(19);
  const [lastBilled, setLastBilled] = useState(null);
  const phoneRef = useRef(null);

  // Auto-focus phone on mount
  useEffect(() => {
    phoneRef.current?.focus();
  }, []);

  // ── Phone lookup ──
  const handlePhoneLookup = (val) => {
    setPhone(val);
    if (val.replace(/\D/g, "").length >= 5) {
      const found = CUSTOMERS.find((c) =>
        c.phone.replace(/\D/g, "").includes(val.replace(/\D/g, "")),
      );
      setCustomer(found || null);
    } else {
      setCustomer(null);
    }
  };

  // ── Repeat last order ──
  const handleRepeatOrder = () => {
    if (!customer) return;
    // Simulate last order based on favourite item
    const fav = MENU_ITEMS.find((i) => i.name === customer.favoriteItem);
    if (fav) {
      setOrderItems([{ ...fav, qty: 1 }]);
      setActiveCategory(fav.category);
    }
  };

  // ── Add / remove items ──
  const addItem = (item) => {
    setOrderItems((prev) => {
      const ex = prev.find((i) => i.id === item.id);
      if (ex)
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setOrderItems((prev) => {
      const ex = prev.find((i) => i.id === id);
      if (ex?.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const clearOrder = () => setOrderItems([]);

  // ── Send to kitchen (add to pending queue) ──
  const handleSendKOT = () => {
    if (orderItems.length === 0) return;
    const newOrder = {
      id: `QB-0${tokenCounter}`,
      token: tokenCounter,
      customer: customer?.name || "Walk-in",
      items: orderItems,
      status: "pending",
      time: new Date().toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setPendingOrders((prev) => [newOrder, ...prev]);
    setTokenCounter((n) => n + 1);
    setLastBilled(newOrder.token);
    setOrderItems([]);
    setCustomer(null);
    setPhone("");
    setTimeout(() => setLastBilled(null), 3000);
  };

  // ── Open payment for current order ──
  const handleCollectPayment = () => {
    if (orderItems.length === 0) return;
    setPaymentTarget({
      label: customer?.name || `Token #${tokenCounter}`,
      items: orderItems,
    });
  };

  // ── Open payment for a pending order ──
  const handlePendingPayment = (order) => {
    setPaymentTarget({
      label: `Token #${order.token} — ${order.customer}`,
      items: order.items,
    });
  };

  // ── Confirm payment ──
  const handleConfirmPayment = () => {
    if (paymentTarget?.items === orderItems) {
      // Current order
      setOrderItems([]);
      setCustomer(null);
      setPhone("");
    } else {
      // Pending order
      setPendingOrders((prev) =>
        prev.filter((o) => o.items !== paymentTarget?.items),
      );
    }
    setPaymentTarget(null);
  };

  // ── Filtered menu ──
  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      item.category === activeCategory &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ── Totals ──
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = orderItems.reduce((s, i) => s + i.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  // ── AI combo suggestion ──
  const hasBiryani = orderItems.some((i) => i.name.includes("Biryani"));
  const hasRaita = orderItems.some((i) => i.name === "Mango Lassi");
  const comboSuggestion =
    hasBiryani && !hasRaita && showCombo
      ? {
          text: "72% of Biryani orders include Mango Lassi — add it?",
          price: 120,
          item: { id: 25, name: "Mango Lassi", price: 120, qty: 1, veg: true },
        }
      : null;

  return (
    <div className="flex h-full gap-4 overflow-hidden">
      {/* ══════════════════════════════════════════
          LEFT PANEL — Pending orders queue
      ══════════════════════════════════════════ */}
      <div className="w-[240px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto">
        {/* Header */}
        <div className="bg-white rounded-lg border border-[#EEEEEE] px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-text-primary">
              Pending Orders
            </p>
            <span className="text-[10px] font-bold bg-warning text-white rounded-full px-2 py-[2px]">
              {pendingOrders.length}
            </span>
          </div>
          <p className="text-[10px] text-text-muted mt-1">
            Click to load · Pay to complete
          </p>
        </div>

        {/* Token success flash */}
        {lastBilled && (
          <div className="bg-[#E8F8F0] border border-success rounded-lg px-3 py-2 flex items-center gap-2">
            <CheckCircle size={14} className="text-success" />
            <p className="text-[11px] font-semibold text-success">
              Token #{lastBilled} sent to kitchen!
            </p>
          </div>
        )}

        {/* Pending list */}
        <div className="flex flex-col gap-2">
          {pendingOrders.map((order) => (
            <PendingOrderCard
              key={order.id}
              order={order}
              onSelect={(o) => {
                setOrderItems(o.items.map((i) => ({ ...i })));
                setCustomer(
                  CUSTOMERS.find((c) => c.name === o.customer) || null,
                );
              }}
              onComplete={handlePendingPayment}
            />
          ))}
          {pendingOrders.length === 0 && (
            <div className="text-center py-8 text-text-muted">
              <Hash size={28} className="mx-auto mb-2 opacity-30" />
              <p className="text-xs">No pending orders</p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          CENTER PANEL — Menu + order builder
      ══════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ── Phone lookup bar ── */}
        <div className="bg-white rounded-lg border border-[#EEEEEE] px-4 py-3 mb-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            {/* Phone input */}
            <div className="relative flex-1 max-w-[280px]">
              <Phone
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
              <input
                ref={phoneRef}
                type="tel"
                className="form-input pl-9 text-[13px]"
                placeholder="Phone number for CRM lookup..."
                value={phone}
                onChange={(e) => handlePhoneLookup(e.target.value)}
              />
            </div>

            {/* Search */}
            <div className="relative flex-1">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
              />
              <input
                className="form-input pl-9 text-[13px] w-full"
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Token display */}
            <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2 border border-[#E0E0E0] flex-shrink-0">
              <Hash size={13} className="text-text-muted" />
              <span className="text-[12px] font-semibold text-text-primary">
                Token #{tokenCounter}
              </span>
            </div>
          </div>

          {/* Customer card — appears on lookup match */}
          {customer && (
            <div className="mt-3">
              <CustomerCard
                customer={customer}
                onRepeatOrder={handleRepeatOrder}
                onDismiss={() => {
                  setCustomer(null);
                  setPhone("");
                }}
              />
            </div>
          )}

          {/* No customer found hint */}
          {phone.replace(/\D/g, "").length >= 5 && !customer && (
            <div className="mt-2 flex items-center gap-2 text-[11px] text-text-muted">
              <User size={12} />
              <span>New customer — profile will be created on billing</span>
            </div>
          )}
        </div>

        {/* ── Category tabs ── */}
        <div className="bg-white rounded-t-lg border border-b-0 border-[#EEEEEE] overflow-x-auto flex-shrink-0">
          <div className="flex px-4">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={[
                  "px-[14px] py-[10px] text-xs whitespace-nowrap border-b-2 transition-colors font-sans",
                  activeCategory === cat
                    ? "border-primary text-primary font-semibold"
                    : "border-transparent text-[#666] hover:text-primary",
                ].join(" ")}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── AI combo suggestion ── */}
        {comboSuggestion && (
          <div className="bg-white border-x border-[#EEEEEE] px-4 pt-3 flex-shrink-0">
            <ComboSuggestion
              text={comboSuggestion.text}
              price={comboSuggestion.price}
              onAdd={() => {
                addItem(comboSuggestion.item);
                setShowCombo(false);
              }}
              onDismiss={() => setShowCombo(false)}
            />
          </div>
        )}

        {/* ── Menu grid ── */}
        <div className="flex-1 overflow-y-auto bg-white border border-[#EEEEEE] rounded-b-lg px-4 py-3">
          <div className="grid grid-cols-4 gap-2">
            {filteredItems.map((item) => {
              const inOrder = orderItems.find((i) => i.id === item.id);
              return (
                <MenuCard
                  key={item.id}
                  item={item}
                  qty={inOrder?.qty || 0}
                  onAdd={addItem}
                  onRemove={removeItem}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          RIGHT PANEL — Order summary + actions
      ══════════════════════════════════════════ */}
      <div className="w-[280px] flex-shrink-0 flex flex-col bg-white rounded-lg border border-[#EEEEEE] overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-[#EEEEEE] flex items-center justify-between flex-shrink-0">
          <p className="text-[14px] font-semibold text-text-primary">
            {customer ? customer.name : "Walk-in Order"}
          </p>
          {orderItems.length > 0 && (
            <button
              onClick={clearOrder}
              className="text-text-muted hover:text-danger transition-colors"
              title="Clear order"
            >
              <Trash2 size={14} />
            </button>
          )}
        </div>

        {/* Order lines */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {orderItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-8">
              <ShoppingBagIcon />
              <p className="text-xs text-text-muted mt-3">
                Add items from the menu
              </p>
              <p className="text-[10px] text-text-muted mt-1">
                or enter phone to load last order
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {orderItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <VegDot veg={item.veg} />
                  <span className="flex-1 text-[12px] text-text-primary leading-tight">
                    {item.name}
                  </span>
                  <div className="flex items-center gap-[5px]">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="w-5 h-5 rounded-full border border-[#E0E0E0] flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    >
                      <Minus size={9} />
                    </button>
                    <span className="text-[12px] font-semibold min-w-[16px] text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => addItem(item)}
                      className="w-5 h-5 rounded-full bg-primary border border-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
                    >
                      <Plus size={9} color="white" />
                    </button>
                  </div>
                  <span className="text-[11px] font-semibold min-w-[44px] text-right text-text-primary">
                    ₹{(item.price * item.qty).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Totals */}
        {orderItems.length > 0 && (
          <div className="px-4 py-3 border-t border-[#F0F0F0] flex-shrink-0">
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-[11px] text-text-muted">
                <span>Subtotal ({itemCount} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[11px] text-text-muted">
                <span>GST (5%)</span>
                <span>₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[15px] font-bold pt-1 border-t border-[#F0F0F0]">
                <span>Total</span>
                <span className="text-primary">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Loyalty points earned */}
            {customer && (
              <div className="flex items-center gap-1 mb-3 text-[10px] text-[#F9A825]">
                <Star size={10} fill="#F9A825" />
                <span className="font-medium">
                  +{Math.floor(grandTotal / 10)} pts for {customer.name} ·
                  Total: {customer.loyaltyPoints + Math.floor(grandTotal / 10)}{" "}
                  pts
                </span>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-2">
              <button
                onClick={handleSendKOT}
                className="btn-outline w-full justify-center text-xs py-[8px]"
              >
                <Printer size={13} />
                Send KOT · Token #{tokenCounter}
              </button>
              <button
                onClick={handleCollectPayment}
                className="btn-primary w-full justify-center text-xs py-[8px]"
              >
                Collect ₹{grandTotal.toLocaleString("en-IN")}
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Payment Modal ── */}
      {paymentTarget && (
        <PaymentModal
          table={{ name: paymentTarget.label, section: "Counter" }}
          items={paymentTarget.items}
          onClose={() => setPaymentTarget(null)}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
}

// ─── Inline shopping bag icon (avoids import conflict) ───
function ShoppingBagIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CCCCCC"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
