import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faSun, faSmog, faSnowflake, faCloudShowersHeavy, faCloudRain, faBolt } from '@fortawesome/free-solid-svg-icons'
library.add(faCloud, faSun, faSmog, faSnowflake, faCloudShowersHeavy, faCloudRain, faBolt);

const Styles = {
  'Clouds': {
    icon: <FontAwesomeIcon icon={faCloud} style={{ color: 'white', fontSize: '100px' }}/>,
    gradient: 'bg-gradient-to-b from-gray-200 via-blue-300 to-gray-400',
  },
  'Clear': {
    icon: <FontAwesomeIcon icon={faSun} style={{ color: 'yellow',  fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600',
  },
  'Atmosphere': {
    icon: <FontAwesomeIcon icon={faSmog} style={{ color: 'gray', fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-b from-cool-gray-300 via-cool-gray-400 to-cool-gray-500',
  },
  'Snow': {
    icon: <FontAwesomeIcon icon={faSnowflake} style={{ color: 'lightblue', fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-b from-cyan-100 via-blue-200 to-gray-300',
  },
  'Rain': {
    icon: <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ color: 'blue',  fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-b from-blue-300 via-gray-400 to-gray-500',
  },
  'Drizzle': {
    icon: <FontAwesomeIcon icon={faCloudRain} style={{ color: 'lightgray',  fontSize: '100px' }} />,
    gradient: 'bg-gradient-to-b from-gray-400 via-blue-500 to-gray-600',
  },
  'Thunderstorm': {
    icon: <FontAwesomeIcon icon={faBolt} style={{ color: 'yellow' ,  fontSize: '100px'}} />,
    gradient: 'bg-gradient-to-b from-gray-700 via-blue-800 to-gray-900',
  }
}

export default function Weather({weatherData}) {
  
  const dominantWeather = weatherData.weather[0].main
  const weatherStyle = Styles[dominantWeather] || Styles['Clear']



  console.log(weatherData)
  return (
    <div className={`relative flex flex-col justify-end items-start p-6 ${weatherStyle.gradient}`} style={{ height: '300px' }}>
      <div className="absolute top-0 right-0 p-4">
        {weatherStyle.icon}
      </div>
      <div className="absolute bottom-0 left-0 p-4">
        <div className="text-3xl font-bold">
          {dominantWeather}
        </div>
      </div>
    </div>
  )
}
