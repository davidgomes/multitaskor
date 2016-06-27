function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var canvas = document.getElementById("canvas");

var startScore = 3;
var score = startScore;

var penta = new Pentagine.Game();

penta.setup({
  desiredFPS: 60,
  pauseKey: "",
  preventedKeys: ["down", "right", "left", "right", "space"],
  firstState: new TitleScreenState(),
  width: 640,
  height: 400
});
