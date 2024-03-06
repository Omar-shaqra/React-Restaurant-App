import OffersList from "../components/offers-list";
import ProductList from "../components/product-list";

function Home() {
  return (
    <div className="container flex flex-col p-3 mx-auto space-y-14">
      <ProductList />
      <OffersList />
    </div>
  );
}

export default Home;
