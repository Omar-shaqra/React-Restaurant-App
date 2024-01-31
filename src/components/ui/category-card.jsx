import { Link } from "react-router-dom";

// import cateImg from "../../assets/cate1.png";

const CategoryCard = ({ _id, name }) => {
  return (
    <Link
      to={`/subcategory/${_id}`}
      className="flex flex-col items-center text-white">
      {/* <img
        className="w-40"
        src={data ? data.img : cateImg}
        alt="category img"
      /> */}
      <h3 className="font-semibold capitalize tracking-widest text-xl hover:text-red-300">
        {name}
      </h3>
    </Link>
  );
};

export default CategoryCard;
