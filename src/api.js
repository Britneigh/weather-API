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
