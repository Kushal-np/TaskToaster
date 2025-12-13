import mongoose from "mongoose";
import { Response } from "express";
import { Agenda } from "../model/agenda.model";
import Meeting from "../model/meeting.model";
import { IAgendaItemInput } from "../types";
import { AuthRequest } from "../middleware/auth.middleware";

export const createAgenda = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;
    const { items } = req.body;

    // Validation
    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        message: "Agenda items are required and must be a non-empty array",
      });
      return;
    }

    // Check if meeting exists
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      res.status(404).json({
        success: false,
        message: "Meeting not found",
      });
      return;
    }

    // Check if agenda already exists
    const existingAgenda = await Agenda.findOne({ meetingId: meeting._id });
    if (existingAgenda) {
      res.status(409).json({
        success: false,
        message: "Agenda already exists for this meeting",
      });
      return;
    }

    const mappedItems: IAgendaItemInput[] = items.map((item: any, index: number) => ({
      time: item.time,
      role: item.role,
      assignedTo: item.assignedTo || null,
      assignedToModel: item.assignedToModel || "User",
      assignedToName: item.assignedToName || "",
      allocatedTime: item.allocatedTime,
      sequence: index + 1,
    }));

    // Create agenda
    const agenda = await Agenda.create({
      meetingId: meeting._id,
      items: mappedItems,
    });

    res.status(201).json({
      success: true,
      message: "Agenda created successfully",
      data: agenda,
    });
  } catch (error: any) {
    console.error("Create agenda error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating agenda",
      error: error.message,
    });
  }
};

export const updateAgenda = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        message: "Items array is required and cannot be empty",
      });
      return;
    }

    const mappedItems: IAgendaItemInput[] = items.map((item: any, index: number) => ({
      time: item.time,
      role: item.role,
      assignedTo: item.assignedTo || null,
      assignedToModel: item.assignedToModel || "User",
      assignedToName: item.assignedToName || "",
      allocatedTime: item.allocatedTime,
      sequence: index + 1,
    }));

    const agenda = await Agenda.findOneAndUpdate(
      { meetingId: new mongoose.Types.ObjectId(meetingId) },
      { items: mappedItems },
      { new: true, runValidators: true }
    );

    if (!agenda) {
      res.status(404).json({
        success: false,
        message: "Agenda not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Agenda updated successfully",
      data: agenda,
    });
  } catch (error: any) {
    console.error("Update agenda error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating agenda",
      error: error.message,
    });
  }
};

export const getAgenda = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { meetingId } = req.params;

    const agenda = await Agenda.findOne({ meetingId: new mongoose.Types.ObjectId(meetingId) })
      .populate("items.assignedTo", "name email phone");

    if (!agenda) {
      res.status(404).json({
        success: false,
        message: "Agenda not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: agenda,
    });
  } catch (error: any) {
    console.error("Get agenda error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching agenda",
      error: error.message,
    });
  }
};