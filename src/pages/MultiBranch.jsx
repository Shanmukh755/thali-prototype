import { useState } from "react";
import {
  Building2,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Globe,
  Users,
  BarChart3,
} from "lucide-react";

// ─── Branch data ───
const BRANCHES = [
  {
    id: 1,
    name: "Koramangala",
    city: "Bengaluru",
    status: "online",
    revenue: 42800,
    revenueChange: 9,
    orders: 187,
    activeTables: 12,
    totalTables: 30,
    foodCost: 29,
    rating: 4.4,
    staff: 8,
    avgOrderValue: 228,
    alerts: ["Paneer stock low", "2 negative Zomato reviews"],
  },
  {
    id: 2,
    name: "Indiranagar",
    city: "Bengaluru",
    status: "online",
    revenue: 38200,
    revenueChange: 14,
    orders: 162,
    activeTables: 9,
    totalTables: 24,
    foodCost: 31,
    rating: 4.6,
    staff: 7,
    avgOrderValue: 236,
    alerts: [],
  },
  {
    id: 3,
    name: "HSR Layout",
    city: "Bengaluru",
    status: "online",
    revenue: 29400,
    revenueChange: -3,
    orders: 124,
    activeTables: 7,
    totalTables: 20,
    foodCost: 34,
    rating: 4.1,
    staff: 6,
    avgOrderValue: 237,
    alerts: ["Food cost above target (34%)", "Low acceptance rate on Swiggy"],
  },
  {
    id: 4,
    name: "Whitefield",
    city: "Bengaluru",
    status: "offline",
    revenue: 0,
    revenueChange: 0,
    orders: 0,
    activeTables: 0,
    totalTables: 18,
    foodCost: 0,
    rating: 4.3,
    staff: 5,
    avgOrderValue: 0,
    alerts: ["Branch offline — check connectivity"],
  },
];

const CHAIN_STATS = {
  totalRevenue: BRANCHES.reduce((s, b) => s + b.revenue, 0),
  totalOrders: BRANCHES.reduce((s, b) => s + b.orders, 0),
  onlineBranches: BRANCHES.filter((b) => b.status === "online").length,
  avgFoodCost: Math.round(
    BRANCHES.filter((b) => b.foodCost > 0).reduce((s, b) => s + b.foodCost, 0) /
      BRANCHES.filter((b) => b.foodCost > 0).length,
  ),
};

// ─── Branch card ───
function BranchCard({ branch, onSelect, selected }) {
  const isSelected = selected?.id === branch.id;
  const isOffline = branch.status === "offline";

  return (
    <div
      onClick={() => onSelect(isSelected ? null : branch)}
      className={[
        "bg-white rounded-xl border p-4 cursor-pointer transition-all hover:shadow-md",
        isSelected ? "border-primary shadow-md" : "border-[#EEEEEE]",
        isOffline ? "opacity-60" : "",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-bold text-text-primary">
              {branch.name}
            </p>
            <span
              className={`w-2 h-2 rounded-full flex-shrink-0 ${branch.status === "online" ? "bg-success" : "bg-danger"}`}
            />
          </div>
          <p className="text-[11px] text-text-muted mt-[1px]">{branch.city}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star size={11} className="text-[#F9A825]" fill="#F9A825" />
          <span className="text-[12px] font-semibold">{branch.rating}</span>
        </div>
      </div>

      {/* Stats grid */}
      {!isOffline ? (
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="bg-surface rounded-lg p-2 text-center">
            <p className="text-[16px] font-bold text-primary">
              ₹{(branch.revenue / 1000).toFixed(1)}k
            </p>
            <p className="text-[9px] text-text-muted">Revenue</p>
          </div>
          <div className="bg-surface rounded-lg p-2 text-center">
            <p className="text-[16px] font-bold text-text-primary">
              {branch.orders}
            </p>
            <p className="text-[9px] text-text-muted">Orders</p>
          </div>
          <div className="bg-surface rounded-lg p-2 text-center">
            <p
              className={`text-[16px] font-bold ${branch.foodCost <= 31 ? "text-success" : "text-danger"}`}
            >
              {branch.foodCost}%
            </p>
            <p className="text-[9px] text-text-muted">Food Cost</p>
          </div>
          <div className="bg-surface rounded-lg p-2 text-center">
            <p className="text-[16px] font-bold text-info">
              {branch.activeTables}/{branch.totalTables}
            </p>
            <p className="text-[9px] text-text-muted">Tables</p>
          </div>
        </div>
      ) : (
        <div className="bg-[#FDECEA] rounded-lg p-3 mb-3 text-center">
          <p className="text-[12px] font-semibold text-danger">
            Branch Offline
          </p>
          <p className="text-[10px] text-text-muted mt-1">
            Check internet connectivity
          </p>
        </div>
      )}

      {/* Revenue change */}
      {!isOffline && (
        <div
          className={`flex items-center gap-1 text-[11px] font-medium mb-2 ${branch.revenueChange >= 0 ? "text-success" : "text-danger"}`}
        >
          {branch.revenueChange >= 0 ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          {Math.abs(branch.revenueChange)}% vs last week
        </div>
      )}

      {/* Alerts */}
      {branch.alerts.length > 0 && (
        <div className="space-y-1">
          {branch.alerts.map((alert, i) => (
            <div
              key={i}
              className="flex items-center gap-1 text-[10px] text-warning"
            >
              <AlertTriangle size={9} className="flex-shrink-0" />
              <span>{alert}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Branch detail panel ───
function BranchDetail({ branch, onClose }) {
  if (!branch) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-[199]" onClick={onClose} />
      <div className="side-panel open flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#EEEEEE]">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[15px] font-bold text-text-primary">
                {branch.name}
              </p>
              <span
                className={`w-2 h-2 rounded-full ${branch.status === "online" ? "bg-success" : "bg-danger"}`}
              />
            </div>
            <p className="text-[11px] text-text-muted">
              {branch.city} · {branch.staff} staff on duty
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* KPIs */}
          <div className="grid grid-cols-2 gap-2">
            {[
              {
                label: "Today Revenue",
                value: `₹${branch.revenue.toLocaleString("en-IN")}`,
                color: "text-primary",
              },
              {
                label: "Orders",
                value: branch.orders,
                color: "text-text-primary",
              },
              {
                label: "Food Cost %",
                value: `${branch.foodCost}%`,
                color: branch.foodCost <= 31 ? "text-success" : "text-danger",
              },
              {
                label: "Avg Order Value",
                value: `₹${branch.avgOrderValue}`,
                color: "text-info",
              },
              {
                label: "Rating",
                value: `⭐ ${branch.rating}`,
                color: "text-[#F9A825]",
              },
              {
                label: "Tables Active",
                value: `${branch.activeTables}/${branch.totalTables}`,
                color: "text-text-primary",
              },
            ].map((s) => (
              <div
                key={s.label}
                className="bg-surface rounded-lg p-3 text-center"
              >
                <p className={`text-[17px] font-bold ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-text-muted mt-[2px]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Alerts */}
          {branch.alerts.length > 0 && (
            <div>
              <p className="text-[12px] font-semibold text-text-primary mb-2">
                Active Alerts
              </p>
              {branch.alerts.map((a, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-[#FEF3E8] rounded-lg px-3 py-2 mb-2"
                >
                  <AlertTriangle
                    size={12}
                    className="text-warning flex-shrink-0"
                  />
                  <p className="text-[11px] text-warning font-medium">{a}</p>
                </div>
              ))}
            </div>
          )}

          {/* Benchmarking */}
          <div className="bg-[#EBF5FB] rounded-xl p-4">
            <p className="text-[12px] font-semibold text-info mb-2">
              📊 Chain Benchmark
            </p>
            <div className="space-y-2 text-[11px]">
              <div className="flex justify-between">
                <span className="text-text-muted">Your food cost</span>
                <span
                  className={`font-semibold ${branch.foodCost <= CHAIN_STATS.avgFoodCost ? "text-success" : "text-danger"}`}
                >
                  {branch.foodCost}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Chain avg food cost</span>
                <span className="font-semibold text-text-primary">
                  {CHAIN_STATS.avgFoodCost}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Your revenue rank</span>
                <span className="font-semibold text-primary">
                  #
                  {[...BRANCHES]
                    .sort((a, b) => b.revenue - a.revenue)
                    .findIndex((b) => b.id === branch.id) + 1}{" "}
                  of {BRANCHES.length}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 py-4 border-t border-[#EEEEEE] flex gap-2">
          <button className="btn-outline flex-1 justify-center text-xs py-[8px]">
            View Full Report
          </button>
          <button className="btn-primary flex-1 justify-center text-xs py-[8px]">
            Open POS
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Benchmarking tab ───
function BenchmarkingTab() {
  const metrics = [
    {
      label: "Revenue Today",
      key: "revenue",
      fmt: (v) => `₹${(v / 1000).toFixed(1)}k`,
      best: "highest",
    },
    {
      label: "Food Cost %",
      key: "foodCost",
      fmt: (v) => `${v}%`,
      best: "lowest",
    },
    { label: "Orders", key: "orders", fmt: (v) => v, best: "highest" },
    {
      label: "Avg Order Value",
      key: "avgOrderValue",
      fmt: (v) => `₹${v}`,
      best: "highest",
    },
    { label: "Rating", key: "rating", fmt: (v) => `⭐ ${v}`, best: "highest" },
  ];

  const onlineBranches = BRANCHES.filter((b) => b.status === "online");

  return (
    <div className="overflow-y-auto h-full">
      <div className="bg-white rounded-xl border border-[#EEEEEE] overflow-hidden">
        <div className="px-5 py-3 border-b border-[#F5F5F5]">
          <p className="text-[14px] font-semibold text-text-primary">
            Branch Benchmarking
          </p>
          <p className="text-[11px] text-text-muted mt-[1px]">
            Compare all branches side by side · Today's data
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table w-full">
            <thead>
              <tr>
                <th>Metric</th>
                {onlineBranches.map((b) => (
                  <th key={b.id}>{b.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {metrics.map((m) => {
                const values = onlineBranches.map((b) => b[m.key]);
                const best =
                  m.best === "highest"
                    ? Math.max(...values)
                    : Math.min(...values);
                return (
                  <tr key={m.label} className="hover:bg-[#FAFAFA]">
                    <td className="font-medium text-text-secondary">
                      {m.label}
                    </td>
                    {onlineBranches.map((b) => {
                      const val = b[m.key];
                      const isBest = val === best;
                      return (
                        <td key={b.id}>
                          <span
                            className={`font-semibold ${isBest ? "text-success" : "text-text-primary"}`}
                          >
                            {m.fmt(val)}
                            {isBest && (
                              <span className="text-[9px] ml-1">🏆</span>
                            )}
                          </span>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Industry benchmark note */}
      <div className="mt-4 bg-[#EBF5FB] border border-info/20 rounded-xl px-4 py-3">
        <p className="text-[12px] font-semibold text-info mb-1">
          📊 Anonymous Industry Benchmark
        </p>
        <p className="text-[11px] text-text-muted">
          Average food cost for North Indian restaurants in Bengaluru:{" "}
          <strong>29%</strong>. Your chain avg:{" "}
          <strong>{CHAIN_STATS.avgFoodCost}%</strong>.
          {CHAIN_STATS.avgFoodCost > 29
            ? " HSR Layout is pulling the average up — review their recipes."
            : " You're performing above industry average. ✅"}
        </p>
      </div>
    </div>
  );
}

// ─── Main MultiBranch page ───
const TABS = [
  { id: "overview", label: "Branch Overview" },
  { id: "benchmarking", label: "Benchmarking" },
];

export default function MultiBranch() {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBranch, setSelectedBranch] = useState(null);

  return (
    <div className="fade-in flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-[20px] font-semibold text-text-primary">
            Multi-Branch Management
          </h1>
          <p className="text-[13px] text-text-muted mt-[2px]">
            {CHAIN_STATS.onlineBranches}/{BRANCHES.length} branches online · ₹
            {(CHAIN_STATS.totalRevenue / 1000).toFixed(1)}k total revenue today
          </p>
        </div>
        <button className="btn-ghost text-xs py-[5px] px-3">
          <RefreshCw size={12} /> Refresh All
        </button>
      </div>

      {/* Chain stats */}
      <div className="grid grid-cols-4 gap-3 mb-4 flex-shrink-0">
        {[
          {
            label: "Total Revenue",
            value: `₹${(CHAIN_STATS.totalRevenue / 1000).toFixed(1)}k`,
            color: "text-primary",
          },
          {
            label: "Total Orders",
            value: CHAIN_STATS.totalOrders,
            color: "text-text-primary",
          },
          {
            label: "Online Branches",
            value: `${CHAIN_STATS.onlineBranches}/${BRANCHES.length}`,
            color: "text-success",
          },
          {
            label: "Chain Avg Food Cost",
            value: `${CHAIN_STATS.avgFoodCost}%`,
            color:
              CHAIN_STATS.avgFoodCost <= 31 ? "text-success" : "text-warning",
          },
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
        {activeTab === "overview" && (
          <div className="overflow-y-auto h-full">
            <div className="grid grid-cols-2 gap-3">
              {BRANCHES.map((b) => (
                <BranchCard
                  key={b.id}
                  branch={b}
                  onSelect={setSelectedBranch}
                  selected={selectedBranch}
                />
              ))}
            </div>
          </div>
        )}
        {activeTab === "benchmarking" && <BenchmarkingTab />}
      </div>

      {/* Branch detail panel */}
      {selectedBranch && (
        <BranchDetail
          branch={selectedBranch}
          onClose={() => setSelectedBranch(null)}
        />
      )}
    </div>
  );
}
