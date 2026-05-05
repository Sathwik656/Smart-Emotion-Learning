import express from "express";
import * as AnalyticsController from "../controllers/analytics.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = express.Router();

// Admin dashboard
router.get(
    "/distribution",
    protect,
    authorize("admin"),
    AnalyticsController.emotionDistribution
);

router.get(
    "/trends",
    protect,
    authorize("admin"),
    AnalyticsController.trends
);

router.get(
    "/top-users",
    protect,
    authorize("admin"),
    AnalyticsController.topUsers
);

// User dashboard
router.get(
    "/user",
    protect,
    AnalyticsController.userStats
);

export default router;