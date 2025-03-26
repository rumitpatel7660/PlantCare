import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Leaf, Pill, Info } from 'lucide-react';
import submit from "./../../assests/submit.webp";

function Supply() {
  const location = useLocation();
  const { disease, description, steps, supplement_name, supplement_image } = location.state || {};
  const navigate = useNavigate();

  const goToServicePage = () => {
    navigate("/service");
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      <img
        src={submit}
        alt="Plant Disease Detection"
        className="absolute inset-0 w-full h-full object-cover z-0 filter blur-sm"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

      <div className="relative z-20 container mx-auto px-4 py-8">
        <button
          className="fixed top-4 left-4 bg-white text-green-600 py-2 px-4 rounded-full shadow-lg hover:bg-green-50 transition duration-300 font-semibold flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <button
          className="fixed top-4 right-4 bg-green-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 font-semibold"
          onClick={goToServicePage}
        >
          Go to Service
        </button>

        {disease && (
          <h1 className="text-4xl font-bold text-white text-center mb-8 mt-16">
            Detected Disease: {disease}
          </h1>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-green-600 text-white p-4 flex items-center">
              <Info size={24} className="mr-2" />
              <h2 className="text-xl font-semibold">Disease Description</h2>
            </div>
            <div className="p-6">
              {description && (
                <ul className="list-disc pl-5 space-y-2">
                  {description.split('.').map((sentence, index) => (
                    sentence.trim() && (
                      <li key={index} className="text-gray-700 text-left">{sentence}.</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-blue-600 text-white p-4 flex items-center">
              <Leaf size={24} className="mr-2" />
              <h2 className="text-xl font-semibold">Possible Steps</h2>
            </div>
            <div className="p-6">
              {steps && (
                <ul className="list-disc pl-5 space-y-2">
                  {steps.split('.').map((sentence, index) => (
                    sentence.trim() && (
                      <li key={index} className="text-gray-700 text-left">{sentence}.</li>
                    )
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="bg-purple-600 text-white p-4 flex items-center">
            <Pill size={24} className="mr-2" />
            <h2 className="text-xl font-semibold">Supplement Information</h2>
          </div>
          <div className="p-6 flex flex-col items-center">
            {supplement_image && (
              <div className="mb-4 overflow-hidden rounded-lg shadow-lg">
                <img
                  src={supplement_image}
                  alt="Supplement"
                  className="object-contain h-[400px] w-full"
                />
              </div>
            )}
            {supplement_name && (
              <h3 className="text-2xl font-semibold text-gray-800 mt-4">{supplement_name}</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Supply;