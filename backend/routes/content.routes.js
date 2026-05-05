import express from "express";
import * as ContentController from "../controllers/content.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate } from "../middleware/validate.middleware.js";

import {
    createContentSchema,
    updateContentSchema,
} from "../validators/content.validator.js";

const router = express.Router();

// Public (or protected student)
router.get("/", protect, ContentController.getAll);
router.get("/:id", protect, ContentController.getOne);

// Admin only
router.post(
    "/",
    protect,
    authorize("admin"),
    validate(createContentSchema),
    ContentController.create
);

router.put(
    "/:id",
    protect,
    authorize("admin"),
    validate(updateContentSchema),
    ContentController.update
);

router.delete(
    "/:id",
    protect,
    authorize("admin"),
    ContentController.remove
);

export default router;