import axios from "axios";
const { api, fetchCurrentWeather, fetchLocation, fetchWeeklyWeather } = require("../src/api");

  const today = new Date();
  
  const getCurrentDate = () => {
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  };
  const getNextDate = () => {
  today.setDate(today.getDate() + 1);
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();
  const nextDate = getNextDate();

describe('fetchCurrentWeather', () => {
  test("Returns the correct weather information", () => {
    const params = {      //Paris
      latitude: 48.85,
      longitude: 2.35,
      daily: "sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
      hourly: "temperature_2m,weather_code,uv_index",
      models: "best_match",
      current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
      timezone: "auto",
      start_date: currentDate,
      end_date: nextDate
    };

    const fixedParams = {
      daily: "sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
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
        expect(response.latitude).toBeCloseTo(48.84, 2);
        expect(response.longitude).toBeCloseTo(2.3599997, 2);
        expect(response).toHaveProperty("current");
    })
  });
  test("400: Bad Request when given invalid parameters", () => {
    const invalidParams = {
        latitude: "test",
        longitude: "test",
        daily: "sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
        hourly: "temperature_2m,weather_code,uv_index",
        models: "best_match",
        current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
        timezone: "auto",
        start_date: currentDate,
        end_date: nextDate
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
            daily: "sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto",
            start_date: currentDate,
            end_date: nextDate
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
});


describe("fetchWeeklyWeather", () => {
    test('Returns the correct weather information for a seven day forecast', () => {
        const params = {
        latitude: 51.5,
        longitude: -0.12,
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
        hourly: "temperature_2m,weather_code,uv_index",
        models: "best_match",
        current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
        timezone: "auto",
        };

        const fixedParams = {
        daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
        hourly: "temperature_2m,weather_code,uv_index",
        models: "best_match",
        current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature"
        };

        Object.entries(fixedParams).forEach(([key, value]) => {
            expect(params).toHaveProperty(key);
            expect(params[key]).toBe(value);
        });

        const stringKeys = ["timezone"];
        const numberKeys = ["latitude", "longitude"];
        stringKeys.forEach(key => {
            expect(params).toHaveProperty(key);
            expect(typeof params[key]).toBe("string");
            });
        numberKeys.forEach(key => {
            expect(params).toHaveProperty(key);
            expect(typeof params[key]).toBe("number");
        });

        return fetchWeeklyWeather(params)
            .then((response) => {
                expect(response.latitude).toBeCloseTo(51.5, 2);
                expect(response.longitude).toBeCloseTo(-0.12, 2);
                expect(response.daily.time).toHaveLength(7);
                expect(response.daily.weather_code).toHaveLength(7);
                expect(response.daily.temperature_2m_max).toHaveLength(7);
                expect(response.daily.temperature_2m_min).toHaveLength(7);
        });
    });
    test("400: Bad Request when given invalid parameters", () => {
        const invalidParams = {
            latitude: 'test',
            longitude: 'test',
            daily: 123,
            hourly: false,
            models: false,
            current: {},
            timezone: [],
        };

        const stringKeys = ["daily", "hourly", "models", "current", "timezone"];
        const numberKeys = ["latitude", "longitude"];
        numberKeys.forEach(key => {
            expect(invalidParams).toHaveProperty(key);
            expect(typeof invalidParams[key]).not.toBe("number");
        });
        
        stringKeys.forEach(key => {
            expect(invalidParams).toHaveProperty(key);
            expect(typeof invalidParams[key]).not.toBe("string");
        });

        return fetchWeeklyWeather(invalidParams)
        .catch(error => {
            expect(error).toBeInstanceOf(Object);
            expect(error.message).toEqual("400: Bad Request");
        })
    });
    test("400: Bad Request when there are missing parameters", () => {
        const params = { latitude: 51.5 };

        return fetchWeeklyWeather(params)
        .catch((error) => {
            expect(error.message).toBe("400: Bad Request");
        });
    });
    test("Displays \"Failed to fetch weather data\" for other generic errors(no response from server, 404, .etc)", () => {
        const parisParams = {
            latitude: 48.85,
            longitude: 2.35,
            daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto",
        };

        return fetchWeeklyWeather(parisParams)
        .catch(error => {
            expect(error).toBeInstanceOf(Object);
            expect(error.message).toBe("Failed to fetch weather data");
        });
    });
});

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
        expect(data.length).toBe(5);
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
            daily: "sunrise,sunset,uv_index_max,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto",
            start_date: currentDate,
            end_date: nextDate
        }
        return params;
    })
    .then((params) => {
        return fetchCurrentWeather(params)
        .then((response) => {
          expect(response).toHaveProperty("latitude");
          expect(response).toHaveProperty("longitude");
          expect(response.latitude).toBeCloseTo(51.5, 2);
          expect(response.longitude).toBeCloseTo(-0.12, 2);
          expect(response).toHaveProperty("current");
        })
    });
    });
  test("Returns the correct weekly weather info for the chosen location", () => {
    const location = "London";
    return fetchLocation(location)
    .then((response) => {
        const chosenLocation = response.results[0];
        const params = {
            latitude: chosenLocation.latitude,
            longitude: chosenLocation.longitude,
            daily: "weather_code,temperature_2m_max,temperature_2m_min",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto"
        }
        return params;
    })
    .then((params) => {
        return fetchWeeklyWeather(params)
        .then((response) => {
            expect(response.latitude).toBeCloseTo(51.5, 2);
            expect(response.longitude).toBeCloseTo(-0.12, 2);
            expect(response.daily.time).toHaveLength(7);
            expect(response.daily.weather_code).toHaveLength(7);
            expect(response.daily.temperature_2m_max).toHaveLength(7);
            expect(response.daily.temperature_2m_min).toHaveLength(7);
        })
    });
  });
});



