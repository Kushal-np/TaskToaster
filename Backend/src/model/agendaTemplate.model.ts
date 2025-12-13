import mongoose , {Schema , Document , Types} from "mongoose";
import { IAgendaTemplate, ITemplateItem } from "../types";


const templateItemSchema = new Schema<ITemplateItem>({
    time:{
        type:String , 
        required:true , 
    },
    role:{
        type:String , 
        required:true , 
        trim:true , 
    }, 
    allocatedItem:{
        type:String , 
        required:true , 
    } , 
    sequence:{
        type:Number , 
        required:true , 
    },
    isRequired:{
        type:Boolean , 
        default:false , 
    },
    description:{
        type:String , 
        trim:true , 
    }

},
{_id:false });

const agendaTemplateSchema = new Schema<IAgendaTemplate>({
    name:{
        type:String , 
        required:true , 
        trim:true , 
    },
    description:{
        type:String , 
        trim:true , 
    },
    items:[templateItemSchema] , 
    clubId:{
        type:Schema.Types.ObjectId , 
        ref:"Club"
    },
    isDefault:{
        type:Boolean , 
        default:false , 
    },
    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"User" , 
        required:true , 

    },
    timeUsed:{
        type:Number , 
        default:0
    }
},{
    timestamps:true 
})


agendaTemplateSchema.index({clubId:1});
agendaTemplateSchema.index({isDefault:1});

export const AgendaTemplate = mongoose.model<IAgendaTemplate>("AgendaTemplate" , agendaTemplateSchema);