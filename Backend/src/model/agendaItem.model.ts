import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAgendaItem extends Document {
  _id: Types.ObjectId;
  meetingId: Types.ObjectId;
  time: string;
  role: string;
  assignedTo?: Types.ObjectId;
  assignedToName?: string;
  allocatedTime: string;
  sequence: number;
  createdAt: Date;
  updatedAt: Date;
}

const agendaItemSchema = new Schema<IAgendaItem>(
  {
    meetingId: {
      type: Schema.Types.ObjectId,
      ref: "Meeting",
      required: true,
    },
    time: { type: String, required: true },
    role: { type: String, required: true, trim: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User" },
    assignedToName: { type: String },
    allocatedTime: { type: String, required: true },
    sequence: { type: Number, required: true },
  },
  { timestamps: true }
);

agendaItemSchema.index({ meetingId: 1, sequence: 1 }, { unique: true });

export const AgendaItem = mongoose.model<IAgendaItem>(
  "AgendaItem",
  agendaItemSchema
);