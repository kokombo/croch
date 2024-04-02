"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Tag = require("../models/tag");
const http_status_codes_1 = require("http-status-codes");
const uploadImageToCloudinary = require("../utilities/uploadImageToCloudinary");
const validateId = require("../utilities/validateId");
const addNewTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { label } = req.body;
    const file = req.files[0];
    if (!label || !file) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Icon and label required." });
    }
    try {
        const imageUrl = yield uploadImageToCloudinary(file.path, "tag-icons");
        const tag = yield Tag.create({ label, icon: imageUrl });
        return res.json(tag);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tags = yield Tag.find({});
        return res.json(tags);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updateTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tagId = req.query.tagId;
    const { label } = req.body;
    const file = req.files[0];
    validateId(tagId, res);
    if (!label || !file) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Icon and label required." });
    }
    try {
        const imageUrl = yield uploadImageToCloudinary(file.path, "tag-icons");
        const tag = yield Tag.findByIdAndUpdate(tagId, {
            label,
            icon: imageUrl,
        }, {
            new: true,
        });
        return res.json(tag);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = { addNewTag, getAllTags, updateTag };
