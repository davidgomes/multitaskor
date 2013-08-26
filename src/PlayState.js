function PlayState() {
  this.setup = function() {
    this.width = canvas.width;
    this.height = canvas.height;

    this.timer = new TenSecondsTimer();

    this.games = [new Tunnel(0, 0, this.width, this.height, false),
                  new Pong(0, 0, this.width, this.height, false),
                  new Jumpity(0, 0, this.width, this.height, false),
                  new Bombs(0, 0, this.width, this.height, false)];

    this.lastVerticalSplitSecondGame = -1;
    this.lastHorizontalSplitSecondGame = -1;
    this.lastFullScreenGame = -1;

    this.newGame();
  }

  this.newGame = function() {
    if (score != -1) {
      document.getElementById("stagechange").play();
    }

    this.timer.start();
    score++;

    if (score < this.games.length) { /* Initial mechanism */
      var newGameIndex = 0;
      for (var i = 0; i < this.games.length; i++) {
        if (this.games[i].live) {
          newGameIndex = i + 1;
          this.games[i].live = false;
        }
      }

      this.games[newGameIndex].live = true;
      this.games[newGameIndex].reloadVariables();
    } else { /* Advanced mechanism */
      var fullScreenDifficulty = 5;

      if (score > 10) fullScreenDifficulty = 4;
      
      if (getRandomInt(0, fullScreenDifficulty) == 0) { // Full screen game
        for (var i = 0; i < this.games.length; i++) {
          this.games[i].live = false;
        }

        var newGameIndex = getRandomInt(0, 3);

        do {
          newGameIndex = getRandomInt(0, 3);
        } while (newGameIndex == this.lastFullScreenGame);

        this.lastVerticalSplitSecondGame = -1;
        this.lastHorizontalSplitSecondGame = -1;
        this.lastFullScreenGame = newGameIndex;

        this.games[newGameIndex].live = true;
        this.games[newGameIndex].x = 0;
        this.games[newGameIndex].y = 0;
        this.games[newGameIndex].width = this.width;
        this.games[newGameIndex].height = this.height;
        this.games[newGameIndex].reloadVariables();

        if (score > 10) {
          this.games[newGameIndex].goHard();
        }
      } else {
        for (var i = 0; i < this.games.length; i++) {
          this.games[i].live = false;
        }

        var firstGame;
        var secondGame;
        if (getRandomInt(0, 1) == 0) { // Horizontal Split
          if (this.lastHorizontalSplitSecondGame != -1) {
            if (this.lastHorizontalSplitSecondGame == 2) {
              secondGame = 0;
              firstGame = this.lastHorizontalSplitSecondGame;
            } else {
              secondGame = 2;
              firstGame = this.lastHorizontalSplitSecondGame;
            }
          } else {
            if (getRandomInt(0, 1) == 0) {
              firstGame = 0;
              secondGame = 2;
            } else {
              firstGame = 2;
              secondGame = 0;
            }
          }

          this.lastVerticalSplitSecondGame = -1;
          this.lastHorizontalSplitSecondGame = secondGame;
          this.lastFullScreenGame = -1;

          this.games[firstGame].live = true;
          this.games[firstGame].x = 0;
          this.games[firstGame].y = 0;
          this.games[firstGame].width = this.width;
          this.games[firstGame].height = this.height / 2;
          this.games[firstGame].reloadVariables();

          this.games[secondGame].live = true;
          this.games[secondGame].x = 0;
          this.games[secondGame].y = this.height / 2;
          this.games[secondGame].width = this.width;
          this.games[secondGame].height = this.height / 2;
          this.games[secondGame].reloadVariables();
        } else { // Vertical
          firstGame = 0;

          if (this.lastVerticalSplitSecondGame != -1) {
            if (this.lastVerticalSplitSecondGame == 3) {
              secondGame = 1;
            } else {
              secondGame = 3;
            }
          } else {
            if (getRandomInt(0, 1) == 0) {
              secondGame = 1;
            } else {
              secondGame = 3;
            }
          }

          this.lastVerticalSplitSecondGame = secondGame;
          this.lastHorizontalSplitSecondGame = -1;
          this.lastFullScreenGame = -1;

          this.games[firstGame].live = true;
          this.games[firstGame].x = 0;
          this.games[firstGame].y = 0;
          this.games[firstGame].width = this.width / 2;
          this.games[firstGame].height = this.height;
          this.games[firstGame].reloadVariables();
          this.games[firstGame].vertical = true;

          this.games[secondGame].live = true;
          this.games[secondGame].x = this.width / 2;
          this.games[secondGame].y = 0;
          this.games[secondGame].width = this.width / 2;
          this.games[secondGame].height = this.height;
          this.games[secondGame].reloadVariables();
        }
      }
    }
  }

  this.update = function() {
    if (this.timer.time == 0) {
      this.newGame();
    }

    for (var i = 0; i < this.games.length; i++) {
      if (this.games[i].live) {
        this.games[i].update(this.dt);
      }
    }
  }

  this.draw = function() {
    clearCanvas();

    drawRectangle(0, 0, 640, 400, "lightgray");

    var nLives = 0;
    for (var i = 0; i < this.games.length; i++) {
      if (this.games[i].live) {
        this.games[i].draw();
        nLives++;
      }
    }

    if (nLives > 1) {
      if (this.games[0].vertical) {
        drawRectangle(this.width / 2, 0, 1, this.height, "black");
      } else {
        drawRectangle(0, this.height / 2, this.width, 1, "black");
      }
    }

    this.timer.draw();
  }
}
