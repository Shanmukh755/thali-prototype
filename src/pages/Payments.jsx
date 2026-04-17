import { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Banknote,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  X,
} from "lucide-react";

// ─── Mock transactions ───
const TRANSACTIONS = [
  {
    id: "TXN-8841",
    time: "8:14 PM",
    order: "#1042",
    table: "Table 7",
    method: "upi",
    amount: 882,
    status: "settled",
    ref: "GPay-9X2K",
  },
  {
    id: "TXN-8840",
    time: "8:09 PM",
    order: "#1041",
    table: "Zomato",
    method: "upi",
    amount: 840,
    status: "pending",
    ref: "ZPay-7M1L",
  },
  {
    id: "TXN-8839",
    time: "8:02 PM",
    order: "#1040",
    table: "Swiggy",
    method: "upi",
    amount: 336,
    status: "settled",
    ref: "SPay-4N8P",
  },
  {
    id: "TXN-8838",
    time: "7:58 PM",
    order: "#1039",
    table: "Table 5",
    method: "cash",
    amount: 861,
    status: "settled",
    ref: "CASH",
  },
  {
    id: "TXN-8837",
    time: "7:52 PM",
    order: "#1038",
    table: "Zomato",
    method: "upi",
    amount: 756,
    status: "settled",
    ref: "GPay-2R5T",
  },
  {
    id: "TXN-8836",
    time: "7:45 PM",
    order: "#1037",
    table: "Counter",
    method: "cash",
    amount: 672,
    status: "settled",
    ref: "CASH",
  },
  {
    id: "TXN-8835",
    time: "7:38 PM",
    order: "#1036",
    table: "ONDC",
    method: "upi",
    amount: 378,
    status: "settled",
    ref: "ONDC-6W3Q",
  },
  {
    id: "TXN-8834",
    time: "7:30 PM",
    order: "#1035",
    table: "Table 12",
    method: "card",
    amount: 777,
    status: "settled",
    ref: "HDFC-8Y4Z",
  },
  {
    id: "TXN-8833",
    time: "7:22 PM",
    order: "#1034",
    table: "Swiggy",
    method: "upi",
    amount: 535,
    status: "settled",
    ref: "PPay-1A6B",
  },
  {
    id: "TXN-8832",
    time: "7:15 PM",
    order: "#1033",
    table: "WhatsApp",
    method: "upi",
    amount: 672,
    status: "settled",
    ref: "GPay-5C9D",
  },
  {
    id: "TXN-8831",
    time: "7:08 PM",
    order: "#1032",
    table: "Table 9",
    method: "card",
    amount: 1050,
    status: "settled",
    ref: "ICICI-3E7F",
  },
  {
    id: "TXN-8830",
    time: "7:01 PM",
    order: "#1031",
    table: "Zomato",
    method: "upi",
    amount: 399,
    status: "refunded",
    ref: "GPay-7G2H",
  },
];

const METHOD_CFG = {
  upi: {
    label: "UPI",
    icon: Smartphone,
    color: "text-info",
    bg: "bg-[#EBF5FB]",
  },
  cash: {
    label: "Cash",
    icon: Banknote,
    color: "text-success",
    bg: "bg-[#E8F8F0]",
  },
  card: {
    label: "Card",
    icon: CreditCard,
    color: "text-[#9B59B6]",
    bg: "bg-[#F3E5F5]",
  },
};

const STATUS_CFG = {
  settled: { label: "Settled", bg: "bg-[#E8F8F0]", text: "text-success" },
  pending: { label: "Pending", bg: "bg-[#FEF3E8]", text: "text-warning" },
  refunded: { label: "Refunded", bg: "bg-[#FDECEA]", text: "text-danger" },
};

// ─── Refund modal ───
function RefundModal({ txn, onClose }) {
  const [done, setDone] = useState(false);
  if (!txn) return null;
  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[420px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <p className="text-[15px] font-semibold text-text-primary">
            Initiate Refund
          </p>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>
        {done ? (
          <div className="flex flex-col items-center py-10 px-6">
            <CheckCircle size={48} className="text-success mb-3" />
            <p className="text-[15px] font-bold text-text-primary mb-1">
              Refund Initiated
            </p>
            <p className="text-sm text-text-muted">
              ₹{txn.amount} will be refunded within 3-5 business days
            </p>
            <button
              className="btn-primary mt-6 w-full justify-center"
              onClick={onClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 space-y-3">
              <div className="bg-surface rounded-lg p-4 space-y-2">
                {[
                  { label: "Transaction", value: txn.id },
                  { label: "Order", value: txn.order },
                  {
                    label: "Amount",
                    value: `₹${txn.amount.toLocaleString("en-IN")}`,
                  },
                  { label: "Method", value: txn.method.toUpperCase() },
                ].map((r) => (
                  <div
                    key={r.label}
                    className="flex justify-between text-[13px]"
                  >
                    <span className="text-text-muted">{r.label}</span>
                    <span className="font-semibold text-text-primary">
                      {r.value}
                    </span>
                  </div>
                ))}
              </div>
              <div>
                <label className="form-label">Reason for refund</label>
                <select className="dropdown-select w-full">
                  <option>Wrong order delivered</option>
                  <option>Customer cancelled</option>
                  <option>Quality issue</option>
                  <option>Duplicate payment</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
              <button className="btn-ghost flex-shrink-0" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-primary flex-1 justify-center"
                onClick={() => setDone(true)}
              >
                Initiate Refund ₹{txn.amount.toLocaleString("en-IN")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Transactions tab ───
function TransactionsTab() {
  const [filter, setFilter] = useState("all");
  const [refundTxn, setRefundTxn] = useState(null);

  const filtered =
    filter === "all"
      ? TRANSACTIONS
      : TRANSACTIONS.filter((t) => t.method === filter);

  const total = TRANSACTIONS.reduce(
    (s, t) => s + (t.status !== "refunded" ? t.amount : 0),
    0,
  );
  const upi = TRANSACTIONS.filter(
    (t) => t.method === "upi" && t.status !== "refunded",
  ).reduce((s, t) => s + t.amount, 0);
  const cash = TRANSACTIONS.filter(
    (t) => t.method === "cash" && t.status !== "refunded",
  ).reduce((s, t) => s + t.amount, 0);
  const card = TRANSACTIONS.filter(
    (t) => t.method === "card" && t.status !== "refunded",
  ).reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-3 flex-shrink-0">
        {[
          {
            label: "Total Collected",
            value: `₹${total.toLocaleString("en-IN")}`,
            color: "text-text-primary",
          },
          {
            label: "UPI",
            value: `₹${upi.toLocaleString("en-IN")}`,
            color: "text-info",
          },
          {
            label: "Cash",
            value: `₹${cash.toLocaleString("en-IN")}`,
            color: "text-success",
          },
          {
            label: "Card",
            value: `₹${card.toLocaleString("en-IN")}`,
            color: "text-[#9B59B6]",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3"
          >
            <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
              {s.label}
            </p>
            <p className={`text-[20px] font-bold leading-tight ${s.color}`}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-3 flex-shrink-0">
        {["all", "upi", "cash", "card"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[11px] font-semibold px-3 py-[5px] rounded-lg border capitalize transition-all ${filter === f ? "bg-primary text-white border-primary" : "bg-white text-text-muted border-[#E0E0E0]"}`}
          >
            {f === "all" ? "All Methods" : f.toUpperCase()}
          </button>
        ))}
        <button className="btn-ghost ml-auto text-xs py-[5px] px-3">
          <Download size={12} /> Export
        </button>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>TXN ID</th>
              <th>Time</th>
              <th>Order</th>
              <th>Source</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((txn) => {
              const mCfg = METHOD_CFG[txn.method];
              const sCfg = STATUS_CFG[txn.status];
              const MIcon = mCfg.icon;
              return (
                <tr key={txn.id} className="hover:bg-[#FAFAFA]">
                  <td className="font-mono text-[11px] text-text-muted">
                    {txn.id}
                  </td>
                  <td className="text-xs text-text-muted">{txn.time}</td>
                  <td className="font-semibold text-primary text-[12px]">
                    {txn.order}
                  </td>
                  <td className="text-xs text-text-muted">{txn.table}</td>
                  <td>
                    <div
                      className={`inline-flex items-center gap-1 px-2 py-[3px] rounded-full text-[10px] font-semibold ${mCfg.bg} ${mCfg.color}`}
                    >
                      <MIcon size={10} />
                      {mCfg.label}
                    </div>
                  </td>
                  <td className="font-semibold text-[13px]">
                    ₹{txn.amount.toLocaleString("en-IN")}
                  </td>
                  <td>
                    <span
                      className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${sCfg.bg} ${sCfg.text}`}
                    >
                      {sCfg.label}
                    </span>
                  </td>
                  <td>
                    {txn.status === "settled" && (
                      <button
                        onClick={() => setRefundTxn(txn)}
                        className="btn-ghost py-[3px] px-2 text-[10px] hover:text-danger"
                      >
                        Refund
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {refundTxn && (
        <RefundModal txn={refundTxn} onClose={() => setRefundTxn(null)} />
      )}
    </div>
  );
}

// ─── Settlements tab ───
function SettlementsTab() {
  const SETTLEMENTS = [
    {
      date: "17 Apr 2026",
      upi: 22600,
      card: 7800,
      total: 30400,
      status: "pending",
      eta: "18 Apr",
    },
    {
      date: "16 Apr 2026",
      upi: 19800,
      card: 6200,
      total: 26000,
      status: "settled",
      eta: null,
    },
    {
      date: "15 Apr 2026",
      upi: 24100,
      card: 8400,
      total: 32500,
      status: "settled",
      eta: null,
    },
    {
      date: "14 Apr 2026",
      upi: 18400,
      card: 5600,
      total: 24000,
      status: "settled",
      eta: null,
    },
    {
      date: "13 Apr 2026",
      upi: 21200,
      card: 7100,
      total: 28300,
      status: "settled",
      eta: null,
    },
  ];

  const pending = SETTLEMENTS.filter((s) => s.status === "pending").reduce(
    (sum, s) => sum + s.total,
    0,
  );

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Pending settlement banner */}
      <div className="flex items-center gap-3 bg-[#FEF3E8] border border-warning/20 rounded-xl px-4 py-3 mb-3 flex-shrink-0">
        <AlertTriangle size={16} className="text-warning flex-shrink-0" />
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-warning">
            ₹{pending.toLocaleString("en-IN")} pending settlement
          </p>
          <p className="text-[11px] text-text-muted">
            UPI + Card payments from today. Expected in your bank account by 18
            Apr.
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Date</th>
              <th>UPI</th>
              <th>Card</th>
              <th>Total</th>
              <th>Status</th>
              <th>Bank ETA</th>
            </tr>
          </thead>
          <tbody>
            {SETTLEMENTS.map((s) => (
              <tr key={s.date} className="hover:bg-[#FAFAFA]">
                <td className="font-medium">{s.date}</td>
                <td className="text-info font-semibold">
                  ₹{s.upi.toLocaleString("en-IN")}
                </td>
                <td className="text-[#9B59B6] font-semibold">
                  ₹{s.card.toLocaleString("en-IN")}
                </td>
                <td className="font-bold text-[14px]">
                  ₹{s.total.toLocaleString("en-IN")}
                </td>
                <td>
                  <span
                    className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${s.status === "settled" ? "bg-[#E8F8F0] text-success" : "bg-[#FEF3E8] text-warning"}`}
                  >
                    {s.status === "settled" ? "✅ Settled" : "⏳ Pending"}
                  </span>
                </td>
                <td className="text-xs text-text-muted">
                  {s.eta ?? "Completed"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Thali Pay tab ───
function ThaliPayTab() {
  return (
    <div className="space-y-4 overflow-y-auto h-full">
      {/* Hero */}
      <div
        className="rounded-xl p-6 text-white"
        style={{ background: "linear-gradient(135deg, #CC3333, #A93226)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Zap size={18} className="text-white" />
              <p className="text-[16px] font-bold">Thali Pay</p>
            </div>
            <p className="text-white/80 text-[13px] mb-4">
              Embedded payments — earn on every transaction processed through
              Thali
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "This Month", value: "₹12.84L" },
                { label: "Thali Earn", value: "₹3,852" },
                { label: "Earn Rate", value: "0.3%" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-[20px] font-bold">{s.value}</p>
                  <p className="text-white/70 text-[11px]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <CreditCard size={48} className="text-white/30" />
        </div>
      </div>

      {/* Payment methods configured */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Configured Payment Methods
          </p>
        </div>
        <div className="divide-y divide-[#F5F5F5]">
          {[
            {
              name: "UPI / BharatQR",
              provider: "Razorpay",
              status: "active",
              icon: "📱",
              fee: "0%",
            },
            {
              name: "Debit / Credit Card",
              provider: "Razorpay",
              status: "active",
              icon: "💳",
              fee: "1.8% + ₹2",
            },
            {
              name: "Sodexo / Meal Card",
              provider: "Sodexo",
              status: "active",
              icon: "🍽️",
              fee: "1.5%",
            },
            {
              name: "Zomato Pay",
              provider: "Zomato",
              status: "active",
              icon: "🔴",
              fee: "0%",
            },
            {
              name: "Swiggy Pay",
              provider: "Swiggy",
              status: "active",
              icon: "🟠",
              fee: "0%",
            },
            {
              name: "CRED Pay",
              provider: "CRED",
              status: "inactive",
              icon: "⚫",
              fee: "0%",
            },
          ].map((m) => (
            <div key={m.name} className="flex items-center gap-4 px-5 py-3">
              <span className="text-xl">{m.icon}</span>
              <div className="flex-1">
                <p className="text-[13px] font-medium text-text-primary">
                  {m.name}
                </p>
                <p className="text-[10px] text-text-muted">
                  {m.provider} · Fee: {m.fee}
                </p>
              </div>
              <span
                className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${m.status === "active" ? "bg-[#E8F8F0] text-success" : "bg-[#F5F5F5] text-[#888]"}`}
              >
                {m.status === "active" ? "✅ Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Working capital teaser */}
      <div className="bg-[#FFF8E1] border border-[#FFD54F] rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💰</span>
          <div>
            <p className="text-[14px] font-bold text-[#5D4037] mb-1">
              Thali Capital — Coming Soon
            </p>
            <p className="text-[12px] text-[#795548] mb-3">
              Based on your ₹42,800/day revenue, you qualify for a working
              capital advance of up to <strong>₹2,00,000</strong>. Repay
              automatically from daily settlements. No paperwork.
            </p>
            <button className="btn-primary text-xs py-[6px] px-4">
              Express Interest →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Payments page ───
const TABS = [
  { id: "transactions", label: "Transactions" },
  { id: "settlements", label: "Settlements" },
  { id: "thalipay", label: "⚡ Thali Pay" },
];

export default function Payments() {
  const [activeTab, setActiveTab] = useState("transactions");

  const todayTotal = TRANSACTIONS.filter((t) => t.status !== "refunded").reduce(
    (s, t) => s + t.amount,
    0,
  );
  const pending = TRANSACTIONS.filter((t) => t.status === "pending").length;

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-text-primary">
            Payments & Settlements
          </h1>
          <p className="text-[13px] text-text-muted mt-[2px]">
            Today: ₹{todayTotal.toLocaleString("en-IN")} collected · {pending}{" "}
            pending settlement
          </p>
        </div>
        <button className="btn-ghost text-xs py-[5px] px-3">
          <Download size={13} /> Export
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-[5px] mb-4 flex-shrink-0">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`px-4 py-[7px] rounded-lg text-xs font-semibold border transition-all ${activeTab === t.id ? "bg-primary text-white border-primary" : "bg-white text-text-secondary border-[#E0E0E0] hover:bg-surface"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === "transactions" && <TransactionsTab />}
        {activeTab === "settlements" && <SettlementsTab />}
        {activeTab === "thalipay" && <ThaliPayTab />}
      </div>
    </div>
  );
}
