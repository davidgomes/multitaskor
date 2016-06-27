function TitleScreenState() {
  this.setup = function() {
  };

  this.update = function() {
    if (penta.isDown("return") || penta.isDown("space")) {
      penta.switchState(new PlayState());
    }
  };

  this.draw = function() {
    penta.clearCanvas();

    penta.drawRectangle(0, 0, 640, 400, "lightgray");

    penta.currentFont = "70px pixel";
    penta.drawString("Multitaskor", 320, 200, "black", "center");

    penta.currentFont = "20px pixel";
    penta.drawString("Press <Space> to start", 320, 270, "black", "center");
  };
}
