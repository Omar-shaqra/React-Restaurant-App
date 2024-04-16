import { useState } from "react";

const TableBody = ({ tableData, columns, onUpdateData }) => {
  const [editCell, setEditCell] = useState({});
  console.log(tableData.data[0].productData);

  const handleChange = (e, rowId, accessor) => {
    const { value } = e.target;
    const newDataState = [...tableData.data];
    const row = newDataState.find((row) => row._id === rowId);
    row[accessor] = value;
    onUpdateData({ ...tableData, data: newDataState });
    console.log(`Row ${rowId}, Accessor ${accessor}, Value ${value}`);
  };
  // TODO fix paid & not paid stats
  return (
    <tbody>
      {tableData.data.map((data) => {
        return (
          <tr key={data._id}>
            {columns.map(({ accessor, sortable, CellData }) => {
              const isEditing =
                editCell &&
                sortable &&
                editCell.rowId === data._id &&
                editCell.accessor === accessor;
              let cellContent;
              if (accessor === "statue") {
                cellContent = isEditing ? (
                  <select
                    value={data[accessor] ? "Paid" : "Not Paid"}
                    onChange={(e) => handleChange(e, data._id, accessor)}
                    onBlur={() => setEditCell(null)} // Reset edit cell when blur
                    autoFocus>
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                  </select>
                ) : data[accessor] == true ? (
                  "Paid"
                ) : (
                  "Not Paid"
                );
              } else if (accessor === "[productData]") {
                <CellData
                  row={{
                    original: data,
                  }}
                />;
              } else {
                cellContent = data[accessor] ? data[accessor] : "——";
              }

              return (
                <td
                  key={accessor}
                  className="border-t border-r border-r-gray-700 border-white px-2 py-2.5 overflow-x-auto hide-scrollbar"
                  onClick={() => setEditCell({ rowId: data._id, accessor })}>
                  {isEditing ? (
                    // Set the value of the input element correctly
                    <input
                      className="p-1 capitalize rounded outline-none w-28"
                      value={
                        data[accessor] == "statue"
                          ? data[accessor] == true
                            ? "paid"
                            : "not paid"
                          : data[accessor]
                      }
                      onChange={(e) => handleChange(e, data._id, accessor)}
                      onBlur={() => setEditCell(null)}
                      autoFocus
                    />
                  ) : (
                    // Set the content of the cell based on the accessor value
                    cellContent
                  )}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
