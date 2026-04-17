import { ORDERS } from "../../data/mockData";
import OrdersTable from "./OrdersTable";

export default function DirectOrders() {
  const orders = ORDERS.filter((o) => o.channel === "direct");
  const revenue = orders.reduce((s, o) => s + o.amount, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Zero-commission highlight banner */}
      <div className="flex items-center gap-3 bg-[#E6F9EE] border border-[#25D366]/30 rounded-xl px-4 py-3 mb-3 flex-shrink-0">
        <span className="text-xl">💬</span>
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-[#1A6B3C]">
            Direct Orders — Zero Commission Channel
          </p>
          <p className="text-[11px] text-[#2E7D52]">
            ₹{revenue.toLocaleString("en-IN")} revenue this session · 100% yours
            — no platform fees
          </p>
        </div>
        <div className="text-right">
          <p className="text-[20px] font-bold text-[#25D366]">₹0</p>
          <p className="text-[10px] text-[#2E7D52]">commission paid</p>
        </div>
      </div>

      <OrdersTable
        orders={orders}
        showChannel
        emptyLabel="No direct orders yet — share your WhatsApp ordering link!"
      />
    </div>
  );
}
