import { useState, useEffect } from "react";
import { getProducts } from "../services/firebase";

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchProducts() {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error };
}

export default useProducts;
