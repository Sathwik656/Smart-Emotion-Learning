import mongoose from "mongoose";

const emotionRuleSchema = new mongoose.Schema(
    {
        emotion: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        targetDifficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },
    },
    { timestamps: true }
);

const EmotionRule = mongoose.model("EmotionRule", emotionRuleSchema);

export default EmotionRule;