import express , {Router} from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { createAgenda, updateAgenda } from "../controllers/agenda.controller";
const router = Router();

router.post("/createAgenda" , authMiddleware , createAgenda ) ; 
router.put("/updateAgenda" , authMiddleware , updateAgenda)