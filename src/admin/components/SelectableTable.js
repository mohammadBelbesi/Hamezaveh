import { useEffect, useState } from "react";
import Cell from "./Cell";
import styles from "./Table.module.css";

const SelectableTable = ({
  data,
  columns,
  update,
  selectedData,
  select,
  unselect,
}) => {
  const [selectedObjects, setSelectedObjects] = useState(selectedData);

  useEffect(() => {
    setSelectedObjects(selectedData);
  }, [selectedData]);

  return (
    <table className={styles.styledTable}>
      <thead>
        <th>select</th>
        {columns.map((column) => (
          <th>{column.header}</th>
        ))}
      </thead>
      <tbody>
        {data.map((object) => (
          <tr
            className={selectedObjects.includes(object) ? styles.green : null}
          >
            <td>
              <input
                type="checkbox"
                checked={selectedObjects.includes(object)}
                name={object.id}
                onChange={(e) => {
                  const objectID = e.target.name;
                  const object = data.find((obj) => obj.id === objectID);
                  if (e.target.checked) {
                    setSelectedObjects([...selectedObjects, object]);
                    select(objectID);
                  } else {
                    setSelectedObjects(
                      selectedObjects.filter(
                        (selected) => selected.id !== objectID
                      )
                    );
                    unselect(objectID);
                  }
                }}
              />
            </td>
            {columns.map((column, index) => (
              <Cell key={index} column={column} data={object} update={update} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SelectableTable;
