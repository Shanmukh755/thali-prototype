import { useState } from "react";
import { Users, Plus, Trophy, AlertTriangle, Clock, Star } from "lucide-react";
import { STAFF } from "../data/mockData";

// ─── Leaderboard data ───
const LEADERBOARD = [...STAFF]
  .filter((s) => s.salesToday > 0)
  .sort((a, b) => b.salesToday - a.salesToday);

// ─── Fraud alerts ───
const FRAUD_FLAGS = [
  {
    staff: "Ravi Shankar",
    issue: "8 KOT cancellations today (avg: 1.2)",
    severity: "high",
  },
  {
    staff: "Priya Devi",
    issue: "Applied manager discount 4× in 2 hours",
    severity: "medium",
  },
];

// ─── Schedule data ───
const SCHEDULE = [
  {
    name: "Suresh Kumar",
    role: "Waiter",
    mon: "E",
    tue: "E",
    wed: "E",
    thu: "E",
    fri: "E",
    sat: "E",
    sun: "O",
  },
  {
    name: "Priya Devi",
    role: "Waiter",
    mon: "E",
    tue: "O",
    wed: "E",
    thu: "E",
    fri: "E",
    sat: "E",
    sun: "E",
  },
  {
    name: "Ravi Shankar",
    role: "Cashier",
    mon: "E",
    tue: "E",
    wed: "E",
    thu: "E",
    fri: "E",
    sat: "M",
    sun: "M",
  },
  {
    name: "Mohan Das",
    role: "Waiter",
    mon: "M",
    tue: "M",
    wed: "M",
    thu: "E",
    fri: "E",
    sat: "E",
    sun: "E",
  },
  {
    name: "Deepa Nair",
    role: "Waiter",
    mon: "E",
    tue: "E",
    wed: "O",
    thu: "E",
    fri: "E",
    sat: "E",
    sun: "O",
  },
  {
    name: "Arjun Sharma",
    role: "Bartender",
    mon: "E",
    tue: "E",
    wed: "E",
    thu: "E",
    fri: "E",
    sat: "E",
    sun: "E",
  },
  {
    name: "Raju Chef",
    role: "Head Chef",
    mon: "E",
    tue: "E",
    wed: "E",
    thu: "E",
    fri: "E",
    sat: "E",
    sun: "E",
  },
  {
    name: "Lakshmi",
    role: "Receptionist",
    mon: "M",
    tue: "M",
    wed: "M",
    thu: "M",
    fri: "M",
    sat: "O",
    sun: "O",
  },
];
const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SHIFT_CFG = {
  E: { label: "Eve", bg: "bg-[#EBF5FB]", text: "text-info" },
  M: { label: "Morn", bg: "bg-[#E8F8F0]", text: "text-success" },
  O: { label: "Off", bg: "bg-[#F5F5F5]", text: "text-[#888]" },
};

// ─── On Duty tab ───
function OnDutyTab() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Fraud alerts */}
      {FRAUD_FLAGS.length > 0 && (
        <div className="mb-3 space-y-2 flex-shrink-0">
          {FRAUD_FLAGS.map((f, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${f.severity === "high" ? "bg-[#FDECEA] border-danger/20" : "bg-[#FEF3E8] border-warning/20"}`}
            >
              <AlertTriangle
                size={14}
                className={
                  f.severity === "high" ? "text-danger" : "text-warning"
                }
              />
              <p
                className={`text-[12px] font-medium flex-1 ${f.severity === "high" ? "text-danger" : "text-warning"}`}
              >
                <strong>{f.staff}:</strong> {f.issue}
              </p>
              <button className="btn-ghost text-xs py-[3px] px-2">
                Investigate
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Evening Shift — On Duty
          </p>
          <span className="status-pill green">{STAFF.length} active</span>
        </div>
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Staff</th>
              <th>Role</th>
              <th>Clock In</th>
              <th>Orders</th>
              <th>Sales</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {STAFF.map((s) => (
              <tr key={s.id} className="hover:bg-[#FAFAFA]">
                <td>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-[13px]">
                        {s.name[0]}
                      </span>
                    </div>
                    <span className="font-medium text-text-primary">
                      {s.name}
                    </span>
                    {FRAUD_FLAGS.some((f) => f.staff === s.name) && (
                      <AlertTriangle size={12} className="text-warning" />
                    )}
                  </div>
                </td>
                <td>
                  <span className="status-pill blue text-[10px]">{s.role}</span>
                </td>
                <td className="text-xs text-text-muted">{s.clockIn}</td>
                <td className="font-semibold">{s.ordersToday || "—"}</td>
                <td className="font-semibold">
                  {s.salesToday > 0
                    ? `₹${s.salesToday.toLocaleString("en-IN")}`
                    : "—"}
                </td>
                <td>
                  <span className="status-pill green text-[10px]">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Performance tab ───
function PerformanceTab() {
  return (
    <div className="flex flex-col h-full overflow-y-auto space-y-4">
      {/* Leaderboard */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-[#F5F5F5]">
          <Trophy size={15} className="text-[#F9A825]" />
          <p className="text-[14px] font-semibold text-text-primary">
            Sales Leaderboard — Today
          </p>
        </div>
        <div>
          {LEADERBOARD.map((s, i) => {
            const pct = Math.round(
              (s.salesToday / LEADERBOARD[0].salesToday) * 100,
            );
            const medals = ["🥇", "🥈", "🥉"];
            return (
              <div
                key={s.id}
                className="flex items-center gap-4 px-5 py-3 border-b border-[#F5F5F5] last:border-b-0"
              >
                <span className="text-[18px] w-6 text-center">
                  {medals[i] || `#${i + 1}`}
                </span>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-[13px]">
                    {s.name[0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[13px] font-semibold text-text-primary">
                      {s.name}
                    </p>
                    <p className="text-[13px] font-bold text-primary">
                      ₹{s.salesToday.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="flex-1 h-[5px] bg-[#F0F0F0] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${i === 0 ? "bg-[#F9A825]" : "bg-info"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-text-muted mt-1">
                    {s.ordersToday} orders · {s.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Gamification badges */}
      <div className="bg-white rounded-xl border border-[#EEEEEE] p-5">
        <p className="text-[14px] font-semibold text-text-primary mb-3">
          This Week's Badges
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              badge: "🏆",
              title: "Top Seller",
              staff: "Suresh Kumar",
              desc: "Highest sales this week",
            },
            {
              badge: "⚡",
              title: "Speed Demon",
              staff: "Ravi Shankar",
              desc: "Fastest billing — avg 2.1m",
            },
            {
              badge: "⭐",
              title: "5-Star Service",
              staff: "Priya Devi",
              desc: "3 customer compliments",
            },
          ].map((b) => (
            <div
              key={b.title}
              className="bg-[#FFFDE7] border border-[#FFD54F] rounded-xl p-3 text-center"
            >
              <p className="text-3xl mb-1">{b.badge}</p>
              <p className="text-[12px] font-bold text-[#5D4037]">{b.title}</p>
              <p className="text-[11px] text-[#795548] font-medium mt-[2px]">
                {b.staff}
              </p>
              <p className="text-[10px] text-[#A1887F] mt-1">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Schedule tab ───
function ScheduleTab() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <p className="text-sm text-text-muted">
          Week of 14–20 Apr 2026 · E = Evening · M = Morning · O = Off
        </p>
        <button className="btn-primary text-xs py-[6px] px-3">
          + Add Shift
        </button>
      </div>
      <div className="flex-1 overflow-y-auto bg-white rounded-xl border border-[#EEEEEE]">
        <table className="data-table w-full">
          <thead>
            <tr>
              <th>Staff</th>
              <th>Role</th>
              {DAY_LABELS.map((d) => (
                <th key={d}>{d}</th>
              ))}
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
            {SCHEDULE.map((s) => {
              const workDays = DAYS.filter((d) => s[d] !== "O").length;
              return (
                <tr key={s.name} className="hover:bg-[#FAFAFA]">
                  <td className="font-medium text-text-primary">{s.name}</td>
                  <td>
                    <span className="status-pill blue text-[10px]">
                      {s.role}
                    </span>
                  </td>
                  {DAYS.map((d) => {
                    const cfg = SHIFT_CFG[s[d]];
                    return (
                      <td key={d}>
                        <span
                          className={`text-[10px] font-semibold px-2 py-[3px] rounded-full ${cfg.bg} ${cfg.text}`}
                        >
                          {cfg.label}
                        </span>
                      </td>
                    );
                  })}
                  <td className="font-semibold text-text-primary">
                    {workDays * 8}h
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Main Staff page ───
const TABS = [
  { id: "duty", label: "On Duty" },
  { id: "performance", label: "Performance" },
  { id: "schedule", label: "Schedule" },
];

export default function Staff() {
  const [activeTab, setActiveTab] = useState("duty");

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-text-primary">
            Staff Management
          </h1>
          <p className="text-[13px] text-text-muted mt-[2px]">
            {STAFF.length} on duty · Evening shift
          </p>
        </div>
        <button className="btn-primary">
          <Plus size={14} /> Add Staff
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-4 flex-shrink-0">
        {[
          { label: "On Duty Now", value: STAFF.length, color: "text-success" },
          { label: "Total Staff", value: 12, color: "text-text-primary" },
          { label: "Avg Hours Today", value: "5.2h", color: "text-warning" },
          { label: "Labor Cost %", value: "18%", color: "text-primary" },
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
        {activeTab === "duty" && <OnDutyTab />}
        {activeTab === "performance" && <PerformanceTab />}
        {activeTab === "schedule" && <ScheduleTab />}
      </div>
    </div>
  );
}
