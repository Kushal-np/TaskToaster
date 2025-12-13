import mongoose from "mongoose";
import dotenv from "dotenv";
import { AgendaTemplate } from "../model/agendaTemplate.model";

dotenv.config();

const defaultTemplates = [
  {
    name: "Standard Meeting",
    description: "Standard Toastmasters meeting format",
    items: [
      {
        time: "17:30",
        role: "SAA",
        allocatedTime: "2 mins",
        sequence: 1,
        isRequired: true,
        description: "Sergeant at Arms prepares the meeting and greets guests"
      },
      {
        time: "17:32",
        role: "Presiding Officer",
        allocatedTime: "5 mins",
        sequence: 2,
        isRequired: true,
        description: "Presiding Officer calls meeting to order and welcomes guests"
      },
      {
        time: "17:37",
        role: "TMoD",
        allocatedTime: "3 mins",
        sequence: 3,
        isRequired: true,
        description: "Toastmaster of the Day introduces theme and meeting roles"
      },
      {
        time: "17:40",
        role: "Timer",
        allocatedTime: "2 mins",
        sequence: 4,
        isRequired: false,
        description: "Timer explains timing rules"
      },
      {
        time: "17:42",
        role: "Ah-Counter",
        allocatedTime: "2 mins",
        sequence: 5,
        isRequired: false,
        description: "Ah-Counter explains their role"
      },
      {
        time: "17:44",
        role: "Grammarian",
        allocatedTime: "2 mins",
        sequence: 6,
        isRequired: false,
        description: "Grammarian presents word of the day"
      },
      {
        time: "17:46",
        role: "Speaker",
        allocatedTime: "7 mins",
        sequence: 7,
        isRequired: false,
        description: "Prepared Speech 1"
      },
      {
        time: "17:53",
        role: "Speaker",
        allocatedTime: "7 mins",
        sequence: 8,
        isRequired: false,
        description: "Prepared Speech 2"
      },
      {
        time: "18:00",
        role: "Speaker",
        allocatedTime: "7 mins",
        sequence: 9,
        isRequired: false,
        description: "Prepared Speech 3"
      },
      {
        time: "18:07",
        role: "Table Topics Master",
        allocatedTime: "15 mins",
        sequence: 10,
        isRequired: false,
        description: "Table Topics Session"
      },
      {
        time: "18:22",
        role: "General Evaluator",
        allocatedTime: "3 mins",
        sequence: 11,
        isRequired: true,
        description: "General Evaluator introduces evaluation session"
      },
      {
        time: "18:25",
        role: "Evaluator",
        allocatedTime: "3 mins",
        sequence: 12,
        isRequired: false,
        description: "Speech Evaluation 1"
      },
      {
        time: "18:28",
        role: "Evaluator",
        allocatedTime: "3 mins",
        sequence: 13,
        isRequired: false,
        description: "Speech Evaluation 2"
      },
      {
        time: "18:31",
        role: "Evaluator",
        allocatedTime: "3 mins",
        sequence: 14,
        isRequired: false,
        description: "Speech Evaluation 3"
      },
      {
        time: "18:34",
        role: "Grammarian",
        allocatedTime: "2 mins",
        sequence: 15,
        isRequired: false,
        description: "Grammarian Report"
      },
      {
        time: "18:36",
        role: "Ah-Counter",
        allocatedTime: "2 mins",
        sequence: 16,
        isRequired: false,
        description: "Ah-Counter Report"
      },
      {
        time: "18:38",
        role: "Timer",
        allocatedTime: "2 mins",
        sequence: 17,
        isRequired: false,
        description: "Timer Report"
      },
      {
        time: "18:40",
        role: "General Evaluator",
        allocatedTime: "4 mins",
        sequence: 18,
        isRequired: true,
        description: "General Evaluation"
      },
      {
        time: "18:44",
        role: "Ballot Counter",
        allocatedTime: "2 mins",
        sequence: 19,
        isRequired: false,
        description: "Ballot Counter announces results"
      },
      {
        time: "18:46",
        role: "TMoD",
        allocatedTime: "2 mins",
        sequence: 20,
        isRequired: true,
        description: "TMoD concludes the meeting"
      },
      {
        time: "18:48",
        role: "Presiding Officer",
        allocatedTime: "2 mins",
        sequence: 21,
        isRequired: true,
        description: "Presiding Officer adjourns the meeting"
      }
    ],
    isDefault: true
  },
  {
    name: "Contest Meeting",
    description: "Toastmasters contest format",
    items: [
      {
        time: "17:30",
        role: "SAA",
        allocatedTime: "2 mins",
        sequence: 1,
        isRequired: true,
        description: "Sergeant at Arms prepares the contest venue"
      },
      {
        time: "17:32",
        role: "Contest Chair",
        allocatedTime: "5 mins",
        sequence: 2,
        isRequired: true,
        description: "Contest Chair opens and explains contest rules"
      },
      {
        time: "17:37",
        role: "Chief Judge",
        allocatedTime: "3 mins",
        sequence: 3,
        isRequired: true,
        description: "Chief Judge briefs judges and contestants"
      },
      {
        time: "17:40",
        role: "Contestant",
        allocatedTime: "7 mins",
        sequence: 4,
        isRequired: false,
        description: "Contest Speech 1"
      },
      {
        time: "17:47",
        role: "Contestant",
        allocatedTime: "7 mins",
        sequence: 5,
        isRequired: false,
        description: "Contest Speech 2"
      },
      {
        time: "17:54",
        role: "Contestant",
        allocatedTime: "7 mins",
        sequence: 6,
        isRequired: false,
        description: "Contest Speech 3"
      },
      {
        time: "18:01",
        role: "Chief Judge",
        allocatedTime: "10 mins",
        sequence: 7,
        isRequired: true,
        description: "Judging and tabulation"
      },
      {
        time: "18:11",
        role: "Contest Chair",
        allocatedTime: "5 mins",
        sequence: 8,
        isRequired: true,
        description: "Announcement of results and awards"
      }
    ],
    isDefault: true
  }
];

const seedTemplates = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    const existingCount = await AgendaTemplate.countDocuments({ isDefault: true });
    
    if (existingCount > 0) {
      console.log(`${existingCount} default templates already exist. Skipping seed.`);
      process.exit(0);
    }

    const systemUserId = new mongoose.Types.ObjectId();

    const templatesWithUser = defaultTemplates.map(template => ({
      ...template,
      createdBy: systemUserId
    }));

    await AgendaTemplate.insertMany(templatesWithUser);
    console.log("✅ Default templates seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding templates:", error);
    process.exit(1);
  }
};

seedTemplates();