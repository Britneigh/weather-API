import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.open-meteo.com/",
});

export const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getNextDate = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const day = String(tomorrow.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};


export const fetchCurrentWeather = (locationData, dateStr) => {
  const parseDate = (str) => {
    const [year, month, day] = str.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  let startDate = dateStr || getCurrentDate();
  let endDate = dateStr ? (() => {
        const date = parseDate(dateStr);
        date.setDate(date.getDate() + 1);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      })()
    : getNextDate();

  const params = {
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    daily: "sunrise,sunset,uv_index_max,precipitation_sum,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,weather_code,uv_index",
    models: "best_match",
    current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
    timezone: locationData.timezone || "auto",
    start_date: startDate,
    end_date: endDate
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
  return axios.get("https://geocoding-api.open-meteo.com/v1/search", {params: { name: location, count: 5 }})
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

export const fetchWeeklyWeather = (locationData) => {
  const params = {
    latitude: locationData.latitude,
    longitude: locationData.longitude,
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    hourly: "temperature_2m,weather_code,uv_index",
    models: "best_match",
    current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
    timezone: locationData.timezone || "auto",
  };

  if (!params.latitude || !params.longitude || !params.daily) {
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