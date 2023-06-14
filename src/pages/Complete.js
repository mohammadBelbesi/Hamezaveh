import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { resetCart } from "../redux/bazarSlice";
import { database } from "../firebase";

export default function Complete() {
  const { OGCustomerID, OGPaymentID, OGExternalIdentifier } = useParams();

  const productData = useSelector((state) => state.bazar.productData);
  const event = useSelector((state) => state.bazar.selectEvent);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetCart()); // Dispatch resetCart action
    handleComplete(); // Call handleComplete within useEffect
  }, [dispatch]);

  if (!OGCustomerID || !OGPaymentID || !OGExternalIdentifier) {
    navigate("/about");
    return;
  }

  const createOrder = async (newOrder) => {
    console.log(newOrder);
    const orderCollection = collection(database, "orders");
    await addDoc(orderCollection, newOrder);
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
