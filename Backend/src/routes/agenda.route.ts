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

router.post("/meetings/:meetingId/items",authMiddleware,authorizedRoles("member", "TMOD", "club_admin"),createAgendaItem);

router.get(
  "/meetings/:meetingId/items",
  authMiddleware,
  getAgendaItems
);

router.put(
  "/items/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateAgendaItem
);

router.delete(
  "/items/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteAgendaItem
);

router.post(
  "/meetings/:meetingId/apply-template",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  applyTemplate
);

router.put(
  "/meetings/:meetingId/reorder",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  reorderAgendaItems
);

export default router;