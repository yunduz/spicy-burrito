var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/GameMenu.js');
    game.load.script('game', 'states/Game.js');
    game.load.script('gameover','states/GameOver.js');
    game.load.script('credits', 'states/Credits.js');
    game.load.script('mission','states/Mission.js');
  },

  // varios freebies found from google image search
  loadImages: function () {
    //game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    //game.load.image('options-bg', 'assets/images/options-bg.jpg');
    //game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
  },

  loadFonts: function () {
    WebFontConfig = {
      custom: {
        families: ['TheMinion'],
        urls: ['assets/style/theminion.css']
      }
    }
  },

  preload: function () {
    this.loadScripts();
    this.loadImages();
    this.loadFonts();
  },

  addGameStates: function () {
    game.state.add("GameMenu",GameMenu);
    game.state.add("Mission",Mission);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("Credits",Credits);
  },

  create: function() {
    this.addGameStates();
    game.state.start("GameMenu");
    
  }
};
