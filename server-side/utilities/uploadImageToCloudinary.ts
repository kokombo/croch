import cloudinary = require("../configurations/cloudinary");

/**
 *
 * @param {string} file
 * @param {string} folderName
 * @returns cloudinary url
 */

const uploadImageToCloudinary = async (file: string, folderName: string) => {
  const response = await cloudinary.v2.uploader.upload(file, {
    folder: folderName,
    resource_type: "auto",
    quality_analysis: true,
    allowed_formats: ["png", "svg", "jpg", "mp4", "mov"],
  });

  return response.secure_url;
};

export = uploadImageToCloudinary;
