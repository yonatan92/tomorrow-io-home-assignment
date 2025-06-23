export class WeatherData {
  cloudBase: number = 0;
  cloudCeiling: number = 0;
  cloudCover: number = 0;
  dewPoint: number = 0;
  freezingRainIntensity: number = 0;
  humidity: number = 0;
  precipitationProbability: number = 0;
  pressureSurfaceLevel: number = 0;
  rainIntensity: number = 0;
  sleetIntensity: number = 0;
  snowIntensity: number = 0;
  temperature: number = 0;
  temperatureApparent: number = 0;
  uvHealthConcern: number = 0;
  uvIndex: number = 0;
  visibility: number = 0;
  weatherCode: number = 0;
  windDirection: number = 0;
  windGust: number = 0;
  windSpeed: number = 0;

  constructor(data: Partial<WeatherData>) {
    Object.assign(this, data);
  }

  static parseObjectFromApiResponse(apiResponse: any): WeatherData {
    const path = "WeatherData/parseObjectFromApiResponse";
    console.info(`${path} - start`, { apiResponse });

    const values = apiResponse?.data?.values || {};
    console.info(`${path} - mapping values`, { values });

    const weatherData = new WeatherData({
      cloudBase: values.cloudBase,
      cloudCeiling: values.cloudCeiling,
      cloudCover: values.cloudCover,
      dewPoint: values.dewPoint,
      freezingRainIntensity: values.freezingRainIntensity,
      humidity: values.humidity,
      precipitationProbability: values.precipitationProbability,
      pressureSurfaceLevel: values.pressureSurfaceLevel,
      rainIntensity: values.rainIntensity,
      sleetIntensity: values.sleetIntensity,
      snowIntensity: values.snowIntensity,
      temperature: values.temperature,
      temperatureApparent: values.temperatureApparent,
      uvHealthConcern: values.uvHealthConcern,
      uvIndex: values.uvIndex,
      visibility: values.visibility,
      weatherCode: values.weatherCode,
      windDirection: values.windDirection,
      windGust: values.windGust,
      windSpeed: values.windSpeed,
    });

    console.info(`${path} - end`, { weatherData });
    return weatherData;
  }

  static parseObjectToResponse(weatherData: WeatherData): object {
    const path = "WeatherData/parseObjectToResponse";
    console.info(`${path} - start`, { weatherData });

    const response = {
      temperature: weatherData.temperature,
      precipitationProbability: weatherData.precipitationProbability,
      windSpeed: weatherData.windSpeed,
      weatherCode: weatherData.weatherCode,
      uvIndex: weatherData.uvIndex,
      humidity: weatherData.humidity,
    };

    console.info(`${path} - end`, { response });
    return response;
  }
}
