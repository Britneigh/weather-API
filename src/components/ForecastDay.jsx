import { fetchCurrentWeather } from "../api";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import { LocationContext } from "../App";
import WeekdayWeather from "./WeekdayWeather";
import ForecastWeeklyHours from "./ForecastWeeklyHours";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const ForecastDay = () => {
      const { location } = useContext(LocationContext);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);
      const [weatherData, setWeatherData] = useState(null);
      const { date } = useParams();
      const backArrow = <FontAwesomeIcon icon={faArrowLeft} />

  useEffect(() => {
    if (!location?.latitude || !location?.longitude || !date) return;
    setLoading(true);
    fetchCurrentWeather(location, date)
    .then(response => {
      setLoading(false);
      setWeatherData(response);
    })
    .catch(error => {
      setLoading(false);
      setError(error.message);
    })
  }, [location.name, date])

  return (
    <div className="home">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="forecast-day-row">
      <Link to="/"><button className="back-btn">{backArrow}</button></Link>
      </div>
      <div className="row">
      <WeekdayWeather weatherData={weatherData} date={date} />
      </div>
      <div className="row">
      <ForecastWeeklyHours weatherData={weatherData} />
      </div>
    </div>
  )
}

export default ForecastDay
