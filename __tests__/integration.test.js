import axios from "axios";
const { api, fetchCurrentWeather } = require("../src/api");

describe('fetchCurrentWeather', () => {
  test('200: Returns correct weather info for the chosen location', () => {

    const params = {      //Paris
        latitude: 48.85,
        longitude: 2.35
    };
    expect(params).toHaveProperty("latitude");
    expect(params).toHaveProperty("longitude");
    expect(typeof params.latitude).toBe("number");
    expect(typeof params.longitude).toBe("number");

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
        longitude: 'test'
    };
    expect(invalidParams).toHaveProperty("latitude");
    expect(invalidParams).toHaveProperty("longitude");
    expect(typeof invalidParams.latitude).not.toBe("number");
    expect(typeof invalidParams.longitude).not.toBe("number");

    return fetchCurrentWeather(invalidParams)
    .catch(error => {
        expect(error.response?.status).toBe(400);
        expect(error.message).toEqual("400: Bad Request");
    })
  })
  test("Displays \"Failed to fetch weather data\" for other generic errors(no response from server, 404, .etc)", () => {
        const params = {
            latitude: 48.85,
            longitude: 2.35
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
