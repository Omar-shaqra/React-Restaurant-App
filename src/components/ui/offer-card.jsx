import offerImg from "/src/assets/offer1.jpg";
const OfferCard = () => {
  return (
    <div className="container relative">
      <h1 className="font-semibold text-2xl text-white absolute right-0 p-3 translate-y-24">
        chicken bucket
      </h1>
      <img src={offerImg} alt="Offer Image" className="rounded-2xl w-64" />
    </div>
  );
};

export default OfferCard;
