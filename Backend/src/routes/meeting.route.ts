import express from "express" ; 
import {Router} from "express"
import { authMiddleware } from "../middleware/auth.middleware";
import { createMeeting, getClubMeetings, getMeeting } from "../controllers/meeting.controller";
const router = Router();

router.post("/createMeeting" , authMiddleware , createMeeting );
router.get("/getMeetings/:clubid" , authMiddleware , getMeeting )
router.get("/getClubMeetings/:clubid" , authMiddleware , getClubMeetings)
export default router ; 