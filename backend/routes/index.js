import express from "express";
import authRoutes from "./auth.routes.js";
import contentRoutes from "./content.routes.js";
import emotionRoutes from "./emotion.routes.js";
import analyticsRoutes from "./analytics.routes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/content", contentRoutes);
router.use("/emotion", emotionRoutes);
router.use("/analytics", analyticsRoutes);

router.get("/test", (req, res) => {
    res.json({ message: "API working" });
});

export default router;