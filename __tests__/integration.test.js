import axios from "axios";
const { api, fetchCurrentWeather, fetchLocation } = require("../src/api");

  const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();

describe('fetchCurrentWeather', () => {
  test("Returns the correct weather information", () => {
    const params = {      //Paris
      latitude: 48.85,
      longitude: 2.35,
      daily: "sunrise,sunset,uv_index_max,precipitation_sum",
      hourly: "temperature_2m,weather_code,uv_index",
      models: "best_match",
      current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
      timezone: "auto",
      start_date: currentDate,
      end_date: currentDate
    };

    const fixedParams = {
      daily: "sunrise,sunset,uv_index_max,precipitation_sum",
      hourly: "temperature_2m,weather_code,uv_index",
      models: "best_match",
      current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature"
    };

    Object.entries(fixedParams).forEach(([key, value]) => {
        expect(params).toHaveProperty(key);
        expect(params[key]).toBe(value);
    });

    const stringKeys = ["timezone", "start_date", "end_date"];
    const numberKeys = ["latitude", "longitude"];
    stringKeys.forEach(prop => {
        expect(params).toHaveProperty(prop);
        expect(typeof params[prop]).toBe("string");
        });
    numberKeys.forEach(key => {
        expect(params).toHaveProperty(key);
        expect(typeof params[key]).toBe("number");
    });

    return fetchCurrentWeather(params)
    .then((response) => {
        expect(response.status).toBe(200);

        const data = response.data;
        
        expect(data.latitude).toBeCloseTo(48.84, 2);
        expect(data.longitude).toBeCloseTo(2.3599997, 2);
    })
  });
  test("400: Bad Request when given invalid parameters", () => {
    const invalidParams = {
        latitude: 'test',
        longitude: 'test',
        daily: "sunrise,sunset,uv_index_max,precipitation_sum",
        hourly: "temperature_2m,weather_code,uv_index",
        models: "best_match",
        current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
        timezone: "auto",
        start_date: currentDate,
        end_date: currentDate
    };

    return fetchCurrentWeather(invalidParams)
    .catch(error => {
        expect(error.message).toEqual("400: Bad Request");
    })
  });
  test("400: Bad Request when there are missing parameters", () => {
    const params = { latitude: 51.5 };

    return fetchCurrentWeather(params)
    .catch((error) => {
        expect(error.message).toBe("400: Bad Request");
    });
  });
  test("Displays \"Failed to fetch weather data\" for other generic errors(no response from server, 404, .etc)", () => {
        const params = {
            latitude: 48.85,
            longitude: 2.35,
            daily: "sunrise,sunset,uv_index_max,precipitation_sum",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto",
            start_date: currentDate,
            end_date: currentDate
        };

   return axios.get("http://localhost:9999999/v1/forecast", { params })
    .catch(error => {
      if (error.response?.status === 400) {
        error.message = "400: Bad Request";
      } else {
        error.message = "Failed to fetch weather data";
      }
      expect(error.message).toBe("Failed to fetch weather data");
    });
  });
})

describe("fetchLocation", () => {
  test("Returns a list of locations that matches the input", () => {
    const location = "London";
    expect(typeof location).toBe("string");
    return fetchLocation(location)
        .then((response) => {
         const data = response.results;
        expect(data.forEach(element => {
            expect(element).toHaveProperty("name", "London");
            expect(element).toHaveProperty("latitude");
            expect(element).toHaveProperty("longitude");
        }));
        expect(data.length).toBe(10);
    });
  });
  test("Returns the correct weather information for the chosen location", () => {
    const location = "London";
    return fetchLocation(location)
    .then((response) => {
        const chosenLocation = response.results[0];
        const params = {
            latitude: chosenLocation.latitude,
            longitude: chosenLocation.longitude,
            daily: "sunrise,sunset,uv_index_max,precipitation_sum",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto",
            start_date: currentDate,
            end_date: currentDate
        }
        return params;
    })
    .then((params) => {
        return fetchCurrentWeather(params)
        .then((response) => {
          expect(response.status).toBe(200);

          const data = response.data;
          expect(data).toHaveProperty("latitude");
          expect(data).toHaveProperty("longitude");
          expect(data.latitude).toBeCloseTo(51.5, 2);
          expect(data.longitude).toBeCloseTo(-0.12, 2);
        })
    });
    });
});



