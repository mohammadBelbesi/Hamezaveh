import React from "react";
import styles from "./NewEventBanner.module.css";
import { useState } from "react";
import { Button } from "@mui/material";
import DropDown from "../DropDown";
import useLocations from "../../hooks/useLocations";
import LoadingDropDown from "../LoadingDropDown";
import { createLocation } from "../../services/firebase";
import { createEvent } from "../../services/firebase";

function NewEventBanner({ notifyNewEvent }) {
  const [locations, loading, error] = useLocations();
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  async function addEvent(e) {
    e.preventDefault();

    if (date === "" || location === "") {
      return;
    }

    setIsCreateLoading(true);

    const newEvent = { location, date, products: [] };
    await createEvent(newEvent);
    setLocation("");
    setDate("");

    setIsCreateLoading(false);

    notifyNewEvent(newEvent);
  }

  return (
    <div className={styles.Content}>
      <div className={styles.Header}>
        <div className={styles.Layer}>אירועים</div>
      </div>
      <div className={styles.Body}>
        <div className={styles.AddEvent}>
          <form onSubmit={addEvent}>
            {(loading || isCreateLoading) && <LoadingDropDown />}
            {!loading && !isCreateLoading && (
              <DropDown
                labels={locations}
                createLabel={createLocation}
                onChange={setLocation}
              />
            )}
            <input
              className={styles.eventField}
              value={date}
              type="datetime-local"
              onChange={(e) => setDate(e.target.value)}
              placeholder="Date"
            />

            <button
              className={styles.addButton}
              type="submit"
              variant="contained"
            >
              הוספת אירוע
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewEventBanner;
