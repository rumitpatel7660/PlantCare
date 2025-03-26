import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchEngine from "./SearchEngine";
import Forecast from "./Forecast";
import "./Weatherstyles.css";

import {  ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({
    loading: true,
    data: {},
    error: false
  });
  const navigate = useNavigate();
  const toDate = () => {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
      "Friday", "Saturday"
    ];

    const currentDate = new Date();
    return `${days[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  };

  const search = async (event) => {
    event.preventDefault();
    if (event.type === "click" || (event.type === "keypress" && event.key === "Enter")) {
      setWeather({ ...weather, loading: true });
      const apiKey = "ddf76d77e28e4b6f979151335241610"; 
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`;

      try {
        const res = await axios.get(url);
        setWeather({ data: res.data, loading: false, error: false });
      } catch (error) {
        setWeather({ ...weather, data: {}, error: true });
        console.log("error", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = "ddf76d77e28e4b6f979151335241610"; // Replace with your WeatherAPI key
      const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Mehsana`;

      try {
        const response = await axios.get(url);
        setWeather({ data: response.data, loading: false, error: false });
      } catch (error) {
        setWeather({ data: {}, loading: false, error: true });
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <button
          className="fixed top-4 left-4 bg-white text-green-600 py-2 px-4 rounded-full shadow-lg hover:bg-green-50 transition duration-300 font-semibold flex items-center"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>
      <SearchEngine query={query} setQuery={setQuery} search={search} />

      {weather.loading && (
        <>
          <br />
          <br />
          <h4>Searching..</h4>
        </>
      )}

      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <span style={{ fontFamily: "font" }}>
              Sorry city not found, please try again.
            </span>
          </span>
        </>
      )}

      {weather.data && weather.data.current && (
        <Forecast weather={weather} toDate={toDate} />
      )}
    </div>
  );
}

export default WeatherApp;
