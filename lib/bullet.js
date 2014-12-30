(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function(hash,game) {
    this.img = Bullet.currentImg
    Bullet.currentImg = (Bullet.currentImg + 1) % 4

    Asteroids.MovingObject.call(this, {
      pos: hash.pos,
      vel: [hash.vel[0] * Bullet.SPEED, hash.vel[1] * Bullet.SPEED],
      color: Bullet.COLOR,
      radius: Bullet.RADIUS
    }, game)
  };


  Bullet.SPEED = 2;
  Bullet.COLOR = 'red';
  Bullet.RADIUS = 10;

  Bullet.currentImg = 1


  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.prototype.isWrappable = false;

  Bullet.prototype.collideWith = function (otherObject) {
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.score += 100;
      this.game.remove(this);
      this.game.remove(otherObject);
    } else if (otherObject instanceof Asteroids.Shooter) {
      this.game.score += 500;
      this.game.remove(this);
      this.game.remove(otherObject);
    } else if (otherObject instanceof Asteroids.Ship) {
      this.game.ship.relocate();
      this.game.remove(this);
    }
  };


  Bullet.prototype.draw = function(ctx) {
    var imageObject = new Image();
    imageObject.src = 'images/bulletv' + this.img + '.png';

    var width = 2 * this.radius;
    var height = 2 * this.radius;

    imageObject.onload = function () {
      ctx.drawImage(imageObject, this.pos[0] - this.radius, this.pos[1] - this.radius, width, height );
    }.bind(this);
  };


})();
