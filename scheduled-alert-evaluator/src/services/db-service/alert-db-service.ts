import {
  getAllAlerts as getAlertsFromDb,
  updateAlertStatus as updateAlertStatusInDb,
} from "../../providers/alert-db-provider";
import { IAlert, Alert } from "../../models/alert";

export const getAlerts = async (): Promise<IAlert[]> => {
  try {
    const alerts = await getAlertsFromDb();
    const parsedAlerts = (Alert as any).parseListFromDb(alerts);
    return parsedAlerts;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const updateAlertStatus = async (
  alertId: string,
  triggered: boolean
): Promise<IAlert | null> => {
  try {
    const updatedAlert = await updateAlertStatusInDb(alertId, triggered);
    return updatedAlert;
  } catch (error) {
    console.error("Error in updateAlertStatus:", error);
    throw error;
  }
};
