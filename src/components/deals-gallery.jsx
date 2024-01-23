import DealCard from "./ui/deal-card";

const BestDeals = () => {
  return (
    <div
      id="deals"
      className="flex flex-col items-center border-t pt-2 border-t-red-300">
      <h1 className="pb-2 border-b-2 border-b-red-300 font-semibold text-2xl">
        Our Best Deals
      </h1>
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 gap-3 pt-5">
        <DealCard />
        <DealCard />
        <DealCard />
        <DealCard />
      </div>
    </div>
  );
};

export default BestDeals;
