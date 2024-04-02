"use strict";
const expressLimit = require("express-rate-limit");
const { rateLimit } = expressLimit;
const limiter = (time, limit) => rateLimit({
    windowMs: time,
    limit: limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
});
module.exports = limiter;
