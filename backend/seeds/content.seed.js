import Content from "../models/content.model.js";

const seedContent = async () => {
    try {
        const contents = [
            {
                title: "Introduction to Variables",
                type: "video",
                difficulty: "easy",
                tags: ["programming", "basics"],
                url: "https://example.com/video1",
            },
            {
                title: "Loops Deep Dive",
                type: "video",
                difficulty: "medium",
                tags: ["loops", "logic"],
                url: "https://example.com/video2",
            },
            {
                title: "Advanced Algorithms",
                type: "video",
                difficulty: "hard",
                tags: ["algorithms"],
                url: "https://example.com/video3",
            },
            {
                title: "Quick Quiz - Variables",
                type: "quiz",
                difficulty: "easy",
                tags: ["quiz"],
            },
            {
                title: "Interactive Coding Challenge",
                type: "interactive",
                difficulty: "medium",
                tags: ["challenge"],
            },
        ];

        await Content.insertMany(contents);

        console.log("Content seeded");
    } catch (error) {
        console.error("Content seed error:", error);
        throw error;
    }
};

export default seedContent;