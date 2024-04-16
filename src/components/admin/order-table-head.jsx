import { useState } from "react";

const TableHead = ({ columns, handleSorting }) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("");

  const handleSortingChange = (accessor) => {
    const sortOrder =
      (accessor === sortField) & (order === "asc") ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };
  return (
    <thead className="w-full border">
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={sortable ? () => handleSortingChange(accessor) : null}
              className={`${cl} px-2 py-2.5 border-b border-white text-left cursor-pointer`}>
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
