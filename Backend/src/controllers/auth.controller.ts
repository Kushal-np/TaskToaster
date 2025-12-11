import { Request, Response } from "express";
import { IRegisterRequest, IUserResponse, IAuthResponse, ILoginRequest } from "../types";
import { User } from "../model/user.model";
import generateToken from "../utils/generateToken";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, password }: IRegisterRequest = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please provide name, email and password",
      });
      return;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(401).json({
        success: false,
        message: "User with this email already exists",
      });
      return;
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
    });

    const userResponse: IUserResponse = {
      name: user.name,
      email: user.email,
      phone: user.phone,
      clubIds: user.clubIds ?? [],
      createdAt: user.createdAt,
    };

    const token = generateToken({ userId: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,        
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const response: IAuthResponse = { user: userResponse , message:"User Registered successfully" };

    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const login = async(req:Request , res:Response) : Promise<void> =>{
    try{
        const {email , password}: ILoginRequest = req.body ; 
        if(!email || !password){
            res.status(400).json({
                success:false ,
                message:"Please provide email address and password",
            })
            return ; 
        }
        const user = await User.findOne({email}).select("password");
        if(!user){
            res.status(401).json({
                success:false , 
                message:"Invalid email or password",
            })
            return ; 
        }
        const token = generateToken({userId : user._id});

        res.cookie("token" , token ,{
            httpOnly:true , 
            secure :false , 
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000,
        });

        const userResponse : IUserResponse = {
            name:user.name , 
            email:user.email , 
            phone :user.phone , 
            clubIds:user.clubIds ?? [] , 
            createdAt:user.createdAt , 
        }

        const response : IAuthResponse = {
            user:userResponse , 
            message:"User logged in successfully"
        }

        res.status(200).json(response);
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            success:false , 
            message:"server error",
        })
    }
}
export const logout = async(req:Request , res:Response) =>{
    try{
        res.cookie("token" , '' , {
            httpOnly:true , 
            secure :false , 
            sameSite:"strict",
            maxAge:7 * 24 * 60 * 60 * 1000,
        })
        res.json({
            success:true , 
            message:"Logged out successfully"
        })
    }
    catch(error){
        res.status(501).json({
            success:false , 
            message:"server error",
        })
    }
}