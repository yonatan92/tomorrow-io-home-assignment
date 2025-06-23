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
    userId?: string,
    phoneNumber?: string
  ): Promise<IAlert> => {
    const alertData: Partial<IAlert> = {
      location,
      parameter,
      threshold,
      name,
      description,
      userId,
      phoneNumber,
    };
    try {
      return await this.alertDbService.createAlert(alertData);
    } catch (error) {
      console.error("Error in createAlert:", error);
      return Promise.reject(error);
    }
  };

  getAlertById = async (id: string): Promise<IAlert | null> => {
    try {
      return await this.alertDbService.getAlertById(id);
    } catch (error) {
      console.error("Error in getAlertById:", error);
      return null;
    }
  };

  updateAlert = async (
    id: string,
    data: Partial<IAlert>
  ): Promise<IAlert | null> => {
    try {
      return await this.alertDbService.updateAlert(id, data);
    } catch (error) {
      console.error("Error in updateAlert:", error);
      return null;
    }
  };

  getAlerts = async (): Promise<object[]> => {
    try {
      return await this.alertDbService.getAlerts();
    } catch (error) {
      console.error("Error in getAlerts:", error);
      return [];
    }
  };

  deleteAlert = async (id: string): Promise<boolean> => {
    try {
      return await this.alertDbService.deleteAlert(id);
    } catch (error) {
      console.error("Error in deleteAlert:", error);
      return false;
    }
  };
}

export const alertService = new AlertService();
