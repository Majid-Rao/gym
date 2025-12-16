import React from 'react';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import BgImage from "../assets/bg.png";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};

const Contact = () => {
  return (
    <div className="overflow-x-hidden">
      <div style={bgStyle} className="min-h-screen bg-cover bg-center flex flex-col justify-between">
        <Navbar />
        
        {/* Hero Section */}
        <div className="text-center text-gray-800 px-4 py-8 md:px-16 md:py-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg mb-6">We’d love to hear from you! Reach out to us via email, phone, or visit our location.</p>
        </div>

        {/* Contact Information Section */}
        <section className="bg-gray-100 py-12">
          <div className="text-center px-4">
            <h2 className="text-3xl font-semibold mb-8">Get in Touch</h2>
            <div className="flex flex-wrap justify-center gap-8">

              {/* Email Card */}
              <div className="w-80 bg-white text-black rounded-lg shadow-lg p-6 flex items-center">
                <FaEnvelope className="text-orange-500 text-4xl mr-4"/>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Email</h3>
                  <p className="text-lg">smart@gymx.com</p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="w-80 bg-white text-black rounded-lg shadow-lg p-6 flex items-center">
                <FaPhoneAlt className="text-orange-500 text-4xl mr-4"/>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Phone</h3>
                  <p className="text-lg">+1 234 567 890</p>
                </div>
              </div>

              {/* Location Card */}
              <div className="w-80 bg-white text-black rounded-lg shadow-lg p-6 flex items-center">
                <FaMapMarkerAlt className="text-orange-500 text-4xl mr-4"/>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Location</h3>
                  <p className="text-lg">123 Gym Street, Fitness City, ABC</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
