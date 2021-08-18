const Jimp = require("jimp");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

module.exports = async function addWatermarks(
  waterMarkImage = process.env.WATERMARK
) {
  // reads the watermark image
  let watermark = await Jimp.read(waterMarkImage);
  // resizes the watermark image
  watermark = watermark.resize(300, 300);
  let imgsKeys = getImages();

  await Promise.all(
    imgsKeys.map(async (imgKey) => {
      // reads the image
      const img = await Jimp.read(`imgs_test/${imgKey}`);

      //adds the watermark to the image at point 0, 0
      img.composite(watermark, 0, 0, {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5,
      });
      //Saves the image into the file system
      await img.writeAsync(`watermarked_images/${imgKey}`);
    }),
    console.log("Loading images...")
  ).catch((err) => {
    console.log(err);
  });
  console.log(
    "Great! 🥳\nAll images with watermark are in 'watermarked_images' folder! "
  );
};

function getImages() {
  let result = fs.readdirSync("imgs_test");
  result.shift();
  return result;
}
