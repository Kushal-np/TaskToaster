import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Event } from "../model/event.model";
import { Club } from "../model/club.model";
import mongoose from "mongoose";

export const createEvent = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const {
      clubId,
      eventName,
      description,
      eventDate,
      eventTime,
      venue,
      venueType,
      speaker,
      speakerTitle,
      topic,
      registrationLink,
      whatsappLink,
      zoomLink,
      maxAttendees,
      isPublic,
      eventType
    } = req.body;

    if (!clubId || !eventName || !description || !eventDate || !eventTime || !venue) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const club = await Club.findById(clubId);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found"
      });
    }

    const event = await Event.create({
      clubId,
      eventName,
      description,
      eventDate,
      eventTime,
      venue,
      venueType,
      speaker,
      speakerTitle,
      topic,
      registrationLink,
      whatsappLink,
      zoomLink,
      maxAttendees,
      isPublic,
      eventType,
      createdBy:  new mongoose.Types.ObjectId(userId)
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event
    });
  } catch (error: any) {
    console.error("Create event error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message
    });
  }
};

export const getClubEvents = async (req: AuthRequest, res: Response) => {
  try {
    const { clubId } = req.params;
    const { upcoming, eventType } = req.query;

    const filter: any = { clubId };

    if (upcoming === 'true') {
      filter.eventDate = { $gte: new Date() };
    }

    if (eventType) {
      filter.eventType = eventType;
    }

    const events = await Event.find(filter)
      .populate('createdBy', 'name email')
      .populate('attendees', 'name email phone')
      .sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error: any) {
    console.error("Get club events error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message
    });
  }
};

export const getEventById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id)
      .populate('createdBy', 'name email')
      .populate('attendees', 'name email phone')
      .populate('clubId', 'clubName clubNumber');

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      data: event
    });
  } catch (error: any) {
    console.error("Get event error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message
    });
  }
};

export const updateEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;
    const updates = req.body;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    if (event.createdBy.toString() !== userId && req.user?.role !== 'club_admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this event"
      });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    ).populate('attendees', 'name email phone');

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: updatedEvent
    });
  } catch (error: any) {
    console.error("Update event error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message
    });
  }
};

export const deleteEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    if (event.createdBy.toString() !== userId && req.user?.role !== 'club_admin') {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this event"
      });
    }

    await Event.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete event error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message
    });
  }
};

export const rsvpEvent = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    if (event.maxAttendees && event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({
        success: false,
        message: "Event is full"
      });
    }

    if (event.attendees.includes(userId as any)) {
      return res.status(400).json({
        success: false,
        message: "Already registered for this event"
      });
    }

    event.attendees.push(userId as any);
    await event.save();

    res.status(200).json({
      success: true,
      message: "Successfully registered for event",
      data: event
    });
  } catch (error: any) {
    console.error("RSVP event error:", error);
    res.status(500).json({
      success: false,
      message: "Error registering for event",
      error: error.message
    });
  }
};

export const cancelRsvp = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    event.attendees = event.attendees.filter(
      attendee => attendee.toString() !== userId
    );
    await event.save();

    res.status(200).json({
      success: true,
      message: "Registration cancelled",
      data: event
    });
  } catch (error: any) {
    console.error("Cancel RSVP error:", error);
    res.status(500).json({
      success: false,
      message: "Error cancelling registration",
      error: error.message
    });
  }
};