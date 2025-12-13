import mongoose , {Schema , Document , Types} from "mongoose";
import { IGuest } from "../types";

const guestSchema = new Schema<IGuest>({
    name:{
        type:String , 
        required:true , 
        trim:true , 
    },
    email:{
        type:String , 
        trim:true , 
        lowerCase:true , 
    },
    phone:{
        type:String, 
        trim:true , 
    },
    isToastmaster:{
        type:Boolean , 
        default:false , 

    },
    homeClubNumber:{
        type:String , 
        trim:true , 
    },
    homeClubName:{
        type:String , 
        trim:true , 
    },
    invitedBy:{
        type:Schema.Types.ObjectId , 
        ref:"User" , 
        required:true , 
    },
    meetingIds:[{
        type:Schema.Types.ObjectId , 
        ref:"Meeting" , 
    }],
    rolesTaken:[String] , 

},{
    timestamps:true
})

guestSchema.index({email:1});
guestSchema.index({phone:1});
guestSchema.index({homeClubNumber:1});


export const Guest= mongoose.model<IGuest>("Guest" , guestSchema);