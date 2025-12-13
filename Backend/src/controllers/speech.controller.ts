import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import Meeting from "../model/meeting.model";
import Speech from "../model/speech.model";
import mongoose from "mongoose";

export const recordSpeech = async (req: AuthRequest, res: Response) => {
  try {
    const {
      speakerId,
      speakerModel,
      speakerName,
      meetingId,
      title,
      speechType,
      pathwaysProject,
      objectives,
      duration,
      targetDuration,
      evaluatorId,
      evaluatorFeedback,
      evaluatorRating
    } = req.body;

    if (!speakerId || !meetingId || !title || !duration || !targetDuration) {
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

    const speech = await Speech.create({
      speakerId,
      speakerModel: speakerModel || 'User',
      speakerName,
      meetingId,
      title,
      speechType: speechType || 'prepared',
      pathwaysProject,
      objectives,
      duration,
      targetDuration,
      evaluatorId,
      evaluatorFeedback,
      evaluatorRating
    });

    const populated = await Speech.findById(speech._id)
      .populate('speakerId', 'name email')
      .populate('evaluatorId', 'name email');

    res.status(201).json({
      success: true,
      message: "Speech recorded successfully",
      data: populated
    });
  } catch (error: any) {
    console.error("Record speech error:", error);
    res.status(500).json({
      success: false,
      message: "Error recording speech",
      error: error.message
    });
  }
};

export const getUserSpeeches = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const speeches = await Speech.find({ speakerId: new mongoose.Types.ObjectId(userId) })
      .populate('meetingId', 'theme meetingDate clubId')
      .populate('evaluatorId', 'name email')
      .sort({ completedAt: -1 });

    res.status(200).json({
      success: true,
      data: speeches
    });
  } catch (error: any) {
    console.error("Get user speeches error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching speeches",
      error: error.message
    });
  }
};

export const getMeetingSpeeches = async (req: AuthRequest, res: Response) => {
  try {
    const { meetingId } = req.params;

    const speeches = await Speech.find({ meetingId  :new mongoose.Types.ObjectId(meetingId)})
      .populate('speakerId', 'name email')
      .populate('evaluatorId', 'name email')
      .sort({ completedAt: 1 });

    res.status(200).json({
      success: true,
      data: speeches
    });
  } catch (error: any) {
    console.error("Get meeting speeches error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching speeches",
      error: error.message
    });
  }
};

export const updateSpeech = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const speech = await Speech.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('speakerId', 'name email')
     .populate('evaluatorId', 'name email');

    if (!speech) {
      return res.status(404).json({
        success: false,
        message: "Speech not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech updated successfully",
      data: speech
    });
  } catch (error: any) {
    console.error("Update speech error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating speech",
      error: error.message
    });
  }
};

export const deleteSpeech = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const speech = await Speech.findByIdAndDelete(id);

    if (!speech) {
      return res.status(404).json({
        success: false,
        message: "Speech not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Speech deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete speech error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting speech",
      error: error.message
    });
  }
};