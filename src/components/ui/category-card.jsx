const CategoryCard = ({ img, title }) => {
  return (
    <div className="flex flex-col items-center">
      <img className="w-40" src="/src/assets/cate1.png" alt="category img" />
      <h3 className="font-semibold"> fresh drinks</h3>
    </div>
  );
};

export default CategoryCard;
