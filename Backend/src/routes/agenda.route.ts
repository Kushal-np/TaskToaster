import express, { Router } from "express";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";
import {
  createAgendaItem,
  updateAgendaItem,
  deleteAgendaItem,
  getAgendaItems,
  applyTemplate,
  reorderAgendaItems
} from "../controllers/agendaItem.controller";

const router = Router();

// Create individual agenda item
router.post(
  "/meetings/:meetingId/items",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  createAgendaItem
);

// Get all agenda items for a meeting
router.get(
  "/meetings/:meetingId/items",
  authMiddleware,
  getAgendaItems
);

// Update specific agenda item
router.put(
  "/items/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateAgendaItem
);

// Delete agenda item
router.delete(
  "/items/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteAgendaItem
);

// Apply template to create multiple items at once
router.post(
  "/meetings/:meetingId/apply-template",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  applyTemplate
);

// Bulk reorder agenda items
router.put(
  "/meetings/:meetingId/reorder",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  reorderAgendaItems
);

export default router;