import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubscriptionComponent from '../SubscriptionComponent';
import backImg from './../../assests/subscriptionBack.jpg';
// import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true); // To handle the loading state
  const navigate = useNavigate(); // Initialize useNavigate

  const plans = [
    {
      id: 1,
      name: 'Basic Plan',
      amount: 299,
      duration: '3 months',
      features: [
        'Disease Detection',
        'Crop Recommendation',
        'Available For 60 Day Only',
      ],
    },
    {
      id: 2,
      name: 'Standard Plan',
      amount: 499,
      duration: '6 months',
      features: [
        'Disease Detection',
        'Crop Recommendation',
        'Available For 180 Day Only',
      ],
    },
    {
      id: 3,
      name: 'Premium Plan',
      amount: 999,
      duration: '12 months',
      features: [
        'Disease Detection',
        'Crop Recommendation',
        'Available For 365 Day Only',
      ],
    },
  ];

  const fetchSubscription = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { data } = await axios.get('http://localhost:8080/api/users/me', {
          headers: {
            'x-auth-token': token
          }
        });
        setSubscription(data.subscription);

        // Redirect if the user already has an active subscription
        if (data.subscription) {
          navigate('/Supply'); // Redirect to Supply.jsx
        }
      } catch (error) {
        console.error('Error fetching subscription:', error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
  };

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner or better loading UI
  }

  return (
    <div
      className="relative p-6 text-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {!subscription ? (
        <>
          <h1 className="text-4xl font-extrabold mb-8 text-white tracking-wide">Subscription Plans</h1>
          <div className="flex justify-center gap-8 flex-wrap">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2 p-6 w-80"
              >
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
                <p className="text-3xl font-extrabold text-green-600 mb-6">₹{plan.amount} / {plan.duration}</p>
                <ul className="list-none mb-6 text-left space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="text-gray-600 flex items-center">
                      <span className="text-green-500 mr-2">✓</span> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className="bg-green-500 text-white rounded-full py-2 px-6 hover:bg-green-600 transition duration-300"
                  onClick={() => handleChoosePlan(plan)}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
          <div className='mt-10'>
            {selectedPlan && <SubscriptionComponent plan={selectedPlan} />}
          </div>
        </>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-16">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Active Subscription</h1>
          <p className="text-xl text-gray-700">You are subscribed to the <span className="font-semibold">{subscription.plan}</span>.</p>
          <p className="text-lg text-gray-600 mt-2">Your subscription is valid until <span className="font-semibold">{new Date(subscription.endDate).toLocaleDateString()}</span>.</p>
        </div>
      )}
    </div>
  );
}  
export default SubscriptionPage;
