import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { AgendaTemplate } from "../model/agendaTemplate.model";
import mongoose from "mongoose";

export const createTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { name, description, items, clubId } = req.body;

    if (!name || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Template name and items are required"
      });
    }

    const template = await AgendaTemplate.create({
      name,
      description,
      items,
      clubId,
      isDefault: false,
      createdBy: new mongoose.Types.ObjectId(userId)
    });

    res.status(201).json({
      success: true,
      message: "Template created successfully",
      data: template
    });
  } catch (error: any) {
    console.error("Create template error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating template",
      error: error.message
    });
  }
};

export const getTemplates = async (req: AuthRequest, res: Response) => {
  try {
    const { clubId } = req.query;

    const filter: any = {
      $or: [
        { isDefault: true },
        { clubId: clubId || null }
      ]
    };

    const templates = await AgendaTemplate.find(filter)
      .populate('createdBy', 'name email')
      .sort({ isDefault: -1, timesUsed: -1 });

    res.status(200).json({
      success: true,
      data: templates
    });
  } catch (error: any) {
    console.error("Get templates error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching templates",
      error: error.message
    });
  }
};

export const getTemplateById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const template = await AgendaTemplate.findById(id)
      .populate('createdBy', 'name email');

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    res.status(200).json({
      success: true,
      data: template
    });
  } catch (error: any) {
    console.error("Get template error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching template",
      error: error.message
    });
  }
};

export const updateTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const updates = req.body;

    const template = await AgendaTemplate.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    // Only creator or admin can update
    if (template.createdBy.toString() !== userId && req.user?.role !== 'club_admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this template"
      });
    }

    const updatedTemplate = await AgendaTemplate.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Template updated successfully",
      data: updatedTemplate
    });
  } catch (error: any) {
    console.error("Update template error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating template",
      error: error.message
    });
  }
};

export const deleteTemplate = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const template = await AgendaTemplate.findById(id);

    if (!template) {
      return res.status(404).json({
        success: false,
        message: "Template not found"
      });
    }

    if (template.isDefault) {
      return res.status(403).json({
        success: false,
        message: "Cannot delete default templates"
      });
    }

    if (template.createdBy.toString() !== userId && req.user?.role !== 'club_admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this template"
      });
    }

    await AgendaTemplate.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Template deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete template error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting template",
      error: error.message
    });
  }
};