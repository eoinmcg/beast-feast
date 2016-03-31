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
    }

}

