import React from "react";
import {
  ArrowRightCircle,
  Leaf,
  Cloud,
  Sprout,
  Users,
  TrendingUp,
  Check,
  Info,
} from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import homeImage from "../../assests/Home.jpeg";
import leafImage from "../../assests/leafdetect.jpg";
import cropImage from "../../assests/cropdetect.jpg";
import weatherImage from "../../assests/weather.jpg";

const Feature = ({ icon, title, description, image, link }) => (
  <div className="group hover:bg-green-50 transition-all duration-300 flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-xl">
    <div className="mb-4 overflow-hidden rounded-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
      />
    </div>
    <div className="p-4 text-center">
      {React.createElement(icon, {
        className: "w-12 h-12 text-green-500 mb-4 mx-auto",
      })}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link
        to={`/feature/${link}`}
        className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300"
      >
        Learn More
        <Info className="ml-2" size={16} />
      </Link>
    </div>
  </div>
);

const Testimonial = ({ quote, author, role }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <p className="text-gray-600 italic mb-4">"{quote}"</p>
    <p className="text-gray-800 font-semibold">{author}</p>
    <p className="text-gray-500">{role}</p>
  </div>
);

const PricingTier = ({ name, amount, duration, features }) => (
  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="p-6 bg-green-50">
      <h3 className="text-2xl font-bold text-gray-800 mb-2">{name}</h3>
      <p className="text-4xl font-bold text-green-600">
        ₹{amount}
        <span className="text-base font-normal text-gray-500">/{duration}</span>
      </p>
    </div>
    <ul className="p-6">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center mb-3">
          <Check className="w-5 h-5 text-green-500 mr-2" />
          <span className="text-gray-600">{feature}</span>
        </li>
      ))}
    </ul>
    <div className="p-6 bg-gray-50">
      <Link
        to="/Subsciption"
        className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300"
      >
        Get Started
      </Link>
    </div>
  </div>
);

const Home = () => {
  const pricingPlans = [
    {
      id: 1,
      name: "Basic Plan",
      amount: 299,
      duration: "3 months",
      features: [
        "Disease Detection",
        "Crop Recommendation",
        "Available For 60 Day Only",
      ],
    },
    {
      id: 2,
      name: "Standard Plan",
      amount: 499,
      duration: "6 months",
      features: [
        "Disease Detection",
        "Crop Recommendation",
        "Available For 180 Day Only",
      ],
    },
    {
      id: 3,
      name: "Premium Plan",
      amount: 999,
      duration: "12 months",
      features: [
        "Disease Detection",
        "Crop Recommendation",
        "Available For 365 Day Only",
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      

      <main className="container mx-auto mt-[100px] px-6 py-12">
        <section className="flex flex-col md:flex-row items-center mb-24">
          <div className="md:w-1/2 md:pr-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Cultivate Success with PlantCare
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Revolutionize your farming with AI-powered insights and precision
              agriculture tools.
            </p>
            <a
              href="#features"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300"
            >
              Explore Features
              <ArrowRightCircle className="ml-2" size={20} />
            </a>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src={homeImage}
              alt="PlantCare"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </section>

        <section id="features" className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Our Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={Leaf}
              title="Smart Disease Detection"
              description="AI-powered image analysis to identify plant diseases early and get personalized treatment recommendations."
              image={leafImage}
              link="disease-detection"
            />
            <Feature
              icon={Sprout}
              title="Intelligent Crop Recommendations"
              description="Data-driven suggestions for optimal crop selection based on your soil conditions and local climate."
              image={cropImage}
              link="crop-recommendations"
            />
            <Feature
              icon={Cloud}
              title="Precision Weather Forecasting"
              description="Hyperlocal weather predictions to make informed decisions about planting, irrigation, and harvesting."
              image={weatherImage}
              link="weather-forecasting"
            />
          </div>
        </section>

        <section id="about" className="mb-24">
          <div className="bg-green-50 rounded-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Why Choose PlantCare?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PlantCare combines cutting-edge technology with agricultural
              expertise to help farmers and gardeners maximize yields, reduce
              losses, and practice sustainable agriculture.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <Users className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Community Support
                </h3>
                <p className="text-gray-600">
                  Join a network of farmers and experts to share knowledge and
                  experiences.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <TrendingUp className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Increased Productivity
                </h3>
                <p className="text-gray-600">
                  Boost your farm's efficiency and yield with data-driven
                  insights.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <Sprout className="w-12 h-12 text-green-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Sustainable Practices
                </h3>
                <p className="text-gray-600">
                  Implement eco-friendly farming methods for long-term success.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Testimonial
              quote="PlantCare has revolutionized how I manage my farm. The disease detection feature alone has saved me thousands in potential crop losses."
              author="Suresh D."
              role="Commercial Farmer"
            />
            <Testimonial
              quote="As a hobby gardener, I love the crop recommendation system. It's helped me grow vegetables I never thought possible in my climate!"
              author="Sarah L."
              role="Home Gardener"
            />
          </div>
        </section>

        <section id="pricing" className="mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Choose Your Plan
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => (
              <PricingTier
                key={plan.id}
                name={plan.name}
                amount={plan.amount}
                duration={plan.duration}
                features={plan.features}
              />
            ))}
          </div>
        </section>

        <section className="text-center mb-24">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied farmers and gardeners who have elevated
            their agricultural practices with PlantCare.
          </p>
          <a
            href="/service"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors duration-300"
          >
            Get Started Now
            <ArrowRightCircle className="ml-2" size={20} />
          </a>
        </section>
      </main>
    </div>
  );
};

export default Home;
