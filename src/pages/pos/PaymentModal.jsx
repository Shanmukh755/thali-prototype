import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

const PAYMENT_METHODS = [
  { id: "upi", label: "UPI", icon: "📱", desc: "GPay, PhonePe, Paytm" },
  { id: "cash", label: "Cash", icon: "💵", desc: "Exact or change" },
  { id: "card", label: "Card", icon: "💳", desc: "Debit / Credit / Tap" },
];

export default function PaymentModal({ table, items, onClose, onConfirm }) {
  const [method, setMethod] = useState("upi");
  const [paid, setPaid] = useState(false);
  const [cashInput, setCashInput] = useState("");

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;
  const change =
    method === "cash" && cashInput
      ? Math.max(0, Number(cashInput) - grandTotal)
      : 0;

  const handleConfirm = () => {
    setPaid(true);
    setTimeout(() => {
      onConfirm(method);
    }, 1200);
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[480px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <div>
            <p className="text-[16px] font-semibold text-text-primary">
              Collect Payment
            </p>
            <p className="text-xs text-text-muted mt-[2px]">
              {table.name} · {table.section}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Success state ── */}
        {paid ? (
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <CheckCircle size={56} className="text-success mb-4" />
            <p className="text-[18px] font-bold text-text-primary mb-1">
              Payment Received!
            </p>
            <p className="text-sm text-text-muted">
              ₹{grandTotal.toLocaleString("en-IN")} via {method.toUpperCase()}
            </p>
          </div>
        ) : (
          <>
            {/* ── Bill Summary ── */}
            <div className="px-6 py-4">
              <div className="bg-surface rounded-lg p-[14px] mb-4">
                {items.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between mb-[6px] text-[13px]"
                  >
                    <span className="text-text-primary">
                      {item.name} × {item.qty}
                    </span>
                    <span className="font-medium">
                      ₹{(item.price * item.qty).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[#E0E0E0] mt-2 pt-2 space-y-1">
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-xs text-text-muted">
                    <span>GST (5%)</span>
                    <span>₹{gst.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="flex justify-between text-[16px] font-bold mt-2">
                    <span>Total</span>
                    <span className="text-primary">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── Payment Methods ── */}
              <p className="form-label mb-2">Payment Method</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={[
                      "flex flex-col items-center gap-1 p-3 rounded-lg border transition-all",
                      method === m.id
                        ? "border-2 border-primary bg-[#FFF5F5]"
                        : "border border-[#E0E0E0] bg-white hover:border-primary",
                    ].join(" ")}
                  >
                    <span className="text-xl">{m.icon}</span>
                    <span
                      className={`text-xs font-semibold ${method === m.id ? "text-primary" : "text-[#333]"}`}
                    >
                      {m.label}
                    </span>
                    <span className="text-[10px] text-text-muted text-center leading-tight">
                      {m.desc}
                    </span>
                  </button>
                ))}
              </div>

              {/* ── UPI QR ── */}
              {method === "upi" && (
                <div className="text-center p-4 bg-surface rounded-lg mb-3">
                  <div className="w-[100px] h-[100px] bg-[#1A1A1A] rounded-lg mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-[10px] font-medium">
                      QR CODE
                    </span>
                  </div>
                  <p className="text-xs text-text-muted">
                    Scan with any UPI app
                  </p>
                  <p className="text-[18px] font-bold text-primary mt-1">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </p>
                </div>
              )}

              {/* ── Cash change calculator ── */}
              {method === "cash" && (
                <div className="bg-surface rounded-lg p-3 mb-3">
                  <p className="text-xs font-medium text-text-secondary mb-2">
                    Cash Tendered
                  </p>
                  <input
                    type="number"
                    className="form-input mb-2"
                    placeholder={`Enter amount (min ₹${grandTotal})`}
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                  />
                  {cashInput && Number(cashInput) >= grandTotal && (
                    <div className="flex justify-between text-sm font-semibold">
                      <span className="text-text-secondary">
                        Change to return
                      </span>
                      <span className="text-success">
                        ₹{change.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}
                  {cashInput && Number(cashInput) < grandTotal && (
                    <p className="text-xs text-danger">
                      Amount is less than total
                    </p>
                  )}
                </div>
              )}

              {/* ── Card ── */}
              {method === "card" && (
                <div className="bg-surface rounded-lg p-3 mb-3 text-center">
                  <p className="text-sm text-text-secondary">
                    Present card or tap device
                  </p>
                  <p className="text-[18px] font-bold text-primary mt-1">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </p>
                </div>
              )}
            </div>

            {/* ── Footer ── */}
            <div className="flex gap-3 px-6 pb-5 pt-4 border-t border-[#F0F0F0]">
              <button className="btn-ghost flex-shrink-0" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn-primary flex-1 justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={handleConfirm}
                disabled={
                  method === "cash" &&
                  cashInput &&
                  Number(cashInput) < grandTotal
                }
              >
                Confirm ₹{grandTotal.toLocaleString("en-IN")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
