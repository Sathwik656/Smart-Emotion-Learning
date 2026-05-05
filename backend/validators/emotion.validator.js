import Joi from "joi";

export const emotionSchema = Joi.object({
    image: Joi.string().required(),   // base64 image
});