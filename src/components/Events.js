import React, { useState, useEffect } from "react";
import { location } from "../assets/assetsindex";
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

  useEffect(() => {
    setSelectedEvent(eventData[0]); // Set the first event as the default selected event
  }, []);

  return (
    <table className="eventsTable">
      <tbody>
        <tr className="tableBords">
          {eventData.map((event, index) => (
            <td className="tableBords firstLine" key={index} onClick={() => handleEventClick(event)}>
              <th className="hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                <div className="table-text text-3xl">בתאריך: {event.date}</div>
                <div className="table-text">בשעה: {event.time}</div>
              </th>
            </td>
          ))}
        </tr>
      </tbody>
      <tbody>
        <tr className="tableBords">
          <td className="tableBords" colSpan={eventData.length}>
            <p>{selectedEvent ? "אל תבזבזו את האירוע ! אנחנו מחכים לכם (:" : ""}</p>
            <p>{selectedEvent ? selectedEvent.place : ""}{selectedEvent && location && <img src={location} alt="Event Logo" className="event-logo" />}</p>
            <p>{selectedEvent ? selectedEvent.products.join(", ") : ""}</p>
          </td>
        </tr>
      </tbody>
    </table> 
  );
};

export default Events;
