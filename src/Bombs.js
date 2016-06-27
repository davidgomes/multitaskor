Bombs = (function() {
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
      this.drops = new Pentagine.SpriteList();
      this.player = {x: this.width / 2 - 8, y: this.height - 20,
                     width: 16, height: 16, speed: 500}

      for (var i = 0; i < this.width / 16; i++) {
        this.drops.push(null);
      }

      this.difficulty = 15; // The lower, the harder.
    },

    goHard: function() {
      this.difficulty = 1;
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

      /* Add bombs here and there */
      if (getRandomInt(0, this.difficulty) == 1) {
        var newDrop = new Pentagine.Sprite(penta, "res/img/bomb.png",
                                           getRandomInt(0, this.width / 16) * 16, 2);

        newDrop.vy = 0;

        this.drops.push(newDrop);
      }

      /* Add bombs on top of the player */
      if (getRandomInt(0, this.difficulty + 35) == 1) {
        var newDrop = new Pentagine.Sprite(penta, "res/img/bomb.png",
                                           getRandomInt(this.player.x / 16 - 3,
                                                        this.player.x / 16 + 3) * 16,
                                           2);

        newDrop.vy = 0;

        this.drops.push(newDrop);
      }

      for (var i = 0; i < this.drops.sprites.length; i++) {
        if (this.drops.sprites[i]) {
          if (getRandomInt(0, 100) == 1) {
            this.drops.sprites[i].vy = 200;
          }

          this.drops.sprites[i].y += this.drops.sprites[i].vy * dt;
        }
      }

      /* Collision between player and bombs */
      for (var i = this.drops.sprites.length -1; i >= 0; i--) {
        if (this.drops.sprites[i]) {
          if ((this.drops.sprites[i].x >= this.player.x &&
               this.drops.sprites[i].x <= this.player.x + 16 ||
               this.drops.sprites[i].x + 16 >= this.player.x &&
               this.drops.sprites[i].x + 16 <= this.player.x + 16) &&
              this.drops.sprites[i].y >= this.player.y &&
              this.drops.sprites[i].y <= this.player.y + 16) {
            penta.switchState(new GameOverState());
          }
        }
      }
    },

    draw: function() {
      this.leftRight.x = this.x + this.width / 2 - this.leftRight.width / 2;
      this.leftRight.y = this.y + this.height / 2 - this.leftRight.height / 2;
      this.leftRight.draw();

      for (var i = 0; i < this.drops.sprites.length; i++) {
        if (this.drops.sprites[i]) {
          this.drops.sprites[i].x += this.x;
          this.drops.sprites[i].y += this.y;
        }
      }

      this.drops.draw();

      for (var i = 0; i < this.drops.sprites.length; i++) {
        if (this.drops.sprites[i]) {
          this.drops.sprites[i].x -= this.x;
          this.drops.sprites[i].y -= this.y;
        }
      }

      penta.drawRectangle(this.x + this.player.x, this.y + this.player.y,
                          this.player.width, this.player.height, "#000");
    }
  };

  return constructor;
})();
