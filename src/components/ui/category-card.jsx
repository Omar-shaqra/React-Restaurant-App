import cateImg from "../../assets/cate1.png";

const CategoryCard = ({ img, title }) => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-40" src={cateImg} alt="category img" />
      <h3 className="font-semibold capitalize"> fresh drinks</h3>
    </div>
  );
};

export default CategoryCard;
