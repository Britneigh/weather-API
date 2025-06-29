import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.open-meteo.com/",
});

  const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const currentDate = getCurrentDate();

export const fetchCurrentWeather = (locationData) => {
  const params = {
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    daily: "sunrise,sunset,uv_index_max,precipitation_sum",
    hourly: "temperature_2m,weather_code,uv_index",
    models: "best_match",
    current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
    timezone: locationData.timezone || "auto",
    start_date: currentDate,
    end_date: currentDate
  };

  if (!params.latitude || !params.longitude) {
    return Promise.reject(new Error("400: Bad Request"));
  }
  if (typeof params.latitude !== "number" || typeof params.longitude !== "number") {
    return Promise.reject(new Error("400: Bad Request"));
  }

  return api.get("/v1/forecast", {params})
    .then(response => response.data)
    .catch(error => {
      if (error.response?.status === 400) {
        error.message = "400: Bad Request";
      } else {
        error.message = "Failed to fetch weather data";
      }
      throw error;
    });
}

export const fetchLocation = (location) => {
  return axios.get("https://geocoding-api.open-meteo.com/v1/search", {params: { name: location, count: 10 }})
  .then(response => response.data)
  .catch((error) => {
    if (error.response?.status === 400) {
      error.message = "400: Bad Request"
    } else if (error.response?.status === 404) {
      error.message = "404: Not Found"
    } else {
      error.message = "Failed to fetch weather data at the specified location";
    }
    throw error;
  })
}
