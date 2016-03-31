$.Thud = function (game, opts) {

  var s;
  opts = opts || {};

  this.game = game;
  
  this.opts = opts;
  this._p = opts.parent;
  this.scale = opts.scale;



  s = Phaser.Sprite.call(this, game, game.world.centerX, game.world.centerY, 'food', 0);
  this.scale.x = opts.scale;
  this.scale.y = opts.scale;
  this.anchor.setTo(0.5, 0.5);
  game.physics.enable(this, Phaser.Physics.ARCADE);


  this.name = 'thud';
  this.tick = 0;

};



$.Food.prototype = Object.create(Phaser.Sprite.prototype);
$.Food.prototype.constructor = $.Food;

$.Food.prototype.update = function() {
  if (this.tick % 18 === 0) {
    this.scale.x *= -1;
  }
  this.tick += 1;
};


$.Food.prototype.spawn = function() {
  var g = this.game;
  this.x = ~~( Math.random() * ( g.world._width - 100 ) ) + 50;
  this.y = ~~( Math.random() * ( g.world._height - 100 ) ) + 50;
};

