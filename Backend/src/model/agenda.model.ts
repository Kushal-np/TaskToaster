import mongoose , {Schema} from "mongoose" ; 
import { IAgenda } from "../types";

const agendaSchema = new Schema<IAgenda>(
    {
        meetingId:{
            type:Schema.Types.ObjectId , 
            ref:'Meeting' , 
            required:true , 
            unique:true 
        },
        items:[
            {
                time:{
                    type:String , 
                    required:true , 
                    
                },
                role:{
                    type:String , 
                    required:true , 
                    trim:true 
                },
                assignedTo:{
                    type:Schema.Types.ObjectId , 
                    refPath: "items.assignedToModel",
                },
                assignedToModel:{
                    type:String , 
                    enum:["User" , "Member"],
                    default:'User'
                },
                assignedToName:String , 
                allocatedTime:{
                    type:String , 
                    required:true ,

                },
                sequence:{
                    type:Number , 
                    required:true ,
                }
            }
        ]
        
    },
    {
        timestamps:true
    }
);

agendaSchema.index({meetingId:1});
export const Agenda = mongoose.model<IAgenda>('Agenda' , agendaSchema);