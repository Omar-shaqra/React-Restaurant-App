import { useState } from "react";
import BillModal from "../modals/bill-modal";

const TableBody = ({ tableData, columns, onUpdateData }) => {
  const [editCell, setEditCell] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderRow, setSelectedOrderRow] = useState(null); // State to store selected row

  // Render All Cells
  const renderCellContent = (accessor, data) => {
    if (accessor === "statue") {
      return statueCellContent(accessor, data);
    } else if (accessor === "[productData]") {
      return productsCellContent(data);
    } else {
      return nullCellContent(accessor, data);
    }
  };

  // Paid Status Cell
  const statueCellContent = (accessor, data) => {
    const isEditing =
      editCell && editCell.accessor === accessor && editCell.rowId === data._id;

    const handleChange = (e) => {
      const { value } = e.target;
      onUpdateData({
        ...tableData,
        data: tableData.data.map((row) =>
          row._id === data._id ? { ...row, [accessor]: value } : row
        ),
      });
    };

    if (isEditing) {
      return (
        <select value={data[accessor]} onChange={handleChange}>
          <option value="Paid">Paid</option>
          <option value="Not Paid">Not Paid</option>
        </select>
      );
    } else {
      return data[accessor] === true ? "Paid" : "Not Paid";
    }
  };

  // Order Products Cell
  const productsCellContent = (data) => {
    return (
      <div
        className="p-px font-semibold rounded cursor-pointer bg-orange-300/60"
        onClick={() => {
          setSelectedOrderRow(data); // Set selected row when clicked
          setIsModalOpen(true);
        }}>
        view order
      </div>
    );
  };

  // No Accessor Cell
  const nullCellContent = (accessor, data) => {
    return data[accessor] ? data[accessor] : "——";
  };

  // Edit (Paid) Cell
  const handleCellClick = (rowId, accessor) => {
    setEditCell({ rowId, accessor });
  };

  return (
    <tbody>
      {tableData.data.map((data) => (
        <tr key={data._id}>
          {columns.map(({ accessor }) => (
            <td
              key={accessor}
              className="border-t border-r border-r-gray-700 border-white px-2 py-2.5 overflow-x-auto hide-scrollbar"
              onClick={() => handleCellClick(data._id, accessor)}>
              {renderCellContent(accessor, data)}
            </td>
          ))}
        </tr>
      ))}

      {/* Pass data as selectedData */}
      {selectedOrderRow && (
        <BillModal
          data={selectedOrderRow}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </tbody>
  );
};

export default TableBody;
