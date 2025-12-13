import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getUserDashboard,
  getClubDashboard
} from "../controllers/dashboard.controller";

const router = Router();

router.get(
  "/user",
  authMiddleware,
  getUserDashboard
);

router.get(
  "/club/:clubId",
  authMiddleware,
  getClubDashboard
);

export default router;