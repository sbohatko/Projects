const fs = require("fs");

module.exports = function readWatermarksNames() {
  fs.readdir("watermarks", (err, files) => {
    if (err) throw err;
    files.shift();
    console.log("Availible watermarks:\n" + files.join("\n"));
    return files
  });
};
