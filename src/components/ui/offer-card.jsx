const OfferCard = ({ data }) => {
  return (
    <div className="container relative">
      <h1 className="absolute font-semibold font-serif md:text-2xl sm:text-lg xs:text-sm bg-black/90 rounded text-white left-0 p-1 ">
        {data.name}
      </h1>
      <h1 className="absolute flex items-center gap-1 font-semibold md:text-2xl sm:text-lg xs:text-sm bg-black/90 rounded text-white right-0 bottom-0 p-1 ">
        <span className="text-gray-400 text-xs">OMR</span>
        {data.price}
      </h1>
      <img
        src={data?.image.replace("undefined", "http://localhost:8000/")}
        alt="Offer Image"
        className="rounded-2xl w-64"
      />
    </div>
  );
};

export default OfferCard;
