import mongoose, { Schema } from "mongoose";
import { ISpeech } from "../types";

const speechSchema = new Schema<ISpeech>(
  {
    speakerId: {
      type: Schema.Types.ObjectId,
      refPath: 'speakerModel',
      required: true
    },
    speakerModel: {
      type: String,
      enum: ['User', 'Guest'],
      default: 'User'
    },
    speakerName: {
      type: String,
      required: true,
      trim: true
    },
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    speechType: {
      type: String,
      enum: ['prepared', 'evaluation', 'icebreaker'],
      default: 'prepared'
    },
    pathwaysProject: {
      level: String,
      pathway: String,
      projectName: String
    },
    objectives: [String],
    duration: {
      type: String,
      required: true
    },
    targetDuration: {
      type: String,
      required: true
    },
    evaluatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    evaluatorFeedback: {
      type: String,
      trim: true
    },
    evaluatorRating: {
      type: Number,
      min: 1,
      max: 5
    },
    completedAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Speech = mongoose.model<ISpeech>("Speech" , speechSchema);

export default Speech ; 