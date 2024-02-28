import OfferCard from "./ui/offer-card";
import { GetOffers } from "../actions/get-offers";
import { useState } from "react";

const OffersList = () => {
  const [offers, setOffers] = useState([]);

  GetOffers({
    setOffers: setOffers,
  });

  const offerList =
    offers.data && offers.data.length > 0 ? (
      offers.data.map((product, index) => (
        <OfferCard key={index} data={offers.data[index]} />
      ))
    ) : (
      <div className="w-full text-white ml-[50%] ">No Offers Found</div>
    );

  return (
    <section
      id="offers"
      className="flex flex-col items-start border-t-2 py-8 px-3 border-t-red-300 bg-[#000000] bg-opacity-80 rounded-md">
      <h1 className="pb-1 px-3 font-semibold text-white text-2xl font-mono">
        Great Offers🌟
      </h1>
      <div className="container w-fit grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-10 pt-5">
        {offerList}
      </div>
    </section>
  );
};

export default OffersList;
