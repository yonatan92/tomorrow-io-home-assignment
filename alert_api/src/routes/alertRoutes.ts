import { Router } from "express";
import { AlertController } from "../controllers/AlertController";

const router = Router();
const alertController = new AlertController();

router.post("/", async (req, res, next) => {
  try {
    await alertController.createAlert(req, res);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    await alertController.getAlerts(req, res);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    await alertController.getAlertById(req, res);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    await alertController.updateAlert(req, res);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await alertController.deleteAlert(req, res);
  } catch (err) {
    next(err);
  }
});

export default router;
