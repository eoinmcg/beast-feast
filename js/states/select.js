$.Select = function (game) {

	$.music = null;
  $.numPlayers = null;

};

$.Select.prototype = {

    create: function() {

        var g = this.game,
            s = this, 
            x;

        x = this.game.world.centerX;

        this.keys = {
          k1: g.input.keyboard.addKey(Phaser.Keyboard.ONE),
          k2: g.input.keyboard.addKey(Phaser.Keyboard.TWO),
          k3: g.input.keyboard.addKey(Phaser.Keyboard.THREE),
          k4: g.input.keyboard.addKey(Phaser.Keyboard.FOUR),
        };

        this.game.stage.backgroundColor = '#000';

        this.title = this.game.add.bitmapText(x, 10, '8bit','SELECT NUMBER OF PLAYERS ',30);
        this.title.anchor.x = 0.5;
        this.title.tint = 0xe06f8b;


        this.button1up = g.add.button(-200, 70, 'button', s.game1up, this, 1, 0, 2);
        this.button1up.scale.x = 1.5;
        this.button1up.scale.y = 1.5;
        this.button1up.addChild(g.add.bitmapText(5, 3, '8bit', "1",20));
        this.button1up.addChild(this.makeHead(60, 20, 'bluey'));
        this.game.add.tween(this.button1up)
            .to({x: 100}, 300, Phaser.Easing.Elastic.EaseInOut)
            .start();

        this.button2up = g.add.button(-400, 120, 'button', s.game2up, this, 1, 0, 2);
        this.button2up.scale.x = 1.5;
        this.button2up.scale.y = 1.5;
        this.button2up.addChild(g.add.bitmapText(5, 3, '8bit', "2",20));
        this.button2up.addChild(this.makeHead(60, 20, 'bluey'));
        this.button2up.addChild(this.makeHead(80, 20, 'greeny'));
        this.game.add.tween(this.button2up)
            .to({x: 100}, 400, Phaser.Easing.Elastic.EaseInOut)
            .start();

        // touch controls only accomodates 2 playes
        if (Phaser.Device.desktop) {
          this.button3up = g.add.button(-600, 170, 'button', s.game3up, this, 1, 0, 2);
          this.button3up.scale.x = 1.5;
          this.button3up.scale.y = 1.5;
          this.button3up.addChild(g.add.bitmapText(5, 3, '8bit', "3",20));
          this.button3up.addChild(this.makeHead(60, 20, 'bluey'));
          this.button3up.addChild(this.makeHead(80, 20, 'greeny'));
          this.button3up.addChild(this.makeHead(100, 20, 'pinky'));
          this.game.add.tween(this.button3up)
              .to({x: 100}, 500, Phaser.Easing.Elastic.EaseInOut)
              .start();

          // not on mob
          this.button4up = g.add.button(-600, 220, 'button', s.game4up, this, 1, 0, 2);
          this.button4up.scale.x = 1.5;
          this.button4up.scale.y = 1.5;
          this.button4up.addChild(g.add.bitmapText(5, 3, '8bit', "4",20));
          this.button4up.addChild(this.makeHead(60, 20, 'bluey'));
          this.button4up.addChild(this.makeHead(80, 20, 'greeny'));
          this.button4up.addChild(this.makeHead(100, 20, 'pinky'));
          this.button4up.addChild(this.makeHead(120, 20, 'yelly'));
          this.game.add.tween(this.button4up)
              .to({x: 100}, 500, Phaser.Easing.Elastic.EaseInOut)
              .start();
        }
    },


    update: function() {

        var esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);

        if (esc.isDown) {
          this.state.start('Splash');
        }

        if (this.keys.k1.isDown) {
          this.game1up();
        }
        else if (this.keys.k2.isDown) {
          this.game2up();
        }
        else if (this.keys.k3.isDown) {
          this.game3up();
        }
        else if (this.keys.k4.isDown) {
          this.game4up();
        }
    },

    game1up: function() {
      $.numPlayers = 1;
      this.state.start('GetReady');
    },

    game2up: function() {
      $.numPlayers = 2;
      this.state.start('GetReady');
    },


    game3up: function() {
      $.numPlayers = 3;
      this.state.start('GetReady');
    },


    game4up: function() {
      $.numPlayers = 4;
      this.state.start('GetReady');
    },

    makeHead: function(x, y, col) {
    
      var g = this.game,
          head;
      
      head = g.add.sprite(x, y, 'bugs', col+'/head_0.png');
      head.scale.x = 2;
      head.scale.y = 2;
      head.animations.add('bite', [col+'/head_0.png', col+'/head_1.png'], 4, true);
      head.animations.play('bite', [0,1]);
      head.angle = -90;

      return head;
    }
    


};

