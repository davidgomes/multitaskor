function TitleScreenState() {
  this.setup = function() {
  }

  this.update = function() {
    if (isDown("return") || isDown("space")) {
      switchState(new PlayState());
    }
  }

  this.draw = function() {
    clearCanvas();

    drawRectangle(0, 0, 640, 400, "lightgray");
    
    currentFont = "70px pixel";
    drawString("Multitaskor", 320, 200, "black", "center");

    currentFont = "20px pixel"
    drawString("Press <Space> to start", 320, 270, "black", "center");
  }
}
