var Credits = function(game) {};

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;
    game.load.image('bgcredit', 'assets/images/credits.png');

  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'center', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX-40, (this.optionCount * 80) + 450, text, optionStyle);

    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "white";
      target.stroke = "rgba(0,0,0,0)";
      txt.useHandCursor = false;
    };
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function () {
    game.add.sprite(0, 0, 'bgcredit');
    if (music.name !== "background_music" && gameOptions.playMusic) {
      music.stop();
      music = game.add.audio('background_music');
      music.loop = true;
      music.play();
    }
    this.stage.disableVisibilityChange = true;
    
    this.addMenuOption('Back', function (e) {
      game.state.start("GameMenu");
    });
  }

};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
