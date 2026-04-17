import { useState } from "react";
import {
  Search,
  X,
  Star,
  Gift,
  MessageSquare,
  TrendingDown,
} from "lucide-react";
import { CUSTOMERS } from "../../data/mockData";

const TIER_CFG = {
  Platinum: {
    icon: "💎",
    bg: "bg-[#F3F3F3]",
    text: "text-[#555]",
    border: "border-[#E5E4E2]",
  },
  Gold: {
    icon: "🥇",
    bg: "bg-[#FFFDE7]",
    text: "text-[#F9A825]",
    border: "border-[#FFD54F]",
  },
  Silver: {
    icon: "🥈",
    bg: "bg-[#F5F5F5]",
    text: "text-[#757575]",
    border: "border-[#BDBDBD]",
  },
  Bronze: {
    icon: "🥉",
    bg: "bg-[#FDF3E7]",
    text: "text-[#CD7F32]",
    border: "border-[#FFCC80]",
  },
};

// ─── Customer detail side panel ───
function CustomerPanel({ customer, onClose }) {
  const tier = TIER_CFG[customer.tier] || TIER_CFG.Bronze;
  const churnRisk = customer.visits < 3 || customer.lastVisit.includes("month");

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-[199]" onClick={onClose} />
      <div className="side-panel open flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEEEEE]">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {customer.name[0]}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[15px] font-semibold text-text-primary">
                  {customer.name}
                </p>
                <span
                  className={`text-[10px] font-bold px-[6px] py-[1px] rounded-full border ${tier.bg} ${tier.text} ${tier.border}`}
                >
                  {tier.icon} {customer.tier}
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-[1px]">
                📱 {customer.phone}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Churn risk */}
          {churnRisk && (
            <div className="flex items-center gap-2 bg-[#FDECEA] border border-danger/20 rounded-lg px-3 py-2">
              <TrendingDown size={13} className="text-danger flex-shrink-0" />
              <p className="text-[11px] text-danger font-medium">
                High churn risk — hasn't visited recently. Send a win-back
                offer?
              </p>
            </div>
          )}

          {/* Tier card */}
          <div
            className={`rounded-xl border p-4 text-center ${tier.bg} ${tier.border}`}
          >
            <p className="text-2xl mb-1">{tier.icon}</p>
            <p className={`text-[16px] font-bold ${tier.text}`}>
              {customer.tier} Member
            </p>
            <p className="text-[13px] text-text-muted mt-1">
              <Star
                size={11}
                className="inline text-[#F9A825]"
                fill="#F9A825"
              />{" "}
              {customer.loyaltyPoints} points
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: "Total Visits", value: customer.visits },
              { label: "Last Visit", value: customer.lastVisit },
              {
                label: "Total Spent",
                value: `₹${customer.totalSpent.toLocaleString("en-IN")}`,
              },
              {
                label: "Avg per Visit",
                value: `₹${Math.round(customer.totalSpent / customer.visits).toLocaleString("en-IN")}`,
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-surface rounded-lg p-3 text-center"
              >
                <p className="text-[15px] font-bold text-text-primary">
                  {s.value}
                </p>
                <p className="text-[10px] text-text-muted mt-[2px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Favourite */}
          <div className="bg-[#FFF5F5] rounded-lg px-3 py-2">
            <p className="text-[10px] text-text-muted mb-1">Favourite Item</p>
            <p className="text-[13px] font-semibold text-primary">
              ❤️ {customer.favoriteItem}
            </p>
          </div>

          {/* Source */}
          <div>
            <p className="text-[10px] text-text-muted mb-1">
              Acquisition Source
            </p>
            <span className="status-pill blue text-[10px]">
              {customer.acquisitionSource}
            </span>
          </div>

          {/* Recent orders */}
          <div>
            <p className="text-[13px] font-semibold text-text-primary mb-2">
              Recent Orders
            </p>
            {[
              { date: "14 Apr", items: "Butter Chicken, Naan ×2", amount: 420 },
              { date: "8 Apr", items: "Chicken Biryani, Raita", amount: 380 },
              { date: "1 Apr", items: "Dal Makhani, Roti ×3", amount: 290 },
            ].map((o, i) => (
              <div
                key={i}
                className="flex justify-between py-2 border-b border-[#F5F5F5] text-[12px]"
              >
                <div>
                  <p className="font-medium text-text-primary">{o.items}</p>
                  <p className="text-text-muted mt-[1px]">{o.date}</p>
                </div>
                <p className="font-semibold">₹{o.amount}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[#EEEEEE] flex gap-2">
          <button className="btn-outline flex-1 justify-center text-xs py-[8px]">
            <MessageSquare size={13} /> WhatsApp
          </button>
          <button className="btn-primary flex-1 justify-center text-xs py-[8px]">
            <Gift size={13} /> Send Offer
          </button>
        </div>
      </div>
    </>
  );
}

export default function CustomersAll() {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [selected, setSelected] = useState(null);

  const tiers = ["all", "Platinum", "Gold", "Silver", "Bronze"];

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchTier = tierFilter === "all" || c.tier === tierFilter;
    return matchSearch && matchTier;
  });

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Total Customers",
            value: "2,847",
            color: "text-text-primary",
          },
          { label: "New This Month", value: "124", color: "text-success" },
          { label: "Returning Rate", value: "68%", color: "text-info" },
          {
            label: "Avg Lifetime Value",
            value: "₹4,200",
            color: "text-primary",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3"
          >
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              {s.label}
            </p>
            <p className={`text-[22px] font-bold leading-tight ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-3 mb-3 flex-shrink-0">
        <div className="relative max-w-[280px] flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none"
          />
          <input
            className="form-input pl-9 text-[13px] w-full"
            placeholder="Search by name or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-[4px]">
          {tiers.map((t) => {
            const cfg = t !== "all" ? TIER_CFG[t] : null;
            return (
              <button
                key={t}
                onClick={() => setTierFilter(t)}
                className={`text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all capitalize ${tierFilter === t ? "bg-primary text-white border-primary" : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCC]"}`}
              >
                {t === "all" ? "All" : `${cfg?.icon} ${t}`}
              </button>
            );
          })}
        </div>
        <span className="ml-auto text-xs text-text-muted">
          {filtered.length} customers
        </span>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Phone</th>
              <th>Visits</th>
              <th>Last Visit</th>
              <th>Total Spent</th>
              <th>Loyalty</th>
              <th>Tier</th>
              <th>Source</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => {
              const tier = TIER_CFG[c.tier] || TIER_CFG.Bronze;
              return (
                <tr
                  key={c.id}
                  className="cursor-pointer hover:bg-[#FAFAFA]"
                  onClick={() => setSelected(c)}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-[13px]">
                          {c.name[0]}
                        </span>
                      </div>
                      <span className="font-medium text-text-primary">
                        {c.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-xs text-text-muted">{c.phone}</td>
                  <td className="font-semibold">{c.visits}</td>
                  <td className="text-xs text-text-muted">{c.lastVisit}</td>
                  <td className="font-semibold">
                    ₹{c.totalSpent.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <Star
                        size={11}
                        className="text-[#F9A825]"
                        fill="#F9A825"
                      />
                      <span className="text-[12px] font-semibold">
                        {c.loyaltyPoints} pts
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`text-[10px] font-bold px-2 py-[3px] rounded-full border ${tier.bg} ${tier.text} ${tier.border}`}
                    >
                      {tier.icon} {c.tier}
                    </span>
                  </td>
                  <td>
                    <span className="status-pill blue text-[10px]">
                      {c.acquisitionSource}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-ghost py-[4px] px-3 text-[11px]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected(c);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <CustomerPanel customer={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
