import mongoose, { Schema, Document, Types } from "mongoose";

export interface IAgendaItem extends Document {
  _id: Types.ObjectId;
  meetingId: Types.ObjectId;
  time: string;
  role: string;
  assignedTo?: Types.ObjectId;
  assignedToModel: "User" | "Guest";
  assignedToName?: string;
  allocatedTime: string;
  sequence: number;
  isCompleted: boolean;
  actualDuration?: string;
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
    time: {
      type: String,
      required: true,
      match: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      enum: [
        "SAA",
        "Presiding Officer",
        "TMoD",
        "General Evaluator",
        "Grammarian",
        "Ah-Counter",
        "Timer",
        "Ballot Counter",
        "Table Topics Master",
        "Speaker",
        "Evaluator",
        "Other",
      ],
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      refPath: "assignedToModel",
    },
    assignedToModel: {
      type: String,
      enum: ["User", "Guest"],
      default: "User",
    },
    assignedToName: {
      type: String,
      trim: true,
    },
    allocatedTime: {
      type: String,
      required: true,
      match: /^\d+\s*(min|mins|minutes?)$/i,
    },
    sequence: {
      type: Number,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    actualDuration: {
      type: String,
    },
  },
  { timestamps: true }
);


agendaItemSchema.index({ meetingId: 1, sequence: 1 }, { unique: true });

agendaItemSchema.index({ role: 1 });

agendaItemSchema.pre("save", async function () {
  if (this.assignedTo && !this.assignedToName) {
    const Model = mongoose.model(this.assignedToModel);

    const assignedPerson = await Model.findById(this.assignedTo).select("name");

    if (assignedPerson) {
      this.assignedToName = assignedPerson.name;
    }
  }
});

export const AgendaItem = mongoose.model<IAgendaItem>(
  "AgendaItem",
  agendaItemSchema
);
