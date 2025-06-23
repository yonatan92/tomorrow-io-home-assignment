import { Request, Response } from "express";
import { alertService } from "../services/alert-service";
import { Alert, IAlert } from "../models/alert";
import { ErrorCodes } from "../models/error-codes";

export class AlertController {
  async createAlert(req: Request, res: Response) {
    const path = "AlertController/createAlert";
    console.info(`${path} - start`, { body: req.body });
    try {
      const {
        location,
        parameter,
        threshold,
        name,
        description,
        userId,
        phoneNumber,
      } = req.body;

      if (
        !location ||
        !parameter ||
        !threshold ||
        typeof threshold.operator !== "string" ||
        typeof threshold.value !== "number"
      ) {
        console.warn(`${path} - invalid input`);
        return res.status(400).json({ error: ErrorCodes.INVALID_INPUT });
      }

      const validOperators = ["gt", "lt", "eq", "gte", "lte"];
      if (!validOperators.includes(threshold.operator)) {
        console.warn(`${path} - invalid operator`);
        return res.status(400).json({ error: "Invalid threshold operator" });
      }

      console.info(`${path} - call alertService.createAlert`);
      const alert = await alertService.createAlert(
        location,
        parameter,
        threshold,
        name,
        description,
        userId,
        phoneNumber
      );
      const response = Alert.parseToResponse(alert);
      console.info(`${path} - end`, { response });
      res.status(201).json(response);
    } catch (err) {
      console.error(`${path} - error`, err);
      res.status(500).json({ error: ErrorCodes.ALERT_CREATE_FAILED });
    }
  }

  async getAlertById(req: Request, res: Response) {
    const path = "AlertController/getAlertById";
    console.info(`${path} - start`, { params: req.params });
    try {
      const alert = await alertService.getAlertById(req.params.id);
      if (!alert) {
        console.warn(`${path} - not found`);
        return res.status(404).json({ error: ErrorCodes.ALERT_NOT_FOUND });
      }
      const response = Alert.parseToResponse(alert);
      console.info(`${path} - end`, { response });
      res.json(response);
    } catch (err) {
      console.error(`${path} - error`, err);
      res.status(500).json({ error: ErrorCodes.ALERT_RETRIEVE_FAILED });
    }
  }

  async updateAlert(req: Request, res: Response) {
    const path = "AlertController/updateAlert";
    console.info(`${path} - start`, { params: req.params, body: req.body });
    try {
      let { id } = req.params;
      id = id.trim();
      const data = req.body;

      // Optional: Validate input fields here

      console.info(`${path} - call alertService.updateAlert`);
      const updatedAlert = await alertService.updateAlert(id, data);
      if (!updatedAlert) {
        console.warn(`${path} - not found`);
        res.status(404).json({ error: ErrorCodes.ALERT_NOT_FOUND });
        return;
      }
      const response = Alert.parseToResponse(updatedAlert);
      console.info(`${path} - end`, { response });
      res.json(response);
    } catch (err) {
      console.error(`${path} - error`, err);
      res.status(500).json({ error: ErrorCodes.ALERT_UPDATE_FAILED });
    }
  }

  async getAlerts(req: Request, res: Response) {
    const path = "AlertController/getAlerts";
    console.info(`${path} - start`);
    try {
      const alerts = await alertService.getAlerts();
      const response = Alert.parseListToResponse(alerts as IAlert[]);
      console.info(`${path} - end`, { count: response.length });
      res.json(response);
    } catch (err) {
      console.error(`${path} - error`, err);
      res.status(500).json({ error: ErrorCodes.ALERT_RETRIEVE_FAILED });
    }
  }

  async deleteAlert(req: Request, res: Response) {
    const path = "AlertController/deleteAlert";
    console.info(`${path} - start`, { params: req.params });
    try {
      let { id } = req.params;
      id = id.trim();
      console.info(`${path} - call alertService.deleteAlert`);
      const deleted = await alertService.deleteAlert(id);
      if (!deleted) {
        console.warn(`${path} - not found`);
        res.status(404).json({ error: ErrorCodes.ALERT_NOT_FOUND });
        return;
      }
      console.info(`${path} - end`, { id, isDeleted: deleted });
      res.json({ id, isDeleted: deleted });
    } catch (err) {
      console.error(`${path} - error`, err);
      res.status(500).json({ error: ErrorCodes.ALERT_DELETE_FAILED });
    }
  }
}
