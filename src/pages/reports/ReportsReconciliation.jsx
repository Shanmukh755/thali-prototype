import { useState } from "react";
import { AlertTriangle, CheckCircle, Flag } from "lucide-react";
import { RECONCILIATION } from "../../data/mockData";

function ReconciliationCard({ platform, data, color, textColor, bgColor }) {
  const [disputed, setDisputed] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
      {/* Header */}
      <div className={`flex items-center justify-between px-5 py-4 ${bgColor}`}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-[14px]"
            style={{ background: color }}
          >
            {platform[0]}
          </div>
          <div>
            <p className="text-[15px] font-bold text-text-primary">
              {platform}
            </p>
            <p className="text-[11px] text-text-muted">
              {data.month} · {data.orders} orders
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-[12px] text-text-muted">
          <span>⭐ {data.rating}</span>
          <span>Acceptance: {data.acceptanceRate}%</span>
        </div>
      </div>

      {/* Rows */}
      <div className="divide-y divide-[#F5F5F5]">
        {[
          {
            label: "Gross Order Value",
            value: `₹${data.grossValue.toLocaleString("en-IN")}`,
            red: false,
          },
          {
            label: `Commission (${data.commissionPct}%)`,
            value: `-₹${data.commission.toLocaleString("en-IN")}`,
            red: true,
          },
          {
            label: "GST on Commission",
            value: `-₹${data.gstOnCommission.toLocaleString("en-IN")}`,
            red: true,
          },
          {
            label: "Payment Gateway Fee",
            value: `-₹${data.paymentGateway.toLocaleString("en-IN")}`,
            red: true,
          },
          {
            label: "Cancellation Deductions",
            value: `-₹${data.cancellationDeductions.toLocaleString("en-IN")}`,
            red: true,
          },
        ].map((r) => (
          <div
            key={r.label}
            className="flex justify-between px-5 py-3 text-[13px]"
          >
            <span className="text-text-secondary">{r.label}</span>
            <span
              className={`font-semibold ${r.red ? "text-danger" : "text-text-primary"}`}
            >
              {r.value}
            </span>
          </div>
        ))}
        <div className="flex justify-between px-5 py-3 text-[13px] bg-[#F8F8F8]">
          <span className="font-semibold text-text-primary">
            Net Payout Expected
          </span>
          <span className="font-bold text-text-primary">
            ₹{data.netExpected.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between px-5 py-3 text-[13px] bg-[#F8F8F8]">
          <span className="font-semibold text-text-primary">
            Net Payout Received
          </span>
          <span className="font-bold text-text-primary">
            ₹{data.netReceived.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex justify-between px-5 py-4 bg-[#FDECEA]">
          <span className="flex items-center gap-2 text-[14px] font-bold text-danger">
            <AlertTriangle size={15} /> DISCREPANCY
          </span>
          <span className="text-[16px] font-bold text-danger">
            ₹{data.discrepancy.toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      <div className="px-5 py-4">
        {disputed ? (
          <div className="flex items-center gap-2 bg-[#E8F8F0] rounded-lg px-4 py-3">
            <CheckCircle size={15} className="text-success" />
            <p className="text-[12px] font-semibold text-success">
              Dispute raised with {platform}. Expected resolution: 3-5 days.
            </p>
          </div>
        ) : (
          <button
            onClick={() => setDisputed(true)}
            className="btn-primary w-full justify-center"
          >
            <Flag size={14} /> Raise Dispute with {platform} →
          </button>
        )}
      </div>
    </div>
  );
}

export default function ReportsReconciliation() {
  const total =
    RECONCILIATION.swiggy.discrepancy + RECONCILIATION.zomato.discrepancy;

  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      {/* Hero banner */}
      <div
        className="rounded-xl p-5 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg, #27AE60, #1E8449)" }}
      >
        <div>
          <p className="text-white/80 text-[13px] mb-1">
            💰 Money found this month you didn't know about
          </p>
          <p className="text-white text-[36px] font-extrabold leading-tight">
            ₹{total.toLocaleString("en-IN")}
          </p>
          <p className="text-white/70 text-[12px] mt-1">
            Swiggy: ₹{RECONCILIATION.swiggy.discrepancy.toLocaleString("en-IN")}{" "}
            · Zomato: ₹
            {RECONCILIATION.zomato.discrepancy.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="text-right">
          <CheckCircle size={48} className="text-white/70" />
          <p className="text-white/70 text-[11px] mt-1">
            Raise disputes to recover
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <ReconciliationCard
          platform="Swiggy"
          data={RECONCILIATION.swiggy}
          color="#FC8019"
          textColor="text-[#FC8019]"
          bgColor="bg-[#FEF0E6]"
        />
        <ReconciliationCard
          platform="Zomato"
          data={RECONCILIATION.zomato}
          color="#E23744"
          textColor="text-[#E23744]"
          bgColor="bg-[#FDE8EA]"
        />
      </div>
    </div>
  );
}
