import { makeRequest } from "../utils/api-util";

const WEATHER_API_BASE_URL = process.env.WEATHER_API_BASE_URL || "";

export const getWeatherByLocation = async ({
  lat,
  lon,
  city,
}: {
  lat: number;
  lon: number;
  city: string;
}) => {
  try {
    const url = `${WEATHER_API_BASE_URL}/weather-data`;
    const response = await makeRequest("GET", url, undefined, {}, false, {
      params: { lat, lon, city },
    });

    return response;
  } catch (error) {
    console.error("Error in getWeatherByLocation:", error);
    throw error;
  }
};
