Tunnel = (function() {
  function constructor(x, y, width, height, live) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.live = live;

    this.upDown = new Pentagine.Sprite(penta, "res/img/up_down.png", 0, 0);
    this.upDown.width = 100;
    this.upDown.height = 160;
    this.upDown.alpha = 0.3;

    this.reloadVariables();
  }

  constructor.prototype = {
    reloadVariables: function() {
      this.player = {x: 50, y: this.height / 2 - 2,
                     width: 8, height: 8, speed: 300};

      this.vertical = false;

      this.walls = [];
      this.walls[this.width - 1] = 20;

      for (var i = this.width - 2; i >= 0; i--) {
        var lastWall = this.walls[i + 1];

        if (lastWall < 8) {
          this.walls[i] = lastWall + 2;
        } else if (lastWall > 34) {
          this.walls[i] = lastWall - 2;
        } else {
          this.walls[i] = lastWall + getRandomInt(-2, 2);
        }
      }

      this.speed = 10;
      this.difficulty = 50; // The lower, the harder.
      this.blocks = [];
      this.initialBlockSpeed = 8;
    },

    goHard: function() {
      this.speed = 20;
      this.difficulty = 15;
      this.initialBlockSpeed = 16;
      this.player.speed = 500;
    },

    update: function(dt) {
      if (penta.isDown("up") || penta.isDown("w")) {
        this.player.y -= this.player.speed * dt;
      }

      if (penta.isDown("down") || penta.isDown("s")) {
        this.player.y += this.player.speed * dt;
      }

      if (getRandomInt(0, this.difficulty) == 1) {
        var newBlock = {x: this.width,
                        y: getRandomInt(0.1 * this.height, 0.8 * this.height),
                        width: 20, height: 60 * this.height / 400};

        if (this.vertical) {
          newBlock.speed = this.initialBlockSpeed / 2;
        } else {
          newBlock.speed = this.initialBlockSpeed;
        }

        this.blocks.push(newBlock);
      }

      for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].x -= this.blocks[i].speed;

        if (this.player.x <= this.blocks[i].x + this.blocks[i].width &&
            this.blocks[i].x <= this.player.x + this.player.width &&
            this.player.y <= this.blocks[i].y + this.blocks[i].height &&
            this.blocks[i].y <= this.player.y + this.player.height) {
          penta.switchState(new GameOverState());
        }
      }

      for (var i = 2; i < this.walls.length - this.speed; i++) {
        for (var u = 0; u < this.speed; u++) {
          this.walls[i + u] = this.walls[i + u + 1];
        }
      }

      if (this.walls.length == this.width) {
        var lastWall = this.walls[this.walls.length - 2];

        if (lastWall < 8) {
          this.walls[this.walls.length - 1] = lastWall + 2;
        } else if (lastWall > 34) {
          this.walls[this.walls.length - 1] = lastWall - 2;
        } else {
          this.walls[this.walls.length - 1] = lastWall + getRandomInt(-2, 2);
        }
      }

      this.walls[1] = this.walls[2];
      this.walls[0] = this.walls[1];

      var playerWall = this.walls[this.player.x + this.player.width];
      if (this.player.y < playerWall ||
          this.player.y > this.height - playerWall) {
        penta.switchState(new GameOverState());
      }
    },

    draw: function() {
      this.upDown.x = this.x + this.width / 2 - this.upDown.width / 2;
      this.upDown.y = this.y + this.height / 2 - this.upDown.height / 2;
      this.upDown.draw();

      /* Draw walls */
      for (var i = 0; i < this.walls.length; i++) {
        penta.drawRectangle(this.x + i, this.y + 0, 1, this.walls[i], "gray");
        penta.drawRectangle(this.x + i, this.y + this.height - this.walls[i],
                            1, this.walls[i], "gray");
      }

      /* Draw blocks */
      for (var i = 0; i < this.blocks.length; i++) {
        penta.drawRectangle(this.x + this.blocks[i].x, this.y + this.blocks[i].y,
                      this.blocks[i].width, this.blocks[i].height, "#000");
      }

      /* Draw player */
      if (this.vertical) {
        this.player.x = 20;
      }

      penta.drawRectangle(this.x + this.player.x, this.y + this.player.y,
                          this.player.width, this.player.height, "#F00");
    }
  };

  return constructor;
})();
