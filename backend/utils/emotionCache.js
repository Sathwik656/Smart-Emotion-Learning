const emotionCache = new Map();

/*
Structure:
{
  userId: {
    lastEmotion,
    lastConfidence,
    lastUpdated,
    lastMLCall
  }
}
*/

export const getUserCache = (userId) => {
    return emotionCache.get(userId);
};

export const setUserCache = (userId, data) => {
    emotionCache.set(userId, data);
};