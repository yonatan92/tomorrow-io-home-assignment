import express, { Application, Request, Response } from "express";
import cors from "cors";
import { WeatherDataController } from "./controllers/WeatherDataController";

const app: Application = express();

app.use(express.json());
app.use(cors());

const weatherDataController = new WeatherDataController();

app.get("/weather-data", async (req: Request, res: Response, next) => {
  try {
    await weatherDataController.getWeatherData(req, res);
  } catch (error) {
    next(error);
  }
});

export default app;
