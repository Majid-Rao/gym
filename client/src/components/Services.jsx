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

const Services = () => {
  return (
    <div className="overflow-x-hidden">
      <div style={bgStyle} className="min-h-screen bg-cover bg-center flex flex-col justify-between">
        <Navbar />
        
        {/* Hero Section */}
        <div className="text-center text-gray-800 px-4 py-8 md:px-16 md:py-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-lg mb-6">Explore our cutting-edge services designed to help you achieve your fitness goals with ease and innovation.</p>
        </div>

        {/* Services Section */}
        <section className="bg-gray-100 py-12">
          <div className="text-center px-4">
            <h2 className="text-3xl font-semibold mb-8">What We Offer</h2>
            <div className="flex flex-wrap justify-center gap-8">
              
              {/* Service 1: AI Recommendations */}
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-6 text-center">
                <img src={img1} alt="AI Recommendation" className="w-20 h-20 mx-auto mb-4"/>
                <h3 className="font-semibold text-xl mb-4">AI Recommendations</h3>
                <p>Get personalized workout and diet plans powered by AI, tailored to your fitness level and goals.</p>
              </div>
              
              {/* Service 2: AI Chatbot */}
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-6 text-center">
                <img src={img2} alt="AI Chatbot" className="w-20 h-20 mx-auto mb-4"/>
                <h3 className="font-semibold text-xl mb-4">AI Chatbot</h3>
                <p>Get real-time fitness guidance and answers to your questions with our AI-powered chatbot, available 24/7.</p>
              </div>
              
              {/* Service 3: Customizable Plans */}
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-6 text-center">
                <img src={img3} alt="Customizable Plans" className="w-20 h-20 mx-auto mb-4"/>
                <h3 className="font-semibold text-xl mb-4">Customizable Plans</h3>
                <p>Create a plan that suits your unique fitness goals. Modify your workouts and routines based on your progress.</p>
              </div>

              {/* Service 4: Expert Guidance */}
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-6 text-center">
                <img src={img4} alt="Expert Guidance" className="w-20 h-20 mx-auto mb-4"/>
                <h3 className="font-semibold text-xl mb-4">Expert Guidance</h3>
                <p>Get expert advice from certified trainers and nutritionists to optimize your fitness journey.</p>
              </div>

              {/* Service 5: Fitness Tracking */}
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-6 text-center">
                <img src={img5} alt="Fitness Tracking" className="w-20 h-20 mx-auto mb-4"/>
                <h3 className="font-semibold text-xl mb-4">Fitness Tracking</h3>
                <p>Track your progress in real-time with advanced fitness tracking tools to stay on top of your goals.</p>
              </div>

              {/* Service 6: Online Classes */}
              <div className="w-60 bg-white text-black rounded-lg shadow-lg p-6 text-center">
                <img src={img6} alt="Online Classes" className="w-20 h-20 mx-auto mb-4"/>
                <h3 className="font-semibold text-xl mb-4">Online Classes</h3>
                <p>Join live online fitness classes and workouts led by professional trainers from the comfort of your home.</p>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Services;
