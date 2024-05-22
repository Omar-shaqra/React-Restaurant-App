import axios from "axios";
import { Delete } from "lucide-react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

import Button from "../../components/ui/button";
import TableBody from "./order-table-body";
import TableHead from "./order-table-head";
import { useSortableTable } from "./useSortableTable";

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

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const OrderTable = () => {
  const [orders, setOrders, handleSorting] = useSortableTable();

  const [searchQuery, setSearchQuery] = useState("");

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onExportToExcel = () => {
    const dataToExport = filteredData.map((row) =>
      columns
        .filter((column) => column.label !== "Order") // Filter out columns with label "Order"
        .reduce((acc, column) => {
          acc[column.label] = row[column.accessor];
          return acc;
        }, {})
    );

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

    XLSX.writeFile(workbook, "orders.xlsx");
  };

  const onDateFilter = async () => {
    toast.error("Search not working yet");
    // const formattedStartDate = formatDate(startDate);
    // const formattedEndDate = formatDate(endDate);

    // const requestBody = {
    //   start: formattedStartDate,
    //   end: formattedEndDate,
    // };

    // console.log("Request Body:", requestBody);

    // try {
    //   await axios.get(
    //     `${import.meta.env.VITE_REACT_API_URL}/sells/search/date`,
    //     requestBody
    //   );
    //   // Handle response as needed
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //  Update local table data state
  const updateOrderDataCallback = (newData) => {
    setOrders(newData);
  };

  // View filterd data on search
  const filteredData = orders?.data.filter((data) => {
    return columns.some(({ accessor }) => {
      const cellValue = data[accessor]?.toString().toLowerCase().trim();
      const searchValue = searchQuery.toLowerCase().trim();
      return cellValue && cellValue.includes(searchValue);
    });
  });

  return (
    <section className="flex flex-col items-center px-4 my-5">
      <h1 className="self-center text-2xl font-extrabold tracking-wider text-white">
        All Orders
      </h1>
      {/* Search & Date & Update button */}
      <div className="sticky top-0 w-full py-3 mt-5 text-2xl font-extrabold tracking-wider">
        <div className="flex justify-between pt-2">
          <div className="relative flex self-end gap-2">
            {/* Search Bar */}
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Search Orders..."
                value={searchQuery}
                autoFocus
                onChange={handleSearch}
                className="w-64 pr-8 font-medium text-white input-field "
              />

              <Delete
                className="absolute text-gray-300 transform -translate-y-1/2 cursor-pointer right-2 top-1/2"
                onClick={() => setSearchQuery("")}
                size={23}
              />
            </div>

            {/* Date */}
            <div className="flex gap-3">
              {/* Start Date */}
              <div className="relative text-white">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="relative font-medium input-field"
                />
                <p className="absolute text-sm from-black bg-gradient-to-t -top-[11px] left-3 border-l-[0.5px] px-1 border-r-[0.5px] border-[#fca5a5]">
                  Start Date
                </p>
              </div>
              {/* End Date */}
              <div className="relative text-white">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="font-medium input-field"
                />
                <p className="absolute text-sm from-black bg-gradient-to-t -top-[11px] left-3 border-l-[0.5px] px-1 border-r-[0.5px] border-[#fca5a5]">
                  End Date
                </p>
              </div>
              {/* Filter Button */}
              <Button text="Filter" onClick={onDateFilter} />
            </div>
          </div>

          {/* Export to Excel Button */}
          <div className="self-center mx-2 transition-all duration-300 border rounded-md hover:border-green-400 hover:scale-110">
            <Button text="Export to Excel Sheet" onClick={onExportToExcel} />
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table text-black border-4 table-fixed">
        {orders && (
          <>
            <TableHead {...{ columns, handleSorting }} />
            <TableBody
              onUpdateData={updateOrderDataCallback}
              columns={columns}
              tableData={{ data: filteredData }}
            />
          </>
        )}
      </table>
    </section>
  );
};
export default OrderTable;
