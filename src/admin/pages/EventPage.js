import { useEffect, useState } from "react";
import styles from "./ProductPage.module.css";
import Table from "../components/Table";
import { eventsColumns } from "../data/tableData";
import { getEvents, updateEvent } from "../services/firebase";
import NewEventBanner from "../components/newEventBanner/NewEventBanner";

function EventPage() {
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    const activateGetObjects = async () => {
      const recievedObjects = await getEvents();
      setObjects(recievedObjects);
      //console.log(recievedObjects);
    };
    activateGetObjects();
  }, []);

  function newEvent(event) {
    setObjects([...objects, event]);
  }

  return (
    <div className={styles.container}>
      {/* <h1>Events</h1> */}
      <NewEventBanner notifyNewEvent={newEvent} />
      {objects ? (
        <Table data={objects} columns={eventsColumns} update={updateEvent} />
      ) : (
        <h2>loading..</h2>
      )}
    </div>
  );
}

export default EventPage;
