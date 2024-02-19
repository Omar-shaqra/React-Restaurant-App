import img from "../../assets/logo.png";

const CategoryCard = ({ name, image, selected, onClick }) => {
  const cardClassName = selected
    ? "flex flex-col items-center text-white bg-orange-800 md:hover:cursor-pointer transition duration-300 p-1 rounded self-center"
    : "flex flex-col items-center text-white bg-white/90 md:hover:text-red-300 hover:cursor-pointer md:hover:scale-110 transition p-1 rounded";

  return (
    <section className="flex flex-col items-center gap-1 ">
      <div className={cardClassName} onClick={onClick}>
        <img
          src={
            image ? image.replace("undefined", "http://localhost:8000") : img
          }
          alt=""
          className="md:h-24 xs:h-16 bg-opacity-0 rounded"
        />
      </div>
      <h3 className="font-semibold self-center justify-center capitalize tracking-widest text-md">
        {name}
      </h3>
    </section>
  );
};

export default CategoryCard;
