import dotenv from "dotenv";
dotenv.config();
import { connectToMongo } from "./utils/db-util";
import "./cron/alert-checker";

dotenv.config();

async function start() {
  await connectToMongo();
}

start();
