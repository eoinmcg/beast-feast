$.Intro = function (game) {


};

$.Intro.prototype = {

    create: function() {

        var s = this,
            g = s.game,
            x = this.game.world.centerX,
            tweenA, tweenB, tweenC;

        this.currentText = '';

        this.introText = this.game.add.bitmapText(x, 30, '8bit', "eoinmcg",20);
        this.introText.tint = 0x00e232;
        this.introText.anchor.x = 0.5;
        this.introText.alpha = 0;
        tweenA = g.add.tween(this.introText)
                  .to({alpha: 1}, 500, Phaser.Easing.Elastic.EaseInOut)

        this.introText2 = this.game.add.bitmapText(x, 50, '8bit', "presents",30);
        this.introText2.tint = 0x00e232;
        this.introText2.anchor.x = 0.5;
        this.introText2.alpha = 0;
        tweenB = g.add.tween(this.introText2)
                  .to({alpha: 1}, 500, Phaser.Easing.Elastic.EaseInOut)


        this.skull = this.game.add.sprite(x, 120, 'bugs', 'skull.png');
        this.skull.anchor.x = 0.5;
        this.skull.scale.x = 9;
        this.skull.scale.y = 9;
        this.skull.alpha = 0;
        tweenC = g.add.tween(this.skull)
                  .to({alpha: 1}, 2200, Phaser.Easing.Elastic.EaseInOut)


        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;  
        this.game.scale.startFullScreen();     

        this.button = g.add.button(0, 0, 'button', function() {
                        s.showSplash(true); }, this, 1, 0, 2);
        this.button.scale.x = 20;
        this.button.scale.y = 20;
        this.button.alpha = 0;

        tweenA.chain(tweenB);
        tweenA.start();
        tweenC.start();


        this.timer = g.time.create(false);
        this.timer.loop(3000, function() {
          s.showSplash(false);
        }, this);
        this.timer.start();



    },


    showSplash: function(clicked) {
      clicked = clicked || false;
      if (clicked) {
        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;  
        this.game.scale.startFullScreen();     
      }
      this.state.start('Splash');
    },

    update: function() {

        var start = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

        if (start.isDown) {
            this.showSplash(false);
        }
    }




}

