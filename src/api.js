import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.open-meteo.com/",
});

export const fetchCurrentWeather = (params) => {

  return api.get("/v1/forecast", {params})
    .then(response => response)
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
      error.message = "Failed to collect weather data at the specified location";
    }
    throw error;
  })
}
