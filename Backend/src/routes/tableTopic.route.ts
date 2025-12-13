import express, { Router } from "express";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";
import {
  recordTableTopic,
  getUserTableTopics,
  getMeetingTableTopics,
  updateTableTopic,
  deleteTableTopic
} from "../controllers/tableTopic.controller";

const router = Router();

router.post(
  "/record",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  recordTableTopic
);

router.get(
  "/user/:userId",
  authMiddleware,
  getUserTableTopics
);

router.get(
  "/meeting/:meetingId",
  authMiddleware,
  getMeetingTableTopics
);

router.put(
  "/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateTableTopic
);

router.delete(
  "/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteTableTopic
);

export default router;