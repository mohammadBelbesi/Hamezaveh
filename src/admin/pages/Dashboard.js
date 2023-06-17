import styles from "./Dashboard.module.css";
import Table from "../components/Table";
import useOrders from "../hooks/useOrders";
import { ordersColumns } from "../data/tableData";
import DropDown from "../components/DropDown";
import { useState } from "react";
import { updateOrder } from "../services/firebase";

export default function Dashboard() {
  const [orders, loading, error] = useOrders();

  const [order, setOrder] = useState(null);

  // const [orders, setOrders] = useState(null);

  // useEffect(() => {
  //   setOrders(fetchedOrders);
  // }, [loading]);

  // function displayOrderProducts(orderID) {
  //   setOrders(fetchedOrders.filter((order) => order.id === orderID));
  // }

  // if (loading) {
  //   return <h1>loading...</h1>;
  // } else {
  //   return fetchedOrders.map((order) => <h1>{order.id}</h1>);
  // }

  return (
    <div className={styles.container}>
      <h1>הזמנות</h1>
      {!loading && (
        <DropDown
          labels={orders.map((order) => order.id)}
          createLabel={() => {}}
          onChange={(orderID) => {
            setOrder(orders.find((order) => order.id === orderID));
          }}
        />
      )}
      {order && (
        <>
          <div className={styles.checkbox}>
            <input
              type="checkbox"
              id="completed"
              checked={order.isCompleted}
              onChange={(e) => {
                const isCompleted = e.target.checked;
                updateOrder(order.id, { isCompleted });
                setOrder({ ...order, isCompleted });
              }}
            ></input>
            <label for="completed">קיבל</label>
          </div>
          <Table
            data={order.products}
            columns={ordersColumns}
            update={() => {}}
          />
        </>
      )}
    </div>
  );
}
