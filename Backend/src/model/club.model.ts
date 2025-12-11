import mongoose , {Schema} from "mongoose";
import {IClub} from "../types";

const clubSchema = new Schema<IClub>({
    clubName:{
        type:String ,
        required:[true , "Club name is required"],
        trim:true , 
        maxlength : [100 , "Club name must not exceed 100 characters"] 
    },
    clubNumber:{
        type:String , 
        required:[true , "Club Number is required"],
        trim:true , 
        unique:true , 
        upperCase:true 
    },
    region:{
        type:String , 
        required:[true , "Region is required"],
        trim:true , 
    },
    district:{
        type:String , 
        required:[true , "District is required"],
        trim:true ,
    },
    division:{
        type:String , 
        required:[true , "Divison is required"],
        trim:true , 
    },
    area:{
        type:String , 
        required:[true , "Area is required"],
        trim:true 
    },
    charteredDate:{
        type:Date , 
        required:[true , "Chartered Date is required"]
    },
    createdBy:{
        type:String  , 
        ref:'User' , 
        required:true 

    },
    members:[{
        type:Schema.Types.ObjectId , 
        ref:'User' 
    }]
    
},{
    timestamps:true 
});

clubSchema.index({clubNumber:1});
clubSchema.index({district:1 , division:1 , area:1});


export const Club = mongoose.model<IClub>('Club' , clubSchema);