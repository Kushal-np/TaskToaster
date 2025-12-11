import { Request , Response , NextFunction } from "express";
import jwt from "jsonwebtoken"
import { User } from "../model/user.model";
import { IJWTPayload } from "../types";


interface AuthRequest extends Request {
    user?:{
        _id:string ; 
        name:string ; 
        email:string ; 
        phone:string ; 
        clubIds?:string[] ; 
        role:string ;
    }

}

export const authMiddleware = async( req:AuthRequest , res:Response , next:NextFunction) =>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({success:false , 
                message:"Not authorized , no token"
            })
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY! ) as IJWTPayload;

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            return res.status(401).json({
                success:false , 
                message:"User not found"
            })
        }
        req.user= {
            _id:user._id.toString() , 
            name:user.name ,
            email:user.email , 
            phone : user.phone , 
            clubIds:user.clubIds?.map(id => id.toString()) || [],
            role:user.role
        }

        next();

    }
    catch(error){
        console.log("Auth middleware error" , error);
        return res.status(401).json({
            success:false , 
            message:"Not authorized , can't access"
        })
    }
};


export const authorizedRoles = (...roles: string[]) =>{
    return(req:AuthRequest , res:Response , next:NextFunction) =>{
        if(!req.user){
            return res.status(401).json({
                success:false , 
                message:"Not authorized"
            });
            
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({
                success:false , 
                message:"Forbidden : You do not have access"
            })
        }
        next();
    };
};