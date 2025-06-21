import { makeRequest } from "../utils/api-util";

export class WeatherProvider {
  getWeatherData = async (
    lat: string,
    lon: string,
    city: string
  ): Promise<any> => {
    const path = "WeatherProvider/getWeatherData";
    console.info(`${path} - start`, { lat, lon, city });

    try {
      const apiKey = process.env.TOMORROW_API_KEY || "";
      const baseUrl = process.env.TOMORROW_API_BASE_URL;

      if (!baseUrl) {
        throw new Error(
          "TOMORROW_API_BASE_URL is not defined in environment variables."
        );
      }
      const location = city ? city : `${lat},${lon}`;
      const urlObj = new URL(baseUrl);

      urlObj.searchParams.append("location", location);
      urlObj.searchParams.append("apikey", apiKey);

      const url = urlObj.toString();

      console.info(`${path} - calling makeRequest`, { url });
      const response = await makeRequest("GET", url);

      console.info(`${path} - end`, { response });
      return response;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };
}
