import express from "express";
import { Router } from "express";
import { createClub, getClubById, getMyClub, joinClub, updateClub } from "../controllers/club.controller";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";

const router = Router();


router.post("/create" ,authMiddleware ,  createClub);
router.post("/join" , authMiddleware , joinClub);
router.get("/getMyclub" , authMiddleware , getMyClub);
router.put("/updateClub/:id" , authMiddleware , updateClub )
router.get("/:id", authMiddleware, getClubById);
export default router ; 