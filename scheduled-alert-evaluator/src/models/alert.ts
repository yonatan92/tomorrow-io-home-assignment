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
}

// Extend the Mongoose Model type to include custom statics
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

// --- Schema Transformations & Statics ---

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

// Static method: parse a single DB document or plain object to plain object
AlertSchema.statics.parseFromDb = function (alert: any) {
  const plainAlert =
    typeof alert.toJSON === "function" ? alert.toJSON() : alert;
  return {
    id: plainAlert._id ? String(plainAlert._id) : plainAlert.id,
    name: plainAlert.name,
    description: plainAlert.description,
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

// Static method: parse a list of DB documents or plain objects to plain objects
AlertSchema.statics.parseListFromDb = function (alerts: any[]) {
  return alerts.map((alert) => (this as AlertModel).parseFromDb(alert));
};

// --- Model Export ---

export const Alert = mongoose.model<IAlert, AlertModel>("Alert", AlertSchema);
