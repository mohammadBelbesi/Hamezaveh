import React from "react";
import styles from "./NewProductBanner.module.css";
import { useState } from "react";
import DropDown from "../DropDown";
import useLocations from "../../hooks/useLocations";
import LoadingDropDown from "../LoadingDropDown";
import { createLocation, createProduct } from "../../services/firebase";
import { createEvent } from "../../services/firebase";

function NewProductBanner({ notifyNewProduct }) {
  const [isCreateLoading, setIsCreateLoading] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);

  async function addProduct(e) {
    e.preventDefault();
    if (name === "" || !price) {
      return;
    }

    setIsCreateLoading(true);

    const newProduct = { name, price };
    await createProduct(newProduct);
    setName("");
    setPrice("");

    setIsCreateLoading(false);

    notifyNewProduct(newProduct);
  }

  return (
    <div className={styles.Content}>
      <div className={styles.Header}>
        <div className={styles.Layer}>מוצרים</div>
      </div>
      <div className={styles.Body}>
        <div className={styles.AddEvent}>
          <form onSubmit={addProduct}>
            <input
              className={styles.eventField}
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
              placeholder="שם מוצר"
            />

            <input
              className={styles.eventField}
              value={price}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="מחיר מוצר"
            />

            <button
              className={styles.addButton}
              type="submit"
              variant="contained"
            >
              הוספת מוצר
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewProductBanner;
