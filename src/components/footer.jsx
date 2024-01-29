import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import footerLogo from "/src/assets/logo.png";
// import pizza from "/src/assets/pizza3.jpg";

const Footer = () => {
  return (
    <section
      id="footer"
      className="flex  mt-10 text-white  bg-gradient-to-t from-black  bg-opacity-30">
      <div>
        {/* <img src={pizza} alt="" className="absolute max-w-md" /> */}
        <div className="container grid md:grid-cols-3 py-5">
          {/* Logo & Description */}
          <div className="py-2 px-4 ">
            <h1 className="w-fit sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
              <img src={footerLogo} alt="Logo" className="max-w-[80px] bg" />A
              Pizza
            </h1>
            <p className="px-2">
              Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Possimus, voluptate
            </p>
            <br />
          </div>
          <div className="grid grid-cols-3 col-span-2 md:pl-8 items-center justify-center ml-auto space-x-20">
            {/* Important Links */}
            <div className="py-8 px-4 justify-self-center">
              <h1 className="text-xl font-bold w-fit text-center mb-3  p-2 rounded-lg">
                Important Links
              </h1>
              <ul className="flex flex-col gap-3 w-fit">
                <li className="cursor-pointer  p-2 rounded-lg ">Home</li>
                <li className="cursor-pointer  p-2 rounded-lg">About</li>
                <li className="cursor-pointer  p-2 rounded-lg">Services</li>
                <li className="cursor-pointer  p-2 rounded-lg">Login</li>
              </ul>
            </div>
            {/* Links */}
            <div className="py-8 px-4">
              <h1 className="w-fit sm:text-xl text-xl font-bold sm:text-left text-justify mb-3  p-2 rounded-lg">
                Links
              </h1>
              <ul className="w-fit flex flex-col gap-3 cursor-pointer">
                <li className=" p-2 rounded-lg">Home</li>
                <li className=" p-2 rounded-lg">About</li>
                <li className=" p-2 rounded-lg">Services</li>
                <li className=" p-2 rounded-lg">Login</li>
              </ul>
            </div>
            {/* Extra Info */}
            <div className="py-8 px-2 flex flex-col items-center ">
              <div className="flex items-center text-nowrap gap-3 mt-3  p-2 rounded-lg">
                <MapPin />
                <p>Noida, Uttar Pradesh</p>
              </div>
              <div className="flex items-center gap-3 mt-3  p-2 rounded-lg">
                <Phone />
                <p className="text-nowrap">+91 123456789</p>
              </div>
              <div className="flex items-center gap-3 mt-6  p-2 rounded-lg">
                <a href="#">
                  <Instagram className="text-3xl" />
                </a>
                <a href="#">
                  <Facebook className="text-3xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
