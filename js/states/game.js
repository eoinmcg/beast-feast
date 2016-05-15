$.Game = function (game) {


};

$.Game.prototype = {

  create: function () {

    var g = this.game,
        s = this,
        i, tmp;

    this.scale = 2;
    this.gameTime = 30;
    this.includeAI = $.includeAI;
    this.introPlaying = true;

    this.totals = $.totals;

    this.tints = {
      bluey: 0x29adff,
      greeny: 0x00e232,
      pinky: 0xff004d,
      yelly: 0xffe727
    };
    window.t = this;

    this.shakeWorld = 0;
    this.gameOver = false;

    if ($.music) {
      this.music = this.game.add.audio('titleMusic');
      this.music.play();
    }

    g.input.addPointer();
    g.input.addPointer();
    g.input.addPointer();
    g.input.addPointer();

    this.sfx = {
      combo: this.game.add.audio('combo'),
      collect: this.game.add.audio('collect'),
      pop: this.game.add.audio('pop'),
      thud: this.game.add.audio('thud')
    };



    this.init();

  },


  init: function() {

    var g = this.game,
        s = this,
        player;

    g.border = 27;

    this.timer = g.time.create(false);
    this.timer.loop(this.gameTime * 1000, function() {
      s.gameOverSequence();
    }, this);
    this.timer.start();


    g.stage.backgroundColor = '343635';
    this.background = this.game.add.sprite(0, 0, 'bugs', 'bg.png');
    this.background.scale.x = this.scale;
    this.background.scale.y = this.scale;

    this.emitter = this.makeEmitter();


    this.game.bones = g.add.group();
    this.game.heads = g.add.group();
    this.game.bodies = g.add.group();
    this.game.foods = g.add.group();
    this.explosions = g.add.group();
    this.points = g.add.group();

    this.worm = new $.Food(g, {scale: this.scale, parent: this});
    this.game.foods.add(this.worm);

    this.makePlayers();


    this.scores = [];

    this.scores.p1 = this.game.add.bitmapText(10, -5, '8bit', '0', 30);
    this.scores.p1.tint = 0x29adff;

    this.scores.p2 = this.game.add.bitmapText(g.world.width - 30, -5, '8bit', '0', 30);
    this.scores.p2.tint = 0x00e232;

    this.scores.p3 = this.game.add.bitmapText(10, g.world.height - 30, '8bit', '0', 30);
    this.scores.p3.tint = 0xff004d;

    this.scores.p4 = this.game.add.bitmapText(g.world.width - 30, g.world.height - 30, '8bit', '0', 30);
    this.scores.p4.tint = 0xffe727;


    this.controls = [];
  
    if (!Phaser.Device.desktop) {
      this.controls[0] = g.add.button(0,0, 'controls');
      this.controls[0].scale.x = 2;
      this.controls[0].scale.y = 2;
      this.controls[0].onInputUp.add(s.p1LeftUp, this);
      this.controls[0].onInputDown.add(s.p1LeftDown, this);

      this.controls[1] = g.add.button(0,320, 'controls');
      this.controls[1].scale.x = 2;
      this.controls[1].scale.y = -2;
      this.controls[1].onInputUp.add(s.p1RightUp, this);
      this.controls[1].onInputDown.add(s.p1RightDown, this);

      this.controls[2] = g.add.button(240,0, 'controls');
      this.controls[2].scale.x = 2;
      this.controls[2].scale.y = 2;
      this.controls[2].onInputUp.add(s.p2LeftUp, this);
      this.controls[2].onInputDown.add(s.p2LeftDown, this);

      this.controls[3] = g.add.button(240,320, 'controls');
      this.controls[3].scale.x = 2;
      this.controls[3].scale.y = -2;
      this.controls[3].onInputUp.add(s.p2RightUp, this);
      this.controls[3].onInputDown.add(s.p2RightDown, this);

      for (var i = 0; i < this.controls.length; i += 1) {
        g.add.tween(this.controls[i])
          .to({alpha: 0}, 500, Phaser.Easing.Elastic.EaseInOut)
          .start()
      } 
    }



    this.countdownShadow = this.game.add.bitmapText(g.world.centerX+2, 4, '8bit','',50);
    this.countdownShadow.anchor.x = 0.5;
    this.countdownShadow.tint = 0x000000;
    this.countdown = this.game.add.bitmapText(g.world.centerX, 2, '8bit','',50);
    this.countdown.anchor.x = 0.5;
    this.countdown.tint = 0xffffff;

  },

  reset: function() {

    var g = this.game, 
        player = this.game.heads.children,
        i = player.length;


    while(i--) {
      player[i].reset();
    }

    
  },

	update: function () {

    var g = this.game, 
        dead = 0,
        players = this.game.heads.children,
        i = players.length,
        reStart, quit;

    if (this.gameOver) {
      reStart = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
      quit = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
      if (reStart.isDown) {
          this.restartGame();
      } else if (quit.isDown) {
        this.state.start('Splash');
      }
    }

    g.physics.arcade.overlap(this.game.heads, this.game.foods, this.eatFood, null, this);
    g.physics.arcade.overlap(this.game.heads, this.game.bodies, this.hitBody, null, this);
    g.physics.arcade.overlap(this.game.heads, this.game.heads, this.hitHead, null, this);

    while(i--) {
      this.scores[players[i].player].text = players[i].score.toString();
      if (players[i].killed) {
        dead += 1;
      }
    }

    if (dead === players.length - 1) {
      // this.reset();
    }

    this.doShakeWorld();

    this.countdown.text = ~~(this.timer.duration / 1000);

    this.countdownShadow.text = this.countdown.text;

    if (this.debug) {
      this._debug();
    }



    if (this.game.input.keyboard.addKey(Phaser.Keyboard.P).isDown) {
        this._screenshot();
    }

	},



  render: function() {

  },


  gameOverSequence: function() {
  
      var g = this.game,
          s = this,
          player = this.game.heads.children,
          hi = 0,
          tween,
          winner = '',
          winnerCol = '',
          winnerTint = '',
          i = player.length,
          reStart;

      if ($.music) {
        this.music.stop();
      }

      if (this.gameOver) {
        return;
      }

      while(i--) {
        if (player[i].score > hi) {
          hi = player[i].score;
          winner = player[i].col;
          winnerCol = player[i].col;
        } 
        player[i].moveBody('stop');
      }

    // }
    winnerTint = this.tints[winner];

    this.totals[winner] += 1;


    var overlay = this.game.add.sprite(0, 0, 'bugs', 'bg.png');
    overlay.scale.x = this.scale;
    overlay.scale.y = this.scale;
    overlay.tint = 0x000000;
    overlay.alpha = 0;
    var overlayTween = this.game.add.tween(overlay)
      .to({ alpha: 0.5 }, 1000, Phaser.Easing.Elastic.EaseInOut)
      .start();

    winner = winner.toString().toUpperCase() + ' WINS';

    this.gameOver = true;


    this.winnerText = this.game.add.bitmapText(g.world.centerX, g.world.height + 200, '8bit', winner, 72);
    this.winnerText.tint = winnerTint;
    this.winnerText.anchor.x = 0.5;


    tween = this.game.add.tween(this.winnerText)
        .to({y: 0}, 1000, Phaser.Easing.Elastic.EaseInOut)
        .start();

        tween.onComplete.add(function() {
              var victorTween;
              this.victor = this.game.add.sprite(this.game.world.centerX - 25, 270, 'bugs', winnerCol + '/head_0.png');
              this.victor.animations.add('laugh', [winnerCol+'/head_0.png', winnerCol+'/head_1.png'], 10, true);
              this.victor.anchor.x = 0.5;
              this.victor.scale.x = 6;
              this.victor.scale.y = 5;
              this.victor.angle = -110;
              this.victor.animations.play('laugh')
              victorTween = this.game.add.tween(this.victor).to({angle: -80}, 400, Phaser.Easing.Elastic.EaseInOut, true, 1000, true);
              victorTween.repeat(10, 500);
              this.showScoreSummaries();
          }.bind(this));

      window.setTimeout(function() {
        this.buttonRestart = g.add.button(40, 500, 
                        'button', this.restartGame, this, 3, 3, 3);
        this.buttonRestart.scale.x = 2;
        this.buttonRestart.scale.y = 1.5;
        tmp = g.add.bitmapText(5, 3, '8bit', "Replay", 16);
        this.buttonRestart.addChild(tmp);
        this.game.add.tween(this.buttonRestart)
            .to({y: 260}, 1000, Phaser.Easing.Elastic.Out)
            .start();
      }.bind(this), 1000);

      window.setTimeout(function() {
        var tmp;
        this.buttonReset = g.add.button(340, 500, 
                        'button', this.resetGame, this, 3, 3, 3);
        this.buttonReset.scale.x = 2;
        this.buttonReset.scale.y = 1.5;
        this.buttonReset.tint = 0xc2c3c7;
        tmp = g.add.bitmapText(11, 3, '8bit', "Quit", 16);
        this.buttonReset.addChild(tmp);
        this.game.add.tween(this.buttonReset)
            .to({y: 260}, 1000, Phaser.Easing.Elastic.Out)
            .start();
      }.bind(this), 1200);

    this.countdown.kill();
    this.countdownShadow.kill();

  },

    restartGame: function() {
      this.state.start('GetReady');
    },


    resetGame: function() {
      $.totals = {
        bluey: 0,
        greeny: 0,
        pinky: 0,
        yelly: 0
      };
      this.state.start('Splash');
    },

    makeThud: function(x, y, scale, fx) {
        // var explosion = this.explosions.getFirstExists(false);
        var explosion = this.explosions.create(x, y, 'bugs', 'thud/00.png');
        explosion.anchor.setTo(0.5, 0.5);
        explosion.reset(x, y);
        explosion.scale.x = scale;
        explosion.scale.y = scale;

        // explosion.animations.add('thud', [0], 30, false, true);
        explosion.animations.add('thud', ['thud/00.png', 'thud/01.png', 
          'thud/02.png', 'thud/03.png', 'thud/04.png', 
          'thud/05.png', 'thud/06.png', 'thud/07.png' ]);

			        // capguy.animations.add('walk', Phaser.Animation.generateFrameNames('capguy/walk/', 1, 8, '', 4), 10, true, false);
        explosion.play('thud', 30, false, true);
        if (fx) {
          if ($.sfx) {
            this.sfx.thud.play();
          }
          this.shakeWorld = 30;
        }
    },


    showPoint: function(x, y, col) {
        var p = this.points.create(x, y, 'bugs', 'ui/point.png'),
            tweenA, tweenB;
        p.anchor.setTo(0.5, 0.5);
        p.reset(x, y);
        p.scale.x = 2;
        p.scale.y = 2;
        p.tint = this.tints[col];
        tweenA = this.game.add.tween(p)
          .to({y: y - 50}, 500, Phaser.Easing.Elastic.EaseInOut)
        tweenB = this.game.add.tween(p)
          .to({alpha: 0}, 300, Phaser.Easing.Elastic.EaseInOut)

        tweenA.chain(tweenB);
        tweenA.start();
    },

    eatFood: function(player, fruit) {

      fruit.alive = false;
      fruit.spawn();

      
      this.particleBurst(player.body.x, player.body.y, 5);
      this.showPoint(player.body.x, player.body.y, player.col);

      player.munch();
      player.score += 1;

    },


    hitBody: function(player, body) {


      if (body.player === player.col && body.scale.x != 2) {
        return;
      }

      if (body.id > 0 && !body.dead && player.invincibility < 0) {
        player.speed = 0;
        player.die();

        if (body.player !== player.col) {
          this.awardKill(body.player);
          this.showPoint(player.x, player.y, body.player);
          console.log(body);
        }

      }

    },


    hitHead: function(p1, p2) {

      if (p1.col === p2.col) {
        return;
      }

      p1.speed = 0;
      p1.die();
      p2.speed = 0;
      p2.die();
    },


    awardKill: function(col) {
      
      var g = this.game,
          p = g.heads.children,
          i = p.length;


      while (i--) {
        if (p[i].col === col) {
          p[i].kills += 1;
          p[i].score += 1;
        }
      }


    },

    doShakeWorld: function() {

        if (this.shakeWorld > 0) {
            var rand1 = this.game.rnd.integerInRange(-5,5);
            var rand2 = this.game.rnd.integerInRange(-5,5);
                this.game.world.setBounds(rand1, rand2, this.game.width + rand1, this.game.height + rand2);
                this.shakeWorld--;
                if (this.shakeWorld === 0) {
                    this.game.world.setBounds(0, 0, this.game.width,this.game.height); // normalize after shake?
                }
        }
    
    },

    particleBurst: function(x, y, particles) {

        // position 
        this.emitter.x = x;
        this.emitter.y = y;

        particles = particles || 20;

        //  The first parameter sets the effect to "explode" which means all particles are emitted at once
        //  The second gives each particle a 2000ms lifespan
        //  The third is ignored when using burst/explode mode
        //  The final parameter is how many particles will be emitted in this single burst
        this.emitter.start(true, 500, null, particles);

    },


    makeEmitter: function() {

      var particleGravity = 300,
          g = this.game,
          emitter;

      emitter = g.add.emitter(0, 0, 200);
      // emitter.makeParticles(
      //     ['frag']);
      emitter.makeParticles('bugs', 'frag.png');
      emitter.gravity = 0;
      emitter.minParticleSpeed.setTo(-particleGravity, -particleGravity);
      emitter.maxParticleSpeed.setTo(particleGravity, particleGravity);
      emitter.lifespan = 1000;
      emitter.minParticleScale = 2;
      emitter.maxParticleScale = 3;
      emitter.minRotation = 0;
      emitter.maxRotation = 0;
      // emitter.setAlpha(0.3, 0.8);
      emitter.maxParticleScale = 1;
      emitter.forEach(function(el) {
        el.tint = 0xff77a8;
      });

      return emitter;

    },



    makePlayers: function() {
      var g = this.game,
          player;


      player = new $.Bug(g, {scale: this.scale, parent: this,
        col: 'bluey', player: 'p1', x: g.border, y: g.border, controls: 1,
        hex: 0x29adff,
        angle: 45
        });
      this.game.heads.add(player);

      if ($.numPlayers > 1) {
        player = new $.Bug(g, {scale: this.scale, parent: this,
          col: 'greeny', player: 'p2', 
          x: g.world.width - g.border, 
          y: g.border, controls: 2,
          angle: 180
          });
      } else {
        player = new $.Bug(g, {scale: this.scale, parent: this,
          col: 'greeny', player: 'p2', 
          x: g.world.width - g.border, 
          y: g.border, cpu: 1,
          angle: 180
          });

      }
      this.game.heads.add(player);

      if ($.numPlayers >= 3) {
        player = new $.Bug(g, {scale: this.scale, parent: this,
          col: 'pinky', player: 'p3', 
            x: g.border, 
            y: g.world.height - g.border, controls: 3,
          angle: 0
          });
          this.game.heads.add(player);
      } else if (this.includeAI) {
        player = new $.Bug(g, {scale: this.scale, parent: this,
          col: 'pinky', player: 'p3', 
            x: g.border, 
            y: g.world.height - g.border, cpu: 1,
          angle: 0
        });
        this.game.heads.add(player);
      }


      if ($.numPlayers === 4) {
        player = new $.Bug(g, {scale: this.scale, parent: this,
          col: 'yelly', player: 'p4', 
            x: g.world.width - g.border, 
            y: g.world.height - g.border, controls: 4,
          angle: 225
          });
          this.game.heads.add(player);
      }
      else if (this.includeAI) {
        player = new $.Bug(g, {scale: this.scale, parent: this,
          col: 'yelly', player: 'p4', 
            x: g.world.width - g.border, 
            y: g.world.height - g.border, cpu: 1,
          angle: 225
          });
          this.game.heads.add(player);
      }
    },

    p1LeftDown: function() {
          this.game.heads.children[0].forceLeft = true;
    },
    p1LeftUp: function() {
          this.game.heads.children[0].forceLeft = false;
    },
    p1RightDown: function() {
          this.game.heads.children[0].forceRight = true;
    },
    p1RightUp: function() {
          this.game.heads.children[0].forceRight = false;
    },

    p2LeftDown: function() {
          this.game.heads.children[1].forceLeft = true;
    },
    p2LeftUp: function() {
          this.game.heads.children[1].forceLeft = false;
    },
    p2RightDown: function() {
          this.game.heads.children[1].forceRight = true;
    },
    p2RightUp: function() {
          this.game.heads.children[1].forceRight = false;
    },


    showScoreSummaries: function() {

      var yPos = 100,
          players = Object.keys( this.totals ),
          present = this.game.heads.hash,
          score,
          tmp,
          i;

      var isPlayerActive = function(player) {
        var exists = false, 
            i;

        for (i = 0; i < present.length; i += 1) {
          if (present[i].col === player) {
            exists = true;
          }
        }
        return exists;
      }

      this.winsText = this.game.add.bitmapText(this.game.world.centerX, 70, '8bit', 'Victories', 40);
      this.winsText.anchor.x = 0.5;

      this.talliesText = [];

      for (i = 0; i < players.length; i += 1) {
        if (isPlayerActive(players[i])) {
          score = this.totals[players[i]].toString();
          this.talliesText.push( this.game.add.bitmapText(this.game.world.centerX, yPos, '8bit', score, 40) );
          this.talliesText[this.talliesText.length - 1].anchor.x = 0.5;
          this.talliesText[this.talliesText.length - 1].tint = this.tints[players[i]];
          yPos += 30;
        }
      }

      
      
    },


    _screenshot: function() {

            var c = document.getElementsByTagName('canvas')[0],
                ajax = new XMLHttpRequest(),
                img = c.toDataURL('image/png'),
                params = 'img='+img;

                ajax.open('POST', 'img.php', true);
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.onreadystatechange = function() {
                    if(ajax.readyState == 4 && ajax.status == 200) {
                        console.log('saved img' + ajax.responseText);
                    }
                };

                ajax.send(params);
    }


};



