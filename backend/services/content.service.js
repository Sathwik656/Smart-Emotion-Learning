import Content from "../models/content.model.js";

export const createContent = async (data) => {
    return await Content.create(data);
};

export const getAllContent = async (query) => {
    const filter = {};

    if (query.type) filter.type = query.type;
    if (query.difficulty) filter.difficulty = query.difficulty;
    if (query.tags) filter.tags = { $in: query.tags.split(",") };

    return await Content.find(filter).sort({ createdAt: -1 });
};

export const getContentById = async (id) => {
    return await Content.findById(id);
};

export const updateContent = async (id, data) => {
    return await Content.findByIdAndUpdate(id, data, { new: true });
};

export const deleteContent = async (id) => {
    return await Content.findByIdAndDelete(id);
};


// 🔥 CORE for Adaptive Engine
export const getContentByDifficulty = async (difficulty) => {
    return await Content.find({ difficulty }).limit(5);
};