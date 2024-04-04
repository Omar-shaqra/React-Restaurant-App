const CategoryCard = ({ data, selected, onClick }) => {
  const cardClassName = selected
    ? "flex flex-col items-center text-white bg-orange-800 md:hover:cursor-pointer transition duration-300 p-1 rounded self-center"
    : "flex flex-col items-center text-white bg-white/90 md:hover:text-red-300 hover:cursor-pointer md:hover:scale-110 transition p-1 rounded";

  return (
    <section className="flex flex-col items-center gap-1">
      <div className={cardClassName} onClick={onClick}>
        <img
          src={
            data.image &&
            data.image.replace(
              "undefined",
              "https://restaurant-menue-ordering-v1.onrender.com"
            )
          }
          alt={`${data.name}`}
          className="h-24 bg-opacity-0 rounded aspect-square"
        />
      </div>
      <h3 className="self-center justify-center font-semibold tracking-widest capitalize text-md">
        {data.name}
      </h3>
    </section>
  );
};

export default CategoryCard;
