import mongoose, { Document, Schema } from "mongoose";
import { AlertStatus, Threshold } from "../types/alert-types"; // <-- Import the type

// TypeScript interface for Alert
export interface IAlert extends Document {
  name: string;
  description?: string;
  location: {
    name: string;
    lat: number;
    lon: number;
  };
  parameter: string;
  threshold: Threshold;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  triggered: boolean;
  phoneNumber?: string;
}

export interface AlertModel extends mongoose.Model<IAlert> {
  parseToResponse(alert: IAlert): object;
  parseListFromDb(alerts: IAlert[]): object[];
  parseFromDb(alert: IAlert): object;
  parseListToResponse(alerts: IAlert[]): object[];
}

const AlertSchema = new Schema<IAlert>(
  {
    name: { type: String, trim: true, required: true },
    userId: { type: String, required: true },
    phoneNumber: { type: String },
    description: { type: String, trim: true },
    location: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    parameter: { type: String, required: true, trim: true },
    threshold: {
      operator: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
      },
    },
    triggered: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add this right after the schema definition:
AlertSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id; // Add an 'id' field
    delete ret._id; // Remove the '_id' field
    delete ret.__v; // Remove the '__v' field
    return ret;
  },
});

AlertSchema.statics.parseFromDb = function (alert: IAlert) {
  const doc = typeof alert.toObject === "function" ? alert.toObject() : alert;

  const parsedAlert = {
    id: doc._id ? String(doc._id) : doc.id, // Force string conversion
    name: doc.name,
    description: doc.description,
    location: doc.location,
    parameter: doc.parameter,
    threshold: doc.threshold,
    userId: doc.userId,
    triggered: doc.triggered,
    createdAt: doc.createdAt ? new Date(doc.createdAt).getTime() : undefined,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).getTime() : undefined,
  };

  return parsedAlert;
};

AlertSchema.statics.parseListFromDb = function (alerts: IAlert[]) {
  return alerts.map((alert: IAlert) => (this as AlertModel).parseFromDb(alert));
};

AlertSchema.statics.parseToResponse = function (alert: IAlert) {
  const id = alert._id ? alert._id.toString() : alert.id;
  const parsedResponse = {
    id,
    name: alert.name,
    description: alert.description,
    location: alert.location,
    parameter: alert.parameter,
    threshold: alert.threshold,
    userId: alert.userId,
    triggered: alert.triggered,
    createdAt: alert.createdAt
      ? new Date(alert.createdAt).getTime()
      : undefined,
    updatedAt: alert.updatedAt
      ? new Date(alert.updatedAt).getTime()
      : undefined,
  };

  return parsedResponse;
};

AlertSchema.statics.parseListToResponse = function (alerts: IAlert[]) {
  const responses = alerts.map((alert: IAlert) =>
    (this as AlertModel).parseToResponse(alert)
  );
  return responses;
};

export const Alert = mongoose.model<IAlert, AlertModel>("Alert", AlertSchema);
