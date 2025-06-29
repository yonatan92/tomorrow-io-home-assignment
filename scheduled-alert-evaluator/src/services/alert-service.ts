import {
  getAlerts as fetchAlerts,
  updateAlertStatus as updateAlertStatusDb,
} from "./db-service/alert-db-service";
import type { IAlert } from "../models/alert";
import { Alert } from "../models/alert";

export const getAlerts = async (): Promise<IAlert[]> => {
  try {
    return await fetchAlerts();
  } catch (error) {
    console.error("Error in getAlerts:", error);
    throw error;
  }
};

export const updateAlertStatus = async (
  alertId: string,
  triggered: boolean
) => {
  try {
    return await updateAlertStatusDb(alertId, triggered);
  } catch (error) {
    console.error("Error in updateAlertStatus:", error);
    throw error;
  }
};

export const aggregateAlertsByLocationName = async (): Promise<
  Map<string, any[]> | undefined
> => {
  try {
    const alerts = await Alert.aggregate([
      {
        $group: {
          _id: "$location.name", // Group by location name
          alerts: { $push: "$$ROOT" },
        },
      },
      {
        $project: {
          _id: 0,
          locationName: "$_id",
          alerts: 1,
        },
      },
    ]);

    if (alerts.length === 0) {
      console.error("No alerts found in aggregation.");
      return;
    }

    const locationAlertsMap = new Map<string, any[]>();
    alerts.forEach((group) => {
      const parsedAlerts = Alert.parseListFromDb(group.alerts);
      locationAlertsMap.set(group.locationName, parsedAlerts);
    });

    return locationAlertsMap;
  } catch (error) {
    console.error("Error in alert aggregation process:", error);
    throw error;
  }
};
