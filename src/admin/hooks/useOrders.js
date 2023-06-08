import { useState, useEffect } from "react";
import { getOrders } from "../services/firebase";

function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchOrders() {
    try {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  return [orders, loading, error];
}

export default useOrders;
