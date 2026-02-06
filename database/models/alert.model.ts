import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAlert extends Document {
  userId: string;
  type: "gas" | "price";
  condition: "below" | "above";
  threshold: number;
  active: boolean;
  triggered: boolean;
  createdAt: number;
  lastTriggeredAt: number | null;
  updatedAt: number;
}

const alertSchema = new Schema<IAlert>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ["gas", "price"],
      required: true,
      default: "gas",
    },
    condition: {
      type: String,
      enum: ["below", "above"],
      required: true,
    },
    threshold: {
      type: Number,
      required: true,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
      index: true,
    },
    triggered: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Number,
      required: true,
      default: () => Date.now(),
    },
    lastTriggeredAt: {
      type: Number,
      default: null,
    },
    updatedAt: {
      type: Number,
      required: true,
      default: () => Date.now(),
    },
  },
  {
    timestamps: false, // We handle timestamps manually
  },
);

// Compound index for efficient queries
alertSchema.index({ userId: 1, active: 1 });
alertSchema.index({ userId: 1, createdAt: -1 });

// Update updatedAt on save
alertSchema.pre("save", function (this: IAlert) {
  this.updatedAt = Date.now();
});

export const Alert: Model<IAlert> =
  mongoose.models.Alert || mongoose.model<IAlert>("Alert", alertSchema);
