import mongoose, { Schema, Document } from "mongoose";
import { IMeeting } from "../types/meeting";


export interface IMeetingDocument extends IMeeting, Document { }

const MeetingSchema: Schema<IMeetingDocument> = new Schema({
    meetingNumber: {
        type: Number,
        requried: true
    },
    theme: {
        type: String,
        required: true,
    },
    meetingDate: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true,
    },
    tmod: {
        type: Schema.Types.ObjectId,
        ref: "Member",
        required: true
    }
}, {
    timestamps: true
})