import { useState, useEffect, useRef } from "react";
import { KDS_TICKETS } from "../data/mockData";
import {
  Bike,
  Clock,
  Users,
  ChefHat,
  CheckCircle,
  RotateCcw,
  Zap,
  AlertTriangle,
  Package,
} from "lucide-react";

// ─── Station config ───
const STATIONS = [
  { id: "all", label: "All Stations" },
  { id: "grill", label: "Grill" },
  { id: "curry", label: "Curry" },
  { id: "tandoor", label: "Tandoor" },
  { id: "rice", label: "Rice" },
  { id: "south", label: "South" },
  { id: "cold", label: "Cold" },
];

// ─── Platform colors ───
const PLATFORM_COLOR = {
  Zomato: "bg-[#E23744] text-white",
  Swiggy: "bg-[#FC8019] text-white",
  ONDC: "bg-[#27AE60] text-white",
  default: "bg-[#5DADE2] text-white",
};

// ─── Timer urgency ───
function getUrgency(elapsed, expected) {
  const pct = elapsed / expected;
  if (pct >= 1) return "red";
  if (pct >= 0.75) return "yellow";
  return "green";
}

const URGENCY_BORDER = {
  green: "border-[#27AE60]",
  yellow: "border-[#F0C040]",
  red: "border-[#E74C3C]",
};
const URGENCY_TIMER = {
  green: "text-[#27AE60]",
  yellow: "text-[#F0C040]",
  red: "text-[#E74C3C]",
};
const URGENCY_HEADER = {
  green: "bg-[#1A2A1A]",
  yellow: "bg-[#2A2200]",
  red: "bg-[#2A0A0A]",
};

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Single KDS ticket card ───
function KDSTicket({ ticket, onAction, isExiting }) {
  const [elapsed, setElapsed] = useState(ticket.startTime);
  const urgency = getUrgency(elapsed, ticket.expectedTime);

  useEffect(() => {
    if (ticket.status === "ready" || ticket.status === "done") return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [ticket.status]);

  const platColor = ticket.platform
    ? PLATFORM_COLOR[ticket.platform] || PLATFORM_COLOR.default
    : "bg-[#5DADE2] text-white";

  return (
    <div
      className={[
        "rounded-xl border-2 flex flex-col overflow-hidden transition-all duration-400 w-[230px] flex-shrink-0",
        URGENCY_BORDER[urgency],
        isExiting ? "opacity-0 scale-95" : "opacity-100 scale-100",
      ].join(" ")}
    >
      {/* ── Ticket header ── */}
      <div className={`px-3 py-2 ${URGENCY_HEADER[urgency]}`}>
        <div className="flex items-start justify-between">
          <div className="min-w-0">
            {/* KOT ID */}
            <p className="text-[10px] text-[#666] font-mono mb-[2px]">
              {ticket.id}
            </p>
            {/* Table or brand */}
            <p className="text-white font-bold text-[14px] leading-tight truncate">
              {ticket.table || ticket.brand || "Order"}
            </p>
            {/* Waiter */}
            {ticket.waiter && (
              <p className="text-[10px] text-[#888] mt-[1px]">
                👤 {ticket.waiter}
              </p>
            )}
          </div>
          {/* Timer */}
          <div
            className={`text-[22px] font-bold font-mono tabular-nums flex-shrink-0 ${URGENCY_TIMER[urgency]}`}
          >
            {formatTime(elapsed)}
          </div>
        </div>

        {/* Tags row */}
        <div className="flex items-center gap-[5px] mt-2 flex-wrap">
          <span
            className={`text-[9px] font-bold px-[6px] py-[2px] rounded ${platColor}`}
          >
            {ticket.type === "dine-in" ? "DINE-IN" : ticket.platform || "ONDC"}
          </span>
          {ticket.covers && (
            <span className="flex items-center gap-[3px] text-[9px] text-[#888]">
              <Users size={9} />
              {ticket.covers}
            </span>
          )}
          {ticket.priority === "urgent" && (
            <span className="flex items-center gap-[3px] text-[9px] font-bold text-[#E74C3C] bg-[#2A0A0A] px-[5px] py-[1px] rounded">
              <AlertTriangle size={9} /> URGENT
            </span>
          )}
          {ticket.priority === "high" && (
            <span className="flex items-center gap-[3px] text-[9px] font-bold text-[#F0C040] bg-[#2A2200] px-[5px] py-[1px] rounded">
              <Zap size={9} /> HIGH
            </span>
          )}
        </div>
      </div>

      {/* ── Delivery ETA ── */}
      {ticket.deliveryEta && (
        <div className="flex items-center gap-2 px-3 py-[6px] bg-[#1A1A1A] border-b border-[#2A2A2A]">
          <Bike size={11} className="text-[#F0C040] flex-shrink-0" />
          <span className="text-[11px] text-[#ccc]">
            Partner:{" "}
            <span className="text-white font-semibold">
              {ticket.deliveryEta} away
            </span>
          </span>
        </div>
      )}

      {/* ── Items ── */}
      <div className="flex-1 px-3 py-2 bg-[#1A1A1A] space-y-[6px]">
        {ticket.items.map((item, i) => (
          <div key={i} className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-[6px]">
                <span className="text-[#E0E0E0] text-[13px] leading-tight">
                  {item.name}
                </span>
                {item.note && (
                  <span className="text-[9px] text-[#F0C040] bg-[#2A2200] px-[4px] py-[1px] rounded flex-shrink-0">
                    {item.note}
                  </span>
                )}
              </div>
              <span className="text-[9px] text-[#555] capitalize">
                {item.station}
              </span>
            </div>
            <span className="text-white font-bold text-[13px] flex-shrink-0">
              ×{item.qty}
            </span>
          </div>
        ))}
      </div>

      {/* ── Packaging ── */}
      {ticket.packaging && (
        <div className="flex items-center gap-2 px-3 py-[5px] bg-[#111] border-t border-[#2A2A2A]">
          <Package size={10} className="text-[#666]" />
          <span className="text-[10px] text-[#666] italic">
            {ticket.packaging}
          </span>
        </div>
      )}

      {/* ── Action buttons ── */}
      <div className="flex gap-[5px] px-3 py-2 bg-[#111] border-t border-[#2A2A2A]">
        {ticket.status === "new" && (
          <>
            <button
              onClick={() => onAction(ticket.id, "cooking")}
              className="flex-1 py-[7px] rounded-lg bg-[#27AE60] text-white text-[11px] font-bold hover:bg-[#1E8449] transition-colors"
            >
              START
            </button>
            <button
              onClick={() => onAction(ticket.id, "ready")}
              className="flex-1 py-[7px] rounded-lg border border-[#444] text-[#888] text-[11px] font-bold hover:border-[#F0C040] hover:text-[#F0C040] transition-colors"
            >
              READY
            </button>
          </>
        )}
        {ticket.status === "cooking" && (
          <button
            onClick={() => onAction(ticket.id, "ready")}
            className="flex-1 py-[7px] rounded-lg bg-[#F0C040] text-[#1A1A1A] text-[11px] font-bold hover:bg-[#D4A800] transition-colors"
          >
            MARK READY
          </button>
        )}
        {(ticket.status === "ready" || ticket.status === "overdue") && (
          <button
            onClick={() => onAction(ticket.id, "done")}
            className="flex-1 py-[7px] rounded-lg bg-[#CC3333] text-white text-[11px] font-bold hover:bg-[#A93226] transition-colors"
          >
            BUMP ✓
          </button>
        )}
      </div>
    </div>
  );
}

// ─── Station performance bar ───
function StationBar({ tickets }) {
  const stationCounts = {};
  tickets.forEach((t) => {
    t.items.forEach((i) => {
      stationCounts[i.station] = (stationCounts[i.station] || 0) + i.qty;
    });
  });

  const entries = Object.entries(stationCounts).sort((a, b) => b[1] - a[1]);
  if (entries.length === 0) return null;
  const max = entries[0][1];

  return (
    <div className="flex items-end gap-3 h-[48px]">
      {entries.map(([station, count]) => (
        <div key={station} className="flex flex-col items-center gap-1">
          <span className="text-[9px] text-[#666] font-semibold">{count}</span>
          <div
            className="w-[28px] rounded-t bg-[#CC3333] opacity-70"
            style={{ height: `${Math.max(8, (count / max) * 32)}px` }}
          />
          <span className="text-[8px] text-[#555] capitalize">{station}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Completed ticket flash ───
function CompletedFlash({ count }) {
  if (count === 0) return null;
  return (
    <div className="flex items-center gap-2 bg-[#0A2A0A] border border-[#27AE60]/30 rounded-lg px-3 py-2">
      <CheckCircle size={14} className="text-[#27AE60]" />
      <span className="text-[11px] text-[#27AE60] font-semibold">
        {count} completed today
      </span>
    </div>
  );
}

// ─── Main Kitchen page ───
export default function Kitchen() {
  const [tickets, setTickets] = useState(KDS_TICKETS);
  const [station, setStation] = useState("all");
  const [exitingIds, setExitingIds] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [view, setView] = useState("grid"); // grid | list

  const handleAction = (id, action) => {
    if (action === "done") {
      // Animate out then remove
      setExitingIds((prev) => [...prev, id]);
      setTimeout(() => {
        setTickets((prev) => prev.filter((t) => t.id !== id));
        setExitingIds((prev) => prev.filter((d) => d !== id));
        setCompletedCount((n) => n + 1);
      }, 400);
    } else {
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: action } : t)),
      );
    }
  };

  const handleReset = () => {
    setTickets(KDS_TICKETS);
    setCompletedCount(0);
  };

  const filtered =
    station === "all"
      ? tickets
      : tickets.filter((t) => t.items.some((i) => i.station === station));

  const stats = {
    queue: filtered.length,
    new: filtered.filter((t) => t.status === "new").length,
    cooking: filtered.filter((t) => t.status === "cooking").length,
    ready: filtered.filter((t) => t.status === "ready").length,
    overdue: filtered.filter((t) => t.status === "overdue").length,
  };

  const now = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex flex-col h-full bg-[#111111] -m-6 p-5 font-sans">
      {/* ── Header ── */}
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        {/* Left — title + time */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#CC3333] flex items-center justify-center flex-shrink-0">
            <ChefHat size={18} color="white" />
          </div>
          <div>
            <p className="text-white text-[18px] font-bold leading-tight">
              Kitchen Display
            </p>
            <p className="text-[#666] text-[11px]">
              {filtered.length} active · {now}
            </p>
          </div>
        </div>

        {/* Center — station filter */}
        <div className="flex gap-[5px] flex-wrap justify-center">
          {STATIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setStation(s.id)}
              className={[
                "px-3 py-[5px] rounded-lg text-[11px] font-bold transition-all",
                station === s.id
                  ? "bg-[#CC3333] text-white"
                  : "bg-[#2A2A2A] text-[#888] hover:text-[#ccc]",
              ].join(" ")}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Right — stats + reset */}
        <div className="flex items-center gap-4">
          {[
            { label: "Queue", value: stats.queue, color: "text-[#5DADE2]" },
            { label: "Cooking", value: stats.cooking, color: "text-[#F0C040]" },
            { label: "Ready", value: stats.ready, color: "text-[#27AE60]" },
            { label: "Overdue", value: stats.overdue, color: "text-[#E74C3C]" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className={`text-[20px] font-bold leading-tight ${s.color}`}>
                {s.value}
              </p>
              <p className="text-[9px] text-[#555] uppercase tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-[10px] text-[#555] hover:text-[#888] transition-colors ml-2"
            title="Reset demo"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>

      {/* ── Station load bar + completed flash ── */}
      <div className="flex items-end justify-between mb-4 flex-shrink-0">
        <StationBar tickets={filtered} />
        <CompletedFlash count={completedCount} />
      </div>

      {/* ── Ticket grid ── */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <CheckCircle size={48} className="text-[#27AE60] opacity-30 mb-4" />
            <p className="text-[#444] text-[16px] font-semibold">All clear!</p>
            <p className="text-[#333] text-[12px] mt-1">
              {station === "all"
                ? "No active orders"
                : `No orders for ${station} station`}
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 content-start">
            {filtered.map((ticket) => (
              <KDSTicket
                key={ticket.id}
                ticket={ticket}
                onAction={handleAction}
                isExiting={exitingIds.includes(ticket.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
