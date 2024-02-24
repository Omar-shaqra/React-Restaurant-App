import OffersGallery from "../components/offers-gallery";
import ProductList from "../components/product-list";

function Home() {
  return (
    <div className="container flex flex-col mx-auto space-y-14 p-3">
      <ProductList />
      <OffersGallery />
    </div>
  );
}

export default Home;
