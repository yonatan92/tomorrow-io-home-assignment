// --- Interfaces ---

export interface WeatherData {
  temperature: number;
  humidity?: number;
  windSpeed?: number;
  rain?: number;
  precipitationProbability?: number;
  weatherCode?: number;
  uvIndex?: number;
}

export class Weather {
  static parseFromApi(apiResponse: any): WeatherData {
    return {
      temperature: apiResponse.temp ?? apiResponse.temperature,
      humidity: apiResponse.humidity,
      windSpeed: apiResponse.wind_speed ?? apiResponse.windSpeed,
      rain: apiResponse.rain,
      precipitationProbability: apiResponse.precipitationProbability,
      weatherCode: apiResponse.weatherCode,
      uvIndex: apiResponse.uvIndex,
    };
  }
}
