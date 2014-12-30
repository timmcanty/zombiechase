(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var BlackHole = Asteroids.BlackHole = function(game) {
    Asteroids.MovingObject.call(this, {
      pos: Asteroids.Game.randomPosition(),
      vel: [0.0],
      color: "red",
      radius: 15
    }, game)
  }

  Asteroids.Util.inherits(BlackHole, Asteroids.MovingObject);

  BlackHole.prototype.draw = function(ctx) {

    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2* Math.PI,
      false
    );

    ctx.fill();
  };

  BlackHole.prototype.move = function() {};








  })();
