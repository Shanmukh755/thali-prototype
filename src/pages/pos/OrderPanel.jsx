import { useState } from "react";
import { X, Search, Plus, Minus, ChevronRight } from "lucide-react";
import { MENU_ITEMS, MENU_CATEGORIES } from "../../data/mockData";

// ─── Veg / Non-veg indicator ───
function VegIndicator({ veg }) {
  return (
    <div
      className={[
        "w-[14px] h-[14px] rounded-sm border-[1.5px] flex items-center justify-center flex-shrink-0",
        veg ? "border-success" : "border-danger",
      ].join(" ")}
    >
      <div
        className={[
          "rounded-full",
          veg ? "w-[6px] h-[6px] bg-success" : "",
        ].join(" ")}
        style={
          !veg
            ? {
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderBottom: "7px solid #E74C3C",
              }
            : {}
        }
      />
    </div>
  );
}

// ─── AI Upsell Banner ───
function UpsellBanner({ suggestion, onAdd, onDismiss }) {
  if (!suggestion) return null;
  return (
    <div className="mx-4 mb-3 flex items-center gap-3 bg-[#FFF8E1] border border-[#FFD54F] rounded-lg px-3 py-2">
      <span className="text-base">💡</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-[#5D4037] font-medium leading-tight">
          {suggestion.text}
        </p>
      </div>
      <button
        onClick={onAdd}
        className="text-xs font-semibold text-primary border border-primary rounded px-2 py-1 hover:bg-primary hover:text-white transition-colors flex-shrink-0"
      >
        Add
      </button>
      <button
        onClick={onDismiss}
        className="text-text-muted hover:text-text-primary"
      >
        <X size={12} />
      </button>
    </div>
  );
}

// ─── Menu Item Card ───
function MenuItemCard({ item, inOrder, onAdd }) {
  return (
    <div
      onClick={() => onAdd(item)}
      className={[
        "rounded-md p-[10px] cursor-pointer transition-all duration-150 border",
        inOrder
          ? "border-primary bg-[#FFF5F5]"
          : "border-[#E0E0E0] bg-white hover:border-primary hover:bg-[#FFF5F5]",
      ].join(" ")}
    >
      <div className="flex justify-between items-start mb-1">
        <VegIndicator veg={item.veg} />
        {inOrder && (
          <span className="text-[10px] font-bold text-primary bg-[#FFF5F5] px-[5px] py-[1px] rounded">
            ×{inOrder.qty}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-text-primary leading-tight mb-1">
        {item.name}
      </p>
      <p className="text-[13px] font-bold text-primary">₹{item.price}</p>
    </div>
  );
}

// ─── Order Line Item ───
function OrderLineItem({ item, onAdd, onRemove }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <VegIndicator veg={item.veg} />
      <span className="flex-1 text-xs text-text-primary">{item.name}</span>
      <div className="flex items-center gap-[6px]">
        <button
          onClick={() => onRemove(item.id)}
          className="w-5 h-5 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
        >
          <Minus size={10} />
        </button>
        <span className="text-[13px] font-semibold min-w-[16px] text-center">
          {item.qty}
        </span>
        <button
          onClick={() => onAdd(item)}
          className="w-5 h-5 rounded-full border border-primary bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors"
        >
          <Plus size={10} color="white" />
        </button>
      </div>
      <span className="text-xs font-semibold min-w-[50px] text-right">
        ₹{(item.price * item.qty).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

// ─── Main OrderPanel ───
export default function OrderPanel({ table, onClose, onKOT, onBill }) {
  const [activeCategory, setActiveCategory] = useState("Favourites");
  const [searchTerm, setSearchTerm] = useState("");
  const [showUpsell, setShowUpsell] = useState(true);
  const [orderItems, setOrderItems] = useState(
    table.status !== "blank"
      ? [
          { id: 1, name: "Butter Chicken", price: 320, qty: 1, veg: false },
          { id: 17, name: "Butter Naan", price: 50, qty: 2, veg: true },
        ]
      : [],
  );

  const filteredItems = MENU_ITEMS.filter(
    (item) =>
      item.category === activeCategory &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const addItem = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing)
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === id);
      if (existing?.qty === 1) return prev.filter((i) => i.id !== id);
      return prev.map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i));
    });
  };

  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const itemCount = orderItems.reduce((s, i) => s + i.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  // AI upsell suggestion — show if Butter Chicken is in order and Lassi isn't
  const hasButterChicken = orderItems.some((i) => i.name === "Butter Chicken");
  const hasLassi = orderItems.some((i) => i.name === "Mango Lassi");
  const upsellSuggestion =
    hasButterChicken && !hasLassi && showUpsell
      ? {
          text: "68% of customers who ordered Butter Chicken also ordered Mango Lassi (+₹120)",
          item: { id: 25, name: "Mango Lassi", price: 120, qty: 1, veg: true },
        }
      : null;

  return (
    <div className="side-panel open flex flex-col">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEEEEE] min-h-[60px]">
        <div>
          <p className="text-[15px] font-semibold text-text-primary">
            {table.name}
          </p>
          <p className="text-[11px] text-text-muted mt-[1px]">
            {table.section}
            {table.covers > 0 ? ` · ${table.covers} covers` : " · New order"}
            {table.waiter ? ` · ${table.waiter}` : ""}
          </p>
        </div>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* ── Category Tabs ── */}
      <div className="border-b border-[#EEEEEE] overflow-x-auto flex-shrink-0">
        <div className="flex px-4">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "px-[14px] py-[10px] text-xs whitespace-nowrap border-b-2 transition-colors font-sans",
                activeCategory === cat
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-[#666] hover:text-primary font-normal",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Search ── */}
      <div className="px-4 py-[10px] border-b border-[#F5F5F5] flex-shrink-0">
        <div className="search-wrapper w-full">
          <Search size={14} />
          <input
            className="search-input w-full"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* ── AI Upsell ── */}
      {upsellSuggestion && (
        <div className="flex-shrink-0 pt-3">
          <UpsellBanner
            suggestion={upsellSuggestion}
            onAdd={() => {
              addItem(upsellSuggestion.item);
              setShowUpsell(false);
            }}
            onDismiss={() => setShowUpsell(false)}
          />
        </div>
      )}

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {/* Menu grid */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              inOrder={orderItems.find((i) => i.id === item.id)}
              onAdd={addItem}
            />
          ))}
        </div>

        {/* Order summary */}
        {orderItems.length > 0 && (
          <div>
            <p className="text-[13px] font-semibold text-[#333] mb-2">
              Order Summary
            </p>
            {orderItems.map((item) => (
              <OrderLineItem
                key={item.id}
                item={item}
                onAdd={addItem}
                onRemove={removeItem}
              />
            ))}
            {/* GST breakdown */}
            <div className="mt-3 pt-3 border-t border-[#F0F0F0]">
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-xs text-text-muted mb-1">
                <span>GST (5%)</span>
                <span>₹{gst.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-[15px] font-bold mt-2">
                <span>Total</span>
                <span className="text-primary">
                  ₹{grandTotal.toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="px-5 py-[14px] border-t border-[#EEEEEE] bg-white flex-shrink-0">
        <div className="flex justify-between mb-[10px]">
          <span className="text-[13px] text-text-secondary">
            {itemCount} items
          </span>
          <span className="text-[16px] font-bold">
            ₹{subtotal.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="btn-outline flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => onKOT(table.id, orderItems)}
            disabled={orderItems.length === 0}
          >
            Send KOT
          </button>
          <button
            className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => onBill(table, orderItems)}
            disabled={orderItems.length === 0}
          >
            Collect Payment
          </button>
        </div>
      </div>
    </div>
  );
}
