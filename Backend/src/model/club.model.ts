import mongoose, { Schema, Model } from "mongoose";
import { IClub } from "../types";

const clubSchema = new Schema<IClub>(
  {
    clubName: {
      type: String,
      required: true,
      trim: true
    },
    clubNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    region: {
      type: String,
      required: true,
      trim: true
    },
    district: {
      type: String,
      required: true,
      trim: true
    },
    division: {
      type: String,
      required: true,
      trim: true
    },
    area: {
      type: String,
      required: true,
      trim: true
    },
    charteredDate: {
      type: Date,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    members: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }]
  },
  {
    timestamps: true
  }
);

export const Club: Model<IClub> = mongoose.model<IClub>("Club", clubSchema);