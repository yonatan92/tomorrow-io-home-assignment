import { Alert, IAlert } from "../models/alert";

export const getAllAlerts = async (): Promise<IAlert[]> => {
  try {
    const alerts = await Alert.find();

    return alerts;
  } catch (error) {
    console.error("Error in getAllAlerts:", error);
    throw error;
  }
};

export const getAlertsByUserId = async (userId: string): Promise<IAlert[]> => {
  try {
    const alerts = await Alert.find({ userId });

    return alerts;
  } catch (error) {
    console.error("Error in getAlertsByUserId:", error);
    throw error;
  }
};

export const updateAlertStatus = async (
  alertId: string,
  triggered: boolean
): Promise<IAlert | null> => {
  try {
    const updatedAlert = await Alert.findByIdAndUpdate(
      alertId,
      { triggered },
      { new: true }
    );
    return updatedAlert;
  } catch (error) {
    console.error("Error in updateAlertStatus:", error);
    throw error;
  }
};
