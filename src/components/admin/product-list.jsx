import { ArrowBigDownDash, Delete } from "lucide-react";
import { useState } from "react";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../../components/ui/product-card";

const ProductList = ({ products, refetch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.data?.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section>
      {/* Top bar */}
      <div className="sticky flex items-center justify-between w-full pr-2 bg-black border-[.5px] rounded-lg top-1">
        {/* Search */}
        <div className="relative flex self-end rounded-md w-80">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleSearch}
            className="font-medium input-field"
          />
          <Delete
            className="absolute text-gray-300 cursor-pointer right-4 bottom-3"
            onClick={() => setSearchQuery("")}
            size={23}
          />
        </div>
        {/* Go down button */}
        <a
          href="#add-product"
          className="flex gap-2 transition-all duration-300 hover:text-orange-400 group">
          <p className="text-base">Add Product</p>
          <ArrowBigDownDash className="group-hover:animate-bounce" />
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
