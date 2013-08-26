function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* Position the stat.js FPS counter on the top right of the screen */
stats.domElement.style.position = "absolute";
stats.domElement.style.left = (self.innerWidth - 80).toString() + "px";
stats.domElement.style.top = "0px";

var canvas = document.getElementById("canvas");
canvas.width = 640;
canvas.height = 400;

var score = -1;

desiredFPS = 60;
pauseKey = "";
preventKeys("down", "right", "left", "right", "space");
switchState(new TitleScreenState());
