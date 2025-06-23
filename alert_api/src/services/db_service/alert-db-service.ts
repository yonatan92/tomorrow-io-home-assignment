import { IAlert, Alert } from "../../models/alert";
import { AlertDbProvider } from "../../providers/alert-db-provider";

export class AlertDbService {
  private _alertDbProvider: AlertDbProvider | null = null;

  protected get alertDbProvider(): AlertDbProvider {
    if (!this._alertDbProvider) {
      this._alertDbProvider = new AlertDbProvider();
    }
    return this._alertDbProvider;
  }

  createAlert = async (alertData: Partial<IAlert>): Promise<IAlert> => {
    const path = "AlertDbService/createAlert";
    console.info(`${path} - start`, { alertData });
    try {
      const alert = await this.alertDbProvider.create(alertData);
      console.info(`${path} - end`, { alert });
      return alert;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };

  getAlertById = async (id: string): Promise<IAlert | null> => {
    const path = "AlertDbService/getAlertById";
    console.info(`${path} - start`, { id });
    try {
      const alert = await this.alertDbProvider.findById(id);
      console.info(`${path} - end`, { alert });
      return alert;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };

  updateAlert = async (
    id: string,
    data: Partial<IAlert>
  ): Promise<IAlert | null> => {
    const path = "AlertDbService/updateAlert";
    console.info(`${path} - start`, { id, data });
    try {
      const updatedAlert = await this.alertDbProvider.updateById(id, data);
      console.info(`${path} - end`, { updatedAlert });
      return updatedAlert;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };

  getAlerts = async (): Promise<object[]> => {
    const path = "AlertDbService/getAlerts";
    console.info(`${path} - start`);
    try {
      const alerts = await this.alertDbProvider.findAll();
      const parsedAlerts = Alert.parseListFromDb(alerts);
      console.info(`${path} - end`, { count: parsedAlerts.length });
      return parsedAlerts;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };

  deleteAlert = async (id: string): Promise<boolean> => {
    const path = "AlertDbService/deleteAlert";
    console.info(`${path} - start`, { id });
    try {
      const deleted = await this.alertDbProvider.deleteById(id);
      console.info(`${path} - end`, { deleted });
      return deleted;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  };
}
