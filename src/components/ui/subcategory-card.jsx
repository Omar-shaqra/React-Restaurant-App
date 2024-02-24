const SubcategoryCard = ({ name, selected, onClick }) => {
  const cardClassName = selected
    ? "flex flex-col items-center py-1 px-2 text-white bg-orange-800 rounded-full hover:cursor-pointer transition duration-300"
    : "flex flex-col items-center py-1 px-2 text-white bg-orange-100/20 rounded-full hover:text-red-300 hover:cursor-pointer hover:scale-110 transition";

  return (
    <div className={cardClassName} onClick={onClick}>
      <h3 className="font-semibold capitalize tracking-widest md:text-base xs:text-xs text-nowrap">
        {name}
      </h3>
    </div>
  );
};

export default SubcategoryCard;
