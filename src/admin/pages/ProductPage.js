import { useEffect, useState } from "react";
import { productsColumns } from "../data/tableData";
import SelectableTable from "../components/SelectableTable";
import Table from "../components/Table";
import { getProducts, updateEvent, updateProduct } from "../services/firebase";
import styles from "./ProductPage.module.css";
import useProducts from "../hooks/useProducts";
import useEvents from "../hooks/useEvents";
import NewProductBanner from "../components/newProductBanner/NewProductBanner";

function ProductPage() {
  const [objects, setObjects] = useState(null);
  let {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  useEffect(() => {
    setObjects(products);
  }, [productsLoading]);

  function newProduct(prod) {
    setObjects([...objects, prod]);
  }

  const { events, loading: eventsLoading, error: eventsError } = useEvents();
  const [selectedEvent, setSelectedEvent] = useState(null);

  const select = async (productID_toSelect) => {
    // console.log(`select ${productID} for ${selectedEvent.id}`);

    const newProductsList = [...selectedEvent.products, productID_toSelect];
    //console.log(newProductsList);

    setSelectedEvent({
      ...selectedEvent,
      products: newProductsList,
    });

    await updateEvent(selectedEvent.id, {
      products: newProductsList,
    });
  };

  const unselect = async (productID_toUnselect) => {
    // console.log(`unselect ${productID} for ${selectedEvent.id}`);
    // await updateEvent(selectedEvent.id, {
    //   products: selectedEvent.products.filter(
    //     (product) => product.id !== productID
    //   ),
    // });

    const newProductsList = selectedEvent.products.filter((productID) => {
      return productID_toUnselect !== productID;
    });
    //console.log(newProductsList);

    setSelectedEvent({
      ...selectedEvent,
      products: newProductsList,
    });

    await updateEvent(selectedEvent.id, {
      products: newProductsList,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <NewProductBanner notifyNewProduct={newProduct} />
        {/* <h1>Products</h1> */}
        {/* {!eventsLoading && (
          
        )} */}
      </div>
      <select
        onChange={(e) =>
          setSelectedEvent(events.find((event) => event.id === e.target.value))
        }
      >
        <option className={styles.optionclass} value={"NONE"}>
          תבחר אירוע
        </option>
        {events.map((event) => (
          <option className={styles.optionclass} value={event.id}>
            {event.location}
          </option>
        ))}
      </select>
      {!productsLoading && !selectedEvent && (
        <>
          <Table
            data={objects}
            columns={productsColumns}
            update={updateProduct}
          />
        </>
      )}
      {!productsLoading && selectedEvent && (
        <SelectableTable
          data={objects}
          selectedData={objects.filter((product) =>
            selectedEvent.products.includes(product.id)
          )}
          columns={productsColumns}
          update={updateProduct}
          select={select}
          unselect={unselect}
        />
      )}
    </div>
  );
}

export default ProductPage;
