var Splash = function () {};

Splash.prototype = {

  loadScripts: function () {
    game.load.script('style', 'lib/style.js');
    game.load.script('mixins', 'lib/mixins.js');
    game.load.script('WebFont', 'vendor/webfontloader.js');
    game.load.script('gamemenu','states/gamemenu.js');
    game.load.script('game', 'states/game.js');
    game.load.script('gameover','states/gameover.js');
    game.load.script('credits', 'states/credits.js');
    game.load.script('mission','states/mission.js');
  },

  // varios freebies found from google image search
  loadImages: function () {
    //game.load.image('menu-bg', 'assets/images/menu-bg.jpg');
    //game.load.image('options-bg', 'assets/images/options-bg.jpg');
    //game.load.image('gameover-bg', 'assets/images/gameover-bg.jpg');
  },

  loadBgm: function () {
    game.load.audio('background_music', 'assets/sound/Blip_Stream_short.mp3');
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
    this.loadBgm();
  },

  addGameStates: function () {
    game.state.add("GameMenu",GameMenu);
    game.state.add("Mission",Mission);
    game.state.add("Game",Game);
    game.state.add("GameOver",GameOver);
    game.state.add("Credits",Credits);
  },

   addGameMusic: function () {
    music = game.add.audio('background_music');
    music.loop = true;
    //music.play();
  },

  create: function() {
    this.addGameStates();
    this.addGameMusic();
    game.state.start("GameMenu");
    
  }
};
