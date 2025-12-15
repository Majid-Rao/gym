import React from 'react';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import BgImage from "../assets/bg.png";
import img1 from "../assets/tabs/1.png";
import img2 from "../assets/tabs/2.png";
import img3 from "../assets/tabs/3.png";
import img4 from "../assets/tabs/4.png";
import img5 from "../assets/2.png";
import img6 from "../assets/3.png";




const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};

const About = () => {
  return (
    <div className="overflow-x-hidden">
      <div style={bgStyle} className="min-h-screen bg-cover bg-center flex flex-col justify-between">
        <Navbar />
        
        {/* Hero Section */}
        <div className="text-center text-gray-800 px-4 py-8 md:px-16 md:py-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">About Our Gym</h1>
          <p className="text-lg mb-6">We provide world-class fitness solutions tailored to your needs. Whether you're just starting your fitness journey or aiming for new personal records, we have everything you need!</p>
        </div>

        {/* Gym Facilities Section */}
        <section className="bg-secondary text-white py-12">
          <div className="text-center px-4">
            <h2 className="text-3xl font-semibold mb-6">Our Facilities</h2>
            <p className="text-lg mb-6">We offer a wide range of fitness equipment and facilities to help you achieve your goals. From strength training to cardio, we’ve got you covered.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-4">
                <img src={img1} alt="Cardio Area" className="w-full h-40 object-cover rounded-lg mb-4"/>
                <h3 className="font-semibold">Cardio Area</h3>
              </div>
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-4">
                <img src={img2} alt="Strength Area" className="w-full h-40 object-cover rounded-lg mb-4"/>
                <h3 className="font-semibold">Strength Training</h3>
              </div>
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-4">
                <img src={img3} alt="Yoga Zone" className="w-full h-40 object-cover rounded-lg mb-4"/>
                <h3 className="font-semibold">Yoga Zone</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Trainers Section */}
        <section className="bg-white py-12">
          <div className="text-center px-4">
            <h2 className="text-3xl font-semibold text-black mb-6">Our Trainers</h2>
            <p className="text-lg text-black mb-6">Our expert trainers are here to guide you every step of the way, no matter your fitness level. Meet some of our top trainers below.</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="w-60 bg-gray-100 text-black rounded-lg shadow-lg p-4">
                <img src={img5} alt="Trainer 1" className="w-full h-40 object-cover rounded-lg mb-4"/>
                <h3 className="font-semibold">John Doe</h3>
                <p>Strength Training Specialist</p>
              </div>
              <div className="w-60 bg-gray-100 text-black rounded-lg shadow-lg p-4">
                <img src={img6} alt="Trainer 2" className="w-full h-40 object-cover rounded-lg mb-4"/>
                <h3 className="font-semibold">Jane Smith</h3>
                <p>Yoga Instructor</p>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Plans Section */}
        <section className="bg-secondary text-white py-12">
          <div className="text-center px-4">
            <h2 className="text-3xl font-semibold mb-6">Membership Plans</h2>
            <p className="text-lg mb-6">Choose a membership plan that fits your goals and start your fitness journey today!</p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-4">
                <h3 className="font-semibold text-xl mb-4">Basic Plan</h3>
                <p className="text-lg mb-4">Access to gym facilities during working hours.</p>
                <span className="font-bold text-2xl">$29.99/month</span>
              </div>
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-4">
                <h3 className="font-semibold text-xl mb-4">Premium Plan</h3>
                <p className="text-lg mb-4">Unlimited access to all gym facilities, classes, and personal trainer sessions.</p>
                <span className="font-bold text-2xl">$59.99/month</span>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default About;
