
$.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

$.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, this.game.world.height/2, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.audio('titleMusic', ['a/sfx/bugs.mp3']);

    this.load.atlasJSONHash('bugs', 'a/bugs.png', 'a/bugs.json');

    this.load.spritesheet('button', 'a/button.png', 50, 30);
    this.load.image('controls', 'a/controls.png');

		this.load.audio('pop', ['a/sfx/pop.mp3']);
		this.load.audio('thud', ['a/sfx/thud.mp3']);
		this.load.audio('combo', ['a/sfx/combo.mp3']);
		this.load.audio('collect', ['a/sfx/collect.mp3']);

		this.load.bitmapFont('8bit', 'a/fat-and-tiny.png', 'a/fat-and-tiny.xml');
		// this.load.bitmapFont('8bit', 'a/font.png', 'a/font.fnt');

	},

	create: function () {

		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		
		if (this.cache.isSoundDecoded('thud') && this.ready === false)
		{
			this.ready = true;

      var intro = this.add.audio('combo');

      if ($.sfx) {
        intro.play();
      }

			this.state.start('Intro');

		}

	}

};
