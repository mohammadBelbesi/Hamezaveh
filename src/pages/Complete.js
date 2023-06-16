import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { resetCart } from "../redux/bazarSlice";
import { database } from "../firebase";

export default function Complete() {
  const productData = useSelector((state) => state.bazar.productData);
  const event = useSelector((state) => state.bazar.selectEvent);
  const total = useSelector((state) => state.bazar.total);
  const isMember = useSelector((state) => state.bazar.isMember);
  // const { OGCustomerID, OGPaymentID, OGExternalIdentifier } = useParams();
  const orderId = useSelector((state) => state.bazar.orderId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const OGCustomerID = searchParams.get('OG-CustomerID');
  const OGPaymentID = searchParams.get('OG-PaymentID');

  useEffect(() => {
    dispatch(resetCart()); // Dispatch resetCart action
    handleComplete(); // Call handleComplete within useEffect
  }, [dispatch]);

  if (!OGCustomerID || !OGPaymentID) {
    navigate("/cart");
    return;
  }

  const createOrder = async (newOrder) => {
  console.log(newOrder);
  const orderCollection = collection(database, "orders");
  // const docRef = await addDoc(orderCollection, { ...newOrder, id: OGPaymentID });
  const docRef = doc(orderCollection, orderId); // Specify the document ID as "123"
  await setDoc(docRef,newOrder); // Use setDoc to add the order with the specified ID
  console.log("Document ID:", docRef.id);
  };

  const handleComplete = async () => {
    const products = productData.map((prod) => ({
      quantity: prod.QuantityOfProduct,
      productPrice: prod.PriceProduct,
      productName: prod.nameOfProduct,
    }));

    const order = { products, eventDate: event.date, totalPaid: isMember? (total*0.7) : total};

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
