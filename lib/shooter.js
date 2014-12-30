(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }


  var Shooter = Asteroids.Shooter = function (options, game) {
    Asteroids.MovingObject.call(this, {
      pos: options.pos || Asteroids.Game.randomPosition(),
      radius: Shooter.RADIUS,
      vel: options.vel || [0,0]
    }, game)

    this.bulletCountdown = Shooter.BULLET_COUNTDOWN;
    this.bulletDirection = [0,0];


  };

  Shooter.RADIUS = 25;
  Shooter.BULLET_COUNTDOWN = 50;
  Shooter.BULLET_RANDOM = 0;
  Shooter.BULLET_SPEED = 10;
  Asteroids.Util.inherits(Shooter, Asteroids.MovingObject);


  Shooter.prototype.draw = function(ctx) {
    var imageObject = new Image();
    imageObject.src = 'images/shooter.png';

    var width = 2 * this.radius;
    var height = 2 * this.radius;

    imageObject.onload = function () {
      ctx.drawImage(imageObject, this.pos[0] - this.radius, this.pos[1] - this.radius, width, height );
    }.bind(this);
  };

  Shooter.prototype.move = function() {
    this.pursues(this.game.ship);
  };

  Shooter.prototype.pursues = function(obj) {

    var toObj = Asteroids.Util.fromToVec(this.pos, obj.pos);
    var toObj = Asteroids.Util.normVec(toObj, 1);

    if(this.bulletCountdown === 0) {
      this.bulletCountdown = Shooter.BULLET_COUNTDOWN;
      this.fireBullet(toObj);
    }
    this.vel[0] = toObj[0];
    this.vel[1] = toObj[1];
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    this.bulletCountdown--;
  };

  Shooter.prototype.fireBullet = function(toObj) {
    this.bulletDirection[0] = toObj[0] + Shooter.BULLET_RANDOM * (Math.random() - Math.random());
    this.bulletDirection[1] = toObj[1] + Shooter.BULLET_RANDOM * (Math.random() - Math.random());
    this.bulletDirection = Asteroids.Util.normVec(this.bulletDirection, Shooter.BULLET_SPEED);
    var bullet = new Asteroids.Bullet({pos: [this.pos[0],this.pos[1]], vel: this.bulletDirection}, this.game);
    bullet.move();
    bullet.move();
    this.game.bullets.push(bullet);
  };
































})();
