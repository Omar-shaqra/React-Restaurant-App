import { useState } from "react";
import { GetMostSold } from "../../actions/get-orders";

const reports = () => {
  const [mostSold, setMostSold] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  GetMostSold({ setMostSold });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = mostSold.slice(indexOfFirstItem, indexOfLastItem);

  const mostSoldItems = currentItems.map((item) => (
    <div key={item._id.title} className="flex gap-3 text-lg">
      <p className="font-serif ">{item._id.title} :</p>
      <p className="p-[2px] rounded-full w-8 text-center bg-orange-400/70">
        {item.totalSold}
      </p>
    </div>
  ));

  const totalPages = Math.ceil(mostSold.length / itemsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <section className="flex flex-col items-center w-full px-4 my-5 text-2xl font-semibold text-white">
      <h1 className="self-center font-extrabold tracking-wider">Reports</h1>
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-start gap-y-3">
          <h4 className="p-2 text-xl font-semibold bg-black rounded-full">
            Most Sold Items:
          </h4>
          {mostSoldItems}
        </div>
      </div>
      <div className="flex justify-between w-full mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105">
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105">
          Next
        </button>
      </div>
    </section>
  );
};

export default reports;
