import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CategoryCard from "./ui/category-card";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const CategoryGallery = () => {
  return (
    <div>
      <h1 className="font-semibold text-xl mb-2">Our Categories</h1>
      <Carousel
        className="bg-orange-200 rounded-md py-3 px-2 justify-center"
        dotListClass=""
        itemClass=""
        sliderClass=""
        containerClass="container"
        additionalTransfrom={0}
        minimumTouchDrag={80}
        autoPlaySpeed={3000}
        arrows
        draggable
        keyBoardControl
        pauseOnHover
        centerMode={false}
        infinite
        focusOnSelect={false}
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        showDots={false}
        shouldResetAutoplay
        slidesToSlide={2}
        swipeable
        responsive={responsive}>
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
        <CategoryCard />
      </Carousel>
    </div>
  );
};

export default CategoryGallery;
