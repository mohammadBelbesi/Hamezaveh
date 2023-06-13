import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { resetCart } from "../redux/bazarSlice";
import { database } from "../firebase";

export default function Complete() {
  let created = false;
  const productData = useSelector((state) => state.bazar.productData);
  const event = useSelector((state) => state.bazar.selectEvent);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCart()); // Dispatch resetCart action
    handleComplete(); // Call handleComplete within useEffect
  }, [created, dispatch]);

  const createOrder = async (newOrder) => {
    console.log(newOrder);
    const orderCollection = collection(database, "orders");
    await addDoc(orderCollection, newOrder);
    created = false;
  };

  const handleComplete = async () => {
    const products = productData.map((prod) => ({
      quantity: prod.QuantityOfProduct,
      productPrice: prod.PriceProduct,
      productName: prod.nameOfProduct,
    }));

    const order = { products, eventDate: event.date };

    await createOrder(order); // Wait for order creation to complete

    navigate("/home");
  };

  return null; // or render a loading/spinner component
}

function sendSMS(a) {
  const url = "https://app.sumit.co.il/sms/sms/send/";
  const body = {
    Credentials: {
      CompanyID: 61294932,
      APIKey: "Gy2gopJM25FoBIRImOQCyUgJO5gp6ONTNwskd4TynjKPjKkTTb",
    },
    Recipient: "string",
    Text: "string",
    SaveDraft: true,
    Sender: "string",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const redirectUrl = data.Data.RedirectURL;
      //console.log(redirectUrl);
      window.open(redirectUrl, "http://localhost:3000/home");
      // dispatch(resetCart()); // Dispatch resetCart action
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
