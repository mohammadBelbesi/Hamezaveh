import { useEffect, useState } from "react";
import Cell from "./Cell";
import styles from "./Table.module.css";

const Table = ({ data, columns, update }) => {
  const [objects, setObjects] = useState(data);

  // const fetchData = async () => {
  //   const fetched = await getData();
  //   setObjects(fetched);
  // };

  useEffect(() => {
    setObjects(data);
    // fetchData();
  }, [data]);

  return (
    objects && (
      <table className={styles.styledTable}>
        <thead>
          {columns.map((column) => (
            <th>{column.header}</th>
          ))}
        </thead>
        <tbody>
          {objects.map((object) => (
            <tr>
              {columns.map((column, index) => (
                <Cell
                  key={index}
                  column={column}
                  data={object}
                  update={update}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  );
};

export default Table;
