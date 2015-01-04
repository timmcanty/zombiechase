(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function() {
    this.numAsteroids = Game.NUM_ASTEROIDS;
    this.asteroids = [];
    this.bullets = [];
    this.particles = [];
    this.blackHole = [];
    this.shooters = [];
    this.ship = new Asteroids.Ship(this);
    this.score = 0;
    this.hiscore = 0;
    this.triggerNewWaveText = 0;
    // this.blackHole = new Asteroids.BlackHole(this);

    Asteroids.Asteroid.RADIUS = Asteroids.Asteroid.radius(Game.DIM_X, Game.DIM_Y, Game.NUM_ASTEROIDS, 0.10)
    this.wave = 1;
    this.newWave();

  };

  Game.DIM_X = 1600;
  Game.DIM_Y = 850;
  Game.NUM_ASTEROIDS = 20;
  Game.MOVE_SPEED = 10;

  Game.randomPosition = function () {
    var pos = [Game.randomX(), Game.randomY() ];
    return pos;
  };

  Game.randomX = function () {
    return (Math.random() * Game.DIM_X);
  };

  Game.randomY = function () {
    return (Math.random() * Game.DIM_Y);
  };



  Game.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > Game.DIM_X) || (pos[1] < 0 || pos[1] > Game.DIM_Y);
  };

  Game.prototype.bulletWave = function () {
    var bulletSpeed = Math.min(this.wave,8);
    var bulletNumber = Math.min(this.wave,12);
    this.triggerNewWaveText = 30;
    var distance = Game.DIM_X / bulletNumber;

    for (var i = 0; i < bulletNumber; i++) {
      var bullet = new Asteroids.Bullet({pos: [distance*i, 0], vel: [ 0,bulletSpeed]}, this);
      var bullet2 = new Asteroids.Bullet({pos: [distance*i+ distance/2, Game.DIM_Y], vel: [ 0,-bulletSpeed]}, this);
      this.bullets.push(bullet);
      this.bullets.push(bullet2)
    }
    this.wave++;
  };



  Game.prototype.newWave = function (num) {
    if (this.wave % 2 === 0) {
      this.bulletWave();
      return;
    }
    this.triggerNewWaveText = 30;
    var current = this.wave;
    while (current > 0) {
      this.asteroids.push(new Asteroids.Asteroid({
        pos: [0, Game.randomY()],
        vel: [Math.random() * 10, (Math.random() * 10) -5]}
        , this));
      this.add(new Asteroids.Asteroid({ pos: [Game.DIM_X, Game.randomY()], vel: [Math.random() * -10, (Math.random() * 10) -5]}, this));
      this.add(new Asteroids.Asteroid({ pos: [Game.randomX(), 0], vel: [(Math.random() * 10) -5, (Math.random() * 10)]}, this));
      this.add(new Asteroids.Asteroid({ pos: [Game.randomX(), Game.DIM_Y], vel: [(Math.random() * 10) -5, (Math.random() * -10) -5]}, this));
      current--;
    }
    for (var i = 0; i < Math.floor(this.wave / 2); i++) {
      this.shooters.push(new Asteroids.Shooter({
      }, this));
    };
    this.wave++;

  };

  Game.prototype.allObjects = function() {
    return [this.ship].concat(this.asteroids).concat(this.shooters).concat(this.bullets);
  };


  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.Shooter) {
      this.shooters.push(obj);
    }
  };

  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach( function (object) {
      object.draw(ctx);
    });
  };

  Game.prototype.moveObjects = function() {
      this.allObjects().forEach(function (object) {
        object.move();
      });
  };



  Game.prototype.checkCollisions = function() {
    var allObjs = this.allObjects();

    for (var i = 0; i < allObjs.length - 1; i++) {
      for (var j = i+1; j < allObjs.length; j++) {
        if (allObjs[i].isCollidedWith(allObjs[j])) {
          allObjs[j].collideWith(allObjs[i]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    if (this.asteroids.length === 0 && this.shooters.length === 0 && this.bullets.length === 0) {
      this.newWave();
    }
    this.triggerNewWaveText--;
    this.moveObjects();
    this.checkCollisions();
  };


  Game.prototype.remove = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if (this.asteroids[i] === obj) {
            this.asteroids.splice(i, 1);
        }
      }
    } else if (obj instanceof Asteroids.Bullet) {
      for (var i = 0; i < this.bullets.length; i++) {
        if (this.bullets[i] === obj) {
            this.bullets.splice(i, 1);
        }
      }
    } else if (obj instanceof Asteroids.Shooter) {
      for (var i = 0; i < this.shooters.length; i++) {
        if (this.shooters[i] === obj) {
          this.shooters.splice(i, 1);
      }
    }
  }
  };



})();
