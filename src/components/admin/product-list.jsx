import { Delete } from "lucide-react";
import { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../../components/ui/product-card";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1324 },
    items: 5,
    slidesToSlide: 3,
  },
  smallDesktop: {
    breakpoint: { max: 1324, min: 1024 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 637, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
};

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
    <>
      {/* Search */}
      <div className="relative flex self-end w-80">
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

      <div className="my-4 bg-[#000000] bg-opacity-70 container border-t-[#d46622] border-t rounded-md text-base">
        <Carousel
          slidesToSlide={3}
          swipeable={false}
          minimumTouchDrag={80}
          keyBoardControl={true}
          arrows
          responsive={responsive}>
          {productList}
        </Carousel>
      </div>
    </>
  );
};
export default ProductList;
