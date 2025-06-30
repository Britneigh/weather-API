import SearchBar from "./SearchBar"
import { useState, useEffect } from "react";
import { createContext } from "react";
import { fetchCurrentWeather } from "../api";
import CurrentWeather from "./CurrentWeather";
import ForecastHourly from "./ForecastHourly";
import ForecastWeekly from "./ForecastWeekly";

export const LocationContext = createContext();

const Home = () => {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState({})
  useEffect(() => {
    if (!location) return;
    setLoading(true);
    fetchCurrentWeather(location)
    .then(response => {
      setLoading(false);
      setWeatherData(response);
    })
    .catch(error => {
      setError(error.message);
    })
  }, [location])

  console.log("weatherData --->", weatherData);

  return (
    <LocationContext.Provider value={{location, setLocation}}>
    <div className="home">
      <div className="row">
        <SearchBar />
      </div>
      {location.name ? (
        <>
      <div className="row">
        <CurrentWeather weatherData={weatherData} location={location} />
      </div>
      <div className="row">
      <ForecastHourly weatherData={weatherData} />
      </div>
      <div className="row">
      <ForecastWeekly location={location} />
      </div>
      </>) : null}
    </div>
    </LocationContext.Provider>
  )
}

export default Home
