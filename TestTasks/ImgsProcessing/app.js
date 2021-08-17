var readline = require("readline");

function resizeImgs() {
  console.log("IT WORKS RESIZING");
}
function addWatersign() {
  console.log("IT WORKS WATERSIGN");
}
function exitConsole() {
  console.log("App is closing...");
  rl.close()
}

var rl = readline.createInterface(process.stdin, process.stdout);

rl.setPrompt(
  `Which option you want to be proceed?\n\n1. Resize imgs\n2. Add watersign\n0. Exit\n\nChoose option: `
);
rl.prompt();
rl.on("line", (opt) => {
  switch (opt) {
    case '1':
      resizeImgs();
      break;
    case '2':
      addWatersign();
      break;
    case '0':
      exitConsole();
      break;
    default:
      console.log("Invalid input");
      break;
  }

});
