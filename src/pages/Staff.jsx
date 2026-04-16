import { Users, Clock, TrendingUp } from "lucide-react";
import { STAFF } from "../data/mockData";

export default function Staff() {
  return (
    <div className="fade-in">
      <div className="page-header">
        <div className="page-title">Staff Management</div>
        <button className="btn-primary">
          <Users size={14} /> Add Staff
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        {[
          {
            label: "On Duty Now",
            value: STAFF.length,
            icon: "👥",
            color: "#27AE60",
          },
          { label: "Total Staff", value: 12, icon: "🏢", color: "#5DADE2" },
          {
            label: "Avg Hours Today",
            value: "5.2h",
            icon: "⏱️",
            color: "#E67E22",
          },
          { label: "Labor Cost %", value: "18%", icon: "💰", color: "#CC3333" },
        ].map((s) => (
          <div key={s.label} className="stat-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div className="stat-label">{s.label}</div>
                <div
                  className="stat-value"
                  style={{ fontSize: "24px", marginTop: "4px", color: s.color }}
                >
                  {s.value}
                </div>
              </div>
              <span style={{ fontSize: "28px" }}>{s.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <div style={{ fontWeight: 600, fontSize: "14px" }}>
            Staff On Duty — Evening Shift
          </div>
          <span className="status-pill green">{STAFF.length} active</span>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Clock In</th>
              <th>Orders Today</th>
              <th>Sales Today</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {STAFF.map((s) => (
              <tr key={s.id}>
                <td>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        background: "#CC3333",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "13px",
                      }}
                    >
                      {s.name[0]}
                    </div>
                    <span style={{ fontWeight: 500 }}>{s.name}</span>
                  </div>
                </td>
                <td>
                  <span
                    className="status-pill blue"
                    style={{ fontSize: "10px" }}
                  >
                    {s.role}
                  </span>
                </td>
                <td style={{ color: "#888" }}>{s.clockIn}</td>
                <td style={{ fontWeight: 600 }}>{s.ordersToday}</td>
                <td style={{ fontWeight: 600 }}>
                  {s.salesToday > 0
                    ? `₹${s.salesToday.toLocaleString("en-IN")}`
                    : "—"}
                </td>
                <td>
                  <span className="status-pill green">Active</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
