import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { TableTopic } from "../model/tableTopic.model";
import Meeting from "../model/meeting.model";
import mongoose from "mongoose";

export const recordTableTopic = async (req: AuthRequest, res: Response) => {
  try {
    const {
      meetingId,
      participantId,
      guestId,
      participantModel,
      participantName,
      topic,
      duration,
      targetDuration,
      rating,
      notes
    } = req.body;

    if (!meetingId || !participantName || !topic || !duration) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
    }

    const tableTopic = await TableTopic.create({
      meetingId,
      participantId,
      guestId,
      participantModel: participantModel || 'User',
      participantName,
      topic,
      duration,
      targetDuration: targetDuration || "2 mins",
      rating,
      notes
    });

    const populated = await TableTopic.findById(tableTopic._id)
      .populate('participantId', 'name email')
      .populate('guestId', 'name email');

    res.status(201).json({
      success: true,
      message: "Table topic recorded successfully",
      data: populated
    });
  } catch (error: any) {
    console.error("Record table topic error:", error);
    res.status(500).json({
      success: false,
      message: "Error recording table topic",
      error: error.message
    });
  }
};

export const getUserTableTopics = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const tableTopics = await TableTopic.find({ participantId: new mongoose.Types.ObjectId( userId) })
      .populate('meetingId', 'theme meetingDate clubId')
      .sort({ completedAt: -1 });

    res.status(200).json({
      success: true,
      data: tableTopics
    });
  } catch (error: any) {
    console.error("Get user table topics error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching table topics",
      error: error.message
    });
  }
};

export const getMeetingTableTopics = async (req: AuthRequest, res: Response) => {
  try {
    const { meetingId } = req.params;

    const tableTopics = await TableTopic.find({ meetingId : new mongoose.Types.ObjectId(meetingId) })
      .populate('participantId', 'name email')
      .populate('guestId', 'name email')
      .sort({ completedAt: 1 });

    res.status(200).json({
      success: true,
      data: tableTopics
    });
  } catch (error: any) {
    console.error("Get meeting table topics error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching table topics",
      error: error.message
    });
  }
};

export const updateTableTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const tableTopic = await TableTopic.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('participantId', 'name email')
     .populate('guestId', 'name email');

    if (!tableTopic) {
      return res.status(404).json({
        success: false,
        message: "Table topic not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Table topic updated successfully",
      data: tableTopic
    });
  } catch (error: any) {
    console.error("Update table topic error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating table topic",
      error: error.message
    });
  }
};

export const deleteTableTopic = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const tableTopic = await TableTopic.findByIdAndDelete(id);

    if (!tableTopic) {
      return res.status(404).json({
        success: false,
        message: "Table topic not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Table topic deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete table topic error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting table topic",
      error: error.message
    });
  }
};