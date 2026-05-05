import * as ContentService from "../services/content.service.js";

export const create = async (req, res, next) => {
    try {
        const content = await ContentService.createContent(req.body);

        res.status(201).json({
            success: true,
            data: content,
        });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const contents = await ContentService.getAllContent(req.query);

        res.json({
            success: true,
            count: contents.length,
            data: contents,
        });
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req, res, next) => {
    try {
        const content = await ContentService.getContentById(req.params.id);

        if (!content) {
            return res.status(404).json({ success: false, message: "Not found" });
        }

        res.json({
            success: true,
            data: content,
        });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const content = await ContentService.updateContent(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            data: content,
        });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        await ContentService.deleteContent(req.params.id);

        res.json({
            success: true,
            message: "Content deleted",
        });
    } catch (error) {
        next(error);
    }
};