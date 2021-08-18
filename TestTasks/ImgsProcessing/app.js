const readline = require("readline");
const resizeImgs = require("./controllers/resizeImgs");
const addWatermarks = require("./controllers/addWatermarks");
const showWatermarks = require("./controllers/showWatermarks");

function exitConsole() {
  console.log("App is closing...");
  rl.close();
}

var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(
  `Which option you want to be proceed?\n\n1. Resize imgs\n2. Add watermarks\n3. Availible watermarks\n0. Exit\n\nChoose option: `
);
rl.prompt();
rl.on("line", (opt) => {
  switch (opt) {
    case "1":
      resizeImgs();
      break;
    case "2":
      addWatermarks();
      break;
    case "3":
      showWatermarks();
      break;
    case "0":
      exitConsole();
      break;
    default:
      console.log("Invalid input");
      break;
  }
});
