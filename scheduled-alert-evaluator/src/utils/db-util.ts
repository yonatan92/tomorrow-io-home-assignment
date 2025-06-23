import mongoose from "mongoose";

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://yonatank92:<db_password>@cluster0.u6q0nvw.mongodb.net/";
const dbName = process.env.MONGO_DB || "alert_db"; // <-- dbName right after uri

export async function connectToMongo(): Promise<typeof mongoose> {
  try {
    if (mongoose.connection.readyState === 1) {
      // Already connected
      return mongoose;
    }
    await mongoose.connect(uri, { dbName });
    console.log(`✅ Connected to MongoDB with Mongoose`);
    return mongoose;
  } catch (error) {
    console.error("❌ Error connecting to MongoDB with Mongoose:", error);
    throw error;
  }
}

export async function closeMongoConnection() {
  try {
    await mongoose.disconnect();
    console.log("🔌 Mongoose connection closed.");
  } catch (error) {
    console.error("❌ Error closing Mongoose connection:", error);
    throw error;
  }
}
