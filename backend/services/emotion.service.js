import axios from "axios";
import EmotionLog from "../models/emotionLog.model.js";
import EmotionRule from "../models/emotionRule.model.js";
import Content from "../models/content.model.js";

import { getUserCache, setUserCache } from "../utils/emotionCache.js";

const ML_COOLDOWN = 5000;     // 5 sec
const LOG_COOLDOWN = 15000;   // 15 sec

export const processEmotionPipeline = async (userId, image) => {
    const now = Date.now();

    const cache = getUserCache(userId);

    let emotionData;

    // 1. ML CALL CONTROL (cooldown)
    if (cache && now - cache.lastMLCall < ML_COOLDOWN) {
        // reuse previous result
        emotionData = {
            emotion: cache.lastEmotion,
            confidence: cache.lastConfidence,
        };
    } else {
        // call ML service
        const response = await axios.post(
            `${process.env.ML_API_URL}/api/predict`,
            { image }
        );

        if (!response.data.success) {
            // Graceful fallback when face is not detected
            emotionData = {
                emotion: cache ? cache.lastEmotion : "neutral",
                confidence: cache ? cache.lastConfidence : 0,
            };
        } else {
            emotionData = {
                emotion: response.data.emotion,
                confidence: response.data.confidence,
            };
        }
    }

    // 2. LOGGING CONTROL
    let shouldLog = false;

    if (!cache) {
        shouldLog = true;
    } else {
        const emotionChanged = cache.lastEmotion !== emotionData.emotion;
        const cooldownPassed = now - cache.lastUpdated > LOG_COOLDOWN;

        if (emotionChanged || cooldownPassed) {
            shouldLog = true;
        }
    }

    if (shouldLog) {
        await EmotionLog.create({
            user: userId,
            emotion: emotionData.emotion,
            confidence: emotionData.confidence,
        });
    }

    // 3. UPDATE CACHE
    setUserCache(userId, {
        lastEmotion: emotionData.emotion,
        lastConfidence: emotionData.confidence,
        lastUpdated: now,
        lastMLCall: now,
    });

    // 4. ADAPTIVE CONTENT
    const rule = await EmotionRule.findOne({
        emotion: emotionData.emotion,
    });

    if (!rule) {
        throw new Error("No rule found for emotion");
    }

    const contents = await Content.find({
        difficulty: rule.targetDifficulty,
    }).limit(5);

    return {
        emotion: emotionData.emotion,
        confidence: emotionData.confidence,
        action: rule.action,
        difficulty: rule.targetDifficulty,
        contents,
    };
};

export const logEmotion = async (userId, emotionData) => {
    return await EmotionLog.create({
        user: userId,
        emotion: emotionData.emotion,
        confidence: emotionData.confidence,
    });
};