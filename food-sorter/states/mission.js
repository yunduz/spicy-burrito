var Mission = function(game) {};

Mission.prototype = {

  preload: function () {
    this.optionCount = 1;
    this.pinCount = 13;
    game.load.image('map', 'assets/images/map.png');

    var imgArr = ["assets/images/sprite_pin_vancouver.png", "assets/images/sprite_pin_burnaby.png",
    "assets/images/sprite_pin_richmond.png"];

    var j = 0;
    for(var i=0; i<this.pinCount; i++) {
       j = Math.round(Math.random()*2);
       game.load.spritesheet('pin_' + i.toString(), imgArr[j],46,60,2);
    }

    game.load.spritesheet('vanpin', 'assets/images/sprite_pin_vancouver.png',46,60,2);
    game.load.spritesheet('burnpin', 'assets/images/sprite_pin_burnaby.png',46,60,2);
    game.load.spritesheet('richpin', 'assets/images/sprite_pin_richmond.png',46,60,2);

  },

  selectPin: function(text, location, callback) {

    var pin;
    var noise = Math.round(Math.random() * 15) + 1;
    noise *= 10;
    var locX = location.toString().split(",")[0];
    var locY = location.toString().split(",")[1];
    console.log(locX, locY);
    console.log(noise);
    pin = game.add.button(locX-7, locY-30, text, pinOnClick, this, 1, 0);
    pin.scale.x=0.5;
    pin.scale.y=0.5;

    // animation
    game.add.tween(pin).to({ y: locY-35}, 1100 + noise, Phaser.Easing.Quadratic.InOut, true, 0, 1100, true);
    //game.add.text(locX-4, locY-5, 'X', { font: '10pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 0});

    var onOver = function (target) {
      pin.useHandCursor = true;
    };
    var onOut = function (target) {
      pin.useHandCursor = false;
    };

    pin.inputEnabled = true;
    pin.events.onInputUp.add(callback, this);
    pin.events.onInputOver.add(onOver, this);
    pin.events.onInputOut.add(onOut, this);

    function pinOnClick () {
    }
    this.optionCount ++;
  },

  addMenuOption: function(text, callback) {

    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    var txt = game.add.text(70, 570, text, optionStyle);

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
      // music = game.add.audio('background_music');
      // music.loop = true;
      // music.play();
    }

    this.stage.disableVisibilityChange = true;
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 4};
    game.add.text(game.world.centerX+50, 80, 'Choose Location', optionStyle);

    // var optionStyle2 = { font: '25pt TheMinion', fill: '#FDFFB5', align: 'left', stroke: 'rgba(0,0,0,0)', strokeThickness: 0};
    // game.add.text(game.world.centerX-320, game.world.centerY+50, 'Vancouver', optionStyle2);
    // game.add.text(game.world.centerX+100, game.world.centerY-100, 'Burnaby', optionStyle2);
    // game.add.text(game.world.centerX+100, game.world.centerY+220, 'Surrey', optionStyle2);

    var pinLoc = [[304, 47],
                [128, 168],
                [249, 171],
                [278, 208],
                [367, 173],
                [226, 256],
                [429, 253],
                [128, 516],
                [305, 317],
                [363, 433],
                [519, 476],
                [657, 459],
                [721, 506]];

    for(var i = 0; i<pinLoc.length; i++) {
      this.selectPin('pin_'+i, pinLoc[i], function (e) {
       this.game.state.start("Game");
      });
    }
    this.addMenuOption('Back', function (e) {
      this.game.state.start("GameMenu");
    });
  }
};
