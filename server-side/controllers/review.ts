import { Request, Response } from "express";

const giveReview = async (req: Request, res: Response) => {
  const { message, rating, to, forProduct } = req.body;
};

export = { giveReview };
