import { ErrorCodes } from "../models/error-codes";
import { WeatherDataService } from "../services/weather-data-service";
import { WeatherData } from "../models/weather-data";
import { Request, Response } from "express";

export class WeatherDataController {
  private _weatherDataService!: WeatherDataService;

  private get weatherDataService(): WeatherDataService {
    if (!this._weatherDataService) {
      this._weatherDataService = new WeatherDataService();
    }
    return this._weatherDataService;
  }

  async getWeatherData(req: Request, res: Response) {
    const path = "WeatherDataController/getWeatherData";
    console.info(`${path} - start`);

    try {
      const { lat, lon, city } = req.query;

      // Input validation: must provide city or (lat and lon)
      if (
        (!city || city === "") &&
        (!lat || lat === "" || !lon || lon === "")
      ) {
        return res.status(400).json({
          error: ErrorCodes.INVALID_INPUT,
          message: "You must provide either a city or both lat and lon.",
        });
      }

      console.info(`${path} - calling WeatherDataService/getWeatherData`);
      const result = await this.weatherDataService.getWeatherData(
        lat as string,
        lon as string,
        city as string
      );

      console.info(`${path} - calling WeatherData/parseObjectToResponse`);
      const parsedResult = WeatherData.parseObjectToResponse(result);

      console.info(`${path} - end`, { parsedResult });

      return res.json(parsedResult);
    } catch (err) {
      console.error(`${path} - error`, err);

      return res.status(500).json({
        error: ErrorCodes.WEATHER_API_ERROR_GET_WEATHER_DATA,
        message: "Failed to fetch weather data",
      });
    }
  }
}
