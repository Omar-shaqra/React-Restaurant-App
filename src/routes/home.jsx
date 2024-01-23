import HeroBanner from "../components/hero-banner";
import BestDeals from "../components/deals-gallery";
import CategoryGallery from "../components/category-gallery";
import Container from "../components/ui/Container";

function Home() {
  return (
    <Container>
      <div className="flex flex-col flex-1 space-y-12">
        <HeroBanner />
        <CategoryGallery />
        <BestDeals />
      </div>
    </Container>
  );
}

export default Home;
