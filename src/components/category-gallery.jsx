import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CategoryCard from "./ui/category-card";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3500, min: 2000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CategoryGallery = () => {
  return (
    <section className="pt-10 shadow-sm flex flex-col">
      <h1 className="p-2 self-center font-semibold text-3xl font-mono text-white tracking-widest w-fit rounded-2xl">
        Categories
      </h1>
      <Carousel
        className="flex bg-[#000000] bg-opacity-70 rounded-md py-4 items-center px-2"
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
    </section>
  );
};

export default CategoryGallery;
