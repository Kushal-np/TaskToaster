import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import { Club } from "../model/club.model";
import { User } from "../model/user.model";
import { Types } from "mongoose";

export const createClub = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "User not authenticated"
      });
      return;
    }

    const { clubName, clubNumber, region, district, division, area, charteredDate } = req.body;

    if (!clubName || !clubNumber || !region || !district || !division || !area || !charteredDate) {
      res.status(400).json({
        success: false,
        message: "Please provide all required fields"
      });
      return;
    }

    const existingClub = await Club.findOne({ clubNumber });
    if (existingClub) {
      res.status(409).json({
        success: false,
        message: "Club with this number already exists"
      });
      return;
    }

    const club = await Club.create({
      clubName,
      clubNumber,
      region,
      district,
      division,
      area,
      charteredDate: new Date(charteredDate),
      createdBy: userId,
      members: [userId]
    });

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { clubIds: club._id }
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "Club created successfully",
      club
    });
  } catch (error) {
    console.error("Error creating club:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};


export const joinClub = async(req:AuthRequest , res:Response) =>{
    try{
        const userId = req.user?._id ; 
        const {clubNumber} = req.body;
        if(!clubNumber) {
            res.status(400).json({
                success:false , 
                message:"Please provide club number"
            });
            return ; 
        }

        const club = await Club.findOne({
            clubNumber
        })
        if(!club) {
            res.status(404).json({
                success:false , 
                message:"Club not found"
            });
            return ; 
        }
        if(club.members.includes(userId as any)){
            res.status(400).json({
                success:false , 
                message:"You are already a member of this club"
            });
            return ; 
        }
        club.members.push(userId as any);
        await club.save();

        await User.findByIdAndUpdate(userId , {
            $addToSet:{clubIds: club._id}
        });

        res.status(200).json({
            success:true , 
            message:"Successfully joined the club",
            data:club
        });

    }
    catch(error){
        console.error("Join club error" , error);
        res.status(500).json({
            success:false , 
            message:"Error joining clubs" , 
            
        });
    }
}

export const getMyClub = async(req:AuthRequest , res:Response) =>{
    try{
        const userId = req.user?._id ;
        const user = await User.findById(userId).populate("clubIds");

        res.status(200).json({
            success:true , 
            data:user?.clubIds || []
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false , 
            message:"Error fetching clubs" ,
            error
        })
    }
}

export const updateClub = async(req:AuthRequest , res:Response) => {
    try{
        const {id} = req.params ; 
        const userId = req.user?._id ; 
        const updates = req.body;

        const club = await Club.findById(id);
        if(!club){
            res.status(404).json({
                success:false , 
                message:"Club not found"
            });
            return ; 
        }
        if(club.createdBy.toString() !== userId){
            res.status(403).json({
                success:false , 
                message:"Only club creator can update club details"
            });
            return ; 
        }
        const updatedClub = await Club.findByIdAndUpdate(id, updates , {new:true});
        res.status(200).json({
            success:true , 
            message:"Club updated successfully" , 
            data:updatedClub,
        });
    }
    catch(error){
        console.log("Updated club error", error);
        res.status(500).json({
            success:false , 
            message:"Error updating club" , 
            
        })
    }
}