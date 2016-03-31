$.GetReady = function (game) {

	this.music = null;

};

$.GetReady.prototype = {

    create: function() {

        var g = this.game,
            s = this,
            msg;

        var x = this.game.world.centerX;
        this.game.stage.backgroundColor = '#000';


      // msg = new SpeechSynthesisUtterance('GET READY!');
      // window.speechSynthesis.speak(msg);
    },


    init: function() {

      var g = this.game,
          s = this, tween;

      g.stage.backgroundColor = '343635';
      this.background = this.game.add.sprite(0, 0, 'bugs', 'bg.png');
      this.background.scale.x = 2;
      this.background.scale.y = 2;

      this.overlay = this.game.add.sprite(0, 0, 'bugs', 'bg.png');
      this.overlay.scale.x = 2;
      this.overlay.scale.y = 2;
      this.overlay.tint = 0x000000;
      this.overlay.alpha = 1;

    var overlayTween = this.game.add.tween(this.overlay)
      .to({ alpha: 0 }, 1000, Phaser.Easing.Elastic.EaseInOut)
      .start();

      this.intro = this.game.add.bitmapText(this.game.world.centerX, 
        this.game.world.centerY, '8bit', "GET READY!",60);
      this.intro.anchor.x = 0.5;
      this.intro.anchor.y = 0.5;
      this.intro.scale.x = 0;
      this.intro.scale.y = 0;

    tween = this.game.add.tween(this.intro.scale)
        .to({x: 1, y: 1}, 1500, Phaser.Easing.Elastic.EaseInOut)
        .start();
    tween.onComplete.add(function() {
          this.state.start('Game');
    }.bind(this));
      // window.setTimeout(function() {
      //   this.state.start('Game');
      // }.bind(this), 3000);

    },




    update: function() {


    }

};

