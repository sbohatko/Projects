const sharp = require('sharp')
const fs = require('fs')

module.exports = function resizeImgs() {
  //getting images from folder
   fs.readdir('imgs_test', (err, files) => {
    if (err) throw err;
    files.shift()
    files.forEach(img => {
      sharp(`imgs_test/${img}`).resize({ height:100, width:100}).toFile('output_imgs')
      .then(function(newFileInfo){
      console.log("Image Resized");
      })
      .catch(function(err){
      console.log("Got Error");
      console.log(err);
      });
    });
  });

  }