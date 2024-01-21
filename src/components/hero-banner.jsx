import { useEffect, useState } from "react";
import { heroSlides } from "../utils/constants";

const HeroBanner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="relative flex flex-col overflow-hidden">
      <img
        src={heroSlides[currentIndex]}
        alt="Images"
        className="w-11/12 self-center"
      />
      <div className="flex flex-col absolute bottom-4 self-center">
        <div className="flex flex-col justify-center items-center text-white ">
          <div className="flex flex-row mt-4 ">
            {heroSlides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className="text-2xl cursor-pointer">
                <div
                  className={`mx-2 rounded-full h-2 w-2  ${
                    slideIndex === currentIndex
                      ? "bg-neutral-800 animate-bounce"
                      : "bg-neutral-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
