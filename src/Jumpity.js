Jumpity = (function() {
  function constructor(x, y, width, height, live) {
    this.x = x;
    this.y = y;

    this.width = width;
    this.height = height;

    this.live = live;

    this.spaceBar = new Sprite("res/img/space_bar.png", 0, 0);
    this.spaceBar.width = 160;
    this.spaceBar.height = 100;
    this.spaceBar.alpha = 0.3;

    this.reloadVariables();
  }

  constructor.prototype = {
    reloadVariables: function() {
      this.bottomHeight = 10;

      this.player = {x: 50, y: this.height - this.bottomHeight - 16,
                     width: 16, height: 16, speed: 300,
                     vy: 0, yAcc: 0, canJump: true};

      this.triangles = new SpriteList();
      this.initialTriangleSpeed = 300;
      this.difficulty = 80;
      this.minimumDistance = this.width / 2;
    },

    goHard: function() {
      this.initialTriangleSpeed = 600;
      this.difficulty = 40;
      this.minimumDistance = this.width - 100;
    },
    
    update: function(dt) {
      if (isDown("space") && this.player.canJump) {
        if (this.player.vy < -500) {
          this.player.canJump = false;
        }

        if (this.player.vy > -500) {
          this.player.vy -= 120;
        }
      }

      if (this.player.y == this.height - this.bottomHeight -
          this.player.height) {
        this.player.canJump = true;
      }

      /* Apply friction */
      if (this.player.vy > 0.1) this.player.vy -= 0.1;
      if (this.player.vy < -0.1) this.player.vy += 0.1;
      if (Math.abs(this.player.vy) < 0.1) this.player.vy = 0;

      if (this.player.y + this.player.height <
          this.height - this.bottomHeight) {
        this.player.vy += 50;
      }

      if (this.player.y + this.player.height >
          this.height - this.bottomHeight) {
        this.player.y = this.height - this.bottomHeight - this.player.height;
        this.player.vy = 0;
      }

      this.player.y += this.player.vy * dt;

      /* Add triangles */
      if (getRandomInt(0, this.difficulty) == 1) {
        var lastTriangle = this.triangles.sprites[this.triangles.sprites.length - 1];
        var canAddNew;
        
        if (lastTriangle) {
          if (lastTriangle.x < this.minimumDistance) {
            canAddNew = true;
          } else {
            canAddNew = false;
          }
        } else {
          canAddNew = true;
        }

        if (canAddNew) {
          var newTriangle = new Sprite("res/img/triangle.png",
                                       this.width,
                                       this.height - this.bottomHeight - 16);
          newTriangle.speed = this.initialTriangleSpeed;
          
          this.triangles.push(newTriangle);
        }
      }

      for (var i = 0; i < this.triangles.sprites.length; i++) {
        this.triangles.sprites[i].x -= this.triangles.sprites[i].speed * dt;
      }

      /* Collision */
      for (var i = this.triangles.sprites.length -1; i >= 0; i--) {
        if ((this.triangles.sprites[i].x >= this.player.x &&
             this.triangles.sprites[i].x <= this.player.x + 16 ||
             this.triangles.sprites[i].x + 16 >= this.player.x &&
             this.triangles.sprites[i].x + 16 <= this.player.x + 16) &&
            this.triangles.sprites[i].y >= this.player.y &&
            this.triangles.sprites[i].y <= this.player.y + 16) {
          switchState(new GameOverState());
        }
      }
    },

    draw: function() {
      this.spaceBar.x = this.x + this.width / 2 - this.spaceBar.width / 2;
      this.spaceBar.y = this.y + this.height / 2 - this.spaceBar.height / 2;
      this.spaceBar.draw();

      /* Draw player */
      drawRectangle(this.x + this.player.x, this.y + this.player.y,
                    this.player.width, this.player.height, "#F00");

      drawRectangle(0, this.y + this.height - this.bottomHeight, this.width,
                    this.bottomHeight, "black");

      for (var i = 0; i < this.triangles.sprites.length; i++) {
        if (this.triangles.sprites[i]) {
          this.triangles.sprites[i].x += this.x;
          this.triangles.sprites[i].y += this.y;
        }
      }

      this.triangles.draw();

      for (var i = 0; i < this.triangles.sprites.length; i++) {
        if (this.triangles.sprites[i]) {
          this.triangles.sprites[i].x -= this.x;
          this.triangles.sprites[i].y -= this.y;
        }
      }
    }
  };

  return constructor;
})();
