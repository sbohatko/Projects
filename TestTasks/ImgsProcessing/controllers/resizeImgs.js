const Jimp = require("jimp");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

module.exports = async function resizeImgs() {
  let imgsKeys = getImages();
  await Promise.all(
    imgsKeys.map(async (imgKey) => {
      // reads the image
      const img = await Jimp.read(`imgs_test/${imgKey}`);
      //resize img
      img.resize(process.env.HEIGHT_RESIZE * 1, process.env.WIDTH_RESIZE * 1);
      //Saves the image into the file system
      await img.writeAsync(`resized_images/${imgKey}.png`);
    })
  );
};

function getImages() {
  let result = fs.readdirSync("imgs_test");
  result.shift();
  return result;
}
