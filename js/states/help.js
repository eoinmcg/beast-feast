$.Help = function (game) {


};

$.Help.prototype = {

    create: function() {


        var g = this.game,
            s = this, 
            tmp,
            x;

        x = this.game.world.centerX;

        this.game.stage.backgroundColor = '#000';

        this.title = this.game.add.bitmapText(x, 10, '8bit','HOW TO PLAY',40);
        this.title.anchor.x = 0.5;
        this.title.tint = 0xe06f8b;


        tmp = this.game.add.sprite(315, 70, 'bugs', 'worm.png');
        tmp.scale.x = 1.5;
        tmp.scale.y = 1.5;
        tmp = this.game.add.bitmapText(x, 60, '8bit','EAT THE WORM',25);
        tmp.anchor.x = 0.5;
        tmp = 0.5;

        tmp = this.game.add.bitmapText(x, 80, '8bit','HIT BOTH KEYS TO DASH',25);
        tmp.anchor.x = 0.5;
        tmp = 0.5;
  
        tmp = this.game.add.sprite(20, 170, 'bugs', 'bluey/head_0.png');
        tmp.scale.x = 2.5;
        tmp.scale.y = 2.5;
        tmp.anchor.y = 0.5;
        tmp.angle = -90;
        tmp = this.game.add.bitmapText(50, 150, '8bit', 'BLUEY', 20);
        tmp.tint = 0x29adff;
        tmp = this.game.add.bitmapText(140, 150, '8bit', 'cursors', 20);
        tmp.tint = 0x29adff;


        tmp = this.game.add.sprite(300, 170, 'bugs', 'greeny/head_0.png');
        tmp.scale.x = 2.5;
        tmp.scale.y = 2.5;
        tmp.anchor.y = 0.5;
        tmp.angle = -90;
        tmp = this.game.add.bitmapText(330, 150, '8bit', 'GREENY', 20);
        tmp.tint = 0x00e232;
        tmp = this.game.add.bitmapText(420, 150, '8bit', 'Z, X', 20);
        tmp.tint = 0x00e232;

        tmp = this.game.add.sprite(300, 220, 'bugs', 'yelly/head_0.png');
        tmp.scale.x = 2.5;
        tmp.scale.y = 2.5;
        tmp.anchor.y = 0.5;
        tmp.angle = -90;
        tmp = this.game.add.bitmapText(330, 200, '8bit', 'YELLY', 20);
        tmp.tint = 0xffe727;
        tmp = this.game.add.bitmapText(420, 200, '8bit', 'N, M', 20);
        tmp.tint = 0xffe727;


        tmp = this.game.add.sprite(20, 220, 'bugs', 'pinky/head_0.png');
        tmp.scale.x = 2.5;
        tmp.scale.y = 2.5;
        tmp.anchor.y = 0.5;
        tmp.angle = -90;
        tmp = this.game.add.bitmapText(50, 200, '8bit', 'PINKY', 20);
        tmp.tint = 0xff004d;
        tmp = this.game.add.bitmapText(140, 200, '8bit', 'Q, W', 20);
        tmp.tint = 0xff004d;


        this.back = g.add.button(x, 250, 'button', s.goBack, this, 3, 3, 3);
        this.back.anchor.x = 0.5;
        this.back.scale.x = 1.5;
        this.back.scale.y = 1.5;
        this.backText = this.game.add.bitmapText(2, 3, '8bit', "BACK",18);
        this.backText.anchor.x = 0.5;
        this.back.addChild(this.backText);

    },


    goBack: function() {
      this.state.start('Splash');
    },

    update: function() {


        var enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER),
            esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC),
            back = this.game.input.keyboard.addKey(Phaser.Keyboard.B);

        if (back.isDown || enter.isDown || esc.isDown) {
          this.state.start('Splash');
        }

    }

}


