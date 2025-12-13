import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { RoleHistory } from "../model/roleHistory.model";
import Meeting from "../model/meeting.model";
import { AgendaItem } from "../model/agendaItem.model";
import mongoose from "mongoose";

export const recordRoleHistory = async (req: AuthRequest, res: Response) => {
  try {
    const {
      userId,
      guestId,
      userModel,
      participantName,
      meetingId,
      role,
      feedback,
      rating
    } = req.body;

    if (!meetingId || !role || !participantName) {
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

    const roleHistory = await RoleHistory.create({
      userId,
      guestId,
      userModel: userModel || 'User',
      participantName,
      meetingId,
      role,
      feedback,
      rating,
      givenBy: new mongoose.Types.ObjectId(req.user?._id)
    });

    const populated = await RoleHistory.findById(roleHistory._id)
      .populate('userId', 'name email')
      .populate('guestId', 'name email')
      .populate('meetingId', 'theme meetingDate')
      .populate('givenBy', 'name email');

    res.status(201).json({
      success: true,
      message: "Role history recorded successfully",
      data: populated
    });
  } catch (error: any) {
    console.error("Record role history error:", error);
    res.status(500).json({
      success: false,
      message: "Error recording role history",
      error: error.message
    });
  }
};

export const getUserRoleHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;
    const { role } = req.query;

    const filter: any = { userId };
    if (role) {
      filter.role = role;
    }

    const roleHistory = await RoleHistory.find(filter)
      .populate('meetingId', 'theme meetingDate clubId')
      .populate('givenBy', 'name email')
      .sort({ completedAt: -1 });

    // Calculate statistics
    const stats = {
      totalRoles: roleHistory.length,
      roleBreakdown: {} as any,
      averageRating: 0
    };

    let totalRating = 0;
    let ratedCount = 0;

    roleHistory.forEach(item => {
      // Count roles
      if (!stats.roleBreakdown[item.role]) {
        stats.roleBreakdown[item.role] = 0;
      }
      stats.roleBreakdown[item.role]++;

      // Calculate average rating
      if (item.rating) {
        totalRating += item.rating;
        ratedCount++;
      }
    });

    if (ratedCount > 0) {
      stats.averageRating = totalRating / ratedCount;
    }

    res.status(200).json({
      success: true,
      data: roleHistory,
      stats
    });
  } catch (error: any) {
    console.error("Get user role history error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching role history",
      error: error.message
    });
  }
};

export const getMeetingRoleHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { meetingId } = req.params;

    const roleHistory = await RoleHistory.find({ meetingId : new mongoose.Types.ObjectId(meetingId) })
      .populate('userId', 'name email')
      .populate('guestId', 'name email')
      .populate('givenBy', 'name email')
      .sort({ completedAt: 1 });

    res.status(200).json({
      success: true,
      data: roleHistory
    });
  } catch (error: any) {
    console.error("Get meeting role history error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching role history",
      error: error.message
    });
  }
};

export const updateRoleHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const roleHistory = await RoleHistory.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('userId', 'name email')
     .populate('guestId', 'name email')
     .populate('meetingId', 'theme meetingDate')
     .populate('givenBy', 'name email');

    if (!roleHistory) {
      return res.status(404).json({
        success: false,
        message: "Role history not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Role history updated successfully",
      data: roleHistory
    });
  } catch (error: any) {
    console.error("Update role history error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating role history",
      error: error.message
    });
  }
};

export const deleteRoleHistory = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const roleHistory = await RoleHistory.findByIdAndDelete(id);

    if (!roleHistory) {
      return res.status(404).json({
        success: false,
        message: "Role history not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Role history deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete role history error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting role history",
      error: error.message
    });
  }
};

// Automatically create role history when meeting is completed
export const autoGenerateRoleHistory = async (meetingId: string) => {
  try {
    const agendaItems = await AgendaItem.find({ meetingId, assignedTo: { $exists: true } });

    const roleHistoryRecords = agendaItems
      .filter(item => item.assignedTo)
      .map(item => ({
        userId: item.assignedToModel === 'User' ? item.assignedTo : undefined,
        guestId: item.assignedToModel === 'Guest' ? item.assignedTo : undefined,
        userModel: item.assignedToModel,
        participantName: item.assignedToName || '',
        meetingId,
        role: item.role,
        completedAt: new Date()
      }));

    if (roleHistoryRecords.length > 0) {
      await RoleHistory.insertMany(roleHistoryRecords);
    }

    return true;
  } catch (error) {
    console.error("Auto-generate role history error:", error);
    return false;
  }
};