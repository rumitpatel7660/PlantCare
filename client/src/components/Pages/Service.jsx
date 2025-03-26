import React from 'react';
import Navbar from "../Navbar/Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { Leaf, Crop, Cloud } from 'lucide-react';

// Import images
import service from "../../assests/Servicemain.jpg";
import leaf from "../../assests/leafdetect.jpg";
import crop from "../../assests/cropdetect.jpg";
import weather from "../../assests/weather.jpg";

const Service = () => {
  const services = [
    {
      title: "Disease Detection",
      description: "Accurately identify leaf diseases with precision for given images and provides supplements.",
      icon: <Leaf className="w-12 h-12 text-green-500" />,
      image: leaf,
      link: "/UploadImage"
    },
    {
      title: "Crop Recommendation",
      description: "A personalized crop suggestion system that recommends the most suitable crops for given parameters.",
      icon: <Crop className="w-12 h-12 text-green-500" />,
      image: crop,
      link: "/CropRem"
    },
    {
      title: "Weather Forecast",
      description: "A real-time weather forecasting system that provides you with accurate and localized weather updates.",
      icon: <Cloud className="w-12 h-12 text-green-500" />,
      image: weather,
      link: "/WeatherApp"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <section className="relative h-96 overflow-hidden">
          <img src={service} alt="Service hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h1 className="text-5xl font-bold text-white tracking-wide">Our Services</h1>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-extrabold text-center mb-12">Empowering Agriculture with Technology</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                <img src={service.image} alt={service.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    {service.icon}
                    <h3 className="text-xl font-semibold ml-4">{service.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <Link 
                    to={service.link}
                    className="inline-block bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-300"
                  >
                    Try it now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Service;