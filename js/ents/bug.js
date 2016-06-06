$.Bug = function (game, opts) {

    opts = opts || {};
    opts.col = opts.col || 'pinky';

    this.opts = opts;
    this.wins = 0;
    this.score = 0;
    this.kills = 0;
    this.killed = false;
    this.forceLeft = false;
    this.forceLeft = false;
    this.forceRight = false;

    this.game = game;
    this._p = opts.parent;

    this.size = opts.scale;
    this.player = opts.player;
    this.col = opts.col;

    Phaser.Sprite.call(this, game, opts.x, opts.y, 'bugs', this.col+ '/head_0.png');

    this.animations.add('head', [this.col+'/head_0.png', this.col+'/head_1.png'], 4, true);
    this.animations.add('head_stop', [this.col+'/head_0.png'], 10, true);
    this.animations.play('head');

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.scale.x = opts.scale;
    this.scale.y = opts.scale;
    this.angle = opts.angle;
    this.anchor.setTo(0.5, 0.5);
    this.body.collideWorldBounds = true;
    this.parts = [];
    this.partsOffset = this.width;
    this.moves = [];
    this.speed = 100;
    this.isCpu = opts.cpu || false;

    this.brain = {};

    this.munchCounter = false;

    this.init();

    if (opts.controls === 1) {
        this.controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        };
    } else if (opts.controls === 2) {
        this.controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.Z),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.X)
        };
    } else if (opts.controls === 3) {
        this.controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.N),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.M)
        };
    } else if (opts.controls === 4) {
        this.controls = {
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.Q),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.W)
        };
    } 

};


$.Bug.prototype = Object.create(Phaser.Sprite.prototype);
$.Bug.prototype.constructor = $.Bug;


$.Bug.prototype.init = function() {

    var i, s = this;

    this.speed = 2;
    this.turningCircle = 5;

    this.angle = this.opts.angle;
    this.invincibility = 50;

    this.parts = [];
    this.moves = [];

    for (i = 0; i < 2; i += 1) {
      this.addPart(i);
    }

};


$.Bug.prototype.munch = function() {

  var tween;

  if (!this.alive) {
    return;
  }

  if (this.munchCounter === false) {
    this.munchCounter = 1;
  }


  if ($.sfx) {
    this._p.sfx.collect.play();
  }

  if (!this.parts[this.munchCounter - 1]) {
    return;
  }

  this.parts[this.munchCounter - 1].isMunching = true;
  tween = this.game.add.tween(this.parts[this.munchCounter - 1].scale);
  tween.to({x: [4, 2], y: [4,2]}, 50, Phaser.Easing.Linear.InOut);
  tween.onComplete.add(function() {

    if (this.alive && this.parts[this.munchCounter - 1]) {
      this.parts[this.munchCounter - 1].isMunching = false;
      if (this.munchCounter >= this.parts.length - 1) {
        this.munchCounter = false;
        this.addPart();
        // this._p.sfx.pop.play();
      } else {
        this.munchCounter += 1;
        this.munch();
      }
    }
  }.bind(this), this);
  tween.start();

};


$.Bug.prototype.addPart = function() {

  var tmp,
    g = this.game,
    tween;
  
  tmp = g.bodies.create(-20, -20, 'bugs', this.col+'/body_0.png');
  tmp.animations.add('body', [this.col+'/body_0.png', this.col+'/body_1.png'], 10, true);
  tmp.animations.add('body_munch', [this.col+'/body_munch.png'], 10, true);
  tmp.animations.add('stop', [this.col+'/body_1.png'], 10, true);
  tmp.animations.add('tail', [this.col+'/tail.png']);

  tmp.hidden = false;
  tmp.scale.x = this.scale.x;
  tmp.scale.y = this.scale.y;
  tmp.anchor.setTo(0.5, 0.5);
  tmp.id = this.parts.length;
  tmp.player = this.col;
  tmp.isMunching = false;
  g.physics.enable(tmp, Phaser.Physics.ARCADE);
  this.parts.push(tmp);

};


$.Bug.prototype.update = function() {

    var s = this,
        g = this.game,
        radians,
        i, pos,
        vx, vy,
        left, right,
        cpu;

    if (s._p.gameOver) {
      this.animations.play('head_stop');
      return;
    }

    s.body.velocity.x = 0;
    s.body.velocity.y = 0;

    if (s.isCpu) {
     cpu = s.getCpuMove(); 
     left = cpu.left;
     right = cpu.right;
    } else {
      if (s.invincibility < -5) {
        left = s.controls.left.isDown || s.forceLeft;
        right = s.controls.right.isDown || s.forceRight;
      }
    }

    if (left && right) {
      s.boost = true;

    }
    else if (left) {
        s.angle -= s.turningCircle;
    }
    else if (right) {
        s.angle += s.turningCircle;
    }


    radians = ( s.angle * Math.PI ) / 180;
    vx = Math.cos(radians) * s.speed;
    vy = Math.sin(radians) * s.speed;

    s.x += vx;
    s.y += vy;

    s.moves.push({x: s.x, y: s.y, a: s.angle});

    if (s.boost) {
      s.x += vx;
      s.y += vy;

      s.moves.push({x: s.x, y: s.y, a: s.angle});
    }

    s.moveBody();
    s.checkBounds();

    s.boost = false;
    s.invincibility -= 1;
    if (s.invincibility > 0) {
      s.alpha = 0.5;
    } else {
      s.alpha = 1;
    }


    // this.game.world.bringToTop(this.countdownShadow);
    // this.game.world.bringToTop(this.countdown);

};


$.Bug.prototype.moveBody = function(stop) {

    var s = this,
        i,
        anim = stop ? 'stop' : 'body';



    for (i = 0; i < s.parts.length; i += 1) {
      pos = s.moves[(s.moves.length) - ( ((i + 1) * s.width / (s.boost ? s.speed : s.speed)) ) ];
      if (pos && s.parts[i].hidden === false) {
        s.parts[i].x = pos.x;
        s.parts[i].y = pos.y;
        s.parts[i].angle = pos.a;

        if (i === ( s.parts.length - 1 ) ) {
          s.parts[i].animations.play('tail', 60, true);
        } else {
          if (s.parts[i].isMunching) {
            s.parts[i].animations.play('body_munch');
          } else {
            s.parts[i].animations.play(anim);
          }
        }

      }
    }
};



$.Bug.prototype.die = function() {

    var s = this,
        anim = (s.dead) ? '_dead' : '',
        delay = 200,
        frame,
        timer,
        x, y,
        i, bone;

    this.alive = false;
    this.justKilled = true;
    this.deadX = this.x;
    this.deadY = this.y;

    s._p.makeThud(s.x, s.y, 3, true);

    bone = s.game.bones.create(this.x, this.y, 'bugs', this.col + '/bone_head.png');
    bone.scale.x = s.opts.scale;
    bone.angle = s.angle;
    bone.scale.y = s.opts.scale;
    // bone.frame = 4;
    bone.alpha = 1;
    bone.anchor.setTo(0.5, 0.5);
    bone.tint = 0x555555;

    for (i = 0; i < s.parts.length; i += 1) {
      x = s.parts[i].x;
      y = s.parts[i].y;
      frame = (i === ( s.parts.length - 1 )) ? ['bone_tail'] : ['bone_body'];
      bone = s.game.bones.create(s.parts[i].x, s.parts[i].y, 'bugs', this.col + '/'+frame+'.png');
      bone.scale.x = s.opts.scale;
      bone.angle = s.parts[i].angle;
      bone.scale.y = s.opts.scale;
      bone.alpha = 1;
      bone.tint = 0x555555;
      bone.anchor.setTo(0.5, 0.5);
      s._p.makeThud(s.parts[i].x, s.parts[i].y, Math.random() * 4, false);
      s.parts[i].hidden = true;
      s.parts[i].moves = [];
      s.game.bodies.remove(s.parts[i], true);
      s.game.world.remove(s.parts[i].res);

      }

    this.timesKilled += 1;
    this.kill();
    s.parts = [];
    s.moves = [];

    window.setTimeout(function() {
      this.reset(this.opts.x, this.opts.y);
      this.init();
    }.bind(this), 1000);

};



$.Bug.prototype.checkBounds = function() {

  var g = this.game,
      w = g.world.width,
      h = g.world.height,
      border = g.border;

  if (this.killed) {
    return true;
  }

  if (this.x > (w - border)) {
    this.x = w - border;
  } else if (this.x < (border)) {
    this.x = border;
  }


  if (this.y > (h - border)) {
    this.y = h - border;
  } else if (this.y < (border)) {
    this.y = border;
  }

};


$.Bug.prototype.getCpuMove = function() {

  var moves = {l: 0, r: 0};

  this.brain.canAccelerate = true;
  if (!this.brain.target) {
    this.brain.target = this.findTarget();
  } else {
    moves = this.seekTarget();
  }

  return moves;

};


$.Bug.prototype.findTarget = function() {
  return this._p.worm;
};

$.Bug.prototype.seekTarget = function() {

    this.brain.target = this.findTarget();
    var angle = this.game.physics.
                    arcade.angleBetween(this, this.brain.target),
        left = 0,
        right = 0,
        limit = 60,
        diff;

    angle = ~~( angle * (180/Math.PI) );
    diff = angle - this.angle;

    if (this.brain.canAccelerate && diff > -1 && diff < 1) {
      left = 1; right = 1;
    }
    else if (angle < this.angle) {
      left = 1; 
    } else if (angle > this.angle) {
      right = 1; 
    }

// override for edge detection
 if (this.y < limit) {
  if (this.x < limit) {
    left = 0; right = 1;
  } else {
    left = 1; right = 0;
  }
 }

 if (this.y > this.game.world.height - limit) {
  if (this.x < limit) {
    left = 1; right = 0;
  } else {
    left = 0; right = 1;
  }
 }


  return {
    left: left, right: right
  };
};

