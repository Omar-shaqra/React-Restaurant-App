import { useState } from "react";
import OfferList from "./components/offer-list";
import { GetOffers } from "../../actions/get-offers";
import { GetProducts } from "../../actions/get-products";
import OfferForm from "./components/offer-form";

const AddOffer = () => {
  const [products, setProducts] = useState([]);
  const [offers, setOffers] = useState([]);

  GetProducts({ setProducts: setProducts });

  const { refetch } = GetOffers({
    setOffers: setOffers,
  });

  return (
    <section className="flex flex-col items-center px-4 gap-4 my-5 text-2xl font-semibold text-white">
      <h1 className="self-center font-extrabold tracking-wider">All offers</h1>
      <OfferList offers={offers} refetch={refetch} />

      <OfferForm products={products.data} refetch={refetch} />
    </section>
  );
};

export default AddOffer;
