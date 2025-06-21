import express from "express";
import alertRouter from "./routes/alertRoutes";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/alerts", alertRouter);

export default app;
