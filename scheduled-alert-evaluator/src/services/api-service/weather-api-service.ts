import { getWeatherByLocation } from "../../providers/weather-api-provider";
import { Weather, WeatherData } from "../../models/weather";

/**
 * Service to fetch and parse weather data using the provider.
 */
export const fetchWeatherService = async (location: {
  lat: number;
  lon: number;
  city: string;
}): Promise<WeatherData> => {
  try {
    const weatherData = await getWeatherByLocation(location);
    const parsedWeatherData = Weather.parseFromApi(weatherData);

    return parsedWeatherData;
  } catch (error) {
    console.error("Failed to fetch or parse weather data:", error);
    throw error;
  }
};
