import React, { useState, useEffect } from "react";
import { location } from "../../assets/assetsindex";
import useEvents from "../../hooks/events";
import { collection, doc, getDoc } from "firebase/firestore"; // Import necessary Firestore functions
import { database } from "../../firebase";

const Events = () => {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventProducts, setEventProducts] = useState([]);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  useEffect(() => {
    if (events.length > 0) {
      const currentDate = new Date();
      const nearestEvent = events.reduce((nearest, event) => {
        const eventDate = new Date(event.date);
        const timeDifference = eventDate - currentDate;
        const nearestTimeDifference = nearest ? nearest.timeDifference : Infinity;
        if (timeDifference > 0 && timeDifference < nearestTimeDifference) {
          return {
            event,
            timeDifference
          };
        }
        return nearest;
      }, null);

      setSelectedEvent(nearestEvent ? nearestEvent.event : null);
    }
  }, [events]);

  useEffect(() => {
    const fetchEventProducts = async () => {
      if (selectedEvent) {
        const eventProductIds = selectedEvent.products;
        const productsCollectionRef = collection(database, "products"); // Define the reference to the 'products' collection

        const productPromises = eventProductIds.map((productId) =>
          getDoc(doc(productsCollectionRef, productId))
        );

        const productSnapshots = await Promise.all(productPromises);

        const eventProductsData = productSnapshots.map((snapshot) => {
          const productData = snapshot.data();
          return productData.name;
        });

        setEventProducts(eventProductsData);
      }
    };

    fetchEventProducts();
  }, [selectedEvent]);

  if (!loading) {
    const nearestEvent = selectedEvent ? {
      date: selectedEvent.date.split("T")[0],
      time: selectedEvent.date.split("T")[1],
      place: selectedEvent.location,
      products: selectedEvent.products
    } : null;

    return (
      <div className="rtl-container">
        <table className="eventsTable">
          <thead>
            <tr className="tableBords">
              {nearestEvent && (
                <th
                  className="hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300 border border-gray-300 px-4 py-2"
                >
                  <div className="table-text text-3xl">בתאריך: {nearestEvent.date}</div>
                  <div className="table-text">בשעה: {nearestEvent.time}</div>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="tableBords">
              <td className="tableBords" colSpan={nearestEvent ? 1 : 0}></td>
            </tr>
          </tbody>
          <tbody>
            <tr className="tableBords">
              <td className="tableBords" colSpan={nearestEvent ? 1 : 0}>
                {nearestEvent && (
                  <div>
                    <p>אל תבזבזו את האירוע! אנחנו מחכים לכם (:</p>
                    <p>
                    מיקום: {nearestEvent.place}
                      {location && (
                        <img src={location} alt="Event Logo" className="event-logo" />
                      )}
                    </p>
                    {eventProducts.length > 0 && (
                      <p>קצת מהמוצרים שמוכרים באירוע: {eventProducts.join(", ")}</p>
                    )}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default Events;
