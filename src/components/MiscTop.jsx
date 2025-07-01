import { useContext } from "react";
import { WeatherContext } from "../App";

const MiscTop = () => {
  const {weatherData} = useContext(WeatherContext);  
  const sunriseIcon = "sunrise.png";
  const sunsetIcon = "sunset.png";
  const sunrise = new Date(weatherData?.daily?.sunrise[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const sunset = new Date(weatherData?.daily?.sunset[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="forecast-hourly-container row">
      <div className="col">
        <p className="wind-info">Wind Speed: {weatherData?.current?.wind_speed_10m} km/h</p>
        <p className="wind-info">Wind Gust: {weatherData?.current?.wind_gusts_10m} km/h</p>
        <p className="wind-info">Wind Direction: {weatherData?.current?.wind_direction_10m}°</p>
    </div>
    
      <div className="block weather-info col">
        <div className="sun-row">
        <img className="sun-img" src={`/weather-icons/${sunriseIcon}`} alt="sunrise"/>
        </div>
      <p>Sunrise: {sunrise}</p>
        <div className="sun-row">
        <img className="sun-img" src={`/weather-icons/${sunsetIcon}`} alt="sunset"/>
        </div>
      <p>Sunset: {sunset}</p>
      </div>
    </div>
  )
}

export default MiscTop
