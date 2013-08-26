function GameOverState() {
  this.setup = function() {
    if (score == -1) score = 0;

    this.canRestart = false;
    
    var self = this;
    setTimeout(function() {
      self.canRestart = true;
    }, 1500);

    document.getElementById("beep").volume = 0;
  }

  this.update = function() {
    if ((isDown("return") || isDown("space")) && this.canRestart) {
      score = -1;
      document.getElementById("beep").volume = 1;
      switchState(new PlayState());
    }
  }

  this.draw = function() {
    clearCanvas();

    drawRectangle(0, 0, 640, 400, "lightgray");

    currentFont = "40px pixel";
    drawString("Game Over", 320, 180, "#000", "center");

    drawRectangle(0, 190, 640, 5, "darkgray");

    currentFont = "20px pixel";
    drawString("Score: " + score.toString() + "x10 seconds",
               320, 220, "#000", "center");

    currentFont = "13px pixel"
    drawString("Press <Space> to play again", 320, 360, "black", "center");
  }
}
