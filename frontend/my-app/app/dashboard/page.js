"use client";
import React, { useEffect, useState } from 'react';
import Weather from '../components/weather';
import Forecast from '../components/forecast';

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
  const [forecast, setForecast] = useState(null)
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
            const { result: s, weatherData: w , forecast: f} = await response.json();
            setSuggestions(parseMarkdown(s));
            setWeatherData(w);
            setForecast(f)
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
    <div className='grid grid-cols-3 gap-6 p-6'>
      {/* Suggestions section */}
      <div className='col-span-1'>
        <h3 className="text-2xl font-bold mb-4">Today's Suggestions:</h3>
        <ul className="list-disc space-y-2">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="text-lg">{suggestion}</li>
          ))}
        </ul>
      </div>
      {/* Weather and Forecast section */}
      <div className='col-span-2'>
        {weatherData && <Weather weatherData={weatherData} />}
        {forecast && <Forecast forecast={forecast} />}
      </div>
    </div>
  );
}
