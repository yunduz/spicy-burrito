var GameOver = function(game) {};

GameOver.prototype = {

  preload: function () {
    this.optionCount = 1;
  },

  addMenuOption: function(text, callback) {
    var optionStyle = { font: '20pt TheMinion', fill: 'white', align: 'left', stroke: 'rgba(0,0,0,0)', srokeThickness: 4};
    var txt = game.add.text(game.world.centerX, (this.optionCount * 80) + 130, text, optionStyle);
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

  tweetscore: function(){       
   var tweetbegin = 'http://twitter.com/home?status=';
   var tweettxt = 'I scored '+2+' at this game -' + window.location.href + '.';
   var finaltweet = tweetbegin + encodeURIComponent(tweettxt);       
   window.open(finaltweet,'_blank');    
 },

  create: function () {
    //game.add.sprite(0, 0, 'gameover-bg');

    if (music.name !== "background_music" && playMusic) {
     music.stop();
    }

    var titleStyle = { font: 'bold 60pt TheMinion', fill: '#FDFFB5', align: 'center'};
    var text = game.add.text(game.world.centerX, 100, "Game Over", titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);

    this.addMenuOption('Share Score', function (e) {
      this.tweetscore();
    });
    this.addMenuOption('Volunteer', function (e) {
      window.open("https://www.foodbank.bc.ca/get-involved/volunteer/","_blank");
    });
    this.addMenuOption('Donate', function (e) {
      window.open("http://gvfbs.convio.net/donate","_blank");
    });
    this.addMenuOption('Play Again', function (e) {
      this.game.state.start("Mission");
    });
  }
};