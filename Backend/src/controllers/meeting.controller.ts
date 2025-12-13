import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Meeting from "../model/meeting.model";
import { MeetingStatus } from "../types";
import { Club } from "../model/club.model";
import { Agenda } from "../model/agenda.model";
import mongoose from "mongoose";

export const createMeeting = async (
    req: AuthRequest,
    res: Response
): Promise<void> => {
    try {
        const userId = req.user?._id;

        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
            return;
        }

        const { clubId, theme, meetingDate, startTime, toastmasterOfDay } = req.body;

        // Required fields validation
        if (!clubId || !theme || !meetingDate || !startTime) {
            res.status(400).json({
                success: false,
                message: "Provide clubId, theme, meetingDate, and startTime",
            });
            return;
        }

        // Validate club existence
        const club = await Club.findById(clubId);
        if (!club) {
            res.status(404).json({
                success: false,
                message: "Club not found",
            });
            return;
        }

        // Check membership
        if (!club.members.includes(userId as any)) {
            res.status(403).json({
                success: false,
                message: "You must be a member of this club",
            });
            return;
        }

        // Generate next meeting number
        const lastMeeting = await Meeting.findOne({ clubId }).sort({ meetingNumber: -1 });
        const meetingNumber: number = lastMeeting ? lastMeeting.meetingNumber + 1 : 1;

        // Create meeting
        const meeting = await Meeting.create({
            clubId,
            meetingNumber,
            theme,
            meetingDate,
            startTime,
            toastmasterOfDay: toastmasterOfDay || userId,
            status: MeetingStatus.DRAFT,
            createdBy: userId,
        });

        res.status(201).json({
            success: true,
            message: "Meeting created successfully",
            data: meeting,
        });
    } catch (error: any) {
        console.error("Meeting creation error", error);
        res.status(500).json({
            success: false,
            message: "Error creating meeting",
            error: error.message || error,
        });
    }
};



export const getMeeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { clubid } = req.params; // optional: filter by club
    const { status } = req.query;   // optional: filter by meeting status

    const filter: any = {};

    if (clubid) {
      filter.clubId = new mongoose.Types.ObjectId(clubid);
    }

    if (status) {
      filter.status = status;
    }

    // Get all meetings matching filter
    const meetings = await Meeting.find(filter)
      .populate('clubId', 'clubName clubNumber')
      .populate('toastmasterOfDay', 'name email')
      .populate('createdBy', 'name email')
      .sort({ meetingDate: -1 });

    // Attach agenda for each meeting
    const meetingsWithAgendas = await Promise.all(
      meetings.map(async (meeting) => {
        const agenda = await Agenda.findOne({ meetingId: meeting._id });
        return {
          ...meeting.toObject(),
          agenda,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: meetingsWithAgendas,
    });
  } catch (error: any) {
    console.error("Get meetings error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching meetings",
      error: error.message,
    });
  }
};


export const getClubMeetings = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { clubId } = req.params;
    const { status } = req.query;

    const filter: any = { clubId };
    if (status) filter.status = status;

    const meetings = await Meeting.find(filter)
      .sort({ meetingDate: -1 })
      .populate('toastmasterOfDay', 'name')
      .populate('createdBy', 'name');

    res.status(200).json({
      success: true,
      data: meetings
    });
  } catch (error: any) {
    console.error('Get club meetings error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching meetings',
      error: error.message
    });
  }
};