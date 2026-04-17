import { useState, useEffect } from "react";
import {
  Printer,
  Eye,
  Clock,
  Users,
  IndianRupee,
  Zap,
  ArrowRightLeft,
  Scissors,
  MoveRight,
  Bell,
  Calendar,
  QrCode,
  CheckCircle,
  X,
  ArrowRight,
} from "lucide-react";
import ReservationModal from "../../components/ReservationModal";

// ─── Contactless QR Modal ───
function ContactlessModal({ tables, onClose }) {
  const [selectedTable, setSelectedTable] = useState(
    tables.find((t) => t.status === "blank") || tables[0],
  );
  const activeTables = tables.filter((t) => t.status !== "blank");
  const blankTables = tables.filter((t) => t.status === "blank");

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
          <div className="flex items-center gap-2">
            <QrCode size={16} className="text-primary" />
            <p className="text-[16px] font-semibold text-text-primary">
              Contactless Ordering
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="form-label">Select Table</label>
            <select
              className="dropdown-select w-full"
              value={selectedTable?.id}
              onChange={(e) =>
                setSelectedTable(
                  tables.find((t) => t.id === Number(e.target.value)),
                )
              }
            >
              <optgroup label="Available Tables">
                {blankTables.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — {t.section}
                  </option>
                ))}
              </optgroup>
              {activeTables.length > 0 && (
                <optgroup label="Occupied Tables">
                  {activeTables.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} — {t.section} (occupied)
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          {/* QR Code display */}
          <div className="text-center">
            <div className="w-[160px] h-[160px] bg-[#1A1A1A] rounded-xl mx-auto mb-3 flex items-center justify-center">
              <div className="text-center">
                <QrCode size={80} className="text-white mx-auto mb-1" />
                <p className="text-white text-[9px] font-mono">
                  {selectedTable?.name}
                </p>
              </div>
            </div>
            <p className="text-[13px] font-semibold text-text-primary">
              {selectedTable?.name} — Scan to Order
            </p>
            <p className="text-[11px] text-text-muted mt-1">
              Customer scans → browses menu → places order → pays
            </p>
            <p className="text-[10px] text-success font-semibold mt-1">
              Zero commission · Order appears in POS instantly
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="btn-outline justify-center text-xs py-[7px]">
              🖨️ Print QR
            </button>
            <button className="btn-outline justify-center text-xs py-[7px]">
              💬 Share Link
            </button>
          </div>
        </div>
        <div className="px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
          <button
            className="btn-primary w-full justify-center"
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Move KOT Modal ───
function MoveKOTModal({ sourceTables, allTables, onMove, onClose }) {
  const [source, setSource] = useState(sourceTables[0]?.id ?? "");
  const [dest, setDest] = useState("");
  const [done, setDone] = useState(false);

  const activeTables = allTables.filter(
    (t) => t.status !== "blank" && t.status !== "paid",
  );
  const destOptions = allTables.filter((t) => t.id !== Number(source));

  const handleMove = () => {
    if (!source || !dest) return;
    onMove(Number(source), Number(dest));
    setDone(true);
  };

  if (done) {
    const srcTable = allTables.find((t) => t.id === Number(source));
    const destTable = allTables.find((t) => t.id === Number(dest));
    return (
      <div
        className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl shadow-modal w-full max-w-[380px] p-8 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <CheckCircle size={52} className="text-success mx-auto mb-4" />
          <p className="text-[17px] font-bold text-text-primary mb-1">
            KOT Moved!
          </p>
          <p className="text-sm text-text-muted mb-6">
            {srcTable?.name} → {destTable?.name}
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
  }

  return (
    <div
      className="fixed inset-0 bg-black/40 z-[1000] flex items-center justify-center p-5"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-modal w-full max-w-[440px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2">
            <ArrowRightLeft size={16} className="text-primary" />
            <p className="text-[16px] font-semibold text-text-primary">
              Move KOT / Items
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-4 space-y-4">
          <p className="text-[12px] text-text-muted">
            Transfer all items from one table to another. The source table will
            be cleared.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="form-label">From Table</label>
              <select
                className="dropdown-select w-full"
                value={source}
                onChange={(e) => setSource(e.target.value)}
              >
                <option value="">Select source...</option>
                {activeTables.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} — ₹{t.amount?.toLocaleString("en-IN") ?? 0}
                  </option>
                ))}
              </select>
            </div>
            <ArrowRight
              size={20}
              className="text-text-muted mt-5 flex-shrink-0"
            />
            <div className="flex-1">
              <label className="form-label">To Table</label>
              <select
                className="dropdown-select w-full"
                value={dest}
                onChange={(e) => setDest(e.target.value)}
              >
                <option value="">Select destination...</option>
                {destOptions.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} {t.status !== "blank" ? "(occupied)" : "(empty)"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {source && dest && (
            <div className="bg-[#FEF3E8] rounded-lg px-3 py-2">
              <p className="text-[11px] text-warning font-medium">
                ⚠️ All items from{" "}
                {allTables.find((t) => t.id === Number(source))?.name} will be
                moved to {allTables.find((t) => t.id === Number(dest))?.name}.
                {allTables.find((t) => t.id === Number(dest))?.status !==
                "blank"
                  ? " Existing items at destination will be merged."
                  : ""}
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-3 px-6 pb-5 pt-3 border-t border-[#F0F0F0]">
          <button className="btn-ghost flex-shrink-0" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn-primary flex-1 justify-center"
            onClick={handleMove}
            disabled={!source || !dest}
          >
            <ArrowRightLeft size={14} /> Move KOT
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Status config — all visual logic in one place ───
const STATUS_CONFIG = {
  blank: {
    bg: "bg-table-blank-bg",
    border: "border-table-blank-border",
    borderStyle: "border-dashed",
    dot: "bg-[#AAAAAA]",
    label: "Blank",
  },
  running: {
    bg: "bg-table-running-bg",
    border: "border-table-running-border",
    borderStyle: "border-solid",
    dot: "bg-info",
    label: "Running",
  },
  printed: {
    bg: "bg-table-printed-bg",
    border: "border-table-printed-border",
    borderStyle: "border-solid",
    dot: "bg-success",
    label: "Printed",
  },
  paid: {
    bg: "bg-table-paid-bg",
    border: "border-table-paid-border",
    borderStyle: "border-solid",
    dot: "bg-[#F0C040]",
    label: "Paid",
  },
  kot: {
    bg: "bg-table-kot-bg",
    border: "border-table-kot-border",
    borderStyle: "border-solid",
    dot: "bg-warning",
    label: "Running KOT",
  },
  bill: {
    bg: "bg-[#EDE7F6]",
    border: "border-[#7E57C2]",
    borderStyle: "border-solid",
    dot: "bg-[#7E57C2]",
    label: "Bill Req.",
  },
};

// ─── Time elapsed hook ───
function useTimeElapsed(startTime) {
  const [elapsed, setElapsed] = useState(() => {
    if (!startTime) return 0;
    const [h, m] = startTime.split(":").map(Number);
    const now = new Date();
    const start = new Date();
    start.setHours(h, m, 0, 0);
    return Math.floor((now - start) / 60000);
  });

  useEffect(() => {
    if (!startTime) return;
    const interval = setInterval(() => {
      const [h, m] = startTime.split(":").map(Number);
      const now = new Date();
      const start = new Date();
      start.setHours(h, m, 0, 0);
      setElapsed(Math.floor((now - start) / 60000));
    }, 30000);
    return () => clearInterval(interval);
  }, [startTime]);

  return elapsed;
}

// ─── Urgency color based on time ───
function getUrgencyClass(minutes) {
  if (minutes >= 120) return "text-danger";
  if (minutes >= 90) return "text-warning";
  return "text-success";
}

function formatElapsed(minutes) {
  if (minutes < 60) return `${minutes}m`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

// ─── Context Menu (right-click / long-press actions) ───
function TableContextMenu({ table, position, onAction, onClose }) {
  useEffect(() => {
    const handler = () => onClose();
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [onClose]);

  const actions = [
    { id: "open", icon: Zap, label: "Open / View Order", show: true },
    {
      id: "kot",
      icon: Printer,
      label: "Print KOT",
      show: table.status !== "blank",
    },
    {
      id: "bill",
      icon: Bell,
      label: "Bill Requested",
      show: table.status === "running" || table.status === "kot",
    },
    {
      id: "transfer",
      icon: MoveRight,
      label: "Transfer Table",
      show: table.status !== "blank",
    },
    {
      id: "merge",
      icon: ArrowRightLeft,
      label: "Merge Tables",
      show: table.status !== "blank",
    },
    {
      id: "split",
      icon: Scissors,
      label: "Split Bill",
      show: table.status !== "blank",
    },
  ].filter((a) => a.show);

  return (
    <div
      className="fixed z-[300] bg-white rounded-lg shadow-modal border border-[#E0E0E0] py-1 min-w-[180px]"
      style={{ top: position.y, left: position.x }}
      onClick={(e) => e.stopPropagation()}
    >
      {actions.map((action) => {
        const Icon = action.icon;
        return (
          <button
            key={action.id}
            onClick={() => {
              onAction(action.id, table);
              onClose();
            }}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-primary hover:bg-surface hover:text-primary transition-colors text-left"
          >
            <Icon size={14} className="text-text-secondary" />
            {action.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Single Table Card ───
function TableCard({ table, onClick, onContextAction }) {
  const [contextMenu, setContextMenu] = useState(null);
  const elapsed = useTimeElapsed(table.time);
  const cfg = STATUS_CONFIG[table.status] || STATUS_CONFIG.blank;
  const isActive = table.status !== "blank";
  const urgencyClass = isActive ? getUrgencyClass(elapsed) : "";
  const perCover =
    table.covers > 0 && table.amount
      ? Math.round(table.amount / table.covers)
      : null;

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      <div
        className={[
          "relative flex flex-col justify-between rounded-[10px] p-[10px] cursor-pointer",
          "border transition-all duration-150 hover:-translate-y-px hover:shadow-md",
          "min-w-[96px] min-h-[84px] w-[96px] h-[84px]",
          cfg.bg,
          cfg.border,
          cfg.borderStyle,
        ].join(" ")}
        onClick={() => onClick(table)}
        onContextMenu={handleContextMenu}
      >
        {/* Table name */}
        <div className="text-[13px] font-medium text-[#333333] leading-tight">
          {table.name}
        </div>

        {/* Middle info */}
        {isActive && (
          <div className="flex flex-col gap-[2px]">
            {/* Covers */}
            {table.covers > 0 && (
              <div className="flex items-center gap-1">
                <Users size={9} className="text-[#666]" />
                <span className="text-[10px] text-[#666]">{table.covers}</span>
                {perCover && (
                  <span className="text-[10px] text-[#888]">
                    · ₹{perCover}/cvr
                  </span>
                )}
              </div>
            )}
            {/* Amount */}
            {table.amount && (
              <div className="flex items-center gap-1">
                <IndianRupee size={9} className="text-[#333]" />
                <span className="text-[11px] font-semibold text-[#333]">
                  {table.amount.toLocaleString("en-IN")}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Bottom row — time + icons */}
        <div className="flex items-center justify-between">
          {/* Time elapsed */}
          {isActive && table.time && (
            <div className={`flex items-center gap-[2px] ${urgencyClass}`}>
              <Clock size={9} />
              <span className="text-[9px] font-semibold">
                {formatElapsed(elapsed)}
              </span>
            </div>
          )}

          {/* Action icons */}
          {isActive && (
            <div className="flex items-center gap-[5px] ml-auto">
              <Printer
                size={13}
                className="text-[#555] hover:text-primary cursor-pointer transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  onContextAction("kot", table);
                }}
              />
              {(table.status === "paid" ||
                table.status === "kot" ||
                table.status === "bill") && (
                <Eye
                  size={13}
                  className="text-[#555] hover:text-primary cursor-pointer transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onClick(table);
                  }}
                />
              )}
            </div>
          )}
        </div>

        {/* Waiter badge */}
        {table.waiter && (
          <div className="absolute top-[6px] right-[6px]">
            <div className="w-[16px] h-[16px] rounded-full bg-primary flex items-center justify-center">
              <span className="text-[8px] font-bold text-white">
                {table.waiter[0]}
              </span>
            </div>
          </div>
        )}

        {/* Reservation warning dot */}
        {table.status === "blank" && table.hasReservation && (
          <div className="absolute top-[6px] right-[6px]">
            <div
              className="w-[8px] h-[8px] rounded-full bg-[#7E57C2] animate-pulse"
              title="Reservation soon"
            />
          </div>
        )}
      </div>

      {/* Context menu */}
      {contextMenu && (
        <TableContextMenu
          table={table}
          position={contextMenu}
          onAction={onContextAction}
          onClose={() => setContextMenu(null)}
        />
      )}
    </>
  );
}

// ─── Legend Item ───
function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-[5px]">
      <div className={`w-[10px] h-[10px] rounded-full ${color}`} />
      <span className="text-[11px] text-[#555]">{label}</span>
    </div>
  );
}

// ─── Section Stats Bar ───
function SectionStats({ tables }) {
  const occupied = tables.filter((t) => t.status !== "blank").length;
  const total = tables.length;
  const pct = total > 0 ? Math.round((occupied / total) * 100) : 0;
  return (
    <span className="text-xs text-text-muted ml-2">
      {occupied}/{total} occupied · {pct}%
    </span>
  );
}

// ─── Main TableView ───
export default function TableView({
  tables,
  onTableClick,
  onContextAction,
  moveKOT,
  setMoveKOT,
  onMoveKOT,
}) {
  const [floorPlan, setFloorPlan] = useState("Default Layout");
  const [showReservation, setShowReservation] = useState(false);
  const [showContactless, setShowContactless] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [moveSource, setMoveSource] = useState(null); // table selected as source in move mode
  const sections = ["A/C", "Non A/C", "Bar"];

  const stats = {
    occupied: tables.filter((t) => t.status !== "blank").length,
    available: tables.filter((t) => t.status === "blank").length,
    running: tables.filter((t) => t.status === "running" || t.status === "kot")
      .length,
    billReq: tables.filter((t) => t.status === "bill").length,
  };

  // When Move KOT mode is ON, clicking a table selects it as source first, then opens modal
  const handleTableClickWithMove = (table) => {
    if (moveKOT) {
      if (table.status === "blank") return; // can't move from blank
      setMoveSource(table);
      setShowMoveModal(true);
    } else {
      onTableClick(table);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* ── Toolbar ── */}
      <div className="flex items-center justify-between mb-3 px-4 py-2 bg-white rounded-lg border border-[#EEEEEE]">
        {/* Left actions */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowReservation(true)}
            className="btn-outline text-xs py-[5px] px-3 flex items-center gap-1"
          >
            <Calendar size={13} /> Table Reservation
          </button>
          <button
            onClick={() => setShowContactless(true)}
            className="btn-outline text-xs py-[5px] px-3 flex items-center gap-1"
          >
            <QrCode size={13} /> Contactless
          </button>
        </div>

        {/* Center — Move KOT toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setMoveKOT(!moveKOT);
              setMoveSource(null);
            }}
            className={[
              "relative w-[42px] h-[22px] rounded-pill transition-colors duration-200",
              moveKOT ? "bg-primary" : "bg-[#CCCCCC]",
            ].join(" ")}
          >
            <span
              className={[
                "absolute top-[2px] w-[18px] h-[18px] rounded-full bg-white shadow transition-all duration-200",
                moveKOT ? "left-[22px]" : "left-[2px]",
              ].join(" ")}
            />
          </button>
          <span
            className={`text-xs font-medium ${moveKOT ? "text-primary font-semibold" : "text-text-secondary"}`}
          >
            Move KOT / Items
          </span>
          {moveKOT && (
            <span className="text-[10px] bg-[#FFF5F5] text-primary border border-primary rounded-full px-2 py-[1px] font-semibold animate-pulse">
              Click a table to move
            </span>
          )}
        </div>

        {/* Right — Legend */}
        <div className="flex items-center gap-4">
          {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
            <LegendItem key={key} color={cfg.dot} label={cfg.label} />
          ))}
        </div>
      </div>

      {/* ── Floor Plan Selector + Stats ── */}
      <div className="flex items-center gap-3 mb-3 px-1">
        <span className="text-xs font-medium text-text-muted">Floor Plan</span>
        <select
          value={floorPlan}
          onChange={(e) => setFloorPlan(e.target.value)}
          className="dropdown-select text-xs"
        >
          <option>Default Layout</option>
          <option>Ground Floor</option>
          <option>First Floor</option>
          <option>Terrace</option>
        </select>
        <div className="flex items-center gap-4 ml-4">
          <span className="text-xs text-text-muted">
            <span className="font-semibold text-text-primary">
              {stats.occupied}
            </span>{" "}
            occupied
          </span>
          <span className="text-xs text-text-muted">
            <span className="font-semibold text-success">
              {stats.available}
            </span>{" "}
            available
          </span>
          {stats.running > 0 && (
            <span className="text-xs text-text-muted">
              <span className="font-semibold text-warning">
                {stats.running}
              </span>{" "}
              running
            </span>
          )}
          {stats.billReq > 0 && (
            <span className="text-xs text-text-muted">
              <span className="font-semibold text-[#7E57C2]">
                {stats.billReq}
              </span>{" "}
              bill req.
            </span>
          )}
        </div>
      </div>

      {/* ── Table Grid ── */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section) => {
          const sectionTables = tables.filter((t) => t.section === section);
          return (
            <div key={section} className="mb-6">
              <div className="flex items-center mb-3">
                <span className="text-[15px] font-semibold text-text-primary">
                  {section}
                </span>
                <SectionStats tables={sectionTables} />
              </div>
              <div className="flex flex-wrap gap-2">
                {sectionTables.map((table) => (
                  <div
                    key={table.id}
                    className={
                      moveKOT && table.status !== "blank"
                        ? "ring-2 ring-primary ring-offset-1 rounded-[10px]"
                        : ""
                    }
                  >
                    <TableCard
                      table={table}
                      onClick={handleTableClickWithMove}
                      onContextAction={onContextAction}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Modals ── */}
      {showReservation && (
        <ReservationModal
          tables={tables}
          onClose={() => setShowReservation(false)}
          onConfirm={(form) => {
            // Mark the selected table as having a reservation
            if (form.tableId) {
              onContextAction("reservation", {
                id: Number(form.tableId),
                reservationName: form.name,
              });
            }
          }}
        />
      )}

      {showContactless && (
        <ContactlessModal
          tables={tables}
          onClose={() => setShowContactless(false)}
        />
      )}

      {showMoveModal && moveSource && (
        <MoveKOTModal
          sourceTables={[moveSource]}
          allTables={tables}
          onMove={(srcId, destId) => {
            onMoveKOT?.(srcId, destId);
            setMoveKOT(false);
            setMoveSource(null);
          }}
          onClose={() => {
            setShowMoveModal(false);
            setMoveSource(null);
          }}
        />
      )}
    </div>
  );
}
