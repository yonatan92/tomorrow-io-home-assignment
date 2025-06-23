import { PhoneNumber } from "./../../node_modules/twilio/lib/interfaces.d";
import mongoose, { Document, Schema } from "mongoose";
import { ThresholdOperator, Threshold } from "../types/alert-types";

// --- Interfaces ---

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
  parseListFromDb(alerts: IAlert[]): object[];
  parseFromDb(alert: IAlert): object;
}

// --- Schema ---

const AlertSchema = new Schema<IAlert>(
  {
    name: { type: String, trim: true, required: true },
    userId: { type: String, required: true },
    description: { type: String, trim: true },
    phoneNumber: { type: String, trim: true },
    location: {
      name: { type: String, required: true },
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    parameter: { type: String, required: true, trim: true },
    threshold: {
      operator: {
        enum: ThresholdOperator,
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

// toJSON transform for consistent API output
AlertSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    ret.createdAt = ret.createdAt
      ? new Date(ret.createdAt).getTime()
      : undefined;
    ret.updatedAt = ret.updatedAt
      ? new Date(ret.updatedAt).getTime()
      : undefined;
    return ret;
  },
});

AlertSchema.statics.parseFromDb = function (alert: any) {
  const plainAlert =
    typeof alert.toJSON === "function" ? alert.toJSON() : alert;
  return {
    id: plainAlert._id ? String(plainAlert._id) : plainAlert.id,
    name: plainAlert.name,
    description: plainAlert.description,
    phoneNumber: plainAlert.phoneNumber,
    location: plainAlert.location,
    parameter: plainAlert.parameter,
    threshold: plainAlert.threshold,
    triggered: plainAlert.triggered,
    userId: plainAlert.userId,
    createdAt: plainAlert.createdAt
      ? new Date(plainAlert.createdAt).getTime()
      : undefined,
    updatedAt: plainAlert.updatedAt
      ? new Date(plainAlert.updatedAt).getTime()
      : undefined,
  };
};

AlertSchema.statics.parseListFromDb = function (alerts: any[]) {
  return alerts.map((alert) => (this as AlertModel).parseFromDb(alert));
};

export const Alert = mongoose.model<IAlert, AlertModel>("Alert", AlertSchema);
