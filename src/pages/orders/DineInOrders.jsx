import { ORDERS } from "../../data/mockData";
import OrdersTable from "./OrdersTable";

export default function DineInOrders() {
  const orders = ORDERS.filter((o) => o.channel === "dine-in");
  return (
    <OrdersTable
      orders={orders}
      showChannel={false}
      emptyLabel="No dine-in orders"
    />
  );
}
