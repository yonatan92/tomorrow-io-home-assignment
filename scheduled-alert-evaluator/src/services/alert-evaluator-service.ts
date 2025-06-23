import {
  updateAlertStatus,
  aggregateAlertsByLocationName,
} from "./alert-service";
import { fetchWeather } from "./weather-service";
import { isAlertTriggered } from "../utils/alert-util";
import { IAlert } from "../models/alert";
import { ThresholdOperator } from "../types/alert-types";
import { Weather, WeatherData } from "../models/weather";

/**
 * Evaluates all alerts grouped by location.
 * For each location, fetches weather data once and evaluates all alerts for that location.
 */
export const evaluateAlerts = async (): Promise<void> => {
  try {
    const locationAlertsMap: Map<string, IAlert[]> | undefined =
      await aggregateAlertsByLocationName();
    if (!locationAlertsMap) return;

    await Promise.all(
      Array.from(locationAlertsMap.entries()).map(
        async ([locationName, alerts]) => {
          try {
            const apiWeather = await fetchWeather({
              lat: alerts[0].location.lat,
              lon: alerts[0].location.lon,
              city: locationName,
            });

            const weather: WeatherData = Weather.parseFromApi(apiWeather);

            await Promise.all(
              alerts.map(async (alert) => {
                try {
                  const { operator, value } = alert.threshold;
                  const triggered = isAlertTriggered(
                    operator as ThresholdOperator,
                    weather.temperature,
                    value
                  );
                  if (alert.triggered !== triggered) {
                    await updateAlertStatus(alert.id, triggered);
                    console.info(
                      `Alert for user ${alert.userId} at ${
                        alert.location.name
                      } is now ${triggered ? "triggered" : "not triggered"}`
                    );
                  }
                } catch (error) {
                  console.error("Error evaluating alert:", error);
                }
              })
            );
          } catch (error) {
            console.error(`Error processing location ${locationName}:`, error);
          }
        }
      )
    );
  } catch (error) {
    console.error("Error in evaluateAlerts:", error);
    throw error;
  }
};
