function GameOverState() {
  this.setup = function() {
    if (score == -1) score = 0;

    this.canRestart = false;

    var self = this;
    setTimeout(function() {
      self.canRestart = true;
    }, 1500);

    document.getElementById("beep").volume = 0;
  };

  this.update = function() {
    if ((penta.isDown("return") || penta.isDown("space")) && this.canRestart) {
      score = startScore;
      document.getElementById("beep").volume = 1;
      penta.switchState(new PlayState());
    }
  };

  this.draw = function() {
    penta.clearCanvas();

    penta.drawRectangle(0, 0, 640, 400, "lightgray");

    penta.currentFont = "40px pixel";
    penta.drawString("Game Over", 320, 180, "#000", "center");

    penta.drawRectangle(0, 190, 640, 5, "darkgray");

    penta.currentFont = "20px pixel";
    penta.drawString("Score: " + score.toString() + "x10 seconds",
               320, 220, "#000", "center");

    penta.currentFont = "13px pixel";
    penta.drawString("Press <Space> to play again", 320, 360, "black", "center");
  };
}
