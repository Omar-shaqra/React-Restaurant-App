import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

import { getCurrentDate } from "../../utils/constants";
import BillModal from "../modals/bill-modal";

const TableBody = ({ tableData, columns, onUpdateData }) => {
  const [editCell, setEditCell] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to open or close Bill Modal
  const [selectedOrderRow, setSelectedOrderRow] = useState(null); // State to store selected row

  // Render All Cells
  const renderCellContent = (accessor, data) => {
    if (accessor === "statue") {
      return statueCellContent(accessor, data);
    } else if (accessor === "[productData]") {
      return productsCellContent(data);
    } else if (accessor === "Date") {
      return getCurrentDate(data[accessor]);
    } else {
      return nullCellContent(accessor, data);
    }
  };

  // Paid Status Cell
  const statueCellContent = (accessor, data) => {
    const isEditing =
      editCell && editCell.accessor === accessor && editCell.rowId === data._id;

    const handleChange = async (e) => {
      const { value } = e.target;

      // Update local table data state
      onUpdateData({
        ...tableData,
        data: tableData.data.map((row) =>
          row._id === data._id ? { ...row, [accessor]: value } : row
        ),
      });

      // Send updated data to the API
      try {
        await axios.put(
          `${import.meta.env.VITE_REACT_API_URL}/sells/${data._id}`,
          { [accessor]: value }
        );
        toast.success("Table updated successfully.");
      } catch (error) {
        toast.error("Error updating order.");
      }
    };

    if (isEditing) {
      return (
        <select
          value={data[accessor]}
          onChange={handleChange}
          className="bg-gray-200 rounded cursor-pointer">
          <option value="Paid">Paid</option>
          <option value="Not Paid">Not Paid</option>
        </select>
      );
    } else {
      return <p>{data[accessor]}</p>;
    }
  };

  // Order Products Cell
  const productsCellContent = (data) => {
    return (
      <div
        className="p-px font-semibold rounded cursor-pointer bg-orange-200/60"
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
