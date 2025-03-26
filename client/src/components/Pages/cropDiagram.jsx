import React from 'react';
import { ArrowDown, Cpu, Sprout } from 'lucide-react';

const CropRecommendationDiagram = () => {
  return (
    <div className="p-4 bg-green-50 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-green-800 mb-4 text-center">How Our Crop Recommendation Works</h2>
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-white p-4 rounded-lg shadow w-64 text-center">
          <h3 className="font-semibold text-green-700 mb-2">Your Input</h3>
          <ul className="text-sm text-gray-600">
            <li>Nitrogen (N)</li>
            <li>Phosphorus (P)</li>
            <li>Potassium (K)</li>
            <li>Temperature</li>
            <li>Moisure</li>
          </ul>
        </div>
        <ArrowDown className="text-green-500" size={32} />
        <div className="bg-white p-4 rounded-lg shadow w-64 text-center">
          <h3 className="font-semibold text-green-700 mb-2">Smart Analysis</h3>
          <Cpu className="mx-auto text-green-500" size={32} />
          <p className="text-sm text-gray-600 mt-2">Our ML model processes your data</p>
        </div>
        <ArrowDown className="text-green-500" size={32} />
        <div className="bg-white p-4 rounded-lg shadow w-64 text-center">
          <h3 className="font-semibold text-green-700 mb-2">Results</h3>
          <Sprout className="mx-auto text-green-500" size={32} />
          <p className="text-sm text-gray-600 mt-2">Top 3 recommended crops for your soil</p>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendationDiagram;