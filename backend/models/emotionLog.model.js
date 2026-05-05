import mongoose from "mongoose";

const emotionLogSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        emotion: {
            type: String,
            required: true,
        },
        confidence: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const EmotionLog = mongoose.model("EmotionLog", emotionLogSchema);

export default EmotionLog;