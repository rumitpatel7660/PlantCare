import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CropRecommendationDiagram from './cropDiagram';
import { Leaf, Droplet, Thermometer, ArrowLeft } from 'lucide-react';

const CropRem = () => {
  const [formValues, setFormValues] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    moisture: '',
    temperature: ''
  });
  const navigate = useNavigate();
  const [result, setResult] = useState([]);
  const [hasSubscription, setHasSubscription] = useState(false);

  // Fetch JSON data from the API on component mount
  useEffect(() => {
    const fetchSoilData = async () => {
      try {
        const response = await fetch('http://192.168.54.8/data', { mode: 'no-cors' });
        console.log('Response Status:', response.status);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('Response Text:', text);

        const data = text ? JSON.parse(text) : {};

        console.log('Parsed Data:', data);

        if (data.nitro !== undefined && data.phosp !== undefined && data.potass !== undefined && data.soilMoisture !== undefined && data.temperature !== undefined) {
          setFormValues({
            nitrogen: data.nitro,
            phosphorus: data.phosp,
            potassium: data.potass,
            moisture: data.soilMoisture,
            temperature: data.temperature
          });
        } else {
          throw new Error('Incomplete data received from the server.');
        }
      } catch (error) {
        console.error('Error fetching soil data:', error);
        // Optionally, set default values or notify the user
      }
    };

    fetchSoilData();
  }, []);

  // Check subscription status on component mount
  useEffect(() => {
    const checkSubscription = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/api/users/me', {
            headers: {
              'x-auth-token': token
            }
          });
          const data = await response.json();
          if (data.subscription) {
            setHasSubscription(true);
          }
        } catch (error) {
          console.error('Error checking subscription:', error);
        }
      }
    };

    checkSubscription();
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!hasSubscription) {
      navigate("/Subscription");
      return;
    }
    try {
      // Send form data to the backend
      const response = await fetch('http://localhost:5000/predict_crop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      const data = await response.json();
      setResult(data.top_3_crops); // Set the predicted crops result
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Handle navigation to the service page
  const goToServicePage = () => {
    navigate("/service");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <button
        className="fixed top-4 left-4 bg-white text-green-600 py-2 px-4 rounded-full shadow-lg hover:bg-green-50 transition duration-300 font-semibold flex items-center"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} className="mr-2" />
        Back
      </button>

      {/* Button to redirect to the service page */}
      <div className="absolute top-4 right-4">
        <button
          className="bg-green-600 text-white py-3 px-8 rounded-full hover:bg-green-700 transition duration-300 font-semibold text-lg flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          onClick={goToServicePage}
        >
          Go to Service
        </button>
      </div>

      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Form Section */}
        <div className="w-1/2 p-8">
          <h1 className="text-2xl font-bold mb-6 text-[#07074D] text-center">Crop Recommendation Form</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left pl-4 flex items-center">
                <Leaf className="h-6 w-6 text-green-500 " />Nitrogen
              </label>
              <input
                type="number"
                name="nitrogen"
                value={formValues.nitrogen}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left pl-4 flex items-center">
                <Leaf className="h-6 w-6 text-green-500" />Phosphorus
              </label>
              <input
                type="number"
                name="phosphorus"
                value={formValues.phosphorus}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left pl-4 flex items-center">
                <Leaf className="h-6 w-6 text-green-500" />Potassium
              </label>
              <input
                type="number"
                name="potassium"
                value={formValues.potassium}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left pl-4 flex items-center">
                <Droplet className="h-6 w-6 text-blue-500" />Temperature
              </label>
              <input
                type="number"
                name="temperature"
                value={formValues.temperature}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-base font-medium text-[#07074D] text-left pl-4 flex items-center">
                <Thermometer className="h-6 w-6 text-red-500" />Moisture
              </label>
              <input
                type="number"
                name="moisture"
                value={formValues.moisture}
                onChange={handleInputChange}
                required
                className="w-full rounded-md border bg-white py-3 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full rounded-md bg-green-600 hover:bg-green-500 py-3 text-base font-semibold text-white transition duration-200 ease-in-out"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Result Section */}
        <div className="w-1/2 bg-gradient-to-r from-green-100 to-green-200 p-8">
          {result.length > 0 ? (
            <div className="mt-5 p-5 bg-white rounded-md shadow-md">
              <h3 className="text-lg font-bold text-green-700">Most Recommended Crop:</h3>
              <h2 className="text-2xl font-bold text-green-800">{result[0]}</h2>

              <h3 className="text-lg font-bold text-green-700 mt-4">Other Recommended Crops:</h3>
              <p className="text-2xl font-bold text-green-800">{result.slice(1).join(', ')}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <CropRecommendationDiagram />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CropRem;
