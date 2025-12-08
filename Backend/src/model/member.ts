import mongoose , {Schema , Document} from "mongoose" ; 
import { IMember } from "../types/member";


export interface IMemberDocument extends IMember , Document{}

const MemberSchema : Schema<IMemberDocument> = new Schema({
    name:{
        type:String , 
        required:true 
    } , 
    email:{
        type:String , 
        required:true 
    } , 
    phone:String , 
    clubId:{
        type:Schema.Types.ObjectId , 
        ref:"Club",
        required:true
    } , 
    introduction:String , 

} , {
    timestamps:true 
});


export default mongoose.model<IMemberDocument>('Member' , MemberSchema);
