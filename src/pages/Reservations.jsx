import { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Phone,
  MessageSquare,
  Plus,
  CheckCircle,
  X,
  AlertTriangle,
  Bell,
  Star,
  ChevronRight,
  Utensils,
  MapPin,
} from "lucide-react";
import { RESERVATIONS, WAITLIST } from "../data/mockData";
import ReservationModal from "../components/ReservationModal";

// ─── Tier config ───
const TIER = {
  Platinum: { icon: "💎", bg: "bg-[#F3F3F3]", text: "text-[#555]" },
  Gold: { icon: "🥇", bg: "bg-[#FFFDE7]", text: "text-[#F9A825]" },
  Silver: { icon: "🥈", bg: "bg-[#F5F5F5]", text: "text-[#757575]" },
  Bronze: { icon: "🥉", bg: "bg-[#FDF3E7]", text: "text-[#CD7F32]" },
};

// ─── Status config ───
const STATUS = {
  confirmed: {
    label: "Confirmed",
    bg: "bg-[#EBF5FB]",
    text: "text-info",
    dot: "bg-info",
  },
  seated: {
    label: "Seated",
    bg: "bg-[#E8F8F0]",
    text: "text-success",
    dot: "bg-success",
  },
  pending: {
    label: "Pending",
    bg: "bg-[#FEF3E8]",
    text: "text-warning",
    dot: "bg-warning",
  },
  "no-show": {
    label: "No-show",
    bg: "bg-[#FDECEA]",
    text: "text-danger",
    dot: "bg-danger",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-[#F5F5F5]",
    text: "text-[#888]",
    dot: "bg-[#CCC]",
  },
};

const SOURCE_ICON = {
  WhatsApp: "💬",
  Google: "🔍",
  Website: "🌐",
  Phone: "📞",
};

// ─── Reservation detail panel ───
function ReservationPanel({ res, onClose, onStatusChange }) {
  const tier = TIER[res.tier] || TIER.Bronze;
  const status = STATUS[res.status] || STATUS.confirmed;

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-[199]" onClick={onClose} />
      <div className="side-panel open flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEEEEE]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-[15px]">
                {res.name[0]}
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[15px] font-semibold text-text-primary">
                  {res.name}
                </p>
                <span
                  className={`text-[10px] font-bold px-[6px] py-[1px] rounded-full ${tier.bg} ${tier.text}`}
                >
                  {tier.icon} {res.tier}
                </span>
              </div>
              <p className="text-[11px] text-text-muted mt-[1px]">
                {res.visits} visits · Last: {res.lastOrder}
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
          {/* Booking details */}
          <div className="bg-surface rounded-xl p-4 space-y-3">
            {[
              { icon: Calendar, label: "Date", value: res.date },
              { icon: Clock, label: "Time", value: res.time },
              { icon: Users, label: "Covers", value: `${res.covers} guests` },
              {
                icon: MapPin,
                label: "Table",
                value: res.table || "Not assigned",
              },
              { icon: Phone, label: "Phone", value: res.phone },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3">
                <Icon size={14} className="text-text-muted flex-shrink-0" />
                <span className="text-[11px] text-text-muted w-14 flex-shrink-0">
                  {label}
                </span>
                <span className="text-[13px] font-medium text-text-primary">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Status */}
          <div>
            <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-2">
              Status
            </p>
            <div className="flex gap-2 flex-wrap">
              {Object.entries(STATUS).map(([key, cfg]) => (
                <button
                  key={key}
                  onClick={() => onStatusChange(res.id, key)}
                  className={[
                    "text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-all capitalize",
                    res.status === key
                      ? `${cfg.bg} ${cfg.text} border-current`
                      : "bg-white text-text-muted border-[#E0E0E0] hover:border-[#CCCCCC]",
                  ].join(" ")}
                >
                  {cfg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dietary / notes */}
          {res.dietary && (
            <div className="bg-[#FEF3E8] rounded-lg px-3 py-2 flex items-start gap-2">
              <AlertTriangle
                size={13}
                className="text-warning mt-[1px] flex-shrink-0"
              />
              <p className="text-[12px] text-warning font-medium">
                {res.dietary}
              </p>
            </div>
          )}
          {res.notes && (
            <div className="bg-[#EBF5FB] rounded-lg px-3 py-2">
              <p className="text-[11px] text-text-muted mb-[2px] font-semibold">
                Notes
              </p>
              <p className="text-[12px] text-text-primary">{res.notes}</p>
            </div>
          )}

          {/* Pre-order */}
          {res.preOrder?.length > 0 && (
            <div>
              <p className="text-[11px] font-semibold text-text-muted uppercase tracking-wide mb-2">
                Pre-ordered Items
              </p>
              <div className="space-y-1">
                {res.preOrder.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 text-[12px] text-text-primary"
                  >
                    <Utensils size={11} className="text-text-muted" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source + no-show risk */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">
                {SOURCE_ICON[res.source] || "📋"}
              </span>
              <span className="text-[11px] text-text-muted">
                via {res.source}
              </span>
            </div>
            <span
              className={`text-[10px] font-semibold px-2 py-[2px] rounded-full ${
                res.noShowRisk === "high"
                  ? "bg-[#FDECEA] text-danger"
                  : res.noShowRisk === "medium"
                    ? "bg-[#FEF3E8] text-warning"
                    : "bg-[#E8F8F0] text-success"
              }`}
            >
              {res.noShowRisk === "high"
                ? "⚠️ High no-show risk"
                : res.noShowRisk === "medium"
                  ? "⚡ Medium risk"
                  : "✅ Low risk"}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#EEEEEE] flex gap-2">
          <button className="btn-ghost flex-1 justify-center text-xs py-[8px]">
            <MessageSquare size={13} /> WhatsApp
          </button>
          <button className="btn-primary flex-1 justify-center text-xs py-[8px]">
            <CheckCircle size={13} /> Seat Now
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Reservation card (timeline view) ───
function ReservationCard({ res, onClick }) {
  const tier = TIER[res.tier] || TIER.Bronze;
  const status = STATUS[res.status] || STATUS.confirmed;

  return (
    <div
      onClick={() => onClick(res)}
      className={[
        "bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md hover:-translate-y-px",
        res.status === "no-show"
          ? "border-danger/30 opacity-60"
          : res.status === "seated"
            ? "border-success/40 bg-[#F9FFFE]"
            : "border-[#E0E0E0]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">{res.name[0]}</span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[13px] font-semibold text-text-primary truncate">
                {res.name}
              </p>
              <span
                className={`text-[9px] font-bold px-[5px] py-[1px] rounded-full flex-shrink-0 ${tier.bg} ${tier.text}`}
              >
                {tier.icon}
              </span>
            </div>
            <p className="text-[10px] text-text-muted">{res.visits} visits</p>
          </div>
        </div>
        <span
          className={`text-[10px] font-semibold px-2 py-[2px] rounded-full flex-shrink-0 ${status.bg} ${status.text}`}
        >
          {status.label}
        </span>
      </div>

      <div className="flex items-center gap-4 text-[11px] text-text-muted mb-2">
        <span className="flex items-center gap-1">
          <Clock size={10} />
          {res.time}
        </span>
        <span className="flex items-center gap-1">
          <Users size={10} />
          {res.covers} covers
        </span>
        {res.table && (
          <span className="flex items-center gap-1">
            <MapPin size={10} />
            {res.table}
          </span>
        )}
      </div>

      {res.dietary && (
        <div className="flex items-center gap-1 text-[10px] text-warning font-medium">
          <AlertTriangle size={10} /> {res.dietary}
        </div>
      )}
      {res.notes && (
        <p className="text-[10px] text-text-muted mt-1 truncate">
          📝 {res.notes}
        </p>
      )}
      {res.preOrder?.length > 0 && (
        <p className="text-[10px] text-info mt-1">
          🍽️ Pre-ordered {res.preOrder.length} items
        </p>
      )}

      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F5F5F5]">
        <span className="text-[10px] text-text-muted">
          {SOURCE_ICON[res.source]} {res.source}
        </span>
        <ChevronRight size={12} className="text-text-muted" />
      </div>
    </div>
  );
}

// ─── Waitlist tab ───
function WaitlistTab() {
  const [list, setList] = useState(WAITLIST);

  const notify = (id) =>
    setList((prev) =>
      prev.map((w) => (w.id === id ? { ...w, status: "notified" } : w)),
    );
  const seat = (id) => setList((prev) => prev.filter((w) => w.id !== id));

  return (
    <div className="space-y-3">
      {list.length === 0 ? (
        <div className="text-center py-16">
          <CheckCircle
            size={40}
            className="text-success opacity-40 mx-auto mb-3"
          />
          <p className="text-[15px] font-semibold text-text-primary">
            Waitlist is clear!
          </p>
        </div>
      ) : (
        list.map((w) => (
          <div
            key={w.id}
            className={`bg-white rounded-xl border p-4 flex items-center gap-4 ${w.status === "notified" ? "border-success/40 bg-[#F9FFFE]" : "border-[#E0E0E0]"}`}
          >
            <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center flex-shrink-0">
              <Users size={16} className="text-text-muted" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-text-primary">
                {w.name}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-text-muted mt-[2px]">
                <span className="flex items-center gap-1">
                  <Users size={10} />
                  {w.covers} covers
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={10} />
                  Waiting since {w.waitSince}
                </span>
                <span className="font-medium text-warning">
                  ~{w.estimatedWait}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {w.status === "waiting" ? (
                <button
                  onClick={() => notify(w.id)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-info border border-info rounded-lg px-3 py-[5px] hover:bg-[#EBF5FB] transition-colors"
                >
                  <Bell size={11} /> Notify
                </button>
              ) : (
                <span className="text-[10px] font-semibold text-success bg-[#E8F8F0] px-2 py-[3px] rounded-full">
                  Notified ✅
                </span>
              )}
              <button
                onClick={() => seat(w.id)}
                className="btn-primary text-xs py-[5px] px-3"
              >
                Seat
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

// ─── Calendar tab — simple week view ───
function CalendarTab({ reservations, onSelect }) {
  const days = [
    "Mon 14",
    "Tue 15",
    "Wed 16",
    "Thu 17",
    "Fri 18",
    "Sat 19",
    "Sun 20",
  ];
  const times = [
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
  const todayIdx = 3; // Thu 17

  // Map today's reservations to time slots
  const slotMap = {};
  reservations.forEach((r) => {
    slotMap[r.time] = [...(slotMap[r.time] || []), r];
  });

  return (
    <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
      {/* Day headers */}
      <div
        className="grid border-b border-[#EEEEEE]"
        style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}
      >
        <div className="px-3 py-2 text-[10px] text-text-muted font-semibold border-r border-[#EEEEEE]">
          Time
        </div>
        {days.map((d, i) => (
          <div
            key={d}
            className={`px-3 py-2 text-center border-r border-[#EEEEEE] last:border-r-0 ${i === todayIdx ? "bg-[#FFF5F5]" : ""}`}
          >
            <p
              className={`text-[11px] font-semibold ${i === todayIdx ? "text-primary" : "text-text-primary"}`}
            >
              {d}
            </p>
            {i === todayIdx && (
              <p className="text-[9px] text-primary font-bold">TODAY</p>
            )}
          </div>
        ))}
      </div>

      {/* Time slots */}
      <div className="overflow-y-auto max-h-[420px]">
        {times.map((time) => (
          <div
            key={time}
            className="grid border-b border-[#F5F5F5] last:border-b-0"
            style={{ gridTemplateColumns: "80px repeat(7, 1fr)" }}
          >
            <div className="px-3 py-2 text-[10px] text-text-muted border-r border-[#EEEEEE] flex items-center">
              {time}
            </div>
            {days.map((d, i) => {
              const isToday = i === todayIdx;
              const slot = isToday ? slotMap[time] || [] : [];
              return (
                <div
                  key={d}
                  className={`px-1 py-1 border-r border-[#F5F5F5] last:border-r-0 min-h-[44px] ${isToday ? "bg-[#FFFAFA]" : ""}`}
                >
                  {slot.map((res) => {
                    const st = STATUS[res.status] || STATUS.confirmed;
                    return (
                      <div
                        key={res.id}
                        onClick={() => onSelect(res)}
                        className={`rounded px-2 py-1 mb-1 cursor-pointer text-[10px] font-semibold truncate ${st.bg} ${st.text} hover:opacity-80 transition-opacity`}
                      >
                        {res.name} ({res.covers})
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Reservations page ───
export default function Reservations() {
  const [activeTab, setActiveTab] = useState("today");
  const [reservations, setReservations] = useState(RESERVATIONS);
  const [selectedRes, setSelectedRes] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const handleStatusChange = (id, newStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
    setSelectedRes((prev) =>
      prev?.id === id ? { ...prev, status: newStatus } : prev,
    );
  };

  // Summary stats
  const confirmed = reservations.filter((r) => r.status === "confirmed").length;
  const seated = reservations.filter((r) => r.status === "seated").length;
  const noShow = reservations.filter((r) => r.status === "no-show").length;
  const covers = reservations
    .filter((r) => !["no-show", "cancelled"].includes(r.status))
    .reduce((s, r) => s + r.covers, 0);

  const TABS = [
    { id: "today", label: "Today's Bookings" },
    { id: "waitlist", label: `Waitlist (${WAITLIST.length})` },
    { id: "calendar", label: "Calendar View" },
  ];

  return (
    <div className="fade-in flex flex-col h-full">
      {/* ── Page header ── */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-text-primary">
            Reservations
          </h1>
          <p className="text-[13px] text-text-muted mt-[2px]">
            Thursday, 17 April 2026 · Koramangala
          </p>
        </div>
        <button className="btn-primary" onClick={() => setShowNewModal(true)}>
          <Plus size={15} /> New Reservation
        </button>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        {[
          {
            label: "Confirmed",
            value: confirmed,
            color: "text-info",
            icon: CheckCircle,
          },
          {
            label: "Seated",
            value: seated,
            color: "text-success",
            icon: Users,
          },
          {
            label: "Total Covers",
            value: covers,
            color: "text-primary",
            icon: Users,
          },
          {
            label: "No-shows",
            value: noShow,
            color: "text-danger",
            icon: AlertTriangle,
          },
        ].map(({ label, value, color, icon: Icon }) => (
          <div
            key={label}
            className="bg-white rounded-xl border border-[#EEEEEE] px-4 py-3 flex items-center gap-3"
          >
            <Icon size={20} className={`${color} opacity-70`} />
            <div>
              <p className="text-[10px] text-text-muted uppercase tracking-wide font-semibold">
                {label}
              </p>
              <p className={`text-[22px] font-bold leading-tight ${color}`}>
                {value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-[5px] mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={[
              "px-4 py-[7px] rounded-lg text-xs font-semibold border transition-all",
              activeTab === t.id
                ? "bg-primary text-white border-primary"
                : "bg-white text-text-secondary border-[#E0E0E0] hover:bg-surface",
            ].join(" ")}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Content ── */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "today" && (
          <div className="grid grid-cols-3 gap-3">
            {reservations.map((res) => (
              <ReservationCard
                key={res.id}
                res={res}
                onClick={setSelectedRes}
              />
            ))}
          </div>
        )}
        {activeTab === "waitlist" && <WaitlistTab />}
        {activeTab === "calendar" && (
          <CalendarTab reservations={reservations} onSelect={setSelectedRes} />
        )}
      </div>

      {/* ── Detail panel ── */}
      {selectedRes && (
        <ReservationPanel
          res={selectedRes}
          onClose={() => setSelectedRes(null)}
          onStatusChange={handleStatusChange}
        />
      )}

      {showNewModal && (
        <ReservationModal onClose={() => setShowNewModal(false)} />
      )}
    </div>
  );
}
