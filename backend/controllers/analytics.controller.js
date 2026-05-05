import * as AnalyticsService from "../services/analytics.service.js";

export const emotionDistribution = async (req, res, next) => {
    try {
        const data = await AnalyticsService.getEmotionDistribution();

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const userStats = async (req, res, next) => {
    try {
        const data = await AnalyticsService.getUserEmotionStats(req.user._id);

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const trends = async (req, res, next) => {
    try {
        const data = await AnalyticsService.getEmotionTrends();

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};

export const topUsers = async (req, res, next) => {
    try {
        const data = await AnalyticsService.getTopUsers();

        res.json({ success: true, data });
    } catch (error) {
        next(error);
    }
};