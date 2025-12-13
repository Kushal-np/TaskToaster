import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { AgendaItem } from "../model/agendaItem.model";
import Meeting from "../model/meeting.model";
import mongoose from "mongoose";

export const createAgendaItem = async (req: AuthRequest, res: Response) => {
  try {
    const { meetingId } = req.params;
    const { time, role, assignedTo, assignedToName, allocatedTime, sequence } = req.body;

    if (!meetingId) {
      return res.status(400).json({ success: false, message: "meetingId is required" });
    }

    // Validate required fields
    if (!time || !role || sequence === undefined || !allocatedTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Check meeting exists
    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    // Shift sequences for items at or after the new sequence
    await AgendaItem.updateMany(
      { meetingId, sequence: { $gte: sequence } },
      { $inc: { sequence: 1 } }
    );

    // Create agenda item
    const agendaItem = await AgendaItem.create({
      meetingId,
      time,
      role,
      assignedTo: assignedTo || undefined,
      assignedToName: assignedToName || "",
      allocatedTime,
      sequence,
    });

    return res.status(201).json({ 
      success: true, 
      message: "Agenda item created", 
      data: agendaItem 
    });
  } catch (error: any) {
    console.error("Create agenda item error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Error creating agenda item", 
      error: error.message 
    });
  }
};

export const updateAgendaItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // If sequence is being updated, handle reordering
    if (updates.sequence !== undefined) {
      const currentItem = await AgendaItem.findById(id);
      if (!currentItem) {
        return res.status(404).json({ success: false, message: "Agenda item not found" });
      }

      const oldSequence = currentItem.sequence;
      const newSequence = updates.sequence;

      if (oldSequence !== newSequence) {
        // Moving item down (increasing sequence)
        if (newSequence > oldSequence) {
          await AgendaItem.updateMany(
            {
              meetingId: currentItem.meetingId,
              sequence: { $gt: oldSequence, $lte: newSequence },
              _id: { $ne: new mongoose.Types.ObjectId(id) } // Convert to ObjectId
            },
            { $inc: { sequence: -1 } }
          );
        }
        // Moving item up (decreasing sequence)
        else {
          await AgendaItem.updateMany(
            {
              meetingId: currentItem.meetingId,
              sequence: { $gte: newSequence, $lt: oldSequence },
              _id: { $ne: new mongoose.Types.ObjectId(id) } // Convert to ObjectId
            },
            { $inc: { sequence: 1 } }
          );
        }
      }
    }

    const updatedItem = await AgendaItem.findByIdAndUpdate(
      id, 
      updates, 
      { new: true, runValidators: true }
    ).populate("assignedTo", "name email phone");

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Agenda item not found" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Agenda item updated", 
      data: updatedItem 
    });
  } catch (error: any) {
    console.error("Update agenda item error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error updating agenda item", 
      error: error.message 
    });
  }
};

export const deleteAgendaItem = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await AgendaItem.findById(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Agenda item not found" });
    }

    // Shift down all items after this one
    await AgendaItem.updateMany(
      { meetingId: deleted.meetingId, sequence: { $gt: deleted.sequence } },
      { $inc: { sequence: -1 } }
    );

    await AgendaItem.findByIdAndDelete(id);

    res.status(200).json({ 
      success: true, 
      message: "Agenda item deleted" 
    });
  } catch (error: any) {
    console.error("Delete agenda item error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error deleting agenda item", 
      error: error.message 
    });
  }
};

export const getAgendaItems = async (req: AuthRequest, res: Response) => {
  try {
    const { meetingId } = req.params;

    if (!meetingId) {
      return res.status(400).json({ 
        success: false, 
        message: "meetingId is required" 
      });
    }

    const items = await AgendaItem.find({ meetingId })
      .sort({ sequence: 1 })
      .populate("assignedTo", "name email phone");

    res.status(200).json({ 
      success: true, 
      data: items 
    });
  } catch (error: any) {
    console.error("Get agenda items error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Error fetching agenda items", 
      error: error.message 
    });
  }
};