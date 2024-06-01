import { ArrowBigDownDash, Delete } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import "react-multi-carousel/lib/styles.css";

import { GetProductsWithCategoryIdForAdmin } from "../../actions/get-products";
import ProductCard from "../../components/ui/product-card";

const ProductList = ({ products, categories, refetch }) => {
  const [categoryId, setCategoryId] = useState("");
  const [productsWithCategory, setProductsWithCategory] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  GetProductsWithCategoryIdForAdmin({
    setProducts: setProductsWithCategory,
    id: categoryId,
  });

  // Handle the selection of view all products
  useEffect(() => {
    if (categoryId) {
      if (categoryId === "all") {
        setProductsWithCategory([]);
      }
    }
  }, [categoryId]);

  // View All Products by default or view by category if category is selected
  const filteredProducts = useMemo(() => {
    if (productsWithCategory.length != 0) {
      return productsWithCategory.data.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
    } else
      return products.data?.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
  }, [productsWithCategory, products.data, searchQuery]);

  // Loop through filterd Products
  const productList =
    filteredProducts?.length > 0 ? (
      filteredProducts.map((product, index) => (
        <div className="overflow-x-auto hide-scrollbar scroll-auto" key={index}>
          <ProductCard
            data={product}
            image="hidden"
            button="delete"
            refetch={refetch}
          />
        </div>
      ))
    ) : (
      <p className="p-1 text-nowrap">No Products Found</p>
    );

  const categoriesOptions =
    categories &&
    categories.map((item, index) => (
      <option
        className="font-semibold text-center capitalize bg-black"
        key={categories[index]._id}
        value={categories[index]._id}>
        {categories[index].name}
      </option>
    ));

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section className="w-[90%]">
      {/* Top bar */}
      <div className="sticky z-20 flex items-center justify-between w-full pr-2 bg-black border-r border-red-300 rounded-lg top-1">
        {/* Search */}
        <div className="relative flex self-end w-64 rounded-md">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            autoFocus
            onChange={handleSearch}
            className="w-64 pr-8 font-medium input-field"
          />
          <Delete
            className="absolute text-gray-300 transition transform -translate-y-1/2 cursor-pointer hover:scale-110 right-2 top-1/2"
            onClick={() => setSearchQuery("")}
            size={23}
          />
        </div>

        {/* Categories & No. Of Products */}
        <div className="flex items-center gap-1">
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
            }}
            className="h-12 pl-3 text-base text-center capitalize bg-black border border-red-300 rounded-lg focus:border-white bg-opacity-70">
            <option
              value="all"
              className="font-semibold bg-white text-neutral-800">
              View All Products
            </option>
            {categoriesOptions}
          </select>
          <span className="flex flex-col items-center">
            <p className="text-sm text-orange-400">
              {filteredProducts?.length}
            </p>
            <p className="text-sm">Product</p>
          </span>
        </div>

        {/* Go down button */}
        <a
          href="#add-product"
          className="flex gap-2 transition-all duration-300 hover:text-orange-400 group text-nowrap">
          <p className="text-base">Add Product</p>
          <ArrowBigDownDash className="group-hover:animate-bounce" size={20} />
        </a>
      </div>

      {/* Products */}
      <div className="my-4 bg-[#000000] bg-opacity-80 border-t-[#d46622] border-t rounded-md text-base">
        {productList}
      </div>
    </section>
  );
};
export default ProductList;
