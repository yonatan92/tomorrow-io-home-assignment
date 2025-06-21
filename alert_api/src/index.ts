import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectToMongo } from "./utils/db-util";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectToMongo();
    app.listen(PORT, () => {
      console.log(`Alert API listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
