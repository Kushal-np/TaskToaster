import mongoose , {Schema , Document } from "mongoose";
import { IClub } from "../types/club";



export interface IClubDocument extends IClub, Document {}


const clubSchema : Schema<IClubDocument> = new Schema({
    name:{
        type:String , 
        required:true 
    } , 
    clubNumber:{
        type:String,
        required:true , 
        unique:true,
    },
    region:{
        type:String , 
        required:true , 
    },
    district:{
        type:String , 
        required:true , 
    } , 
    division:{
        type:String , 
        required:true , 
    } , 
    area:{
        type:String , 
        required:true , 
    },
    charteredDate:{
        type:Date , 
        required:true
    }
},
{
    timestamps:true
});


export default mongoose.model<IClubDocument>('Club',clubSchema);