import EmotionLog from "../models/emotionLog.model.js";

export const getEmotionDistribution = async () => {
    return await EmotionLog.aggregate([
        {
            $group: {
                _id: "$emotion",
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                emotion: "$_id",
                count: 1,
                _id: 0,
            },
        },
    ]);
};

export const getUserEmotionStats = async (userId) => {
    return await EmotionLog.aggregate([
        {
            $match: { user: userId },
        },
        {
            $group: {
                _id: "$emotion",
                count: { $sum: 1 },
            },
        },
    ]);
};

export const getEmotionTrends = async () => {
    return await EmotionLog.aggregate([
        {
            $group: {
                _id: {
                    date: {
                        $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                    },
                    emotion: "$emotion",
                },
                count: { $sum: 1 },
            },
        },
        {
            $sort: { "_id.date": 1 },
        },
    ]);
};

export const getTopUsers = async () => {
    return await EmotionLog.aggregate([
        {
            $group: {
                _id: "$user",
                interactions: { $sum: 1 },
            },
        },
        {
            $sort: { interactions: -1 },
        },
        {
            $limit: 5,
        },
    ]);
};