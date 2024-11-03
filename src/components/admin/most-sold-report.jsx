import React, { useState } from "react";

import { GetMostSold } from "../../actions/get-orders";
import Button from "../ui/button";

const MostSoldReport = () => {
  const [mostSold, setMostSold] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  GetMostSold({ setMostSold });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const mostSoldIndex = mostSold.slice(indexOfFirstItem, indexOfLastItem);

  const mostSoldItems = mostSoldIndex.map((item) => (
    <div key={item._id} className="table-row">
      <div className="table-cell p-2 border border-[#991b1b]/70 bg-[#dedede] text-lg text-black">
        {item.title}
      </div>
      <div className="table-cell p-2 text-center border border-[#991b1b]/70 text-lg bg-[#fff5e7] text-black">
        {item.totalSold}
      </div>
    </div>
  ));

  // Number of MOST SOLD pages
  const totalMostSoldPages = Math.ceil(mostSold.length / itemsPerPage);

  // Next & Previous Buttons
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalMostSoldPages));
  };

  return (
    <div className="flex flex-col w-5/6">
      <h4 className="p-2 mb-4 text-xl font-semibold border border-[#fca5a5] bg-black rounded-full w-fit">
        Most Sold Items:
      </h4>
      <div className="table w-full border-collapse">
        <div className="table-header-group">
          <div className="table-row">
            <div className="table-cell p-2 font-bold text-center bg-black border">
              Item
            </div>
            <div className="table-cell p-2 font-bold text-center bg-black border">
              Total Sold
            </div>
          </div>
        </div>
        <div className="table-row-group">{mostSoldItems}</div>
      </div>
      <div className="flex justify-between w-full mt-4">
        <div className="transition-all duration-300 border rounded-md h-fit hover:border-orange-400 hover:scale-105">
          <Button text="Previous" onClick={handlePreviousPage} />
        </div>
        <span>
          Page {currentPage} of {totalMostSoldPages}
        </span>
        <div className="transition-all duration-300 border rounded-md h-fit hover:border-orange-400 hover:scale-105">
          <Button text="Next" onClick={handleNextPage} />
        </div>
      </div>
    </div>
  );
};

export default MostSoldReport;
