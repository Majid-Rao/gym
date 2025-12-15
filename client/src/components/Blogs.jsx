import React from 'react';
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import BgImage from "../assets/bg.png";
import img1 from "../assets/tabs/1.png";
import img2 from "../assets/tabs/2.png";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
};

const Blogs = () => {
  return (
    <div className="overflow-x-hidden">
      <div style={bgStyle} className="min-h-screen bg-cover bg-center flex flex-col justify-between">
        <Navbar />
        
        {/* Hero Section */}
        <div className="text-center text-gray-800 px-4 py-8 md:px-16 md:py-12 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">Our Blogs</h1>
          <p className="text-lg mb-6">Stay updated with our latest blogs on fitness, wellness, and health tips.</p>
        </div>

        {/* Blogs Section */}
        <section className="bg-gray-100 py-12">
          <div className="text-center px-4">
            <h2 className="text-3xl font-semibold mb-8">Latest Posts</h2>
            <div className="flex flex-wrap justify-center gap-8">

              {/* Blog 1 */}
              <div className="w-80 bg-white text-black rounded-lg shadow-lg p-6">
                <img src={img1} alt="Blog 1" className="w-full h-48 object-cover rounded-lg mb-4"/>
                <h3 className="font-semibold text-xl mb-4">The Benefits of AI in Fitness</h3>
                <p className="text-lg mb-4">Artificial Intelligence (AI) is revolutionizing the fitness industry. From personalized workout recommendations to tracking progress, AI is making fitness more accessible and efficient for everyone...</p>
                <a href="#" className="text-orange-500 font-semibold">Read More</a>
              </div>

              {/* Blog 2 */}
              <div className="w-80 bg-white text-black rounded-lg shadow-lg p-6">
                <img src={img2} alt="Blog 2" className="w-full h-48 object-cover rounded-lg mb-4"/>
                <h3 className="font-semibold text-xl mb-4">How to Build a Custom Fitness Plan</h3>
                <p className="text-lg mb-4">A customizable fitness plan is key to achieving your goals. Whether you're looking to lose weight, build muscle, or improve endurance, a tailored approach is essential for success...</p>
                <a href="#" className="text-orange-500 font-semibold">Read More</a>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Blogs;
