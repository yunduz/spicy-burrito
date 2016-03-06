var Credits = function(game) {};

Credits.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.creditCount = 0;

  },

  init: function () {
    this.titleText = game.make.text(game.world.centerX, 60, "Credits", {
      font: 'bold 60pt TheMinion',
      fill: '#FDFFB5',
      align: 'center'
    });
    this.titleText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.titleText.anchor.set(0.5);

    
    this.evText = game.make.text(game.world.centerX, 200, "Evgeny Vinnik", {
    font: '40pt TheMinion',
    fill: '#FEFFD5',
    align: 'left'
    });
    this.evText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.evText.anchor.set(0.5);

    this.miText = game.make.text(game.world.centerX, 290, "Mehrnoosh Ebrahimipour", {
    font: '40pt TheMinion',
    fill: '#FEFFD5',
    align: 'center'
    });
    this.miText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.miText.anchor.set(0.5);

    this.yrText = game.make.text(game.world.centerX, 380, "Yunduz Rakhmangulova", {
    font: '40pt TheMinion',
    fill: '#FEFFD5',
    align: 'center'
    });
    this.yrText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.yrText.anchor.set(0.5);

    this.ymkText = game.make.text(game.world.centerX, 470, "Yawar Mohammad Khan", {
    font: '40pt TheMinion',
    fill: '#FEFFD5',
    align: 'center'
    });
    this.ymkText.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    this.ymkText.anchor.set(0.5);

    this.creditCount = 4;
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

    if (music.name !== "background_music" && gameOptions.playMusic) {
      music.stop();
      music = game.add.audio('background_music');
      music.loop = true;
      music.play();
    }
    this.stage.disableVisibilityChange = true;
    game.add.existing(this.titleText);
    game.add.existing(this.evText);
    game.add.existing(this.miText);
    game.add.existing(this.yrText);
    game.add.existing(this.ymkText);
    //var bg = game.add.sprite(0, 0, 'gameover-bg');
    
    this.addMenuOption('Back', function (e) {
      game.state.start("GameMenu");
    });
   // game.add.tween(bg).to({alpha: 0}, 20000, Phaser.Easing.Cubic.Out, true, 40000);
  }

};

Phaser.Utils.mixinPrototype(GameMenu.prototype, mixins);
