import { useContext } from "react";
import { WeatherContext } from "../App";

const MiscTop = () => {
  const {weatherData} = useContext(WeatherContext);  
  const sunriseIcon = "sunrise.png";
  const sunsetIcon = "sunset.png";
  const sunrise = new Date(weatherData?.daily?.sunrise[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const sunset = new Date(weatherData?.daily?.sunset[0]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="row">
      <div className="col">
        <div className="misc-info">Wind Speed: {weatherData?.current?.wind_speed_10m} km/h</div>
        <div className="misc-info">Wind Gust: {weatherData?.current?.wind_gusts_10m} km/h</div>
        <div className="misc-info">Wind Direction: {weatherData?.current?.wind_direction_10m}°</div>
    </div>
      <div className="weather-info col">
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
