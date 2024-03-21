import expressLimit = require("express-rate-limit");

const { rateLimit } = expressLimit;

const limiter = (time: number, limit: number) =>
  rateLimit({
    windowMs: time,
    limit: limit,
    standardHeaders: "draft-7",
    legacyHeaders: false,
  });

export = limiter;
