import express , {Router} from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createAgenda, updateAgenda } from "../controllers/agenda.controller";
const router = Router();

router.post("/meetings/:meetingId/agenda" , authMiddleware , createAgenda ) ; 
router.put("/updateAgenda/:meetingId" , authMiddleware , updateAgenda)


export default router ; 