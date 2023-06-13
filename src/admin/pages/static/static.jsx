//css import
import "./static.css";

import React, { useEffect, useState, useRef } from "react";
import { Dropdown } from "./componants/dropDownMenue/Dropdown";
import { ViewStaticAll } from "./componants/static/viewStatic/viewStaticAll";
import { ViewStaticEvent } from "./componants/static/viewStatic/viewStaticEvent";

//import from Firebase
import { database as db } from "../../../firebase";
import { getDocs, collection } from "firebase/firestore";

//import make page to pdf
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Static = () => {
  //i use this varible to make the useEffect worked only for one time
  const dataFetchedRef = useRef(false);

  // init usestate
  const [events, setEvent] = useState([]);
  const [reciepts, setReciepts] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState({});
  const [statics, setStatics] = useState({});
  const [selectTime, setSelectTime] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTheMainOPage, setIsLoadingTheMainOPage] = useState(false);

  //collection reference
  const eventsCollectionRef = collection(db, "events");
  const recieptCollectionRef = collection(db, "orders");

  //use effect to sort the objects
  useEffect(() => {
    if (isLoading) {
      // Convert object into an array of objects
      const objArray = Object.values(statics);

      objArray.forEach((elem) => {
        //sort the product the bigest quantity is the first
        elem["products"].sort((a, b) => b["quantity"] - a["quantity"]);
      });

      //sort the events
      objArray.sort((a, b) => b["totalPayment"] - a["totalPayment"]);

      // Convert the sorted array back to an object
      const sortedObj = objArray.reduce((acc, obj) => {
        acc[obj["date"]] = obj;
        return acc;
      }, {});

      setStatics(sortedObj);

      setIsLoadingTheMainOPage(true);
    }
  }, [isLoading]);

  //useEffect
  useEffect(() => {
    //do the work for the reciept

    setIsLoading(false);
    reciepts.forEach((elem, ind) => {
      // let dateTemp = elem["eventDate"].split("T")[0];
      let dateTemp = elem["eventDate"];

      if (statics[dateTemp] == undefined) {
        let newStatics = statics;
        newStatics[dateTemp] = {
          products: JSON.parse(JSON.stringify(elem["products"])),
          totalPayment: elem["totalPaid"],
          numOfRecipt: 1,
          numOfProductPerOneCustomer: elem["products"].length,
          location: elem["eventLocation"],
          date: dateTemp,
        };
        setStatics(newStatics);
      } else {
        let newStatics = statics;
        //add to totalPayment
        newStatics[dateTemp]["totalPayment"] += elem["totalPaid"];

        //add to reciept
        newStatics[dateTemp]["numOfRecipt"] += 1;

        //add to num of product
        newStatics[dateTemp]["numOfProductPerOneCustomer"] +=
          elem["products"].length;

        //add to the quntaty product
        elem["products"].forEach((prod) => {
          if (
            newStatics[dateTemp]["products"].some((obj) => {
              if (obj["productName"] == prod["productName"]) return true;
            })
          ) {
            const index = newStatics[dateTemp]["products"].findIndex(
              (obj) => obj["productName"] === prod["productName"]
            );
            newStatics[dateTemp]["products"][index]["quantity"] +=
              prod["quantity"];
          } else {
            newStatics[dateTemp]["products"] = [
              ...newStatics[elem["eventDate"]]["products"],
              prod,
            ];
          }
        });

        setStatics(newStatics);
      }

      setIsLoading(true);
    });
  }, [reciepts]);

  //get the data from the firestore
  useEffect(() => {
    //get from the firbase the relevent data only on the first rendering the page
    const getEventList = async () => {
      try {
        //get the events from the firebase
        const events = await getDocs(eventsCollectionRef);
        let filterEvents = events.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        //sort the events
        filterEvents.sort(
          (a, b) =>
            new Date(a["date"].split("T")[0]) -
            new Date(b["date"].split("T")[0])
        );

        filterEvents = [...filterEvents, { date: "ALL", id: "150" }];

        //send to the componant dropDown the Events
        let listOfEvents = filterEvents.map((obj) => {
          return { date: obj.date.split("T")[0], id: obj.id };
        });
        setEvent(listOfEvents);
        setSelectedEvent({
          date: "ALL",
          id: "150",
          index: listOfEvents.length - 1,
        });

        //get the products from the firebase
        const reciept = await getDocs(recieptCollectionRef);
        const filterreciepts = reciept.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setReciepts(filterreciepts);
      } catch (err) {
        console.error(err);
      }
    };
    //we check if we used the function before its work for only one time
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getEventList();
  }, []);

  //Choice The enent
  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  //Choice The enent
  const choiceWhictTime = (time) => {
    setSelectTime(time);
  };

  const generatePDF = () => {
    const element = document.getElementById("pdf-content"); // Capture the entire page by selecting the body element

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("document.pdf");
    });
  };

  return (
    <>
      <button className="btn_pdf" onClick={generatePDF}>
        Download PDF
      </button>
      <div className="container" id="pdf-content">
        <h1> סטטיסטיקה </h1>
        <Dropdown
          events={events}
          setSelectedOption={selectEvent}
          selectedOption={selectedEvent}
        />
        {selectedEvent["date"] === "ALL" ? (
          <div className="choseDate">
            <p
              className={selectTime === 1 ? "dateChose chosen" : "dateChose"}
              onClick={() => choiceWhictTime(1)}
            >
              חודש
            </p>
            <p className="space">/</p>
            <p
              className={selectTime === 6 ? "dateChose chosen" : "dateChose"}
              onClick={() => choiceWhictTime(6)}
            >
              6 חודשים
            </p>
            <p className="space">/</p>
            <p
              className={selectTime === 12 ? "dateChose chosen" : "dateChose"}
              onClick={() => choiceWhictTime(12)}
            >
              שנה
            </p>
          </div>
        ) : (
          ""
        )}

        {selectedEvent["date"] === "ALL" ? (
          <ViewStaticAll
            data={Object.values(statics)}
            time={selectTime}
            isReady={isLoadingTheMainOPage}
          />
        ) : (
          <ViewStaticEvent data={statics} selectedEvent={selectedEvent} />
        )}
      </div>
    </>
  );
};
