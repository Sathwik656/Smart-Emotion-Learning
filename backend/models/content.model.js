import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["video", "quiz", "interactive"],
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            required: true,
        },
        tags: {
            type: [String],
            default: [],
        },
        url: {
            type: String,
        },
    },
    { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);

export default Content;