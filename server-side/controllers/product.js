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
const Product = require("../models/product");
const http_status_codes_1 = require("http-status-codes");
const validateId = require("../utilities/validateId");
const uploadImageToCloudinary = require("../utilities/uploadImageToCloudinary");
const fs = require("fs");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, availability, price, description, gender, tag } = req.body;
    const creative = req.user;
    if (!title ||
        !availability ||
        !price ||
        !description ||
        !gender ||
        !tag ||
        req.files.length < 1) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Provide all necessary listing details." });
    }
    try {
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const imageUrl = yield uploadImageToCloudinary(path, "product-images");
            urls.push(imageUrl);
            fs.unlinkSync(path);
        }
        const product = yield Product.create(Object.assign(Object.assign({}, req.body), { nationwideDelivery: req.body.nationwideDelivery === "true" ? true : false, primaryLocation: typeof req.body.primaryLocation !== "undefined"
                ? JSON.parse(req.body.primaryLocation)
                : null, otherLocations: typeof req.body.otherLocations !== "undefined"
                ? JSON.parse(req.body.otherLocations)
                : null, price: parseInt(req.body.price), photos: urls.map((url) => {
                return url;
            }), owner: creative._id }));
        return res.json(product);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.query.productId;
    const creative = req.user;
    validateId(productId, res);
    const { title, availability, price, description, gender, tag } = req.body;
    if (!title ||
        !availability ||
        !price ||
        !description ||
        !gender ||
        !tag ||
        req.files.length < 1) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Provide all necessary listing details." });
    }
    try {
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const imageUrl = yield uploadImageToCloudinary(path, "product-images");
            urls.push(imageUrl);
            fs.unlinkSync(path);
        }
        yield Product.findByIdAndUpdate(productId, Object.assign(Object.assign({}, req.body), { nationwideDelivery: req.body.nationwideDelivery === "true" ? true : false, primaryLocation: typeof req.body.primaryLocation !== "undefined"
                ? JSON.parse(req.body.primaryLocation)
                : null, otherLocations: typeof req.body.otherLocations !== "undefined"
                ? JSON.parse(req.body.otherLocations)
                : null, price: parseInt(req.body.price), photos: urls.map((url) => {
                return url;
            }), owner: creative._id }), { new: true });
        return res.json({ message: "Listing updated successfully." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.query.productId;
    validateId(productId, res);
    try {
        yield Product.findByIdAndDelete(productId);
        return res.json({ message: "Job deleted successfully." });
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCreativeProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: creativeId } = req.user;
    try {
        let results = Product.find({ owner: creativeId });
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const skip = (page - 1) * limit;
        results = results.skip(skip).limit(limit);
        const products = yield results;
        return res.json(products);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queryObject = Object.assign({}, req.query);
    //Filtering
    const excludeFields = ["page", "sort", "limit", "fields", "search"];
    excludeFields.forEach((item) => delete queryObject[item]);
    let numericQuery = JSON.stringify(queryObject);
    numericQuery = numericQuery.replace(/\b(gte|gt|lte|lt|eq)\b/g, (match) => `$${match}`);
    try {
        let result = Product.find(JSON.parse(numericQuery)).populate({
            path: "owner",
            select: "_id firstName lastName profileImage",
        });
        //An algorithm to display products based on product performance or creative's overall performance and/or product performance.
        //Sorting
        const sort = req.query.sort;
        if (sort) {
            result = result.sort({ [sort]: "desc" });
        }
        //Pagination
        const page = Number(req.query.page);
        const limit = Number(req.query.limit);
        const skip = (page - 1) * limit;
        result = result.skip(skip).limit(limit);
        //Implement search
        const products = yield result;
        return res.json(products);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.query.productId;
    validateId(productId, res);
    try {
        const product = yield Product.findById(productId).populate({
            path: "owner",
            select: "firstName lastName",
        });
        if (!product) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Product not found." });
        }
        return res.json(product);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getCreativeProducts,
};
