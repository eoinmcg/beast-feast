	// var game = new Phaser.Game(480, 320, Phaser.AUTO, 'game');
	var game = new Phaser.Game(480, 320, Phaser.CANVAS, 'game');

	game.state.add('Boot', $.Boot);
	game.state.add('Preloader', $.Preloader);
	game.state.add('Intro', $.Intro);
	game.state.add('Splash', $.Splash);
	game.state.add('Options', $.Options);
	game.state.add('Help', $.Help);
	game.state.add('Select', $.Select);
	game.state.add('GetReady', $.GetReady);
	game.state.add('Game', $.Game);

	game.state.start('Boot');

