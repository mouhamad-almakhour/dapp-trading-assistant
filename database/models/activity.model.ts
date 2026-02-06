// lib/db/models/activity.model.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export type ActivityType =
  | "swap"
  | "alert_triggered"
  | "alert_created"
  | "alert_deleted"
  | "watchlist_added";

export interface IActivity extends Document {
  userId: string;
  type: ActivityType;
  message: string;
  details: string | null;
  metadata?: {
    alertId?: string;
    tokenFrom?: string;
    tokenTo?: string;
    amount?: string;
    [key: string]: string | number | boolean | undefined;
  };
  createdAt: number;
}

const activitySchema = new Schema<IActivity>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: [
        "swap",
        "alert_triggered",
        "alert_created",
        "alert_deleted",
        "watchlist_added",
      ],
      required: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    details: {
      type: String,
      default: null,
      maxlength: 500,
    },
    metadata: {
      type: Schema.Types.Mixed,
      default: {},
    },
    createdAt: {
      type: Number,
      required: true,
      default: () => Date.now(),
      index: -1, // Descending index for recent activities
    },
  },
  {
    timestamps: false,
  },
);

// Compound index for efficient queries (get user's recent activities)
activitySchema.index({ userId: 1, createdAt: -1 });
activitySchema.index({ userId: 1, type: 1, createdAt: -1 });

export const Activity: Model<IActivity> =
  mongoose.models.Activity ||
  mongoose.model<IActivity>("Activity", activitySchema);
