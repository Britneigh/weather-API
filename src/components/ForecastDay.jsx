import { fetchCurrentWeather } from "../api";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ForecastDay = ({location}) => {
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(false);
      const [weatherData, setWeatherData] = useState(null);
      const {day} = useParams();

  useEffect(() => {
    if (!location?.latitude || !location?.longitude || !day) return;
    setLoading(true);
    fetchCurrentWeather(location, day)
    .then(response => {
      setLoading(false);
      setWeatherData(response);
    })
    .catch(error => {
      setLoading(false);
      setError(error.message);
    })
  }, [location, day])

  console.log("weatherData in ForecastDay:", weatherData);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <Link to="/"><button className="back-btn">Back</button></Link>
    </div>
  )
}

export default ForecastDay
