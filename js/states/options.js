$.Options = function (game) {


};

$.Options.prototype = {

    create: function() {

        var g = this.game,
            s = this, 
            tmp,
            x;

        x = this.game.world.centerX;

        this.game.stage.backgroundColor = '#000';

        this.title = this.game.add.bitmapText(x, 10, '8bit','OPTIONS',40);
        this.title.anchor.x = 0.5;
        this.buttons = [];

        tmp = this.game.add.bitmapText(150, 100, '8bit','SFX',25);
        tmp = 0.5;
        this.buttons.sfx = g.add.button(110, 100, 'button', function() {
                              s.toggleItem('sfx');
                              s.updateButton('sfx');
                            }, this, 3, 3, 3);
        this.buttons.sfx.anchor.x = 0.5;
        this.buttons.sfxText = this.game.add.bitmapText(2, 3, '8bit', "OFF",20);
        this.buttons.sfxText.anchor.x = 0.5;
        this.buttons.sfx.addChild(this.buttons.sfxText);
        s.updateButton('sfx');


        tmp = this.game.add.bitmapText(150, 150, '8bit','MUSIC',25);
        tmp = 0.5;
        this.buttons.music = g.add.button(110, 150, 'button', function() {
                              s.toggleItem('music');
                              s.updateButton('music');
                            }, this, 3, 3, 3);
        this.buttons.music.anchor.x = 0.5;
        this.buttons.musicText = this.game.add.bitmapText(2, 3, '8bit', "OFF",20);
        this.buttons.musicText.anchor.x = 0.5;
        this.buttons.music.addChild(this.buttons.musicText);
        s.updateButton('music');

        tmp = this.game.add.bitmapText(150, 200, '8bit','CPU',25);
        tmp = 0.5;
        this.buttons.includeAI = g.add.button(110, 200, 'button', function() {
                              s.toggleItem('includeAI');
                              s.updateButton('includeAI');
                            }, this, 3, 3, 3);
        this.buttons.includeAI.anchor.x = 0.5;
        this.buttons.includeAIText = this.game.add.bitmapText(2, 3, '8bit', "OFF",20);
        this.buttons.includeAIText.anchor.x = 0.5;
        this.buttons.includeAI.addChild(this.buttons.includeAIText);
        s.updateButton('includeAI');


        this.back = g.add.button(x, 250, 'button', s.goBack, this, 3, 3, 3);
        this.back.anchor.x = 0.5;
        this.back.scale.x = 1.5;
        this.back.scale.y = 1.5;
        this.backText = this.game.add.bitmapText(2, 3, '8bit', "BACK",18);
        this.backText.anchor.x = 0.5;
        this.back.addChild(this.backText);

    },

    update: function() {

        var enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER),
            esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            back = this.game.input.keyboard.addKey(Phaser.Keyboard.B);

        if (back.isDown || enter.isDown || esc.isDown) {
          this.state.start('Splash');
        }
    },


    goBack: function() {
      this.state.start('Splash');
    },


    toggleItem: function(key, newVal) {
      var val = $.Helpers.getItem(key),
          text, tine;

      newVal = newVal || !val;

      $.Helpers.setItem(key, newVal);
      console.log(key, newVal, $.Helpers.getItem(key));
      $[key] = newVal;

      return newVal;


    },


    updateButton: function(key) {

      var val = $[key];

      if (val) {
        text = 'ON';
        tint = 0x00e232;
      } else {
        text = 'OFF';
        tint = 0xff9b00;
      }

      this.buttons[key + 'Text'].text = text;
      this.buttons[key + 'Text'].tint = tint;
    }
}

