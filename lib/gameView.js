(function () {
  if(typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
  };

  GameView.prototype.start = function () {
    var game = this.game;


    // key('up', function () { game.ship.power([0,-5])});
    // key('left', function () { game.ship.power([-5,0])});
    // key('right', function () { game.ship.power([5,0])});
    // key('down', function () { game.ship.power([0,5])});
    // key('space', function() { game.ship.fireBullet(); } );

    setInterval( function () {
        var movement = [0,0];
      if (key.isPressed('up')) {movement[1] -= Asteroids.Game.MOVE_SPEED;}
      if (key.isPressed('down')) {movement[1] += Asteroids.Game.MOVE_SPEED;}
      if (key.isPressed('left')) {movement[0] -= Asteroids.Game.MOVE_SPEED;}
      if (key.isPressed('right')) {movement[0] += Asteroids.Game.MOVE_SPEED;}
      game.ship.setVelocity(movement);
      this.game.step();
      this.game.draw(this.ctx);
      this.ctx.fillStyle = 'white';
      this.ctx.fillText('Level: ' + (this.game.wave - 1), 100,100);
      this.ctx.fillText('Score: ' + this.game.score,400, 100);
      this.ctx.fillText('Hi-Score: ' + Math.max(this.game.score,this.game.hiscore),900,100);
      if (this.game.triggerNewWaveText > 0) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillText('NEW WAVE APPROACHING', 600, 500)
      }
    }.bind(this), 20);
  };



})();
