import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faSmog, faSnowflake, faCloudShowersHeavy, faCloudRain, faBolt, faTint, faWind, faThermometerHalf } from '@fortawesome/free-solid-svg-icons'

const Styles = {
    'Clouds': {
      icon: <FontAwesomeIcon icon={faCloud} style={{ color: 'white', fontSize: '20'}} />,
      gradient: 'bg-gradient-to-br from-blue-100 via-blue-200 to-blue-500', 
    },
    'Clear': {
      icon: <FontAwesomeIcon icon={faSun} style={{ color: 'yellow',fontSize: '20' }} />,
      gradient: 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600', 
    },
    'Atmosphere': {
      icon: <FontAwesomeIcon icon={faSmog} style={{ color: 'gray',fontSize: '20' }} />,
      gradient: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500', 
    },
    'Snow': {
      icon: <FontAwesomeIcon icon={faSnowflake} style={{ color: 'lightblue',fontSize: '20' }} />,
      gradient: 'bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400', 
    },
    'Rain': {
      icon: <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ color: 'blue' ,fontSize: '20'}} />,
      gradient: 'bg-gradient-to-br from-blue-300 via-blue-400 to-blue-600', 
    },
    'Drizzle': {
      icon: <FontAwesomeIcon icon={faCloudRain} style={{ color: 'lightgray',fontSize: '20' }} />,
      gradient: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500', 
    },
    'Thunderstorm': {
      icon: <FontAwesomeIcon icon={faBolt} style={{ color: 'yellow',fontSize: '20' }} />,
      gradient: 'bg-gradient-to-br from-gray-800 via-gray-900 to-black', 
    }
    }

export default function Forecast({forecast}) {
    console.log(forecast)
    console.log(1)
  return (
    <div className="grid grid-cols-6 gap-2 p-2">
            {forecast.map((day, index) => {
                const weatherStyle = Styles[day.dominantWeather] || Styles['Clear'];
                return (
                    <div
                        key={index}
                        className={`relative p-4 rounded-lg border border-gray-300 shadow-md ${weatherStyle.gradient}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="text-sm font-semibold">{day.date}</div>
                            <div>{weatherStyle.icon}</div>
                        </div>
                        <div className="flex flex-col space-y-1">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faThermometerHalf} className="mr-2 text-gray-800" />
                                <span className="text-sm">Avg Temp: {(day.avgTemp - 273.15).toFixed(2)}°C</span>
                            </div>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faTint} className="mr-2 text-gray-800" />
                                <span className="text-sm">Humidity: {day.avgHumidity}%</span>
                            </div>
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faCloudShowersHeavy} className="mr-2 text-gray-800" />
                                <span className="text-sm">Precipitation: {day.totalPrecipitation} mm</span>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
  )
}
