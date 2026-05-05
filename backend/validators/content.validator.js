import Joi from "joi";

export const createContentSchema = Joi.object({
    title: Joi.string().required(),
    type: Joi.string().valid("video", "quiz", "interactive").required(),
    difficulty: Joi.string().valid("easy", "medium", "hard").required(),
    tags: Joi.array().items(Joi.string()),
    url: Joi.string().uri().allow("", null),
});

export const updateContentSchema = Joi.object({
    title: Joi.string(),
    type: Joi.string().valid("video", "quiz", "interactive"),
    difficulty: Joi.string().valid("easy", "medium", "hard"),
    tags: Joi.array().items(Joi.string()),
    url: Joi.string().uri().allow("", null),
});