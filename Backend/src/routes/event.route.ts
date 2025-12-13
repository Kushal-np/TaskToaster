import express, { Router } from "express";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";
import {
  createEvent,
  getClubEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  cancelRsvp
} from "../controllers/event.controller";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  createEvent
);

router.get(
  "/club/:clubId",
  authMiddleware,
  getClubEvents
);

router.get(
  "/:id",
  authMiddleware,
  getEventById
);

router.put(
  "/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateEvent
);

router.delete(
  "/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteEvent
);

router.post(
  "/:id/rsvp",
  authMiddleware,
  rsvpEvent
);

router.delete(
  "/:id/rsvp",
  authMiddleware,
  cancelRsvp
);

export default router;