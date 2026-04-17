import { useState } from "react";
import { Star, Phone, MessageSquare, Plus, TrendingUp } from "lucide-react";

const SUPPLIERS = [
  {
    id: 1,
    name: "Sharma Dairy",
    contact: "Ramesh Sharma",
    phone: "98765-11111",
    categories: ["Dairy"],
    paymentTerms: "Net 7 days",
    leadTime: "1 day",
    rating: 4.8,
    onTimeDelivery: 96,
    qualityScore: 95,
    priceConsistency: 92,
    totalOrders: 48,
    totalSpent: 124000,
    lastOrder: "17 Apr 2026",
    items: ["Paneer", "Butter", "Cream"],
  },
  {
    id: 2,
    name: "Fresh Farms",
    contact: "Sunil Kumar",
    phone: "87654-22222",
    categories: ["Meat", "Seafood"],
    paymentTerms: "Net 3 days",
    leadTime: "1 day",
    rating: 4.5,
    onTimeDelivery: 91,
    qualityScore: 93,
    priceConsistency: 88,
    totalOrders: 62,
    totalSpent: 218000,
    lastOrder: "16 Apr 2026",
    items: ["Chicken", "Mutton", "Fish (Pomfret)"],
  },
  {
    id: 3,
    name: "Veggie Hub",
    contact: "Priya Patel",
    phone: "76543-33333",
    categories: ["Vegetables"],
    paymentTerms: "Cash on delivery",
    leadTime: "Same day",
    rating: 4.2,
    onTimeDelivery: 88,
    qualityScore: 90,
    priceConsistency: 85,
    totalOrders: 94,
    totalSpent: 42000,
    lastOrder: "17 Apr 2026",
    items: ["Tomatoes", "Onions"],
  },
  {
    id: 4,
    name: "Grain Masters",
    contact: "Anil Gupta",
    phone: "65432-44444",
    categories: ["Grains"],
    paymentTerms: "Net 15 days",
    leadTime: "2 days",
    rating: 4.6,
    onTimeDelivery: 94,
    qualityScore: 96,
    priceConsistency: 94,
    totalOrders: 28,
    totalSpent: 68000,
    lastOrder: "14 Apr 2026",
    items: ["Basmati Rice", "Maida"],
  },
  {
    id: 5,
    name: "Spice World",
    contact: "Meena Joshi",
    phone: "54321-55555",
    categories: ["Spices"],
    paymentTerms: "Net 30 days",
    leadTime: "3 days",
    rating: 3.9,
    onTimeDelivery: 82,
    qualityScore: 88,
    priceConsistency: 80,
    totalOrders: 18,
    totalSpent: 28000,
    lastOrder: "14 Apr 2026",
    items: ["Garam Masala"],
  },
];

function ScoreBar({ value, color }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-[5px] bg-[#F0F0F0] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-[10px] text-text-muted w-[28px] text-right">
        {value}%
      </span>
    </div>
  );
}

export default function InventorySuppliers() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <p className="text-[13px] text-text-muted">
          {SUPPLIERS.length} suppliers · Click a card to view details
        </p>
        <button className="btn-primary">
          <Plus size={14} /> Add Supplier
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 gap-3">
          {SUPPLIERS.map((s) => (
            <div
              key={s.id}
              onClick={() => setSelected(selected?.id === s.id ? null : s)}
              className={`bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md ${selected?.id === s.id ? "border-primary shadow-md" : "border-[#EEEEEE]"}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[14px] font-semibold text-text-primary">
                    {s.name}
                  </p>
                  <p className="text-[11px] text-text-muted mt-[1px]">
                    {s.contact} · {s.categories.join(", ")}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-[#F9A825]" fill="#F9A825" />
                  <span className="text-[13px] font-bold text-text-primary">
                    {s.rating}
                  </span>
                </div>
              </div>

              {/* Score bars */}
              <div className="space-y-[6px] mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted w-[100px] flex-shrink-0">
                    On-time delivery
                  </span>
                  <ScoreBar value={s.onTimeDelivery} color="bg-success" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted w-[100px] flex-shrink-0">
                    Quality
                  </span>
                  <ScoreBar value={s.qualityScore} color="bg-info" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted w-[100px] flex-shrink-0">
                    Price consistency
                  </span>
                  <ScoreBar value={s.priceConsistency} color="bg-warning" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F5]">
                <div className="text-[11px] text-text-muted">
                  {s.totalOrders} orders · ₹{(s.totalSpent / 1000).toFixed(0)}k
                  spent
                </div>
                <div className="flex gap-2">
                  <button
                    className="btn-ghost py-[3px] px-2 text-[10px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Phone size={10} />
                  </button>
                  <button
                    className="btn-ghost py-[3px] px-2 text-[10px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageSquare size={10} />
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {selected?.id === s.id && (
                <div className="mt-3 pt-3 border-t border-[#F0F0F0] space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-text-muted">Payment:</span>{" "}
                      <span className="font-medium">{s.paymentTerms}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Lead time:</span>{" "}
                      <span className="font-medium">{s.leadTime}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Last order:</span>{" "}
                      <span className="font-medium">{s.lastOrder}</span>
                    </div>
                    <div>
                      <span className="text-text-muted">Phone:</span>{" "}
                      <span className="font-medium">{s.phone}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted mb-1">
                      Supplies:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="text-[10px] bg-surface border border-[#EEEEEE] rounded px-2 py-[2px]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button className="btn-primary w-full justify-center text-xs py-[7px] mt-2">
                    <MessageSquare size={12} /> Send WhatsApp Order
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
