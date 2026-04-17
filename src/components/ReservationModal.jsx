import { useState } from "react";
import { Calendar, CheckCircle, X } from "lucide-react";

const TIMES = [
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
];

/**
 * Shared reservation modal used in both:
 *  - Reservations page (New Reservation button)
 *  - POS Table View (+ Table Reservation button)
 *
 * Props:
 *  - tables: array of table objects (optional — only shown when called from POS)
 *  - onClose: () => void
 *  - onConfirm: (form) => void  (called before success screen)
 */
export default function ReservationModal({ tables = [], onClose, onConfirm }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    covers: 2,
    date: "17 Apr 2026",
    time: "7:00 PM",
    tableId: "",
    dietary: "",
    notes: "",
  });
  const [saved, setSaved] = useState(false);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const blankTables = tables.filter((t) => t.status === "blank");
  const showTablePicker = tables.length > 0;

  const handleConfirm = () => {
    onConfirm?.(form);
    setSaved(true);
  };

  if (saved)
    return (
      <div
        className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-modal w-full max-w-[400px] p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle size={52} className="text-success mx-auto mb-4" />
          <p className="text-[17px] font-bold text-text-primary mb-1">
            Reservation Confirmed!
          </p>
          <p className="text-sm text-text-muted mb-1">
            {form.name} · {form.covers} covers · {form.time}
            {form.tableId && blankTables.length > 0
              ? ` · ${blankTables.find((t) => String(t.id) === String(form.tableId))?.name ?? ""}`
              : ""}
          </p>
          <p className="text-xs text-[#25D366] font-semibold mb-6">
            💬 WhatsApp confirmation sent ✅
          </p>
          <button
            className="btn-primary w-full justify-center"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    );

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[500px] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-primary" />
            <p className="text-[16px] font-semibold text-text-primary">
              New Reservation
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-4 space-y-4">
          {/* Name + Phone */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Guest Name</label>
              <input
                className="form-input"
                placeholder="Full name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Phone</label>
              <input
                className="form-input"
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
              />
            </div>
          </div>

          {/* Covers + Date + Time */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="form-label">Covers</label>
              <select
                className="dropdown-select w-full"
                value={form.covers}
                onChange={(e) => set("covers", Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                  <option key={n}>{n}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Date</label>
              <input
                className="form-input"
                value={form.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Time</label>
              <select
                className="dropdown-select w-full"
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
              >
                {TIMES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table picker — only shown when called from POS */}
          {showTablePicker && (
            <div>
              <label className="form-label">Table (optional)</label>
              <select
                className="dropdown-select w-full"
                value={form.tableId}
                onChange={(e) => set("tableId", e.target.value)}
              >
                <option value="">Auto-assign</option>
                {blankTables.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.section}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Dietary */}
          <div>
            <label className="form-label">Dietary / Allergies</label>
            <input
              className="form-input"
              placeholder="e.g. No nuts, Vegetarian, Vegan..."
              value={form.dietary}
              onChange={(e) => set("dietary", e.target.value)}
            />
          </div>

          {/* Notes */}
          <div>
            <label className="form-label">Special Notes</label>
            <textarea
              className="form-input resize-none"
              rows={2}
              placeholder="Birthday, anniversary, high chair needed..."
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
            />
          </div>

          {/* WhatsApp hint */}
          <div className="bg-[#E6F9EE] rounded-lg px-3 py-2 flex items-center gap-2">
            <span className="text-base">💬</span>
            <p className="text-[11px] text-[#1A6B3C] font-medium">
              WhatsApp confirmation will be sent automatically on save
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
          <button className="btn-ghost flex-shrink-0" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary flex-1 justify-center"
            onClick={handleConfirm}
            disabled={!form.name || !form.phone}
          >
            <CheckCircle size={14} /> Confirm Reservation
          </button>
        </div>
      </div>
    </div>
  );
}
