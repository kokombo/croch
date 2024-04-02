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
const http_status_codes_1 = require("http-status-codes");
const Creative = require("../models/creative");
const Order = require("../models/order");
const validateId = require("../utilities/validateId");
const uploadImageToCloudinary = require("../utilities/uploadImageToCloudinary");
const setupAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandName, personalDescription, yearsOfExperience, funFacts } = req.body;
    const files = req.files;
    const { _id: creativeId } = req.user;
    try {
        const creative = yield Creative.findById(creativeId);
        creative.brandName = brandName;
        creative.personalDescription = personalDescription;
        creative.yearsOfExperience = parseInt(yearsOfExperience);
        creative.funFacts = funFacts;
        const file = files[0];
        if (!file) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid input." });
        }
        const { path } = file;
        const imageUrl = yield uploadImageToCloudinary(path, "brand-logos");
        creative.brandLogo = imageUrl;
        yield creative.save();
        return res.json({ message: "Account successfully setup" });
    }
    catch (error) {
        console.log(error);
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updateFunFacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { funFacts } = req.body;
    const { _id: creativeId } = req.user;
    try {
        const creative = yield Creative.findById(creativeId);
        if (creative) {
            creative.funFacts = funFacts;
        }
        yield creative.save();
        return res.json(creative.funFacts);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updateIsAvailable = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isAvailable } = req.body;
    const { _id: creativeId } = req.user;
    try {
        const creative = yield Creative.findById(creativeId);
        if (creative) {
            creative.isAvailable = isAvailable;
        }
        yield creative.save();
        return res.json(creative.isAvailable);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updatePersonalDescription = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { personalDescription } = req.body;
    const { _id: creativeId } = req.user;
    try {
        const creative = yield Creative.findById(creativeId);
        if (creative) {
            creative.personalDescription = personalDescription;
        }
        yield creative.save();
        return res.json(creative.personalDescription);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const updateYearsOfExperience = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { yearsOfExperience } = req.body;
    const { _id: creativeId } = req.user;
    try {
        const creative = yield Creative.findById(creativeId);
        if (creative) {
            creative.yearsOfExperience = yearsOfExperience;
        }
        yield creative.save();
        return res.json(creative.yearsOfExperience);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const setBrandName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { brandName } = req.body;
    const { _id: creativeId } = req.user;
    if (!brandName) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ message: "Brand name cannot be empty." });
    }
    try {
        const creative = yield Creative.findById(creativeId);
        if (creative) {
            creative.brandName = brandName;
        }
        yield creative.save();
        return res.json(creative.brandName);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const setBrandLogo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = req.files;
    const { _id: creativeId } = req.user;
    try {
        const creative = yield Creative.findById(creativeId);
        const file = files[0];
        if (!file) {
            return res
                .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
                .json({ message: "Invalid input." });
        }
        const { path } = file;
        const imageUrl = yield uploadImageToCloudinary(path, "brand-logos");
        creative.brandLogo = imageUrl;
        yield creative.save();
        return res.json(creative.brandLogo);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: creativeId } = req.user;
    const status = req.query.status;
    try {
        const orders = yield Order.find({ creativeId, status });
        return res.json(orders);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const getCreativeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const creativeId = req.query.creativeId;
    validateId(creativeId, res);
    try {
        const creative = yield Creative.findById(creativeId);
        if (!creative) {
            return res
                .status(http_status_codes_1.StatusCodes.NOT_FOUND)
                .json({ message: "Creative not found" });
        }
        return res.json(creative);
    }
    catch (error) {
        return res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: "Something went wrong, please try again." });
    }
});
const accountSetupDone = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: creativeId } = req.user;
    const creative = yield Creative.findById(creativeId);
    creative.accountSetupDone = true;
    yield creative.save();
    return res.json({ message: "success" });
});
module.exports = {
    updateFunFacts,
    updateIsAvailable,
    updatePersonalDescription,
    updateYearsOfExperience,
    getOrders,
    setBrandName,
    setBrandLogo,
    getCreativeById,
    setupAccount,
    accountSetupDone,
};
