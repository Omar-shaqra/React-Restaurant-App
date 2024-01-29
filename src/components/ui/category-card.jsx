import { Link } from "react-router-dom";

import cateImg from "../../assets/cate1.png";

const CategoryCard = ({ data }) => {
  return (
    <Link
      to={`/subcategory/${data?.id}`}
      className="flex flex-col items-center text-white">
      {/* <img
        className="w-40"
        src={data ? data.img : cateImg}
        alt="category img"
      /> */}
      <h3 className="font-semibold capitalize tracking-widest text-xl hover:text-red-300">
        {data ? data.title : "fresh drinks"}
      </h3>
    </Link>
  );
};

export default CategoryCard;
