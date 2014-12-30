(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (game) {
    Asteroids.MovingObject.call(this, {
      pos: Asteroids.Game.randomPosition(),
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      vel: [0,0]
    }, game)

    this.isFiring = false;
    this.bulletDirection = [null,null];
  };

  Ship.RADIUS = 25;
  Ship.COLOR = 'blue';
  Ship.BULLET_SPEED = 10;

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function() {
      if (this.game.score > this.game.hiscore) {
        this.game.hiscore = this.game.score;
      }
      this.game.score = 0;
      this.game.wave = 1;
      this.game.asteroids = [];
      this.game.bullets = [];
      this.game.shooters = [];
      this.vel = [0,0];
      this.pos = Asteroids.Game.randomPosition();
  };

  Ship.prototype.setVelocity = function(impulse) {
    this.vel[0] = impulse[0];
    this.vel[1] = impulse[1];
  };

  Ship.prototype.fireBullet = function(x,y) {
    this.bulletDirection[0] = x - this.pos[0];
    this.bulletDirection[1] = y - this.pos[1];
    this.bulletDirection = Asteroids.Util.normVec(this.bulletDirection, Ship.BULLET_SPEED);
    var bullet = new Asteroids.Bullet({pos: [game.ship.pos[0],game.ship.pos[1]], vel: this.bulletDirection}, this.game);
    bullet.move();
    bullet.move();
    this.game.bullets.push(bullet);
  };

  Ship.prototype.draw = function(ctx) {
    var imageObject = new Image();
    imageObject.src = 'images/shipv1.png';
    var width = 2 * this.radius;
    var height = 2 * this.radius;

    imageObject.onload = function () {
      ctx.drawImage(imageObject, this.pos[0] - this.radius, this.pos[1] - this.radius, width, height );
    }.bind(this);
  }


})();
