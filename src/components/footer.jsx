import { Facebook, Instagram, Phone, MapPin } from "lucide-react";
import footerLogo from "/src/assets/logo.png";

const Footer = () => {
  return (
    <section className=" mx-auto flex border-t-2 border-red-300 mt-10 bg-[#fce7bb]">
      <div className="container grid md:grid-cols-3 py-5">
        {/* Logo & Description */}
        <div className="py-2 px-4 ">
          <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3 flex items-center gap-3">
            <img src={footerLogo} alt="Logo" className="max-w-[50px]" />
            FOODIE
          </h1>
          <p className="">
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Possimus, voluptate
          </p>
          <br />
        </div>
        <div className="grid grid-cols-3 col-span-2 md:pl-8 ">
          {/* Important Links */}
          <div className="py-8 px-4">
            <h1 className="text-xl font-bold text-justify mb-3">
              Important Links
            </h1>
            <ul className="flex flex-col gap-3">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Services</li>
              <li className="cursor-pointer">Login</li>
            </ul>
          </div>
          {/* Links */}
          <div className="py-8 px-4">
            <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-3">
              Links
            </h1>
            <ul className="flex flex-col gap-3">
              <li className="cursor-pointer">Home</li>
              <li className="cursor-pointer">About</li>
              <li className="cursor-pointer">Services</li>
              <li className="cursor-pointer">Login</li>
            </ul>
          </div>
          {/* Extra Info */}
          <div className="py-8 px-2 flex flex-col items-center">
            <div className="flex items-center text-nowrap gap-3 mt-3">
              <MapPin />
              <p>Noida, Uttar Pradesh</p>
            </div>
            <div className="flex items-center gap-3 mt-3">
              <Phone />
              <p className="text-nowrap">+91 123456789</p>
            </div>
            <div className="flex items-center gap-3 mt-6">
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
    </section>
  );
};

export default Footer;
