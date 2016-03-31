$.Splash = function (game) {

	this.music = null;

};

$.Splash.prototype = {

    create: function() {

        var g = this.game,
            s = this;

        var x = this.game.world.centerX;
        this.game.stage.backgroundColor = '#000';
        this.gfx = this.game.add.graphics();

        this.splat = g.add.sprite(x, 120, 'bugs', 'logo/logo_circle.png');
        this.splat.anchor.x = 0.5;
        this.splat.anchor.y = 0.5;
        this.splat.scale.x = 0;
        this.splat.scale.y = 0;
        this.game.add.tween(this.splat.scale)
            .to({y: 2, x: 2}, 1000, Phaser.Easing.Elastic.Out)
            .start();

        this.title = g.add.sprite(x, 60, 'bugs', 'logo/logo_text.png');
        this.title.anchor.x = 0.5;
        this.title.scale.x = 0;
        this.title.scale.y = 0;
        this.game.add.tween(this.title.scale)
            .to({y: 1.8, x: 1.8}, 1200, Phaser.Easing.Elastic.Out)
            .start();

        this.help = g.add.button(40, 10, 'button', s.showHelp, this, 3, 3, 3);
        this.help.anchor.x = 0.5;
        this.helpText = this.game.add.bitmapText(2, 3, '8bit', "HELP",18);
        this.helpText.anchor.x = 0.5;
        this.help.addChild(this.helpText);

        // this.options = g.add.button(420, 10, 'button', s.showOptions, this, 3, 3, 3);
        // this.options.anchor.x = 0.5;
        // this.optionsText = this.game.add.bitmapText(2, 3, '8bit', "OPTIONS",14);
        // this.optionsText.anchor.x = 0.5;
        // this.options.addChild(this.optionsText);


        this.button = g.add.button(x, 500, 'button', function() {
                        s.startGame(false);
                      }, this, 1, 0, 2);
        this.button.anchor.x = 0.5;
        this.button.scale.x = 1.5;
        this.button.scale.y = 1.5;
        this.buttonText = this.game.add.bitmapText(2, 3, '8bit', "START",20);
        this.buttonText.anchor.x = 0.5;
        this.button.addChild(this.buttonText);
        this.game.add.tween(this.button)
            .to({y: 240}, 1700, Phaser.Easing.Elastic.Out)
            .start();


    },

    startGame: function(clicked) {
      clicked = clicked || false;
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;  
      this.game.scale.startFullScreen();     
      this.state.start('Select');
    },

    showHelp: function() {
      this.state.start('Help');
    },

    showOptions: function() {
      this.state.start('Options');
    },


    update: function() {

        var start = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER),
            help = this.game.input.keyboard.addKey(Phaser.Keyboard.H),
            options = this.game.input.keyboard.addKey(Phaser.Keyboard.O);

        if (start.isDown) {
            this.startGame();
        } else if (help.isDown) {
            this.showHelp();
        } else if (options.isDown) {
            this.showOptions();
        }
    }

};
