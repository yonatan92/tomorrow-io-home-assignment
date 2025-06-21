import cron from "node-cron";
import { evaluateAlerts } from "../services/alert-evaluator-service";

// This will run every 5 minutes
cron.schedule("*/5 * * * *", async () => {
  console.info(
    "[INFO] Running scheduled alert evaluation (every 5 minutes)..."
  );
  try {
    await evaluateAlerts();
  } catch (error) {
    console.error("[ERROR] Error during alert evaluation:", error);
  }
});
