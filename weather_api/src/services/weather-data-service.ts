import { WeatherApiService } from "./api_service/weather-api-service";
import { WeatherData } from "../models/weather-data";

export class WeatherDataService {
  private _weatherApiService: WeatherApiService | null = null;

  protected get weatherApiService(): WeatherApiService {
    if (!this._weatherApiService) {
      this._weatherApiService = new WeatherApiService();
    }
    return this._weatherApiService;
  }

  getWeatherData = async (
    lat: string,
    lon: string,
    city: string
  ): Promise<WeatherData> => {
    const path = "WeatherDataService/getWeatherData";
    console.info(`${path} - start`, { lat, lon, city });

    try {
      console.info(`${path} - calling WeatherApiService/getWeatherData`, {
        lat,
        lon,
        city,
      });

      const weatherData = await this.weatherApiService.getWeatherData(
        lat,
        lon,
        city
      );

      console.info(`${path} - end`, { weatherData });

      return weatherData;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };
}
