import HeroBanner from "../components/hero-banner";
import DealsGallery from "../components/deals-gallery";
import CategoryGallery from "../components/category-gallery";
import OffersGallery from "../components/offers-gallery";

function Home() {
  return (
    <div className="container mx-auto flex flex-col flex-1 space-y-14 p-3">
      <HeroBanner />
      <CategoryGallery />
      <DealsGallery />
      <OffersGallery />
    </div>
  );
}

export default Home;
