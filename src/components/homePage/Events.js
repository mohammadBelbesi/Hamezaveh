import React, { useState, useEffect } from "react";
import { location } from "../../assets/assetsindex";
// import firebase from "firebase"; // Import Firebase SDK

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(null); // State to track the selected event

  // Retrieve event data from Firebase (use appropriate Firebase SDK methods)

  const eventData = [
    { date: "2023-05-20", time: "10:00 AM", place: "רחוב בן מימון 46, ירושלים", products: ["אגוזים", "פיסטוק"] },
    { date: "2023-05-21", time: "2:00 PM", place: "רחוב בן גוריון 56, תל אביב", products: ["בנאנות", "תפוחים"] },
    { date: "2023-05-27", time: "4:00 PM", place: "רחוב בן מדריד 4, חיפה", products: ["ענבים", "תמרים"] },
    { date: "2023-05-30", time: "6:00 PM", place: "רחוב בן מימון 6, אילת", products: ["חלב", "תה"] },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  useEffect(() => {  // Set the first event as the default selected event
    setSelectedEvent(eventData[0]);
  }, []);

  return (
    <div className="rtl-container">
      <table className="eventsTable">
        <thead>
          <tr className="tableBords">
            {eventData.map((event, index) => (
              <th
                key={index}
                className="hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300"
                onClick={() => handleEventClick(event)}
              >
                <div className="table-text text-3xl">בתאריך: {event.date}</div>
                <div className="table-text">בשעה: {event.time}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="tableBords">
            <td className="tableBords" colSpan={eventData.length}>
              {selectedEvent && (
                <div>
                  <p>אל תבזבזו את האירוע ! אנחנו מחכים לכם (:</p>
                  <p>
                    {selectedEvent.place}
                    {location && (
                      <img src={location} alt="Event Logo" className="event-logo" />
                    )}
                  </p>
                  <p>{selectedEvent.products.join(", ")}</p>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Events;
