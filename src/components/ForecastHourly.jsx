import { useState, useEffect, useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { WeatherContext } from "../App";

const ForecastHourly = () => {
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
    
    const {weatherData} = useContext(WeatherContext);
    const [hourlyData, setHourlyData] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    const scrollRef = useRef(null);

useEffect(() => {
  if (weatherData?.hourly) {
    const { time, weather_code, temperature_2m } = weatherData.hourly;
    const currentTime = new Date(weatherData?.current?.time);
    const nextDay = new Date(currentTime);
    nextDay.setHours(currentTime.getHours() + 24);
    
const data = time
      .map((timestamp, index) => {
        const date = new Date(timestamp);
        return {
          date: new Date(timestamp),
          hour: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          icon: weatherIconMap[weather_code[index]]?.[0] || "",
          temperature: temperature_2m[index]
        };
      })
       .filter(item => item.date >= currentTime && item.date < nextDay)
      .sort((a, b) => a.date - b.date);
    
    setHourlyData(data);
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
}, [hourlyData]);

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

  return (
    <div className="forecast-container">
    {canScrollLeft && (<button onClick={() => scroll("left")} className="scroll-arrow left">{leftArrow}</button>)}
        <div className="horizontal-scroll" ref={scrollRef}>
            {hourlyData.map((hour, index) => (
                <div key={index} className="col hour-card">
                    <p>{hour.hour}</p>
                    <img src={`/weather-icons/${hour.icon}`} alt="weather icon" className="weather-img" />
                    <p>{hour.temperature}{weatherData?.hourly_units?.temperature_2m}</p>
                </div>
            ))}
        </div>
    {canScrollRight && (
    <button onClick={() => scroll("right")} className="scroll-arrow right">{rightArrow}</button>
    )}
    </div>
  )
}

export default ForecastHourly
