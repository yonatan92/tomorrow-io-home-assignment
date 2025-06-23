import { Alert, IAlert } from "../models/alert";

export class AlertDbProvider {
  async create(alertData: Partial<IAlert>): Promise<IAlert> {
    const path = "AlertDbProvider/create";
    console.info(`${path} - start`, { alertData });
    try {
      const alert = new Alert(alertData);
      await alert.save();
      console.info(`${path} - end`, { alert });
      return alert;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  }

  async findById(id: string): Promise<IAlert | null> {
    const path = "AlertDbProvider/findById";
    console.info(`${path} - start`, { id });
    try {
      const alert = await Alert.findById(id);
      console.info(`${path} - end`, { alert });
      return alert;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  }

  async updateById(id: string, data: Partial<IAlert>): Promise<IAlert | null> {
    const path = "AlertDbProvider/updateById";
    console.info(`${path} - start`, { id, data });
    try {
      const updatedAlert = await Alert.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
      });
      console.info(`${path} - end`, { updatedAlert });
      return updatedAlert;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  }

  async findAll(): Promise<IAlert[]> {
    const path = "AlertDbProvider/findAll";
    console.info(`${path} - start`);
    try {
      const alerts = await Alert.find();
      console.info(`${path} - end`, { alerts });
      return alerts;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  }

  async deleteById(id: string): Promise<boolean> {
    const path = "AlertDbProvider/deleteById";
    console.info(`${path} - start`, { id });
    try {
      const result = await Alert.findByIdAndDelete(id);
      const deleted = !!result;
      console.info(`${path} - end`, { deleted });
      return deleted;
    } catch (error) {
      console.error(`${path} - error`, error);
      throw error;
    }
  }
}
