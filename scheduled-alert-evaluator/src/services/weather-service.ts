import { fetchWeatherService as getWeatherData } from "./api-service/weather-api-service";
import { WeatherData } from "../models/weather";

export const fetchWeather = async (location: {
  lat: number;
  lon: number;
  city: string;
}): Promise<WeatherData> => {
  try {
    const weatherData = await getWeatherData(location);

    return weatherData;
  } catch (error) {
    console.error("Error in fetchWeather:", error);
    throw error;
  }
};
