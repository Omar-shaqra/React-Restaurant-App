import OffersList from "../components/offers-list";
import ProductList from "../components/product-list";

function Home() {
  return (
    <div className="container min-w-full px-3 mx-auto my-0 space-y-14">
      <ProductList />
      <OffersList />
    </div>
  );
}

export default Home;
