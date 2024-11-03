import axios from "axios";
import { BadgeX } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";

import { GetDailyEarnings } from "../../actions/get-orders";
import Button from "../../components/ui/button";
import { getCurrentDate } from "../../utils/constants";
import Currency from "../ui/currency";
import IconButton from "../ui/icon-button";

const DailyEarningsReport = () => {
  const [dailyEarnings, setDailyEarnings] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [filteredDailyEarnings, setFilteredDailyEarnings] = useState([]);
  const [isDateFiltered, setIsDateFiltered] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  GetDailyEarnings({ setDailyEarnings });

  //* TOTAL DATA *******
  const dailyEarningsIndex = dailyEarnings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Number of Total DAILY EARNINGS pages
  const totalDailyEarningsPages = Math.ceil(
    dailyEarnings.length / itemsPerPage
  );

  // Table Item
  const dailyEarningsItems = dailyEarningsIndex.map((item) => (
    <div key={item._id.date} className="items-center table-row">
      <div className="table-cell p-2 border border-[#991b1b]/70 bg-[#dedede] text-lg text-black text-center">
        {new Date(item._id.date).toLocaleDateString()}
      </div>
      <div className="table-cell p-2 text-center border border-[#991b1b]/70 text-lg bg-[#fff5e7] text-black">
        {/* {item.totalEarnings} OMR */}
        <Currency value={item.totalEarnings} />
      </div>
    </div>
  ));

  /////////////////////////////////////////////////////////////

  //* FILTERD DATA
  const filteredDailyEarningsIndex = filteredDailyEarnings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Number of Filterd DAILY EARNINGS pages
  const filteredDailyEarningsPages = Math.ceil(
    filteredDailyEarnings.length / itemsPerPage
  );

  // Filterd Table Item
  const filteredDailyEarningsItems = filteredDailyEarningsIndex.map((item) => (
    <div key={item._id.date} className="items-center table-row">
      <div className="table-cell p-2 border border-[#991b1b]/70 bg-[#dedede] text-lg text-black text-center">
        {new Date(item._id.date).toLocaleDateString()}
      </div>
      <div className="table-cell p-2 text-center border border-[#991b1b]/70 text-lg bg-[#fff5e7] text-black">
        <Currency value={item.totalEarnings} />
      </div>
    </div>
  ));

  // Filter by Date Button
  const onDateFilter = async () => {
    const formattedStartDate = getCurrentDate(startDate);
    const formattedEndDate = getCurrentDate(endDate);

    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_REACT_API_URL
        }/sells/daily/earnings?from=${formattedStartDate}&to=${formattedEndDate}`
      );
      setFilteredDailyEarnings(response.data);
      setCurrentPage(1);
      setIsDateFiltered(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Reset all filters (x Button)
  const clearFilters = () => {
    setFilteredDailyEarnings([]);
    setCurrentPage(1);
    setEndDate(new Date());
    setStartDate(new Date());
    setIsDateFiltered(false);
  };

  // Previous & Next Buttons
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, pageCount));
  };

  /////////////////////////////////////////////////////////////

  //* Determine which data to display
  const diplayData = isDateFiltered
    ? filteredDailyEarningsItems
    : dailyEarningsItems;

  const pageCount = isDateFiltered
    ? filteredDailyEarningsPages
    : totalDailyEarningsPages;

  return (
    <div className="flex flex-col w-5/6">
      <div className="flex gap-x-10">
        <h4 className="p-2 mb-4 text-xl font-semibold bg-black border border-[#fca5a5] rounded-full w-fit">
          Daily Earnings:
        </h4>
        {/* Date */}
        <div className="flex gap-3 ">
          {/* Start Date */}
          <div className="relative text-white cursor-pointer">
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="font-medium cursor-pointer w-28 input-field"
            />
            <p className="absolute text-sm from-black bg-gradient-to-t -top-[11px] left-2 border-l-[0.5px] px-1 border-r-[0.5px] border-[#fca5a5]">
              Start Date
            </p>
          </div>

          {/* End Date */}
          <div className="relative flex text-white cursor-pointer">
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="font-medium cursor-pointer w-[135px] input-field"
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
          <div className="transition-all duration-300 border rounded-md h-fit hover:border-orange-400 hover:scale-105">
            <Button text="Filter" onClick={onDateFilter} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table w-full border-collapse">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell p-2 font-bold text-center bg-black border">
              Date
            </div>
            <div className="table-cell p-2 font-bold text-center bg-black border">
              Total Earnings
            </div>
          </div>
        </div>
        <div className="table-row-group">{diplayData}</div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full mt-4">
        {/* Previous */}
        <div className="transition-all duration-300 border rounded-md h-fit hover:border-orange-400 hover:scale-105">
          <Button text="Previous" onClick={handlePreviousPage} />
        </div>

        <span>
          Page {currentPage} of {pageCount}
        </span>
        {/* Next */}
        <div className="transition-all duration-300 border rounded-md h-fit hover:border-orange-400 hover:scale-105">
          <Button text="Next" onClick={handleNextPage} />
        </div>
      </div>
    </div>
  );
};

export default DailyEarningsReport;
