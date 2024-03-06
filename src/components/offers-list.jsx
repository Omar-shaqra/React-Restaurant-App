import { useState } from "react";
import { GetOffers } from "../actions/get-offers";
import OfferCard from "./ui/offer-card";

const OffersList = () => {
  const [offers, setOffers] = useState([]);

  GetOffers({
    setOffers: setOffers,
  });

  const offerList =
    offers.data?.length > 0 ? (
      offers.data.map((product, index) => (
        <OfferCard key={index} data={offers.data[index]} />
      ))
    ) : (
      <p className="col-span-5 mx-auto text-white text-nowrap">
        No Offers Found
      </p>
    );

  return (
    <section
      id="offers"
      className="flex flex-col items-start border-t-2 py-8 px-3 border-t-red-300 bg-[#000000] bg-opacity-80 rounded-md">
      <h1 className="px-3 pb-1 font-mono text-2xl font-semibold text-white">
        Great Offers🌟
      </h1>
      <div className="container grid w-full gap-10 pt-5 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2">
        {offerList}
      </div>
    </section>
  );
};

export default OffersList;
