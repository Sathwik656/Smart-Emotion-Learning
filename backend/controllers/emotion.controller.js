import * as EmotionService from "../services/emotion.service.js";
import { processEmotionPipeline } from "../services/emotion.service.js";

// ✅ NEW: Log emotion controller
export const logEmotion = async (req, res, next) => {
    try {
        const { emotion, confidence } = req.body;

        const result = await EmotionService.logEmotion(
            req.user._id,
            { emotion, confidence }
        );

        return res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Existing adapt controller (minor improvement: return)
export const adapt = async (req, res, next) => {
    try {
        const { image } = req.body;

        const result = await processEmotionPipeline(
            req.user._id.toString(),
            image
        );

        res.json({
            success: true,
            ...result,
        });
    } catch (error) {
        next(error);
    }
};