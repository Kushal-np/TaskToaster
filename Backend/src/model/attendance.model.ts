import mongoose, { Schema } from "mongoose";
import { IAttendance } from "../types";

const attendanceSchema = new Schema<IAttendance>(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "Guest"
    },
    attendeeModel: {
      type: String,
      enum: ['User', 'Guest'],
      required: true
    },
    attendeeName: {
      type: String,
      required: true,
      trim: true
    },
    checkInTime: {
      type: Date
    },
    checkOutTime: {
      type: Date
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'late'],
      default: 'present'
    }
  },
  { timestamps: true }
);

attendanceSchema.index({ meetingId: 1 });
attendanceSchema.index({ userId: 1, meetingId: 1 }, { unique: true, sparse: true });
attendanceSchema.index({ guestId: 1, meetingId: 1 }, { unique: true, sparse: true });

export const Attendance = mongoose.model<IAttendance>("Attendance", attendanceSchema);