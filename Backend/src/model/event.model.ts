import mongoose , { Schema } from "mongoose";
import { IEvent } from "../types";


const eventSchema = new Schema<IEvent>(
  {
    clubId: {
      type: Schema.Types.ObjectId,
      ref: "Club",
      required: true
    },
    eventName: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    eventDate: {
      type: Date,
      required: true
    },
    eventTime: {
      type: String,
      required: true
    },
    venue: {
      type: String,
      required: true,
      trim: true
    },
    venueType: {
      type: String,
      enum: ['online', 'offline', 'hybrid'],
      default: 'offline'
    },
    speaker: {
      type: String,
      trim: true
    },
    speakerTitle: {
      type: String,
      trim: true
    },
    topic: {
      type: String,
      trim: true
    },
    registrationLink: {
      type: String,
      trim: true
    },
    whatsappLink: {
      type: String,
      trim: true
    },
    zoomLink: {
      type: String,
      trim: true
    },
    attendees: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
    maxAttendees: {
      type: Number
    },
    isPublic: {
      type: Boolean,
      default: true
    },
    eventType: {
      type: String,
      enum: ['workshop', 'contest', 'meeting', 'social', 'other'],
      default: 'other'
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

eventSchema.index({ clubId: 1, eventDate: -1 });
eventSchema.index({ eventDate: 1 }); 
eventSchema.index({ isPublic: 1 });


export const Event = mongoose.model<IEvent>("Event", eventSchema);