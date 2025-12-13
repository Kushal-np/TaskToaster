import mongoose, { Schema } from "mongoose";
import { IMeeting, MeetingStatus } from "../types";

const meetingSchema = new Schema<IMeeting>(
    {
        clubId: {
            type: Schema.Types.ObjectId,
            ref: "Club",
            required: true,
        },
        meetingNumber: {
            type: Number,
            required: true,
        },
        theme: {
            type: String,
            required: [true, "Meeting theme is required"],
            trim: true,
        },
        meetingDate: {
            type: Date,
            required: [true, "Meeting date is required"],
        },
        startTime: {
            type: String,
            required: [true, "Start time is required"],

        },
        toastmasterOfDay: {
            type: Schema.Types.ObjectId,
            refPath: 'toastmasterofDayModel'
        },

        status: {
            type: String,
            enum: Object.values(MeetingStatus)
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
)
meetingSchema.index({clubId:1 , meetingDate:-1});
meetingSchema.index({clubId:1 , meetingNumber:1},{unique:true});

const Meeting = mongoose.model<IMeeting>('Meeting' , meetingSchema);
export default Meeting ; 
