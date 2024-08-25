"use client";
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun, faCloudRain, faWind, faDroplet, faSun } from '@fortawesome/free-solid-svg-icons';

const weatherStyles = {
    Clear: { image: '/images/clear.png', gradient: 'bg-gradient-to-r from-yellow-500 to-orange-500' },
    Clouds: { image: '/images/cloudy.png', gradient: 'bg-gradient-to-r from-gray-300 to-gray-500' },
    Rain: { image: '/images/rain.png', gradient: 'bg-gradient-to-r from-blue-500 to-gray-500' },
    Drizzle: { image: '/images/drizzle.png', gradient: 'bg-gradient-to-r from-lightblue-400 to-blue-500' },
    Thunderstorm: { image: '/images/thunderstorm.png', gradient: 'bg-gradient-to-r from-gray-700 to-black' },
    Snow: { image: '/images/snow.png', gradient: 'bg-gradient-to-r from-white to-gray-300' },
    Atmosphere: { image: '/images/atmosphere.png', gradient: 'bg-gradient-to-r from-gray-500 to-gray-700' },
    Extreme: { image: '/images/extreme.png', gradient: 'bg-gradient-to-r from-red-500 to-yellow-700' },
  };

export default function Dashboard() {
  const [suggestions, setSuggestions] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  

  const parseMarkdown = (text) => {
    const lines = text.split('\n').map((line, index) => {
      const parsedLine = line
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
        .replace(/\*(.*?)\*/g, '<em>$1</em>').replace('-',''); 
      return <p key={index} dangerouslySetInnerHTML={{ __html: parsedLine.trim() }} className="text-base text-gray-800 mb-2" />;
    });
    return lines;
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          const response = await fetch(`${process.env.SERVER_URI}/dashboard/today`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ lat, long })
          });

          if (response.ok) {
            const { result: s, weatherData: w } = await response.json();
            setSuggestions(parseMarkdown(s));
            setWeatherData(w);
          } else {
            const e = await response.json();
            setError(e.error);
          }
        }, (geoError) => {
          console.error("Geolocation error:", geoError);
          setError("Failed to get your location.");
        });
      } catch (e) {
        console.error(e);
        setError("An error occurred while fetching suggestions.");
      }
    }
    fetchSuggestions();
  }, []);

  if (error) {
    return <div className="text-red-500 font-semibold text-center mt-6">{error}</div>;
  }

  return (
    <div className="p-6">
      {/* Suggestions Section */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold mb-4">Suggestions:</h3>
        <ul className="list-disc space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-lg">{suggestion}</li>
          ))}
        </ul>
      </div>

      {/* Weather Data Section */}
      <div className={`relative p-6 max-w-4xl mx-auto rounded-lg shadow-lg ${weatherStyles?.gradient}`} style={{ backgroundImage: `url(${weatherStyles?.image})`, backgroundSize: 'cover' }}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-white">
          {weatherData && (
            <>
              <h1 className="text-3xl font-bold mb-6 text-center">{weatherData.name} - Weather Dashboard</h1>

              <div className="space-y-4">
                {/* Location and Description */}
                <div>
                  <h2 className="text-xl font-semibold">Location & Description</h2>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faSun} className="text-yellow-300 mr-2" />
                    {weatherData.name}, {weatherData.sys.country}
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faCloudRain} className="text-blue-300 mr-2" />
                    {weatherData.weather[0].main} - {weatherData.weather[0].description}
                  </p>
                </div>

                {/* Temperature */}
                <div>
                  <h2 className="text-xl font-semibold">Temperature</h2>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faSun} className="text-yellow-300 mr-2" />
                    Current: {(weatherData.main.temp - 273.15).toFixed(2)} °C
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faSun} className="text-yellow-300 mr-2" />
                    Feels Like: {(weatherData.main.feels_like - 273.15).toFixed(2)} °C
                  </p>
                </div>

                {/* Humidity and Pressure */}
                <div>
                  <h2 className="text-xl font-semibold">Humidity & Pressure</h2>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faDroplet} className="text-blue-300 mr-2" />
                    Humidity: {weatherData.main.humidity}%
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faDroplet} className="text-blue-300 mr-2" />
                    Pressure: {weatherData.main.pressure} hPa
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faDroplet} className="text-blue-300 mr-2" />
                    Sea Level: {weatherData.main.sea_level} hPa
                  </p>
                </div>

                {/* Wind */}
                <div>
                  <h2 className="text-xl font-semibold">Wind</h2>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faWind} className="text-gray-300 mr-2" />
                    Speed: {weatherData.wind.speed} m/s
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faWind} className="text-gray-300 mr-2" />
                    Direction: {weatherData.wind.deg}°
                  </p>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faWind} className="text-gray-300 mr-2" />
                    Gusts: {weatherData.wind.gust} m/s
                  </p>
                </div>

                {/* Rain */}
                <div>
                  <h2 className="text-xl font-semibold">Rain</h2>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faCloudRain} className="text-blue-300 mr-2" />
                    Rainfall (1 hour): {weatherData.rain?.["1h"] || 0} mm
                  </p>
                </div>

                {/* Cloud Coverage */}
                <div>
                  <h2 className="text-xl font-semibold">Cloud Coverage</h2>
                  <p className="flex items-center">
                    <FontAwesomeIcon icon={faCloudSun} className="text-gray-300 mr-2" />
                    Cloudiness: {weatherData.clouds.all}%
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
