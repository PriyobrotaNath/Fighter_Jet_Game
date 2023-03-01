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
