import axios from "axios";
import toast from "react-hot-toast";

import Button from "../../components/ui/button";
import TableBody from "./order-table-body";
import TableHead from "./order-table-head";
import { useSortableTable } from "./useSortableTable";
import { useState } from "react";
import { Delete } from "lucide-react";

const columns = [
  {
    label: "Order",
    accessor: "[productData]",
    sortable: false,
  },
  {
    label: "Order ID",
    accessor: "_id",
    sortable: false,
  },
  {
    label: "Branch",
    accessor: "BranchID",
    sortable: true,
  },
  {
    label: "Phone",
    accessor: "userphone",
    sortable: false,
  },
  {
    label: "Date",
    accessor: "Date",
    sortable: true,
  },
  {
    label: "Governate",
    accessor: "governate",
    sortable: true,
  },
  {
    label: "State",
    accessor: "state",
    sortable: true,
  },
  {
    label: "Address",
    accessor: "address",
    sortable: false,
  },
  {
    label: "Payment",
    accessor: "TypeOfPayment",
    sortable: true,
  },
  {
    label: "Price",
    accessor: "TotalPrice",
    sortable: false,
  },
  {
    label: "Paid",
    accessor: "statue",
    sortable: true,
  },
];

const OrderTable = () => {
  const [orders, setOrders, handleSorting] = useSortableTable();
  const [searchQuery, setSearchQuery] = useState("");

  const updateOrderData = (newData) => {
    setOrders(newData);
  };

  const onUpdate = async () => {
    try {
      await axios.put(`${import.meta.env.VITE_REACT_API_URL}/sells`, {});
      toast.success("Table Updated successfully.");
    } catch (error) {
      console.error("Error Updating Order:", error);
      toast.error("Error Updating Order.");
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = orders?.data.filter((data) => {
    return columns.some(({ accessor }) => {
      const cellValue = data[accessor]?.toString().toLowerCase().trim();
      const searchValue = searchQuery.toLowerCase().trim();
      return cellValue && cellValue.includes(searchValue);
    });
  });

  return (
    <>
      <table className="table border-4 table-fixed">
        <caption className="sticky top-0 py-3 text-2xl font-extrabold tracking-wider">
          Orders
          <div className="flex justify-between pt-2">
            {/* Search */}
            <div className="relative flex self-end gap-2">
              <input
                type="text"
                placeholder="Search Orders..."
                value={searchQuery}
                onChange={handleSearch}
                className="font-medium input-field "
              />

              <Delete
                className="absolute text-gray-300 cursor-pointer right-4 bottom-3"
                onClick={() => setSearchQuery("")}
                size={23}
              />
            </div>
            {/* Update Button */}
            <div className="self-center mx-2 border border-[#fca5a5] rounded-md bg-black hover:border-orange-400 hover:rounded transition-all">
              <Button text="Update Table" onClick={onUpdate} />
            </div>
          </div>
        </caption>

        {orders && (
          <>
            <TableHead {...{ columns, handleSorting }} />
            <TableBody
              onUpdateData={updateOrderData}
              columns={columns}
              tableData={{ data: filteredData }}
            />
          </>
        )}
      </table>
    </>
  );
};
export default OrderTable;
