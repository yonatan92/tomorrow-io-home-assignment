import { IAlert } from "../models/alert";
import { AlertDbService } from "./db_service/alert-db-service";
import { Threshold } from "../types/alert-types";

export class AlertService {
  private _alertDbService?: AlertDbService;

  private get alertDbService(): AlertDbService {
    if (!this._alertDbService) {
      this._alertDbService = new AlertDbService();
    }
    return this._alertDbService;
  }

  createAlert = async (
    location: { name: string; lat: number; lon: number },
    parameter: string,
    threshold: Threshold,
    name?: string,
    description?: string,
    userId?: string
  ): Promise<IAlert> => {
    const alertData: Partial<IAlert> = {
      location,
      parameter,
      threshold,
      name,
      description,
      userId,
    };
    try {
      return await this.alertDbService.createAlert(alertData);
    } catch (error) {
      console.error("Error in createAlert:", error);
      throw error;
    }
  };

  getAlertById = async (id: string): Promise<IAlert | null> => {
    let alert: IAlert | null = null;
    try {
      alert = await this.alertDbService.getAlertById(id);
    } catch (error) {
      console.error("Error in getAlertById:", error);
    }
    return alert;
  };

  updateAlert = async (
    id: string,
    data: Partial<IAlert>
  ): Promise<IAlert | null> => {
    let updatedAlert: IAlert | null = null;
    try {
      updatedAlert = await this.alertDbService.updateAlert(id, data);
    } catch (error) {
      console.error("Error in updateAlert:", error);
    }
    return updatedAlert;
  };

  getAlerts = async (): Promise<object[]> => {
    let alerts: object[] = [];
    try {
      alerts = await this.alertDbService.getAlerts();
    } catch (error) {
      console.error("Error in getAlerts:", error);
    }
    return alerts;
  };

  deleteAlert = async (id: string): Promise<boolean> => {
    let deleted = false;
    try {
      deleted = await this.alertDbService.deleteAlert(id);
    } catch (error) {
      console.error("Error in deleteAlert:", error);
    }
    return deleted;
  };
}

export const alertService = new AlertService();
