import { useState, useEffect } from "react";
import { getEvents } from "../firebaseServices";

function useEvents(maxEvents = 4) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchEvents() {
    try {
      const fetchedEvents = await getEvents();

      // Filter events based on the current date and time in Israel
      const currentDate = new Date();
      const israelTime = currentDate.toLocaleString("en-US", {
        timeZone: "Asia/Jerusalem"
      });

      const nearestEvents = fetchedEvents
        .filter((event) => {
          const eventDate = new Date(event.date);
          return eventDate > new Date(israelTime);
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, maxEvents);

      setEvents(nearestEvents);
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
