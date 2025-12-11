import jwt from "jsonwebtoken";
import { IJWTPayload } from "../types";
const generateToken = (payload: IJWTPayload) : string =>{
    return jwt.sign(payload , process.env.JWT_SECRET_KEY! , {
        expiresIn:"7d"
    }) ;
};
export default generateToken ; 