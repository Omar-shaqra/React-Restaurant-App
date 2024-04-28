import { useState } from "react";

const TableBody = ({ tableData, columns, onUpdateData }) => {
  const [editCell, setEditCell] = useState();
  console.log(tableData);

  const renderCellContent = (accessor, data, CellData) => {
    if (accessor === "statue") {
      return statueCellContent(accessor, data);
    } else if (accessor === "[productData]") {
      return productsCellContent(data, CellData);
    } else {
      return nullCellContent(accessor, data);
    }
  };

  // Paid Status
  const statueCellContent = (accessor, data) => {
    const isEditing =
      editCell && editCell.accessor === accessor && editCell.rowId === data._id;

    if (isEditing) {
      return (
        <select
          value={data.statue}
          onChange={(e) => handleChange(e, data._id, accessor)}
          autoFocus>
          <option value="Paid">Paid</option>
          <option value="Not Paid">Not Paid</option>
        </select>
      );
    } else {
      return data[accessor] == true ? "Paid" : "Not Paid"; // Explicitly check for true or false
    }
  };

  // Order Products
  const productsCellContent = (data, CellData) => {
    return (
      <CellData
        row={{
          original: data,
        }}
      />
    );
  };

  // No Accessor
  const nullCellContent = (accessor, data) => {
    return data[accessor] ? data[accessor] : "——";
  };

  const handleChange = (e, rowId, accessor) => {
    const { value } = e.target;
    const newDataState = [...tableData.data];
    const row = newDataState.find((row) => row._id === rowId);
    row[accessor] = value;
    onUpdateData({ ...tableData, data: newDataState });
    console.log(`Row ${rowId}, Accessor ${accessor}, Value ${value}`);
  };

  return (
    <tbody>
      {tableData.data.map((data) => (
        <tr key={data._id}>
          {columns.map(({ accessor, CellData }) => (
            <td
              key={accessor}
              className="border-t border-r border-r-gray-700 border-white px-2 py-2.5 overflow-x-auto hide-scrollbar"
              onClick={() => setEditCell({ rowId: data._id, accessor })}>
              {renderCellContent(accessor, data, CellData)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
