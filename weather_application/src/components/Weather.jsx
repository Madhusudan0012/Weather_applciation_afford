
import './Weather.css';
// import React from 'react';
import search_icon from '../assets/search.png';
import clear_icon from '../assets/clear.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import rain_icon from '../assets/rain.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import { useState } from 'react';

function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(clear_icon);

  const getWeather = async () => {
    if (!city) return;

    try {
      const response = await fetch(`http://localhost:5000/weather?city=${city}`);
      const data = await response.json();
      setWeatherData(data);
      console.log("Weather Data:", data);


      const weather = data.weather[0].main;

      // Set appropriate icon
      switch (weather) {
        case 'Clouds':
          setIcon(cloud_icon);
          break;
        case 'Rain':
          setIcon(rain_icon);
          break;
        case 'Drizzle':
          setIcon(drizzle_icon);
          break;
        case 'Snow':
          setIcon(snow_icon);
          break;
        case 'Clear':
          setIcon(clear_icon);
          break;
        default:
          setIcon(clear_icon);
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  return (
    <div className='weather'>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <img src={search_icon} alt='' onClick={getWeather} style={{ cursor: 'pointer' }} />
      </div>

      {weatherData && (
        <>
          <img src={icon} alt='' className='weather-icon' />
          <p className='temperature'>{Math.round(weatherData.main.temp)} K</p>
          <p className='location'>{weatherData.name}</p>

          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt='' />
              <div>
                <p>{weatherData.main.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt='' />
              <div>
                <p>{weatherData.wind.speed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
