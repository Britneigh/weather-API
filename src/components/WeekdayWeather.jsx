import { useState, useEffect } from "react";
import { useContext } from "react";
import { LocationContext } from "../App";

const WeekdayWeather = ({weatherData, date}) => {
    const weatherIconMap = {
        0: ["0-clear-sky.png", "Clear sky"],
        1: ["1-mainly-clear.png", "Mainly clear"], 2: ["2-3-cloudy.png", "Partly cloudy"], 3: ["2-3-cloudy.png", "Overcast"],
        45: ["45-48-fog.png", "Foggy"], 48: ["45-48-fog.png", "Depositing rime fog"],
        51: ["51-drizzle.png", "Drizzle (light)"], 53: ["53-drizzle.png", "Drizzle (moderate)"], 55: ["55-drizzle.png", "Drizzle (intense)"],
        56: ["56-freezing-drizzle.png", "Freezing drizzle (light)"], 57: ["57-freezing-drizzle.png", "Freezing drizzle (intense)"],
        61: ["61-80-light-rain.png", "Slightly raining"], 63: ["63-81-moderate-rain.png", "Moderately raining"], 65: ["65-82-heavy-rain.png", "Heavy rain"],
        66: ["66-freezing-light-rain.png", "Freezing rain (light)"],
        67: ["67-heavy-rain.png", "Freezing rain (heavy)"],
        80: ["80-light-rain.png", "Slight rain showers"],
        71: ["71-85-light-snow.png", "Slight snow fall"], 73: ["73-moderate-snow.png", "Moderate snow fall"], 75: ["75-86-heavy-snow.png", "Heavy snowfall"],
        77: ["77-snow-grains.png", "Hail"],
        81: ["63-81-moderate-rain.png", "Moderate rain showers"], 82: ["65-82-heavy-rain.png", "Heavy rain showers"],
        85: ["71-85-light-snow.png", "Slight snow showers"], 86: ["75-86-heavy-snow.png", "Heavy snow showers"],
        95: ["95-thunderstorm.png", "Thunderstorm"], 96: ["96-thunderstorm.png", "Thunderstorm with slight hail"],
        99: ["99-thunderstorm-hail.png", "Thunderstorm with heavy hail"]
    }
    const [weatherCode, setWeatherCode] = useState(0);
    const {location} = useContext(LocationContext);

useEffect(() => {
    if (weatherData?.current?.weather_code) {
        setWeatherCode(weatherData.current.weather_code);
    }
}, [weatherData]);

    const weatherImg = weatherIconMap[weatherCode]?.[0] || "";
    const weatherDesc = weatherIconMap[weatherCode]?.[1] || "";

    const formattedDate = new Date(date);
    const fullDate = formattedDate.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    });

  return (
    <div className="current-weather-container row">
        <div className="col weather-info">
            {location.name !== undefined ? 
            (<>
            <p>{fullDate}</p>
            <h1>{location.name}</h1>
            {weatherImg ? (
                <div className="weekday-img-section">
                <img className="weather-img weekday" src={`/weather-icons/${weatherImg}`} alt={`Weather code: ${weatherCode}`} />
                </div>
            ) : (
                null
            )}
            <p>{weatherDesc}</p>
            <div className="row">
            <p>Max: </p>
            <p>{weatherData?.daily?.temperature_2m_max[0]}{weatherData?.current_units?.temperature_2m} </p>
            <p>Min: </p>
            <p>{weatherData?.daily?.temperature_2m_min[0]}{weatherData?.current_units?.temperature_2m} </p>
            </div>
            </>) : null}
        </div>
    </div>
  )
}

export default WeekdayWeather
