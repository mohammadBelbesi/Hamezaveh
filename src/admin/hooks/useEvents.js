import { useState, useEffect } from "react";
import { getEvents } from "../services/firebase";

function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchEvents() {
    try {
      const fetchedEvents = await getEvents();
      setEvents(fetchedEvents);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return { events, loading, error };
}

export default useEvents;
