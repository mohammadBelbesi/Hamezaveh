import React, { useState, useEffect } from "react";
import { location } from "../../assets/assetsindex";
import useEvents from "../../hooks/events";
import { getDocs, collection, doc, getDoc } from "firebase/firestore";
import { database } from "../../firebase";

const Events = () => {
  const { events, loading } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventProducts, setEventProducts] = useState([]);
  const [selectedDateIndex, setSelectedDateIndex] = useState(0); // Track the selected date index

  const handleEventClick = (event, index) => {
    setSelectedEvent(event);
    setSelectedDateIndex(index); // Update the selected date index
  };

  useEffect(() => {
    setSelectedEvent(events[0]);
  }, [events]);

  useEffect(() => {
    const fetchEventProducts = async () => {
      if (selectedEvent) {
        const eventProductIds = selectedEvent.products;
        const productsCollectionRef = collection(database, "products");

        const productPromises = eventProductIds.map((productId) =>
          getDoc(doc(productsCollectionRef, productId))
        );

        const productSnapshots = await Promise.all(productPromises);

        const eventProductsData = productSnapshots.map((snapshot) => {
          const productData = snapshot.data();
          return productData.name;
        });

        setEventProducts(eventProductsData);
        console.log("Location:", selectedEvent.location); // Print the location in the console
      }
    };

    fetchEventProducts();
  }, [selectedEvent]);

  if (!loading) {
    const formattedEvents = events.map((event) => {
      const date = event.date.split("T")[0];
      const time = event.date.split("T")[1];
      const location = event.location;
      const products = event.products;

      return { date, time, location, products };
    });

    return (
      <div className="rtl-container">
        <table className="eventsTable">
          <thead>
            <tr className="tableBords">
              {formattedEvents.map((event, index) => (
                <th
                  key={index}
                  className={`hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-1000 border border-gray-300 px-4 py-2 ${
                    selectedDateIndex === index ? "my-pink-color" : ""}`
                  }
                  onClick={() => handleEventClick(events[index], index)}
                >
                  <div className="table-text text-2xl">בתאריך: {event.date}</div>
                  <div className="table-text text-2xl">בשעה: {event.time}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="tableBords">
              <td className="tableBords" colSpan={formattedEvents.length}></td>
            </tr>
          </tbody>
          <tbody>
            <tr className="tableBords">
              <td className="tableBords" colSpan={formattedEvents.length}>
                {selectedEvent && (
                  <div>
                    <p>אל תבזבזו את האירוע! אנחנו מחכים לכם (:</p>
                    <p>
                    מיקום: {selectedEvent.location}
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
    return <div className='loadingPage' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '50px', fontWeight: 'bold' }}>
    טוען את הנתונים...
  </div>;  
  }
};

export default Events;
