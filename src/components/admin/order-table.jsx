import axios from "axios";
import { BadgeX, Delete } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

import Button from "../../components/ui/button";
import { playNotificationSound } from "../../utils/constants";
import TableBody from "./order-table-body";
import TableHead from "./order-table-head";
import { useSortableTable } from "./useSortableTable";
import IconButton from "../ui/icon-button";

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

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
  const previousOrderCountRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");

  const [orders, setOrders, handleSorting] = useSortableTable();

  const [dateFilteredOrders, setFilteredOrders] = useState([]);
  const [isDateFiltered, setIsDateFiltered] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    if (orders && orders.results) {
      const newOrderCount = orders.results;
      const previousOrderCount = previousOrderCountRef.current;

      // Play Notification sound if new order is fetched
      if (newOrderCount > previousOrderCount) {
        toast("New Order!");
        playNotificationSound();
      }

      // Update the previous order count
      previousOrderCountRef.current = newOrderCount;
    }
  }, [orders]);

  // Filter Table by Date
  const onDateFilter = async () => {
    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_API_URL}/sells/search/date`,
        { start: formattedStartDate, end: formattedEndDate }
      );
      setFilteredOrders(response.data);
      setIsDateFiltered(true);

      // Handle response as needed
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Export to Excel Sheet
  const onExportToExcel = () => {
    const dataToExport = searchFilteredOrders.map((row) =>
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

  // Filter By Search
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //  Update local table data state
  const updateOrderDataCallback = (newData) => {
    setOrders(newData);
  };

  // Reset all filters
  const clearFilters = () => {
    setFilteredOrders([]);
    setEndDate(new Date());
    setStartDate(new Date());
    setIsDateFiltered(false);
  };

  // View filterd Data by Search
  const searchFilteredOrders = orders.data?.filter((data) => {
    return columns.some(({ accessor }) => {
      const cellValue = data[accessor]?.toString().toLowerCase().trim();
      const searchValue = searchQuery.toLowerCase().trim();
      return cellValue && cellValue.includes(searchValue);
    });
  });

  // View filterd Data by Search & Date
  const searchAndDateFilterdOrders = dateFilteredOrders.filter((data) => {
    return columns.some(({ accessor }) => {
      const cellValue = data[accessor]?.toString().toLowerCase().trim();
      const searchValue = searchQuery.toLowerCase().trim();
      return cellValue && cellValue.includes(searchValue);
    });
  });

  // Determine which data to display
  const displayData = isDateFiltered
    ? searchAndDateFilterdOrders
    : searchFilteredOrders;

  return (
    <section className="flex flex-col items-center px-4 my-5">
      <h1 className="self-center text-2xl font-extrabold tracking-wider text-white">
        All Orders
      </h1>
      {/* Search & Date & Update button */}
      <div className="sticky top-0 w-full py-3 mt-5 text-2xl font-extrabold tracking-wider ">
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
                className="absolute text-gray-300 transition transform -translate-y-1/2 cursor-pointer hover:scale-110 right-2 top-1/2"
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
                  className="font-medium w-28 input-field"
                />
                <p className="absolute text-sm from-black bg-gradient-to-t -top-[11px] left-2 border-l-[0.5px] px-1 border-r-[0.5px] border-[#fca5a5]">
                  Start Date
                </p>
              </div>
              {/* End Date */}
              <div className="relative flex text-white">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="font-medium w-[135px] input-field"
                />
                <IconButton
                  className="absolute right-0 p-1 px-2 transition border-0 top-[6px] hover:scale-110"
                  onClick={clearFilters}
                  icon={<BadgeX size={20} />}
                />
                <p className="absolute text-sm from-black bg-gradient-to-t -top-[11px] left-3 border-l-[0.5px] px-1 border-r-[0.5px] border-[#fca5a5]">
                  End Date
                </p>
              </div>
              {/* Filter Button */}
              <div className="self-center mx-1 transition-all duration-300 border rounded-md hover:border-orange-400 hover:scale-105">
                <Button text="Filter" onClick={onDateFilter} />
              </div>
            </div>
          </div>

          {/* Export to Excel Button */}
          <div className="self-center mx-2 transition-all duration-300 border rounded-md hover:border-green-400 hover:scale-105">
            <Button text="Export to Excel Sheet" onClick={onExportToExcel} />
          </div>
        </div>
      </div>

      {/* Table */}
      <table className="table text-black border-4 table-fixed">
        {displayData && (
          <>
            <TableHead {...{ columns, handleSorting }} />
            <TableBody
              {...{ columns }}
              tableData={{ data: displayData }}
              onUpdateData={updateOrderDataCallback}
            />
          </>
        )}
      </table>
    </section>
  );
};
export default OrderTable;
