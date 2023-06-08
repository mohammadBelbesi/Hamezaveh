import { useState, useEffect } from "react";
import { fetchLocations } from "../services/firebase";

const useLocations = () => {
  const [locations, setLocations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetch() {
    const fetched = await fetchLocations();
    setLocations(fetched);
    setLoading(false);
  }

  useEffect(() => {
    fetch();
  }, []);

  return [locations, loading, error];
};

export default useLocations;
