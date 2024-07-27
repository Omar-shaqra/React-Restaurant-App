import React, { useState } from "react";
import { GetDailyEarnings } from "../../actions/get-orders";
import Currency from "../ui/currency";

const DailyEarningsReport = () => {
  const [dailyEarnings, setDailyEarnings] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  GetDailyEarnings({ setDailyEarnings });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const dailyEarningsIndex = dailyEarnings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

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

  // Number of DAILY EARNINGS pages
  const totalDailyEarningsPages = Math.ceil(
    dailyEarnings.length / itemsPerPage
  );

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, totalDailyEarningsPages)
    );
  };

  return (
    <>
      <div className="flex flex-col w-5/6">
        <h4 className="p-2 mb-4 text-xl font-semibold bg-black rounded-full w-fit">
          Daily Earnings:
        </h4>
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
          <div className="table-row-group">{dailyEarningsItems}</div>
        </div>
        <div className="flex justify-between w-full mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105">
            Previous
          </button>
          <span>
            Page {currentPage} of {totalDailyEarningsPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalDailyEarningsPages}
            className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default DailyEarningsReport;
