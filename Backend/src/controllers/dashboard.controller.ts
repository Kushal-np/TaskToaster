import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { RoleHistory } from "../model/roleHistory.model";
import { TableTopic } from "../model/tableTopic.model";
import Meeting from "../model/meeting.model";
import { Club } from "../model/club.model";
import { AgendaItem } from "../model/agendaItem.model";
import { MeetingStatus } from "../types";
import Speech from "../model/speech.model";
import mongoose from "mongoose";

export const getUserDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
    }

    // Get user's clubs
    const clubs = await Club.find({ members: userId }).select('clubName clubNumber');

    // Get upcoming meetings
    const upcomingMeetings = await Meeting.find({
      clubId: { $in: clubs.map(c => c._id) },
      meetingDate: { $gte: new Date() },
      status: { $in: [MeetingStatus.DRAFT, MeetingStatus.SCHEDULED] }
    })
    .populate('clubId', 'clubName')
    .sort({ meetingDate: 1 })
    .limit(5);

    // Get recent meetings
    const recentMeetings = await Meeting.find({
      clubId: { $in: clubs.map(c => c._id) },
      status: MeetingStatus.COMPLETED
    })
    .populate('clubId', 'clubName')
    .sort({ meetingDate: -1 })
    .limit(10);

    // Get assigned roles in upcoming meetings
    const upcomingRoles = await AgendaItem.find({
      meetingId: { $in: upcomingMeetings.map(m => m._id) },
      assignedTo: userId,
      assignedToModel: 'User'
    }).populate('meetingId', 'theme meetingDate clubId');

    // Get role history
    const roleHistory = await RoleHistory.find({ userId })
      .populate('meetingId', 'theme meetingDate')
      .sort({ completedAt: -1 })
      .limit(20);

    // Calculate role statistics
    const roleStats = {
      totalRoles: roleHistory.length,
      roleBreakdown: {} as any,
      averageRating: 0
    };

    let totalRating = 0;
    let ratedCount = 0;

    roleHistory.forEach(item => {
      if (!roleStats.roleBreakdown[item.role]) {
        roleStats.roleBreakdown[item.role] = 0;
      }
      roleStats.roleBreakdown[item.role]++;

      if (item.rating) {
        totalRating += item.rating;
        ratedCount++;
      }
    });

    if (ratedCount > 0) {
      roleStats.averageRating = parseFloat((totalRating / ratedCount).toFixed(2));
    }

    // Get speeches
    const speeches = await Speech.find({ speakerId: userId })
      .populate('meetingId', 'theme meetingDate')
      .sort({ completedAt: -1 })
      .limit(10);

    const speechStats = {
      totalSpeeches: speeches.length,
      pathwaysProgress: {} as any,
      averageRating: 0
    };

    let speechRatingTotal = 0;
    let speechRatedCount = 0;

    speeches.forEach(speech => {
      if (speech.pathwaysProject) {
        const key = `${speech.pathwaysProject.pathway} - ${speech.pathwaysProject.level}`;
        if (!speechStats.pathwaysProgress[key]) {
          speechStats.pathwaysProgress[key] = 0;
        }
        speechStats.pathwaysProgress[key]++;
      }

      if (speech.evaluatorRating) {
        speechRatingTotal += speech.evaluatorRating;
        speechRatedCount++;
      }
    });

    if (speechRatedCount > 0) {
      speechStats.averageRating = parseFloat((speechRatingTotal / speechRatedCount).toFixed(2));
    }

    // Get table topics
    const tableTopics = await TableTopic.find({ participantId: userId })
      .populate('meetingId', 'theme meetingDate')
      .sort({ completedAt: -1 })
      .limit(10);

    const tableTopicStats = {
      total: tableTopics.length,
      averageRating: 0
    };

    let ttRatingTotal = 0;
    let ttRatedCount = 0;

    tableTopics.forEach(tt => {
      if (tt.rating) {
        ttRatingTotal += tt.rating;
        ttRatedCount++;
      }
    });

    if (ttRatedCount > 0) {
      tableTopicStats.averageRating = parseFloat((ttRatingTotal / ttRatedCount).toFixed(2));
    }

    res.status(200).json({
      success: true,
      data: {
        clubs,
        upcomingMeetings,
        upcomingRoles,
        recentMeetings: recentMeetings.slice(0, 5),
        roleHistory: roleHistory.slice(0, 10),
        roleStats,
        speeches,
        speechStats,
        tableTopics,
        tableTopicStats
      }
    });
  } catch (error: any) {
    console.error("Get dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
      error: error.message
    });
  }
};

export const getClubDashboard = async (req: AuthRequest, res: Response) => {
  try {
    const { clubId } = req.params;

    const club = await Club.findById(clubId)
      .populate('members', 'name email')
      .populate('createdBy', 'name email');

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    // Get meeting statistics
    const totalMeetings = await Meeting.countDocuments({ clubId : new mongoose.Types.ObjectId(clubId)});
    const completedMeetings = await Meeting.countDocuments({ 
      clubId: new mongoose.Types.ObjectId(clubId), 
      status: MeetingStatus.COMPLETED 
    });
    const upcomingMeetings = await Meeting.find({
      clubId : new mongoose.Types.ObjectId(clubId),
      meetingDate: { $gte: new Date() },
      status: { $in: [MeetingStatus.DRAFT, MeetingStatus.SCHEDULED] }
    }).sort({ meetingDate: 1 });

    // Get next meeting
    const nextMeeting = upcomingMeetings[0] || null;

    // Member participation stats
    const memberParticipation = await Promise.all(
      club.members.map(async (memberId: any) => {
        const roleCount = await RoleHistory.countDocuments({ userId: memberId });
        const speechCount = await Speech.countDocuments({ speakerId: memberId });
        const ttCount = await TableTopic.countDocuments({ participantId: memberId });

        return {
          memberId,
          totalParticipation: roleCount + speechCount + ttCount,
          roles: roleCount,
          speeches: speechCount,
          tableTopics: ttCount
        };
      })
    );

    res.status(200).json({
      success: true,
      data: {
        club,
        stats: {
          totalMembers: club.members.length,
          totalMeetings,
          completedMeetings,
          upcomingMeetingsCount: upcomingMeetings.length
        },
        nextMeeting,
        upcomingMeetings: upcomingMeetings.slice(0, 5),
        memberParticipation: memberParticipation.sort((a, b) => 
          b.totalParticipation - a.totalParticipation
        )
      }
    });
  } catch (error: any) {
    console.error("Get club dashboard error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching club dashboard",
      error: error.message
    });
  }
};