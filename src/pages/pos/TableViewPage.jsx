import { useState } from "react";
import { TABLES } from "../../data/mockData";
import TableView from "./TableView";
import OrderPanel from "./OrderPanel";
import PaymentModal from "./PaymentModal";

export default function TableViewPage() {
  const [tables, setTables] = useState(TABLES);
  const [selectedTable, setSelectedTable] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [moveKOT, setMoveKOT] = useState(false);

  const handleTableClick = (table) => setSelectedTable(table);

  const handleContextAction = (action, table) => {
    switch (action) {
      case "open":
        setSelectedTable(table);
        break;
      case "kot":
        alert(`KOT printed for ${table.name}`);
        break;
      case "bill":
        setTables((prev) =>
          prev.map((t) => (t.id === table.id ? { ...t, status: "bill" } : t)),
        );
        break;
      case "transfer":
        alert(`Transfer ${table.name} — select destination table`);
        break;
      case "merge":
        alert(`Merge ${table.name} — select table to merge with`);
        break;
      case "split":
        alert(`Split bill for ${table.name}`);
        break;
      case "reservation":
        // Mark table as having an upcoming reservation
        setTables((prev) =>
          prev.map((t) =>
            t.id === table.id ? { ...t, hasReservation: true } : t,
          ),
        );
        break;
      default:
        break;
    }
  };

  const handleMoveKOT = (srcId, destId) => {
    setTables((prev) => {
      const src = prev.find((t) => t.id === srcId);
      const dest = prev.find((t) => t.id === destId);
      if (!src) return prev;
      return prev.map((t) => {
        if (t.id === srcId)
          return {
            ...t,
            status: "blank",
            covers: 0,
            amount: undefined,
            waiter: undefined,
            time: undefined,
          };
        if (t.id === destId)
          return {
            ...t,
            status: src.status,
            covers: src.covers,
            amount: (dest.amount || 0) + (src.amount || 0),
            waiter: src.waiter,
            time: src.time,
          };
        return t;
      });
    });
  };

  const handleKOT = (tableId) => {
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId ? { ...t, status: "kot", covers: t.covers || 2 } : t,
      ),
    );
    setSelectedTable((prev) => (prev ? { ...prev, status: "kot" } : null));
  };

  const handleOpenPayment = (table, items) => {
    setPaymentData({ table, items });
  };

  const handleConfirmPayment = () => {
    if (!paymentData) return;
    setTables((prev) =>
      prev.map((t) =>
        t.id === paymentData.table.id ? { ...t, status: "paid" } : t,
      ),
    );
    setPaymentData(null);
    setSelectedTable(null);
  };

  return (
    <div className="h-full flex flex-col">
      <TableView
        tables={tables}
        onTableClick={handleTableClick}
        onContextAction={handleContextAction}
        moveKOT={moveKOT}
        setMoveKOT={setMoveKOT}
        onMoveKOT={handleMoveKOT}
      />

      {/* Order Panel overlay */}
      {selectedTable && (
        <>
          <div
            className="fixed inset-0 bg-black/20 z-[199]"
            onClick={() => setSelectedTable(null)}
          />
          <OrderPanel
            table={selectedTable}
            onClose={() => setSelectedTable(null)}
            onKOT={handleKOT}
            onBill={handleOpenPayment}
          />
        </>
      )}

      {/* Payment Modal */}
      {paymentData && (
        <PaymentModal
          table={paymentData.table}
          items={paymentData.items}
          onClose={() => setPaymentData(null)}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
}
