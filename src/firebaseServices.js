import { collection, getDocs } from "firebase/firestore";
import { database } from "./firebase";

export async function getEvents() {
    const eventsCollectionRef = collection(database, "events");
    const data = await getDocs(eventsCollectionRef);
    const filteredData = data.docs.map((doc) => {
      const event = doc.data();
  
      return {
        ...event,
        id: doc.id,
      };
    });
  
    return filteredData;
  }