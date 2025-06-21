import { WeatherProvider } from "../../providers/weather-provider";
import { WeatherData } from "../../models/weather-data";

export class WeatherApiService {
  private _weatherProvider: WeatherProvider | null = null;

  protected get weatherProvider(): WeatherProvider {
    if (!this._weatherProvider) {
      this._weatherProvider = new WeatherProvider();
    }
    return this._weatherProvider;
  }

  getWeatherData = async (
    lat: string,
    lon: string,
    city: string
  ): Promise<WeatherData> => {
    const path = "WeatherApiService/getWeatherData";
    console.info(`${path} - start`, { lat, lon, city });

    try {
      console.info(`${path} - calling WeatherProvider/getWeatherData`, {
        lat,
        lon,
        city,
      });

      const weatherData = await this.weatherProvider.getWeatherData(
        lat,
        lon,
        city
      );
      const parsedResponse =
        WeatherData.parseObjectFromApiResponse(weatherData);

      console.info(`${path} - end`, { parsedResponse });

      return parsedResponse;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };
}
