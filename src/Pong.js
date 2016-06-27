Pong = (function() {
  function constructor(x, y, width, height, live) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.live = live;

    this.leftRight = new Pentagine.Sprite(penta, "res/img/left_right.png", 0, 0);
    this.leftRight.width = 160;
    this.leftRight.height = 100;
    this.leftRight.alpha = 0.3;

    this.reloadVariables();
  }

  constructor.prototype = {
    reloadVariables: function() {
      this.player = {x: this.width / 2 - 30, y: this.height - 20,
                     width: 60, height: 8, speed: 500};

      this.ball = new Pentagine.Sprite(penta, "res/img/ball.png", this.width / 2 - 16,
                             this.y + 30);

      this.ball.radius = 8;
      this.ball.diameter = this.ball.radius * 2;

      if (getRandomInt(0, 1) == 0) {
        this.ball.vx = getRandomInt(-200, -50);
      } else {
        this.ball.vx = getRandomInt(50, 200);
      }

      this.ball.vy = getRandomInt(180, 200);
    },

    goHard: function() {
      this.player.width = 30;
    },

    update: function(dt) {
      /* Player movement */
      if (penta.isDown("right") || penta.isDown("d")) {
        this.player.x += this.player.speed * dt;
      } else if (penta.isDown("left") || penta.isDown("a")) {
        this.player.x -= this.player.speed * dt;
      }

      /* Player Collision */
      if (this.player.x < 5) {
        this.player.x = 5;
      } else if (this.player.x + this.player.width > this.width - 5) {
        this.player.x = this.width - this.player.width - 5;
      }

      /* Ball v Side Walls */
      if (this.ball.x + this.ball.diameter >= this.width ||
          this.ball.x - this.ball.diameter <= 0) {
        this.ball.vx = -this.ball.vx;
      }

      /* Ball v Top Wall */
      if (this.ball.y <= 2) {
        this.ball.vy = -this.ball.vy;
      }

      /* Ball v Player */
      if (this.ball.y + this.ball.diameter < this.player.y &&
          this.ball.y + this.ball.diameter > this.player.y - 5 &&
          this.ball.x > this.player.x - this.ball.diameter - 5 &&
          this.ball.x < this.player.x + this.player.width) {
        this.ball.vy = -this.ball.vy;
        this.ball.y -= 10;
      }

      if (this.ball.y > this.height) {
        penta.switchState(new GameOverState());
      }

      this.ball.x += this.ball.vx * dt;
      this.ball.y += this.ball.vy * dt;
    },

    draw: function() {
      this.leftRight.x = this.x + this.width / 2 - this.leftRight.width / 2;
      this.leftRight.y = this.y + this.height / 2 - this.leftRight.height / 2;
      this.leftRight.draw();

      /* Draw player and ball */
      penta.drawRectangle(this.x + this.player.x, this.y + this.player.y,
                    this.player.width, this.player.height, "black");

      this.ball.x += this.x;
      this.ball.y += this.y;
      this.ball.draw();
      this.ball.x -= this.x;
      this.ball.y -= this.y;
    }
  };

  return constructor;
})();
