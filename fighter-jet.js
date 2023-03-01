var drawInterval;
var requestAnimFrame =
  window.requestAnimationFrame || window.webkitRequestAnimationFrame;
var canvas = {
  gameWidth: 800, //canvas Width
  gameHeight: 500, // canvas Height
  isPlaying: false, // Assume that game not start
  enemies: [], // an empty array
  spawnAmount: 8, //show enemy jet in 1 loop on Canvas
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
  recursivedrawAllBullets: function () {
    enemyJet.drawBulletCanvas();

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
    //console.log(cusOptions);
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
    // console.log(settings.srcX);
    // console.log(settings.srcY);
    console.log(settings.drawX);
    console.log(settings.drawY);

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

    // //test
    // if (keyId === 38 || keyId === 87) enemyJet.EnemyWarOptions.fireBtn = true; // w
    // if (keyId === 39 || keyId === 68) enemyJet.EnemyWarOptions.fireBtn = true; // D
    // if (keyId === 40 || keyId === 83) enemyJet.EnemyWarOptions.fireBtn = true; // S
    // if (keyId === 37 || keyId === 65) enemyJet.EnemyWarOptions.fireBtn = true; // A
    // if (keyId === 32) enemyJet.EnemyWarOptions.fireBtn = true; // Spacebar
  },
  utilityOfKeydown: function (e) {
    e.preventDefault();

    keyId = e.keyCode ? e.keyCode : e.which;

    if (keyId === 38 || keyId === 87) fighterJet.stear.up = true; // w
    if (keyId === 39 || keyId === 68) fighterJet.stear.forward = true; // D
    if (keyId === 40 || keyId === 83) fighterJet.stear.down = true; // S
    if (keyId === 37 || keyId === 65) fighterJet.stear.backword = true; // A
    if (keyId === 32) fighterJet.jetWarOptions.fireBtn = true; // Spacebar

    // //test
    // if (keyId === 38 || keyId === 87) enemyJet.EnemyWarOptions.fireBtn = true; // w
    // if (keyId === 39 || keyId === 68) enemyJet.EnemyWarOptions.fireBtn = true; // D
    // if (keyId === 40 || keyId === 83) enemyJet.EnemyWarOptions.fireBtn = true; // S
    // if (keyId === 37 || keyId === 65) enemyJet.EnemyWarOptions.fireBtn = true; // A
    // if (keyId === 32) enemyJet.EnemyWarOptions.fireBtn = true; // Spacebar
  },
  // key use for playing end
};
// Jet part start
function Jet() {
  (this.ctx = canvas.getCanvasCtx("canvasJet")),
    (this.options = {
      srcY: 500,
      drawX: 20, // jet start row place on canvas
      drawY: 300, //jet start column place on canvas
    });

  this.stear = {
    up: false,
    forward: false,
    down: false,
    backword: false,
  };

  this.jetWarOptions = {
    bullets: [],
    currentBullet: 0,
    fireBtn: false,
    isShooting: false,
  };
  //this is for jet bullet shooting fire range
  for (var i = 0; i <= 12; i++) {
    for (var j = 0; j <= 12; j++) {
      this.jetWarOptions.bullets[this.jetWarOptions.bullets.length] =
        new JetBullet();
    }
  }

  this.score = 0;
  this.score = new Score(); //new
  //this.score.update(); //new
  this.speed = 35; // player jet speed

  //this.score = 0;
  //this.life = 3; //new
  //this.totalLife = 3; //new
}

Jet.prototype.drawJetCanvas = function () {
  canvas.clear(this.ctx);
  this.jetDirection();
  this.checkShooting();
  this.drawAllBullets();
  //new
  this.updateScore();
  //this.checkHitEnemy();
  //this.checkHitWall();
  //this.showLife();
  //new
  canvas.draw(this.ctx, this.options); //#
};

Jet.prototype.checkShooting = function () {
  if (this.jetWarOptions.fireBtn && !this.jetWarOptions.isShooting) {
    this.jetWarOptions.isShooting = true;
    this.jetWarOptions.bullets[this.jetWarOptions.currentBullet++].fire(
      this.options.drawX + 100, // draw fire drawX=200+100
      this.options.drawY + 30 // draw fire drawY=300+30
    );
    if (this.jetWarOptions.currentBullet >= this.jetWarOptions.bullets.length) {
      this.jetWarOptions.currentBullet = 0; //don't fire
    }
  } else if (!this.jetWarOptions.fireBtn) {
    this.jetWarOptions.isShooting = false;
  }
};

Jet.prototype.drawAllBullets = function () {
  console.log(this.jetWarOptions?.bullets);
  for (var i = 0; i < this.jetWarOptions.bullets.length; i++) {
    if (this.jetWarOptions.bullets[i].Bulletoptions.drawX >= 0)
      this.jetWarOptions.bullets[i].drawBulletCanvas();
    if (this.jetWarOptions.bullets[i].Bulletoptions.explosion.hasHit)
      this.jetWarOptions.bullets[
        i
      ].Bulletoptions.explosion.drawExplosionCanvas();
  }
};

Jet.prototype.jetDirection = function () {
  if (this.stear.up) this.options.drawY -= this.speed; //jet up
  if (this.stear.forward) this.options.drawX += this.speed; //jet forward
  if (this.stear.down) this.options.drawY += this.speed; //jet down
  if (this.stear.backword) this.options.drawX -= this.speed; //jet backword
};

Jet.prototype.updateScore = function (points) {
  // this.score = new Score(); //new
  //this.score.update(); //new
  this.score += points;
  canvas.gameScore.update(); //old [show score board in canvas]
};

//new

//Jet part end

//Bulet part start
function JetBullet() {
  (this.ctx = canvas.getCanvasCtx("canvasJet")),
    (this.Bulletoptions = {
      srcX: 100,
      srcY: 500,
      width: 10,
      height: 10,
      drawX: -20,
      drawY: 20,
      drawWidth: 5,
      drawHeight: 5,
      explosion: new Explosion(),
    });

  this.speed = 5; //jet bullet speed
  this.visiable = true; //new
}

JetBullet.prototype.drawBulletCanvas = function () {
  this.Bulletoptions.drawX += this.speed;
  canvas.draw(this.ctx, this.Bulletoptions);
  this.checkHitEnemy();
  this.recycleBullet();
};

JetBullet.prototype.recycleBullet = function () {
  if (
    this.Bulletoptions.drawX > canvas.gameWidth ||
    this.Bulletoptions.explosion.hasHit
  )
    this.Bulletoptions.drawX = -20;
};

JetBullet.prototype.fire = function (drawX, drawY) {
  console.log(10);
  //fire draw when shooting
  this.Bulletoptions.drawX = drawX;
  this.Bulletoptions.drawY = drawY;
};

JetBullet.prototype.checkHitEnemy = function () {
  for (var i = 0; i < canvas.enemies.length; i++) {
    if (
      this.Bulletoptions.drawX > canvas.enemies[i].enemyOptions.drawX &&
      this.Bulletoptions.drawX < canvas.enemies[i].enemyOptions.drawX + 100 &&
      this.Bulletoptions.drawY > canvas.enemies[i].enemyOptions.drawY + 10 &&
      this.Bulletoptions.drawY < canvas.enemies[i].enemyOptions.drawY + 30
    ) {
      // debugger;
      //fighterJet.score.updateScoreForKill(); //new [test kill]
      this.Bulletoptions.explosion.Explosionoptions.drawX =
        canvas.enemies[i].enemyOptions.drawX +
        this.Bulletoptions.explosion.Explosionoptions.width / 2;
      this.Bulletoptions.explosion.Explosionoptions.drawY =
        canvas.enemies[i].enemyOptions.drawY -
        this.Bulletoptions.explosion.Explosionoptions.height / 3;
      this.Bulletoptions.explosion.hasHit = true;
      this.recycleBullet();
      canvas.enemies[i].recycleEnemy();
    }
  }
};

function enemyBullet() {
  (this.ctx = canvas.getCanvasCtx("canvasEnemy")),
    (this.enemyBulletoptions = {
      srcX: 100,
      srcY: 500,
      width: 10,
      height: 10,
      drawX: Enemy.drawX,
      drawY: Enemy.drawY,
      drawWidth: 5,
      drawHeight: 5,
      explosion: new Explosion(),
    });
  console.log(this.enemyBulletoptions.srcX);
  this.speed = 200; //bullet speed
  this.visiable = true; //new
}
enemyBullet.prototype.drawBulletCanvas = function () {
  // console.log(5);
  this.enemyBulletoptions.drawX -= this.speed;
  canvas.draw(this.ctx, this.enemyBulletoptions);
  //this.checkHitJet();
  this.recycleBullet();
  // this.fire();
};

enemyBullet.prototype.recycleBullet = function () {
  // console.log(4);
  if (
    this.enemyBulletoptions.drawX > canvas.gameWidth ||
    this.enemyBulletoptions.explosion.hasHit
  )
    this.enemyBulletoptions.drawX = -20;
};

enemyBullet.prototype.fire = function (drawX, drawY) {
  console.log(1);
  //fire draw when shooting
  this.enemyBulletoptions.drawX = drawX;
  this.enemyBulletoptions.drawY = drawY;
};

// enemyBullet.prototype.checkHitJet = function () {
//   for (var i = 0; i < canvas.enemies.length; i++) {
//     if (
//       this.Bulletoptions.drawX > canvas.enemies[i].enemyOptions.drawX &&
//       this.Bulletoptions.drawX < canvas.enemies[i].enemyOptions.drawX + 100 &&
//       this.Bulletoptions.drawY > canvas.enemies[i].enemyOptions.drawY + 10 &&
//       this.Bulletoptions.drawY < canvas.enemies[i].enemyOptions.drawY + 30
//     ) {
//       // debugger;
//       //fighterJet.score.updateScoreForKill(); //new [test kill]
//       this.Bulletoptions.explosion.Explosionoptions.drawX =
//         canvas.enemies[i].enemyOptions.drawX +
//         this.Bulletoptions.explosion.Explosionoptions.width / 2;
//       this.Bulletoptions.explosion.Explosionoptions.drawY =
//         canvas.enemies[i].enemyOptions.drawY -
//         this.Bulletoptions.explosion.Explosionoptions.height / 3;
//       this.Bulletoptions.explosion.hasHit = true;
//       this.recycleBullet();
//       canvas.enemies[i].recycleEnemy();
//     }
//   }
// };

//Bullet part end

// enemy part start
function Enemy() {
  this.ctx = canvas.getCanvasCtx("canvasEnemy");
  this.enemyOptions = {
    srcY: 545, // enemy jet range
    drawX: Math.floor(Math.random() * 1100) + canvas.gameWidth, //enemy stay limit
    drawY: Math.floor(Math.random() * 355), //enemy stay limit
    width: 100, //new
    height: 30, //new
  };

  this.EnemyWarOptions = {
    bullets: [],
    currentBullet: 0,
    fireBtn: true,
    isShooting: true,
  };
  for (var i = 0; i <= 20; i++) {
    for (var j = 0; j <= 20; j++) {
      this.EnemyWarOptions.bullets[this.EnemyWarOptions.bullets.length] =
        new enemyBullet();
    }
  }
  //new start
  //this.movement = false;
  //this.goUp = true;
  //this.checkShooting = false;
  //this.warOptions = [];
  //new end
  //this.rewardPoints = 5;
  this.speed = 5; //enemy speed
}
//Enemy.prototype.verticalMovement = 0.5; //new
Enemy.prototype.drawEnemyCanvas = function () {
  this.enemyOptions.drawX -= this.speed; //negetive x axis(enemy movement)
  this.EnemydrawAllBullets();
  console.log(7);
  this.checkShooting();
  // //new start
  // if (this.movement) {
  //   if (this.goup) {
  //     this.enemyOptions.drawY -= this.verticalMovement;
  //   } else {
  //     this.enemyOptions.drawY += this.verticalMovement;
  //   }
  //   if (this.enemyOptions.drawY === 0) {
  //     this.goUp = false;
  //   } else if (this.enemyOptions.drawY === 500) {
  //     this.goUp = true;
  //   }
  // }
  // //new end
  canvas.draw(this.ctx, this.enemyOptions);
  this.escaped();
};
Enemy.prototype.checkShooting = function () {
  console.log(this.EnemyWarOptions.fireBtn, this.EnemyWarOptions.isShooting);
  // console.log(23);
  if (this.EnemyWarOptions.fireBtn && this.EnemyWarOptions.isShooting) {
    console.log(22);
    this.EnemyWarOptions.bullets[this.EnemyWarOptions.currentBullet++]?.fire(
      this.enemyOptions.drawX + 100, // draw fire drawX=200+100
      this.enemyOptions.drawY + 30 // draw fire drawY=300+30
    );
    // if (
    //   this.EnemyWarOptions.currentBullet >= this.EnemyWarOptions.bullets.length
    // )
    // {
    //   this.EnemyWarOptions.currentBullet = 0; //don't fire
    // }
  } else if (!this.EnemyWarOptions.fireBtn) {
    this.EnemyWarOptions.isShooting = true;
  }
};
Enemy.prototype.EnemydrawAllBullets = function () {
  console.log(8);
  console.log(this.EnemyWarOptions?.bullets);
  for (var i = 0; i < this.EnemyWarOptions.bullets.length; i++) {
    console.log(9);
    console.log(this.EnemyWarOptions.bullets[i]);
    if (this.EnemyWarOptions.bullets[i].enemyBulletoptions.drawX >= 0)
      this.EnemyWarOptions.bullets[i].drawBulletCanvas();
    console.log(6);
    if (this.EnemyWarOptions.bullets[i].enemyBulletoptions.explosion.hasHit)
      this.EnemyWarOptions.bullets[
        i
      ].enemyBulletoptions.explosion.drawExplosionCanvas();
  }
};

//recycle enemy
Enemy.prototype.escaped = function () {
  if (this.enemyOptions.drawX <= 0) {
    this.recycleEnemy();
    this.EnemydrawAllBullets();
  }
};

//canvas.recursiveDrawAllJets[enemy stay limit]
Enemy.prototype.recycleEnemy = function () {
  this.enemyOptions.drawX = Math.floor(Math.random() * 1000) + canvas.gameWidth;
  this.drawY = Math.floor(Math.random() * 360);
};

// Bullet.prototype.enemyDrawBulletCanvas = function () {
//   this.options.drawX += this.speed;
//   canvas.draw(this.ctx, this.options);
//   this.checkHitEnemy();
//   this.recycleBullet();
// };
//enemy part end

// Explosion part start
function Explosion() {
  this.ctx = canvas.getCanvasCtx("canvasJet");

  this.Explosionoptions = {
    srcX: 750,
    srcY: 500,
    width: 50,
    height: 50,
    drawX: 0,
    drawY: 0,
    hasHit: false,
    currentFrame: 0,
    totalFrame: 30,
    drawWidth: 50,
    drawHeight: 50,
  };

  this.speed = 3;
}

Explosion.prototype.drawExplosionCanvas = function () {
  if (this.Explosionoptions.currentFrame < this.Explosionoptions.totalFrame) {
    canvas.draw(this.ctx, this.Explosionoptions);
    this.Explosionoptions.currentFrame++;
  } else {
    this.hasHit = false;
    this.currentFrame = 0;
  }
};

//enemy Explosion
function enemyExplosion() {
  this.ctx = canvas.getCanvasCtx("canvasEnemy");

  this.enemyExplosionoptions = {
    srcX: Enemy.drawX,
    srcY: Enemy.drawY,
    width: 50,
    height: 50,
    drawX: 0,
    drawY: 0,
    hasHit: false,
    currentFrame: 0,
    totalFrame: 30,
    drawWidth: 50,
    drawHeight: 50,
  };

  this.speed = 30;
}

enemyExplosion.prototype.drawExplosionCanvas = function () {
  if (
    this.enemyExplosionoptions.currentFrame <
    this.enemyExplosionoptions.totalFrame
  ) {
    canvas.draw(this.ctx, this.enemyExplosionoptions);
    this.enemyExplosionoptions.currentFrame++;
  } else {
    this.hasHit = false;
    this.currentFrame = 0;
  }
};

// Explosion part end

// Score on canvas part start
function Score() {
  this.ctx = canvas.getCanvasCtx("canvasScore");
  //this.score = 0; //new
  //this.scoreForKillingOneEnemy = 5; //new

  this.options = {
    width: canvas.gameWidth, //width:800
    height: canvas.gameHeight, //height:500
    drawWidth: canvas.gameWidth, //drawWidth:800
    drawHeight: canvas.gameHeight, //drawHeight:800
  };
}

Score.prototype.update = function () {
  //canvas.clear(this.ctx); //old[clear all style in  score canvas]
  this.ctx.fillStyle = "hsla(0,0%,0%,0.5)"; //enemyJetfilled text color on the canvas
  this.ctx.font = "200 20px Arial"; //font size define
  this.ctx.fillText("Score :" + fighterJet.score, 550, 60); // score draw filled text on the canvas
};
//Score on canvas part end

var imageSprite = new Image();
imageSprite.src = "images/sprite.png";
imageSprite.addEventListener("load", canvas.init.bind(canvas), false);

var fighterJet = new Jet();
var enemyJet = new Enemy();
