// Global Variables
var
  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'),
  Main = function () {},
  gameOptions = {
    playSound: true,
    playMusic: true
  },
  musicPlayer;




Main.prototype = {

  init: function () {
    game.scale.maxWidth = 800;
    game.scale.maxHeight = 600;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.compatibility.scrollTo = false;
    game.scale.updateLayout();
  },

  preload: function () {
    game.load.script('polyfill',   'lib/polyfill.js');
    game.load.script('utils',   'lib/utils.js');
    game.load.script('splash',  'states/Splash.js');
  },

  create: function () {
    game.state.add('Splash', Splash);
    game.state.start('Splash');
  }

};

game.state.add('Main', Main);
game.state.start('Main');
