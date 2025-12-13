import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Guest } from "../model/guest.model";
import { User } from "../model/user.model";
import mongoose from "mongoose";

export const createGuest = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?._id;
    const { name, email, phone, isToastmaster, homeClubNumber, homeClubName } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Guest name is required"
      });
    }

    // Check if guest with same email already exists
    if (email) {
      const existingGuest = await Guest.findOne({ email });
      if (existingGuest) {
        return res.status(200).json({
          success: true,
          message: "Guest already exists",
          data: existingGuest
        });
      }

      // Check if this email belongs to an existing user
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: "This email belongs to a registered user. Please assign the user directly."
        });
      }
    }

    const guest = await Guest.create({
      name,
      email,
      phone,
      isToastmaster,
      homeClubNumber,
      homeClubName,
      invitedBy: new mongoose.Types.ObjectId(userId)
    });

    res.status(201).json({
      success: true,
      message: "Guest created successfully",
      data: guest
    });
  } catch (error: any) {
    console.error("Create guest error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating guest",
      error: error.message
    });
  }
};

export const getGuests = async (req: AuthRequest, res: Response) => {
  try {
    const { search, isToastmaster } = req.query;

    const filter: any = {};
    
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { homeClubNumber: { $regex: search, $options: 'i' } }
      ];
    }

    if (isToastmaster !== undefined) {
      filter.isToastmaster = isToastmaster === 'true';
    }

    const guests = await Guest.find(filter)
      .populate('invitedBy', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: guests
    });
  } catch (error: any) {
    console.error("Get guests error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching guests",
      error: error.message
    });
  }
};

export const getGuestById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findById(id)
      .populate('invitedBy', 'name email')
      .populate('meetingIds');

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found"
      });
    }

    res.status(200).json({
      success: true,
      data: guest
    });
  } catch (error: any) {
    console.error("Get guest error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching guest",
      error: error.message
    });
  }
};

export const updateGuest = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const guest = await Guest.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Guest updated successfully",
      data: guest
    });
  } catch (error: any) {
    console.error("Update guest error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating guest",
      error: error.message
    });
  }
};

export const deleteGuest = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findByIdAndDelete(id);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Guest deleted successfully"
    });
  } catch (error: any) {
    console.error("Delete guest error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting guest",
      error: error.message
    });
  }
};