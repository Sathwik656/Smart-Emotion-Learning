import mongoose from "mongoose";


const EmotionRuleSchema = new mongoose.Schema({
    emotion: String,
    action: String,
    targetDifficulty: String,
});

const EmotionRule =
    mongoose.models.EmotionRule ||
    mongoose.model("EmotionRule", EmotionRuleSchema);

const seedEmotions = async () => {
    try {
        const rules = [
            {
                emotion: "angry",
                action: "calm",
                targetDifficulty: "easy",
            },
            {
                emotion: "disgust",
                action: "change_topic",
                targetDifficulty: "easy",
            },
            {
                emotion: "fear",
                action: "reassure",
                targetDifficulty: "easy",
            },
            {
                emotion: "happy",
                action: "continue",
                targetDifficulty: "medium",
            },
            {
                emotion: "sad",
                action: "motivate",
                targetDifficulty: "easy",
            },
            {
                emotion: "surprise",
                action: "explain",
                targetDifficulty: "medium",
            },
            {
                emotion: "neutral",
                action: "maintain",
                targetDifficulty: "medium",
            },
            {
                emotion: "confused",
                action: "simplify",
                targetDifficulty: "easy",
            },
            {
                emotion: "bored",
                action: "engage",
                targetDifficulty: "medium",
            },
            {
                emotion: "focused",
                action: "advance",
                targetDifficulty: "hard",
            },
        ];

        await EmotionRule.insertMany(rules);

        console.log("Emotion rules seeded");
    } catch (error) {
        console.error("Emotion seed error:", error);
        throw error;
    }
};

export default seedEmotions;