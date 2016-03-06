var Game = function(game) {};

var g_width = 800;
  var g_height = 600;

  var star_keys = ['pasta_small', 'butter_small', 'apple_small'];
  var permanent_star_keys = ['pasta_small', 'butter_small', 'apple_small'];
  var crate_keys = [
    'crate_smal_1year',
    'crate_smal_6months',
    'crate_smal_perishable'];
  var popup_keys = [
    'spaghetti_nutrition_popup',
    'peanut_butter_nutrition_popup',
    'peanut_butter_nutrition_popup'];
  var player;
  var boxes;
  var cursors;
  var stars;
  var score = 0;
  var scoreText;
  var deadline;
  var current_star_keys = [];
  var star_velocity = 60;

  var popup;

  var countDownTimer = 60;
  var countDownTimerText;
  var countDownTimerEvent;

Game.prototype = {

  preload: function () {

    //game.physics.startSystem(Phaser.Physics.ARCADE);

    game.load.image('floor', 'assets/images/floor.png');
    game.load.image('box', 'assets/images/platform.png');
    game.load.image('close', 'assets/images/cross_small.png');

    //load food items
    for(var i = 0; i < star_keys.length; i++)
    {
      game.load.image(star_keys[i], 'assets/images/' + star_keys[i] + '.png');
    }

    //load crates
    for(var i = 0; i < star_keys.length; i++)
    {
      game.load.image(crate_keys[i], 'assets/images/' + crate_keys[i] + '.png');
    }

    for(var i = 0; i < popup_keys.length; i++)
    {
      game.load.image(popup_keys[i], 'assets/images/' + popup_keys[i] + '.jpg');
    }

   game.load.spritesheet('conveyer', 'assets/images/conveyour.png', 250, 150);
   game.load.audio('game_music', 'assets/sound/Blip_Stream_short.mp3');
   game.load.audio('score_music', 'assets/sound/SCORE.wav');
  game.load.audio('loss_music', 'assets/sound/LOOSER.wav');
  game.load.audio('game_music', 'assets/sound/Blip_Stream_short.mp3');

    this.optionCount = 1;
  },

  create: function () {
    this.stage.disableVisibilityChange = false;
    if (music.name !== "game_music" && gameOptions.playMusic) {
      music.stop();
      music = game.add.audio('game_music');
      music.loop = true;
      music.volume=0.2;
      music.play();
    }

    score_music = game.add.audio('score_music');
    loss_music = game.add.audio('loss_music');



    game.physics.startSystem(Phaser.Physics.ARCADE);
    //  A simple background for our game
    var floor = game.add.sprite(0, 0, 'floor');

    var conveyer = game.add.sprite(150, 0, 'conveyer');
    conveyer.scale.setTo(2, 2);
    var belt = conveyer.animations.add('belt');
    conveyer.animations.play('belt', 10, true);

    boxes = game.add.group();
    boxes.enableBody = true;
    for (var i = 0; i < 3; i++)
    {
      var key = crate_keys[i];
      var box = boxes.create(90+i*250, game.world.height-150, key);
      box.body.immovable = true;
    }

    deadline = game.add.sprite(0, 300, 'box');
    deadline.scale.setTo(100, 0.2);
    deadline.visible = false;
    game.physics.arcade.enable(deadline);

    // //  Finally some stars to collect
    stars = game.add.group();
    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    scoreText = game.add.text(12, 12, 'Sorted\nItems: 0', { fontSize: '28px', fill: '#000' });
    countDownTimerText = game.add.text(12, 100, 'Time: '+countDownTimer,  { fontSize: '28px', fill: '#000' });

    this.quitOption('Quit', function (e) {
      // localStorage.setItem("finalscore", score);
      // // score=0;
      // // star_velocity = 60;
      // // countDownTimer = 60;
      // resetCounters();
      // this.game.state.start("GameOver");
      this.quitGame();
    });

    game.input.onDown.add(this.unpause, self);

    this.addNewStarType();
    //add first star
    this.addStars();

    game.time.events.loop(Phaser.Timer.SECOND * 2, this.addStars, this);
    game.time.events.loop(Phaser.Timer.SECOND * 10, this.addNewStarType, this);
    game.time.events.loop(Phaser.Timer.SECOND * 5, this.increaseStarVelocity, this);
    countDownTimerEvent = this.time.events.loop(Phaser.Timer.SECOND, this.updateCountDownTimer, this);
  },

  quitGame: function() {
    localStorage.setItem("finalscore", score);
    this.resetCounters();
    this.game.state.start("GameOver");
  },

  resetCounters: function() {
    score=0;
    star_velocity = 60;
    countDownTimer = 60;
  },

  updateCountDownTimer: function() {
    countDownTimer -= 1;
    countDownTimerText.setText('Time: ' + countDownTimer);
    if(countDownTimer === 0) {
      //To remove event:
      game.time.events.remove(countDownTimerEvent);
      this.quitGame();
    }
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 200, text, optionStyle);
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
    //txt.useHandCursor = true;
    txt.inputEnabled = true;
    txt.events.onInputUp.add(callback, this);
    txt.events.onInputOver.add(onOver, this);
    txt.events.onInputOut.add(onOut, this);

    this.optionCount ++;


  },

  quitOption: function(text, callback) {
    var optionStyle = { font: '30pt TheMinion', fill: 'red', align: 'right', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX+320, 40, text, optionStyle);
    txt.anchor.setTo(0.5);
    txt.stroke = "rgba(0,0,0,0";
    txt.strokeThickness = 4;
    var onOver = function (target) {
      target.fill = "#FEFFD5";
      target.stroke = "rgba(200,200,200,0.5)";
      txt.useHandCursor = true;
    };
    var onOut = function (target) {
      target.fill = "red";
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
 increaseStarVelocity: function()
  {
    star_velocity += 10
  },

  unpause: function(event)
  {
   // Only act if paused
    if(game.paused)
    {
      // Calculate the corners of the menu
      var x1 = 680, x2 = 705,
      y1 = 105, y2 = 135;

      // Check if the click was inside the menu
      if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 )
      {
        popup.kill()
        game.paused = false;
      }
    }
  },

  addNewStarType: function()
  {
    if(star_keys.length > 0)
    {
      //TODO: if it's the first time we're running, show instructions
      this.addPopUpSprite(popup_keys.pop());
      this.openPopUpWindow();
      current_star_keys.push(star_keys.pop());

    }
  },

  addStars: function()
  {
    //  Create a star inside of the 'stars' group
    var key = current_star_keys[Math.floor(Math.random()*current_star_keys.length)];

    var star = stars.create(this.getRandomIntInclusive(205, 555), 0, key);

    //  Let gravity do its thing

    star.body.velocity.y = star_velocity;

    star.checkWorldBounds = true;
    star.outOfBoundsKill = true;

    //enaable drag
    star.inputEnabled = true;
    star.input.enableDrag(false);
  },

  addPopUpSprite: function(img_key)
  {
    //popup = game.add.sprite(game.world.centerX, game.world.centerY, img_key);
    popup = game.add.sprite(game.world.centerX, game.world.centerY, img_key);
    popup.alpha = 0.8;
    popup.anchor.set(0.5);
    popup.inputEnabled = true;
    popup.visible = false;
  },

  openPopUpWindow: function()
  {
     game.paused = true;
    popup.visible = true;

    //  Position the close button to the top-right of the popup sprite (minus 8px for spacing)
    var pw = (popup.width / 2) - 30;
    var ph = (popup.height / 2) - 8;

    //  And click the close button to close it down again
    var closeButton = game.make.sprite(pw, -ph, 'close');

    popup.addChild(closeButton);

    var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: popup.width, align: "center", backgroundColor: "#ffff00" };


  },

  closePopUpWindow: function() {
    popup.kill()
    game.paused = false;
  },

  update: function() {
    game.physics.arcade.overlap(boxes, stars, this.collectItem, null, this);

    game.physics.arcade.overlap(deadline, stars, this.removeStar, null, this);
  },

  collectItem: function(box, star)
  {

    // Removes the star from the screen
    star.kill();
    if((box.key === crate_keys[0] && star.key === permanent_star_keys[0]) ||
        (box.key === crate_keys[1] && star.key === permanent_star_keys[1]) ||
        (box.key === crate_keys[2] && star.key === permanent_star_keys[2]))
    {
      score += 1;
      //music.stop();
      score_music.play();
      //music.play();
    }
    else
    {
      score -= 1;
      loss_music.play();
    }
    scoreText.text = 'Sorted\nItems: ' + score;

  },

  removeStar: function(deadline, star)
  {
    if(!star.input.isDragged)
    {
      star.kill();
    }
  },
    // Returns a random integer between min (included) and max (included)
  // Using Math.round() will give you a non-uniform distribution!
  getRandomIntInclusive: function(min, max)
  {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

};
