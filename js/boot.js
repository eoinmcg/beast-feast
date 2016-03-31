$ = {

    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0,

    music: null,
    numPlayers: 1,
    includeAI: true,
    totals: {
      bluey: 0,
      greeny: 0,
      pinky: 0,
      yelly: 0
    },

    orientated: false

};

$.Boot = function (game) {
};

$.Boot.prototype = {

    init: function () {


        var s = this._getMinMax();

        this.input.maxPointers = 10;
        this.stage.disableVisibilityChange = true;
        this.stage.smoothed = false;

        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        this.scale.setMinMax(s.w, s.h, s.maxW, s.maxH);
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.forceOrientation(true, false);
        this.scale.setResizeCallback(this.gameResized, this);
        this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
        this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);




    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        // this.load.image('preloaderBackground', 'images/background_splash.png');
        this.load.image('preloaderBar', 'a/loading.png');

    },

    create: function () {

        this.state.start('Preloader');

    },

    gameResized: function (width, height) {

        var s = this._getMinMax();
        this.scale.setMinMax(s.w, s.h, s.maxW, s.maxH);

    },

    enterIncorrectOrientation: function () {

        $.orientated = false;

        document.getElementById('orientation').style.display = 'block';

    },

    leaveIncorrectOrientation: function () {

        $.orientated = true;

        document.getElementById('orientation').style.display = 'none';

    },

    _getMinMax: function() {

        var minMax = {
            w: 480,
            h: 320
        };

        minMax.ratio = minMax.h / minMax.w;
        minMax.maxH = window.innerHeight;
        minMax.maxW = minMax.maxH / minMax.ratio;

        return minMax;
    }


};
