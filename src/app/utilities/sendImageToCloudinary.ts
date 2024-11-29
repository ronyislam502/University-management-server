import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

export const sendImageToCloudinary = async (
  imageName: string,
  path: string
) => {
  cloudinary.config({
    cloud_name: "dkk9lvbtf",
    api_key: "744943593118556",
    api_secret: "z4FYfmE3cYrnMxgG3W442XXJ0cw",
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imageName,
    })
    .catch((error) => {
      console.log(error);
      //   delete uploads file data

      fs.unlink(path, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("file is Deleted");
        }
      });
    });
  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url(imageName, {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url(imageName, {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl);
};
