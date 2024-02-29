import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { GetCategories } from "../actions/get-categories";
import CategoryCard from "./ui/category-card";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 3500, min: 1536 },
    items: 8,
  },
  desktop: {
    breakpoint: { max: 1536, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 626 },
    items: 3,
  },
  smallTablet: {
    breakpoint: { max: 626, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const CategoryList = ({ categoryFilter }) => {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState();

  GetCategories({ setCategories: setCategories });

  function handleOnClick(categoryId) {
    if (selected == categoryId) {
      setSelected(null);
    } else setSelected(categoryId);
  }

  const categoryList =
    categories.data?.length > 0 ? (
      categories.data.map((category, index) => (
        <div
          className="w-fit"
          onClick={() => {
            categoryFilter(category._id);
          }}
          key={index}>
          <CategoryCard
            {...category}
            onClick={() => handleOnClick(category._id)}
            selected={selected === category._id}
          />
        </div>
      ))
    ) : (
      <div className="self-center text-base text-center">
        No Categories Found
      </div>
    );

  return (
    <section className="shadow-sm flex flex-col text-white mt-1">
      {categoryList && (
        <Carousel
          className="flex flex-row rounded bg-[#000000]/20 z-0 px-2 py-1 mx-3"
          slidesToSlide={2}
          additionalTransfrom={0}
          minimumTouchDrag={80}
          centerMode={true}
          arrows
          infinite
          rewind
          responsive={responsive}>
          {categoryList}
        </Carousel>
      )}
    </section>
  );
};

export default CategoryList;
