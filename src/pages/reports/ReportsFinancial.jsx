import { Download, FileText } from "lucide-react";

const PL_DATA = [
  { label: "Gross Revenue", value: 1284000, type: "revenue" },
  { label: "Food Cost (29%)", value: -372360, type: "cost" },
  { label: "Gross Profit", value: 911640, type: "subtotal" },
  { label: "Staff Cost (18%)", value: -231120, type: "cost" },
  { label: "Rent & Utilities", value: -85000, type: "cost" },
  { label: "Packaging & Supplies", value: -28000, type: "cost" },
  { label: "Aggregator Commissions", value: -192600, type: "cost" },
  { label: "Marketing", value: -18000, type: "cost" },
  { label: "Net Profit", value: 356920, type: "profit" },
];

const GST_DATA = [
  { rate: "5%", taxable: 840000, cgst: 21000, sgst: 21000, total: 42000 },
  { rate: "12%", taxable: 180000, cgst: 10800, sgst: 10800, total: 21600 },
  { rate: "18%", taxable: 264000, cgst: 23760, sgst: 23760, total: 47520 },
];

const PAYMENT_SPLIT = [
  { method: "UPI", amount: 642000, pct: 50, color: "bg-info" },
  { method: "Cash", amount: 385200, pct: 30, color: "bg-success" },
  { method: "Card", amount: 256800, pct: 20, color: "bg-[#9B59B6]" },
];

export default function ReportsFinancial() {
  const netProfit = PL_DATA.find((r) => r.label === "Net Profit")?.value ?? 0;
  const revenue = PL_DATA.find((r) => r.label === "Gross Revenue")?.value ?? 1;
  const margin = Math.round((netProfit / revenue) * 100);

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          {
            label: "Monthly Revenue",
            value: "₹12.84L",
            color: "text-text-primary",
          },
          {
            label: "Net Profit",
            value: `₹${(netProfit / 100000).toFixed(2)}L`,
            color: "text-success",
          },
          {
            label: "Net Margin",
            value: `${margin}%`,
            color: margin > 25 ? "text-success" : "text-warning",
          },
          { label: "Total GST Paid", value: "₹1.11L", color: "text-info" },
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

      <div className="grid grid-cols-2 gap-4">
        {/* P&L */}
        <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F5F5]">
            <p className="text-[14px] font-semibold text-text-primary">
              P&L Summary — March 2026
            </p>
            <button className="btn-ghost text-xs py-[4px] px-2">
              <Download size={11} />
            </button>
          </div>
          <div className="divide-y divide-[#F5F5F5]">
            {PL_DATA.map((row) => (
              <div
                key={row.label}
                className={`flex justify-between px-5 py-3 text-[13px] ${row.type === "subtotal" ? "bg-[#F8F8F8]" : row.type === "profit" ? "bg-[#E8F8F0]" : ""}`}
              >
                <span
                  className={`${row.type === "profit" ? "font-bold text-success" : row.type === "subtotal" ? "font-semibold text-text-primary" : "text-text-secondary"}`}
                >
                  {row.label}
                </span>
                <span
                  className={`font-semibold ${row.value < 0 ? "text-danger" : row.type === "profit" ? "text-success font-bold text-[15px]" : "text-text-primary"}`}
                >
                  {row.value < 0
                    ? `-₹${Math.abs(row.value).toLocaleString("en-IN")}`
                    : `₹${row.value.toLocaleString("en-IN")}`}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* GST Summary */}
          <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F5F5]">
              <p className="text-[14px] font-semibold text-text-primary">
                GST Summary
              </p>
              <button className="btn-ghost text-xs py-[4px] px-2">
                <FileText size={11} /> GSTR-1
              </button>
            </div>
            <table className="data-table w-full">
              <thead>
                <tr>
                  <th>Rate</th>
                  <th>Taxable</th>
                  <th>CGST</th>
                  <th>SGST</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {GST_DATA.map((g) => (
                  <tr key={g.rate} className="hover:bg-[#FAFAFA]">
                    <td className="font-semibold text-primary">{g.rate}</td>
                    <td>₹{(g.taxable / 1000).toFixed(0)}k</td>
                    <td>₹{(g.cgst / 1000).toFixed(1)}k</td>
                    <td>₹{(g.sgst / 1000).toFixed(1)}k</td>
                    <td className="font-semibold">
                      ₹{(g.total / 1000).toFixed(1)}k
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment split */}
          <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
            <p className="text-[14px] font-semibold text-text-primary mb-3">
              Payment Method Split
            </p>
            <div className="flex h-[10px] rounded-full overflow-hidden mb-3">
              {PAYMENT_SPLIT.map((p) => (
                <div
                  key={p.method}
                  className={p.color}
                  style={{ width: `${p.pct}%` }}
                />
              ))}
            </div>
            {PAYMENT_SPLIT.map((p) => (
              <div
                key={p.method}
                className="flex justify-between text-[12px] mb-2"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${p.color}`} />
                  <span className="text-text-secondary">{p.method}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text-muted">{p.pct}%</span>
                  <span className="font-semibold text-text-primary">
                    ₹{(p.amount / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
