import OfferItem from "./offer-item";

const OfferList = ({ offers, deleteItem, refetch }) => {
  return (
    <div className="w-full flex gap-2 bg-black p-2 bg-opacity-75 text-base border-t-[#d46622] border-t rounded-md">
      {offers.data?.length > 0 ? (
        offers.data.map((item) => (
          <OfferItem
            item={item}
            deleteItem={deleteItem}
            refetch={refetch}
            key={item.id}
          />
        ))
      ) : (
        <div>No Offers Found</div>
      )}
    </div>
  );
};

export default OfferList;
