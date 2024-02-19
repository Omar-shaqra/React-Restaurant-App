import { useState } from "react";

import {
  GetProducts,
  GetProductsWithSubcategoryId,
} from "../actions/get-products";
import CategoryList from "../components/category-list";
import SubcategoryList from "../components/subcategory-list";
import ProductCard from "./ui/product-card";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [selected_Category, setSelected_Category] = useState();
  const [selected_Subcategory, setSelected_Subcategory] = useState();

  if ((selected_Category == null) | (selected_Subcategory == null)) {
    GetProducts({ setProducts: setProducts });
  } else {
    GetProductsWithSubcategoryId({
      setProducts: setProducts,
      id: selected_Subcategory,
    });
  }

  function categoryFilter(selected) {
    if (selected_Category != selected) {
      setSelected_Category(selected);
    } else setSelected_Category(null);
  }

  function subcategoryFilter(selected) {
    if (selected_Subcategory != selected) {
      setSelected_Subcategory(selected);
    } else selected_Subcategory(null);
  }

  const productList =
    products.data && products.data.length > 0 ? (
      products.data.map((product, index) => (
        <ProductCard key={index} {...product} data={products.data[index]} />
      ))
    ) : (
      <div className="w-full text-white ml-[50%] ">No Pizza Found</div>
    );

  return (
    <section
      id="deals"
      className="flex w-full flex-col border-t-2 p-2 bg-[#000000] bg-opacity-80 border-t-red-300 rounded-md">
      <h4 className="flex flex-col self-center font-semibold text-white bg-black/30 p-2 md:text-lg xs:text-base tracking-widest w-fit rounded-2xl">
        Select your Favorite
      </h4>
      <div className="sticky top-0 z-10 flex flex-col w-full self-center gap-x-2 bg-black">
        <CategoryList categoryFilter={categoryFilter} />
        <SubcategoryList
          subcategoryFilter={subcategoryFilter}
          selected_Category={selected_Category}
        />
      </div>

      <div className="items-center z-0 justify-center flex-row w-fit grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 xs:grid-cols-2 md:gap-3 xs:gap-0 pt-5 xs:pt-1">
        {productList}
      </div>
    </section>
  );
};

export default ProductList;
