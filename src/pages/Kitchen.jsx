import { useState, useEffect } from "react";
import { KDS_TICKETS } from "../data/mockData";

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function getTimerClass(elapsed, expected) {
  const pct = elapsed / expected;
  if (pct >= 1) return "red";
  if (pct >= 0.75) return "yellow";
  return "green";
}

function KDSTicket({ ticket, onAction }) {
  const [elapsed, setElapsed] = useState(ticket.startTime);
  const timerClass = getTimerClass(elapsed, ticket.expectedTime);

  useEffect(() => {
    if (ticket.status === "done") return;
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, [ticket.status]);

  return (
    <div
      className={`kds-ticket ${timerClass}`}
      style={{ minWidth: "220px", flex: "0 0 auto" }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "10px",
        }}
      >
        <div>
          <div style={{ color: "white", fontWeight: 700, fontSize: "14px" }}>
            {ticket.table || ticket.brand || "Order"}
          </div>
          <div
            style={{
              display: "flex",
              gap: "6px",
              marginTop: "3px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 600,
                padding: "2px 6px",
                borderRadius: "4px",
                background:
                  ticket.type === "dine-in"
                    ? "#5DADE2"
                    : ticket.platform === "Zomato"
                      ? "#E23744"
                      : ticket.platform === "Swiggy"
                        ? "#FC8019"
                        : "#27AE60",
                color: "white",
              }}
            >
              {ticket.type === "dine-in"
                ? "DINE-IN"
                : ticket.platform || "ONDC"}
            </span>
            {ticket.covers && (
              <span style={{ fontSize: "10px", color: "#888" }}>
                {ticket.covers} covers
              </span>
            )}
          </div>
        </div>
        <div className={`kds-timer ${timerClass}`}>{formatTime(elapsed)}</div>
      </div>

      {/* Delivery ETA */}
      {ticket.deliveryEta && (
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            borderRadius: "6px",
            padding: "6px 8px",
            marginBottom: "10px",
            fontSize: "11px",
            color: "#ccc",
          }}
        >
          🛵 Delivery partner:{" "}
          <strong style={{ color: "white" }}>{ticket.deliveryEta} away</strong>
        </div>
      )}

      {/* Items */}
      <div style={{ marginBottom: "12px" }}>
        {ticket.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "5px",
            }}
          >
            <span style={{ color: "#E0E0E0", fontSize: "13px" }}>
              • {item.name}
            </span>
            <span style={{ color: "white", fontWeight: 600, fontSize: "13px" }}>
              ×{item.qty}
            </span>
          </div>
        ))}
      </div>

      {/* Packaging */}
      {ticket.packaging && (
        <div
          style={{
            fontSize: "11px",
            color: "#888",
            marginBottom: "10px",
            fontStyle: "italic",
          }}
        >
          📦 {ticket.packaging}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: "flex", gap: "6px" }}>
        {ticket.status === "new" && (
          <button
            onClick={() => onAction(ticket.id, "start")}
            style={{
              flex: 1,
              padding: "7px",
              borderRadius: "6px",
              border: "none",
              background: "#27AE60",
              color: "white",
              fontWeight: 600,
              fontSize: "11px",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            START
          </button>
        )}
        {ticket.status === "cooking" && (
          <>
            <button
              onClick={() => onAction(ticket.id, "ready")}
              style={{
                flex: 1,
                padding: "7px",
                borderRadius: "6px",
                border: "none",
                background: "#F0C040",
                color: "#1A1A1A",
                fontWeight: 600,
                fontSize: "11px",
                cursor: "pointer",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              READY
            </button>
          </>
        )}
        {(ticket.status === "ready" || ticket.status === "overdue") && (
          <button
            onClick={() => onAction(ticket.id, "done")}
            style={{
              flex: 1,
              padding: "7px",
              borderRadius: "6px",
              border: "none",
              background: "#CC3333",
              color: "white",
              fontWeight: 600,
              fontSize: "11px",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            BUMP ✓
          </button>
        )}
        {ticket.status === "new" && (
          <button
            onClick={() => onAction(ticket.id, "ready")}
            style={{
              flex: 1,
              padding: "7px",
              borderRadius: "6px",
              border: "1px solid #555",
              background: "transparent",
              color: "#ccc",
              fontWeight: 600,
              fontSize: "11px",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            READY
          </button>
        )}
      </div>
    </div>
  );
}

export default function Kitchen() {
  const [tickets, setTickets] = useState(KDS_TICKETS);
  const [station, setStation] = useState("all");
  const [doneTickets, setDoneTickets] = useState([]);

  const handleAction = (id, action) => {
    if (action === "done") {
      setDoneTickets((prev) => [...prev, id]);
      setTimeout(() => {
        setTickets((prev) => prev.filter((t) => t.id !== id));
        setDoneTickets((prev) => prev.filter((d) => d !== id));
      }, 800);
    } else if (action === "start") {
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "cooking" } : t)),
      );
    } else if (action === "ready") {
      setTickets((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "ready" } : t)),
      );
    }
  };

  const filteredTickets =
    station === "all"
      ? tickets
      : tickets.filter((t) => t.items.some((i) => i.station === station));

  return (
    <div
      style={{
        background: "#111111",
        minHeight: "100vh",
        padding: "20px",
        margin: "-24px",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <div>
          <div style={{ color: "white", fontSize: "20px", fontWeight: 700 }}>
            Kitchen Display
          </div>
          <div style={{ color: "#888", fontSize: "12px", marginTop: "2px" }}>
            {filteredTickets.length} active orders ·{" "}
            {new Date().toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        {/* Station Filter */}
        <div style={{ display: "flex", gap: "6px" }}>
          {["all", "grill", "curry", "tandoor", "rice", "south", "cold"].map(
            (s) => (
              <button
                key={s}
                onClick={() => setStation(s)}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  cursor: "pointer",
                  background: station === s ? "#CC3333" : "#2A2A2A",
                  color: station === s ? "white" : "#888",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "capitalize",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {s === "all" ? "All Stations" : s}
              </button>
            ),
          )}
        </div>

        {/* Stats */}
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { label: "Queue", value: filteredTickets.length, color: "#5DADE2" },
            { label: "Avg Prep", value: "8.4m", color: "#27AE60" },
            {
              label: "Delayed",
              value: filteredTickets.filter((t) => t.status === "overdue")
                .length,
              color: "#E74C3C",
            },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{ fontSize: "22px", fontWeight: 700, color: s.color }}
              >
                {s.value}
              </div>
              <div style={{ fontSize: "10px", color: "#666" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tickets */}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        {filteredTickets.map((ticket) => (
          <div
            key={ticket.id}
            style={{
              opacity: doneTickets.includes(ticket.id) ? 0 : 1,
              transform: doneTickets.includes(ticket.id)
                ? "scale(0.95)"
                : "scale(1)",
              transition: "all 0.4s ease",
            }}
          >
            <KDSTicket ticket={ticket} onAction={handleAction} />
          </div>
        ))}
        {filteredTickets.length === 0 && (
          <div
            style={{
              color: "#444",
              fontSize: "16px",
              textAlign: "center",
              width: "100%",
              padding: "60px 0",
            }}
          >
            ✅ All orders completed for this station
          </div>
        )}
      </div>
    </div>
  );
}
