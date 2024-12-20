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

  console.log(imageName, path);

  // Upload an image
  const result = await cloudinary.uploader.upload(
    path,
    { public_id: imageName.trim() },
    function () {
      // delete a file asynchronously
      fs.unlink(path, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("File is deleted.");
        }
      });
    }
  );

  return result.secure_url;

  // // Optimize delivery by resizing and applying auto-format and auto-quality
  // const optimizeUrl = cloudinary.url(imageName, {
  //   fetch_format: "auto",
  //   quality: "auto",
  // });

  // console.log("optimize-url", optimizeUrl);

  // // Transform the image: auto-crop to square aspect_ratio
  // const autoCropUrl = cloudinary.url(imageName, {
  //   crop: "auto",
  //   gravity: "auto",
  //   width: 500,
  //   height: 500,
  // });

  // console.log("auto-crop-url", autoCropUrl);
};
