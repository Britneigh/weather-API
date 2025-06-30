import SearchBar from "./SearchBar"
import { useState, useEffect } from "react";
import { createContext } from "react";
import { fetchCurrentWeather } from "../api";
import CurrentWeather from "./CurrentWeather";

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
      <div className="row">
        <CurrentWeather weatherData={weatherData} location={location}/>
      </div>
    </div>
    </LocationContext.Provider>
  )
}

export default Home
