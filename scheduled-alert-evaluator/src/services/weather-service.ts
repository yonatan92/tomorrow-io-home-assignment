import { fetchWeatherService as getWeatherData } from "./api-service/weatherApiService";
import { WeatherData } from "../models/weather";
import { logger } from "../utils/logger";

export const fetchWeather = async (location: {
  lat: number;
  lon: number;
  city: string;
}): Promise<WeatherData> => {
  try {
    const weatherData = await getWeatherData(location);

    return weatherData;
  } catch (error) {
    logger.error("Error in fetchWeather:", error);
    throw error;
  }
};
