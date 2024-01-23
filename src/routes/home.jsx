import HeroBanner from "../components/hero-banner";
import BestDeals from "../components/deals-gallery";
import CategoryGallery from "../components/category-gallery";

function Home() {
  return (
    <div className="container mx-auto flex flex-col flex-1 space-y-12">
      <HeroBanner />
      <CategoryGallery />
      <BestDeals />
    </div>
  );
}

export default Home;
