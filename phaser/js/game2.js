var game = new Phaser.Game(320,505,Phaser.AUTO,'container'); //实例化game

game.state.add('boot', bootState);
game.state.add('loader', loaderState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.start('boot');
