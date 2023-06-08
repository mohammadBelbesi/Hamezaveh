import React, { useEffect, useState } from "react";
import Table from "./Table";

function FilterableTable({ columns, data, filters, update }) {
  const [tableData, setTableData] = useState(data);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  useEffect(() => {
    setFilteredData(tableData.filter(selectedFilter.filterFunction));
    console.log("useEffect");
  }, [selectedFilter]);

  return (
    filteredData && (
      <>
        <select value={selectedFilter.label}>
          {filters.map((filter) => (
            <option
              key={filter.label}
              value={filter.label}
              onClick={() => setSelectedFilter(filter)}
            >
              {filter.label}
            </option>
          ))}
        </select>

        <Table columns={columns} data={filteredData} update={update} />
      </>
    )
  );
}

export default FilterableTable;
