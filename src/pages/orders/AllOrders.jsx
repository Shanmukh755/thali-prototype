import { ORDERS } from "../../data/mockData";
import OrdersTable from "./OrdersTable";

export default function AllOrders() {
  return (
    <OrdersTable orders={ORDERS} showChannel emptyLabel="No orders today" />
  );
}
