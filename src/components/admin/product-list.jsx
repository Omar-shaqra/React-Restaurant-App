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
  const productList =
    products.data?.length > 0 ? (
      products.data.map((product, index) => (
        <ProductCard
          key={index}
          data={product}
          image="hidden"
          button="delete"
          refetch={refetch}
        />
      ))
    ) : (
      <p>No Products Found</p>
    );

  return (
    <Carousel
      className="border-t-[#d46622] border-t rounded-md text-base"
      slidesToSlide={3}
      swipeable={false}
      minimumTouchDrag={80}
      keyBoardControl={true}
      arrows
      responsive={responsive}>
      {productList}
    </Carousel>
  );
};
export default ProductList;
