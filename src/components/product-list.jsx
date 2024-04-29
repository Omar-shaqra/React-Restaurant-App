import { useState } from "react";

import {
  GetProducts,
  GetProductsWithCategoryId,
  GetProductsWithSubcategoryId,
} from "../actions/get-products";
import CategoryList from "../components/category-list";
import SubcategoryList from "../components/subcategory-list";
import ProductCard from "./ui/product-card";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const [selected_Category, setSelected_Category] = useState(null);
  const [selected_Subcategory, setSelected_Subcategory] = useState(null);

  // Category filter only
  if (selected_Category && !selected_Subcategory) {
    GetProductsWithCategoryId({
      setProducts: setProducts,
      id: selected_Category,
    });
  }
  // Category & Subcategory filter
  else if (selected_Category && selected_Subcategory) {
    GetProductsWithSubcategoryId({
      setProducts: setProducts,
      id: selected_Subcategory,
    });
  }
  // No filter
  else {
    GetProducts({ setProducts: setProducts });
  }

  // Update Categories UI when selected
  function categoryFilter(selected) {
    if (selected_Category != selected) {
      setSelected_Category(selected);
      setSelected_Subcategory(null);
    } else setSelected_Category(null);
  }
  // Update Categories UI when selected
  function subcategoryFilter(selected) {
    if (selected_Subcategory != selected || !selected_Category) {
      setSelected_Subcategory(selected);
    } else setSelected_Subcategory(null);
  }

  const productList =
    products.data?.length > 0 &&
    products.data.map((product, index) => (
      <ProductCard key={index} data={product} image="visible" button="add" />
    ));

  return (
    <section
      id="deals"
      className="w-full flex flex-col border-t-2  bg-[#000000] bg-opacity-80 border-t-red-300 rounded-md">
      <h4 className="flex flex-col self-center p-2 font-semibold tracking-widest text-white bg-black/30 md:text-lg xs:text-base rounded-2xl">
        Select your Favorite
      </h4>
      <div className="sticky top-0 z-10 flex flex-col bg-black gap-x-2">
        <CategoryList categoryFilter={categoryFilter} />
        <SubcategoryList
          subcategoryFilter={subcategoryFilter}
          selected_Category={selected_Category}
        />
      </div>

      <div className="z-0 grid flex-row items-center justify-center pt-5 2xl:grid-cols-5 xl:grid-cols-3 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 md:gap-3 xs:gap-0 xs:pt-1">
        {productList}
      </div>
    </section>
  );
};

export default ProductList;
//TODO use js to filter instead of server requests
// const productList = () => {
//   // ✅ When category only is selected
//   if (selected_Category && !selected_Subcategory) {
//     return (
//       products.data?.length > 0 &&
//       products.data
//         .filter((product) => product.category.name === selected_Category)
//         .map((product, index) => (
//           <ProductCard key={index} data={products.data[index]} {...product} />
//         ))
//     );
//   } // When category & subcategory are selected
//   else if (selected_Category && selected_Subcategory) {
//     return (
//       products.data?.length > 0 &&
//       products.data.subcategories &&
//       products.data
//         .filter(
//           (product) =>
//             product.subcategories &&
//             product.subcategories === selected_Subcategory
//         )
//         .map((product, index) => (
//           <ProductCard key={index} data={products.data[index]} {...product} />
//         ))
//     );
//   } // when No category or subcategory are selected
//   else
//     return (
//       products.data?.length > 0 &&
//       products.data.map((product, index) => (
//         <ProductCard key={index} data={products.data[index]} {...product} />
//       ))
//     );
// };
