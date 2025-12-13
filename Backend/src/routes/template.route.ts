import express, { Router } from "express";
import { authMiddleware, authorizedRoles } from "../middleware/auth.middleware";
import {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate
} from "../controllers/template.controller";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  createTemplate
);

router.get(
  "/",
  authMiddleware,
  getTemplates
);

router.get(
  "/:id",
  authMiddleware,
  getTemplateById
);

router.put(
  "/:id",
  authMiddleware,
  authorizedRoles("member", "TMOD", "club_admin"),
  updateTemplate
);

router.delete(
  "/:id",
  authMiddleware,
  authorizedRoles("TMOD", "club_admin"),
  deleteTemplate
);

export default router;