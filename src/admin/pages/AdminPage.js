import { useEffect, useState } from "react";
import styles from "./AdminPage.module.css";
import Table from "../components/Table";

function AdminPage({ pageName, getObjects, objectsColumns, updateObject }) {
  const [objects, setObjects] = useState(null);

  useEffect(() => {
    const activateGetObjects = async () => {
      const recievedObjects = await getObjects();
      setObjects(recievedObjects);
    };
    activateGetObjects();
  }, []);

  return (
    <div className={styles.container}>
      <h1>{pageName}</h1>
      {objects ? (
        <Table data={objects} columns={objectsColumns} update={updateObject} />
      ) : (
        <h2>loading..</h2>
      )}
    </div>
  );
}

export default AdminPage;
