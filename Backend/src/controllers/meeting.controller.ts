import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Meeting from "../model/meeting.model";
import { MeetingStatus } from "../types";
import { Club } from "../model/club.model";
import { AgendaItem } from "../model/agendaItem.model";
import { autoGenerateRoleHistory } from "./roleHistory.controller";
import mongoose from "mongoose";

export const createMeeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
      return;
    }

        const { 
            clubId, 
            theme, 
            meetingDate, 
            startTime, 
            toastmasterOfDay,
            venue,
            venueLink,
            onlineLink,
            onlineMeetingId,
            onlinePasscode,
            whatsappLink,
            resourceLinks,
            isHybrid
        } = req.body;

    if (!clubId || !theme || !meetingDate || !startTime) {
      res.status(400).json({
        success: false,
        message: "Provide clubId, theme, meetingDate, and startTime",
      });
      return;
    }

    const club = await Club.findById(clubId);
    if (!club) {
      res.status(404).json({
        success: false,
        message: "Club not found",
      });
      return;
    }

    if (!club.members.includes(userId as any)) {
      res.status(403).json({
        success: false,
        message: "You must be a member of this club",
      });
      return;
    }

    const lastMeeting = await Meeting.findOne({ clubId }).sort({ meetingNumber: -1 });
    const meetingNumber: number = lastMeeting ? lastMeeting.meetingNumber + 1 : 1;

    const meeting = await Meeting.create({
      clubId,
      meetingNumber,
      theme,
      meetingDate,
      startTime,
      toastmasterOfDay: toastmasterOfDay || userId,
      status: MeetingStatus.DRAFT,
                  venue,
            venueLink,
            onlineLink,
            onlineMeetingId,
            onlinePasscode,
            whatsappLink,
            resourceLinks: resourceLinks || [],
            isHybrid: isHybrid || false,
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
    const { clubid } = req.params;
    const { status } = req.query;

    const filter: any = {};

    if (clubid) {
      filter.clubId = new mongoose.Types.ObjectId(clubid);
    }

    if (status) {
      filter.status = status;
    }

    const meetings = await Meeting.find(filter)
      .populate('clubId', 'clubName clubNumber')
      .populate('toastmasterOfDay', 'name email')
      .populate('createdBy', 'name email')
      .sort({ meetingDate: -1 });

    const meetingsWithAgendas = await Promise.all(
      meetings.map(async (meeting) => {
        const agendaItems = await AgendaItem.find({ meetingId: meeting._id })
          .sort({ sequence: 1 })
          .populate('assignedTo', 'name email');
        return {
          ...meeting.toObject(),
          agendaItems,
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
    const { clubid } = req.params;
    const { status } = req.query;

    const filter: any = { clubId: clubid };
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

export const getMeetingById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findById(id)
      .populate('clubId', 'clubName clubNumber')
      .populate('toastmasterOfDay', 'name email phone')
      .populate('createdBy', 'name email')
      .populate('attendees', 'name email')
      .populate('guestAttendees', 'name email');

    if (!meeting) {
      res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
      return;
    }

    const agendaItems = await AgendaItem.find({ meetingId: new mongoose.Types.ObjectId(id) })
      .sort({ sequence: 1 })
      .populate('assignedTo', 'name email phone');

    res.status(200).json({
      success: true,
      data: {
        ...meeting.toObject(),
        agendaItems
      }
    });
  } catch (error: any) {
    console.error("Get meeting error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching meeting",
      error: error.message
    });
  }
};

export const updateMeeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const updates = req.body;

    const meeting = await Meeting.findById(id);
    if (!meeting) {
      res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
      return;
    }

    // Only TMoD, creator, or club admin can update
    if (
      meeting.toastmasterOfDay.toString() !== userId &&
      meeting.createdBy.toString() !== userId &&
      req.user?.role !== 'club_admin'
    ) {
      res.status(403).json({
        success: false,
        message: "Not authorized to update this meeting"
      });
      return;
    }

    const updatedMeeting = await Meeting.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('clubId', 'clubName')
     .populate('toastmasterOfDay', 'name email');

    res.status(200).json({
      success: true,
      message: "Meeting updated successfully",
      data: updatedMeeting
    });
  } catch (error: any) {
    console.error("Update meeting error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating meeting",
      error: error.message
    });
  }
};

export const updateMeetingStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?._id;

    if (!Object.values(MeetingStatus).includes(status)) {
      res.status(400).json({
        success: false,
        message: "Invalid meeting status"
      });
      return;
    }

    const meeting = await Meeting.findById(id);
    if (!meeting) {
      res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
      return;
    }

    // Only TMoD or club admin can change status
    if (
      meeting.toastmasterOfDay.toString() !== userId &&
      req.user?.role !== 'club_admin'
    ) {
      res.status(403).json({
        success: false,
        message: "Not authorized to change meeting status"
      });
      return;
    }
    
    // Auto-generate role history when completing meeting


    meeting.status = status;

    await meeting.save();

    res.status(200).json({
      success: true,
      message: `Meeting status updated to ${status}`,
      data: meeting
    });
  } catch (error: any) {
    console.error("Update meeting status error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating meeting status",
      error: error.message
    });
  }
};

export const deleteMeeting = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const meeting = await Meeting.findById(id);
    if (!meeting) {
      res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
      return;
    }

    // Only creator or club admin can delete
    if (
      meeting.createdBy.toString() !== userId &&
      req.user?.role !== 'club_admin'
    ) {
      res.status(403).json({
        success: false,
        message: "Not authorized to delete this meeting"
      });
      return;
    }

    // Delete associated agenda items
    await AgendaItem.deleteMany({ meetingId: new mongoose.Types.ObjectId(id) });

    await Meeting.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete meeting error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting meeting",
      error: error.message
    });
  }
};