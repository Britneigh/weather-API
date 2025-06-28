const { api, fetchCurrentWeather } = require("../src/api");

describe("fetchCurrentWeather", () => {
  test("200: Returns the correct weather information", () => {
    const mockResponse = {
      data: {
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
        }
    };

   api.get = jest.fn().mockResolvedValue(mockResponse);

    const params = {
      latitude: 51.5,
      longitude: -0.12
    };
    expect(params).toHaveProperty("latitude");
    expect(params).toHaveProperty("longitude");
    expect(typeof params.latitude).toBe("number");
    expect(typeof params.longitude).toBe("number");

    return fetchCurrentWeather(params)
        .then((response) => {
        expect(api.get).toHaveBeenCalledWith("/v1/forecast", { params });

        const data = response.data;
        expect(data).toEqual({
            latitude: 51.5,
            longitude: -0.120000124,
            generationtime_ms: 0.16582012176513672,
            utc_offset_seconds: 3600,
            timezone: 'Europe/London',
            timezone_abbreviation: 'GMT+1',
            elevation: 23,
            current_units: {
                time: 'iso8601',
                interval: 'seconds',
                temperature_2m: '°C',
                relative_humidity_2m: '%',
                precipitation: 'mm',
                weather_code: 'wmo code',
                wind_speed_10m: 'km/h',
                wind_direction_10m: '°',
                wind_gusts_10m: 'km/h',
                apparent_temperature: '°C'
            },
            current: {
                time: '2025-06-28T11:00',
                interval: 900,
                temperature_2m: 24.2,
                relative_humidity_2m: 63,
                precipitation: 0,
                weather_code: 3,
                wind_speed_10m: 14.7,
                wind_direction_10m: 253,
                wind_gusts_10m: 36.7,
                apparent_temperature: 24.5
            },
            hourly_units: {
                time: 'iso8601',
                temperature_2m: '°C',
                weather_code: 'wmo code',
                uv_index: ''
            },
            hourly: {
                time: [
                '2025-06-28T00:00', '2025-06-28T01:00',
                '2025-06-28T02:00', '2025-06-28T03:00',
                '2025-06-28T04:00', '2025-06-28T05:00',
                '2025-06-28T06:00', '2025-06-28T07:00',
                '2025-06-28T08:00', '2025-06-28T09:00',
                '2025-06-28T10:00', '2025-06-28T11:00',
                '2025-06-28T12:00', '2025-06-28T13:00',
                '2025-06-28T14:00', '2025-06-28T15:00',
                '2025-06-28T16:00', '2025-06-28T17:00',
                '2025-06-28T18:00', '2025-06-28T19:00',
                '2025-06-28T20:00', '2025-06-28T21:00',
                '2025-06-28T22:00', '2025-06-28T23:00'
                ],
                temperature_2m: [
                18.9, 18.9, 18.8, 18.9, 18.8,
                18.8, 19.1, 19.6, 20.6, 22.1,
                23.2, 24.2, 24.8, 25.7,   26,
                26.8, 27.7, 28.1, 28.1, 27.8,
                27.1, 25.8, 24.5, 23.2
                ],
                weather_code: [
                1, 2, 3, 2, 2, 2, 3, 2,
                2, 3, 3, 3, 3, 3, 3, 3,
                2, 2, 2, 2, 2, 2, 1, 1
                ],
                uv_index: [
                    0,    0,    0,    0,    0,   0,
                0.15, 0.75,  1.4,  2.6,  2.3, 4.9,
                5.6,  6.3,    6, 6.05, 5.75, 4.5,
                2.45, 1.75, 0.95, 0.25,    0,   0
                ]
            },
            daily_units: {
                time: 'iso8601',
                sunset: 'iso8601',
                uv_index_max: '',
                precipitation_sum: 'mm',
                sunrise: 'iso8601'
            },
            daily: {
                time: [ '2025-06-28' ],
                sunset: [ '2025-06-28T21:21' ],
                uv_index_max: [ 6.3 ],
                precipitation_sum: [ 0 ],
                sunrise: [ '2025-06-28T04:46' ]
            }
        })
    });
  });
  test("200: Returns correct weather information for the chosen location", () => {
    const parisResponse = {
        data: {
            "latitude": 48.86,
            "longitude": 2.3399997,
            "generationtime_ms": 0.29277801513671875,
            "utc_offset_seconds": 3600,
            "timezone": "Europe/London",
            "timezone_abbreviation": "GMT+1",
            "elevation": 43,
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
            "time": "2025-06-28T12:00",
            "interval": 900,
            "temperature_2m": 27.4,
            "relative_humidity_2m": 52,
            "precipitation": 0,
            "weather_code": 1,
            "wind_speed_10m": 7.9,
            "wind_direction_10m": 317,
            "wind_gusts_10m": 18.4,
            "apparent_temperature": 30.2
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
            24.2,
            23.1,
            22.4,
            22,
            21.2,
            20.9,
            20.6,
            21.1,
            22.1,
            23.3,
            24.9,
            26.4,
            27.4,
            28.4,
            29.3,
            29.9,
            30,
            30,
            30,
            28.7,
            27.6,
            26.5,
            24.9,
            23.4
            ],
            "weather_code": [
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            2,
            2,
            2,
            2,
            1,
            1,
            1,
            1,
            1,
            1,
            2,
            1,
            0,
            0,
            0,
            0,
            0
            ],
            "uv_index": [
            0,
            0,
            0,
            0,
            0,
            0,
            0.2,
            0.9,
            1.85,
            3.3,
            4.75,
            6.05,
            6.95,
            7.45,
            7.4,
            6.85,
            5.8,
            4.5,
            3.1,
            1.75,
            0.75,
            0.15,
            0,
            0
            ]
            },
            "daily_units": {
            "time": "iso8601",
            "sunrise": "iso8601",
            "sunset": "iso8601",
            "uv_index_max": "",
            "precipitation_sum": "mm"
            },
            "daily": {
            "time": [
            "2025-06-28"
            ],
            "sunrise": [
            "2025-06-28T04:49"
            ],
            "sunset": [
            "2025-06-28T20:58"
            ],
            "uv_index_max": [
            7.45
            ],
            "precipitation_sum": [
            0
            ]
            }
        }
    };

    const parisParams = {
        latitude: 48.85,
        longitude: 2.35
    };
    expect(parisParams).toHaveProperty("latitude");
    expect(parisParams).toHaveProperty("longitude");
    expect(typeof parisParams.latitude).toBe("number");
    expect(typeof parisParams.longitude).toBe("number");

    api.get = jest.fn().mockResolvedValue(parisResponse);

    return fetchCurrentWeather(parisParams)
        .then((response) => {
        expect(api.get).toHaveBeenCalledWith("/v1/forecast", { params: parisParams });

        const data = response.data;
        expect(data.latitude).toBeCloseTo(48.86, 2);
        expect(data.longitude).toBeCloseTo(2.3399997, 2);
        })
    });
    test("400: Bad Request when given invalid parameters", () => {
        const errorMsg = {
            response: { status: 400 },
            message: "400: Bad Request"
        };

        api.get = jest.fn().mockRejectedValue(errorMsg);
        const invalidParams = {
            latitude: 'test',
            longitude: 'test'
        };
        expect(invalidParams).toHaveProperty("latitude");
        expect(invalidParams).toHaveProperty("longitude");
        expect(typeof invalidParams.latitude).not.toBe("number");
        expect(typeof invalidParams.longitude).not.toBe("number");
        
        return fetchCurrentWeather(invalidParams)
        .catch(error => {
            expect(error).toBeInstanceOf(Object);
            expect(error.response?.status).toBe(400);
            expect(error.message).toEqual("400: Bad Request");
        })
    });
    test("400: Bad Request when there is a missing parameter", () => {
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
            longitude: 2.35
        };
        api.get = jest.fn().mockRejectedValue(errorMsg);

        return fetchCurrentWeather(parisParams)
        .catch(error => {
            expect(error).toBeInstanceOf(Object);
            expect(error.message).toBe("Failed to fetch weather data");
    });
  });
});


