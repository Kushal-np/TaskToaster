import express, { Router } from "express";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";
import {
  createGuest,
  getGuests,
  getGuestById,
  updateGuest,
  deleteGuest
} from "../controllers/guest.controller";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  createGuest
);

router.get(
  "/",
  authMiddleware,
  getGuests
);

router.get(
  "/:id",
  authMiddleware,
  getGuestById
);

router.put(
  "/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateGuest
);

router.delete(
  "/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteGuest
);

export default router;