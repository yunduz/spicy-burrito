var Mission = function(game) {};

Mission.prototype = {

  preload: function () {
    this.optionCount = 1;
    game.load.image('map', 'assets/images/map.png');
    game.load.spritesheet('button', 'assets/images/sprite_pin.png',465,640,2);
    game.load.image('pin', 'assets/images/sprite_pin.png');
    
  },
  selectVan: function(text, callback) {

    var vanpin;

    vanpin = game.add.button(game.world.centerX-200, game.world.centerY-70, 'button', vanOnClick, this, 0, 1);
    vanpin.scale.x=0.05;
    vanpin.scale.y=0.05;

    //game.add.tween(vanpin).to({ y: 220 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    var onOver = function (target) {
      vanpin.useHandCursor = true;
    };
    var onOut = function (target) {
      vanpin.useHandCursor = false;
    };

    vanpin.inputEnabled = true;
    vanpin.events.onInputUp.add(callback, this);
    vanpin.events.onInputOver.add(onOver, this);
    vanpin.events.onInputOut.add(onOut, this);


    function vanOnClick () {
    }
    this.optionCount ++;
  },

  selectBurn: function(text, callback) {

    var burnpin;

    burnpin = game.add.button(game.world.centerX+100, game.world.centerY-120, 'button', burnOnClick, this, 0, 1);
    burnpin.scale.x=0.05;
    burnpin.scale.y=0.05;

    //game.add.tween(burnpin).to({ y: 190 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    var onOver = function (target) {
      burnpin.useHandCursor = true;
    };
    var onOut = function (target) {
      burnpin.useHandCursor = false;
    };

    burnpin.inputEnabled = true;
    burnpin.events.onInputUp.add(callback, this);
    burnpin.events.onInputOver.add(onOver, this);
    burnpin.events.onInputOut.add(onOut, this);

    function burnOnClick () {
    }
    this.optionCount ++;
  },

  selectRich: function(text, callback) {
  
    var richpin;

    richpin = game.add.button(game.world.centerX-160, game.world.centerY+140, 'button', richOnClick, this, 0, 1);
    richpin.scale.x=0.05;
    richpin.scale.y=0.05;

    //game.add.tween(richpin).to({ y: 470 }, 2000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);

    var onOver = function (target) {
      richpin.useHandCursor = true;
    };
    var onOut = function (target) {
      richpin.useHandCursor = false;
    };

    richpin.inputEnabled = true;
    richpin.events.onInputUp.add(callback, this);
    richpin.events.onInputOver.add(onOver, this);
    richpin.events.onInputOut.add(onOut, this);

    function richOnClick () {

    }
    this.optionCount ++;
  },

  addMenuOption: function(text, callback) {

    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(70, (this.optionCount * 80) + 200, text, optionStyle);

    txt.anchor.setTo(0.5);
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

    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;
  },

  create: function () {
    game.add.sprite(0, 0, 'map');

    if (music.name !== "background_music" && gameOptions.playMusic) {
      music.stop();
      music = game.add.audio('background_music');
      music.loop = true;
      music.play();
    }

    this.stage.disableVisibilityChange = true;
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX-100, 20, 'Choose Mission', optionStyle);

    this.selectVan('van', function (e) {
     this.game.state.start("Game");
    });
    this.selectBurn('burn', function (e) {
     this.game.state.start("Game");
    });
    this.selectRich('rich', function (e) {
     this.game.state.start("GameOver");
    });

    this.addMenuOption('Back', function (e) {
      this.game.state.start("GameMenu");
    });
  }
};