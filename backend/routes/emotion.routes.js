import express from "express";
import * as EmotionController from "../controllers/emotion.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { emotionSchema } from "../validators/emotion.validator.js";

const router = express.Router();

// Log emotion
router.post(
    "/log",
    protect,
    validate(emotionSchema),
    EmotionController.logEmotion   // ✅ FIXED (was .log ❌)
);

// Adaptive content endpoint
router.post(
    "/adapt",
    protect,
    validate(emotionSchema),
    EmotionController.adapt
);

export default router;