import express, { Router } from "express";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";
import {
  recordRoleHistory,
  getUserRoleHistory,
  getMeetingRoleHistory,
  updateRoleHistory,
  deleteRoleHistory
} from "../controllers/roleHistory.controller";

const router = Router();

router.post(
  "/record",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  recordRoleHistory
);

router.get(
  "/user/:userId",
  authMiddleware,
  getUserRoleHistory
);

router.get(
  "/meeting/:meetingId",
  authMiddleware,
  getMeetingRoleHistory
);

router.put(
  "/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateRoleHistory
);

router.delete(
  "/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteRoleHistory
);

export default router;