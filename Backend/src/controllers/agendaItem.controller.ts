import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { AgendaItem } from "../model/agendaItem.model";
import Meeting from "../model/meeting.model";
import { AgendaTemplate } from "../model/agendaTemplate.model";
import mongoose from "mongoose";
import { Agenda } from "../model/agenda.model";

export const createAgendaItem = async (req: AuthRequest, res: Response) => {
  try {
    const { meetingId } = req.params;
    const { time, role, assignedTo, assignedToModel, assignedToName, allocatedTime, sequence } = req.body;

    if (!meetingId) {
      return res.status(400).json({ success: false, message: "meetingId is required" });
    }

    if (!time || !role || sequence === undefined || !allocatedTime) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    // Shift sequences for items at or after the new sequence
    await AgendaItem.updateMany(
      { meetingId, sequence: { $gte: sequence } },
      { $inc: { sequence: 1 } }
    );

    const agendaItem = await AgendaItem.create({
      meetingId,
      time,
      role,
      assignedTo: assignedTo || undefined,
      assignedToModel: assignedToModel || 'User',
      assignedToName: assignedToName || "",
      allocatedTime,
      sequence,
    });

    const populated = await AgendaItem.findById(agendaItem._id)
      .populate('assignedTo', 'name email phone');

    return res.status(201).json({ 
      success: true, 
      message: "Agenda item created", 
      data: populated 
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

    if (updates.sequence !== undefined) {
      const currentItem = await AgendaItem.findById(id);
      if (!currentItem) {
        return res.status(404).json({ success: false, message: "Agenda item not found" });
      }

      const oldSequence = currentItem.sequence;
      const newSequence = updates.sequence;

      if (oldSequence !== newSequence) {
        if (newSequence > oldSequence) {
          await AgendaItem.updateMany(
            {
              meetingId: currentItem.meetingId,
              sequence: { $gt: oldSequence, $lte: newSequence },
              _id: { $ne: new mongoose.Types.ObjectId(id) }
            },
            { $inc: { sequence: -1 } }
          );
        } else {
          await AgendaItem.updateMany(
            {
              meetingId: currentItem.meetingId,
              sequence: { $gte: newSequence, $lt: oldSequence },
              _id: { $ne: new mongoose.Types.ObjectId(id) }
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

export const applyTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { meetingId } = req.params;
    const { templateId } = req.body;

    if (!templateId) {
      return res.status(400).json({
        success: false,
        message: "Template ID is required"
      });
    }

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) {
      return res.status(404).json({
        success: false,
        message: "Meeting not found"
      });
    }

    const template = await AgendaTemplate.findById(templateId);
    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    // Delete existing agenda items
    await AgendaItem.deleteMany({ meetingId: new mongoose.Types.ObjectId(meetingId) });

    // Create new items from template
    const agendaItems = template.items.map(item => ({
      meetingId,
      time: item.time,
      role: item.role,
      allocatedTime:  new mongoose.Types.ObjectId(item.allocatedItem),
      sequence: item.sequence
    }));

    const created = await AgendaItem.insertMany(agendaItems);

    // Increment template usage
    await AgendaTemplate.findByIdAndUpdate(templateId, {
      $inc: { timesUsed: 1 }
    });

    res.status(201).json({
      success: true,
      message: "Template applied successfully",
      data: created
    });
  } catch (error: any) {
    console.error("Apply template error:", error);
    res.status(500).json({
      success: false,
      message: "Error applying template",
      error: error.message
    });
  }
};

export const reorderAgendaItems = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { meetingId } = req.params;
    const { items } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      res.status(400).json({
        success: false,
        message: "Items array is required",
      });
      return;
    }

    // Build reordered items with updated sequence
    const reorderedItems = items.map((item: any, index: number) => ({
      _id: item._id,
      time: item.time,
      role: item.role,
      assignedTo: item.assignedTo
        ? new mongoose.Types.ObjectId(item.assignedTo)
        : undefined,
      assignedToModel: item.assignedToModel || "User",
      assignedToName: item.assignedToName || "",
      allocatedTime: item.allocatedTime,
      sequence: index + 1,
    }));

    const agenda = await Agenda.findOneAndUpdate(
      { meetingId: new mongoose.Types.ObjectId(meetingId) },
      { items: reorderedItems },
      { new: true, runValidators: true }
    ).populate("items.assignedTo", "name email phone");

    if (!agenda) {
      res.status(404).json({
        success: false,
        message: "Agenda not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Agenda items reordered successfully",
      data: agenda,
    });
  } catch (error: any) {
    console.error("Reorder agenda error:", error);
    res.status(500).json({
      success: false,
      message: "Error reordering agenda items",
      error: error.message,
    });
  }
};