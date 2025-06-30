const { api, fetchCurrentWeather, fetchLocation, fetchWeeklyWeather } = require("../src/api");
import axios from "axios";

afterEach(() => {
    jest.resetAllMocks();
});

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

describe("fetchCurrentWeather", () => {
    test("Returns the correct weather information", () => {
        const mockResponse = {
            "latitude": 51.5,
            "longitude": -0.120000124,
            "generationtime_ms": 0.1366138458251953,
            "utc_offset_seconds": 0,
            "timezone": "GMT",
            "timezone_abbreviation": "GMT",
            "elevation": 23,
            "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "relative_humidity_2m": "%",
            "precipitation": "mm",
            "weather_code": "wmo code",
            "wind_speed_10m": "km/h",
            "wind_direction_10m": "°",
            "wind_gusts_10m": "km/h",
            "apparent_temperature": "°C"
            },
            "current": {
            "time": "2025-06-30T20:30",
            "interval": 900,
            "temperature_2m": 28.1,
            "relative_humidity_2m": 44,
            "precipitation": 0,
            "weather_code": 0,
            "wind_speed_10m": 8.3,
            "wind_direction_10m": 180,
            "wind_gusts_10m": 23.8,
            "apparent_temperature": 28.5
            },
            "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C",
            "weather_code": "wmo code",
            "uv_index": ""
            },
            "hourly": {
            "time": [
            "2025-06-28T00:00",
            "2025-06-28T01:00",
            "2025-06-28T02:00",
            "2025-06-28T03:00",
            "2025-06-28T04:00",
            "2025-06-28T05:00",
            "2025-06-28T06:00",
            "2025-06-28T07:00",
            "2025-06-28T08:00",
            "2025-06-28T09:00",
            "2025-06-28T10:00",
            "2025-06-28T11:00",
            "2025-06-28T12:00",
            "2025-06-28T13:00",
            "2025-06-28T14:00",
            "2025-06-28T15:00",
            "2025-06-28T16:00",
            "2025-06-28T17:00",
            "2025-06-28T18:00",
            "2025-06-28T19:00",
            "2025-06-28T20:00",
            "2025-06-28T21:00",
            "2025-06-28T22:00",
            "2025-06-28T23:00",
            "2025-06-29T00:00",
            "2025-06-29T01:00",
            "2025-06-29T02:00",
            "2025-06-29T03:00",
            "2025-06-29T04:00",
            "2025-06-29T05:00",
            "2025-06-29T06:00",
            "2025-06-29T07:00",
            "2025-06-29T08:00",
            "2025-06-29T09:00",
            "2025-06-29T10:00",
            "2025-06-29T11:00",
            "2025-06-29T12:00",
            "2025-06-29T13:00",
            "2025-06-29T14:00",
            "2025-06-29T15:00",
            "2025-06-29T16:00",
            "2025-06-29T17:00",
            "2025-06-29T18:00",
            "2025-06-29T19:00",
            "2025-06-29T20:00",
            "2025-06-29T21:00",
            "2025-06-29T22:00",
            "2025-06-29T23:00"
            ],
            "temperature_2m": [
            18.9,
            18.8,
            18.9,
            18.8,
            18.8,
            19.1,
            19.6,
            20.6,
            22.1,
            21.8,
            23,
            24.3,
            25,
            27.1,
            28.3,
            28.9,
            28.7,
            28.3,
            27.9,
            26.8,
            25.3,
            24,
            23.5,
            22.2,
            21.5,
            20.3,
            19.4,
            18.7,
            18.2,
            18.2,
            18.4,
            19.6,
            20.6,
            21.7,
            23.1,
            24.3,
            25.5,
            26.3,
            27.1,
            28.5,
            28.8,
            28.7,
            28.9,
            27.9,
            25.4,
            24.2,
            23.3,
            22.4
            ],
            "weather_code": [
            2,
            3,
            2,
            2,
            2,
            3,
            2,
            2,
            3,
            3,
            3,
            3,
            3,
            2,
            3,
            2,
            1,
            1,
            1,
            0,
            0,
            1,
            1,
            1,
            0,
            0,
            1,
            1,
            0,
            1,
            1,
            3,
            2,
            3,
            3,
            3,
            2,
            1,
            1,
            1,
            1,
            1,
            3,
            2,
            1,
            1,
            1,
            2
            ],
            "uv_index": [
            0,
            0,
            0,
            0,
            0,
            0.15,
            0.75,
            1.45,
            2.85,
            3,
            5.25,
            4.9,
            6.5,
            6.25,
            6.4,
            5.75,
            4.55,
            3.25,
            1.95,
            0.95,
            0.25,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0.2,
            0.8,
            1.5,
            2.55,
            4,
            5.55,
            6.5,
            7,
            7.05,
            6.6,
            5.75,
            4.3,
            3,
            1.8,
            0.9,
            0.25,
            0,
            0,
            0
            ]
            },
            "daily_units": {
            "time": "iso8601",
            "sunrise": "iso8601",
            "sunset": "iso8601",
            "uv_index_max": "",
            "precipitation_sum": "mm",
            "temperature_2m_max": "°C",
            "temperature_2m_min": "°C"
            },
            "daily": {
            "time": [
            "2025-06-28",
            "2025-06-29"
            ],
            "sunrise": [
            "2025-06-28T03:46",
            "2025-06-29T03:46"
            ],
            "sunset": [
            "2025-06-28T20:21",
            "2025-06-29T20:21"
            ],
            "uv_index_max": [
            6.5,
            7.05
            ],
            "precipitation_sum": [
            0,
            0
            ],
            "temperature_2m_max": [
            28.9,
            28.9
            ],
            "temperature_2m_min": [
            18.8,
            18.2
            ]
            }
        };
        
    api.get = jest.fn().mockResolvedValue({ data: mockResponse });

        const params = {
        latitude: 51.5,
        longitude: -0.12,
        daily: "sunrise,sunset,uv_index_max,precipitation_sum,temperature_2m_max,temperature_2m_min",
        hourly: "temperature_2m,weather_code,uv_index",
        models: "best_match",
        current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
        timezone: "auto",
        start_date: currentDate,
        end_date: nextDate
        };

        const fixedParams = {
        daily: "sunrise,sunset,uv_index_max,precipitation_sum,temperature_2m_max,temperature_2m_min",
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
        stringKeys.forEach(key => {
            expect(params).toHaveProperty(key);
            expect(typeof params[key]).toBe("string");
            });
        numberKeys.forEach(key => {
            expect(params).toHaveProperty(key);
            expect(typeof params[key]).toBe("number");
        });

        return fetchCurrentWeather(params)
            .then((response) => {
            expect(api.get).toHaveBeenCalledWith("/v1/forecast", { params });
            expect(response).toEqual(mockResponse);
        });
    });
    test("400: Bad Request when given invalid parameters", () => {
        const errorMsg = {
            response: { status: 400 },
            message: "400: Bad Request"
        };

        api.get = jest.fn().mockRejectedValue(errorMsg);
        const invalidParams = {
            latitude: 'test',
            longitude: 'test',
            daily: 123,
            hourly: false,
            models: false,
            current: {},
            timezone: [],
            start_date: [],
            end_date: 123
        };

        const stringKeys = ["daily", "hourly", "models", "current", "timezone", "start_date", "end_date"];
        const numberKeys = ["latitude", "longitude"];
        numberKeys.forEach(key => {
            expect(invalidParams).toHaveProperty(key);
            expect(typeof invalidParams[key]).not.toBe("number");
        });
        
        stringKeys.forEach(key => {
            expect(invalidParams).toHaveProperty(key);
            expect(typeof invalidParams[key]).not.toBe("string");
        });

        return fetchCurrentWeather(invalidParams)
        .catch(error => {
            expect(error).toBeInstanceOf(Object);
            expect(error.message).toEqual("400: Bad Request");
        })
    });
    test("400: Bad Request when there are missing parameters", () => {
        const errorMsg = {
            response: { status: 400 },
            message: "400: Bad Request"
        };

        const params = { latitude: 51.5 };

        api.get = jest.fn().mockRejectedValue(errorMsg);

        return fetchCurrentWeather(params)
        .catch((error) => {
            expect(error.message).toBe("400: Bad Request");
        });
    });
    test("Displays \"Failed to fetch weather data\" for other generic errors(no response from server, 404, .etc)", () => {
        const errorMsg = {
            response: undefined,
            message: "Failed to fetch weather data"
        };

        const parisParams = {
            latitude: 48.85,
            longitude: 2.35,
            daily: "sunrise,sunset,uv_index_max,precipitation_sum,temperature_2m_max,temperature_2m_min",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto",
            start_date: currentDate,
            end_date: nextDate
        };

        api.get = jest.fn().mockRejectedValue(errorMsg);

        return fetchCurrentWeather(parisParams)
        .catch(error => {
            expect(error).toBeInstanceOf(Object);
            expect(error.message).toBe("Failed to fetch weather data");
        });
    });
});

describe("fetchWeeklyWeather", () => {
    test('Returns the correct weather information for a seven day forecast', () => {
        const mockResponse = {
            "latitude": 51.5,
            "longitude": -0.120000124,
            "generationtime_ms": 0.16689300537109375,
            "utc_offset_seconds": 0,
            "timezone": "GMT",
            "timezone_abbreviation": "GMT",
            "elevation": 23,
            "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "relative_humidity_2m": "%",
            "precipitation": "mm",
            "weather_code": "wmo code",
            "wind_speed_10m": "km/h",
            "wind_direction_10m": "°",
            "wind_gusts_10m": "km/h",
            "apparent_temperature": "°C"
            },
            "current": {
            "time": "2025-06-30T19:00",
            "interval": 900,
            "temperature_2m": 29.6,
            "relative_humidity_2m": 40,
            "precipitation": 0,
            "weather_code": 0,
            "wind_speed_10m": 11.3,
            "wind_direction_10m": 197,
            "wind_gusts_10m": 28.4,
            "apparent_temperature": 29.5
            },
            "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C",
            "weather_code": "wmo code",
            "uv_index": ""
            },
            "hourly": {
            "time": [],
            "temperature_2m": [],
            "weather_code": [],
            "uv_index": []
            },
            "daily_units": {
            "time": "iso8601",
            "weather_code": "wmo code",
            "temperature_2m_max": "°C",
            "temperature_2m_min": "°C"
            },
            "daily": {
            "time": [
            "2025-06-30",
            "2025-07-01",
            "2025-07-02",
            "2025-07-03",
            "2025-07-04",
            "2025-07-05",
            "2025-07-06"
            ],
            "weather_code": [
            2,
            3,
            80,
            3,
            3,
            80,
            80
            ],
            "temperature_2m_max": [
            31.6,
            32.2,
            24,
            24.7,
            25.8,
            20.5,
            19
            ],
            "temperature_2m_min": [
            18.6,
            23.6,
            17.8,
            14.8,
            14.9,
            15.5,
            15.4
            ]
            }
        };
    api.get = jest.fn().mockResolvedValue({ data: mockResponse });

        const params = {
        latitude: 51.5,
        longitude: -0.12,
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
        hourly: "temperature_2m,weather_code,uv_index",
        models: "best_match",
        current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
        timezone: "auto",
        };

        const fixedParams = {
        daily: "weather_code,temperature_2m_max,temperature_2m_min",
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
            expect(api.get).toHaveBeenCalledWith("/v1/forecast", { params });
            expect(response).toEqual(mockResponse);
        });
    });
    test("400: Bad Request when given invalid parameters", () => {
        const errorMsg = {
            response: { status: 400 },
            message: "400: Bad Request"
        };

        api.get = jest.fn().mockRejectedValue(errorMsg);
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
        const errorMsg = {
            response: { status: 400 },
            message: "400: Bad Request"
        };

        const params = { latitude: 51.5 };

        api.get = jest.fn().mockRejectedValue(errorMsg);

        return fetchWeeklyWeather(params)
        .catch((error) => {
            expect(error.message).toBe("400: Bad Request");
        });
    });
    test("Displays \"Failed to fetch weather data\" for other generic errors(no response from server, 404, .etc)", () => {
        const errorMsg = {
            response: undefined,
            message: "Failed to fetch weather data"
        };

        const parisParams = {
            latitude: 48.85,
            longitude: 2.35,
            daily: "weather_code,temperature_2m_max,temperature_2m_min",
            hourly: "temperature_2m,weather_code,uv_index",
            models: "best_match",
            current: "temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m,apparent_temperature",
            timezone: "auto",
        };

        api.get = jest.fn().mockRejectedValue(errorMsg);

        return fetchWeeklyWeather(parisParams)
        .catch(error => {
            expect(error).toBeInstanceOf(Object);
            expect(error.message).toBe("Failed to fetch weather data");
        });
    });
});

describe("fetchLocation", () => {
  test("Returns a list of locations that matches the input", () => {
    const mockResponse = [{
        "id": 2643743,
        "name": "London",
        "latitude": 51.50853,
        "longitude": -0.12574,
        "elevation": 25,
        "feature_code": "PPLC",
        "country_code": "GB",
        "admin1_id": 6269131,
        "admin2_id": 2648110,
        "timezone": "Europe/London",
        "population": 8961989,
        "country_id": 2635167,
        "country": "United Kingdom",
        "admin1": "England",
        "admin2": "Greater London"
        },
        {
        "id": 6058560,
        "name": "London",
        "latitude": 42.98339,
        "longitude": -81.23304,
        "elevation": 252,
        "feature_code": "PPL",
        "country_code": "CA",
        "admin1_id": 6093943,
        "admin2_id": 6073256,
        "timezone": "America/Toronto",
        "population": 346765,
        "country_id": 6251999,
        "country": "Canada",
        "admin1": "Ontario",
        "admin2": "Middlesex County"
        },
        {
        "id": 4517009,
        "name": "London",
        "latitude": 39.88645,
        "longitude": -83.44825,
        "elevation": 321,
        "feature_code": "PPLA2",
        "country_code": "US",
        "admin1_id": 5165418,
        "admin2_id": 4517365,
        "admin3_id": 4517024,
        "timezone": "America/New_York",
        "population": 10060,
        "postcodes": [
        "43140"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Ohio",
        "admin2": "Madison",
        "admin3": "City of London"
        },
        {
        "id": 4298960,
        "name": "London",
        "latitude": 37.12898,
        "longitude": -84.08326,
        "elevation": 378,
        "feature_code": "PPLA2",
        "country_code": "US",
        "admin1_id": 6254925,
        "admin2_id": 4297480,
        "timezone": "America/New_York",
        "population": 8126,
        "postcodes": [
        "40741",
        "40742",
        "40743",
        "40744",
        "40745"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Kentucky",
        "admin2": "Laurel"
        },
        {
        "id": 4119617,
        "name": "London",
        "latitude": 35.32897,
        "longitude": -93.25296,
        "elevation": 116,
        "feature_code": "PPL",
        "country_code": "US",
        "admin1_id": 4099753,
        "admin2_id": 4127100,
        "admin3_id": 4105863,
        "timezone": "America/Chicago",
        "population": 1046,
        "postcodes": [
        "72847"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Arkansas",
        "admin2": "Pope",
        "admin3": "Clark Township"
        }];

    const location = "London";

    expect(typeof location).toBe("string");

    axios.get = jest.fn().mockResolvedValue({
        data: {
            results: mockResponse
        }
    });
    return fetchLocation(location)
        .then((response) => {
        expect(axios.get).toHaveBeenCalledWith("https://geocoding-api.open-meteo.com/v1/search", {params: { name: location, count: 5 }});
        expect(response.results.forEach(element => {
            expect(element).toHaveProperty("name", "London");
            expect(element).toHaveProperty("latitude");
            expect(element).toHaveProperty("longitude");
        }));
        expect(response.results.length).toBe(5);
    });
  });
  test("Returns the correct current weather info for the chosen location", () => {
    const mockLocationResponse = [{
        "id": 2643743,
        "name": "London",
        "latitude": 51.50853,
        "longitude": -0.12574,
        "elevation": 25,
        "feature_code": "PPLC",
        "country_code": "GB",
        "admin1_id": 6269131,
        "admin2_id": 2648110,
        "timezone": "Europe/London",
        "population": 8961989,
        "country_id": 2635167,
        "country": "United Kingdom",
        "admin1": "England",
        "admin2": "Greater London"
        },
        {
        "id": 6058560,
        "name": "London",
        "latitude": 42.98339,
        "longitude": -81.23304,
        "elevation": 252,
        "feature_code": "PPL",
        "country_code": "CA",
        "admin1_id": 6093943,
        "admin2_id": 6073256,
        "timezone": "America/Toronto",
        "population": 346765,
        "country_id": 6251999,
        "country": "Canada",
        "admin1": "Ontario",
        "admin2": "Middlesex County"
        },
        {
        "id": 4517009,
        "name": "London",
        "latitude": 39.88645,
        "longitude": -83.44825,
        "elevation": 321,
        "feature_code": "PPLA2",
        "country_code": "US",
        "admin1_id": 5165418,
        "admin2_id": 4517365,
        "admin3_id": 4517024,
        "timezone": "America/New_York",
        "population": 10060,
        "postcodes": [
        "43140"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Ohio",
        "admin2": "Madison",
        "admin3": "City of London"
        },
        {
        "id": 4298960,
        "name": "London",
        "latitude": 37.12898,
        "longitude": -84.08326,
        "elevation": 378,
        "feature_code": "PPLA2",
        "country_code": "US",
        "admin1_id": 6254925,
        "admin2_id": 4297480,
        "timezone": "America/New_York",
        "population": 8126,
        "postcodes": [
        "40741",
        "40742",
        "40743",
        "40744",
        "40745"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Kentucky",
        "admin2": "Laurel"
        },
        {
        "id": 4119617,
        "name": "London",
        "latitude": 35.32897,
        "longitude": -93.25296,
        "elevation": 116,
        "feature_code": "PPL",
        "country_code": "US",
        "admin1_id": 4099753,
        "admin2_id": 4127100,
        "admin3_id": 4105863,
        "timezone": "America/Chicago",
        "population": 1046,
        "postcodes": [
        "72847"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Arkansas",
        "admin2": "Pope",
        "admin3": "Clark Township"
        }];

    const location = "London";
    axios.get = jest.fn().mockResolvedValue({
            data: {
                results: mockLocationResponse
            }
        });
    return fetchLocation(location)
    .then((response) => {
        expect(axios.get).toHaveBeenCalledWith("https://geocoding-api.open-meteo.com/v1/search", {params: { name: location, count: 5 }});
        
        const chosenLocation = response.results[0];
        const params = {
            latitude: chosenLocation.latitude,
            longitude: chosenLocation.longitude,
            daily: "sunrise,sunset,uv_index_max,precipitation_sum,temperature_2m_max,temperature_2m_min",
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
        const weatherMockResponse = {
            "latitude": 51.5,
            "longitude": -0.120000124,
            "generationtime_ms": 0.1366138458251953,
            "utc_offset_seconds": 0,
            "timezone": "GMT",
            "timezone_abbreviation": "GMT",
            "elevation": 23,
            "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "relative_humidity_2m": "%",
            "precipitation": "mm",
            "weather_code": "wmo code",
            "wind_speed_10m": "km/h",
            "wind_direction_10m": "°",
            "wind_gusts_10m": "km/h",
            "apparent_temperature": "°C"
            },
            "current": {
            "time": "2025-06-30T20:30",
            "interval": 900,
            "temperature_2m": 28.1,
            "relative_humidity_2m": 44,
            "precipitation": 0,
            "weather_code": 0,
            "wind_speed_10m": 8.3,
            "wind_direction_10m": 180,
            "wind_gusts_10m": 23.8,
            "apparent_temperature": 28.5
            },
            "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C",
            "weather_code": "wmo code",
            "uv_index": ""
            },
            "hourly": {
            "time": [
            "2025-06-28T00:00",
            "2025-06-28T01:00",
            "2025-06-28T02:00",
            "2025-06-28T03:00",
            "2025-06-28T04:00",
            "2025-06-28T05:00",
            "2025-06-28T06:00",
            "2025-06-28T07:00",
            "2025-06-28T08:00",
            "2025-06-28T09:00",
            "2025-06-28T10:00",
            "2025-06-28T11:00",
            "2025-06-28T12:00",
            "2025-06-28T13:00",
            "2025-06-28T14:00",
            "2025-06-28T15:00",
            "2025-06-28T16:00",
            "2025-06-28T17:00",
            "2025-06-28T18:00",
            "2025-06-28T19:00",
            "2025-06-28T20:00",
            "2025-06-28T21:00",
            "2025-06-28T22:00",
            "2025-06-28T23:00",
            "2025-06-29T00:00",
            "2025-06-29T01:00",
            "2025-06-29T02:00",
            "2025-06-29T03:00",
            "2025-06-29T04:00",
            "2025-06-29T05:00",
            "2025-06-29T06:00",
            "2025-06-29T07:00",
            "2025-06-29T08:00",
            "2025-06-29T09:00",
            "2025-06-29T10:00",
            "2025-06-29T11:00",
            "2025-06-29T12:00",
            "2025-06-29T13:00",
            "2025-06-29T14:00",
            "2025-06-29T15:00",
            "2025-06-29T16:00",
            "2025-06-29T17:00",
            "2025-06-29T18:00",
            "2025-06-29T19:00",
            "2025-06-29T20:00",
            "2025-06-29T21:00",
            "2025-06-29T22:00",
            "2025-06-29T23:00"
            ],
            "temperature_2m": [
            18.9,
            18.8,
            18.9,
            18.8,
            18.8,
            19.1,
            19.6,
            20.6,
            22.1,
            21.8,
            23,
            24.3,
            25,
            27.1,
            28.3,
            28.9,
            28.7,
            28.3,
            27.9,
            26.8,
            25.3,
            24,
            23.5,
            22.2,
            21.5,
            20.3,
            19.4,
            18.7,
            18.2,
            18.2,
            18.4,
            19.6,
            20.6,
            21.7,
            23.1,
            24.3,
            25.5,
            26.3,
            27.1,
            28.5,
            28.8,
            28.7,
            28.9,
            27.9,
            25.4,
            24.2,
            23.3,
            22.4
            ],
            "weather_code": [
            2,
            3,
            2,
            2,
            2,
            3,
            2,
            2,
            3,
            3,
            3,
            3,
            3,
            2,
            3,
            2,
            1,
            1,
            1,
            0,
            0,
            1,
            1,
            1,
            0,
            0,
            1,
            1,
            0,
            1,
            1,
            3,
            2,
            3,
            3,
            3,
            2,
            1,
            1,
            1,
            1,
            1,
            3,
            2,
            1,
            1,
            1,
            2
            ],
            "uv_index": [
            0,
            0,
            0,
            0,
            0,
            0.15,
            0.75,
            1.45,
            2.85,
            3,
            5.25,
            4.9,
            6.5,
            6.25,
            6.4,
            5.75,
            4.55,
            3.25,
            1.95,
            0.95,
            0.25,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0.2,
            0.8,
            1.5,
            2.55,
            4,
            5.55,
            6.5,
            7,
            7.05,
            6.6,
            5.75,
            4.3,
            3,
            1.8,
            0.9,
            0.25,
            0,
            0,
            0
            ]
            },
            "daily_units": {
            "time": "iso8601",
            "sunrise": "iso8601",
            "sunset": "iso8601",
            "uv_index_max": "",
            "precipitation_sum": "mm",
            "temperature_2m_max": "°C",
            "temperature_2m_min": "°C"
            },
            "daily": {
            "time": [
            "2025-06-28",
            "2025-06-29"
            ],
            "sunrise": [
            "2025-06-28T03:46",
            "2025-06-29T03:46"
            ],
            "sunset": [
            "2025-06-28T20:21",
            "2025-06-29T20:21"
            ],
            "uv_index_max": [
            6.5,
            7.05
            ],
            "precipitation_sum": [
            0,
            0
            ],
            "temperature_2m_max": [
            28.9,
            28.9
            ],
            "temperature_2m_min": [
            18.8,
            18.2
            ]
            }
        };

        api.get = jest.fn().mockResolvedValue({ data: weatherMockResponse });
        return fetchCurrentWeather(params)
        .then((response) => {
            expect(api.get).toHaveBeenCalledWith("/v1/forecast", { params });

            expect(response).toEqual({
            "latitude": 51.5,
            "longitude": -0.120000124,
            "generationtime_ms": 0.1366138458251953,
            "utc_offset_seconds": 0,
            "timezone": "GMT",
            "timezone_abbreviation": "GMT",
            "elevation": 23,
            "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "relative_humidity_2m": "%",
            "precipitation": "mm",
            "weather_code": "wmo code",
            "wind_speed_10m": "km/h",
            "wind_direction_10m": "°",
            "wind_gusts_10m": "km/h",
            "apparent_temperature": "°C"
            },
            "current": {
            "time": "2025-06-30T20:30",
            "interval": 900,
            "temperature_2m": 28.1,
            "relative_humidity_2m": 44,
            "precipitation": 0,
            "weather_code": 0,
            "wind_speed_10m": 8.3,
            "wind_direction_10m": 180,
            "wind_gusts_10m": 23.8,
            "apparent_temperature": 28.5
            },
            "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C",
            "weather_code": "wmo code",
            "uv_index": ""
            },
            "hourly": {
            "time": [
            "2025-06-28T00:00",
            "2025-06-28T01:00",
            "2025-06-28T02:00",
            "2025-06-28T03:00",
            "2025-06-28T04:00",
            "2025-06-28T05:00",
            "2025-06-28T06:00",
            "2025-06-28T07:00",
            "2025-06-28T08:00",
            "2025-06-28T09:00",
            "2025-06-28T10:00",
            "2025-06-28T11:00",
            "2025-06-28T12:00",
            "2025-06-28T13:00",
            "2025-06-28T14:00",
            "2025-06-28T15:00",
            "2025-06-28T16:00",
            "2025-06-28T17:00",
            "2025-06-28T18:00",
            "2025-06-28T19:00",
            "2025-06-28T20:00",
            "2025-06-28T21:00",
            "2025-06-28T22:00",
            "2025-06-28T23:00",
            "2025-06-29T00:00",
            "2025-06-29T01:00",
            "2025-06-29T02:00",
            "2025-06-29T03:00",
            "2025-06-29T04:00",
            "2025-06-29T05:00",
            "2025-06-29T06:00",
            "2025-06-29T07:00",
            "2025-06-29T08:00",
            "2025-06-29T09:00",
            "2025-06-29T10:00",
            "2025-06-29T11:00",
            "2025-06-29T12:00",
            "2025-06-29T13:00",
            "2025-06-29T14:00",
            "2025-06-29T15:00",
            "2025-06-29T16:00",
            "2025-06-29T17:00",
            "2025-06-29T18:00",
            "2025-06-29T19:00",
            "2025-06-29T20:00",
            "2025-06-29T21:00",
            "2025-06-29T22:00",
            "2025-06-29T23:00"
            ],
            "temperature_2m": [
            18.9,
            18.8,
            18.9,
            18.8,
            18.8,
            19.1,
            19.6,
            20.6,
            22.1,
            21.8,
            23,
            24.3,
            25,
            27.1,
            28.3,
            28.9,
            28.7,
            28.3,
            27.9,
            26.8,
            25.3,
            24,
            23.5,
            22.2,
            21.5,
            20.3,
            19.4,
            18.7,
            18.2,
            18.2,
            18.4,
            19.6,
            20.6,
            21.7,
            23.1,
            24.3,
            25.5,
            26.3,
            27.1,
            28.5,
            28.8,
            28.7,
            28.9,
            27.9,
            25.4,
            24.2,
            23.3,
            22.4
            ],
            "weather_code": [
            2,
            3,
            2,
            2,
            2,
            3,
            2,
            2,
            3,
            3,
            3,
            3,
            3,
            2,
            3,
            2,
            1,
            1,
            1,
            0,
            0,
            1,
            1,
            1,
            0,
            0,
            1,
            1,
            0,
            1,
            1,
            3,
            2,
            3,
            3,
            3,
            2,
            1,
            1,
            1,
            1,
            1,
            3,
            2,
            1,
            1,
            1,
            2
            ],
            "uv_index": [
            0,
            0,
            0,
            0,
            0,
            0.15,
            0.75,
            1.45,
            2.85,
            3,
            5.25,
            4.9,
            6.5,
            6.25,
            6.4,
            5.75,
            4.55,
            3.25,
            1.95,
            0.95,
            0.25,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            0.2,
            0.8,
            1.5,
            2.55,
            4,
            5.55,
            6.5,
            7,
            7.05,
            6.6,
            5.75,
            4.3,
            3,
            1.8,
            0.9,
            0.25,
            0,
            0,
            0
            ]
            },
            "daily_units": {
            "time": "iso8601",
            "sunrise": "iso8601",
            "sunset": "iso8601",
            "uv_index_max": "",
            "precipitation_sum": "mm",
            "temperature_2m_max": "°C",
            "temperature_2m_min": "°C"
            },
            "daily": {
            "time": [
            "2025-06-28",
            "2025-06-29"
            ],
            "sunrise": [
            "2025-06-28T03:46",
            "2025-06-29T03:46"
            ],
            "sunset": [
            "2025-06-28T20:21",
            "2025-06-29T20:21"
            ],
            "uv_index_max": [
            6.5,
            7.05
            ],
            "precipitation_sum": [
            0,
            0
            ],
            "temperature_2m_max": [
            28.9,
            28.9
            ],
            "temperature_2m_min": [
            18.8,
            18.2
            ]
            }
            })
        })
    });
  });
  test("Returns the correct weekly weather info for the chosen location", () => {
    const mockLocationResponse = [{
        "id": 2643743,
        "name": "London",
        "latitude": 51.50853,
        "longitude": -0.12574,
        "elevation": 25,
        "feature_code": "PPLC",
        "country_code": "GB",
        "admin1_id": 6269131,
        "admin2_id": 2648110,
        "timezone": "Europe/London",
        "population": 8961989,
        "country_id": 2635167,
        "country": "United Kingdom",
        "admin1": "England",
        "admin2": "Greater London"
        },
        {
        "id": 6058560,
        "name": "London",
        "latitude": 42.98339,
        "longitude": -81.23304,
        "elevation": 252,
        "feature_code": "PPL",
        "country_code": "CA",
        "admin1_id": 6093943,
        "admin2_id": 6073256,
        "timezone": "America/Toronto",
        "population": 346765,
        "country_id": 6251999,
        "country": "Canada",
        "admin1": "Ontario",
        "admin2": "Middlesex County"
        },
        {
        "id": 4517009,
        "name": "London",
        "latitude": 39.88645,
        "longitude": -83.44825,
        "elevation": 321,
        "feature_code": "PPLA2",
        "country_code": "US",
        "admin1_id": 5165418,
        "admin2_id": 4517365,
        "admin3_id": 4517024,
        "timezone": "America/New_York",
        "population": 10060,
        "postcodes": [
        "43140"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Ohio",
        "admin2": "Madison",
        "admin3": "City of London"
        },
        {
        "id": 4298960,
        "name": "London",
        "latitude": 37.12898,
        "longitude": -84.08326,
        "elevation": 378,
        "feature_code": "PPLA2",
        "country_code": "US",
        "admin1_id": 6254925,
        "admin2_id": 4297480,
        "timezone": "America/New_York",
        "population": 8126,
        "postcodes": [
        "40741",
        "40742",
        "40743",
        "40744",
        "40745"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Kentucky",
        "admin2": "Laurel"
        },
        {
        "id": 4119617,
        "name": "London",
        "latitude": 35.32897,
        "longitude": -93.25296,
        "elevation": 116,
        "feature_code": "PPL",
        "country_code": "US",
        "admin1_id": 4099753,
        "admin2_id": 4127100,
        "admin3_id": 4105863,
        "timezone": "America/Chicago",
        "population": 1046,
        "postcodes": [
        "72847"
        ],
        "country_id": 6252001,
        "country": "United States",
        "admin1": "Arkansas",
        "admin2": "Pope",
        "admin3": "Clark Township"
        }];

    const location = "London";
    axios.get = jest.fn().mockResolvedValue({
            data: {
                results: mockLocationResponse
            }
        });
    return fetchLocation(location)
    .then((response) => {
        expect(axios.get).toHaveBeenCalledWith("https://geocoding-api.open-meteo.com/v1/search", {params: { name: location, count: 5 }});
        
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
        const weatherMockResponse = {
            "latitude": 51.5,
            "longitude": -0.120000124,
            "generationtime_ms": 0.16689300537109375,
            "utc_offset_seconds": 0,
            "timezone": "GMT",
            "timezone_abbreviation": "GMT",
            "elevation": 23,
            "current_units": {
            "time": "iso8601",
            "interval": "seconds",
            "temperature_2m": "°C",
            "relative_humidity_2m": "%",
            "precipitation": "mm",
            "weather_code": "wmo code",
            "wind_speed_10m": "km/h",
            "wind_direction_10m": "°",
            "wind_gusts_10m": "km/h",
            "apparent_temperature": "°C"
            },
            "current": {
            "time": "2025-06-30T19:00",
            "interval": 900,
            "temperature_2m": 29.6,
            "relative_humidity_2m": 40,
            "precipitation": 0,
            "weather_code": 0,
            "wind_speed_10m": 11.3,
            "wind_direction_10m": 197,
            "wind_gusts_10m": 28.4,
            "apparent_temperature": 29.5
            },
            "hourly_units": {
            "time": "iso8601",
            "temperature_2m": "°C",
            "weather_code": "wmo code",
            "uv_index": ""
            },
            "hourly": {
            "time": [],
            "temperature_2m": [],
            "weather_code": [],
            "uv_index": []
            },
            "daily_units": {
            "time": "iso8601",
            "weather_code": "wmo code",
            "temperature_2m_max": "°C",
            "temperature_2m_min": "°C"
            },
            "daily": {
            "time": [
            "2025-06-30",
            "2025-07-01",
            "2025-07-02",
            "2025-07-03",
            "2025-07-04",
            "2025-07-05",
            "2025-07-06"
            ],
            "weather_code": [
            2,
            3,
            80,
            3,
            3,
            80,
            80
            ],
            "temperature_2m_max": [
            31.6,
            32.2,
            24,
            24.7,
            25.8,
            20.5,
            19
            ],
            "temperature_2m_min": [
            18.6,
            23.6,
            17.8,
            14.8,
            14.9,
            15.5,
            15.4
            ]
            } 
        };

        api.get = jest.fn().mockResolvedValue({ data: weatherMockResponse });
        return fetchWeeklyWeather(params)
        .then((response) => {
            expect(api.get).toHaveBeenCalledWith("/v1/forecast", { params });

            expect(response).toEqual(weatherMockResponse);
        })
    });
  });
});

