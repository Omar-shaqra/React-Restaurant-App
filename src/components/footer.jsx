import { Facebook, Instagram, Youtube, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import ContactModal from "./modals/contact-modal";
import { useState } from "react";

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="footer"
      className="flex items-center justify-center mt-10 font-serif font-semibold text-white bg-gradient-to-t from-black to-neutral-900/30">
      <div className="flex-1 w-full pt-5 mx-auto">
        {/* Logo & Description */}
        <div className="px-4">
          <p className="flex items-center gap-3 mb-1 text-xl font-bold text-justify w-fit sm:text-3xl sm:text-left">
            <img src={"/logo.png"} alt="Logo" className="max-w-[80px] bg" />A
            Pizza
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Possimus, voluptate
          </p>
          <br />
        </div>

        <div className="flex flex-col justify-between w-full border-t md:flex-row">
          {/* Branches */}
          <div className="flex flex-col items-center px-4 py-8">
            <p className="p-2 text-xl font-bold text-justify rounded-lg w-fit sm:text-xl text-nowrap sm:text-left">
              Branches
            </p>
            <ul className="flex flex-col items-center justify-center gap-1 cursor-pointer w-fit">
              <Link
                to="https://maps.app.goo.gl/3HL5zc51PHwRkSxm7?g_st=ic"
                target="_blank"
                className="flex items-center gap-2 p-2 transition-colors duration-300 rounded-lg text-nowrap hover:text-orange-400">
                <MapPin />
                <li className="rounded-lg ">Al Khuwair - الخوير</li>
              </Link>
              <Link
                to="https://maps.app.goo.gl/uKJeFEAmiMPxk4yq9?g_st=ic"
                target="_blank"
                className="flex items-center gap-2 p-2 transition-colors duration-300 rounded-lg text-nowrap hover:text-orange-400">
                <MapPin />
                <li className="rounded-lg ">AL Amrat - العامرات</li>
              </Link>
              <Link
                to="https://maps.app.goo.gl/r2QxwWHhrB4N1zq87?g_st=ic"
                target="_blank"
                className="flex items-center gap-2 p-2 transition-colors duration-300 rounded-lg text-nowrap hover:text-orange-400">
                <MapPin />
                <li className="rounded-lg ">Al-Watiya - الوطية</li>
              </Link>
              <Link
                to="https://maps.app.goo.gl/F2cPp2gnTv41ydCR6?g_st=ic"
                target="_blank"
                className="flex items-center gap-2 p-2 transition-colors duration-300 rounded-lg text-nowrap hover:text-orange-400">
                <MapPin />
                <li className="rounded-lg ">Al Khawd - الخوض</li>
              </Link>
              <Link
                to="https://maps.app.goo.gl/YUdogHGcMKeWYgYQA?g_st=ic"
                target="_blank"
                className="flex items-center gap-2 p-2 transition-colors duration-300 rounded-lg text-nowrap hover:text-orange-400">
                <MapPin />
                <li className="rounded-lg ">Al Ma`abilah - المعبيلة</li>
              </Link>
            </ul>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center px-4 py-8">
            <p className="p-2 mb-3 text-xl font-bold text-justify rounded-lg w-fit sm:text-xl sm:text-left">
              Links
            </p>

            <ul className="flex flex-col items-center gap-6 cursor-pointer w-fit">
              <li className="transition-colors duration-300 rounded-lg hover:text-orange-400">
                <a href={"/#deals"}>Home</a>
              </li>
              <li className="transition-colors duration-300 rounded-lg hover:text-orange-400">
                About
              </li>
              <li className="transition-colors duration-300 rounded-lg hover:text-orange-400">
                <button onClick={() => setIsModalOpen(true)} type="submit">
                  <ContactModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                  Contact Us
                </button>
              </li>
              <li className="transition-colors duration-300 rounded-lg hover:text-orange-400">
                <Link to={"/login"}>Login</Link>
              </li>
            </ul>
          </div>

          {/* Socails */}
          <div className="flex flex-col items-center px-4 py-8">
            <p className="p-2 text-xl font-bold text-justify rounded-lg w-fit sm:text-xl sm:text-left">
              Socials
            </p>
            {/* First No. */}
            <div className="flex items-center gap-3 p-2 mt-3 transition duration-300 rounded-lg hover:text-orange-400">
              <svg
                fill="currentColor"
                className="hover:text-orange-400"
                height="20px"
                width="20px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 308 308">
                <g id="SVGRepo_bgCarrier"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  <g id="XMLID_468_">
                    <path
                      id="XMLID_469_"
                      d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"></path>{" "}
                    <path
                      id="XMLID_470_"
                      d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"></path>{" "}
                  </g>
                </g>
              </svg>

              <Link
                to={
                  "https://api.whatsapp.com/send?phone=%2B96878781278&context=ARCm2SgGV0wnZLk0e8GEZq_mvtlzZH7Gxm0Z4m5s1wgQkDNZP4p2Ggsjdp13ohcbjoiZkmWiKyGO2E7bCWQtmhzV5ZcQpPyomFJ2w6aWOuNsbkbTcDKTi2dHT-om5qbt4tKC9t0eBjsnZqfMs9JSaxzXeA&source=FB_Page&app=facebook&entry_point=page_cta&fbclid=IwZXh0bgNhZW0CMTAAAR0twr5X7PN5CiEANoVJv1UVw9Yzp3Qvh4TVaDhW5i3HcYJpMwAEXJYNHjo_aem_AaybGCUu-9WujHz6XdWDY8vdKnhmosEuR_6KyWWBcLsgNE2DkxbE634bkeGJ4G43HukaD2dOdbeCX4DKrtwzPpD1"
                }
                target="_blank"
                className="font-mono text-nowrap">
                +96878781278
              </Link>
            </div>

            {/* Second No. */}
            <div className="flex items-center gap-3 p-2 mt-3 transition duration-300 rounded-lg hover:text-orange-400">
              <Phone />
              <Link to={"tel:+96897310806"} className="font-mono text-nowrap ">
                +96897310806
              </Link>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-5 p-2 mt-6 rounded-lg">
              <Link
                to={"https://www.instagram.com/apizza_om/"}
                target="_blank"
                className="transition-colors duration-300 hover:text-orange-400">
                <Instagram className="text-3xl" />
              </Link>

              <Link
                to={"https://www.facebook.com/profile.php?id=100083142860383"}
                target="_blank"
                className="transition-colors duration-300 hover:text-orange-400">
                <Facebook className="text-3xl" />
              </Link>

              <Link
                to={"https://www.youtube.com/channel/UCFcRbBxE1-pdYOPUEhzJdtQ"}
                target="_blank"
                className="transition-colors duration-300 hover:text-orange-400">
                <Youtube className="text-3xl" />
              </Link>

              <Link
                to={"https://snapchat.com/t/diNqG2Xs"}
                target="_blank"
                className="transition-colors duration-300 hover:text-orange-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24">
                  <path
                    d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z"
                    fill="currentColor"
                  />
                </svg>
              </Link>

              <Link
                to={"https://www.tiktok.com/@apizza000?_t=8lelcUahRYt&_r=1"}
                target="_blank"
                className="transition-colors duration-300 hover:text-orange-400">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 48 48"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M38.0766847,15.8542954 C36.0693906,15.7935177 34.2504839,14.8341149 32.8791434,13.5466056 C32.1316475,12.8317108 31.540171,11.9694126 31.1415066,11.0151329 C30.7426093,10.0603874 30.5453728,9.03391952 30.5619062,8 L24.9731521,8 L24.9731521,28.8295196 C24.9731521,32.3434487 22.8773693,34.4182737 20.2765028,34.4182737 C19.6505623,34.4320127 19.0283477,34.3209362 18.4461858,34.0908659 C17.8640239,33.8612612 17.3337909,33.5175528 16.8862248,33.0797671 C16.4386588,32.6422142 16.0833071,32.1196657 15.8404292,31.5426268 C15.5977841,30.9658208 15.4727358,30.3459348 15.4727358,29.7202272 C15.4727358,29.0940539 15.5977841,28.4746337 15.8404292,27.8978277 C16.0833071,27.3207888 16.4386588,26.7980074 16.8862248,26.3604545 C17.3337909,25.9229017 17.8640239,25.5791933 18.4461858,25.3491229 C19.0283477,25.1192854 19.6505623,25.0084418 20.2765028,25.0219479 C20.7939283,25.0263724 21.3069293,25.1167239 21.794781,25.2902081 L21.794781,19.5985278 C21.2957518,19.4900128 20.7869423,19.436221 20.2765028,19.4380839 C18.2431278,19.4392483 16.2560928,20.0426009 14.5659604,21.1729264 C12.875828,22.303019 11.5587449,23.9090873 10.7814424,25.7878401 C10.003907,27.666593 9.80084889,29.7339663 10.1981162,31.7275214 C10.5953834,33.7217752 11.5748126,35.5530237 13.0129853,36.9904978 C14.4509252,38.4277391 16.2828722,39.4064696 18.277126,39.8028054 C20.2711469,40.1991413 22.3382874,39.9951517 24.2163416,39.2169177 C26.0948616,38.4384508 27.7002312,37.1209021 28.8296253,35.4300711 C29.9592522,33.7397058 30.5619062,31.7522051 30.5619062,29.7188301 L30.5619062,18.8324027 C32.7275484,20.3418321 35.3149087,21.0404263 38.0766847,21.0867664 L38.0766847,15.8542954 Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
