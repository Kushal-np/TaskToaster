import express, { Router } from "express";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";
import {
  recordSpeech,
  getUserSpeeches,
  getMeetingSpeeches,
  updateSpeech,
  deleteSpeech
} from "../controllers/speech.controller";

const router = Router();

router.post(
  "/record",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  recordSpeech
);

router.get(
  "/user/:userId",
  authMiddleware,
  getUserSpeeches
);

router.get(
  "/meeting/:meetingId",
  authMiddleware,
  getMeetingSpeeches
);

router.put(
  "/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateSpeech
);

router.delete(
  "/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteSpeech
);

export default router;