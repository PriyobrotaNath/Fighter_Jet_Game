var canvas = {
  gameWidth: 800, //canvas Width
  gameHeight: 500, // canvas Height
  isPlaying: false, // Assume that game not start
  enemies: [], // an empty array
  spawnAmount: 7, //show enemy jet in 1 loop on Canvas
  spawnRate: 2000,
  gameScore: {}, // an empty nested object/list
  init: function () {
    this.drawbackground(); //this => canvas object
    this.spawnEnemy(this.spawnAmount); //spawnEnemy(7) show enemy jet in 1 loop Canvas
    this.startPlaying();

    this.gameScore = new Score(); //4
    // this.gameScore.drawScoreCanvas(); //5

    document.addEventListener("keydown", this.utilityOfKeydown, false);
    document.addEventListener("keyup", this.utilityOfKeyup, false);

    //this.gameScore = new Score(); //4
    //this.gameScore.drawScoreCanvas(); //5
  },
  getCanvasCtx: function (id) {
    return document.getElementById(id).getContext("2d");
    // leading to the creation of a CanvasRenderingContext2D object representing a two-dimensional rendering context.
  },
  recursiveDrawAllJets: function () {
    fighterJet.drawJetCanvas();
    this.drawAllEnemies();

    // if (this.isPlaying) {

    //   debugger;
    //   requestAnimFrame(canvas.recursiveDrawAllJets());
    //   setInterval(this.recursiveDrawAllJets, 10);
    // }
  },
  // enemy recursive create loop start
  spawnEnemy: function (num) {
    for (var i = 0; i < num; i++) {
      this.enemies[this.enemies.length] = new Enemy();
    }
  },
  // enemy draw recursive loop end
  drawAllEnemies: function () {
    this.clear(this.enemies[0].ctx);
    for (var i = 0; i < this.enemies.length; i++) {
      this.enemies[i].drawEnemyCanvas();
    }
  },
  startPlaying: function () {
    //this.isPlaying = true; //1
    var that = this;
    this.stopPlaying();
    drawInterval = setInterval(function () {
      that.recursiveDrawAllJets.call(that);
    }, 10);
    //this.recursiveDrawAllJets(); //2
  },
  stopPlaying: function () {
    this.isPlaying = false; //3
    clearInterval(drawInterval);
  },
  draw: function (ctx, cusOptions) {
    // two parameter
    var Options = {
      //options object of draw function
      srcX: 0, //X axis=0
      srcY: 0, // Y axis =0
      width: 100,
      height: 40,
      drawX: 0,
      drawY: 0,
      drawWidth: 100,
      drawHeight: 40,
    };

    var settings = Object.assign({}, Options, cusOptions); // list,option.object,cusOption.parameter

    ctx.drawImage(
      imageSprite,
      settings.srcX,
      settings.srcY,
      settings.width,
      settings.height,
      settings.drawX,
      settings.drawY,
      settings.drawWidth,
      settings.drawHeight
    );
  },
  clear: function (ctx) {
    ctx.clearRect(0, 0, 800, 500);
  },
  drawbackground: function () {
    var ctxBg = this.getCanvasCtx("canvasBg"); // canvasBg
    var bgOptions = {
      //background_option object
      width: this.gameWidth, // width=gameWidth=800
      height: this.gameHeight, //height=gameHeight=500
      drawWidth: this.gameWidth, //drawWidth=gameWidth=800
      drawHeight: this.gameHeight, //drawHeight = gameHeight
    };

    this.draw(ctxBg, bgOptions);
  },

  // key use for playing part start
  utilityOfKeyup: function (e) {
    e.preventDefault();

    keyId = e.keyCode ? e.keyCode : e.which;

    if (keyId === 38 || keyId === 87) fighterJet.stear.up = false; // w
    if (keyId === 39 || keyId === 68) fighterJet.stear.forward = false; // D
    if (keyId === 40 || keyId === 83) fighterJet.stear.down = false; // S
    if (keyId === 37 || keyId === 65) fighterJet.stear.backword = false; // A
    if (keyId === 32) fighterJet.jetWarOptions.fireBtn = false; // Spacebar
  },
  utilityOfKeydown: function (e) {
    e.preventDefault();

    keyId = e.keyCode ? e.keyCode : e.which;

    if (keyId === 38 || keyId === 87) fighterJet.stear.up = true; // w
    if (keyId === 39 || keyId === 68) fighterJet.stear.forward = true; // D
    if (keyId === 40 || keyId === 83) fighterJet.stear.down = true; // S
    if (keyId === 37 || keyId === 65) fighterJet.stear.backword = true; // A
    if (keyId === 32) fighterJet.jetWarOptions.fireBtn = true; // Spacebar
  },
  // key use for playing end
};
