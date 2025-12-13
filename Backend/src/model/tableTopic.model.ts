import mongoose, { Schema } from "mongoose";
import { ITableTopic } from "../types";

const tableTopicSchema = new Schema<ITableTopic>(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true
    },
    participantId: {
      type: Schema.Types.ObjectId,
      refPath: 'participantModel'
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "Guest"
    },
    participantModel: {
      type: String,
      enum: ['User', 'Guest'],
      default: 'User'
    },
    participantName: {
      type: String,
      required: true,
      trim: true
    },
    topic: {
      type: String,
      required: true,
      trim: true
    },
    duration: {
      type: String,
      required: true
    },
    targetDuration: {
      type: String,
      default: "2 mins"
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    notes: {
      type: String,
      trim: true
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

tableTopicSchema.index({ participantId: 1, completedAt: -1 });
tableTopicSchema.index({ guestId: 1, completedAt: -1 });
tableTopicSchema.index({ meetingId: 1 });

export const TableTopic = mongoose.model<ITableTopic>("TableTopic" , tableTopicSchema );