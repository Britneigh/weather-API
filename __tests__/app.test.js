const { api, fetchCurrentWeather, fetchLocation } = require("../src/api");
import axios from "axios";

afterEach(() => {
    jest.resetAllMocks();
});

  const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
  };

  const currentDate = getCurrentDate();

describe("fetchCurrentWeather", () => {
    test("Returns the correct weather information", () => {
        const mockResponse = {
            "latitude": 51.5,
            "longitude": -0.120000124,
            "generationtime_ms": 0.18358230590820312,
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
            "time": "2025-06-29T22:45",
            "interval": 900,
            "temperature_2m": 22.6,
            "relative_humidity_2m": 70,
            "precipitation": 0,
            "weather_code": 1,
            "wind_speed_10m": 6.9,
            "wind_direction_10m": 118,
            "wind_gusts_10m": 20.9,
            "apparent_temperature": 24
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
            "2025-06-28T23:00"
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
            22.2
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
            1
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
            "2025-06-28"
            ],
            "sunrise": [
            "2025-06-28T03:46"
            ],
            "sunset": [
            "2025-06-28T20:21"
            ],
            "uv_index_max": [
            6.5
            ],
            "precipitation_sum": [
            0
            ],
            "temperature_2m_max": [
            28.9
            ],
            "temperature_2m_min": [
            18.8
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
        end_date: currentDate
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
            end_date: currentDate
        };

        api.get = jest.fn().mockRejectedValue(errorMsg);

        return fetchCurrentWeather(parisParams)
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
  test("Returns the correct weather info for the chosen location", () => {
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
            end_date: currentDate
        }
        return params;
    })
    .then((params) => {
        const weatherMockResponse = {
                    "latitude": 51.5,
                    "longitude": -0.120000124,
                    "generationtime_ms": 0.16582012176513672,
                    "utc_offset_seconds": 3600,
                    "timezone": "Europe/London",
                    "timezone_abbreviation": "GMT+1",
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
                    "time": "2025-06-28T11:00",
                    "interval": 900,
                    "temperature_2m": 24.2,
                    "relative_humidity_2m": 63,
                    "precipitation": 0,
                    "weather_code": 3,
                    "wind_speed_10m": 14.7,
                    "wind_direction_10m": 253,
                    "wind_gusts_10m": 36.7,
                    "apparent_temperature": 24.5
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
                    "2025-06-28T23:00"
                    ],
                    "temperature_2m": [
                    18.9,
                    18.9,
                    18.8,
                    18.9,
                    18.8,
                    18.8,
                    19.1,
                    19.6,
                    20.6,
                    22.1,
                    23.2,
                    24.2,
                    24.8,
                    25.7,
                    26,
                    26.8,
                    27.7,
                    28.1,
                    28.1,
                    27.8,
                    27.1,
                    25.8,
                    24.5,
                    23.2
                    ],
                    "weather_code": [
                    1,
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
                    3,
                    3,
                    2,
                    2,
                    2,
                    2,
                    2,
                    2,
                    1,
                    1
                    ],
                    "uv_index": [
                    0,
                    0,
                    0,
                    0,
                    0,
                    0,
                    0.15,
                    0.75,
                    1.4,
                    2.6,
                    2.3,
                    4.9,
                    5.6,
                    6.3,
                    6,
                    6.05,
                    5.75,
                    4.5,
                    2.45,
                    1.75,
                    0.95,
                    0.25,
                    0,
                    0
                    ]
                    },
                    "daily_units": {
                    "time": "iso8601",
                    "sunset": "iso8601",
                    "uv_index_max": "",
                    "precipitation_sum": "mm",
                    "sunrise": "iso8601"
                    },
                    "daily": {
                    "time": [
                    "2025-06-28"
                    ],
                    "sunset": [
                    "2025-06-28T21:21"
                    ],
                    "uv_index_max": [
                    6.3
                    ],
                    "precipitation_sum": [
                    0
                    ],
                    "sunrise": [
                    "2025-06-28T04:46"
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
                "generationtime_ms": 0.16582012176513672,
                "utc_offset_seconds": 3600,
                "timezone": "Europe/London",
                "timezone_abbreviation": "GMT+1",
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
                "time": "2025-06-28T11:00",
                "interval": 900,
                "temperature_2m": 24.2,
                "relative_humidity_2m": 63,
                "precipitation": 0,
                "weather_code": 3,
                "wind_speed_10m": 14.7,
                "wind_direction_10m": 253,
                "wind_gusts_10m": 36.7,
                "apparent_temperature": 24.5
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
                "2025-06-28T23:00"
                ],
                "temperature_2m": [
                18.9,
                18.9,
                18.8,
                18.9,
                18.8,
                18.8,
                19.1,
                19.6,
                20.6,
                22.1,
                23.2,
                24.2,
                24.8,
                25.7,
                26,
                26.8,
                27.7,
                28.1,
                28.1,
                27.8,
                27.1,
                25.8,
                24.5,
                23.2
                ],
                "weather_code": [
                1,
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
                3,
                3,
                2,
                2,
                2,
                2,
                2,
                2,
                1,
                1
                ],
                "uv_index": [
                0,
                0,
                0,
                0,
                0,
                0,
                0.15,
                0.75,
                1.4,
                2.6,
                2.3,
                4.9,
                5.6,
                6.3,
                6,
                6.05,
                5.75,
                4.5,
                2.45,
                1.75,
                0.95,
                0.25,
                0,
                0
                ]
                },
                "daily_units": {
                "time": "iso8601",
                "sunset": "iso8601",
                "uv_index_max": "",
                "precipitation_sum": "mm",
                "sunrise": "iso8601"
                },
                "daily": {
                "time": [
                "2025-06-28"
                ],
                "sunset": [
                "2025-06-28T21:21"
                ],
                "uv_index_max": [
                6.3
                ],
                "precipitation_sum": [
                0
                ],
                "sunrise": [
                "2025-06-28T04:46"
                ]
                }
            })
        })
    });
  });
});



