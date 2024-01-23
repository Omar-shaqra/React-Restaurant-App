import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronRight, ChevronLeft } from "lucide-react";

import { heroSlides } from "../utils/constants";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 464,
    },
    items: 1,
  },
};

const HeroBanner = () => {
  return (
    <div className="relative flex flex-col overflow-hidden">
      <Carousel
        additionalTransfrom={0}
        autoPlay
        arrows={false}
        autoPlaySpeed={4000}
        centerMode={false}
        className=""
        containerClass="container-with-dots"
        dotListClass="si"
        draggable
        focusOnSelect={false}
        infinite
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={responsive}
        rewind
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots
        sliderClass=""
        slidesToSlide={1}
        swipeable>
        {heroSlides.map((slide, slideIndex) => (
          <img
            src={heroSlides[slideIndex]}
            alt="banner-img"
            key={slideIndex}
            className="pb-6 rounded-md"
          />
        ))}
      </Carousel>
    </div>
  );
};

export default HeroBanner;
