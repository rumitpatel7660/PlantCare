import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftCircle, Check } from 'lucide-react';

import leafImage from "../../assests/leafdetect.jpg";
import weatherImage from "../../assests/weather.jpg";
import about1 from "../../assests/about1.png";



import {  ArrowLeft } from 'lucide-react';

const featureData = {
  'disease-detection': {
    title: 'Smart Disease Detection',
    description: 'Our AI-powered disease detection system revolutionizes plant health management.',
    image: leafImage,
    benefits: [
      'Early identification of plant diseases',
      'Personalized treatment recommendations',
      'Reduce crop losses and increase yields',
      'Continuous learning from new data'
    ],
    howItWorks: [
      'Upload a photo of your plant',
      'Model analyzes the image for signs of disease',
      'Receive instant results and recommendations',
      'Track plant health over time'
    ]
  },
  'crop-recommendations': {
    title: 'Intelligent Crop Recommendations',
    description: 'Make data-driven decisions for optimal crop selection and management.',
    image: about1,
    benefits: [
      'Tailored crop suggestions for your specific conditions',
      'Maximize land use efficiency',
      'Increase overall farm productivity',
      'Adapt to changing climate conditions'
    ],
    howItWorks: [
      'Input your soil data and location',
      'Model analyzes historical and current data',
      'Receive personalized crop recommendations',
      'Get ongoing guidance throughout the growing season'
    ]
  },
  'weather-forecasting': {
    title: 'Precision Weather Forecasting',
    description: 'Hyperlocal weather predictions to optimize your farming operations.',
    image: weatherImage,
    benefits: [
      'Accurate, location-specific weather forecasts',
      'Plan planting, irrigation, and harvesting with confidence',
      'Reduce weather-related crop losses',
      'Optimize resource usage based on weather patterns'
    ],
    howItWorks: [
      'Enter your precise location',
      'Our system aggregates data from multiple sources',
      'Advanced algorithms generate hyperlocal forecasts',
      'Receive real-time updates and alerts'
    ]
  }
};


const FeatureDetails = () => {
  const { featureId } = useParams();
  const feature = featureData[featureId];
  const navigate = useNavigate();


  if (!feature) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Feature Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">Sorry, we couldn't find the feature you're looking for.</p>
          <Link to="/" className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300">
            <ArrowLeftCircle className="mr-2" size={20} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <button
          className="fixed top-4 left-4 bg-white text-green-600 py-2 px-4 rounded-full shadow-lg hover:bg-green-50 transition duration-300 font-semibold flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      {/* <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeftCircle className="mr-2" size={20} />
            Back to Home
          </Link>
        </div>
      </header> */}

      <main className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">{feature.title}</h1>
          <p className="text-xl text-gray-600 mb-12">{feature.description}</p>

          <div className="mb-16 overflow-hidden rounded-2xl shadow-2xl">
            <img src={feature.image} alt={feature.title} className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300" />
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Benefits</h2>
              <ul className="space-y-4">
                {feature.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg text-left">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">How It Works</h2>
              <ol className="space-y-4">
                {feature.howItWorks.map((step, index) => (
                  <li key={index} className="flex items-center text-lg">
                    <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">{index + 1}</span>
                    <span className="text-left">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

{/*          
          <div className="mt-16 text-center">
            <Link to="/service" className="inline-flex items-center px-8 py-4 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition-colors duration-300">
              Try {feature.title} Now
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default FeatureDetails;