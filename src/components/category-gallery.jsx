import axios from "axios";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import CategoryCard from "./ui/category-card";
import { GetCategories } from "../actions/get-categories";

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
  const [categories, setCategories] = useState([]);

  GetCategories({ setCategories: setCategories });

  return (
    <section className="shadow-sm flex flex-col text-white">
      <h1 className="p-2 self-center font-semibold text-3xl font-mono tracking-widest w-fit rounded-2xl">
        Categories
      </h1>
      {categories && categories.data && (
        <Carousel
          className="flex flex-row bg-[#000000] bg-opacity-70 rounded-md py-4 items-center justify-center px-2"
          slidesToSlide={1}
          additionalTransfrom={0}
          minimumTouchDrag={80}
          arrows
          infinite
          rewind
          responsive={responsive}>
          {categories &&
            categories.data &&
            Object.values(categories.data).map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
        </Carousel>
      )}
    </section>
  );
};

export default CategoryGallery;
