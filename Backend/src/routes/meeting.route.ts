import express from "express" ; 
import {Router} from "express"
import { authMiddleware } from "../middleware/auth.middleware";
const router = Router();

router.post("/createMeeting" , authMiddleware , );
export default router ; 