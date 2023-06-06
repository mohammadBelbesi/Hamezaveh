import React, { useState } from "react";
import { location } from "../../assets/assetsindex";
import useEvents from "../../hooks/useEvents";

const ClosestEvent = () => {


  const [selectedEvent, setSelectedEvent] = useState(null); // State to track the selected event
  
  // Retrieve event data from Firebase (use appropriate Firebase SDK methods)

  const eventData = [
    // Sample event data fetched from Firebase

    {
      date: "2023-05-20",
      time: "10:00 AM",
      place: "רחוב בן מימון 46, ירושלים",
      products: ["אגוזים", "פיסטוק"],
    },
    // Add more event objects as needed
  ];



  return (


    <div className="rtl-container">
      <table className="eventsTable">
        <thead>
          <tr className="tableBords firstLine">
            {eventData[0] && (
              <th className="hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300">
                <div className="table-text">בתאריך: {eventData[0].date}</div>
                <div className="table-text">בשעה: {eventData[0].time}</div>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          <tr className="tableBords">
            <td className="tableBords">
              <div>
                <p> אל תבזבזו את האירוע ! אנחנו מחכים לכם (:</p>
                <p>
                  {eventData[0] ? eventData[0].place : ""}
                  {eventData[0] && location && (
                    <img
                      src={location}
                      alt="Event Logo"
                      className="event-logo"
                    />
                  )}
                </p>
                <p>{eventData[0] ? eventData[0].products.join(", ") : ""}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClosestEvent;
