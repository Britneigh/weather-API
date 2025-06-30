import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { fetchWeeklyWeather } from "../api";
import { useNavigate } from "react-router-dom";

const ForecastWeekly = ({location}) => {
    const weatherIconMap = {
        0: ["0-clear-sky.png", "Clear sky"],
        1: ["1-mainly-clear.png", "Mainly clear"], 2: ["2-3-cloudy.png", "Partly cloudy"], 3: ["2-3-cloudy.png", "Overcast"],
        45: ["45-48-fog.png", "Foggy"], 48: ["45-48-fog.png", "Depositing rime fog"],
        51: ["51-drizzle.png", "Drizzle (light)"], 53: ["53-drizzle.png", "Drizzle (moderate)"], 55: ["55-drizzle.png", "Drizzle (intense)"],
        56: ["56-freezing-drizzle.png", "Freezing drizzle (light)"], 57: ["57-freezing-drizzle.png", "Freezing drizzle (intense)"],
        61: ["61-80-light-rain.png", "Slightly raining"], 63: ["63-81-moderate-rain.png", "Moderately raining"], 65: ["65-82-heavy-rain.png", "Heavy rain"],
        66: ["66-freezing-light-rain.png", "Freezing rain (light)"],
        67: ["67-heavy-rain.png", "Freezing rain (heavy)"],
        80: ["61-80-light-rain.png", "Slight rain showers"],
        71: ["71-85-light-snow.png", "Slight snow fall"], 73: ["73-moderate-snow.png", "Moderate snow fall"], 75: ["75-86-heavy-snow.png", "Heavy snowfall"],
        77: ["77-snow-grains.png", "Hail"],
        81: ["63-81-moderate-rain.png", "Moderate rain showers"], 82: ["65-82-heavy-rain.png", "Heavy rain showers"],
        85: ["71-85-light-snow.png", "Slight snow showers"], 86: ["75-86-heavy-snow.png", "Heavy snow showers"],
        95: ["95-thunderstorm.png", "Thunderstorm"], 96: ["96-thunderstorm.png", "Thunderstorm with slight hail"],
        99: ["99-thunderstorm-hail.png", "Thunderstorm with heavy hail"]
    }
    const leftArrow = <FontAwesomeIcon icon={faChevronLeft}/>
    const rightArrow = <FontAwesomeIcon icon={faChevronRight}/>
    
    const [weeklyData, setWeeklyData] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef(null);
    const navigate = useNavigate();

useEffect(() => {
    if (!location.name) return;
    setLoading(true);
    fetchWeeklyWeather(location)
    .then(response => {
      setLoading(false);
      setWeatherData(response);
    })
    .catch(error => {
      setError(error.message);
    })
}, [location]);

useEffect(() => {
  if (weatherData?.daily) {
    const { time, weather_code, temperature_2m_max, temperature_2m_min } = weatherData.daily;
    const currentTime = new Date(weatherData?.current?.time);
    
const data = time
      .map((timestamp, index) => {
        const date = new Date(timestamp);
        return {
          date: new Date(timestamp),
          day:  date.toLocaleDateString([], { weekday: 'short' }),
          icon: weatherIconMap[weather_code[index]]?.[0] || "",
          maxTemp: temperature_2m_max[index],
          minTemp: temperature_2m_min[index]
        };
      })
      .filter(item => item.date >= currentTime)
      .sort((a, b) => a.date - b.date);
    
    setWeeklyData(data);
  }
}, [weatherData]);

useEffect(() => {
     const scrollContainer = scrollRef.current;

  const handleScroll = () => {
    checkScrollPosition();
  };

  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", handleScroll);
    checkScrollPosition();
  }

  return () => {
    if (scrollContainer) {
      scrollContainer.removeEventListener("scroll", handleScroll);
    }
  };
}, [weatherData]);

const scroll = (direction) => {
  const scrollAmount = 500;

  if (scrollRef.current) {
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }
};

const checkScrollPosition = () => {
  if (!scrollRef.current) return;

  const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

  setCanScrollLeft(scrollLeft > 0);
  setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
};

const handleClick = (day) => {
navigate("/" + day);
}

  return (
    <div className="forecast-hourly-container">
    <p className="today-text">7 Days Forecast:</p>
    {canScrollLeft && (<button onClick={() => scroll("left")} className="scroll-arrow left">{leftArrow}</button>)}
        <div className="horizontal-scroll" ref={scrollRef}>
            {weeklyData.map((day, index) => (
                <div onClick={() => handleClick(day)} key={index} className="col week-card">
                    <p>{day.day}</p>
                    <img src={`/weather-icons/${day.icon}`} alt="weather icon" className="weather-img" />
                    <p>{day.maxTemp}{weatherData?.hourly_units?.temperature_2m}</p>
                    <p>{day.minTemp}{weatherData?.hourly_units?.temperature_2m}</p>
                </div>
            ))}
        </div>
    {canScrollRight && (
    <button onClick={() => scroll("right")} className="scroll-arrow right">{rightArrow}</button>
    )}
    </div>
  )
}

export default ForecastWeekly
