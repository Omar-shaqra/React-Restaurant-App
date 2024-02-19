import OfferCard from "./ui/offer-card";

const OffersGallery = () => {
  return (
    <section
      id="offers"
      className="flex flex-col items-start border-t-2 py-8 px-3 border-t-red-300 bg-[#000000] bg-opacity-80 rounded-md">
      <h1 className="pb-1 px-3 font-semibold text-white text-2xl font-mono">
        Great Offers🌟
      </h1>
      <div className="self-center">
        <div className="container w-fit grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-16 pt-5">
          <OfferCard />
          <OfferCard />
          <OfferCard />
          <OfferCard />
        </div>
      </div>
    </section>
  );
};

export default OffersGallery;
