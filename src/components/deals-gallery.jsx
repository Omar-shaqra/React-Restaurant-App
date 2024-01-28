import DealCard from "./ui/deal-card";

const DealsGallery = () => {
  return (
    <section
      id="deals"
      className="flex flex-col items-center border-t-2 pt-4 border-t-red-300 bg-[#ffe9ba]">
      <h1 className="pb-2  font-semibold text-2xl font-serif">Best Deals </h1>
      <div className="w-24 border-b-2 border-red-400" />
      <div className="container w-fit grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-3 pt-5">
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
      </div>
    </section>
  );
};

export default DealsGallery;
