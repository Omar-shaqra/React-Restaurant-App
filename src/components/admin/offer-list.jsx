import OfferItem from "./offer-item";

const OfferList = ({ offers, deleteItem, refetch }) => {
  return (
    <div className="w-full max-h-80 overflow-y-scroll hide-scrollbar grid lg:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 gap-4 bg-black p-2 bg-opacity-75 text-sm border-t-[#d46622] border-t rounded-md">
      {offers.data?.length > 0 ? (
        offers.data.map((item) => (
          <OfferItem
            item={item}
            deleteItem={deleteItem}
            refetch={refetch}
            key={item._id}
          />
        ))
      ) : (
        <div>No Offers Found</div>
      )}
    </div>
  );
};

export default OfferList;
