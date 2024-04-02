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
const cloudinary = require("../configurations/cloudinary");
/**
 *
 * @param {string} file
 * @param {string} folderName
 * @returns cloudinary url
 */
const uploadImageToCloudinary = (file, folderName) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield cloudinary.v2.uploader.upload(file, {
        folder: folderName,
        resource_type: "auto",
        quality_analysis: true,
        allowed_formats: ["png", "svg", "jpg", "mp4", "mov"],
    });
    return response.secure_url;
});
module.exports = uploadImageToCloudinary;
