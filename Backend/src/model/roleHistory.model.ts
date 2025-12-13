import mongoose, { Schema } from "mongoose";
import { IRoleHistory } from "../types";

const roleHistorySchema = new Schema<IRoleHistory>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "Guest"
    },
    userModel: {
      type: String,
      enum: ['User', 'Guest'],
      required: true
    },
    participantName: {
      type: String,
      required: true,
      trim: true
    },
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    completedAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    feedback: {
      type: String,
      trim: true
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    givenBy: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

roleHistorySchema.index({ userId: 1, completedAt: -1 });
roleHistorySchema.index({ guestId: 1, completedAt: -1 });
roleHistorySchema.index({ meetingId: 1 });
roleHistorySchema.index({ role: 1 });

export const RoleHistory = mongoose.model<IRoleHistory>("RoleHistory", roleHistorySchema);