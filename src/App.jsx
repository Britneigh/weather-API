import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ForecastDay from "./components/ForecastDay";
import PageNotFound from "./components/PageNotFound";
import { useState, useEffect } from "react";
import { createContext } from "react";
import { fetchCurrentWeather } from "./api";

export const LocationContext = createContext();
export const WeatherContext = createContext();

function App() {
  const [location, setLocation] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState({})
  useEffect(() => {
    if (!location.name) return;
    setLoading(true);
    fetchCurrentWeather(location)
    .then(response => {
      setLoading(false);
      setWeatherData(response);
    })
    .catch(error => {
      setError(error.message);
    })
  }, [location.name])
  console.log("weatherData --->", weatherData);
  console.log("location -->", location);

  return (
    <>
    <LocationContext.Provider value={{location, setLocation}}>
      <WeatherContext.Provider value={{weatherData}}>
      <Routes>
        <Route path="/" element={<Home weatherData={weatherData} location={location}/>} />
        <Route path="/:date" element={<ForecastDay />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </WeatherContext.Provider>
    </LocationContext.Provider>
    </>
  )
}

export default App
