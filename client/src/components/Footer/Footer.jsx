import React from "react";
import { FaDumbbell, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-950 rounded-t-3xl">
      <div className="container">
        <div className="grid md:grid-cols-4 md:gap-4 py-5 border-t-2 border-gray-300/10 text-white">
        
           {/* brand info section  */}
          <div className="py-8 px-4 space-y-4">
            <div className="text-2xl flex items-center gap-2 font-bold uppercase">
              <FaDumbbell />
              <p>Coders</p>
              <p className="text-secondary">Gym</p>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus natus earum deserunt dolore voluptatem similique iure minus corporis quam quis pariatur maxime nemo expedita hic, porro vel reiciendis ipsum vero.
            </p>
            <div className="flex items-center justify-start gap-5 !mt-6">
              <a href="#"> 
                <HiLocationMarker className="text-3xl" /> 
              </a>
              <a href="#"> 
                <FaInstagram className="text-3xl" /> 
              </a>
              <a href="#"> 
                <FaFacebook className="text-3xl" /> 
              </a>
              <a href="#"> 
                <FaLinkedin className="text-3xl" /> 
              </a>
            </div>
          </div>

          {/* footer link  */}
          <div className="grid grid-cols-2 md:grid-cols-3 md:col-span-3 md:ml-14">
            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                Important Links</h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </div>

             <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                Company Links</h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#">Our Services</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
              </ul>
            </div>

            <div className="py-8 px-4">
              <h1 className="sm:text-xl text-xl font-bold sm:text-left text-justify mb-5">
                Resources </h1>
              <ul className="flex flex-col gap-3">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* copyright section  */}
        <div className="mt-8">
          <div className="text-center py-6 border-t-2 border-gray-300/10">
            <span className="text-sm text-gray-300 opacity-70">@copyright 2025 The Coding Journey</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Footer;
