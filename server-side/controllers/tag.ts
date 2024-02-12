import Tag = require("../models/tag");
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import uploadImageToCloudinary = require("../utilities/uploadImageToCloudinary");
import validateId = require("../utilities/validateId");

const addNewTag = async (req: Request, res: Response) => {
  const { label } = req.body;

  const file = req.files[0];

  if (!label || !file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Icon and label required." });
  }

  try {
    const imageUrl = await uploadImageToCloudinary(file.path, "tag-icons");

    const tag = await Tag.create({ label, icon: imageUrl });

    return res.json(tag);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const getAllTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find({});

    return res.json(tags);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

const updateTag = async (req: Request, res: Response) => {
  const { tagId } = req.query;

  const { label } = req.body;

  const file = req.files[0];

  validateId(tagId as string);

  if (!label || !file) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Icon and label required." });
  }

  try {
    const imageUrl = await uploadImageToCloudinary(file.path, "tag-icons");

    const tag = await Tag.findByIdAndUpdate(
      tagId,

      {
        label,
        icon: imageUrl,
      },

      {
        new: true,
      }
    );

    return res.json(tag);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong, please try again." });
  }
};

export = { addNewTag, getAllTags, updateTag };
